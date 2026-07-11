"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, SlidersHorizontal, MapPin, Grid3X3, List,
  X, ArrowUpDown, Heart, ChevronLeft, ChevronRight,
  Star, Sparkles, Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardImage } from "@/components/ui/card";
import { StarRating } from "@/components/ui/star-rating";
import { PriceDisplay } from "@/components/ui/price-display";
import { providers as allProviders, categories } from "@/lib/mock-data";
import { toggleFavorite } from "@/lib/data-access";
import { cn } from "@/lib/utils";
import type { Provider } from "@/types";

const ALL_WILAYAS = [...new Set(allProviders.map(p => p.location.wilaya))].sort();
const SORT_OPTIONS = [
  { value: "popularity", label: "Popularite" },
  { value: "price_asc", label: "Prix croissant" },
  { value: "price_desc", label: "Prix decroissant" },
  { value: "rating", label: "Note" },
] as const;

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedWilaya, setSelectedWilaya] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<"popularity" | "price_asc" | "price_desc" | "rating">("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const ITEMS_PER_PAGE = 9;
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("lella_favorites") || "[]");
  });

  // Simuler un chargement
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  // Categories en tete
  const categoryPills = useMemo(() => {
    const featured = ["salle-des-fetes", "traiteur", "neggafa", "photographe", "orchestre", "robe-mariee", "dj-mariage", "decoration-salle", "hammam", "henne-artiste", "videaste", "wedding-planner"];
    return featured.map(id => categories.find(c => c.id === id)).filter(Boolean);
  }, []);

  // Filtrage
  const filteredProviders = useMemo(() => {
    let result = [...allProviders];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.location.wilaya.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
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
  }, [searchQuery, selectedCategory, selectedWilaya, minPrice, maxPrice, minRating, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProviders.length / ITEMS_PER_PAGE);
  const paginatedProviders = filteredProviders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, filteredProviders.length);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedCategory, selectedWilaya, sortBy, minPrice, maxPrice, minRating]);

  const handleFavorite = (id: string) => {
    toggleFavorite(id);
    setFavorites(p => p.includes(id) ? p.filter(f => f !== id) : [...p, id]);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedWilaya(null);
    setMinPrice(0);
    setMaxPrice(500000);
    setMinRating(0);
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedWilaya || minPrice > 0 || maxPrice < 500000 || minRating > 0;

  const BudgetRange = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-navy/60">Budget</span>
        <span className="text-sm font-medium text-gold">
          {minPrice.toLocaleString()} - {maxPrice.toLocaleString()} DZD
        </span>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={0}
          max={500000}
          step={10000}
          value={minPrice}
          onChange={e => setMinPrice(Number(e.target.value))}
          className="flex-1 accent-gold h-1.5"
        />
        <input
          type="range"
          min={0}
          max={500000}
          step={10000}
          value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          className="flex-1 accent-gold h-1.5"
        />
      </div>
    </div>
  );

  const FilterContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={cn("space-y-6", mobile && "p-6")}>
      {/* Wilaya filter */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-navy/80">Wilaya</label>
        <select
          value={selectedWilaya || ""}
          onChange={e => setSelectedWilaya(e.target.value || null)}
          className="input-premium w-full"
        >
          <option value="">Toutes les wilayas</option>
          {ALL_WILAYAS.map(w => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
      </div>

      {/* Budget */}
      <BudgetRange />

      {/* Note minimum */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-navy/80">Note minimum</label>
        <div className="flex items-center gap-2">
          {[0, 3, 3.5, 4, 4.5].map(r => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm transition-all",
                minRating === r
                  ? "bg-gold text-white"
                  : "bg-ivory text-navy/60 hover:bg-gold/10"
              )}
            >
              {r === 0 ? "Tous" : r + "+"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Skeleton
  if (loading) {
    return (
      <div className="pt-24 md:pt-28 pb-16">
        <div className="section-container mb-8">
          <div className="h-10 w-64 bg-ivory rounded-lg animate-pulse mb-2" />
          <div className="h-5 w-40 bg-ivory rounded-lg animate-pulse" />
        </div>
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <div className="h-48 bg-ivory animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-3/4 bg-ivory rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-ivory rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-ivory rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-28 pb-16">
      {/* Header */}
      <div className="section-container mb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-sm text-navy/40 mb-1">
              <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
              <span>/</span>
              <span className="text-navy/60">{selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : "Prestataires"}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy">
              {selectedCategory
                ? categories.find(c => c.id === selectedCategory)?.name || "Prestataires"
                : searchQuery
                  ? `Resultats pour "${searchQuery}"`
                  : "Trouvez votre prestataire"}
            </h1>
            <p className="text-navy/50 mt-1">
              {filteredProviders.length} prestataire{filteredProviders.length > 1 ? "s" : ""} disponible{filteredProviders.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="section-container mb-6 overflow-x-auto">
        <div className="flex items-center gap-2 pb-2 min-w-max">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border",
              !selectedCategory
                ? "bg-gold text-white border-gold"
                : "bg-white text-navy/60 border-sand hover:border-gold/30 hover:text-gold"
            )}
          >
            Tous
          </button>
          {categoryPills.map(cat => cat && (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border",
                selectedCategory === cat.id
                  ? "bg-gold text-white border-gold"
                  : "bg-white text-navy/60 border-sand hover:border-gold/30 hover:text-gold"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Controls */}
      <div className="section-container mb-6">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30" />
            <input
              type="text"
              placeholder="Rechercher un prestataire, une categorie, une ville..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input-premium pl-12 pr-10 py-3 w-full"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/30 hover:text-navy">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              Filtres
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-gold" />}
            </Button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="input-premium appearance-none pr-10 py-3 cursor-pointer"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ArrowUpDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/30 pointer-events-none" />
            </div>

            <div className="flex items-center border border-sand rounded-radius-button overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={cn("p-3 transition-colors", viewMode === "grid" ? "bg-gold text-white" : "text-navy/40 hover:text-navy")}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn("p-3 transition-colors", viewMode === "list" ? "bg-gold text-white" : "text-navy/40 hover:text-navy")}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Mobile filter button */}
          <Button
            variant="outline"
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden flex items-center gap-2 justify-center"
          >
            <Filter size={16} />
            Filtres
            {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-gold" />}
          </Button>
        </div>

        {/* Desktop filters panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-6 bg-white rounded-radius-card shadow-card border border-sand/50"
            >
              <FilterContent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results */}
      <div className="section-container">
        {paginatedProviders.length === 0 ? (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-ivory flex items-center justify-center">
              <Search size={24} className="text-navy/20" />
            </div>
            <p className="text-navy/60 text-lg mb-2">Aucun prestataire trouve</p>
            <p className="text-navy/30 text-sm mb-8">
              On n a rien trouve avec ces criteres. Essayez d elargir votre recherche ou de modifier les filtres.
            </p>
            <Button variant="gold" onClick={clearFilters}>
              Reinitialiser les filtres
            </Button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProviders.map((provider, index) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                index={index}
                isFavorite={favorites.includes(provider.id)}
                onFavorite={() => handleFavorite(provider.id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedProviders.map((provider, index) => (
              <ProviderListItem
                key={provider.id}
                provider={provider}
                index={index}
                isFavorite={favorites.includes(provider.id)}
                onFavorite={() => handleFavorite(provider.id)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-8 border-t border-sand/30">
            <p className="text-sm text-navy/40">
              {startIndex}–{endIndex} sur {filteredProviders.length} prestataires
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                className="w-9 h-9 rounded-lg border border-sand text-navy/40 hover:text-navy hover:border-gold/30 disabled:opacity-30 flex items-center justify-center transition-all">
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page: number;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                return (
                  <button key={page} onClick={() => setCurrentPage(page)}
                    className={cn(
                      "w-9 h-9 rounded-lg text-sm font-medium transition-all",
                      page === currentPage ? "bg-gold text-white" : "text-navy/40 hover:text-navy hover:bg-ivory border border-sand"
                    )}>
                    {page}
                  </button>
                );
              })}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                className="w-9 h-9 rounded-lg border border-sand text-navy/40 hover:text-navy hover:border-gold/30 disabled:opacity-30 flex items-center justify-center transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Filters Bottom Sheet */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 lg:hidden"
            onClick={() => setShowMobileFilters(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-sand/50 p-4 rounded-t-3xl flex items-center justify-between z-10">
                <h3 className="font-semibold text-navy">Filtres</h3>
                <button onClick={() => setShowMobileFilters(false)} className="p-2 text-navy/40 hover:text-navy">
                  <X size={20} />
                </button>
              </div>
              <FilterContent mobile />
              <div className="p-4 border-t border-sand/50 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => { clearFilters(); setShowMobileFilters(false); }}>
                  Reinitialiser
                </Button>
                <Button variant="gold" className="flex-1" onClick={() => setShowMobileFilters(false)}>
                  Voir {filteredProviders.length} resultats
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Provider Card (Grid) ─────────────────────────────────────
function ProviderCard({ provider, index, isFavorite, onFavorite }: {
  provider: Provider; index: number; isFavorite: boolean; onFavorite: () => void;
}) {
  const cat = categories.find(c => c.id === provider.category);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="group h-full">
        <CardImage className="h-48 bg-gradient-to-br from-ivory to-sand">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gold text-4xl font-serif opacity-30">✦</span>
          </div>

          <button onClick={e => { e.preventDefault(); onFavorite(); }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all z-10"
            aria-label="Favoris">
            <Heart size={14} className={cn(isFavorite ? "fill-bordeaux text-bordeaux" : "text-navy/40")} />
          </button>

          <div className="absolute top-3 left-3 flex gap-2">
            {provider.isVerified && <Badge variant="gold">Verifie</Badge>}
            {provider.isFeatured && <Badge variant="default">Coup de c ur</Badge>}
          </div>
        </CardImage>

        <Link href={`/provider/${provider.slug}`}>
          <CardContent>
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-serif font-semibold text-navy group-hover:text-gold transition-colors">
                {provider.name}
              </h3>
              <div className="flex items-center gap-1 text-xs">
                <Star size={12} className="fill-gold text-gold" />
                <span className="text-navy/60 font-medium">{provider.rating}</span>
              </div>
            </div>
            <p className="text-xs text-navy/40 capitalize mb-2">{cat?.name || provider.category}</p>
            <div className="flex items-center gap-1 text-xs text-navy/40 mb-2">
              <MapPin size={12} />
              <span>{provider.location.wilaya}</span>
            </div>
            <p className="text-sm text-navy/60 line-clamp-2 mb-3">{provider.description}</p>
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
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/provider/${provider.slug}`}>
        <Card className="flex flex-col sm:flex-row overflow-hidden group">
          <div className="sm:w-48 h-40 bg-gradient-to-br from-ivory to-sand relative flex-shrink-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gold text-3xl font-serif opacity-30">✦</span>
            </div>
            <button onClick={e => { e.preventDefault(); onFavorite(); }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
              <Heart size={14} className={cn(isFavorite ? "fill-bordeaux text-bordeaux" : "text-navy/40")} />
            </button>
            <div className="absolute top-3 left-3 flex gap-2">
              {provider.isVerified && <Badge variant="gold">Verifie</Badge>}
            </div>
          </div>
          <CardContent className="flex-1 flex flex-col justify-center">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-serif font-semibold text-navy group-hover:text-gold transition-colors">
                  {provider.name}
                </h3>
                <p className="text-xs text-navy/40 capitalize">{cat?.name || provider.category}</p>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Star size={12} className="fill-gold text-gold" />
                <span className="text-navy/60 font-medium">{provider.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-navy/40 mt-1">
              <MapPin size={12} />
              <span>{provider.location.wilaya}</span>
            </div>
            <p className="text-sm text-navy/50 line-clamp-1 mt-2">{provider.description}</p>
            <div className="mt-2">
              <PriceDisplay min={provider.priceRange.min} max={provider.priceRange.max} />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
