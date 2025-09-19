import ProducView from "@/modules/products/ui/views/product-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type Props = {
  params: Promise<{ productId: string; slug: string }>;
};

export default async function page({ params }: Props) {
  const { productId, slug } = await params;
  const queryCLient = getQueryClient();
  void queryCLient.prefetchQuery(trpc.tenants.getOne.queryOptions({ slug }));
  return (
    <HydrationBoundary state={dehydrate(queryCLient)}>
      <ProducView productId={productId} tenantSlug={slug} />
    </HydrationBoundary>
  );
}
