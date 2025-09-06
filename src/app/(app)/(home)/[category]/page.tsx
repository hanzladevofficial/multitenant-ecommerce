import { ProductFilters } from "@/modules/products/ui/components.tsx/product-filters";
import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/components.tsx/product-list";
import { ProductSort } from "@/modules/products/ui/components.tsx/product-sort";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
type Props = {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    minPrice: string | undefined;
    maxPrice: string | undefined;
    tags?: string[];
  }>;
};
const Page = async ({ params, searchParams }: Props) => {
  const { category } = await params;
  const sp = await searchParams;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category, ...sp })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-y-2 lg:gap-y-0">
          <p className="text-2xl font-medium">Curated for You</p>
          <ProductSort />
        </div>
        <div
          className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8
          gap-y-6 gap-x-12"
        >
          <div className="lg:col-span-2 xl:col-span-2">
            <ProductFilters />
          </div>
          <div className="lg:cols-span-4 xl:col-span-6">
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList category={category} />
            </Suspense>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};
export default Page;
