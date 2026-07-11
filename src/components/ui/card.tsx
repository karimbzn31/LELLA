import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover = true, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-radius-card overflow-hidden",
        hover && "card-premium",
        !hover && "shadow-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardImage({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("relative overflow-hidden", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}
