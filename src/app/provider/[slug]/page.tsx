"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Phone, Mail, Heart, Share2, ChevronLeft,
  Star, Clock, Calendar, MessageSquare,
  Check, Camera, ChevronRight, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { PriceDisplay } from "@/components/ui/price-display";
import { providers as allProviders, reviews as allReviews, categories } from "@/lib/mock-data";
import { toggleFavorite, isFavorite } from "@/lib/data-access";
import { formatPrice, cn } from "@/lib/utils";
import { QuoteModal } from "@/components/marketplace/quote-modal";

export default function ProviderDetailPage() {
  const params = useParams();
  const provider = allProviders.find((p) => p.slug === params.slug);
  const [activeTab, setActiveTab] = useState<"about" | "services" | "reviews" | "availability">("about");
  const [isFav, setIsFav] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => { if (provider) setIsFav(isFavorite(provider.id)); }, [provider]);

  if (!provider) {
    return (
      <div className="pt-28 section-container text-center py-20 min-h-screen">
        <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-white flex items-center justify-center shadow-sm">
          <ShieldCheckIcon size={22} className="text-navy/20" />
        </div>
        <p className="text-navy/40 text-lg mb-1">Prestataire introuvable</p>
        <p className="text-navy/30 text-sm mb-6">Ce prestataire n'existe pas ou a été retiré.</p>
        <Link href="/marketplace"><Button variant="gold" size="sm">← Retour aux prestataires</Button></Link>
      </div>
    );
  }

  const cat = categories.find(c => c.id === provider.category);
  const handleFavorite = () => { toggleFavorite(provider.id); setIsFav(!isFav); };
  const providerReviews = allReviews.filter(r => r.providerId === provider.id);
  const ratingDistribution = [0, 0, 0, 0, 0];
  providerReviews.forEach(r => { if (r.rating >= 1 && r.rating <= 5) ratingDistribution[r.rating - 1]++; });

  const tabs = [
    { id: "about" as const, label: "À propos" },
    { id: "services" as const, label: "Services" },
    { id: "reviews" as const, label: `Avis (${providerReviews.length})` },
    { id: "availability" as const, label: "Dispo" },
  ];

  const similarProviders = allProviders.filter(p => p.category === provider.category && p.id !== provider.id).slice(0, 3);

  const galleryItems = [null, null, null, null, null];

  return (
    <div className="pt-14 md:pt-20 pb-24 md:pb-16 bg-ivory min-h-screen">
      {/* Back */}
      <div className="section-container py-2 md:py-4">
        <Link href="/marketplace"
          className="inline-flex items-center gap-1 text-xs md:text-sm text-navy/50 hover:text-navy transition-colors">
          <ChevronLeft size={14} /><span>Retour</span>
        </Link>
      </div>

      {/* Hero Gallery — compact sur mobile */}
      <div className="section-container mb-4 md:mb-8">
        <div className="grid grid-cols-4 grid-rows-2 gap-1 md:gap-2 h-[200px] md:h-[400px] rounded-xl md:rounded-2xl overflow-hidden">
          {[0, 1, 2, 3, 4].map(i => (
            <button key={i} onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
              className={cn(i === 0 ? "col-span-2 row-span-2" : "", "relative overflow-hidden bg-gradient-to-br from-ivory to-sand group cursor-pointer")}>
              <span className="absolute inset-0 flex items-center justify-center text-gold text-2xl md:text-6xl font-serif opacity-20 select-none">✦</span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              {i === 0 && cat && (
                <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[9px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-md">
                  {cat.name}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
            <button className="absolute top-6 right-6 text-white/60 hover:text-white z-10" onClick={() => setLightboxOpen(false)}>
              <X size={24} />
            </button>
            <motion.div key={lightboxIndex} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl w-full mx-4 aspect-square md:aspect-video bg-ivory/10 rounded-2xl flex items-center justify-center" onClick={e => e.stopPropagation()}>
              <span className="text-gold text-6xl md:text-8xl font-serif opacity-30 select-none">✦</span>
            </motion.div>
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <button onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i - 1 + galleryItems.length) % galleryItems.length); }}
                className="text-white/60 hover:text-white p-2"><ChevronLeft size={22} /></button>
              <span className="text-white/40 text-sm">{lightboxIndex + 1} / {galleryItems.length}</span>
              <button onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i + 1) % galleryItems.length); }}
                className="text-white/60 hover:text-white p-2"><ChevronRight size={22} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Info */}
      <div className="section-container mb-4 md:mb-8">
        <div className="flex items-center gap-2 mb-1.5">
          <Badge variant={provider.isVerified ? "gold" : "outline"} className="text-[9px] md:text-xs px-2 py-0.5">
            {provider.isVerified ? "✓ Vérifié" : "Non vérifié"}
          </Badge>
          {provider.isFeatured && <Badge variant="default" className="text-[9px] md:text-xs px-2 py-0.5">Coup de ❤</Badge>}
        </div>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-navy leading-tight">{provider.name}</h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
              <div className="flex items-center gap-1">
                <StarRating rating={provider.rating} size="sm" />
                <span className="text-xs text-navy/50">({provider.reviewCount})</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-navy/50">
                <MapPin size={11} />{provider.location.commune}, {provider.location.wilaya}
              </div>
              <div className="flex items-center gap-1 text-xs text-navy/50">
                <Clock size={11} />{provider.yearsExperience} ans
              </div>
            </div>
          </div>
          <button onClick={handleFavorite}
            className={cn("ml-3 p-2.5 rounded-xl border transition-all shrink-0",
              isFav ? "bg-bordeaux/10 border-bordeaux/20 text-bordeaux" : "bg-white border-sand text-navy/40 hover:border-gold/30")}>
            <Heart size={18} className={isFav ? "fill-bordeaux" : ""} />
          </button>
        </div>
      </div>

      {/* Pricing + CTA — visible tout le temps */}
      <div className="section-container mb-4">
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] md:text-xs text-navy/40 uppercase tracking-wider">Budget indicatif</p>
              <p className="text-xl md:text-2xl font-serif font-bold text-navy mt-0.5">{formatPrice(provider.priceRange.min)}</p>
              <p className="text-[10px] md:text-xs text-navy/40">Prix sur devis</p>
            </div>
            <Button variant="gold" className="gap-2 text-sm py-3 md:py-4" onClick={() => setQuoteModalOpen(true)}>
              <MessageSquare size={16} />
              <span className="hidden md:inline">Devis</span>
              <span className="md:hidden">Devis</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs — scroll horizontal */}
            <div className="border-b border-sand/50 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              <div className="flex gap-4 md:gap-6 min-w-max">
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={cn("pb-2.5 text-sm font-medium transition-colors relative whitespace-nowrap",
                      activeTab === tab.id ? "text-navy" : "text-navy/40 hover:text-navy/60")}>
                    {tab.label}
                    {activeTab === tab.id && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />}
                  </button>
                ))}
              </div>
            </div>

            {/* About */}
            {activeTab === "about" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-4 md:p-6 shadow-card">
                <p className="text-xs md:text-sm text-navy/70 leading-relaxed">{provider.longDescription || provider.description}</p>
              </motion.div>
            )}

            {/* Services */}
            {activeTab === "services" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                  {provider.services.map(s => (
                    <div key={s} className="flex items-center gap-2.5 p-3 md:p-4 bg-white rounded-xl shadow-card">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                        <Check size={13} className="text-gold" />
                      </div>
                      <span className="text-xs md:text-sm text-navy/70">{s}</span>
                    </div>
                  ))}
                </div>
                {provider.tags.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-serif font-semibold text-navy mb-2.5 text-sm md:text-base">Spécialités</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {provider.tags.map(t => <Badge key={t} variant="outline" className="text-[10px] md:text-xs px-2 py-0.5">{t}</Badge>)}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Reviews */}
            {activeTab === "reviews" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {/* Note globale */}
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-card mb-4">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="text-center shrink-0">
                      <p className="text-3xl md:text-4xl font-serif font-bold text-navy">{provider.rating}</p>
                      <StarRating rating={provider.rating} size="sm" showValue={false} />
                      <p className="text-[10px] md:text-xs text-navy/40 mt-0.5">{providerReviews.length} avis</p>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5, 4, 3, 2, 1].map(star => {
                        const count = ratingDistribution[star - 1];
                        const pct = providerReviews.length > 0 ? (count / providerReviews.length) * 100 : 0;
                        return (
                          <div key={star} className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs">
                            <span className="text-navy/40 w-1.5 text-right">{star}</span>
                            <Star size={9} className="fill-gold text-gold" />
                            <div className="flex-1 h-1.5 bg-ivory rounded-full overflow-hidden">
                              <div className="h-full bg-gold rounded-full" style={{ width: pct + "%" }} />
                            </div>
                            <span className="text-navy/30 w-4 md:w-6 text-right">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {providerReviews.length === 0 ? (
                  <div className="text-center py-10 bg-white rounded-2xl">
                    <p className="text-navy/40 text-sm">Aucun avis pour le moment.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {providerReviews.slice(0, 5).map(review => (
                      <div key={review.id} className="bg-white p-3.5 md:p-5 rounded-2xl shadow-card">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gold/10 flex items-center justify-center">
                              <span className="text-xs font-bold text-gold">{review.clientName.charAt(0)}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <p className="text-xs md:text-sm font-semibold text-navy">{review.clientName}</p>
                                <Badge variant="gold" className="text-[7px] md:text-[9px] px-1 py-0">✓ Vérifié</Badge>
                              </div>
                              <p className="text-[9px] md:text-xs text-navy/40">{review.date}</p>
                            </div>
                          </div>
                          <StarRating rating={review.rating} size="sm" showValue={false} />
                        </div>
                        <p className="text-xs md:text-sm text-navy/60 leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Availability */}
            {activeTab === "availability" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-serif font-semibold text-sm md:text-base text-navy">Calendrier</h3>
                      <p className="text-[10px] md:text-xs text-navy/40 mt-0.5">Juillet 2026</p>
                    </div>
                    <Calendar size={20} className="text-gold" />
                  </div>
                  <div className="grid grid-cols-7 gap-0.5 mb-1">
                    {["L", "M", "M", "J", "V", "S", "D"].map(d => (
                      <div key={d} className="text-center text-[9px] md:text-xs text-navy/30 font-medium py-1">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-0.5">
                    {Array.from({ length: 35 }, (_, i) => {
                      const day = i - 2;
                      if (day < 1 || day > 31) return <div key={i} />;
                      const isAvailable = day > 5 && day < 28 && day % 2 === 0;
                      const isPast = day < 10;
                      const isToday = day === 11;
                      return (
                        <button key={day} disabled={isPast}
                          className={cn("aspect-square rounded-lg text-[10px] md:text-sm flex items-center justify-center transition-all min-h-[28px] md:min-h-[36px]",
                            isToday ? "bg-gold text-white font-bold" : isAvailable ? "bg-success/10 text-success" : isPast ? "text-navy/15" : "text-navy/30 hover:bg-ivory")}>
                          {day}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-3 mt-3 text-[9px] md:text-xs text-navy/40">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-success/10" />Dispo</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-ivory" />Indispo</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-gold" />Auj.</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar — compact sur mobile */}
          <div className="space-y-4">
            {/* Contact */}
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-card">
              <h3 className="font-serif font-semibold text-sm md:text-base text-navy mb-3">Contact</h3>
              <div className="space-y-2.5">
                {provider.phone && (
                  <a href={"tel:" + provider.phone}
                    className="flex items-center gap-2.5 text-xs md:text-sm text-navy/60 hover:text-gold transition-colors py-1">
                    <Phone size={14} className="text-gold shrink-0" />{provider.phone}
                  </a>
                )}
                {provider.email && (
                  <a href={"mailto:" + provider.email}
                    className="flex items-center gap-2.5 text-xs md:text-sm text-navy/60 hover:text-gold transition-colors py-1 truncate">
                    <Mail size={14} className="text-gold shrink-0" />{provider.email}
                  </a>
                )}
                {provider.socialLinks?.instagram && (
                  <div className="flex items-center gap-2.5 text-xs md:text-sm text-navy/60 py-1">
                    <Camera size={14} className="text-gold shrink-0" />{provider.socialLinks.instagram}
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-card">
              <h3 className="font-serif font-semibold text-sm md:text-base text-navy mb-2">Zone d'intervention</h3>
              <div className="flex items-center gap-1.5 text-xs md:text-sm text-navy/60">
                <MapPin size={13} className="text-gold" />{provider.location.wilaya}
              </div>
              <div className="mt-3 h-24 md:h-32 rounded-xl bg-gradient-to-br from-ivory to-sand flex items-center justify-center">
                <span className="text-[10px] md:text-xs text-navy/30">Carte (Phase 2)</span>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-card">
              <h3 className="font-serif font-semibold text-sm md:text-base text-navy mb-3">En chiffres</h3>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {[
                  { val: provider.rating, label: "Note moyenne" },
                  { val: provider.reviewCount, label: "Avis" },
                  { val: provider.yearsExperience, label: "Ans d'exp." },
                  { val: provider.location.wilaya, label: "Wilaya" },
                ].map(s => (
                  <div key={s.label} className="text-center p-2.5 md:p-3 bg-ivory rounded-xl">
                    <p className="text-sm md:text-xl font-bold text-gold">{s.val}</p>
                    <p className="text-[9px] md:text-xs text-navy/40">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} providerName={provider.name} />

      {/* Similar */}
      {similarProviders.length > 0 && (
        <section className="mt-8 bg-white py-8 border-t border-sand/30">
          <div className="section-container">
            <h2 className="text-lg md:text-2xl font-serif font-bold text-navy mb-4 md:mb-6">Prestataires similaires</h2>
            <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-6 overflow-x-auto snap-x-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0">
              {similarProviders.map(sp => (
                <Link key={sp.id} href={"/provider/" + sp.slug} className="block shrink-0 w-[220px] md:w-auto">
                  <div className="bg-ivory rounded-2xl p-3.5 md:p-5 group hover:shadow-card transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-serif font-semibold text-xs md:text-sm text-navy group-hover:text-gold transition-colors truncate">{sp.name}</h3>
                      <StarRating rating={sp.rating} size="sm" />
                    </div>
                    <p className="text-[9px] md:text-xs text-navy/40 capitalize mb-1">{categories.find(c => c.id === sp.category)?.name || sp.category}</p>
                    <div className="flex items-center gap-1 text-[9px] md:text-xs text-navy/40 mb-1.5">
                      <MapPin size={9} />{sp.location.wilaya}
                    </div>
                    <PriceDisplay min={sp.priceRange.min} max={sp.priceRange.max} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky bottom CTA mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-t border-sand/50 p-3 md:hidden pb-safe">
        <div className="flex gap-3">
          <Button variant="gold" className="flex-1 gap-2 text-sm min-h-[44px]" onClick={() => setQuoteModalOpen(true)}>
            <MessageSquare size={16} /> Demander un devis
          </Button>
          <Button variant="outline" className="gap-2 text-sm min-h-[44px]" onClick={handleFavorite}>
            <Heart size={16} className={isFav ? "fill-bordeaux text-bordeaux" : ""} />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ShieldCheckIcon({ size, className }: { size: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>;
}
