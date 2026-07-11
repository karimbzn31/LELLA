"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, User, Store, Check, X, ChevronLeft, ChevronRight,
  Camera, Plus, Star, MapPin, Phone, Mail, Clock, Shield,
  Sparkles, Briefcase, Image as ImageIcon, DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuthStore, type ProviderSignupData } from "@/store";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

// ─── Catégories disponibles ─────────────────────────────────────
const CATEGORIES = [
  { id: "traiteur", label: "Traiteur" },
  { id: "salle-des-fetes", label: "Salle des Fêtes" },
  { id: "neggafa", label: "Neggafa" },
  { id: "photographe", label: "Photographe" },
  { id: "orchestre", label: "Orchestre" },
  { id: "robe-mariee", label: "Robe de Mariée" },
  { id: "dj-mariage", label: "DJ" },
  { id: "decoration-salle", label: "Décoration" },
  { id: "hammam", label: "Hammam & Spa" },
  { id: "henne-artiste", label: "Henné" },
  { id: "videaste", label: "Vidéaste" },
  { id: "wedding-planner", label: "Wedding Planner" },
];

const WILAYAS = ["Alger", "Oran", "Constantine", "Annaba", "Sétif", "Blida", "Tizi Ouzou", "Béjaïa", "Tlemcen", "Mostaganem"];
const COMMMUNES_BY_WILAYA: Record<string, string[]> = {
  "Alger": ["Hydra", "El Biar", "Bouzareah", "Cheraga", "Bab Ezzouar", "Kouba", "Birkhadem", "Ben Aknoun"],
  "Oran": ["Oran Centre", "Canastel", "Es Senia", "Bir El Djir"],
  "Constantine": ["Constantine Centre", "Didouche Mourad", "El Khroub"],
  "Annaba": ["Annaba Centre", "El Bouni", "Sidi Amar"],
  "Sétif": ["Sétif Centre", "El Eulma", "Ain Oulmene"],
  "Blida": ["Blida Centre", "Beni Tamou", "Ouled Yaich"],
  "Tizi Ouzou": ["Tizi Ouzou Centre", "Draa Ben Khedda", "Boghni"],
  "Béjaïa": ["Béjaïa Centre", "Tichy", "Akbou"],
  "Tlemcen": ["Tlemcen Centre", "Mansourah", "Chetouane"],
  "Mostaganem": ["Mostaganem Centre", "Hadjadj", "Mazagran"],
};

const SERVICE_SUGGESTIONS: Record<string, string[]> = {
  "traiteur": ["Service traiteur complet", "Menu dégustation", "Buffet", "Pâtisserie", "Bar à jus", "Service à table"],
  "neggafa": ["5 tenues traditionnelles", "Coiffure", "Maquillage", "Habillage", "Accompagnement", "Accessoires"],
  "photographe": ["Reportage mariage", "Album luxe", "Shooting engagement", "Drone", "Livraison numérique"],
  "salle-des-fetes": ["Salle climatisée", "Parking VIP", "Sonorisation", "Éclairage", "Espace enfants", "Jardin"],
  "orchestre": ["Orchestre complet", "DJ", "Sonorisation", "Éclairage", "Animation", "Répétitions"],
  "robe-mariee": ["Robes sur-mesure", "Location", "Retouches", "Accessoires", "Conseils"],
  "dj-mariage": ["Animation DJ", "Sonorisation", "Playlist personnalisée", "Éclairage laser"],
  "decoration-salle": ["Décoration complète", "Compositions florales", "Drapés", "Éclairage", "Mobilier"],
  "hammam": ["Gommage", "Savon noir", "Massage", "Soin visage", "Huiles essentielles"],
  "henne-artiste": ["Henné mariage", "Motifs traditionnels", "Motifs modernes", "Soins mains"],
  "videaste": ["Film mariage", "Teaser", "Drone", "Montage HD"],
  "wedding-planner": ["Organisation complète", "Coordination", "Budget", "Sélection prestataires"],
};

export default function SignupPage() {
  const router = useRouter();
  const { signup, sendVerificationCode, verifyEmailCode, setPendingVerification, isLoading } = useAuthStore();

  // ─── État commun ────────────────────────────────────────────
  const [role, setRole] = useState<UserRole>("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [demoCode, setDemoCode] = useState("");
  const [codeError, setCodeError] = useState("");

  // ─── État Prestataire ────────────────────────────────────────
  const [step, setStep] = useState(0);
  const [establishementName, setEstablishementName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [yearsExp, setYearsExp] = useState(0);
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [commune, setCommune] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [minBudget, setMinBudget] = useState(50000);
  const [maxBudget, setMaxBudget] = useState(300000);
  const [services, setServices] = useState<string[]>([]);
  const [nrc, setNrc] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [newService, setNewService] = useState("");

  // ─── Gestion code de vérification ────────────────────────────
  const sendCode = async () => {
    if (!name || !email || !password) {
      setError("Veuillez remplir tous les champs");
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Email invalide");
      return false;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit faire au moins 6 caractères");
      return false;
    }
    setError("");

    const code = await sendVerificationCode(email);
    setDemoCode(code);
    setPendingVerification({
      name, email, password, role,
      code,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });
    setShowCodeInput(true);
    return true;
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    setCodeError("");

    if (value && index < 5) {
      codeRefs.current[index + 1]?.focus();
    }

    // Auto-vérification quand les 6 chiffres sont saisis
    if (newCode.every(c => c !== "")) {
      verifyCode(newCode.join(""));
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  };

  const verifyCode = async (code: string) => {
    const success = await verifyEmailCode(email, code);
    if (success) {
      if (role === "provider") {
        // Sauvegarder les données prestataire
        const providerData: ProviderSignupData = {
          establishmentName: establishementName,
          category: selectedCategory,
          subcategories,
          yearsExperience: yearsExp,
          phone,
          wilaya,
          commune,
          shortDescription: shortDesc,
          longDescription: longDesc,
          minBudget,
          maxBudget,
          services,
          nrc,
          photos,
        };
        localStorage.setItem("lella_provider_data", JSON.stringify(providerData));
        router.push("/dashboard/provider");
      } else {
        router.push("/dashboard/client");
      }
    } else {
      setCodeError("Code incorrect. Essayez encore.");
      setVerificationCode(["", "", "", "", "", ""]);
      codeRefs.current[0]?.focus();
    }
  };

  const resendCode = async () => {
    const code = await sendVerificationCode(email);
    setDemoCode(code);
    setPendingVerification({
      name, email, password, role,
      code,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });
    setVerificationCode(["", "", "", "", "", ""]);
    setCodeError("");
  };

  // ─── Gestion formulaire prestataire ──────────────────────────
  const totalSteps = 4;
  const stepLabels = ["Identité", "Contact", "Présentation", "Tarifs"];

  const canProceedStep = (s: number): boolean => {
    switch (s) {
      case 0: return establishementName.length > 0 && selectedCategory.length > 0;
      case 1: return phone.length >= 8 && wilaya.length > 0 && commune.length > 0;
      case 2: return shortDesc.length >= 10;
      case 3: return services.length > 0;
      default: return false;
    }
  };

  const addService = () => {
    if (newService.trim() && !services.includes(newService.trim())) {
      setServices([...services, newService.trim()]);
      setNewService("");
    }
  };

  const addSubcategory = (sc: string) => {
    if (!subcategories.includes(sc)) {
      setSubcategories([...subcategories, sc]);
    }
  };

  const providerSubmit = async () => {
    if (!canProceedStep(3)) return;
    await sendCode();
  };

  // ─── Réinitialiser le formulaire quand on change de rôle ──────
  const switchRole = (r: UserRole) => {
    setRole(r);
    setStep(0);
    setShowCodeInput(false);
    setVerificationCode(["", "", "", "", "", ""]);
    setError("");
    setCodeError("");
  };

  return (
    <div className="min-h-screen flex items-start md:items-center justify-center pt-20 md:pt-24 pb-24 md:pb-16 bg-ivory/30">
      <div className="section-container w-full max-w-lg">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {/* Brand */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-2 mb-1">
              <span className="text-2xl md:text-3xl font-serif font-bold text-navy">LELLA</span>
              <span className="text-gold text-lg">✦</span>
            </Link>
            <p className="text-navy/50 text-xs md:text-sm">Créez votre compte</p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6 max-w-sm mx-auto">
            <button type="button" onClick={() => switchRole("client")}
              className={cn("p-3 md:p-4 rounded-2xl border-2 text-center transition-all active:scale-[0.98]",
                role === "client" ? "border-gold bg-gold/5 shadow-sm shadow-gold/10" : "border-sand/50 hover:border-gold/30 bg-white")}>
              <User size={22} className={cn("mx-auto mb-1", role === "client" ? "text-gold" : "text-navy/30")} />
              <span className={cn("text-xs md:text-sm font-medium", role === "client" ? "text-gold" : "text-navy/50")}>Client</span>
            </button>
            <button type="button" onClick={() => switchRole("provider")}
              className={cn("p-3 md:p-4 rounded-2xl border-2 text-center transition-all active:scale-[0.98]",
                role === "provider" ? "border-gold bg-gold/5 shadow-sm shadow-gold/10" : "border-sand/50 hover:border-gold/30 bg-white")}>
              <Store size={22} className={cn("mx-auto mb-1", role === "provider" ? "text-gold" : "text-navy/30")} />
              <span className={cn("text-xs md:text-sm font-medium", role === "provider" ? "text-gold" : "text-navy/50")}>Prestataire</span>
            </button>
          </div>

          <div className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-card border border-sand/20">
            {/* ═══ CLIENT SIGNUP ═══════════════════════════════ */}
            {role === "client" && !showCodeInput && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <Input label="Nom complet" id="c-name" placeholder="Votre nom"
                  value={name} onChange={e => setName(e.target.value)} />
                <Input label="Email" type="email" id="c-email" placeholder="vous@email.com"
                  value={email} onChange={e => setEmail(e.target.value)} />
                <Input label="Mot de passe" type="password" id="c-pass" placeholder="••••••••"
                  value={password} onChange={e => setPassword(e.target.value)} />

                {error && <p className="text-error text-xs md:text-sm bg-error/5 p-3 rounded-xl">{error}</p>}

                <Button variant="gold" className="w-full gap-2 py-3.5 text-sm" loading={isLoading} onClick={sendCode}>
                  Créer mon compte <ArrowRight size={16} />
                </Button>

                <p className="text-center text-xs md:text-sm text-navy/40">
                  Vous recevrez un code de validation par email.
                </p>
              </motion.div>
            )}

            {/* ═══ PROVIDER — MULTI-STEP WIZARD ════════════════ */}
            {role === "provider" && !showCodeInput && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    {stepLabels.map((label, i) => (
                      <button key={i} onClick={() => i <= step ? setStep(i) : null}
                        className={cn("text-[9px] md:text-xs font-medium transition-colors",
                          i === step ? "text-gold" : i < step ? "text-success" : "text-navy/20")}>
                        {i < step ? "✓" : `${i + 1}`} {label}
                      </button>
                    ))}
                  </div>
                  <div className="h-1.5 bg-ivory rounded-full overflow-hidden">
                    <motion.div className="h-full gold-gradient rounded-full"
                      initial={false} animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                      transition={{ duration: 0.3 }} />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {/* STEP 1: IDENTITÉ */}
                  {step === 0 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div className="text-center mb-3">
                        <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-gold/10 flex items-center justify-center">
                          <Briefcase size={24} className="text-gold" />
                        </div>
                        <h3 className="font-serif font-semibold text-navy text-base">Qui êtes-vous ?</h3>
                      </div>

                      <Input label="Nom de l'établissement *" id="p-name" placeholder="Ex: Palais des Délices"
                        value={establishementName} onChange={e => setEstablishementName(e.target.value)} />

                      <div>
                        <label className="text-xs md:text-sm text-navy/60 block mb-1.5 font-medium">Catégorie principale *</label>
                        <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                          {CATEGORIES.map(c => (
                            <button key={c.id} type="button" onClick={() => setSelectedCategory(c.id)}
                              className={cn("px-2.5 py-2 rounded-xl text-[10px] md:text-xs font-medium transition-all border",
                                selectedCategory === c.id ? "bg-gold text-white border-gold" : "bg-white text-navy/50 border-sand/50 hover:border-gold/30")}>
                              {c.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {selectedCategory && SERVICE_SUGGESTIONS[selectedCategory] && (
                        <div>
                          <label className="text-xs text-navy/40 block mb-1.5">Spécialités (optionnel)</label>
                          <div className="flex flex-wrap gap-1.5">
                            {SERVICE_SUGGESTIONS[selectedCategory].map(s => (
                              <button key={s} type="button" onClick={() => addSubcategory(s)}
                                className={cn("px-2.5 py-1 rounded-full text-[10px] border transition-all",
                                  subcategories.includes(s)
                                    ? "bg-gold/10 text-gold border-gold/20"
                                    : "bg-ivory text-navy/40 border-sand/30 hover:border-gold/30")}>
                                + {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-navy/50 block mb-1.5 font-medium">Expérience</label>
                          <select value={yearsExp} onChange={e => setYearsExp(Number(e.target.value))}
                            className="w-full px-3 py-2.5 bg-ivory/50 rounded-xl text-sm border border-sand/30 focus:border-gold/50 outline-none appearance-none">
                            {[0, 1, 2, 3, 5, 7, 10, 15, 20, 25, 30].map(y => (
                              <option key={y} value={y}>{y === 0 ? "Débutant" : `${y} ans`}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-navy/50 block mb-1.5 font-medium">Photo</label>
                          <button type="button" className="w-full h-[42px] rounded-xl border-2 border-dashed border-sand/40 flex items-center justify-center gap-1.5 text-navy/30 hover:border-gold/30 hover:text-gold/50 transition-all">
                            <Camera size={14} /> <span className="text-xs">Ajouter</span>
                          </button>
                        </div>
                      </div>

                      <Button variant="gold" className="w-full gap-2 mt-2" disabled={!canProceedStep(0)}
                        onClick={() => setStep(1)}>
                        Suivant <ChevronRight size={16} />
                      </Button>
                    </motion.div>
                  )}

                  {/* STEP 2: CONTACT & LOCALISATION */}
                  {step === 1 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div className="text-center mb-3">
                        <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-gold/10 flex items-center justify-center">
                          <MapPin size={24} className="text-gold" />
                        </div>
                        <h3 className="font-serif font-semibold text-navy text-base">Où & comment vous joindre ?</h3>
                      </div>

                      <div className="flex items-center gap-3 px-3.5 py-3 bg-ivory/50 rounded-xl border border-sand/30">
                        <Phone size={16} className="text-gold shrink-0" />
                        <input type="tel" placeholder="Numéro de téléphone *" value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="bg-transparent text-sm w-full outline-none" />
                      </div>

                      <div className="flex items-center gap-3 px-3.5 py-3 bg-ivory/50 rounded-xl border border-sand/30">
                        <Mail size={16} className="text-gold shrink-0" />
                        <input type="email" placeholder="Email de contact *" value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="bg-transparent text-sm w-full outline-none" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-navy/50 block mb-1.5 font-medium">Wilaya *</label>
                          <select value={wilaya} onChange={e => { setWilaya(e.target.value); setCommune(""); }}
                            className="w-full px-3 py-2.5 bg-ivory/50 rounded-xl text-sm border border-sand/30 focus:border-gold/50 outline-none appearance-none">
                            <option value="">Sélectionner</option>
                            {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-navy/50 block mb-1.5 font-medium">Commune *</label>
                          <select value={commune} onChange={e => setCommune(e.target.value)}
                            className="w-full px-3 py-2.5 bg-ivory/50 rounded-xl text-sm border border-sand/30 focus:border-gold/50 outline-none appearance-none">
                            <option value="">Sélectionner</option>
                            {(COMMMUNES_BY_WILAYA[wilaya] || []).map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 gap-2" onClick={() => setStep(0)}>
                          <ChevronLeft size={16} /> Retour
                        </Button>
                        <Button variant="gold" className="flex-1 gap-2" disabled={!canProceedStep(1)}
                          onClick={() => setStep(2)}>
                          Suivant <ChevronRight size={16} />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: PRÉSENTATION */}
                  {step === 2 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div className="text-center mb-3">
                        <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-gold/10 flex items-center justify-center">
                          <ImageIcon size={24} className="text-gold" />
                        </div>
                        <h3 className="font-serif font-semibold text-navy text-base">Parlez de vous</h3>
                      </div>

                      <div>
                        <label className="text-xs text-navy/50 block mb-1.5 font-medium">Description courte *</label>
                        <textarea placeholder="En une phrase, ce qui vous rend unique..." value={shortDesc}
                          onChange={e => setShortDesc(e.target.value)} maxLength={200} rows={2}
                          className="w-full px-3.5 py-2.5 bg-ivory/50 rounded-xl text-sm border border-sand/30 focus:border-gold/50 outline-none resize-none" />
                        <p className="text-[10px] text-navy/30 text-right mt-0.5">{shortDesc.length}/200</p>
                      </div>

                      <div>
                        <label className="text-xs text-navy/50 block mb-1.5 font-medium">Description longue</label>
                        <textarea placeholder="Parlez de votre parcours, votre équipe, votre passion..." value={longDesc}
                          onChange={e => setLongDesc(e.target.value)} rows={3}
                          className="w-full px-3.5 py-2.5 bg-ivory/50 rounded-xl text-sm border border-sand/30 focus:border-gold/50 outline-none resize-none" />
                      </div>

                      <div>
                        <label className="text-xs text-navy/50 block mb-1.5 font-medium">Photos de réalisations</label>
                        <div className="flex gap-2">
                          {[0, 1, 2].map(i => (
                            <button key={i} type="button"
                              className="w-20 h-20 rounded-xl bg-ivory/50 border-2 border-dashed border-sand/40 flex items-center justify-center hover:border-gold/30 hover:bg-gold/5 transition-all group">
                              <Camera size={18} className="text-navy/20 group-hover:text-gold/40" />
                            </button>
                          ))}
                          <p className="text-[10px] text-navy/30 self-end pb-1">Min. 1 photo</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 gap-2" onClick={() => setStep(1)}>
                          <ChevronLeft size={16} /> Retour
                        </Button>
                        <Button variant="gold" className="flex-1 gap-2" disabled={!canProceedStep(2)}
                          onClick={() => setStep(3)}>
                          Suivant <ChevronRight size={16} />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: TARIFS & SERVICES */}
                  {step === 3 && (
                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div className="text-center mb-3">
                        <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-gold/10 flex items-center justify-center">
                          <DollarSign size={24} className="text-gold" />
                        </div>
                        <h3 className="font-serif font-semibold text-navy text-base">Vos prestations</h3>
                      </div>

                      {/* Budget slider */}
                      <div className="bg-ivory/50 rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold text-navy">Budget</span>
                          <span className="text-xs font-bold text-gold bg-gold/10 px-2.5 py-1 rounded-full">
                            {minBudget.toLocaleString()} — {maxBudget.toLocaleString()} DZD
                          </span>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] text-navy/30">Minimum</label>
                          <input type="range" min={10000} max={1000000} step={10000} value={minBudget}
                            onChange={e => setMinBudget(Math.min(Number(e.target.value), maxBudget))}
                            className="w-full accent-gold h-1.5" />
                          <label className="text-[10px] text-navy/30">Maximum</label>
                          <input type="range" min={10000} max={2000000} step={10000} value={maxBudget}
                            onChange={e => setMaxBudget(Math.max(Number(e.target.value), minBudget))}
                            className="w-full accent-gold h-1.5" />
                        </div>
                      </div>

                      {/* Services */}
                      <div>
                        <label className="text-xs text-navy/50 block mb-1.5 font-medium">Services proposés *</label>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {services.map(s => (
                            <Badge key={s} variant="gold" className="text-[10px] md:text-xs flex items-center gap-1 pr-1">
                              {s}
                              <button onClick={() => setServices(services.filter(x => x !== s))} className="hover:text-error ml-0.5">
                                <X size={10} />
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input value={newService} onChange={e => setNewService(e.target.value)}
                            placeholder="Ajouter un service..." className="flex-1 px-3.5 py-2 bg-ivory/50 rounded-xl text-sm border border-sand/30 focus:border-gold/50 outline-none"
                            onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addService())} />
                          <button type="button" onClick={addService}
                            className="w-9 h-9 rounded-xl gold-gradient text-white flex items-center justify-center shrink-0">
                            <Plus size={16} />
                          </button>
                        </div>
                        {/* Suggestions */}
                        {selectedCategory && SERVICE_SUGGESTIONS[selectedCategory] && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {SERVICE_SUGGESTIONS[selectedCategory].filter(s => !services.includes(s)).slice(0, 4).map(s => (
                              <button key={s} type="button" onClick={() => setServices([...services, s])}
                                className="text-[9px] px-2 py-0.5 rounded-full bg-ivory text-navy/40 hover:text-gold border border-sand/30 transition-all">
                                + {s}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* NRC optionnel */}
                      <div>
                        <label className="text-xs text-navy/50 block mb-1.5 font-medium">
                          Numéro de registre de commerce
                          <span className="text-gold ml-1 text-[10px]">(optionnel)</span>
                        </label>
                        <input value={nrc} onChange={e => setNrc(e.target.value)}
                          placeholder="Ex: 16 01 1234567 00"
                          className="w-full px-3.5 py-2.5 bg-ivory/50 rounded-xl text-sm border border-sand/30 focus:border-gold/50 outline-none" />
                        <p className="flex items-center gap-1 text-[10px] text-gold/60 mt-1">
                          <Shield size={10} /> Le NRC donne le badge "PRO VÉRIFIÉ" sur votre profil
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 gap-2" onClick={() => setStep(2)}>
                          <ChevronLeft size={16} /> Retour
                        </Button>
                        <Button variant="gold" className="flex-1 gap-2" disabled={!canProceedStep(3)}
                          onClick={providerSubmit}>
                          Créer mon compte pro <ArrowRight size={16} />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ═══ CODE DE VÉRIFICATION ═══════════════════════ */}
            {showCodeInput && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
                  <Mail size={28} className="text-success" />
                </div>
                <h3 className="font-serif font-bold text-navy text-lg mb-1">Code envoyé !</h3>
                <p className="text-xs md:text-sm text-navy/50 mb-2">
                  Un code à 6 chiffres a été envoyé à
                </p>
                <p className="text-sm font-semibold text-navy mb-6">{email}</p>

                {/* Code à 6 chiffres */}
                <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
                  {verificationCode.map((digit, i) => (
                    <input key={i}
                      ref={el => { codeRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleCodeChange(i, e.target.value)}
                      onKeyDown={e => handleCodeKeyDown(i, e)}
                      className={cn(
                        "w-10 h-12 md:w-12 md:h-14 text-center text-lg md:text-xl font-bold rounded-xl border-2 outline-none transition-all",
                        codeError ? "border-error bg-error/5" : digit ? "border-gold bg-gold/5" : "border-sand/50 bg-ivory/50",
                        "focus:border-gold focus:ring-2 focus:ring-gold/10"
                      )}
                      autoFocus={i === 0}
                    />
                  ))}
                </div>

                {codeError && <p className="text-error text-xs md:text-sm mb-3">{codeError}</p>}

                {/* Demo hint */}
                {demoCode && (
                  <div className="p-3 bg-gold/5 rounded-xl border border-gold/10 mb-4">
                    <p className="flex items-center justify-center gap-1 text-[10px] md:text-xs text-navy/40">
                      <Sparkles size={10} className="text-gold" />
                      Mode démo — Code : <span className="font-bold text-gold text-sm">{demoCode}</span>
                    </p>
                  </div>
                )}

                <p className="text-xs text-navy/30">
                  Code expiré ?{" "}
                  <button onClick={resendCode} className="text-gold hover:underline font-medium">
                    Renvoyer
                  </button>
                </p>
              </motion.div>
            )}

            {/* Lien connexion */}
            {!showCodeInput && (
              <div className="mt-5 pt-4 border-t border-sand/30 text-center">
                <p className="text-xs md:text-sm text-navy/50">
                  Déjà un compte ?{" "}
                  <Link href="/auth/login" className="text-gold hover:underline font-medium">
                    Se connecter
                  </Link>
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
