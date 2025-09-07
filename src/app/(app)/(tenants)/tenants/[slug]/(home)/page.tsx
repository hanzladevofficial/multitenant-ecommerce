import type { SearchParams } from "nuqs";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { DEFAULT_LIMIT } from "@/constants";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type Props = {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string }>;
};

export default async function page({ params, searchParams }: Props) {
  const { slug } = await params;
  const filters = await searchParams;
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      tenantSlug: slug,
      ...filters,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView tenantSlug={slug} />
    </HydrationBoundary>
  );
}
