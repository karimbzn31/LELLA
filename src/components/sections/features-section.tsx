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
    <section className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-10 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
            <span className="h-px w-6 md:w-8 bg-gold/30" />
            <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-medium">Pourquoi LELLA</span>
            <span className="h-px w-6 md:w-8 bg-gold/30" />
          </div>
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-serif font-bold text-navy leading-tight">
            L&apos;exigence<br />
            <span className="text-gradient">dans les moindres détails</span>
          </h2>
        </div>

        {/* Mobile: 1 colonne empilée — Desktop: 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group"
            >
              <div className="h-full bg-ivory rounded-2xl p-5 md:p-8 transition-all duration-500 group-hover:bg-white group-hover:shadow-xl group-hover:-translate-y-1">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gold/5 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gold/10 transition-all group-hover:scale-110">
                  <f.icon size={22} className="text-gold" />
                </div>
                <h3 className="text-lg md:text-xl font-serif font-semibold text-navy mb-2 md:mb-3 group-hover:text-gold transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs md:text-sm text-navy/60 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 rounded-full bg-ivory border border-gold/10">
            <Sparkles size={10} className="text-gold" />
            <span className="text-[10px] md:text-xs text-navy/50">
              + de <strong className="text-navy">5 000 familles</strong> nous ont déjà fait confiance
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
