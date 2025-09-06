import { sortValues } from "@/constants";
import { Category, Product } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Sort, Where } from "payload";
import z from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
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
        depth: 1,
        pagination: true,
        where,
        sort,
      });

      const formattedData = data.docs.map((doc) => ({
        ...(doc as Product),
        category: doc.category
          ? {
              ...(doc.category as Category),
              subcategories: undefined,
            }
          : null,
        image: doc.image ?? null,
      }));

      return {
        formattedData,
      };
    }),
});
