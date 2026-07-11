// ═══════════════════════════════════════════════════════════════
//   🏗️ LELLA — Types & Interfaces partagés
//   Architecture de données prête pour Supabase
// ═══════════════════════════════════════════════════════════════

// ─── Catégories de prestataires (version complète algérienne) ─────
export type ProviderCategory =
  // 🏛️ Lieu & Réception
  | "salle-des-fetes"
  | "villa-domaine"
  | "traiteur"
  | "patisserie-traditionnelle"
  | "wedding-cake"
  | "decoration-salle"
  | "fleuriste"
  // 🎥 Image & Souvenir
  | "photographe"
  | "videaste"
  | "drone"
  | "photobooth"
  // 🎶 Musique & Ambiance
  | "orchestre"
  | "zorna-cortege"
  | "dj-mariage"
  | "chanteur"
  | "animation-spectacle"
  // 👑 Beauté & Style
  | "neggafa"
  | "robe-mariee"
  | "bijoux-traditionnels"
  | "maquilleuse"
  | "coiffeuse"
  | "hammam"
  | "henne-artiste"
  // 🚗 Transport & Logistique
  | "voiture-mariage"
  | "caleche"
  | "tente-kheima"
  // 📋 Organisation
  | "wedding-planner"
  | "calligraphe"
  | "invitations-faire-part";

// ─── Types d'événements ─────────────────────────────────────────
export type EventType =
  | "mariage"
  | "fiancailles"
  | "circoncision"
  | "bapteme-aqiqa"
  | "anniversaire"
  | "autre";

// ─── Statuts de réservation ────────────────────────────────────
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

// ─── Statuts de devis ──────────────────────────────────────────
export type QuoteStatus = "pending" | "accepted" | "refused" | "expired";

// ─── Rôles utilisateur ─────────────────────────────────────────
export type UserRole = "client" | "provider" | "admin";

// ─── Prix ──────────────────────────────────────────────────────
export interface PriceRange {
  min: number; // en DZD
  max: number;
}

// ─── Adresse / Localisation ─────────────────────────────────────
export interface Location {
  wilaya: string;
  commune: string;
  latitude?: number;
  longitude?: number;
}

// ─── Avis ───────────────────────────────────────────────────────
export interface Review {
  id: string;
  providerId: string;
  clientId: string;
  clientName: string;
  clientAvatar?: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO string
  eventType?: EventType;
  photos?: string[];
}

// ─── Disponibilité ──────────────────────────────────────────────
export interface Availability {
  id: string;
  providerId: string;
  date: string; // ISO date
  slots: TimeSlot[];
}

export interface TimeSlot {
  start: string; // "09:00"
  end: string; // "18:00"
  available: boolean;
}

// ─── Prestataire ────────────────────────────────────────────────
export interface Provider {
  id: string;
  name: string;
  slug: string;
  category: ProviderCategory;
  subcategories: string[];
  description: string;
  longDescription?: string;
  coverImage: string;
  logo?: string;
  gallery: string[];
  location: Location;
  priceRange: PriceRange;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isFeatured: boolean;
  yearsExperience: number;
  phone?: string;
  email?: string;
  website?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  services: string[];
  tags: string[];
  availability: Availability[];
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}

// ─── Utilisateur ────────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  location?: Location;
  createdAt: string;
}

// ─── Client ─────────────────────────────────────────────────────
export interface Client extends User {
  role: "client";
  upcomingEvent?: UserEvent;
  favorites: string[]; // provider IDs
}

// ─── Événement utilisateur ──────────────────────────────────────
export interface UserEvent {
  type: EventType;
  date: string; // ISO date
  guestCount: number;
  budget: number;
  location: Location;
}

// ─── Prestataire (compte) ───────────────────────────────────────
export interface ProviderAccount extends User {
  role: "provider";
  providerProfile: Provider;
  statistics: ProviderStats;
}

// ─── Admin ──────────────────────────────────────────────────────
export interface Admin extends User {
  role: "admin";
  permissions: string[];
}

// ─── Statistiques prestataire ───────────────────────────────────
export interface ProviderStats {
  profileViews: number;
  quoteRequests: number;
  bookingCount: number;
  totalRevenue: number;
  averageRating: number;
}

// ─── Devis ─────────────────────────────────────────────────────
export interface Quote {
  id: string;
  providerId: string;
  clientId: string;
  clientName: string;
  eventType: EventType;
  eventDate: string;
  guestCount: number;
  description: string;
  budget?: number;
  status: QuoteStatus;
  amount?: number;
  message?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Réservation ───────────────────────────────────────────────
export interface Booking {
  id: string;
  providerId: string;
  providerName: string;
  clientId: string;
  clientName: string;
  eventType: EventType;
  eventDate: string;
  status: BookingStatus;
  amount: number;
  deposit?: number;
  notes?: string;
  createdAt: string;
}

// ─── Message ────────────────────────────────────────────────────
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  read: boolean;
  createdAt: string;
}

// ─── Conversation ──────────────────────────────────────────────
export interface Conversation {
  id: string;
  participants: { userId: string; name: string; avatar?: string }[];
  lastMessage?: Message;
  unreadCount: number;
  providerId: string;
  clientId: string;
  createdAt: string;
}

// ─── Notification ──────────────────────────────────────────────
export interface Notification {
  id: string;
  userId: string;
  type: "quote" | "booking" | "message" | "review" | "system";
  title: string;
  description: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

// ─── Catégorie ─────────────────────────────────────────────────
export interface Category {
  id: ProviderCategory;
  name: string;
  nameAr: string;
  nameEn: string;
  description: string;
  icon: string;
  image: string;
  providerCount: number;
}

// ─── Statistiques plateforme ───────────────────────────────────
export interface PlatformStats {
  totalProviders: number;
  totalClients: number;
  totalBookings: number;
  totalEvents: number;
  activeListings: number;
  avgRating: number;
  revenue: number;
  growth: number;
}
