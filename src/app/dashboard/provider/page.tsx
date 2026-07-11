"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, MessageSquare, CalendarCheck, TrendingUp, Store, Image,
  DollarSign, Star, Settings, LogOut, Camera, Plus, X, Check,
  MapPin, Phone, Mail, Save, Clock, ChevronRight,
  LayoutDashboard, FileText, Heart, Users, Shield, BarChart3,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Statistiques ─────────────────────────────────────────────
const STATS = [
  { label: "Vues du profil", value: "1 247", change: "+12%", icon: Eye, color: "text-gold", bg: "bg-gold/10" },
  { label: "Demandes reçues", value: "18", change: "+5", icon: MessageSquare, color: "text-bordeaux", bg: "bg-bordeaux/10" },
  { label: "Réservations", value: "9", change: "+3", icon: CalendarCheck, color: "text-terracotta", bg: "bg-terracotta/10" },
  { label: "Taux de conversion", value: "64%", change: "+8%", icon: TrendingUp, color: "text-success", bg: "bg-success/10" },
];

const RECENT_REQUESTS = [
  { client: "Inès M.", event: "Mariage — 150 pers.", date: "12 Juin 2026", budget: "350 000 DZD", status: "Nouveau", statusColor: "text-gold bg-gold/10" },
  { client: "Amina K.", event: "Fiançailles — 80 pers.", date: "10 Juin 2026", budget: "180 000 DZD", status: "Devis envoyé", statusColor: "text-info bg-info/10" },
  { client: "Sarah B.", event: "Mariage — 250 pers.", date: "8 Juin 2026", budget: "500 000 DZD", status: "Confirmé", statusColor: "text-success bg-success/10" },
  { client: "Lina D.", event: "Mariage — 200 pers.", date: "5 Juin 2026", budget: "280 000 DZD", status: "En attente", statusColor: "text-warning bg-warning/10" },
];

const REVIEWS = [
  { name: "Inès M.", date: "15 Juin 2026", rating: 5, text: "Un service exceptionnel ! Du début à la fin, tout était parfait.", verified: true },
  { name: "Amina K.", date: "10 Juin 2026", rating: 5, text: "Très professionnel. À l'écoute de nos besoins.", verified: true },
  { name: "Sarah B.", date: "1 Juin 2026", rating: 4, text: "Très belle prestation, quelques détails à améliorer.", verified: true },
];

const NAV_ITEMS = [
  { id: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
  { id: "profile", label: "Mon profil", icon: Store },
  { id: "services", label: "Mes services", icon: FileText },
  { id: "gallery", label: "Galerie", icon: Image },
  { id: "pricing", label: "Mes tarifs", icon: DollarSign },
  { id: "requests", label: "Demandes", icon: MessageSquare },
  { id: "reviews", label: "Avis clients", icon: Star },
];

const SERVICE_TEMPLATES = [
  "Service traiteur complet", "Menu dégustation", "Buffet", "Pâtisserie traditionnelle",
  "Bar à jus", "Service à table", "Dressage", "Vaisselle & linge",
];

const GALLERY_IMAGES = [null, null, null, null, null, null];

const WILAYAS_LIST = ["Alger", "Oran", "Constantine", "Annaba", "Sétif", "Blida", "Tizi Ouzou", "Béjaïa", "Tlemcen", "Mostaganem"];

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ─── Profile state ────────────────────────────────────────────
  const [profile, setProfile] = useState({
    name: "Palais des Délices",
    category: "traiteur",
    phone: "+213 555 12 34 56",
    email: "contact@palaisdesdelices.dz",
    instagram: "@palaisdesdelices_dz",
    wilaya: "Alger",
    commune: "Hydra",
    description: "Traiteur de luxe spécialisé dans les réceptions de mariage. Cuisine raffinée alliant tradition algérienne et gastronomie internationale.",
    longDescription: "Depuis 15 ans, le Palais des Délices régale les plus beaux mariages d'Algérie. Notre équipe de chefs passionnés sublime les saveurs de notre terroir pour créer des menus d'exception. Chaque plat est une œuvre d'art, chaque bouchée une émotion.",
    yearsExperience: 15,
  });

  const [services, setServices] = useState([
    "Service traiteur complet",
    "Menu dégustation",
    "Pâtisserie traditionnelle",
    "Bar à jus",
  ]);

  const [priceMin, setPriceMin] = useState(150000);
  const [priceMax, setPriceMax] = useState(500000);

  const [newService, setNewService] = useState("");

  const addService = () => {
    if (newService.trim() && !services.includes(newService.trim())) {
      setServices([...services, newService.trim()]);
      setNewService("");
    }
  };

  const removeService = (s: string) => setServices(services.filter(x => x !== s));

  const [showProfileSuccess, setShowProfileSuccess] = useState(false);
  const saveProfile = () => {
    setShowProfileSuccess(true);
    setTimeout(() => setShowProfileSuccess(false), 2500);
  };

  const ratingDistribution = [43, 12, 3, 1, 0]; // 5★, 4★, 3★, 2★, 1★
  const totalReviews = 59;
  const avgRating = 4.7;

  const SidebarLink = ({ id, icon: Icon, label }: { id: string; icon: any; label: string }) => {
    const isActive = activeTab === id;
    return (
      <button onClick={() => { setActiveTab(id); setMobileMenuOpen(false); }}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all w-full text-left",
          isActive ? "bg-gold/10 text-gold border border-gold/20" : "text-navy/50 hover:text-navy hover:bg-ivory border border-transparent"
        )}>
        <Icon size={18} />
        <span>{label}</span>
        {isActive && <ChevronRight size={14} className="ml-auto text-gold" />}
      </button>
    );
  };

  return (
    <div className="flex min-h-screen pt-14 md:pt-20 bg-ivory/30">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-sand/30 min-h-screen p-4 pt-6">
        <div className="mb-6 px-3">
          <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-3">
            <Store size={24} className="text-gold" />
          </div>
          <p className="font-serif font-bold text-navy text-lg">{profile.name}</p>
          <p className="text-xs text-navy/40 capitalize">{profile.category}</p>
        </div>
        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map(item => <SidebarLink key={item.id} {...item} />)}
        </nav>
        <button className="flex items-center gap-3 px-4 py-3 text-sm text-navy/40 hover:text-error transition-colors mt-4 border-t border-sand/30 pt-4">
          <LogOut size={18} /> Déconnexion
        </button>
      </aside>

      {/* Mobile nav toggle */}
      <div className="lg:hidden fixed top-14 left-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-b border-sand/30 px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
        {NAV_ITEMS.slice(0, 5).map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id)}
            className={cn("text-xs whitespace-nowrap px-3 py-1.5 rounded-full font-medium transition-all",
              activeTab === item.id ? "bg-gold text-white" : "bg-ivory text-navy/50")}>
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 lg:p-10 pt-20 lg:pt-6 pb-24">
        {/* ═══ OVERVIEW ═══════════════════════════════════════════ */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-navy">
                  Tableau de bord 👋
                </h1>
                <p className="text-sm text-navy/50 mt-1">Voici l'activité de votre établissement.</p>
              </div>
              <Button variant="gold" size="sm" onClick={() => setActiveTab("profile")} className="hidden md:flex gap-2">
                <Store size={15} /> Gérer mon profil
              </Button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
              {STATS.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <Card hover={false}>
                    <CardContent className="p-4 md:p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                          <stat.icon size={18} className={stat.color} />
                        </div>
                        <span className="text-[10px] md:text-xs text-success font-medium">{stat.change}</span>
                      </div>
                      <span className="text-xl md:text-2xl font-serif font-bold text-navy">{stat.value}</span>
                      <p className="text-[10px] md:text-sm text-navy/50 mt-0.5">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Demandes récentes */}
              <Card hover={false}>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-serif font-semibold text-navy text-sm md:text-base">Demandes récentes</h2>
                    <button onClick={() => setActiveTab("requests")} className="text-[10px] md:text-xs text-gold hover:underline">Voir tout</button>
                  </div>
                  {RECENT_REQUESTS.slice(0, 3).map((req, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-sand/20 last:border-0">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs md:text-sm font-medium text-navy truncate">{req.client}</p>
                        <p className="text-[10px] md:text-xs text-navy/40 truncate">{req.event} — {req.date}</p>
                      </div>
                      <span className={`text-[10px] md:text-xs px-2 py-1 rounded-full shrink-0 ${req.statusColor}`}>{req.status}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Aperçu profil */}
              <Card hover={false}>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-serif font-semibold text-navy text-sm md:text-base">Aperçu du profil</h2>
                    <button onClick={() => setActiveTab("profile")} className="text-[10px] md:text-xs text-gold hover:underline">Modifier</button>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center">
                      <Store size={22} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-serif font-semibold text-navy text-sm md:text-base">{profile.name}</p>
                      <div className="flex items-center gap-1 text-[10px] md:text-xs text-navy/40">
                        <Star size={10} className="fill-gold text-gold" />
                        <span>{avgRating} · {totalReviews} avis · {profile.yearsExperience} ans d'exp.</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="gold" className="text-[9px] md:text-xs px-2 py-0.5">✓ Vérifié</Badge>
                    <Badge variant="outline" className="text-[9px] md:text-xs px-2 py-0.5">{profile.category}</Badge>
                    <Badge variant="outline" className="text-[9px] md:text-xs px-2 py-0.5">{profile.wilaya}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* ═══ MON PROFIL ═════════════════════════════════════════ */}
        {activeTab === "profile" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-1">Mon profil public</h1>
            <p className="text-sm text-navy/50 mb-6">Ces informations sont visibles par les clients.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-5">
                {/* Photo de couverture */}
                <Card hover={false}>
                  <CardContent className="p-5">
                    <label className="text-sm font-semibold text-navy block mb-3">Photo de couverture</label>
                    <div className="h-36 md:h-48 rounded-2xl bg-gradient-to-br from-ivory to-sand flex items-center justify-center border-2 border-dashed border-sand/50 cursor-pointer hover:border-gold/30 transition-colors group">
                      <div className="text-center">
                        <Camera size={32} className="text-navy/20 mx-auto mb-2 group-hover:text-gold/40 transition-colors" />
                        <p className="text-xs text-navy/30">Cliquez pour ajouter une photo</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Infos principales */}
                <Card hover={false}>
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold text-navy mb-4">Informations générales</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-navy/50 block mb-1">Nom de l'établissement</label>
                        <input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})}
                          className="w-full px-3.5 py-2.5 bg-ivory/50 rounded-xl text-sm border border-sand/30 focus:border-gold/50 focus:ring-2 focus:ring-gold/10 outline-none" />
                      </div>
                      <div>
                        <label className="text-xs text-navy/50 block mb-1">Catégorie</label>
                        <select value={profile.category} onChange={e => setProfile({...profile, category: e.target.value})}
                          className="w-full px-3.5 py-2.5 bg-ivory/50 rounded-xl text-sm border border-sand/30 focus:border-gold/50 outline-none appearance-none">
                          <option value="traiteur">Traiteur</option>
                          <option value="salle-des-fetes">Salle des Fêtes</option>
                          <option value="neggafa">Neggafa</option>
                          <option value="photographe">Photographe</option>
                          <option value="orchestre">Orchestre</option>
                          <option value="robe-mariee">Robe de Mariée</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-navy/50 block mb-1">Wilaya</label>
                        <select value={profile.wilaya} onChange={e => setProfile({...profile, wilaya: e.target.value})}
                          className="w-full px-3.5 py-2.5 bg-ivory/50 rounded-xl text-sm border border-sand/30 focus:border-gold/50 outline-none appearance-none">
                          {WILAYAS_LIST.map(w => <option key={w} value={w}>{w}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-navy/50 block mb-1">Commune</label>
                        <input value={profile.commune} onChange={e => setProfile({...profile, commune: e.target.value})}
                          className="w-full px-3.5 py-2.5 bg-ivory/50 rounded-xl text-sm border border-sand/30 focus:border-gold/50 focus:ring-2 focus:ring-gold/10 outline-none" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Description */}
                <Card hover={false}>
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold text-navy mb-4">Description</h3>
                    <textarea value={profile.description} onChange={e => setProfile({...profile, description: e.target.value})}
                      rows={3} className="w-full px-3.5 py-2.5 bg-ivory/50 rounded-xl text-sm border border-sand/30 focus:border-gold/50 outline-none resize-none mb-3" />
                    <label className="text-xs text-navy/50 block mb-1">Description longue</label>
                    <textarea value={profile.longDescription} onChange={e => setProfile({...profile, longDescription: e.target.value})}
                      rows={4} className="w-full px-3.5 py-2.5 bg-ivory/50 rounded-xl text-sm border border-sand/30 focus:border-gold/50 outline-none resize-none" />
                  </CardContent>
                </Card>

                {/* Contact */}
                <Card hover={false}>
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold text-navy mb-4">Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 px-3.5 py-2.5 bg-ivory/50 rounded-xl">
                        <Phone size={15} className="text-gold shrink-0" />
                        <input value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})}
                          className="bg-transparent text-sm w-full outline-none" />
                      </div>
                      <div className="flex items-center gap-3 px-3.5 py-2.5 bg-ivory/50 rounded-xl">
                        <Mail size={15} className="text-gold shrink-0" />
                        <input value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})}
                          className="bg-transparent text-sm w-full outline-none" />
                      </div>
                      <div className="flex items-center gap-3 px-3.5 py-2.5 bg-ivory/50 rounded-xl">
                        <Globe size={15} className="text-gold shrink-0" />
                        <input value={profile.instagram} onChange={e => setProfile({...profile, instagram: e.target.value})}
                          className="bg-transparent text-sm w-full outline-none" />
                      </div>
                      <div className="flex items-center gap-3 px-3.5 py-2.5 bg-ivory/50 rounded-xl">
                        <Clock size={15} className="text-gold shrink-0" />
                        <input value={profile.yearsExperience} type="number" onChange={e => setProfile({...profile, yearsExperience: Number(e.target.value)})}
                          className="bg-transparent text-sm w-full outline-none" />
                        <span className="text-xs text-navy/30">ans d'exp.</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Save button */}
                <div className="flex items-center gap-3">
                  <Button variant="gold" className="gap-2" onClick={saveProfile}>
                    <Save size={16} /> Enregistrer les modifications
                  </Button>
                  <AnimatePresence>
                    {showProfileSuccess && (
                      <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                        className="text-xs text-success flex items-center gap-1">
                        <Check size={14} /> Enregistré
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Sidebar aperçu */}
              <div>
                <Card hover={false} className="sticky top-24">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold text-navy mb-3">Aperçu public</h3>
                    <div className="text-center p-4 bg-ivory/50 rounded-2xl mb-4">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gold/10 flex items-center justify-center">
                        <Store size={24} className="text-gold" />
                      </div>
                      <p className="font-serif font-bold text-navy text-sm">{profile.name}</p>
                      <div className="flex items-center justify-center gap-1 text-xs text-navy/40 mt-1">
                        <MapPin size={10} />{profile.commune}, {profile.wilaya}
                      </div>
                    </div>
                    <div className="space-y-2 text-xs text-navy/50">
                      <p className="flex items-center gap-2"><Check size={12} className="text-gold" /> Profil vérifié</p>
                      <p className="flex items-center gap-2"><Check size={12} className="text-gold" /> {profile.yearsExperience} ans d'expérience</p>
                      <p className="flex items-center gap-2"><Check size={12} className="text-gold" /> Note: {avgRating} ★</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ MES SERVICES ═══════════════════════════════════════ */}
        {activeTab === "services" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-1">Mes services</h1>
            <p className="text-sm text-navy/50 mb-6">Gérez les services que vous proposez.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Services actifs */}
              <Card hover={false}>
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-navy mb-4">Services proposés ({services.length})</h3>
                  <div className="space-y-2 mb-4">
                    {services.map((s, i) => (
                      <div key={i} className="flex items-center justify-between px-3.5 py-2.5 bg-ivory/50 rounded-xl group">
                        <div className="flex items-center gap-2.5">
                          <Check size={14} className="text-gold shrink-0" />
                          <span className="text-sm text-navy/70">{s}</span>
                        </div>
                        <button onClick={() => removeService(s)}
                          className="text-navy/20 hover:text-error opacity-0 group-hover:opacity-100 transition-all">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Ajouter un service */}
                  <div className="flex gap-2">
                    <input value={newService} onChange={e => setNewService(e.target.value)}
                      placeholder="Ajouter un service..." className="flex-1 px-3.5 py-2.5 bg-ivory/50 rounded-xl text-sm border border-sand/30 focus:border-gold/50 outline-none"
                      onKeyDown={e => e.key === "Enter" && addService()} />
                    <button onClick={addService} className="w-10 h-10 rounded-xl gold-gradient text-white flex items-center justify-center shrink-0 hover:opacity-90 transition-all">
                      <Plus size={18} />
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Templates */}
              <Card hover={false}>
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-navy mb-4">Suggestions</h3>
                  <p className="text-xs text-navy/40 mb-3">Cliquez pour ajouter rapidement un service :</p>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_TEMPLATES.filter(t => !services.includes(t)).map(t => (
                      <button key={t} onClick={() => { if (!services.includes(t)) setServices([...services, t]); }}
                        className="px-3 py-1.5 rounded-full bg-ivory text-xs text-navy/60 hover:bg-gold/10 hover:text-gold border border-sand/30 transition-all">
                        + {t}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* ═══ GALERIE ═════════════════════════════════════════════ */}
        {activeTab === "gallery" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-1">Galerie photos</h1>
            <p className="text-sm text-navy/50 mb-6">Ajoutez des photos de vos réalisations.</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {GALLERY_IMAGES.map((_, i) => (
                <div key={i}
                  className="aspect-square rounded-2xl bg-gradient-to-br from-ivory to-sand border-2 border-dashed border-sand/40 flex items-center justify-center cursor-pointer hover:border-gold/30 hover:bg-gold/5 transition-all group">
                  <div className="text-center">
                    <Camera size={24} className="text-navy/20 mx-auto mb-1 group-hover:text-gold/40 transition-colors" />
                    <span className="text-[10px] text-navy/30">Photo {i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" className="gap-2">
                <Plus size={16} /> Ajouter des photos
              </Button>
            </div>
          </motion.div>
        )}

        {/* ═══ MES TARIFS ═════════════════════════════════════════ */}
        {activeTab === "pricing" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-1">Mes tarifs</h1>
            <p className="text-sm text-navy/50 mb-6">Définissez votre fourchette de prix indicative.</p>

            <div className="max-w-xl">
              <Card hover={false}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-navy/40">Prix minimum</p>
                      <p className="text-3xl font-serif font-bold text-gold">{priceMin.toLocaleString()} DZD</p>
                    </div>
                    <span className="text-navy/20 text-2xl">—</span>
                    <div>
                      <p className="text-sm text-navy/40">Prix maximum</p>
                      <p className="text-3xl font-serif font-bold text-navy">{priceMax.toLocaleString()} DZD</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-navy/50 mb-2 block">Budget minimum</label>
                      <input type="range" min={30000} max={500000} step={10000} value={priceMin}
                        onChange={e => setPriceMin(Math.min(Number(e.target.value), priceMax))}
                        className="w-full accent-gold h-2" />
                    </div>
                    <div>
                      <label className="text-xs text-navy/50 mb-2 block">Budget maximum</label>
                      <input type="range" min={30000} max={1000000} step={10000} value={priceMax}
                        onChange={e => setPriceMax(Math.max(Number(e.target.value), priceMin))}
                        className="w-full accent-gold h-2" />
                    </div>
                  </div>

                  <Button variant="gold" className="gap-2 mt-6" onClick={saveProfile}>
                    <Save size={16} /> Enregistrer les tarifs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* ═══ DEMANDES ═══════════════════════════════════════════ */}
        {activeTab === "requests" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-1">Demandes reçues</h1>
            <p className="text-sm text-navy/50 mb-6">Les clients qui ont demandé un devis.</p>

            <div className="space-y-3">
              {RECENT_REQUESTS.map((req, i) => (
                <Card key={i} hover={false}>
                  <CardContent className="p-4 md:p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${req.statusColor}`}>{req.status}</span>
                        </div>
                        <p className="font-medium text-navy text-sm md:text-base">{req.client}</p>
                        <p className="text-xs text-navy/40">{req.event} · {req.date}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-serif font-bold text-gold">{req.budget}</p>
                        <Button variant="ghost" size="sm" className="text-xs mt-1">Répondre</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* ═══ AVIS CLIENTS ═══════════════════════════════════════ */}
        {activeTab === "reviews" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-1">Avis clients</h1>
            <p className="text-sm text-navy/50 mb-6">Consultez et gérez les avis.</p>

            {/* Note globale */}
            <div className="flex items-center gap-6 bg-white rounded-2xl p-5 md:p-6 shadow-card mb-6">
              <div className="text-center shrink-0">
                <p className="text-4xl font-serif font-bold text-navy">{avgRating}</p>
                <div className="flex items-center gap-0.5 justify-center mt-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} size={14} className={s <= Math.round(avgRating) ? "fill-gold text-gold" : "text-sand"} />
                  ))}
                </div>
                <p className="text-xs text-navy/40 mt-1">{totalReviews} avis</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map(star => {
                  const count = ratingDistribution[5 - star] || 0;
                  const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="text-navy/40 w-1.5 text-right">{star}</span>
                      <Star size={9} className="fill-gold text-gold" />
                      <div className="flex-1 h-1.5 bg-ivory rounded-full overflow-hidden">
                        <div className="h-full bg-gold rounded-full" style={{ width: pct + "%" }} />
                      </div>
                      <span className="text-navy/30 w-5 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Liste des avis */}
            <div className="space-y-3">
              {REVIEWS.map((rev, i) => (
                <Card key={i} hover={false}>
                  <CardContent className="p-4 md:p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-gold">{rev.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-semibold text-navy">{rev.name}</p>
                            {rev.verified && <Badge variant="gold" className="text-[8px] px-1 py-0">✓ Vérifié</Badge>}
                          </div>
                          <p className="text-xs text-navy/40">{rev.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star key={s} size={10} className={s <= rev.rating ? "fill-gold text-gold" : "text-sand"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-navy/60 leading-relaxed">&ldquo;{rev.text}&rdquo;</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
