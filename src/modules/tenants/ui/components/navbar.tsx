"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

type Prop = {
  slug: string;
};
export function Navbar({ slug }: Prop) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-screen-lg flex items-center h-full px-4 lg:px-12">
        {/* <p className="text-xl">Tenant</p>/ */}
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
