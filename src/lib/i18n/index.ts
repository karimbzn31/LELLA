// ═══════════════════════════════════════════════════════════════
//   🏗️ LELLA — i18n / Internationalisation
//   Structure prête pour FR / AR / EN
//   Actuel : FR par défaut + RTL ready pour l'arabe
// ═══════════════════════════════════════════════════════════════

export type Locale = "fr" | "ar" | "en";
export const defaultLocale: Locale = "fr";

export const locales: Locale[] = ["fr", "ar", "en"];

const dictionaries: Record<Locale, Record<string, string>> = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.marketplace": "Prestataires",
    "nav.categories": "Catégories",
    "nav.how-it-works": "Comment ça marche",
    "nav.signin": "Connexion",
    "nav.signup": "Inscription",
    "nav.dashboard": "Tableau de bord",
    "nav.favorites": "Favoris",
    "nav.messages": "Messages",
    "nav.notifications": "Notifications",
    "nav.profile": "Mon Profil",

    // Hero
    "hero.title": "L'élégance de la tradition,\nla magie de votre célébration",
    "hero.subtitle": "La première marketplace premium qui connecte les familles aux meilleurs prestataires d'événements en Algérie",
    "hero.cta": "Trouver un prestataire",
    "hero.cta2": "Devenir prestataire",

    // How it works
    "how.title": "Comment ça marche",
    "how.step1.title": "Choisissez votre prestataire",
    "how.step1.desc": "Parcourez notre sélection de prestataires vérifiés, filtrés par catégorie, ville et budget",
    "how.step2.title": "Demandez un devis",
    "how.step2.desc": "Contactez les prestataires qui vous intéressent et recevez des devis personnalisés",
    "how.step3.title": "Réservez en confiance",
    "how.step3.desc": "Confirmez votre réservation et suivez l'avancement de vos préparatifs",
    "how.step4.title": "Profitez de votre événement",
    "how.step4.desc": "Vivez votre célébration sereinement, on s'occupe de tout",

    // Features
    "features.title": "Pourquoi LELLA ?",
    "features.verified": "Prestataires vérifiés",
    "features.verified.desc": "Chaque prestataire est rigoureusement sélectionné pour vous garantir un service d'exception",
    "features.compare": "Comparez en un clic",
    "features.compare.desc": "Parcourez profils, avis et tarifs pour trouver le prestataire idéal",
    "features.support": "Accompagnement dédié",
    "features.support.desc": "Notre équipe vous accompagne de la réservation jusqu'au jour J",

    // Stats
    "stats.providers": "prestataires",
    "stats.events": "événements organisés",
    "stats.clients": "clients satisfaits",
    "stats.cities": "villes couvertes",

    // Categories section
    "categories.title": "Trouvez le prestataire idéal",
    "categories.subtitle": "Des professionnels passionnés pour chaque moment de votre célébration",
    "categories.cta": "Voir tout",

    // Featured
    "featured.title": "Nos coups de cœur",
    "featured.subtitle": "Des prestataires d'exception sélectionnés par notre équipe",

    // Testimonials
    "testimonials.title": "Elles nous ont fait confiance",
    "testimonials.subtitle": "Des centaines de mariées nous recommandent",

    // Marketplace
    "marketplace.title": "Trouvez votre prestataire",
    "marketplace.search": "Rechercher un prestataire...",
    "marketplace.filter": "Filtres",
    "marketplace.sort": "Trier par",
    "marketplace.sort.popularity": "Popularité",
    "marketplace.sort.price_asc": "Prix croissant",
    "marketplace.sort.price_desc": "Prix décroissant",
    "marketplace.sort.rating": "Note",
    "marketplace.clear": "Effacer les filtres",
    "marketplace.results": "résultats",
    "marketplace.from": "À partir de",
    "marketplace.verified": "Vérifié",
    "marketplace.featured": "Coup de cœur",

    // Provider detail
    "provider.about": "À propos",
    "provider.services": "Services",
    "provider.gallery": "Galerie",
    "provider.reviews": "Avis",
    "provider.availability": "Disponibilités",
    "provider.contact": "Contacter",
    "provider.quote": "Demander un devis",
    "provider.book": "Réserver",
    "provider.similar": "Prestataires similaires",
    "provider.location": "Zone d'intervention",

    // Dashboard
    "dashboard.overview": "Vue d'ensemble",
    "dashboard.my_bookings": "Mes réservations",
    "dashboard.my_quotes": "Mes devis",
    "dashboard.favorites": "Mes favoris",
    "dashboard.messages": "Messages",
    "dashboard.profile": "Mon profil",
    "dashboard.settings": "Paramètres",
    "dashboard.logout": "Déconnexion",

    // Auth
    "auth.login": "Connexion",
    "auth.signup": "Inscription",
    "auth.email": "Email",
    "auth.password": "Mot de passe",
    "auth.name": "Nom complet",
    "auth.client": "Je suis un client",
    "auth.provider": "Je suis un prestataire",
    "auth.no_account": "Pas encore de compte ?",
    "auth.has_account": "Déjà un compte ?",

    // Footer
    "footer.about": "À propos de LELLA",
    "footer.about.desc": "LELLA est la première marketplace premium dédiée aux événements familiaux en Algérie. Nous connectons les familles aux meilleurs prestataires pour des célébrations inoubliables.",
    "footer.legal": "Mentions légales",
    "footer.privacy": "Confidentialité",
    "footer.terms": "Conditions d'utilisation",
    "footer.contact": "Contact",
    "footer.newsletter": "Restez informé",
    "footer.newsletter.placeholder": "Votre email",
    "footer.newsletter.cta": "S'inscrire",
    "footer.copyright": "© 2026 LELLA. Tous droits réservés.",

    // Common
    "common.loading": "Chargement...",
    "common.error": "Une erreur est survenue",
    "common.retry": "Réessayer",
    "common.back": "Retour",
    "common.close": "Fermer",
    "common.menu": "Menu",
    "common.search": "Rechercher",
    "common.filter": "Filtrer",
    "common.sort": "Trier",
    "common.share": "Partager",
    "common.save": "Sauvegarder",
    "common.cancel": "Annuler",
    "common.confirm": "Confirmer",
    "common.see_more": "Voir plus",
    "common.see_less": "Voir moins",
  },
  en: {
    "nav.home": "Home",
    "nav.marketplace": "Providers",
    "nav.categories": "Categories",
    "nav.how-it-works": "How It Works",
    "nav.signin": "Sign In",
    "nav.signup": "Sign Up",
    "hero.title": "The Elegance of Tradition,\nthe Magic of Your Celebration",
    "hero.subtitle": "The first premium marketplace connecting families to the best event providers in Algeria",
    "hero.cta": "Find a Provider",
    "hero.cta2": "Become a Provider",
    "how.title": "How It Works",
    "marketplace.search": "Search for a provider...",
    "auth.login": "Sign In",
    "auth.signup": "Sign Up",
    "footer.copyright": "© 2026 LELLA. All rights reserved.",
    "common.loading": "Loading...",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.marketplace": "مزودي الخدمات",
    "nav.categories": "التصنيفات",
    "nav.signin": "تسجيل الدخول",
    "nav.signup": "إنشاء حساب",
    "hero.title": "أناقة التقاليد،\nسحر احتفالك",
    "hero.subtitle": "أول سوق راقٍ يربط العائلات بأفضل مزودي خدمات المناسبات في الجزائر",
    "hero.cta": "ابحث عن مزود خدمة",
    "hero.cta2": "كن مزود خدمة",
    "how.title": "كيف يعمل",
    "marketplace.search": "ابحث عن مزود خدمة...",
    "auth.login": "تسجيل الدخول",
    "auth.signup": "إنشاء حساب",
    "footer.copyright": "© 2026 ليلى. جميع الحقوق محفوظة.",
    "common.loading": "جار التحميل...",
  },
};

export function getDictionary(locale: Locale = defaultLocale): Record<string, string> {
  return { ...dictionaries.fr, ...dictionaries[locale] };
}

export function useTranslation(locale: Locale = defaultLocale) {
  const dict = getDictionary(locale);
  return {
    t: (key: string): string => dict[key] || key,
    locale,
    dir: locale === "ar" ? "rtl" : "ltr" as "rtl" | "ltr",
  };
}
