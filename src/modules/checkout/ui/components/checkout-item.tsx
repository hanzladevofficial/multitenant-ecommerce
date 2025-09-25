import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatAsCurrency } from "@/modules/products/ui/components/price-filter";

type Props = {
  isLast?: boolean;
  imageUrl?: string | null;
  name: string;
  productUrl: string;
  tenantUrl: string;
  tenantName: string;
  price: number;
  onRemove: () => void;
};

export default function CheckoutItem({
  isLast,
  imageUrl,
  name,
  productUrl,
  tenantUrl,
  tenantName,
  price,
  onRemove,
}: Props) {
  return (
    <div
      className={cn(
        "grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b",
        isLast && "border-b-0"
      )}
    >
      <div className="overflow-hidden border-r">
        <div className="relative aspect-square h-full">
          <Image
            src={imageUrl || "/placeholder.png"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="py-4 flex flex-col justify-between">
        <div className="">
          <Link
            href={productUrl}
            className="font-medium text-lg hover:underline"
          >
            <h4 className="font-bold underline">{name}</h4>
          </Link>
          <Link
            href={tenantUrl}
            className="font-medium text-lg hover:underline"
          >
            <p className="font-medium underline">{tenantName}</p>
          </Link>
        </div>
      </div>

      <div className="py-4 flex flex-col justify-between">
        <p className="font-medium">{formatAsCurrency(price.toString())}</p>
        <button
          className="underline font-medium cursor-pointer"
          onClick={onRemove}
          type="button"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
