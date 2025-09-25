import { Category, Media, Product, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import type { Sort, Where } from "payload";
import z from "zod";

export const checkoutRouter = createTRPCRouter({
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
