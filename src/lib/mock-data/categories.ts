// ═══════════════════════════════════════════════════════════════
//   🏗️ LELLA — Catégories de prestataires (version complète)
//   29 catégories basées sur les besoins réels du mariage algérien
//   Regroupées en 6 familles : Lieu, Image, Musique, Beauté, Transport, Organisation
// ═══════════════════════════════════════════════════════════════

import type { Category } from "@/types";

export const categories: Category[] = [
  // ═══ 🏛️ Lieu & Réception ══════════════════════════════════
  {
    id: "salle-des-fetes",
    name: "Salle des Fêtes",
    nameAr: "قاعة حفلات",
    nameEn: "Venue Hall",
    description: "Salles de réception prestigieuses pour tous types de célébrations, avec sous-filtres par capacité et quartier",
    icon: "building2",
    image: "/images/categories/salle-des-fetes.svg",
    providerCount: 48,
  },
  {
    id: "villa-domaine",
    name: "Villa & Domaine",
    nameAr: "فيلا و قصر",
    nameEn: "Villa & Estate",
    description: "Villas et domaines privatisés pour mariages haut de gamme en extérieur",
    icon: "home",
    image: "/images/categories/villa-domaine.svg",
    providerCount: 22,
  },
  {
    id: "traiteur",
    name: "Traiteur",
    nameAr: "مطعم حفلات",
    nameEn: "Catering",
    description: "Traiteurs spécialisés dans les événements familiaux, cuisine traditionnelle algérienne et internationale — halal exclusivement",
    icon: "utensils-crossed",
    image: "/images/categories/traiteur.svg",
    providerCount: 56,
  },
  {
    id: "patisserie-traditionnelle",
    name: "Pâtisserie Traditionnelle",
    nameAr: "حلويات تقليدية",
    nameEn: "Traditional Pastry",
    description: "Makrout, tcharek, dziriette, cornes de gazelle et autres douceurs algériennes faites main",
    icon: "cake-slice",
    image: "/images/categories/patisserie-traditionnelle.svg",
    providerCount: 40,
  },
  {
    id: "wedding-cake",
    name: "Wedding Cake",
    nameAr: "كعكة زفاف",
    nameEn: "Wedding Cake",
    description: "Créateurs de pièces montées et gâteaux de mariage personnalisés, modernes ou traditionnels",
    icon: "cake",
    image: "/images/categories/wedding-cake.svg",
    providerCount: 18,
  },
  {
    id: "decoration-salle",
    name: "Décoration de Salle",
    nameAr: "ديكور القاعة",
    nameEn: "Venue Decoration",
    description: "Décorateurs spécialisés : thèmes, fleurs, éclairage, arches et mise en scène complète",
    icon: "layout-dashboard",
    image: "/images/categories/decoration-salle.svg",
    providerCount: 45,
  },
  {
    id: "fleuriste",
    name: "Fleuriste",
    nameAr: "بائع ورود",
    nameEn: "Florist",
    description: "Compositions florales pour la mariée, la salle et le cortège — bouquet, centre de table, arches fleuries",
    icon: "flower-2",
    image: "/images/categories/fleuriste.svg",
    providerCount: 28,
  },

  // ═══ 🎥 Image & Souvenir ════════════════════════════════════
  {
    id: "photographe",
    name: "Photographe Mariage",
    nameAr: "مصور زفاف",
    nameEn: "Wedding Photographer",
    description: "Photographes professionnels pour immortaliser chaque instant de votre événement en mode reportage",
    icon: "camera",
    image: "/images/categories/photographe.svg",
    providerCount: 62,
  },
  {
    id: "videaste",
    name: "Vidéaste / Cinématique",
    nameAr: "مصور فيديو",
    nameEn: "Videographer",
    description: "Studios de réalisation cinématique — filmer son mariage en mode film est devenu un incontournable",
    icon: "video",
    image: "/images/categories/videaste.svg",
    providerCount: 42,
  },
  {
    id: "drone",
    name: "Drone",
    nameAr: "طائرة تصوير",
    nameEn: "Drone Services",
    description: "Captations aériennes pour des vues spectaculaires de votre réception et des paysages alentour",
    icon: "drone",
    image: "/images/categories/drone.svg",
    providerCount: 15,
  },
  {
    id: "photobooth",
    name: "Photobooth",
    nameAr: "كابينة تصوير",
    nameEn: "Photobooth",
    description: "Cabines photo et miroirs interactifs pour des souvenirs amusants avec vos invités",
    icon: "camera",
    image: "/images/categories/photobooth.svg",
    providerCount: 20,
  },

  // ═══ 🎶 Musique & Ambiance ═══════════════════════════════════
  {
    id: "orchestre",
    name: "Orchestre Traditionnel",
    nameAr: "أوركسترا تقليدي",
    nameEn: "Traditional Orchestra",
    description: "Orchestres spécialisés dans le chaâbi, staïfi, mezoued, raï et musique traditionnelle algérienne",
    icon: "music",
    image: "/images/categories/orchestre.svg",
    providerCount: 30,
  },
  {
    id: "zorna-cortege",
    name: "Zorna & Cortège",
    nameAr: "زرنة و موكب",
    nameEn: "Zorna & Procession",
    description: "Musique traditionnelle aux instruments à vent qui accompagne le cortège et annonce l'entrée des mariés",
    icon: "music-2",
    image: "/images/categories/zorna-cortege.svg",
    providerCount: 18,
  },
  {
    id: "dj-mariage",
    name: "DJ Mariage",
    nameAr: "دي جي زفاف",
    nameEn: "Wedding DJ",
    description: "DJs spécialisés qui mixent hits internationaux et classiques algériens pour faire danser toutes les générations",
    icon: "radio",
    image: "/images/categories/dj-mariage.svg",
    providerCount: 35,
  },
  {
    id: "chanteur",
    name: "Chanteur(se) / Troupe",
    nameAr: "مطرب أو فرقة",
    nameEn: "Singer / Live Band",
    description: "Chanteurs et troupes live pour animer votre soirée avec des performances en direct",
    icon: "mic",
    image: "/images/categories/chanteur.svg",
    providerCount: 24,
  },
  {
    id: "animation-spectacle",
    name: "Animation & Spectacles",
    nameAr: "تنشيط و عروض",
    nameEn: "Animation & Shows",
    description: "Chorégraphies, surprises, artistes de rue, danseuses orientales et animations pour votre soirée",
    icon: "sparkles",
    image: "/images/categories/animation-spectacle.svg",
    providerCount: 16,
  },

  // ═══ 👑 Beauté & Style ═══════════════════════════════════════
  {
    id: "neggafa",
    name: "Neggafa",
    nameAr: "نقافة",
    nameEn: "Neggafa",
    description: "La femme qui orchestre les cérémonies traditionnelles : elle habille, coiffe, applique le henné et gère les changements de tenues",
    icon: "sparkles",
    image: "/images/categories/neggafa.svg",
    providerCount: 50,
  },
  {
    id: "robe-mariee",
    name: "Robe de Mariée",
    nameAr: "فستان زفاف",
    nameEn: "Wedding Dress",
    description: "Créateurs et boutiques de robes de mariée et tenues traditionnelles : chedda, karakou, gandoura, tenue kabyle",
    icon: "heart",
    image: "/images/categories/robe-mariee.svg",
    providerCount: 42,
  },
  {
    id: "bijoux-traditionnels",
    name: "Bijoux Traditionnels",
    nameAr: "مجوهرات تقليدية",
    nameEn: "Traditional Jewelry",
    description: "Location de parures en or et argent selon les régions — kabyle, constantinois, targui, algérois",
    icon: "gem",
    image: "/images/categories/bijoux-traditionnels.svg",
    providerCount: 22,
  },
  {
    id: "maquilleuse",
    name: "Maquilleuse",
    nameAr: "ماكييرة",
    nameEn: "Makeup Artist",
    description: "Maquilleuses professionnelles spécialisées dans le maquillage de mariée, tenue et photogénique",
    icon: "spray-can",
    image: "/images/categories/maquilleuse.svg",
    providerCount: 38,
  },
  {
    id: "coiffeuse",
    name: "Coiffeuse Mariée",
    nameAr: "مصففة شعر",
    nameEn: "Bridal Hair Stylist",
    description: "Coiffeurs spécialisés dans les coiffures de mariée traditionnelles et modernes",
    icon: "scissors",
    image: "/images/categories/coiffeuse.svg",
    providerCount: 32,
  },
  {
    id: "hammam",
    name: "Hammam & Spa",
    nameAr: "حمام و منتجع",
    nameEn: "Hammam & Spa",
    description: "Hammams et instituts de beauté pour la cérémonie du bain purificateur, gommages et soins avant le mariage",
    icon: "flame",
    image: "/images/categories/hammam.svg",
    providerCount: 28,
  },
  {
    id: "henne-artiste",
    name: "Henné Artiste",
    nameAr: "فنانة حناء",
    nameEn: "Henna Artist",
    description: "Artistes du henné spécialisées dans les motifs traditionnels algériens et contemporains",
    icon: "palette",
    image: "/images/categories/henne-artiste.svg",
    providerCount: 35,
  },

  // ═══ 🚗 Transport & Logistique ═══════════════════════════════
  {
    id: "voiture-mariage",
    name: "Voiture de Mariage",
    nameAr: "سيارة زفاف",
    nameEn: "Wedding Car",
    description: "Voitures de luxe et de collection décorées pour le cortège : Mercedes, Rolls Royce, BMW",
    icon: "car",
    image: "/images/categories/voiture-mariage.svg",
    providerCount: 20,
  },
  {
    id: "caleche",
    name: "Calèche & Entrée",
    nameAr: "عربة و دخول",
    nameEn: "Carriage & Entry",
    description: "Entrées à cheval sur selles orientales et calèches décorées — très demandé dans les mariages haut de gamme",
    icon: "star",
    image: "/images/categories/caleche.svg",
    providerCount: 12,
  },
  {
    id: "tente-kheima",
    name: "Tente & Kheima",
    nameAr: "خيمة",
    nameEn: "Tent & Kheima",
    description: "Location de tentes et kheimas pour mariages en extérieur, notamment dans le Sud algérien",
    icon: "tent",
    image: "/images/categories/tente-kheima.svg",
    providerCount: 14,
  },

  // ═══ 📋 Organisation ════════════════════════════════════════
  {
    id: "wedding-planner",
    name: "Wedding Planner",
    nameAr: "منظم حفلات",
    nameEn: "Wedding Planner",
    description: "Accompagnement personnalisé du premier clic jusqu'au jour J, coordination de tous les prestataires",
    icon: "clipboard-list",
    image: "/images/categories/wedding-planner.svg",
    providerCount: 18,
  },
  {
    id: "calligraphe",
    name: "Calligraphe",
    nameAr: "خطاط",
    nameEn: "Calligrapher",
    description: "Artistes calligraphes pour invitations, cartes de vœux et faire-part personnalisés",
    icon: "pen",
    image: "/images/categories/calligraphe.svg",
    providerCount: 10,
  },
  {
    id: "invitations-faire-part",
    name: "Invitations & Faire-part",
    nameAr: "دعوات و بطاقات",
    nameEn: "Invitations & Cards",
    description: "Créateurs de faire-part, invitations et cartes de remerciement, du traditionnel au moderne",
    icon: "mail",
    image: "/images/categories/invitations-faire-part.svg",
    providerCount: 16,
  },
];

// ─── Familles de catégories ───────────────────────────────────────
export const categoryGroups = [
  {
    name: "Lieu & Réception",
    nameAr: "المكان و الاستقبال",
    icon: "building2",
    categories: ["salle-des-fetes", "villa-domaine", "traiteur", "patisserie-traditionnelle", "wedding-cake", "decoration-salle", "fleuriste"],
  },
  {
    name: "Image & Souvenir",
    nameAr: "الصورة و الذكرى",
    icon: "camera",
    categories: ["photographe", "videaste", "drone", "photobooth"],
  },
  {
    name: "Musique & Ambiance",
    nameAr: "الموسيقى و الأجواء",
    icon: "music",
    categories: ["orchestre", "zorna-cortege", "dj-mariage", "chanteur", "animation-spectacle"],
  },
  {
    name: "Beauté & Style",
    nameAr: "الجمال و الأناقة",
    icon: "sparkles",
    categories: ["neggafa", "robe-mariee", "bijoux-traditionnels", "maquilleuse", "coiffeuse", "hammam", "henne-artiste"],
  },
  {
    name: "Transport & Logistique",
    nameAr: "النقل و اللوجستيك",
    icon: "car",
    categories: ["voiture-mariage", "caleche", "tente-kheima"],
  },
  {
    name: "Organisation",
    nameAr: "التنظيم",
    icon: "clipboard-list",
    categories: ["wedding-planner", "calligraphe", "invitations-faire-part"],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────
export function getCategoryByGroup(groupName: string): Category[] {
  const group = categoryGroups.find(g => g.name === groupName);
  if (!group) return [];
  return group.categories
    .map(id => categories.find(c => c.id === id))
    .filter((c): c is Category => c !== undefined);
}

export function getFeaturedCategories(): Category[] {
  // Les 8 catégories les plus emblématiques du mariage algérien
  const featured = ["neggafa", "traiteur", "salle-des-fetes", "photographe", "orchestre", "robe-mariee", "decoration-salle", "henne-artiste"];
  return featured
    .map(id => categories.find(c => c.id === id))
    .filter((c): c is Category => c !== undefined);
}
