import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function CategoriesSidebar({ open, onOpenChange }: Props) {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.categories.getMany.queryOptions());
  const [parentCategories, setParentCategories] =
    useState<CategoriesGetManyOutput | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoriesGetManyOutput[0] | null
  >(null);
  const currentCategory = parentCategories ?? data ?? [];
  const router = useRouter();
  const handleCategoryClick = (category: CategoriesGetManyOutput[0]) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CategoriesGetManyOutput);
      setSelectedCategory(category);
    } else {
      if (parentCategories && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        if (category.slug === "all") router.push("/");
        router.push(`/${category.slug}`);
      }
    }
  };
  const backgroundColor = selectedCategory?.color || "white";
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor: backgroundColor }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-lg font-semibold">Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={() => {
                setParentCategories(null);
                setSelectedCategory(null);
              }}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium md:cursor-pointer"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}
          {currentCategory.map((category) => (
            <button
              onClick={() => handleCategoryClick(category)}
              key={category.slug}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium md:cursor-pointer"
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
