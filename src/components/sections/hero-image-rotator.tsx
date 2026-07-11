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

  // 1. Préchargement
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

  // 2. Initialisation + timer (une seule fois, après ready)
  useEffect(() => {
    if (!ready) return;

    // Initialiser les z-index sur les ÉLÉMENTS DOM directement
    // PAS via React — React ne doit PAS savoir qu'on fait ça
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
        // Changer z-index impérativement — React ne le saura JAMAIS
        pEl.style.zIndex = "1";
        nEl.style.zIndex = "2";
        currentRef.current = next;
      }
    }, ROTATION_MS);

    return () => clearInterval(id);
  }, [ready, images.length]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-[#1A1A2E]", className)}>
      {/* Toutes les images avec background-image — React ne gère PAS les styles
          Aucun style prop lié à zIndex, opacity, visibility
          React peut re-render 1000 fois, il ne changera RIEN */}
      {images.map((src, i) => (
        <div
          key={i}
          ref={(el) => {
            elRefs.current[i] = el!;
            // z-index initial fixé AVANT le premier paint — React ne le changera pas
            // (pas dans le style prop donc React ne le retouche jamais)
            if (el) {
              el.style.zIndex = "1";
              el.style.opacity = "1";
              if (i === 0) el.style.zIndex = "2";
            }
          }}
          // background-image initial dans le style — React le pose une fois
          // z-index et opacity gérés IMPÉRATIVEMENT via refs dans l'useEffect
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${src}')`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Overlays fixes */}

      {/* Overlay de foncé */}
      <div className="absolute inset-0 bg-black/35 z-[3] pointer-events-none" />
      {/* Vignette sur les bords */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.5)] z-[4] pointer-events-none" />
    </div>
  );
}
