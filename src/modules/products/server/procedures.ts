import { DEFAULT_LIMIT, sortValues } from "@/constants";
import { Category, Media, Product, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Sort, Where } from "payload";
import z from "zod";

export const productsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const product = await ctx.db.findByID({
        collection: "products",
        id: input.id,
        depth: 2,
      });
      return {
        ...product,
        image: product.image as Media | null,
        tenant: product.tenant as Tenant & { image: Media | null },
      };
    }),
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
        tenantSlug: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      // Temporary placeholder for sorting logic.
      // Currently using dummy values; will implement proper sorting mechanism later.

      let sort: Sort = "-createdAt";
      if (input.sort === "curated") sort = "";
      if (input.sort === "trending") sort = "name";
      if (input.sort === "new") sort = "-createdAt";
      if (input.minPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
        };
      }
      if (input.maxPrice) {
        where.price = {
          less_than_equal: input.maxPrice,
        };
      }
      if (input.tenantSlug) {
        where["tenant.subdomain"] = {
          equals: input.tenantSlug,
        };
      }
      if (input.category) {
        // Lookup the category by slug
        const categoryData = await ctx.db.find({
          collection: "Categories",
          where: { slug: { equals: input.category } },
          depth: 1,
          limit: 1,
          pagination: false,
        });

        const category = categoryData.docs[0];

        if (category) {
          if (category.subcategories?.docs?.length) {
            where["category"] = {
              in: category.subcategories.docs.map(
                (sub) => (sub as Category).id
              ),
            };
          } else {
            where["category.slug"] = { equals: input.category };
          }
        }
      }
      if (input.tags && input.tags.length > 0) {
        where["tags.name"] = {
          in: input.tags,
        };
      }

      const data = await ctx.db.find({
        collection: "products",
        depth: 2,
        pagination: true,
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
      });

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
        nextPage: data.hasNextPage ? input.cursor + 1 : undefined,
      };
    }),
});
