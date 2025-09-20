import { Button } from "@/components/ui/button";
import { useCart } from "../../hooks/use-cart";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

type Props = {
  className?: string;
  hideIfEmpty?: boolean;
  tenantSlug: string;
};

export const CheckoutButton = ({
  className,
  hideIfEmpty = false,
  tenantSlug,
}: Props) => {
  const { totalItems } = useCart(tenantSlug);
  if (hideIfEmpty && totalItems === 0) return null;
  return (
    <Button
      asChild
      className={cn("bg-white border", className)}
      variant="elevated"
    >
      <Link
        href={`/tenants/${tenantSlug}/checkout`}
        className="flex items-center gap-2"
      >
        Checkout
        <div className="relative">
          <ShoppingCartIcon className="size-6" />
          {totalItems > 0 && (
            <span
              className="
            absolute -top-1 -right-2
            flex items-center justify-center
            h-4 w-4
            rounded-full
            bg-red-500
            text-white
            text-xs
            font-bold
          "
            >
              {totalItems}
            </span>
          )}
        </div>
      </Link>
    </Button>
  );
};
