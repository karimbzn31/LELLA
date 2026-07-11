"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Images paysage pour desktop — PARFAITES, on y touche PAS
const DESKTOP_IMAGES = [
  "/images/hero-dark-wedding.jpg",
  "/images/hero-wedding.jpg",
  "/images/hero-bride-2.jpg",
  "/images/hero-couple.jpg",
  "/images/hero-details.jpg",
  "/images/hero-night.jpg",
  "/images/hero-warm.jpg",
];

// Images portrait pour mobile — format vertical, centrées sur le sujet
const MOBILE_IMAGES = [
  "/images/hero-mobile-1.jpg",
  "/images/hero-mobile-2.jpg",
  "/images/hero-mobile-3.jpg",
  "/images/hero-mobile-4.jpg",
  "/images/hero-mobile-5.jpg",
  "/images/hero-mobile-6.jpg",
  "/images/hero-mobile-7.jpg",
];

const ROTATION_MS = 5000;

export function HeroImageRotator({
  className,
}: {
  className?: string;
}) {
  // Détection mobile — une seule fois
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { setIsMobile(window.innerWidth < 768); }, []);
  const images = isMobile ? MOBILE_IMAGES : DESKTOP_IMAGES;

  const [ready, setReady] = useState(false);
  const currentRef = useRef(0);
  const elRefs = useRef<HTMLDivElement[]>([]);

  // Préchargement
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
  }, [images]);

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
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${src}')`,
            pointerEvents: "none",
          }}
        />
      ))}
      {/* Overlay foncé */}
      <div className="absolute inset-0 bg-black/35 z-[3] pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.5)] z-[4] pointer-events-none" />
    </div>
  );
}
