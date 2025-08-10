"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/payload-types";
import { useDropDownPosition } from "./use-dropdown-position";
import SubCategories from "./subcategory-menu";

interface Props {
  category: Category;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

export default function CategoryDropDrown({
  category,
  isActive,
  isNavigationHovered,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const getDropDownPosition = useDropDownPosition(dropdownRef);
  const dropDownPosition = getDropDownPosition();
  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true);
    }
  };
  const onMouseLeave = () => setIsOpen(false);
  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Button
          variant="elevated"
          className={cn(
            "h-11 px-4 bg-transparent rounded-full hover:bg-white hover:border-primary text-black",
            isActive && !isNavigationHovered && "bg-white border-primary"
          )}
        >
          {category.name}
        </Button>
        {(category.subcategories as Category) &&
          category.subcategories.length > 0 && (
            <div
              className={cn(
                "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-b-[10px] border-r-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
                isOpen && "opacity-100"
              )}
            ></div>
          )}
      </div>
      <SubCategories
        category={category}
        isOpen={isOpen}
        position={dropDownPosition}
      />
    </div>
  );
}
