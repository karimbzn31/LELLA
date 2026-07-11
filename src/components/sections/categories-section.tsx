"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { categories } from "@/lib/mock-data";

// Les 6 catégories dans l'ordre demandé par Karim
// Chacune avec une vraie image hero en fond (pas un SVG abstrait)
const FEATURED_CATEGORIES = [
  {
    id: "salle-des-fetes",
    name: "Salle des Fêtes",
    count: 48,
    image: "/images/categories/salle-des-fetes.jpg",
    desc: "Salles de réception prestigieuses pour votre célébration",
  },
  {
    id: "traiteur",
    name: "Traiteur",
    count: 56,
    image: "/images/categories/traiteur.jpg",
    desc: "Cuisine raffinée alliant tradition algérienne et gastronomie",
  },
  {
    id: "neggafa",
    name: "Neggafa",
    count: 50,
    image: "/images/categories/neggafa.jpg",
    desc: "L'art du changement de tenues et de la mise en beauté",
  },
  {
    id: "photographe",
    name: "Photographe Mariage",
    count: 62,
    image: "/images/categories/photographe.jpg",
    desc: "Immortalisez chaque instant de votre journée",
  },
  {
    id: "orchestre",
    name: "Orchestre & Musique",
    count: 30,
    image: "/images/categories/orchestre.jpg",
    desc: "Chaâbi, andalou, moderne — l'ambiance de votre soirée",
  },
  {
    id: "robe-mariee",
    name: "Robes & Costumes",
    count: 42,
    image: "/images/categories/robe.jpg",
    desc: "Créateurs de robes de mariée et tenues traditionnelles",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-24 md:py-32 bg-navy relative overflow-hidden">
      {/* Motif zellige */}
      <div className="absolute inset-0 pattern-zellige opacity-[0.06]" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-transparent to-navy/80" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold/40" />
            <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-medium">Par catégories</span>
            <span className="h-px w-8 bg-gold/40" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
            L&apos;artisan de votre bonheur
          </h2>
          <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto mt-4">
            Des professionnels passionnés pour chaque instant de votre célébration.
          </p>
        </div>

        {/* Grille — 3x2 avec VRAIES images en fond */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {FEATURED_CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[280px] md:h-[320px] rounded-2xl overflow-hidden cursor-pointer"
            >
              <Link href={`/marketplace?category=${cat.id}`} className="block w-full h-full">
                {/* VRAIE image en fond — TOUJOURS visible, zoom au hover */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay dégradé foncé pour la lisibilité */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-navy/20 transition-opacity duration-500 group-hover:from-navy/90" />
                <div className="absolute inset-0 bg-gradient-to-r from-navy/40 to-transparent" />

                {/* Hover : révélation dorée */}
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/30 rounded-2xl transition-all duration-500" />

                {/* Contenu */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                  {/* Numéro décoratif */}
                  <div className="text-[60px] md:text-[80px] font-serif font-bold text-white/5 absolute top-4 right-4 leading-none select-none">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Petite icône en haut à gauche — catégorie */}
                  <div className="mb-auto">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-gold/20 transition-colors border border-gold/20">
                      <Users size={22} className="text-gold opacity-80" />
                    </div>
                  </div>

                  {/* Texte en bas */}
                  <div>
                    {/* Compteur */}
                    <span className="text-xs text-gold/70 font-medium tracking-wider uppercase">
                      {cat.count} prestataires
                    </span>

                    {/* Titre */}
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-white group-hover:text-gold transition-colors mt-1">
                      {cat.name}
                    </h3>

                    {/* Description courte */}
                    <p className="text-sm text-white/50 mt-1 line-clamp-1 group-hover:line-clamp-2 transition-all">
                      {cat.desc}
                    </p>

                    {/* Explorer — apparaît au hover */}
                    <span className="inline-flex items-center gap-1 text-gold/60 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
                      Explorer <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 text-gold/80 hover:text-gold text-sm tracking-wider uppercase font-medium transition-all group"
          >
            Découvrir toutes les catégories
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
