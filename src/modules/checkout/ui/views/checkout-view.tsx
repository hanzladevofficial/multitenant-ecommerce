"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useCart } from "../../hooks/use-cart";
import { toast } from "sonner";
import CheckoutItem from "../components/checkout-item";
import { InboxIcon } from "lucide-react";
import CheckoutSidebar from "../components/checkout-sidebar";

const CheckoutItemSkeleton = ({ isLast = false }) => (
  <div
    className={`p-4 animate-pulse ${!isLast ? "border-b border-gray-200" : ""}`}
  >
    <div className="flex gap-4">
      <div className="w-20 h-20 bg-gray-200 rounded-md flex-shrink-0"></div>

      <div className="flex-1 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>

        <div className="h-4 bg-gray-200 rounded w-1/2"></div>

        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
      </div>

      <div className="w-8 h-8 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const CheckoutSidebarSkeleton = () => (
  <div className="border rounded-md bg-white p-6 animate-pulse">
    <div className="space-y-4">
      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
      <div className="h-12 bg-gray-200 rounded-md w-full"></div>
    </div>
  </div>
);

const CheckoutSkeleton = () => (
  <div className="lg:pt-16 pt-4 px-4 lg:px-12">
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
      <div className="lg:col-span-4">
        <div className="border rounded-md overflow-hidden bg-white">
          <CheckoutItemSkeleton />
          <CheckoutItemSkeleton />
          <CheckoutItemSkeleton isLast />
        </div>
      </div>
      <div className="lg:col-span-3">
        <CheckoutSidebarSkeleton />
      </div>
    </div>
  </div>
);

type Props = {
  tenantSlug: string;
};

export default function CheckoutView({ tenantSlug }: Props) {
  const { productIds, clearAllCarts, removeProduct } = useCart(tenantSlug);
  const trpc = useTRPC();
  const { data, error, isLoading } = useQuery(
    trpc.checkout.getProducts.queryOptions({ ids: productIds })
  );

  useEffect(() => {
    if (!error) return;
    if (error.data?.code === "NOT_FOUND") {
      clearAllCarts();
      toast.warning(
        "Some products in your cart are no longer available and have been removed."
      );
    }
  }, [error, clearAllCarts]);
  if (isLoading) {
    return <CheckoutSkeleton />;
  }

  if (data?.totalDocs === 0) {
    return (
      <div className="lg:pt-16 pt-4 px-4 lg:px-12">
        <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
          <InboxIcon />
          <p className="text-base font-medium">No Product Found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pt-16 pt-4 px-4 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="border rounded-md overflow-hidden bg-white">
            {data?.formattedData.map((product, index) => (
              <CheckoutItem
                key={index}
                isLast={index === data.formattedData.length - 1}
                imageUrl={product.image?.url || ""}
                name={product.name}
                productUrl={`/tenants/${tenantSlug}/products/${product.id}`}
                tenantUrl={`/tenants/${tenantSlug}`}
                tenantName={product.tenant.name}
                price={product.price}
                onRemove={() => removeProduct(product.id)}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <CheckoutSidebar
            totalPrice={data?.totalPrice}
            onCheckout={() => {}}
            isCanceled={true}
            isPending={false}
          />
        </div>
      </div>
    </div>
  );
}
