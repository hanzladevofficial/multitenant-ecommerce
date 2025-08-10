import { Category } from "@/payload-types";
import CategoryDropDrown from "./category-dropdrown";

interface Props {
  data: any;
}

export function Categories({ data }: Props) {
  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center gap-x-4">
        {data.map((category: Category) => (
          <div key={category.id} className="">
            <CategoryDropDrown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
