"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, FileText, CalendarCheck, Heart } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Choisissez",
    subtitle: "Parcourez notre sélection de prestataires vérifiés",
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/30",
  },
  {
    icon: FileText,
    title: "Demandez",
    subtitle: "Recevez des devis personnalisés en 24h",
    color: "text-bordeaux",
    bg: "bg-bordeaux/10",
    border: "border-bordeaux/20",
  },
  {
    icon: CalendarCheck,
    title: "Réservez",
    subtitle: "Confirmez et suivez vos préparatifs",
    color: "text-terracotta",
    bg: "bg-terracotta/10",
    border: "border-terracotta/20",
  },
  {
    icon: Heart,
    title: "Célébrez",
    subtitle: "Vivez l'instant, on s'occupe de tout",
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/30",
  },
];

export function HowItWorksSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.25"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-16 md:py-32 bg-ivory relative overflow-hidden">
      <div className="absolute inset-0 pattern-zellige opacity-[0.03]" />

      <div className="section-container relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
            <span className="h-px w-6 md:w-8 bg-gold/50" />
            <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-medium">Simple & Élégant</span>
            <span className="h-px w-6 md:w-8 bg-gold/50" />
          </div>
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-serif font-bold text-navy leading-tight">
            Votre voyage commence ici
          </h2>
          <p className="text-navy/50 text-sm md:text-lg max-w-xl mx-auto mt-2 md:mt-4">
            Quatre étapes pour transformer votre rêve en réalité.
          </p>
        </div>

        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Timeline ligne desktop */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-ivory/30">
            <motion.div style={{ width: lineWidth }} className="h-full gold-gradient origin-left" />
          </div>

          {/* Mobile: 2x2 grid, desktop: 4 colonnes */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: index * 0.12, duration: 0.4 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="relative mb-4 md:mb-6">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${step.bg} border ${step.border} flex items-center justify-center transition-all duration-500 group-hover:scale-110`}>
                    <step.icon size={24} className={`${step.color} transition-transform duration-500`} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 md:w-7 md:h-7 rounded-full gold-gradient text-white text-[10px] md:text-[11px] font-bold flex items-center justify-center shadow-lg">
                    {index + 1}
                  </div>
                </div>

                <h3 className={`text-sm md:text-lg font-serif font-semibold mb-1 md:mb-2`}>
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm text-navy/50 leading-relaxed max-w-[160px] md:max-w-[220px]">
                  {step.subtitle}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
