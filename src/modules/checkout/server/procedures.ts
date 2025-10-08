import { Category, Media, Product, Tenant } from "@/payload-types";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import type { Where } from "payload";
import type Stripe from "stripe";
import z from "zod";
import { CheckoutMetaData, ProductMetaData } from "../types";
import { stripe } from "@/lib/stripe";

export const checkoutRouter = createTRPCRouter({
  purchase: protectedProcedure
    .input(
      z.object({
        productIds: z.array(z.string()),
        tenantSlug: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const products = await ctx.db.find({
        collection: "products",
        depth: 2,
        where: {
          and: [
            { id: { in: input.productIds } },
            { "tenant.subdomain": { equals: input.tenantSlug } },
          ],
        },
      });
      if (products.totalDocs !== input.productIds.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "One or more products not found for the specified tenant.",
        });
      }
      const tenantData = await ctx.db.find({
        collection: "tenants",
        limit: 1,
        pagination: false,
        where: {
          subdomain: { equals: input.tenantSlug },
        },
      });
      const tenant = tenantData.docs[0] as Tenant & { image: Media | null };
      if (!tenant) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tenant not found.",
        });
      }
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        products.docs.map((product) => ({
          quantity: 1,
          price_data: {
            unit_amount: product.price * 100, // Convert to cents
            currency: "pkr",
            product_data: {
              name: product.name,
              metadata: {
                stripAccountId: tenant.stripeAccountId,
                id: product.id,
                name: product.name,
                price: product.price.toString(),
              } as ProductMetaData,
            },
          },
        }));

      const checkout = await stripe.checkout.sessions.create({
        customer_email: ctx.session.user.email || undefined,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${input.tenantSlug}/checkout?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${input.tenantSlug}/checkout?cancel=true`,
        mode: "payment",
        line_items: lineItems,
        invoice_creation: {
          enabled: true,
        },
        metadata: {
          userId: ctx.session.user.id,
        } as CheckoutMetaData,
      });
      if (!checkout.url) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create checkout session.",
        });
      }
      return { url: checkout.url };
    }),

  getProducts: baseProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      // Temporary placeholder for sorting logic.
      // Currently using dummy values; will implement proper sorting mechanism later.

      const data = await ctx.db.find({
        collection: "products",
        depth: 2,
        where: {
          id: {
            in: input.ids,
          },
        },
      });

      if (data.totalDocs !== input.ids.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Products not found.",
        });
      }

      const formattedData = data.docs.map((doc) => ({
        ...(doc as Product),
        tenant: doc.tenant as Tenant & { image: Media | null },
        category: doc.category
          ? {
              ...(doc.category as Category),
              subcategories: undefined,
            }
          : null,
        image: (doc.image as Media) ?? null,
      }));

      return {
        formattedData,
        totalPrice: data.docs.reduce((acc, product) => acc + product.price, 0),
        totalDocs: data.totalDocs,
      };
    }),
});
