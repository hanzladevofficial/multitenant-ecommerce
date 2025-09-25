import CheckoutView from "@/modules/checkout/ui/views/checkout-view";

type Props = {
  params: Promise<{ slug: string }>;
};
export default async function page({ params }: Props) {
  const { slug } = await params;
  return <CheckoutView tenantSlug={slug} />;
}
