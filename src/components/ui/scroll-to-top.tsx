"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 300;

export function ScrollToTop({ className }: { className?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Remonter en haut"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={cn(
            "fixed bottom-8 right-8 z-50",
            "flex h-12 w-12 items-center justify-center",
            "rounded-full bg-gold text-navy",
            "shadow-[0_8px_24px_rgba(199,164,93,0.45)]",
            "ring-2 ring-gold/30 hover:ring-gold/60",
            "backdrop-blur-sm",
            className
          )}
        >
          <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
          {/* Halo pulsant */}
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-gold"
            initial={{ opacity: 0.5 }}
            animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
