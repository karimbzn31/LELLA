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
    subtitle: "Vivez l&apos;instant, on s&apos;occupe de tout",
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
  const lineOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  return (
    <section className="py-24 md:py-32 bg-ivory relative overflow-hidden">
      {/* Motif de fond */}
      <div className="absolute inset-0 pattern-zellige opacity-[0.03]" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold/50" />
            <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-medium">Simple & Élégant</span>
            <span className="h-px w-8 bg-gold/50" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-navy leading-tight">
            Votre voyage commence ici
          </h2>
          <p className="text-navy/50 text-base md:text-lg max-w-xl mx-auto mt-4">
            Quatre étapes pour transformer votre rêve en réalité.
          </p>
        </div>

        {/* Timeline steps */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Ligne de connexion centrale animée (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-ivory/30">
            <motion.div
              style={{ width: lineWidth, opacity: lineOpacity }}
              className="h-full gold-gradient origin-left shadow-[0_0_12px_rgba(199,164,93,0.6)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Cercle numéroté + icône */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 rounded-full ${step.bg} border ${step.border} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl`}>
                    <step.icon size={30} className={`${step.color} transition-transform duration-500`} />
                  </div>
                  {/* Numéro */}
                  <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full gold-gradient text-white text-[11px] font-bold flex items-center justify-center shadow-lg">
                    {index + 1}
                  </div>
                </div>

                {/* Texte */}
                <h3 className={`text-lg font-serif font-semibold mb-2 transition-colors duration-300 group-hover:${step.color}`}>
                  {step.title}
                </h3>
                <p className="text-sm text-navy/50 leading-relaxed max-w-[220px]">
                  {step.subtitle}
                </p>

                {/* Connecteur mobile */}
                {index < STEPS.length - 1 && (
                  <div className="block lg:hidden w-px h-8 bg-gradient-to-b from-gold/40 to-transparent mt-4" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
