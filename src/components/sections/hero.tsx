"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroImageRotator } from "@/components/sections/hero-image-rotator";

export function HeroSection() {
  return (
    <section className="relative min-h-[90svh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#1A1A2E]">
      {/* Image rotator */}
      <HeroImageRotator />

      {/* Overlay foncé */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/40 via-40% to-navy/95" />

      {/* Contenu — centré, compact sur mobile */}
      <div className="relative z-10 w-full section-container mt-16 md:mt-0">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-gold/20 backdrop-blur-md mb-6 md:mb-8"
          >
            <Sparkles size={10} className="text-gold" />
            <span className="text-gold text-[9px] md:text-[10px] font-medium tracking-[0.25em] uppercase">
              Le Luxe de la Tradition
            </span>
          </motion.div>

          {/* Titre — plus grand sur mobile */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white leading-[1.1] mb-4 md:mb-5"
          >
            <span className="block">L&apos;amour <span className="text-gradient">s&apos;invite</span>,</span>
            <span className="block text-white/90">la tradition <span className="text-gradient">s&apos;illumine</span></span>
          </motion.h1>

          {/* Sous-titre — concis */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-lg text-white/60 max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed"
          >
            La marketplace premium qui réunit les plus grands talents d&apos;Algérie pour votre histoire d&apos;amour.
          </motion.p>

          {/* CTAs — empilés sur mobile */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
          >
            <Link href="/marketplace" className="w-full sm:w-auto">
              <Button variant="gold" size="lg" className="w-full sm:w-auto text-sm md:text-base gap-2 px-6 md:px-8 py-3.5 md:py-4">
                Trouver un prestataire
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/auth/signup" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm md:text-base border-white/15 text-white/80 hover:bg-white/10 hover:text-white px-6 md:px-8 py-3.5 md:py-4">
                Devenir prestataire
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats — masquées sur mobile, trop écrasantes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 md:bottom-10 left-0 right-0 z-10"
      >
        <div className="section-container">
          <div className="hidden md:flex items-center justify-center gap-16">
            {[
              { value: "+2500", label: "Prestataires" },
              { value: "+1500", label: "Événements" },
              { value: "4.8★", label: "Note moyenne" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-serif font-bold text-gold">{stat.value}</div>
                <div className="text-xs text-white/40 mt-0.5 tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mini scroll indicator — plus petit */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-0.5"
        >
          <span className="text-[7px] md:text-[8px] text-white/15 tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-3 h-5 md:w-4 md:h-7 rounded-full border border-white/10 flex items-start justify-center pt-1">
            <div className="w-0.5 h-1 md:h-1.5 rounded-full bg-gold/50" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
