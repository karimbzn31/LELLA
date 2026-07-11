"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FEATURED_CATEGORIES = [
  { id: "salle-des-fetes", name: "Salle des Fêtes", count: 48, image: "/images/categories/salle-des-fetes.jpg", desc: "Salles de réception prestigieuses" },
  { id: "traiteur", name: "Traiteur", count: 56, image: "/images/categories/traiteur.jpg", desc: "Cuisine raffinée algérienne et gastronomie" },
  { id: "neggafa", name: "Neggafa", count: 50, image: "/images/categories/neggafa.jpg", desc: "L'art du changement de tenues" },
  { id: "photographe", name: "Photographe Mariage", count: 62, image: "/images/categories/photographe.jpg", desc: "Immortalisez chaque instant" },
  { id: "orchestre", name: "Orchestre & Musique", count: 30, image: "/images/categories/orchestre.jpg", desc: "Chaâbi, andalou, moderne" },
  { id: "robe-mariee", name: "Robes & Costumes", count: 42, image: "/images/categories/robe.jpg", desc: "Créateurs de tenues traditionnelles" },
];

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-32 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 pattern-zellige opacity-[0.06]" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-transparent to-navy/80" />

      <div className="section-container relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
            <span className="h-px w-6 md:w-8 bg-gold/40" />
            <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-medium">Par catégories</span>
            <span className="h-px w-6 md:w-8 bg-gold/40" />
          </div>
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
            L&apos;artisan de votre bonheur
          </h2>
          <p className="text-white/40 text-sm md:text-lg max-w-xl mx-auto mt-2 md:mt-4">
            Des professionnels passionnés pour chaque instant de votre célébration.
          </p>
        </div>

        {/* Mobile: scroll horizontal — Desktop: grille 3x2 */}
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-5 flex md:block gap-4 overflow-x-auto snap-x-mandatory scrollbar-hide -mx-4 md:mx-0 px-4 md:px-0 pb-4 md:pb-0">
          {FEATURED_CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative flex-shrink-0 w-[260px] md:w-auto h-[220px] md:h-[300px] rounded-2xl overflow-hidden snap-start"
            >
              <Link href={`/marketplace?category=${cat.id}`} className="block w-full h-full">
                <Image src={cat.image} alt={cat.name} fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 260px, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-navy/10" />
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/30 rounded-2xl transition-all duration-500" />

                <div className="relative z-10 h-full flex flex-col justify-end p-4 md:p-8">
                  <span className="text-[10px] text-gold/70 font-medium tracking-wider uppercase mb-0.5">
                    {cat.count} prestataires
                  </span>
                  <h3 className="text-lg md:text-2xl font-serif font-bold text-white group-hover:text-gold transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs md:text-sm text-white/50 mt-0.5 line-clamp-1">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8 md:mt-10"
        >
          <Link href="/marketplace"
            className="inline-flex items-center gap-2 text-gold/80 hover:text-gold text-xs md:text-sm tracking-wider uppercase font-medium transition-all">
            Découvrir toutes les catégories
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
