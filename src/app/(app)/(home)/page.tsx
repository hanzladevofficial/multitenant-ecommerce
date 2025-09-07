import { DEFAULT_LIMIT } from "@/constants";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
type Props = {
  searchParams: Promise<{
    minPrice: string | undefined;
    maxPrice: string | undefined;
    tags?: string[];
  }>;
};
const Page = async ({ searchParams }: Props) => {
  const sp = await searchParams;
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...sp,
      limit: DEFAULT_LIMIT,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView />
    </HydrationBoundary>
  );
};
export default Page;
