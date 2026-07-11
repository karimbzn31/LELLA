// ═══════════════════════════════════════════════════════════════
//   🏗️ LELLA — Data Access Layer
//   Interface d'accès aux données — prête pour Supabase
//   Pour l'instant : mock data. Plus tard : requêtes Supabase
//   MÊME SIGNATURE pour une transition transparente
// ═══════════════════════════════════════════════════════════════

import type { Provider, Category, Review, PlatformStats } from "@/types";
import {
  providers as mockProviders,
  categories as mockCategories,
  reviews as mockReviews,
} from "@/lib/mock-data";

// ─── Providers ─────────────────────────────────────────────────

export async function getAllProviders(): Promise<Provider[]> {
  // 🔜 Remplacer par : supabase.from("providers").select("*")
  return mockProviders;
}

export async function getProviderById(id: string): Promise<Provider | null> {
  // 🔜 Remplacer par : supabase.from("providers").select("*").eq("id", id).single()
  return mockProviders.find(p => p.id === id) || null;
}

export async function getProviderBySlug(slug: string): Promise<Provider | null> {
  return mockProviders.find(p => p.slug === slug) || null;
}

export async function getFeaturedProviders(): Promise<Provider[]> {
  return mockProviders.filter(p => p.isFeatured);
}

export async function getProvidersByCategory(category: string): Promise<Provider[]> {
  return mockProviders.filter(p => p.category === category);
}

export async function searchProviders(query: string): Promise<Provider[]> {
  const q = query.toLowerCase();
  return mockProviders.filter(
    p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.location.wilaya.toLowerCase().includes(q)
  );
}

// ─── Categories ────────────────────────────────────────────────

export async function getAllCategories(): Promise<Category[]> {
  // 🔜 Remplacer par : supabase.from("categories").select("*")
  // Pour l'instant on calcule les vrais comptages depuis les providers
  return mockCategories.map(cat => ({
    ...cat,
    providerCount: mockProviders.filter(p => p.category === cat.id).length,
  }));
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const cats = await getAllCategories();
  return cats.find(c => c.id === id) || null;
}

// ─── Reviews ──────────────────────────────────────────────────

export async function getReviewsByProviderId(providerId: string): Promise<Review[]> {
  // 🔜 supabase.from("reviews").select("*").eq("provider_id", providerId)
  return mockReviews.filter(r => r.providerId === providerId);
}

// ─── Stats ────────────────────────────────────────────────────

export async function getPlatformStats(): Promise<PlatformStats> {
  return {
    totalProviders: mockProviders.length,
    totalClients: 1247,
    totalBookings: 892,
    totalEvents: 1560,
    activeListings: mockProviders.length,
    avgRating: 4.7,
    revenue: 0, // sera calculé avec Supabase
    growth: 23.5,
  };
}

// ─── Wishlist / Favoris (local storage pour l'instant) ────────

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("lella_favorites") || "[]");
  } catch {
    return [];
  }
}

export function toggleFavorite(providerId: string): boolean {
  const favs = getFavorites();
  const idx = favs.indexOf(providerId);
  if (idx >= 0) {
    favs.splice(idx, 1);
    localStorage.setItem("lella_favorites", JSON.stringify(favs));
    return false;
  } else {
    favs.push(providerId);
    localStorage.setItem("lella_favorites", JSON.stringify(favs));
    return true;
  }
}

export function isFavorite(providerId: string): boolean {
  return getFavorites().includes(providerId);
}
