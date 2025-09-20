"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
const CheckoutButton = dynamic(
  () =>
    import("@/modules/checkout/ui/components/checkout-button").then(
      (mod) => mod.CheckoutButton
    ),
  {
    ssr: false,
    loading: () => (
      // Skeleton placeholder while CartButton loads
      <Button asChild className={cn("bg-white border")} variant="elevated">
        <Link href={`/`}>
          Checkout
          <ShoppingCartIcon className="size-6" />
        </Link>
      </Button>
    ),
  }
);

type Prop = {
  slug: string;
};
export function Navbar({ slug }: Prop) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-screen-lg mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <Link href={`/tenants/${slug}`} className="flex items-center gap-2">
          {data?.image?.url && (
            <Image
              src={data?.image.url}
              width={32}
              height={32}
              className="rounded-full border shrink-0 size-[32px]"
              alt={slug}
            />
          )}
          <p className="text-xl">{data.name}</p>
        </Link>
        <CheckoutButton tenantSlug={slug} />
      </div>
    </nav>
  );
}
export function NavbarSkeleton() {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-screen-lg mx-auto flex gap-x-1 items-center h-full px-4 lg:px-12">
        <div></div>

        {/* // TODO :: Skeleton for checkout button */}
      </div>
    </nav>
  );
}
