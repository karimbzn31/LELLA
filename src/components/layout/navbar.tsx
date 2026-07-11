"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Heart, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore, useUIStore } from "@/store";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Prestataires", href: "/marketplace" },
  { label: "Catégories", href: "/marketplace" },
  { label: "Contact", href: "/marketplace" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { unreadCount } = useUIStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquer le scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled ? "glass-nav shadow-nav" : "bg-transparent"
    )}>
      <nav className="section-container flex items-center justify-between h-14 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 md:gap-2 group z-10">
          <span className="text-xl md:text-3xl font-serif font-bold text-navy">LELLA</span>
          <span className="hidden sm:inline text-gold text-lg md:text-xl">✦</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              className="text-sm font-medium text-navy/70 hover:text-navy transition-colors relative group">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/marketplace" className="p-2 text-navy/50 hover:text-navy transition-colors" aria-label="Rechercher">
            <Search size={20} />
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard/client" className="p-2 text-navy/50 hover:text-navy transition-colors relative" aria-label="Favoris">
                <Heart size={20} />
              </Link>
              <Link href="/notifications" className="p-2 text-navy/50 hover:text-navy transition-colors relative" aria-label="Notifications">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-bordeaux text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Link>
              <div className="flex items-center gap-2 pl-3 border-l border-sand">
                <Link href={user?.role === "admin" ? "/dashboard/admin" : user?.role === "provider" ? "/dashboard/provider" : "/dashboard/client"}
                  className="flex items-center gap-2 text-sm font-medium text-navy/70 hover:text-navy transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                    <User size={16} className="text-gold" />
                  </div>
                  <span className="hidden xl:inline">{user?.name}</span>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/login"><Button variant="ghost" size="sm">Connexion</Button></Link>
              <Link href="/auth/signup"><Button variant="gold" size="sm">Inscription</Button></Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2 text-navy z-10" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu — plein écran, pas de scroll */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-14 bg-white/98 backdrop-blur-xl z-40"
          >
            <div className="section-container pt-8 pb-6 h-full flex flex-col">
              <div className="flex-1 space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-4 text-xl font-medium text-navy/70 hover:text-navy transition-colors border-b border-sand/30">
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="pt-6 border-t border-sand/50 space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard/client" onClick={() => setMobileMenuOpen(false)}
                      className="block py-3 text-lg font-medium text-navy/70">Tableau de bord</Link>
                    <button onClick={() => { logout(); setMobileMenuOpen(false); }}
                      className="block py-3 text-lg font-medium text-error">Déconnexion</button>
                  </>
                ) : (
                  <div className="flex gap-3">
                    <Link href="/auth/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full py-3">Connexion</Button>
                    </Link>
                    <Link href="/auth/signup" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="gold" className="w-full py-3">Inscription</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
