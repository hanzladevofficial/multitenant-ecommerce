import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { SearchFilters, SearchFiltersSkeleton } from "./search-filters";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import { Category } from "@/payload-types";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  children: React.ReactNode;
}
export default async function Layout({ children }: Props) {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#f4f4f4]">{children}</div>
      <Footer />
    </div>
  );
}
