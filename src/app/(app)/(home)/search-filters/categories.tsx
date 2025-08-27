"use client";
import CategoryDropDrown from "./category-dropdrown";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";
import { CategoriesSidebar } from "./category-sidebar";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface Props {
  data: CategoriesGetManyOutput;
}

export function Categories({ data }: Props) {
  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeCategory = "all";
  const activeCategoryIndex = data.findIndex(
    (category) => category.slug === activeCategory
  );
  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const calculateVisibleCount = () => {
      if (containerRef.current && measureRef.current && viewAllRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const viewAllWidth = viewAllRef.current.offsetWidth;
        const availableWidth = containerWidth - viewAllWidth - 16;

        const items = Array.from(measureRef.current.children);
        let totalWidth = 0;
        let visible = 0;

        for (const item of items) {
          const width = item.getBoundingClientRect().width;
          if (totalWidth + width > availableWidth) break;
          totalWidth += width;
          visible++;
        }

        setVisibleCount(visible);
      }
    };

    // Initial calculation after render
    requestAnimationFrame(calculateVisibleCount);

    // Resize observer on container
    const resizeObserver = new ResizeObserver(calculateVisibleCount);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    // Extra: recalc on window resize (safari/mobile bug fix)
    window.addEventListener("resize", calculateVisibleCount);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateVisibleCount);
    };
  }, [data.length]);

  return (
    <div className="relative w-full">
      {/* Sidebar for View All Categories */}
      {isSidebarOpen && (
        <CategoriesSidebar
          open={isSidebarOpen}
          onOpenChange={setIsSidebarOpen}
        />
      )}

      {/* {Hidden div to measure the width of the items} */}
      <div
        className="absolute opacity-0 pointer-events-none flex"
        ref={measureRef}
        style={{ position: "fixed", left: "-9999px", top: "-9999px" }}
      >
        {data.map((category) => (
          <div key={category.id} className="">
            <CategoryDropDrown
              category={category}
              isActive={category.slug === activeCategory}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
      {/* Visible Items */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
        className="flex flex-nowrap items-center gap-x-1 overflow-hidden p-1"
      >
        {data.slice(0, visibleCount).map((category) => (
          <div key={category.id} className="">
            <CategoryDropDrown
              category={category}
              isActive={category.slug === activeCategory}
              isNavigationHovered={isAnyHovered}
            />
          </div>
        ))}

        {/* View All Button */}
        <div ref={viewAllRef} className="shrink-0">
          <Button
            className={cn(
              "h-11 px-4 bg-transparent rounded-full hover:bg-white hover:border-primary text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[4px] hover:border",
              isActiveCategoryHidden &&
                !isAnyHovered &&
                "bg-white border-primary border"
            )}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            View All
            <ListFilterIcon className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
