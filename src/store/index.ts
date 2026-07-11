// ═══════════════════════════════════════════════════════════════
//   🏗️ LELLA — Store global (Zustand)
//   Gestion d'état légère pour la Phase 1
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
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, _password: string) => {
    set({ isLoading: true });
    // Simuler un délai d'API
    await new Promise(r => setTimeout(r, 800));

    // Simulation : si l'email contient "admin" → admin, "provider" → provider, sinon client
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
