"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroImageRotator } from "@/components/sections/hero-image-rotator";
import { GoldScrollBand } from "@/components/sections/gold-scroll-band";

export function HeroSection() {
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 400], [0, -60]);
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0.6]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [1, 0.7]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A1A2E]">
      {/* Image rotator — 7 images en crossfade */}
      <HeroImageRotator />

      {/* Gold Scroll Band — barre dorée qui se réduit au scroll */}
      <GoldScrollBand />

      {/* Overlay éditorial — foncé permanent pour ne JAMAIS voir l'arrière */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 via-40% to-navy/95"
        style={{ opacity: overlayOpacity }}
      />

      {/* Contenu */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 w-full section-container"
      >
        <div className="max-w-4xl mx-auto text-center lg:text-left lg:ml-[8%]">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-gold/20 backdrop-blur-md mb-8"
          >
            <Sparkles size={12} className="text-gold" />
            <span className="text-gold text-[10px] font-medium tracking-[0.25em] uppercase">
              Le Luxe de la Tradition
            </span>
          </motion.div>

          {/* Titre — éditorial, aéré */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white leading-[1.05] mb-5"
          >
            <span className="block">L&apos;amour <span className="text-gradient">s&apos;invite</span>,</span>
            <span className="block text-white/90">la tradition <span className="text-gradient">s&apos;illumine</span></span>
          </motion.h1>

          {/* Séparateur — trait doré */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-px bg-gold/50 origin-left mb-6 max-w-[200px] mx-auto lg:mx-0"
          />

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg text-white/60 max-w-xl mb-10 leading-relaxed"
          >
            Des fiançailles au grand jour, la première marketplace premium qui réunit les plus grands talents d&apos;Algérie pour votre histoire d&apos;amour.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center lg:items-start gap-4"
          >
            <Link href="/marketplace">
              <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button variant="gold" size="lg" className="text-base gap-2 px-8 py-4">
                  Trouver un prestataire
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.span>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline" size="lg" className="text-base border-white/15 text-white/80 hover:bg-white/10 hover:text-white px-8 py-4">
                Devenir prestataire
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats en bas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-0 right-0 z-10"
      >
        <div className="section-container">
          <div className="flex items-center justify-center gap-8 md:gap-16">
            {[
              { value: "+2500", label: "Prestataires" },
              { value: "+1500", label: "Événements" },
              { value: "4.8★", label: "Note moyenne" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl md:text-2xl font-serif font-bold text-gold">{stat.value}</div>
                <div className="text-[10px] md:text-xs text-white/40 mt-0.5 tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
            <div className="hidden md:block absolute bottom-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[8px] text-white/20 tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-4 h-7 rounded-full border border-white/15 flex items-start justify-center pt-1.5">
            <div className="w-0.5 h-1.5 rounded-full bg-gold/60" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
