import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export function StarRating({ rating, size = "sm", showValue = true, className }: StarRatingProps) {
  const sizes = { sm: "w-3.5 h-3.5", md: "w-4 h-4", lg: "w-5 h-5" };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizes[size],
            star <= Math.round(rating)
              ? "fill-gold text-gold"
              : "fill-sand/50 text-sand/50"
          )}
        />
      ))}
      {showValue && (
        <span className="ml-1.5 text-sm font-medium text-navy/70">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
