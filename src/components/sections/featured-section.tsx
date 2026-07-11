"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Star, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getFeaturedProviders } from "@/lib/mock-data";
import { toggleFavorite } from "@/lib/data-access";
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

  if (featured.length === 0) return null;

  return (
    <section className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015] pattern-zellige" />

      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-16">
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <span className="h-px w-6 md:w-8 bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-medium">Sélection LELLA</span>
            </div>
            <h2 className="text-2xl md:text-5xl lg:text-6xl font-serif font-bold text-navy leading-tight">
              Nos coups de cœur
            </h2>
            <p className="text-navy/50 text-sm md:text-base mt-2 max-w-lg">
              Des prestataires d&apos;exception, rigoureusement sélectionnés.
            </p>
          </div>
        </div>

        {/* Mobile: scroll horizontal — Desktop: grille */}
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8 flex md:block gap-4 overflow-x-auto snap-x-mandatory scrollbar-hide -mx-4 md:mx-0 px-4 md:px-0 pb-4 md:pb-0">
          {featured.slice(0, 6).map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group flex-shrink-0 w-[280px] md:w-auto"
            >
              <Link href={`/provider/${provider.slug}`} className="block">
                <div className="bg-ivory rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                  <div className="relative h-44 md:h-56 bg-gradient-to-br from-amber-900/10 to-navy/20 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl font-serif text-gold/20">✦</span>
                    </div>
                    <button onClick={(e) => { e.preventDefault(); handleFav(provider.id); }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all z-10">
                      <Heart size={14} className={cn(favorites.includes(provider.id) ? "fill-bordeaux text-bordeaux" : "text-navy/40")} />
                    </button>
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {provider.isVerified && <Badge variant="gold" className="text-[9px] px-1.5 py-0.5">✓ Vérifié</Badge>}
                      {provider.isFeatured && <Badge variant="default" className="text-[9px] px-1.5 py-0.5">Coup de cœur</Badge>}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-ivory/80 via-transparent to-transparent" />
                  </div>

                  <div className="px-4 pb-4 md:px-5 md:pb-6 -mt-2 relative z-10">
                    <p className="text-[9px] md:text-[10px] tracking-widest uppercase text-gold font-medium mb-0.5">{provider.category}</p>
                    <h3 className="text-base md:text-xl font-serif font-semibold text-navy group-hover:text-gold transition-colors mb-1.5">{provider.name}</h3>
                    <div className="flex items-center justify-between text-xs md:text-sm mb-2">
                      <div className="flex items-center gap-1 text-navy/40">
                        <MapPin size={11} /><span>{provider.location.wilaya}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={11} className="fill-gold text-gold" />
                        <span className="text-navy/60 font-medium">{provider.rating}</span>
                        <span className="text-navy/30">({provider.reviewCount})</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-sand/30">
                      <span className="text-[10px] md:text-xs text-navy/40">À partir de</span>
                      <span className="text-xs md:text-sm font-semibold text-navy">{formatPrice(provider.priceRange.min)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/marketplace" className="inline-flex items-center gap-2 text-gold text-sm font-medium">
            Voir tous les prestataires <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
