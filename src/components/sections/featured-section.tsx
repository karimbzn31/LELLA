"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Star, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getFeaturedProviders } from "@/lib/mock-data";
import { toggleFavorite, isFavorite } from "@/lib/data-access";
import { formatPrice, cn } from "@/lib/utils";
import { useState } from "react";

const featured = getFeaturedProviders();

export function FeaturedSection() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("lella_favorites") || "[]");
  });

  const handleFav = (id: string) => {
    toggleFavorite(id);
    setFavorites((p) => p.includes(id) ? p.filter((f) => f !== id) : [...p, id]);
  };

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Motif subtil */}
      <div className="absolute inset-0 opacity-[0.015] pattern-zellige" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-medium">Sélection LELLA</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-navy leading-tight">
              Nos coups de cœur
            </h2>
            <p className="text-navy/50 mt-3 max-w-lg">
              Des prestataires d&apos;exception, rigoureusement sélectionnés par notre équipe.
            </p>
          </div>
          <Link
            href="/marketplace"
            className="hidden md:inline-flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all group flex-shrink-0"
          >
            Voir tout <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.slice(0, 3).map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/provider/${provider.slug}`} className="block">
                <div className="bg-ivory rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                  {/* Image area — plus grande, plus immersive */}
                  <div className="relative h-56 md:h-64 bg-gradient-to-br from-amber-900/10 to-navy/20 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-serif text-gold/20 group-hover:scale-110 transition-transform duration-700">✦</span>
                    </div>

                    {/* Bouton favori */}
                    <button
                      onClick={(e) => { e.preventDefault(); handleFav(provider.id); }}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all z-10"
                    >
                      <Heart size={15} className={cn(favorites.includes(provider.id) ? "fill-bordeaux text-bordeaux" : "text-navy/40")} />
                    </button>

                    {/* Badge en haut */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {provider.isVerified && <Badge variant="gold">✓ Vérifié</Badge>}
                      {provider.isFeatured && <Badge variant="default">Coup de cœur</Badge>}
                    </div>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ivory/80 via-transparent to-transparent" />
                  </div>

                  {/* Contenu */}
                  <div className="px-5 pb-6 -mt-2 relative z-10">
                    {/* Catégorie */}
                    <p className="text-[10px] tracking-widest uppercase text-gold font-medium mb-1">{provider.category}</p>

                    {/* Nom */}
                    <h3 className="text-xl font-serif font-semibold text-navy group-hover:text-gold transition-colors mb-2">
                      {provider.name}
                    </h3>

                    {/* Localisation + note */}
                    <div className="flex items-center justify-between text-sm mb-3">
                      <div className="flex items-center gap-1 text-navy/40">
                        <MapPin size={13} />
                        <span>{provider.location.wilaya}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={13} className="fill-gold text-gold" />
                        <span className="text-navy/60 font-medium">{provider.rating}</span>
                        <span className="text-navy/30">({provider.reviewCount})</span>
                      </div>
                    </div>

                    {/* Prix */}
                    <div className="flex items-center justify-between pt-3 border-t border-sand/30">
                      <span className="text-xs text-navy/40">À partir de</span>
                      <span className="text-sm font-semibold text-navy">{formatPrice(provider.priceRange.min)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA mobile */}
        <div className="text-center mt-10 md:hidden">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 text-gold text-sm font-medium"
          >
            Voir tous les prestataires <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
