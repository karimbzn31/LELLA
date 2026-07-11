"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/ui/counter";

const STATS = [
  { end: 150, suffix: "+", label: "Prestataires", desc: "vérifiés & sélectionnés" },
  { end: 2500, suffix: "+", label: "Événements", desc: "organisés avec succès" },
  { end: 5000, suffix: "+", label: "Familles", desc: "ont fait confiance" },
  { end: 48, suffix: "", label: "Wilayas", desc: "couvertes en Algérie" },
];

export function StatsSection() {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      {/* Background propre */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white to-ivory" />

      {/* Ornement décoratif */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[600px] bg-gold/3 rounded-full blur-[80px]" />

      <div className="section-container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold/30" />
            <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-medium">En chiffres</span>
            <span className="h-px w-8 bg-gold/30" />
          </div>

          {/* Titre */}
          <h2 className="text-center text-2xl md:text-4xl font-serif font-bold text-navy mb-12 md:mb-16">
            La confiance se mesure
          </h2>

          {/* Grille de stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative inline-block">
                  <Counter
                    end={stat.end}
                    suffix={stat.suffix}
                    className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy group-hover:text-gold transition-colors duration-500"
                  />
                  {/* Ligne décorative sous le chiffre */}
                  <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-gold/40 to-gold/80 mx-auto transition-all duration-700 mt-2" />
                </div>
                <p className="text-sm md:text-base font-medium text-navy/80 mt-3">{stat.label}</p>
                <p className="text-xs text-navy/30 mt-0.5">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
