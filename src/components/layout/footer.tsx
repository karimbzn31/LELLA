"use client";

import Link from "next/link";
import { Heart, Camera, Globe, Video } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-white/80 pb-16 md:pb-0">
      {/* Barre dorée */}
      <div className="h-0.5 gold-gradient" />

      <div className="section-container py-10 md:py-20">
        {/* Mobile: 2 colonnes — Desktop: 4 colonnes */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-3 md:mb-4">
              <span className="text-xl md:text-2xl font-serif font-bold text-white">LELLA</span>
              <span className="text-gold">✦</span>
            </Link>
            <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-xs">
              La première marketplace premium qui connecte les familles aux meilleurs prestataires d'événements en Algérie.
            </p>
            <div className="flex items-center gap-3 mt-4 md:mt-6">
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 hover:bg-gold/20 flex items-center justify-center transition-colors" aria-label="Instagram">
                <Camera size={16} className="text-white/60 hover:text-gold" />
              </a>
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 hover:bg-gold/20 flex items-center justify-center transition-colors" aria-label="Facebook">
                <Globe size={16} className="text-white/60 hover:text-gold" />
              </a>
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 hover:bg-gold/20 flex items-center justify-center transition-colors" aria-label="Youtube">
                <Video size={16} className="text-white/60 hover:text-gold" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm md:text-base mb-3 md:mb-4">Navigation</h4>
            <ul className="space-y-2 md:space-y-3">
              {["Accueil", "Prestataires", "Catégories", "Comment ça marche", "Contact"].map((item) => (
                <li key={item}>
                  <Link href="/marketplace" className="text-xs md:text-sm text-white/50 hover:text-gold transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Catégories */}
          <div>
            <h4 className="text-white font-semibold text-sm md:text-base mb-3 md:mb-4">Catégories</h4>
            <ul className="space-y-2 md:space-y-3">
              {["Traiteur", "Salle des Fêtes", "Photographe", "Neggafa", "Décoration", "Orchestre"].map((item) => (
                <li key={item}>
                  <Link href={`/marketplace?category=${item.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-xs md:text-sm text-white/50 hover:text-gold transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-semibold text-sm md:text-base mb-3 md:mb-4">Restez informé</h4>
            <p className="text-xs md:text-sm text-white/50 mb-3 md:mb-4">
              Recevez nos inspirations et conseils pour votre événement.
            </p>
            <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Votre email"
                className="flex-1 px-3 md:px-4 py-2.5 bg-white/5 border border-white/10 rounded-radius-button text-xs md:text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold/50" />
              <button type="submit" className="px-3 md:px-4 py-2.5 gold-gradient text-white text-xs md:text-sm font-medium rounded-radius-button hover:opacity-90 transition-opacity whitespace-nowrap">
                OK
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs md:text-sm text-white/30">© 2026 LELLA. Tous droits réservés.</p>
          <div className="flex items-center gap-4 text-xs md:text-sm text-white/30">
            <Link href="#" className="hover:text-white/50 transition-colors">Mentions légales</Link>
            <Link href="#" className="hover:text-white/50 transition-colors">Confidentialité</Link>
            <span className="flex items-center gap-1">Fait avec <Heart size={10} className="text-bordeaux" /> en Algérie</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
