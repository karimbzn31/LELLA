"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 md:py-32 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 pattern-zellige opacity-[0.06]" />

      <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle at center, rgba(199,164,93,0.18) 0%, transparent 60%)" }}
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute -bottom-20 -right-20 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-bordeaux/8 rounded-full blur-[100px]" />

      <div className="relative z-10 flex items-center justify-center gap-3 mb-6 md:mb-8">
        <span className="h-px w-8 md:w-12 bg-gold/30" />
        <span className="text-gold/30 text-xs font-serif">✦</span>
        <span className="h-px w-8 md:w-12 bg-gold/30" />
      </div>

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 flex-wrap mb-2 md:mb-4">
            <h2 className="text-2xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
              Votre histoire d&apos;amour
            </h2>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2.5 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-medium text-gold-light"
            >
              <motion.span animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                <Sparkles className="h-2.5 w-2.5 md:h-3 md:w-3 inline" />
              </motion.span>
              Nouveau
            </motion.span>
          </div>

          <h2 className="text-2xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-3 md:mb-4 max-w-3xl mx-auto">
            <span className="text-gradient">mérite une célébration à la hauteur</span>
          </h2>

          <p className="text-white/40 text-sm md:text-lg max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed px-4">
            Des milliers de familles nous ont déjà confié leur plus beau jour.
            <br className="hidden md:block" />Rejoignez-les.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
            <Link href="/marketplace" className="w-full sm:w-auto">
              <span className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-gold to-amber-600 text-white font-medium px-6 md:px-8 py-3.5 md:py-4 rounded-radius-button transition-all text-sm md:text-base group animate-glow">
                Trouver un prestataire
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link href="/auth/signup" className="w-full sm:w-auto">
              <span className="inline-flex items-center justify-center gap-2 w-full sm:w-auto border border-white/15 text-white/80 hover:bg-white/10 hover:text-white transition-all px-6 md:px-8 py-3.5 md:py-4 rounded-radius-button text-sm md:text-base">
                Devenir prestataire
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-3 mt-10 md:mt-16">
        <span className="h-px w-6 md:w-8 bg-gold/20" />
        <span className="text-gold/20 text-xs font-serif">✦</span>
        <span className="h-px w-6 md:w-8 bg-gold/20" />
      </div>
    </section>
  );
}
