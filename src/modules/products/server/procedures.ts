import { Category, Product } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Where } from "payload";
import z from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};

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
              in: category.subcategories.docs.map((sub: any) => sub.id),
            };
          } else {
            where["category.slug"] = { equals: input.category };
          }
        }
      }

      const data = await ctx.db.find({
        collection: "products",
        depth: 1,
        pagination: true,
        where,
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
