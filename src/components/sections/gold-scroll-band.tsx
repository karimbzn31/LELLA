"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface GoldScrollBandProps {
  className?: string;
}

export function GoldScrollBand({ className }: GoldScrollBandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // La bande se réduit par le bas en scrollant
  const scaleY = useTransform(scrollYProgress, [0, 1], [1, 0.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  return (
    <div
      ref={ref}
      className={cn("absolute left-0 top-0 h-full w-1 z-20", className)}
      aria-hidden
    >
      <motion.div
        style={{ scaleY, opacity, transformOrigin: "top" }}
        className="gold-gradient h-full w-full shadow-[0_0_18px_rgba(199,164,93,0.55)]"
      />
      {/* Pointeau lumineux en haut */}
      <motion.div
        style={{ opacity }}
        className="absolute -left-[3px] top-0 h-2 w-2 rounded-full bg-gold shadow-[0_0_12px_rgba(199,164,93,0.9)]"
      />
    </div>
  );
}
