"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Phone, Mail, Globe, Heart, Share2, ChevronLeft,
  Star, ShieldCheck, Clock, Calendar, MessageSquare,
  Check, Camera, ChevronRight, ChevronDown, X, Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { PriceDisplay } from "@/components/ui/price-display";
import { providers as allProviders, reviews as allReviews, categories } from "@/lib/mock-data";
import { toggleFavorite, isFavorite } from "@/lib/data-access";
import { formatPrice, cn } from "@/lib/utils";
import { QuoteModal } from "@/components/marketplace/quote-modal";
import type { Review } from "@/types";

export default function ProviderDetailPage() {
  const params = useParams();
  const provider = allProviders.find((p) => p.slug === params.slug);
  const [activeTab, setActiveTab] = useState<"about" | "services" | "reviews" | "availability">("about");
  const [isFav, setIsFav] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  // Favoris
  useEffect(() => {
    if (provider) setIsFav(isFavorite(provider.id));
  }, [provider]);

  // Stick header behavior
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setHeaderVisible(current < 200 || current < lastScroll);
      setLastScroll(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  if (!provider) {
    return (
      <div className="pt-28 section-container text-center py-20">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-ivory flex items-center justify-center">
          <ShieldCheck size={24} className="text-navy/20" />
        </div>
        <p className="text-navy/40 text-lg mb-2">Prestataire introuvable</p>
        <p className="text-navy/30 text-sm mb-6">Ce prestataire n existe pas ou a ete retire.</p>
        <Link href="/marketplace">
          <Button variant="gold">← Retour aux prestataires</Button>
        </Link>
      </div>
    );
  }

  const cat = categories.find(c => c.id === provider.category);
  const handleFavorite = () => {
    toggleFavorite(provider.id);
    setIsFav(!isFav);
  };

  // Récupérer les vrais avis
  const providerReviews = allReviews.filter(r => r.providerId === provider.id);
  const ratingDistribution = [0, 0, 0, 0, 0];
  providerReviews.forEach(r => {
    if (r.rating >= 1 && r.rating <= 5) ratingDistribution[r.rating - 1]++;
  });

  const tabs = [
    { id: "about" as const, label: "A propos" },
    { id: "services" as const, label: "Services" },
    { id: "reviews" as const, label: "Avis (" + providerReviews.length + ")" },
    { id: "availability" as const, label: "Disponibilites" },
  ];

  const similarProviders = allProviders.filter(
    p => p.category === provider.category && p.id !== provider.id
  ).slice(0, 3);

  // Photos mockées pour la galerie
  const galleryPhotos = [
    "/images/categories/" + provider.category + ".jpg",
    "/images/hero-wedding.jpg",
    "/images/hero-details.jpg",
    "/images/hero-couple.jpg",
    "/images/hero-bride-2.jpg",
  ];

  return (
    <div className="pt-16 md:pt-20">
      {/* Sticky Header (appears on scroll) */}
      <motion.div
        initial={false}
        animate={{ y: headerVisible ? 0 : -80 }}
        className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-sand/50 shadow-sm transition-transform"
      >
        <div className="section-container flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
              <span className="text-xs font-bold text-gold">{provider.name.charAt(0)}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">{provider.name}</p>
              <div className="flex items-center gap-1 text-xs text-navy/40">
                <Star size={11} className="fill-gold text-gold" />
                <span>{provider.rating} · {cat?.name}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="gold" size="sm" onClick={() => setQuoteModalOpen(true)}>
              Contacter
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Back navigation */}
      <div className="section-container py-4">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1 text-sm text-navy/50 hover:text-navy transition-colors"
        >
          <ChevronLeft size={16} />
          Retour aux prestataires
        </Link>
      </div>

      {/* Hero Gallery */}
      <div className="section-container mb-8">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
          {/* Grande image */}
          <button
            onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
            className="col-span-2 row-span-2 relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-ivory to-sand" />
            <span className="absolute inset-0 flex items-center justify-center text-gold text-6xl font-serif opacity-30">✦</span>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            {cat && (
              <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
                {cat.name}
              </div>
            )}
          </button>
          {/* Petites images */}
          {[1, 2, 3, 4].map(i => (
            <button
              key={i}
              onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
              className="relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-ivory to-sand" />
              <span className="absolute inset-0 flex items-center justify-center text-gold text-2xl font-serif opacity-20">✦</span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button className="absolute top-6 right-6 text-white/60 hover:text-white z-10" onClick={() => setLightboxOpen(false)}>
              <X size={28} />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl w-full mx-6 aspect-video bg-ivory/10 rounded-2xl flex items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <span className="text-gold text-8xl font-serif opacity-30">✦</span>
            </motion.div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <button
                onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i - 1 + galleryPhotos.length) % galleryPhotos.length); }}
                className="text-white/60 hover:text-white"
              >
                <ChevronLeft size={24} />
              </button>
              <span className="text-white/40 text-sm">{lightboxIndex + 1} / {galleryPhotos.length}</span>
              <button
                onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i + 1) % galleryPhotos.length); }}
                className="text-white/60 hover:text-white"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Info */}
      <div className="section-container mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant={provider.isVerified ? "gold" : "outline"} className="text-xs">
                {provider.isVerified ? "✓ Verifie" : "Non verifie"}
              </Badge>
              {provider.isFeatured && (
                <Badge variant="default" className="text-xs">Coup de c ur LELLA</Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy">
              {provider.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-1.5">
                <StarRating rating={provider.rating} size="sm" />
                <span className="text-navy/50">({provider.reviewCount} avis)</span>
              </div>
              <div className="flex items-center gap-1.5 text-navy/50">
                <MapPin size={14} />
                {provider.location.commune}, {provider.location.wilaya}
              </div>
              <div className="flex items-center gap-1.5 text-navy/50">
                <Clock size={14} />
                {provider.yearsExperience} ans d experience
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleFavorite}
              className={cn(
                "px-4 py-2.5 rounded-radius-button border text-sm flex items-center gap-2 transition-all",
                isFav ? "bg-bordeaux/10 border-bordeaux/20 text-bordeaux" : "bg-white border-sand text-navy/60 hover:border-gold/30"
              )}>
              <Heart size={16} className={isFav ? "fill-bordeaux" : ""} />
              {isFav ? "Favori" : "Sauvegarder"}
            </button>
            <Button variant="gold" size="lg" className="hidden md:flex gap-2" onClick={() => setQuoteModalOpen(true)}>
              <MessageSquare size={16} />
              Demander un devis
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="section-container pb-16">
        {/* Mobile CTA */}
        <div className="md:hidden flex gap-3 mb-6">
          <Button variant="gold" className="flex-1 gap-2" onClick={() => setQuoteModalOpen(true)}>
            <MessageSquare size={16} />
            Devis
          </Button>
          <Button variant="outline" className="flex-1">
            Reserver
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="border-b border-sand/50 overflow-x-auto">
              <div className="flex gap-6 min-w-max">
                {tabs.map((tab) => (
                  <button key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "pb-3 text-sm font-medium transition-colors relative whitespace-nowrap",
                      activeTab === tab.id ? "text-navy" : "text-navy/40 hover:text-navy/60"
                    )}>
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* About */}
            {activeTab === "about" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="prose prose-sm max-w-none text-navy/70 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: (provider.longDescription || provider.description).replace(/\n/g, "<br/>") }}
                />
              </motion.div>
            )}

            {/* Services */}
            {activeTab === "services" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {provider.services.map((service) => (
                    <div key={service} className="flex items-center gap-3 p-4 bg-white rounded-radius-card shadow-card">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <Check size={16} className="text-gold" />
                      </div>
                      <span className="text-sm text-navy/70">{service}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                {provider.tags.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-serif font-semibold text-navy mb-3">Specialites</h3>
                    <div className="flex flex-wrap gap-2">
                      {provider.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Reviews */}
            {activeTab === "reviews" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {/* Note globale */}
                <div className="bg-white p-6 rounded-radius-card shadow-card mb-6">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-4xl font-serif font-bold text-navy">{provider.rating}</p>
                      <StarRating rating={provider.rating} size="sm" showValue={false} />
                      <p className="text-xs text-navy/40 mt-1">{providerReviews.length} avis</p>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5, 4, 3, 2, 1].map(star => {
                        const count = ratingDistribution[star - 1];
                        const pct = providerReviews.length > 0 ? (count / providerReviews.length) * 100 : 0;
                        return (
                          <div key={star} className="flex items-center gap-2 text-xs">
                            <span className="text-navy/40 w-2">{star}</span>
                            <Star size={10} className="fill-gold text-gold" />
                            <div className="flex-1 h-1.5 bg-ivory rounded-full overflow-hidden">
                              <div className="h-full bg-gold rounded-full" style={{ width: pct + "%" }} />
                            </div>
                            <span className="text-navy/30 w-6 text-right">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {providerReviews.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-ivory flex items-center justify-center">
                      <Quote size={20} className="text-navy/20" />
                    </div>
                    <p className="text-navy/40">Aucun avis pour le moment.</p>
                    <p className="text-navy/30 text-sm mt-1">Soyez le premier a donner votre avis !</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {providerReviews.map((review) => (
                      <div key={review.id} className="bg-white p-5 rounded-radius-card shadow-card">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center">
                              <span className="text-xs font-bold text-gold">{review.clientName.charAt(0)}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-navy">{review.clientName}</p>
                                <Badge variant="gold" className="text-[9px] px-1.5 py-0">Verifie</Badge>
                              </div>
                              <p className="text-xs text-navy/40">{review.date}</p>
                            </div>
                          </div>
                          <StarRating rating={review.rating} size="sm" showValue={false} />
                        </div>
                        <p className="text-sm text-navy/60 leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Availability */}
            {activeTab === "availability" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="bg-white p-6 rounded-radius-card shadow-card">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-serif font-semibold text-navy">Calendrier des disponibilites</h3>
                      <p className="text-sm text-navy/40 mt-1">Selectionnez une date pour verifier la disponibilite</p>
                    </div>
                    <Calendar size={24} className="text-gold" />
                  </div>

                  <div className="text-center mb-6">
                    <p className="text-lg font-serif font-semibold text-navy">Juillet 2026</p>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["L", "M", "M", "J", "V", "S", "D"].map(d => (
                      <div key={d} className="text-center text-xs text-navy/30 font-medium py-1">{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {[...Array(5)].map((_, w) =>
                      [...Array(7)].map((_, d) => {
                        const day = w * 7 + d - 2;
                        if (day < 1 || day > 31) return <div key={w + "-" + d} />;
                        const isAvailable = day > 5 && day < 28 && day % 2 === 0;
                        const isPast = day < 10;
                        const isToday = day === 11;
                        return (
                          <button key={day} disabled={isPast}
                            className={cn(
                              "aspect-square rounded-lg text-sm flex items-center justify-center transition-all",
                              isToday ? "bg-gold text-white font-bold" : isAvailable ? "bg-success/10 text-success hover:bg-success/20 cursor-pointer" : isPast ? "text-navy/15 cursor-not-allowed" : "text-navy/30 hover:bg-ivory cursor-pointer"
                            )}>
                            {day}
                          </button>
                        );
                      })
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-6 text-xs text-navy/40">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-success/10" /> Disponible</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-ivory" /> Indisponible</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gold" /> Aujourd hui</span>
                  </div>

                  <div className="mt-6 p-4 bg-ivory rounded-radius-card">
                    <p className="text-sm text-navy/50 flex items-center gap-2">
                      <Clock size={14} className="text-gold" />
                      Creneaux disponibles : 09:00 - 12:00 • 14:00 - 18:00 • 20:00 - 23:00
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price */}
            <div className="bg-white p-6 rounded-radius-card shadow-card lg:sticky lg:top-24">
              <p className="text-xs text-navy/40 uppercase tracking-wider mb-2">Budget indicatif</p>
              <p className="text-3xl font-serif font-bold text-navy">{formatPrice(provider.priceRange.min)}</p>
              <p className="text-sm text-navy/40 mt-1">Prix sur devis</p>

              <div className="mt-6 space-y-3">
                <Button variant="gold" className="w-full gap-2 text-base py-4" onClick={() => setQuoteModalOpen(true)}>
                  <MessageSquare size={18} />
                  Demander un devis
                </Button>
                <Button variant="outline" className="w-full">
                  Reserver
                </Button>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white p-6 rounded-radius-card shadow-card">
              <h3 className="font-serif font-semibold text-navy mb-4">Contact</h3>
              <div className="space-y-3">
                {provider.phone && (
                  <a href={"tel:" + provider.phone}
                    className="flex items-center gap-3 text-sm text-navy/60 hover:text-gold transition-colors">
                    <Phone size={16} className="text-gold" />
                    {provider.phone}
                  </a>
                )}
                {provider.email && (
                  <a href={"mailto:" + provider.email}
                    className="flex items-center gap-3 text-sm text-navy/60 hover:text-gold transition-colors">
                    <Mail size={16} className="text-gold" />
                    {provider.email}
                  </a>
                )}
                {provider.socialLinks?.instagram && (
                  <div className="flex items-center gap-3 text-sm text-navy/60">
                    <Camera size={16} className="text-gold" />
                    {provider.socialLinks.instagram}
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white p-6 rounded-radius-card shadow-card">
              <h3 className="font-serif font-semibold text-navy mb-2">Zone d intervention</h3>
              <div className="flex items-center gap-1.5 text-sm text-navy/60">
                <MapPin size={14} className="text-gold" />
                {provider.location.wilaya}
              </div>
              <div className="mt-4 h-32 rounded-radius-card bg-gradient-to-br from-ivory to-sand flex items-center justify-center">
                <span className="text-xs text-navy/30">Carte interactive (Phase 2)</span>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white p-6 rounded-radius-card shadow-card">
              <h3 className="font-serif font-semibold text-navy mb-4">En chiffres</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-ivory rounded-radius-card">
                  <p className="text-xl font-bold text-gold">{provider.rating}</p>
                  <p className="text-xs text-navy/40">Note moyenne</p>
                </div>
                <div className="text-center p-3 bg-ivory rounded-radius-card">
                  <p className="text-xl font-bold text-gold">{provider.reviewCount}</p>
                  <p className="text-xs text-navy/40">Avis clients</p>
                </div>
                <div className="text-center p-3 bg-ivory rounded-radius-card">
                  <p className="text-xl font-bold text-gold">{provider.yearsExperience}</p>
                  <p className="text-xs text-navy/40">Ans d experience</p>
                </div>
                <div className="text-center p-3 bg-ivory rounded-radius-card">
                  <p className="text-xl font-bold text-gold">{provider.location.wilaya}</p>
                  <p className="text-xs text-navy/40">Wilaya</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} providerName={provider.name} />

      {/* Similar Providers */}
      {similarProviders.length > 0 && (
        <section className="bg-white/50 py-12 border-t border-sand/30">
          <div className="section-container">
            <h2 className="text-2xl font-serif font-bold text-navy mb-6">Prestataires similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProviders.map(sp => (
                <Link key={sp.id} href={"/provider/" + sp.slug}>
                  <div className="card-premium p-5 group">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif font-semibold text-navy group-hover:text-gold transition-colors">{sp.name}</h3>
                      <StarRating rating={sp.rating} size="sm" />
                    </div>
                    <p className="text-xs text-navy/40 capitalize mb-2">{categories.find(c => c.id === sp.category)?.name || sp.category}</p>
                    <div className="flex items-center gap-1 text-xs text-navy/40">
                      <MapPin size={12} />{sp.location.wilaya}
                    </div>
                    <PriceDisplay min={sp.priceRange.min} max={sp.priceRange.max} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
