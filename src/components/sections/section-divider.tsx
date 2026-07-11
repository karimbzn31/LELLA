"use client";

import { motion } from "framer-motion";

export function SectionDivider({ variant = "gold" }: { variant?: "gold" | "dark" }) {
  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      whileInView={{ opacity: 1, width: "100%" }}
      viewport={{ once: true }}
      className="flex items-center justify-center gap-4 py-8"
    >
      <span className={`h-px w-12 md:w-20 ${variant === "gold" ? "bg-gold/30" : "bg-white/20"}`} />
      <span className="text-gold/40 text-xs font-serif">✦</span>
      <span className={`h-px w-12 md:w-20 ${variant === "gold" ? "bg-gold/30" : "bg-white/20"}`} />
    </motion.div>
  );
}

export function SectionDividerLarge() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative py-10 flex items-center justify-center"
    >
      <svg width="200" height="30" viewBox="0 0 200 30" className="text-gold/20">
        <path d="M20 15 Q50 0 80 15 T140 15 T180 15" stroke="currentColor" strokeWidth="0.5" fill="none"/>
        <circle cx="100" cy="15" r="2" fill="currentColor"/>
        <circle cx="60" cy="15" r="1.5" fill="currentColor"/>
        <circle cx="140" cy="15" r="1.5" fill="currentColor"/>
      </svg>
    </motion.div>
  );
}
