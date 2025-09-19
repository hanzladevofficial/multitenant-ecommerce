import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const MIN_RATING = 0;
const MAX_RATING = 5;

type Props = {
  rating: number;
  className?: string;
  iconClassName?: string;
  text?: string;
};
export default function StarRating({
  rating,
  className,
  iconClassName,
  text,
}: Props) {
  const safeRating = Math.max(MIN_RATING, Math.min(MAX_RATING));
  return (
    <div className={cn("flex items-center gap-x-1")}>
      {Array.from({ length: MAX_RATING }).map((_, index) => (
        <StarIcon
          key={index}
          className={cn(
            "size-4",
            index < safeRating ? "fill-black" : "",
            iconClassName
          )}
        />
      ))}
      {text && <p>{text}</p>}
    </div>
  );
}
