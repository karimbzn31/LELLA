"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function BrandManifesto() {
  return (
    <section className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0L55 15L40 30L25 15Z' fill='%23C7A45D' fill-opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="section-container max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Texte — priorité sur mobile */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="h-px w-6 md:w-8 bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-medium">L&apos;esprit LELLA</span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-navy leading-[1.1] mb-4 md:mb-6">
              Plus qu&apos;une<br />
              <span className="text-gradient">marketplace</span>
              <br />
              une promesse
            </h2>

            <div className="space-y-3 md:space-y-4 text-navy/60 leading-relaxed">
              <p className="text-sm md:text-lg">
                En Algérie, un mariage n&apos;est pas une simple fête. C&apos;est un héritage, un pont entre les générations, une œuvre d&apos;art collective.
              </p>
              <p className="text-xs md:text-base">
                LELLA est née d&apos;une conviction : chaque famille mérite d&apos;accéder aux plus grands talents du pays sans compromis, sans stress, sans passer par des heures de recherche sur les réseaux sociaux.
              </p>
            </div>

            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-sand/50">
              <p className="text-xs md:text-sm text-navy/30 italic">
                &mdash; Des artisans d&apos;exception, pour des moments d&apos;exception.
              </p>
            </div>
          </motion.div>

          {/* Image — masquée sur très petit écran */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 hidden sm:block relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="aspect-[4/5] bg-cover bg-center"
                style={{
                  backgroundImage: "url('/images/hero-details.jpg')",
                  filter: "sepia(0.1) saturate(0.9) brightness(0.9)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-3 md:-bottom-4 -right-3 md:-right-4 bg-navy text-white px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-xl border border-gold/20"
            >
              <p className="text-xl md:text-2xl font-serif font-bold text-gold">2026</p>
              <p className="text-[9px] md:text-[10px] text-white/50 tracking-wider uppercase">Fondée en Algérie</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
