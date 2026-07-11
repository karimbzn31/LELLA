"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-navy relative overflow-hidden">
      {/* Motif zellige */}
      <div className="absolute inset-0 pattern-zellige opacity-[0.06]" />

      {/* Glow orbes */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(199,164,93,0.18) 0%, transparent 60%)",
        }}
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-bordeaux/8 rounded-full blur-[100px]" />

      {/* Ornement supérieur */}
      <div className="relative z-10 flex items-center justify-center gap-3 mb-8">
        <span className="h-px w-12 bg-gold/30" />
        <span className="text-gold/30 text-xs font-serif">✦</span>
        <span className="h-px w-12 bg-gold/30" />
      </div>

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Titre avec badge Nouveau */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
              Votre histoire d&apos;amour
            </h2>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-gold-light"
            >
              <motion.span
                animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-3 w-3 inline" />
              </motion.span>
              Nouveau
            </motion.span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-4 max-w-3xl mx-auto">
            <span className="text-gradient">mérite une célébration à la hauteur</span>
          </h2>

          <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Des milliers de familles nous ont déjà confié leur plus beau jour.
            <br />Rejoignez-les et laissez les plus grands talents d&apos;Algérie embellir votre amour.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/marketplace">
              <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-amber-600 text-white font-medium px-8 py-4 rounded-radius-button transition-all text-base group animate-glow">
                  Trouver un prestataire
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
              </motion.span>
            </Link>
            <Link href="/auth/signup">
              <span className="inline-flex items-center gap-2 border border-white/15 text-white/80 hover:bg-white/10 hover:text-white transition-all px-8 py-4 rounded-radius-button text-base">
                Devenir prestataire
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Ornement inférieur */}
      <div className="relative z-10 flex items-center justify-center gap-3 mt-16">
        <span className="h-px w-8 bg-gold/20" />
        <span className="text-gold/20 text-xs font-serif">✦</span>
        <span className="h-px w-8 bg-gold/20" />
      </div>
    </section>
  );
}
