// ═══════════════════════════════════════════════════════════════
//   🏗️ LELLA — Utilitaires partagés
// ═══════════════════════════════════════════════════════════════

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Fusionne les classes Tailwind avec résolution de conflits */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formate un prix en DZD */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-DZ", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price) + " DA";
}

/** Formate une date en français */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Génère un slug à partir d'un nom */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Tronque un texte avec "..." */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + "...";
}

/** Retourne l'emoji correspondant à une catégorie */
export function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    traiteur: "🍽️",
    "salle-des-fetes": "🏛️",
    photographe: "📸",
    videaste: "🎥",
    orchestre: "🎵",
    neggafa: "👗",
    "robe-de-mariee": "👰",
    hammam: "🧖",
    henne: "🌿",
    decoration: "✨",
    dj: "🎧",
    patisserie: "🧁",
    "location-voitures": "🚗",
    "coiffure-maquillage": "💄",
    "gateau-mariage": "🎂",
    "cadeaux-invites": "🎁",
  };
  return emojis[category] || "⭐";
}

/** Calcule la note moyenne */
export function averageRating(ratings: number[]): number {
  if (!ratings.length) return 0;
  return ratings.reduce((a, b) => a + b, 0) / ratings.length;
}

/** Génère un ID unique local (en attendant Supabase) */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
