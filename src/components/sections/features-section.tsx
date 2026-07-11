"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Search, HeadphonesIcon, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Qualité garantie",
    desc: "Chaque prestataire est rigoureusement sélectionné et vérifié pour vous garantir un service d'exception.",
  },
  {
    icon: Search,
    title: "Choix sans effort",
    desc: "Comparez profils, avis et tarifs en un clic pour trouver le prestataire idéal.",
  },
  {
    icon: HeadphonesIcon,
    title: "Suivi dédié",
    desc: "Notre équipe vous accompagne de la réservation jusqu'au jour J, pour une sérénité totale.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold/30" />
            <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-medium">Pourquoi LELLA</span>
            <span className="h-px w-8 bg-gold/30" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-navy leading-tight">
            L&apos;exigence<br />
            <span className="text-gradient">dans les moindres détails</span>
          </h2>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="h-full bg-ivory rounded-2xl p-8 transition-all duration-500 group-hover:bg-white group-hover:shadow-xl group-hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-gold/5 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-all group-hover:scale-110">
                  <f.icon size={26} className="text-gold" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-navy mb-3 group-hover:text-gold transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-navy/60 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Barre de confiance */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ivory border border-gold/10">
            <Sparkles size={12} className="text-gold" />
            <span className="text-xs text-navy/50">
              + de <strong className="text-navy">5 000 familles</strong> nous ont déjà fait confiance
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
