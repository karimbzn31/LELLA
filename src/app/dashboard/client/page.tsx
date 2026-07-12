"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CalendarCheck, FileText, Heart, Bell, ArrowRight, Search,
  MapPin, Star, Store, Clock, ChevronRight, Sparkles, Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { useAuthStore } from "@/store";
import { providers, getFeaturedProviders } from "@/lib/mock-data";
import { toggleFavorite, isFavorite, getFavorites } from "@/lib/data-access";
import { formatPrice, cn } from "@/lib/utils";

export default function ClientDashboard() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"dashboard" | "favorites" | "bookings">("dashboard");
  const [savedFavs, setSavedFavs] = useState<string[]>([]);

  useEffect(() => {
    setSavedFavs(getFavorites());
  }, []);

  const userFavorites = providers.filter(p => savedFavs.includes(p.id));
  const featured = getFeaturedProviders().slice(0, 3);
  const recentProviders = providers.slice(0, 4);

  const stats = [
    { label: "Mes réservations", value: "3", icon: CalendarCheck, color: "text-gold", bg: "bg-gold/10" },
    { label: "Devis en cours", value: "2", icon: FileText, color: "text-bordeaux", bg: "bg-bordeaux/10" },
    { label: "Favoris", value: savedFavs.length.toString(), icon: Heart, color: "text-terracotta", bg: "bg-terracotta/10" },
    { label: "Notifications", value: "5", icon: Bell, color: "text-navy", bg: "bg-navy/5" },
  ];

  const handleRemoveFav = (id: string) => {
    toggleFavorite(id);
    setSavedFavs(prev => prev.filter(f => f !== id));
  };

  return (
    <div className="flex min-h-screen pt-14 md:pt-20 bg-ivory/30">
      <DashboardSidebar />
      <div className="flex-1 p-4 md:p-8 lg:p-10 pb-24 md:pb-10">

        {/* ═══ MENU ONGLETS ═════════════════════════════════ */}
        <div className="flex gap-1 md:gap-2 mb-6 md:mb-8 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {[
            { id: "dashboard", label: "📊 Tableau de bord" },
            { id: "favorites", label: `❤️ Favoris (${savedFavs.length})` },
            { id: "bookings", label: "📅 Mes prestataires" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn("px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all border whitespace-nowrap",
                activeTab === tab.id ? "bg-gold text-white border-gold" : "bg-white text-navy/50 border-sand/50 hover:border-gold/30")}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════ */}
        {/* VUE : TABLEAU DE BORD                            */}
        {/* ════════════════════════════════════════════════════ */}
        {activeTab === "dashboard" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {/* Welcome */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                Bonjour, {user?.name || "Invité"} 👋
              </h1>
              <p className="text-navy/50 text-sm mt-1">Trouvez les meilleurs prestataires pour votre événement.</p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
              {stats.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <Card hover={false}>
                    <CardContent className="p-4 md:p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                          <stat.icon size={18} className={stat.color} />
                        </div>
                        <span className="text-xl md:text-2xl font-serif font-bold text-navy">{stat.value}</span>
                      </div>
                      <p className="text-xs md:text-sm text-navy/50">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Featured providers + Quick search */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sélection LELLA */}
              <Card hover={false}>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-serif font-semibold text-navy text-sm md:text-base">Nos coups de cœur 💛</h2>
                    <Link href="/marketplace" className="text-xs text-gold hover:underline flex items-center gap-0.5">
                      Voir tout <ArrowRight size={12} />
                    </Link>
                  </div>
                  {featured.length === 0 ? (
                    <div className="text-center py-6 text-navy/30 text-sm">Aucun prestataire pour le moment.</div>
                  ) : (
                    <div className="space-y-3">
                      {featured.map(p => (
                        <Link key={p.id} href={`/provider/${p.slug}`}
                          className="flex items-center gap-3 p-3 rounded-xl bg-ivory/50 hover:bg-ivory transition-colors group">
                          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                            <Store size={18} className="text-gold" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-navy group-hover:text-gold transition-colors truncate">{p.name}</p>
                            <div className="flex items-center gap-2 text-xs text-navy/40">
                              <span>{p.location.wilaya}</span>
                              <span>•</span>
                              <span className="flex items-center gap-0.5"><Star size={10} className="fill-gold text-gold" />{p.rating}</span>
                            </div>
                          </div>
                          <ChevronRight size={14} className="text-navy/20 group-hover:text-gold transition-colors" />
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recherche rapide */}
              <Card hover={false}>
                <CardContent className="p-4 md:p-6">
                  <h2 className="font-serif font-semibold text-navy text-sm md:text-base mb-4">🔍 Recherche rapide</h2>
                  <div className="space-y-3">
                    <div className="relative">
                      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/30" />
                      <input type="text" placeholder="Que cherchez-vous ? (traiteur, salle, photographe...)"
                        className="w-full pl-10 pr-4 py-3 bg-ivory/50 rounded-xl text-sm border border-sand/30 focus:border-gold/50 outline-none transition-all"
                        onKeyDown={e => {
                          if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
                            router.push(`/marketplace?search=${encodeURIComponent((e.target as HTMLInputElement).value.trim())}`);
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Traiteur", "Salle des Fêtes", "Photographe", "Neggafa", "DJ", "Orchestre"].map(cat => (
                        <Link key={cat} href={`/marketplace?category=${cat.toLowerCase().replace(/\s/g, "-")}`}
                          className="px-3 py-1.5 rounded-full bg-ivory text-xs text-navy/50 hover:text-gold hover:bg-gold/5 border border-sand/30 transition-all">
                          {cat}
                        </Link>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* ════════════════════════════════════════════════════ */}
        {/* VUE : FAVORIS                                       */}
        {/* ════════════════════════════════════════════════════ */}
        {activeTab === "favorites" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-1">❤️ Mes favoris</h1>
            <p className="text-navy/50 text-sm mb-6">
              {savedFavs.length > 0
                ? `${savedFavs.length} prestataire${savedFavs.length > 1 ? "s" : ""} sauvegardé${savedFavs.length > 1 ? "s" : ""}`
                : "Vous n'avez aucun favori pour le moment."}
            </p>

            {savedFavs.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-card">
                <Heart size={40} className="mx-auto mb-4 text-navy/10" />
                <p className="text-navy/40 text-sm mb-2">Aucun favori</p>
                <p className="text-navy/30 text-xs mb-6 max-w-xs mx-auto">
                  Sauvegardez vos prestataires préférés en cliquant sur le ❤️ dans la page de recherche.
                </p>
                <Link href="/marketplace">
                  <Button variant="gold" size="sm">Découvrir des prestataires</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userFavorites.map(p => {
                  const cat = p.category;
                  return (
                    <Link key={p.id} href={`/provider/${p.slug}`} className="group">
                      <Card className="h-full overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                              <Store size={22} className="text-gold" />
                            </div>
                            <button onClick={e => { e.preventDefault(); handleRemoveFav(p.id); }}
                              className="p-1.5 rounded-lg hover:bg-error/5 text-navy/20 hover:text-error transition-all">
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <h3 className="font-serif font-semibold text-navy group-hover:text-gold transition-colors text-sm md:text-base">{p.name}</h3>
                          <p className="text-xs text-navy/40 capitalize mt-0.5">{cat}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-navy/40">
                            <span className="flex items-center gap-1"><MapPin size={10} />{p.location.wilaya}</span>
                            <span className="flex items-center gap-1"><Star size={10} className="fill-gold text-gold" />{p.rating}</span>
                          </div>
                          <p className="text-xs text-navy/30 mt-2 line-clamp-1">{formatPrice(p.priceRange.min)} DZD</p>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* ════════════════════════════════════════════════════ */}
        {/* VUE : MES PRESTATAIRES                             */}
        {/* ════════════════════════════════════════════════════ */}
        {activeTab === "bookings" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-1">📅 Mes prestataires</h1>
            <p className="text-navy/50 text-sm mb-6">Les prestataires que vous avez consultés récemment.</p>

            <div className="space-y-3">
              {recentProviders.map((p, i) => (
                <Link key={p.id} href={`/provider/${p.slug}`}>
                  <Card className="group hover:shadow-card-hover transition-all">
                    <CardContent className="p-4 md:p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/10 to-ivory flex items-center justify-center shrink-0">
                          <Store size={22} className="text-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-serif font-semibold text-navy group-hover:text-gold transition-colors text-sm md:text-base">{p.name}</h3>
                              <p className="text-xs text-navy/40 capitalize">{p.category}</p>
                            </div>
                            <div className="flex items-center gap-1 text-xs shrink-0">
                              <Star size={11} className="fill-gold text-gold" />
                              <span className="text-navy/60 font-medium">{p.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-navy/40 mt-1">
                            <MapPin size={10} /><span>{p.location.wilaya}</span>
                            <span>•</span>
                            <span>À partir de {formatPrice(p.priceRange.min)} DZD</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="gold" className="text-[9px] px-2 py-0.5">✉️ Devis gratuit</Badge>
                            <Badge variant="outline" className="text-[9px] px-2 py-0.5">⭐ {p.reviewCount} avis</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/marketplace">
                <Button variant="gold" className="gap-2">
                  Voir tous les prestataires <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
