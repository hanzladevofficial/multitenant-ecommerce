import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/modules/checkout/hooks/use-cart";

type Props = {
  tenantSlug: string;
  productId: string;
};
export const CartButton = ({ tenantSlug, productId }: Props) => {
  const { isProductInCart, toggleProduct } = useCart(tenantSlug);
  return (
    <Button
      onClick={() => toggleProduct(productId)}
      variant={"elevated"}
      className={cn(
        "flex-1 bg-pink-400 border",
        isProductInCart(productId) && "bg-white"
      )}
    >
      {isProductInCart(productId) ? "Remove from cart" : "Add to cart"}
    </Button>
  );
};
