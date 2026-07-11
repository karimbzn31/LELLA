import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
  subtitle?: string;
  align?: "center" | "left";
  gold?: boolean;
}

export function SectionTitle({
  className,
  children,
  subtitle,
  align = "center",
  gold = false,
  ...props
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "max-w-2xl mb-12 md:mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
      {...props}
    >
      <h2 className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-serif font-semibold leading-tight",
        gold ? "text-gradient" : "text-navy"
      )}>
        {children}
      </h2>
      {subtitle && (
        <p className="mt-4 text-navy/60 text-lg leading-relaxed max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
