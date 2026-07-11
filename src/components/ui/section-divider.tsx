"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
  variant?: "gold" | "bordeaux" | "ivory";
  delay?: number;
}

export function SectionDivider({
  className,
  variant = "gold",
  delay = 0,
}: SectionDividerProps) {
  const colorMap = {
    gold: "text-gold",
    bordeaux: "text-bordeaux",
    ivory: "text-ivory/60",
  };

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center gap-4 py-4 md:py-6",
        className
      )}
      aria-hidden
    >
      {/* Ligne gauche */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "25%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeInOut", delay }}
        className="h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${variant === "gold" ? "#C7A45D" : variant === "bordeaux" ? "#8B1A2B" : "#FBF7F0"})`,
          opacity: variant === "gold" ? 0.6 : 0.4,
        }}
      />

      {/* Motif central — étoile zellige */}
      <motion.svg
        initial={{ scale: 0, opacity: 0, rotate: -45 }}
        whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut", delay: delay + 0.3 }}
        className={cn("h-5 w-5 md:h-6 md:w-6", colorMap[variant])}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 2 L14 8 L20 6 L16 12 L22 14 L16 16 L18 22 L12 18 L6 22 L8 16 L2 14 L8 12 L4 6 L10 8 Z"
          fill="currentColor"
          opacity="0.85"
        />
        <circle cx="12" cy="12" r="2.5" fill={variant === "gold" ? "#1A1A2E" : "#FBF7F0"} />
      </motion.svg>

      {/* Ligne droite */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "25%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeInOut", delay }}
        className="h-px"
        style={{
          background: `linear-gradient(to left, transparent, ${variant === "gold" ? "#C7A45D" : variant === "bordeaux" ? "#8B1A2B" : "#FBF7F0"})`,
          opacity: variant === "gold" ? 0.6 : 0.4,
        }}
      />
    </div>
  );
}
