"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const HERO_IMAGES = [
  "/images/hero-dark-wedding.jpg",
  "/images/hero-wedding.jpg",
  "/images/hero-bride-2.jpg",
  "/images/hero-couple.jpg",
  "/images/hero-details.jpg",
  "/images/hero-night.jpg",
  "/images/hero-warm.jpg",
];

const ROTATION_MS = 5000;

export function HeroImageRotator({
  images = HERO_IMAGES,
  className,
}: {
  images?: string[];
  className?: string;
}) {
  const [ready, setReady] = useState(false);
  const currentRef = useRef(0);
  const elRefs = useRef<HTMLDivElement[]>([]);

  // Prechargement
  useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    images.forEach((src) => {
      const img = new Image();
      img.onload = () => { loaded++; if (loaded === images.length && !cancelled) setReady(true); };
      img.onerror = () => { loaded++; if (loaded === images.length && !cancelled) setReady(true); };
      img.src = src;
    });
    return () => { cancelled = true; };
  }, []);

  // Timer
  useEffect(() => {
    if (!ready) return;
    elRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.zIndex = i === 0 ? "2" : "1";
      el.style.opacity = "1";
    });
    const id = setInterval(() => {
      const prev = currentRef.current;
      const next = (prev + 1) % images.length;
      const pEl = elRefs.current[prev];
      const nEl = elRefs.current[next];
      if (pEl && nEl) {
        pEl.style.zIndex = "1";
        nEl.style.zIndex = "2";
        currentRef.current = next;
      }
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, [ready, images.length]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-[#1A1A2E]", className)}>
      {/* Toutes les images empilees — z-index change seulement */}
      {images.map((src, i) => (
        <div
          key={i}
          ref={(el) => {
            elRefs.current[i] = el!;
            if (el) {
              el.style.zIndex = "1";
              el.style.opacity = "1";
              if (i === 0) el.style.zIndex = "2";
            }
          }}
          className="absolute inset-0 hero-image"
          style={{
            backgroundImage: `url('${src}')`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Overlay de foncé */}
      <div className="absolute inset-0 bg-black/35 z-[3] pointer-events-none" />
      {/* Vignette sur les bords */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.5)] z-[4] pointer-events-none" />
    </div>
  );
}
