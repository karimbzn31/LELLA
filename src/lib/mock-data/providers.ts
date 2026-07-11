// ═══════════════════════════════════════════════════════════════
//   🏗️ LELLA — Prestataires (données vides — prêtes pour Supabase)
//   Phase 2 terminée, on passe aux vraies données
// ═══════════════════════════════════════════════════════════════

import type { Provider, Review } from "@/types";

export const reviews: Review[] = [];

export const providers: Provider[] = [];

// ─── Helpers (gardés pour compatibilité) ──────────────────────

export function getFeaturedProviders(): Provider[] {
  return [];
}

export function getProvidersByCategory(category: string): Provider[] {
  return [];
}

export function getProviderBySlug(slug: string): Provider | undefined {
  return undefined;
}

export function getProvidersByWilaya(wilaya: string): Provider[] {
  return [];
}

export function searchProviders(query: string): Provider[] {
  return [];
}

export function getFilteredProviders(filters: {
  category?: string;
  wilaya?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
}): Provider[] {
  return [];
}
