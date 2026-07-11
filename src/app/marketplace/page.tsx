"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MapPin, Grid3X3, List, X, ArrowUpDown, Heart,
  ChevronLeft, ChevronRight, Star, SlidersHorizontal, Building2, Camera, Music,
  Sparkles, Car, ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardImage } from "@/components/ui/card";
import { PriceDisplay } from "@/components/ui/price-display";
import { providers as allProviders, categories, categoryGroups } from "@/lib/mock-data";
import { toggleFavorite } from "@/lib/data-access";
import { cn } from "@/lib/utils";
import type { Provider } from "@/types";

// ─── 10 wilayas clés d'Algérie ───────────────────────────────────
const TOP_WILAYAS = [
  "Alger", "Oran", "Constantine", "Annaba", "Sétif",
  "Blida", "Tizi Ouzou", "Béjaïa", "Tlemcen", "Mostaganem",
];

const SORT_OPTIONS = [
  { value: "popularity", label: "Popularité" },
  { value: "price_asc", label: "Prix croissant" },
  { value: "price_desc", label: "Prix décroissant" },
  { value: "rating", label: "Note" },
] as const;

// ─── Genres (familles) avec leurs sous-catégories ────────────────
const GENRE_ICONS: Record<string, React.ReactNode> = {
  "Lieu & Réception": <Building2 size={18} />,
  "Image & Souvenir": <Camera size={18} />,
  "Musique & Ambiance": <Music size={18} />,
  "Beauté & Style": <Sparkles size={18} />,
  "Transport & Logistique": <Car size={18} />,
  "Organisation": <ClipboardList size={18} />,
};

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedWilaya, setSelectedWilaya] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<"popularity" | "price_asc" | "price_desc" | "rating">("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const ITEMS_PER_PAGE = 6;
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("lella_favorites") || "[]");
  });

  useEffect(() => { const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t); }, []);

  const filteredProviders = useMemo(() => {
    let result = [...allProviders];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)) || p.location.wilaya.toLowerCase().includes(q));
    }
    if (selectedGenre) {
      const group = categoryGroups.find(g => g.name === selectedGenre);
      if (group) {
        result = result.filter(p => group.categories.includes(p.category));
      }
    }
    if (selectedWilaya) result = result.filter(p => p.location.wilaya === selectedWilaya);
    if (minPrice > 0) result = result.filter(p => p.priceRange.max >= minPrice);
    if (maxPrice < 500000) result = result.filter(p => p.priceRange.min <= maxPrice);
    if (minRating > 0) result = result.filter(p => p.rating >= minRating);
    switch (sortBy) {
      case "popularity": result.sort((a, b) => b.reviewCount - a.reviewCount); break;
      case "price_asc": result.sort((a, b) => a.priceRange.min - b.priceRange.min); break;
      case "price_desc": result.sort((a, b) => b.priceRange.min - a.priceRange.min); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [searchQuery, selectedGenre, selectedWilaya, minPrice, maxPrice, minRating, sortBy]);

  const totalPages = Math.ceil(filteredProviders.length / ITEMS_PER_PAGE);
  const paginatedProviders = filteredProviders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, filteredProviders.length);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedGenre, selectedWilaya, sortBy, minPrice, maxPrice, minRating]);

  const handleFavorite = (id: string) => {
    toggleFavorite(id);
    setFavorites(p => p.includes(id) ? p.filter(f => f !== id) : [...p, id]);
  };

  const clearFilters = () => { setSearchQuery(""); setSelectedGenre(null); setSelectedWilaya(null); setMinPrice(0); setMaxPrice(500000); setMinRating(0); };
  const hasActiveFilters = searchQuery || selectedGenre || selectedWilaya || minPrice > 0 || maxPrice < 500000 || minRating > 0;

  // Skeleton loading
  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-ivory">
        <div className="section-container mb-6">
          <div className="h-5 w-40 bg-white rounded-lg animate-pulse mb-1" />
          <div className="h-8 w-56 bg-white rounded-lg animate-pulse" />
        </div>
        <div className="section-container mb-6">
          <div className="flex gap-2 pb-2">
            {[1,2,3,4,5].map(i => <div key={i} className="h-9 w-24 bg-white rounded-full animate-pulse shrink-0" />)}
          </div>
          <div className="mt-3 h-12 w-full bg-white rounded-xl animate-pulse" />
        </div>
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="rounded-2xl overflow-hidden bg-white">
                <div className="h-40 bg-ivory animate-pulse" />
                <div className="p-4 space-y-2.5">
                  <div className="h-4 w-3/4 bg-ivory rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-ivory rounded animate-pulse" />
                  <div className="h-3 w-2/3 bg-ivory rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-28 pb-24 md:pb-16 bg-ivory min-h-screen">
      {/* Header */}
      <div className="section-container mb-4">
        <div className="flex items-center gap-2 text-xs md:text-sm text-navy/40 mb-1 overflow-x-auto scrollbar-hide whitespace-nowrap">
          <Link href="/" className="hover:text-gold shrink-0">Accueil</Link>
          <span className="shrink-0">/</span>
          <span className="text-navy/60 shrink-0">{selectedGenre ? selectedGenre : "Prestataires"}</span>
        </div>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-navy">
          {selectedGenre ? selectedGenre
            : searchQuery ? `Résultats pour "${searchQuery}"`
            : "Trouvez votre prestataire"}
        </h1>
        <p className="text-xs md:text-sm text-navy/50 mt-0.5">
          {filteredProviders.length} prestataire{filteredProviders.length > 1 ? "s" : ""} disponible{filteredProviders.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Category Pills — GENRES (6 familles) seulement */}
      <div className="section-container mb-4 overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex items-center gap-2 pb-1 min-w-max">
          <button onClick={() => setSelectedGenre(null)}
            className={cn("px-4 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all border whitespace-nowrap min-h-[40px] flex items-center gap-1.5",
              !selectedGenre ? "bg-gold text-white border-gold shadow-md shadow-gold/20" : "bg-white text-navy/60 border-sand hover:border-gold/30 hover:text-gold")}>
            Tous
          </button>
          {categoryGroups.map(group => {
            const isActive = selectedGenre === group.name;
            const Icon = GENRE_ICONS[group.name] || null;
            return (
              <button key={group.name} onClick={() => setSelectedGenre(isActive ? null : group.name)}
                className={cn("px-4 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all border whitespace-nowrap min-h-[40px] flex items-center gap-1.5",
                  isActive ? "bg-gold text-white border-gold shadow-md shadow-gold/20" : "bg-white text-navy/60 border-sand hover:border-gold/30 hover:text-gold")}>
                {Icon}
                <span>{group.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search + Controls */}
      <div className="section-container mb-4">
        <div className="flex items-center gap-2">
          {/* Search — full width sur mobile */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/30" />
            <input type="text" placeholder="Rechercher..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input-premium pl-10 pr-9 py-2.5 md:py-3 text-sm w-full rounded-xl"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/30 hover:text-navy">
                <X size={15} />
              </button>
            )}
          </div>

          {/* Filter button — mobile + desktop */}
          <button onClick={() => setShowMobileFilters(true)}
            className={cn(
              "flex items-center gap-2 h-[44px] px-4 md:px-5 rounded-xl border text-sm font-medium transition-all shrink-0",
              hasActiveFilters ? "bg-gold text-white border-gold" : "bg-white text-navy/60 border-sand hover:border-gold/30"
            )}>
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline">Filtres</span>
            {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
          </button>

          {/* Sort dropdown desktop */}
          <div className="hidden md:block relative">
            <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className="input-premium appearance-none pr-10 py-2.5 md:py-3 cursor-pointer text-sm rounded-xl">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ArrowUpDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/30 pointer-events-none" />
          </div>

          {/* View toggle desktop */}
          <div className="hidden md:flex items-center border border-sand rounded-xl overflow-hidden">
            <button onClick={() => setViewMode("grid")}
              className={cn("p-3 transition-colors", viewMode === "grid" ? "bg-gold text-white" : "text-navy/40 hover:text-navy")}>
              <Grid3X3 size={18} />
            </button>
            <button onClick={() => setViewMode("list")}
              className={cn("p-3 transition-colors", viewMode === "list" ? "bg-gold text-white" : "text-navy/40 hover:text-navy")}>
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="section-container">
        {paginatedProviders.length === 0 ? (
          <div className="text-center py-16 max-w-sm mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold/10 to-ivory flex items-center justify-center shadow-sm border border-gold/10">
              <Search size={28} className="text-gold/40" />
            </div>
            <p className="text-navy/70 text-lg font-serif font-semibold mb-1">Aucun prestataire pour l'instant</p>
            <p className="text-navy/30 text-sm mb-2">Les prestataires arrivent bientôt !</p>
            <p className="text-navy/20 text-xs mb-8 max-w-[260px] mx-auto leading-relaxed">
              Nous recrutons les meilleurs talents d'Algérie pour vous offrir un service d'exception.
            </p>
            <Button variant="gold" size="sm" onClick={clearFilters} className="shadow-lg shadow-gold/20">
              ← Retour
            </Button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedProviders.map((provider, index) => (
              <ProviderCard key={provider.id} provider={provider} index={index}
                isFavorite={favorites.includes(provider.id)} onFavorite={() => handleFavorite(provider.id)} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {paginatedProviders.map((provider, index) => (
              <ProviderListItem key={provider.id} provider={provider} index={index}
                isFavorite={favorites.includes(provider.id)} onFavorite={() => handleFavorite(provider.id)} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-8 pt-6 border-t border-sand/30">
            <p className="text-xs md:text-sm text-navy/40">
              {startIndex}–{endIndex} sur {filteredProviders.length} prestataires
            </p>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                className="min-w-[36px] h-9 rounded-lg border border-sand text-navy/40 hover:text-navy hover:border-gold/30 disabled:opacity-30 flex items-center justify-center transition-all">
                <ChevronLeft size={15} />
              </button>
              {paginationNumbers(currentPage, totalPages).map(page => (
                <button key={page} onClick={() => setCurrentPage(page)}
                  className={cn("min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all",
                    page === currentPage ? "bg-gold text-white" : "text-navy/40 hover:text-navy hover:bg-ivory border border-sand")}>
                  {page}
                </button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                className="min-w-[36px] h-9 rounded-lg border border-sand text-navy/40 hover:text-navy hover:border-gold/30 disabled:opacity-30 flex items-center justify-center transition-all">
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Filters Bottom Sheet */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)}>
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto pb-safe shadow-2xl">

              {/* Header with drag handle */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-xl z-10">
                <div className="flex justify-center pt-2 pb-1">
                  <div className="w-10 h-1 rounded-full bg-sand/50" />
                </div>
                <div className="flex items-center justify-between px-5 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                      <SlidersHorizontal size={15} className="text-gold" />
                    </div>
                    <h3 className="font-semibold text-navy text-lg">Filtres</h3>
                    {hasActiveFilters && (
                      <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                    )}
                  </div>
                  <button onClick={() => setShowMobileFilters(false)}
                    className="w-8 h-8 rounded-full bg-ivory flex items-center justify-center text-navy/40 hover:text-navy hover:bg-sand/50 transition-all active:scale-90">
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Filter sections */}
              <div className="px-5 pb-4 space-y-5">
                {/* Wilaya */}
                <div className="bg-ivory/50 rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-navy/5 flex items-center justify-center">
                      <MapPin size={12} className="text-navy/40" />
                    </div>
                    <label className="text-sm font-semibold text-navy">Wilaya</label>
                  </div>
                  <select value={selectedWilaya || ""} onChange={e => setSelectedWilaya(e.target.value || null)}
                    className="w-full px-3.5 py-3 bg-white rounded-xl text-sm border border-sand/50 focus:border-gold/50 focus:ring-2 focus:ring-gold/10 outline-none transition-all appearance-none">
                    <option value="">Toutes les wilayas</option>
                    {TOP_WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>

                {/* Budget */}
                <div className="bg-ivory/50 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-navy/5 flex items-center justify-center">
                        <span className="text-navy/40 text-xs font-bold">$</span>
                      </div>
                      <label className="text-sm font-semibold text-navy">Budget maximum</label>
                    </div>
                    <span className="text-sm font-bold text-gold bg-gold/10 px-3 py-1 rounded-full">
                      {maxPrice.toLocaleString()} DZD
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <input type="range" min={50000} max={500000} step={10000} value={maxPrice}
                      onChange={e => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-gold h-2 appearance-none bg-gradient-to-r from-gold/30 to-gold rounded-full outline-none"
                      style={{
                        background: `linear-gradient(to right, #C7A45D 0%, #C7A45D ${(maxPrice / 500000) * 100}%, #E8DDD0 ${(maxPrice / 500000) * 100}%, #E8DDD0 100%)`,
                      }}
                    />
                    <div className="flex justify-between text-[10px] text-navy/30 mt-1">
                      <span>50 000 DZD</span>
                      <span>500 000 DZD</span>
                    </div>
                  </div>
                </div>

                {/* Note min — version étoiles */}
                <div className="bg-ivory/50 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-navy/5 flex items-center justify-center">
                      <Star size={12} className="fill-gold text-gold" />
                    </div>
                    <label className="text-sm font-semibold text-navy">Note minimum</label>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { val: 0, label: "Tous" },
                      { val: 3, label: "⭐⭐⭐" },
                      { val: 3.5, label: "⭐⭐⭐½" },
                      { val: 4, label: "⭐⭐⭐⭐" },
                      { val: 4.5, label: "⭐⭐⭐⭐½" },
                    ].map(r => (
                      <button key={r.val} onClick={() => setMinRating(r.val)}
                        className={cn("py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all active:scale-95",
                          minRating === r.val
                            ? "bg-gold text-white shadow-md shadow-gold/20"
                            : "bg-white text-navy/60 border border-sand/50 hover:border-gold/30")}>
                        {r.val === 0 ? "Tous" : r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tri */}
                <div className="bg-ivory/50 rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-navy/5 flex items-center justify-center">
                      <ArrowUpDown size={12} className="text-navy/40" />
                    </div>
                    <label className="text-sm font-semibold text-navy">Trier par</label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {SORT_OPTIONS.map(o => (
                      <button key={o.value} onClick={() => setSortBy(o.value as typeof sortBy)}
                        className={cn("py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95",
                          sortBy === o.value
                            ? "bg-gold text-white shadow-md shadow-gold/20"
                            : "bg-white text-navy/60 border border-sand/50 hover:border-gold/30")}>
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer buttons */}
              <div className="sticky bottom-0 bg-white/95 backdrop-blur-xl border-t border-sand/30 p-4 flex gap-3">
                <button onClick={() => { clearFilters(); setShowMobileFilters(false); }}
                  className="flex-1 py-3.5 rounded-xl border-2 border-sand/50 text-navy/50 text-sm font-semibold min-h-[48px] hover:border-navy/20 hover:text-navy transition-all active:scale-[0.98]">
                  Réinitialiser
                </button>
                {filteredProviders.length > 0 ? (
                  <button onClick={() => setShowMobileFilters(false)}
                    className="flex-1 py-3.5 rounded-xl gold-gradient text-white text-sm font-semibold min-h-[48px] shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 transition-all active:scale-[0.98]">
                    Voir {filteredProviders.length} résultat{filteredProviders.length > 1 ? "s" : ""}
                  </button>
                ) : (
                  <button onClick={() => setShowMobileFilters(false)}
                    className="flex-1 py-3.5 rounded-xl bg-navy/10 text-navy/30 text-sm font-semibold min-h-[48px] cursor-not-allowed">
                    Aucun résultat
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Helper ─────────────────────────────────────────────────────
function paginationNumbers(page: number, total: number): number[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, 4, total];
  if (page >= total - 2) return [1, total - 3, total - 2, total - 1, total];
  return [1, page - 1, page, page + 1, total];
}

// ─── Provider Card (Grid) ─────────────────────────────────────
function ProviderCard({ provider, index, isFavorite, onFavorite }: {
  provider: Provider; index: number; isFavorite: boolean; onFavorite: () => void;
}) {
  const cat = categories.find(c => c.id === provider.category);
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
      <Card className="group h-full overflow-hidden">
        <CardImage className="h-40 md:h-48 bg-gradient-to-br from-ivory to-sand relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gold text-3xl md:text-4xl font-serif opacity-30 select-none">✦</span>
          </div>
          <button onClick={e => { e.preventDefault(); onFavorite(); }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all z-10">
            <Heart size={14} className={cn(isFavorite ? "fill-bordeaux text-bordeaux" : "text-navy/40")} />
          </button>
          <div className="absolute top-2.5 left-2.5 flex gap-1.5">
            {provider.isVerified && <Badge variant="gold" className="text-[9px] px-1.5 py-0.5">✓ Vérifié</Badge>}
            {provider.isFeatured && <Badge variant="default" className="text-[9px] px-1.5 py-0.5">Coup de ❤</Badge>}
          </div>
        </CardImage>
        <Link href={`/provider/${provider.slug}`}>
          <CardContent className="p-3.5 md:p-5">
            <div className="flex items-start justify-between gap-2 mb-0.5">
              <h3 className="font-serif font-semibold text-sm md:text-base text-navy group-hover:text-gold transition-colors leading-tight">{provider.name}</h3>
              <div className="flex items-center gap-1 shrink-0">
                <Star size={11} className="fill-gold text-gold" />
                <span className="text-xs text-navy/60 font-medium">{provider.rating}</span>
              </div>
            </div>
            <p className="text-[10px] md:text-xs text-navy/40 capitalize mb-1">{cat?.name || provider.category}</p>
            <div className="flex items-center gap-1 text-[10px] md:text-xs text-navy/40 mb-1.5">
              <MapPin size={10} /><span>{provider.location.wilaya}</span>
            </div>
            <p className="text-xs md:text-sm text-navy/60 line-clamp-2 mb-2.5 leading-relaxed">{provider.description}</p>
            <PriceDisplay min={provider.priceRange.min} max={provider.priceRange.max} />
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
}

// ─── Provider List Item ───────────────────────────────────────
function ProviderListItem({ provider, index, isFavorite, onFavorite }: {
  provider: Provider; index: number; isFavorite: boolean; onFavorite: () => void;
}) {
  const cat = categories.find(c => c.id === provider.category);
  return (
    <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }}>
      <Link href={`/provider/${provider.slug}`}>
        <Card className="flex overflow-hidden group">
          <div className="w-24 md:w-48 h-24 md:h-40 bg-gradient-to-br from-ivory to-sand relative shrink-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gold text-xl md:text-3xl font-serif opacity-30">✦</span>
            </div>
            <button onClick={e => { e.preventDefault(); onFavorite(); }}
              className="absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
              <Heart size={11} className={cn(isFavorite ? "fill-bordeaux text-bordeaux" : "text-navy/40")} />
            </button>
            <div className="absolute top-2 left-2">
              {provider.isVerified && <Badge variant="gold" className="text-[8px] px-1 py-0">✓</Badge>}
            </div>
          </div>
          <CardContent className="flex-1 flex flex-col justify-center py-2.5 px-3 md:py-5 md:px-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-serif font-semibold text-sm md:text-base text-navy group-hover:text-gold transition-colors">{provider.name}</h3>
                <p className="text-[10px] md:text-xs text-navy/40 capitalize">{cat?.name || provider.category}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star size={10} className="fill-gold text-gold" />
                <span className="text-[10px] md:text-xs text-navy/60 font-medium">{provider.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] md:text-xs text-navy/40 mt-0.5">
              <MapPin size={10} /><span>{provider.location.wilaya}</span>
            </div>
            <p className="text-[10px] md:text-sm text-navy/50 line-clamp-1 mt-1">{provider.description}</p>
            <div className="mt-1"><PriceDisplay min={provider.priceRange.min} max={provider.priceRange.max} /></div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
