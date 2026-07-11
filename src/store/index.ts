// ═══════════════════════════════════════════════════════════════
//   🏗️ LELLA — Store global (Zustand)
//   Gestion d'état légère pour la Phase 2
//   Prêt à remplacer/étendre avec Supabase
// ═══════════════════════════════════════════════════════════════

import { create } from "zustand";
import type { User, UserRole, Notification } from "@/types";
import type { Locale } from "@/lib/i18n";

// ─── Auth Store ─────────────────────────────────────────────────

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User | null) => void;

  // Email verification
  sendVerificationCode: (email: string) => Promise<string>;  // returns the code for demo
  verifyEmailCode: (email: string, code: string) => Promise<boolean>;
  pendingVerification: PendingVerification | null;
  setPendingVerification: (pv: PendingVerification | null) => void;
}

export interface PendingVerification {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  providerData?: ProviderSignupData;
  code: string;
  expiresAt: number;
}

export interface ProviderSignupData {
  establishmentName: string;
  category: string;
  subcategories: string[];
  yearsExperience: number;
  phone: string;
  wilaya: string;
  commune: string;
  shortDescription: string;
  longDescription: string;
  minBudget: number;
  maxBudget: number;
  services: string[];
  nrc: string;
  photos: string[];
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  pendingVerification: null,

  login: async (email: string, _password: string) => {
    set({ isLoading: true });
    await new Promise(r => setTimeout(r, 800));

    let role: UserRole = "client";
    if (email.includes("admin")) role = "admin";
    else if (email.includes("provider") || email.includes("prestataire")) role = "provider";

    const user: User = {
      id: `user-${Math.random().toString(36).substring(2, 8)}`,
      email,
      name: email.split("@")[0],
      role,
      createdAt: new Date().toISOString(),
    };

    set({ user, isAuthenticated: true, isLoading: false });
    if (typeof window !== "undefined") {
      localStorage.setItem("lella_user", JSON.stringify(user));
    }
    return true;
  },

  signup: async (name: string, email: string, _password: string, role: UserRole) => {
    set({ isLoading: true });
    await new Promise(r => setTimeout(r, 800));

    const user: User = {
      id: `user-${Math.random().toString(36).substring(2, 8)}`,
      email,
      name,
      role,
      createdAt: new Date().toISOString(),
    };

    set({ user, isAuthenticated: true, isLoading: false });
    if (typeof window !== "undefined") {
      localStorage.setItem("lella_user", JSON.stringify(user));
    }
    return true;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    if (typeof window !== "undefined") {
      localStorage.removeItem("lella_user");
    }
  },

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  // ─── Email Verification ───────────────────────────────────
  sendVerificationCode: async (email: string) => {
    // Générer un code à 6 chiffres
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // 🔜 Remplacer par un vrai service email (Supabase, Resend, etc.)
    // Simulation : on stocke le code dans le pendingVerification
    console.log(`[LELLA] Code de vérification pour ${email}: ${code}`);

    return code;
  },

  verifyEmailCode: async (email: string, code: string) => {
    const pv = get().pendingVerification;
    if (!pv || pv.email !== email) return false;
    if (Date.now() > pv.expiresAt) return false;
    if (pv.code !== code) return false;

    // Code valide → créer le compte
    const role = pv.role;
    const user: User = {
      id: `user-${Math.random().toString(36).substring(2, 8)}`,
      email,
      name: pv.name,
      role,
      ...(role === "provider" && pv.providerData ? {
        providerProfile: {
          name: pv.providerData.establishmentName,
          category: pv.providerData.category,
          services: pv.providerData.services,
          priceRange: { min: pv.providerData.minBudget, max: pv.providerData.maxBudget },
          location: { wilaya: pv.providerData.wilaya, commune: pv.providerData.commune },
          phone: pv.providerData.phone,
          description: pv.providerData.shortDescription,
          yearsExperience: pv.providerData.yearsExperience,
        }
      } : {}),
      createdAt: new Date().toISOString(),
    };

    set({ user, isAuthenticated: true, isLoading: false, pendingVerification: null });
    if (typeof window !== "undefined") {
      localStorage.setItem("lella_user", JSON.stringify(user));
      if (role === "provider" && pv.providerData) {
        localStorage.setItem("lella_provider_data", JSON.stringify(pv.providerData));
      }
    }
    return true;
  },

  setPendingVerification: (pv) => set({ pendingVerification: pv }),
}));

// ─── UI Store ──────────────────────────────────────────────────

interface UIState {
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  isFilterOpen: boolean;
  locale: Locale;
  notifications: Notification[];
  unreadCount: number;

  toggleMenu: () => void;
  toggleSearch: () => void;
  toggleFilter: () => void;
  setLocale: (locale: Locale) => void;
  addNotification: (notif: Notification) => void;
  markAsRead: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMenuOpen: false,
  isSearchOpen: false,
  isFilterOpen: false,
  locale: "fr",
  notifications: [],
  unreadCount: 0,

  toggleMenu: () => set(s => ({ isMenuOpen: !s.isMenuOpen })),
  toggleSearch: () => set(s => ({ isSearchOpen: !s.isSearchOpen })),
  toggleFilter: () => set(s => ({ isFilterOpen: !s.isFilterOpen })),
  setLocale: (locale) => set({ locale }),
  addNotification: (notif) =>
    set(s => ({
      notifications: [notif, ...s.notifications],
      unreadCount: s.unreadCount + (notif.read ? 0 : 1),
    })),
  markAsRead: (id) =>
    set(s => ({
      notifications: s.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, s.unreadCount - 1),
    })),
}));

// ─── Marketplace Store ─────────────────────────────────────────

interface MarketplaceState {
  searchQuery: string;
  selectedCategory: string | null;
  selectedWilaya: string | null;
  sortBy: "popularity" | "price_asc" | "price_desc" | "rating";
  priceRange: [number, number];
  viewMode: "grid" | "list";

  setSearchQuery: (q: string) => void;
  setSelectedCategory: (cat: string | null) => void;
  setSelectedWilaya: (wilaya: string | null) => void;
  setSortBy: (sort: "popularity" | "price_asc" | "price_desc" | "rating") => void;
  setPriceRange: (range: [number, number]) => void;
  setViewMode: (mode: "grid" | "list") => void;
  resetFilters: () => void;
}

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  searchQuery: "",
  selectedCategory: null,
  selectedWilaya: null,
  sortBy: "popularity",
  priceRange: [0, 1000000],
  viewMode: "grid",

  setSearchQuery: (q) => set({ searchQuery: q }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  setSelectedWilaya: (wilaya) => set({ selectedWilaya: wilaya }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setPriceRange: (range) => set({ priceRange: range }),
  setViewMode: (mode) => set({ viewMode: mode }),
  resetFilters: () =>
    set({
      searchQuery: "",
      selectedCategory: null,
      selectedWilaya: null,
      sortBy: "popularity",
      priceRange: [0, 1000000],
    }),
}));
