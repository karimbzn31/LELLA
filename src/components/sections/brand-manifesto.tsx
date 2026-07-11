"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function BrandManifesto() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Motif de fond subtil */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0L55 15L40 30L25 15Z' fill='%23C7A45D' fill-opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="section-container max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Côté image — éditorial */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Photo principale avec cadre élégant */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div
                className="aspect-[4/5] bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/hero-details.jpg')",
                  filter: "sepia(0.1) saturate(0.9) brightness(0.9)",
                }}
              />
              {/* Overlay gradient subtil */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
            </div>

            {/* Badge flottant */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-4 -right-4 bg-navy text-white px-6 py-4 rounded-2xl shadow-xl border border-gold/20"
            >
              <p className="text-2xl font-serif font-bold text-gold">2026</p>
              <p className="text-[10px] text-white/50 tracking-wider uppercase">Fondée en Algérie</p>
            </motion.div>
          </motion.div>

          {/* Côté texte — manifeste */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Label section */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-medium">L&apos;esprit LELLA</span>
            </div>

            {/* Titre éditorial */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy leading-[1.1] mb-6">
              Plus qu&apos;une<br />
              <span className="text-gradient">marketplace</span>
              <br />
              une promesse
            </h2>

            {/* Corps de texte */}
            <div className="space-y-4 text-navy/60 leading-relaxed max-w-lg">
              <p className="text-base md:text-lg">
                En Algérie, un mariage n&apos;est pas une simple fête. C&apos;est un héritage, un pont entre les générations, une œuvre d&apos;art collective.
              </p>
              <p className="text-sm md:text-base">
                LELLA est née d&apos;une conviction : chaque famille mérite d&apos;accéder aux plus grands talents du pays sans compromis, sans stress, sans passer par des heures de recherche sur les réseaux sociaux.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-8 pt-6 border-t border-sand/50">
              <p className="text-xs text-navy/30 italic font-serif">
                &mdash; Des artisans d&apos;exception, pour des moments d&apos;exception.
              </p>
            </div>

            {/* Chiffre clé décoratif */}
            <div className="absolute -top-8 right-0 text-[120px] md:text-[180px] font-serif font-bold text-gold/5 select-none pointer-events-none leading-none">
              L
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
