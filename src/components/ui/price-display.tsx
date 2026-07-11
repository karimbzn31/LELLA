import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  min: number;
  max: number;
  className?: string;
}

export function PriceDisplay({ min, max, className }: PriceDisplayProps) {
  return (
    <p className={cn("text-sm text-navy/50", className)}>
      À partir de <span className="font-semibold text-navy">{formatPrice(min)}</span>
    </p>
  );
}
