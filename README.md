# 🏗️ LELLA — Marketplace Premium des Événements en Algérie

> *L'élégance de la tradition, la magie de votre célébration.*

LELLA est la première marketplace premium qui connecte les familles aux meilleurs prestataires d'événements en Algérie. Mariages, fiançailles, circoncisions, baptêmes — trouvez les professionnels passionnés pour chaque moment de votre célébration.

## ✨ Vision

Devenir LA référence incontournable des événements familiaux en Algérie, en offrant une expérience premium qui allie tradition et modernité.

## 🎯 Public cible

- **Primaire :** Futures mariées (25-35 ans, connectées, sensibles au design)
- **Secondaire :** Familles, prestataires, futurs mariés

## 🚀 Stack Technique

| Technologie | Utilisation |
|---|---|
| **Next.js 16** (App Router) | Framework frontend & APIs |
| **TypeScript** strict | Typage sécurisé |
| **Tailwind CSS v4** | Design system & styling |
| **Framer Motion** | Animations & transitions |
| **Zustand** | Gestion d'état légère |
| **Lucide React** | Icônes |
| **React Hook Form + Zod** | Formulaires |

### Prévisions Phase 2
- **Supabase** — Base de données, authentification, stockage
- **Vercel** — Déploiement
- **Stripe** — Paiements

## 📁 Structure du Projet

```
lella/
├── app/                    # Routes Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Layout racine (fonts, nav, footer)
│   ├── marketplace/       # Recherche & listing prestataires
│   ├── provider/[slug]/   # Page détail prestataire
│   ├── auth/              # Login / Signup
│   ├── dashboard/         # Tableaux de bord
│   └── notifications/     # Centre de notifications
├── components/
│   ├── ui/                # Design system atomique
│   ├── sections/          # Sections landing page
│   ├── layout/            # Navbar, Footer
│   ├── marketplace/       # Composants marketplace
│   └── dashboard/         # Sidebar & composants dashboard
├── lib/
│   ├── mock-data/         # Données simulées (Phase 1)
│   ├── data-access/       # Couche d'accès aux données (prête Supabase)
│   ├── utils/             # Utilitaires
│   └── i18n/              # Internationalisation FR/AR/EN
├── store/                 # Zustand stores
├── types/                 # Types & interfaces TypeScript
└── public/                # Assets statiques
```

## 🎨 Direction Artistique

| Élément | Choix |
|---|---|
| **Palette** | Ivoire `#FBF7F0`, Nuit `#1A1A2E`, Or subtil `#C7A45D`, Bordeaux `#8B1A2B`, Terracotta `#D4A574` |
| **Typographie** | Playfair Display (titres) + Inter (corps) |
| **Inspirations** | Apple × Dior × Airbnb × artisanat algérien |
| **Motifs** | Zellige subtil en SVG, utilisé avec parcimonie |

## 🏃‍♂️ Lancer le projet en local

```bash
# 1. Cloner le projet
git clone <votre-repo>
cd lella

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev

# 4. Ouvrir dans le navigateur
# http://localhost:3000
```

## 📦 Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm start` | Serveur de production |
| `npm run lint` | Vérification ESLint |

## 🔌 Architecture des données

Le projet utilise une **couche d'abstraction** (`lib/data-access/`) qui pour l'instant lit des données mockées, mais dont l'interface est conçue pour être remplacée par des appels Supabase sans modifier le reste de l'application.

```typescript
// Même signature, que ce soit du mock ou Supabase :
const providers = await getAllProviders();
const provider = await getProviderBySlug("palais-des-delices");
const categories = await getAllCategories();
```

## 📋 Pages & Fonctionnalités (Phase 1)

- [x] **Landing page premium** — Hero storytelling, sections animées, compteurs
- [x] **Marketplace** — Grille/listing prestataires, filtres, recherche, tri
- [x] **Détail prestataire** — Galerie, infos, services, avis, contact
- [x] **Dashboard client** — Réservations, devis, favoris
- [x] **Dashboard prestataire** — Statistiques, demandes, profil
- [x] **Dashboard admin** — Gestion plateforme, utilisateurs
- [x] **Authentification** — Login/Signup avec rôles (simulé)
- [x] **Notifications** — Centre de notifications
- [x] **i18n** — Structure FR/AR/EN prête
- [x] **Design system** — Composants réutilisables, thème cohérent
- [x] **RTL ready** — Architecture prête pour l'arabe
- [ ] **Supabase** — À connecter (Phase 2)
- [ ] **Déploiement Vercel** — À configurer (Phase 2)

## 🔜 Prochaines étapes

1. Connexion Supabase (base de données, auth, stockage)
2. Déploiement Vercel
3. Paiements Stripe
4. Système de messagerie temps réel
5. Application mobile
6. SEO & Performance optimisation

## ⚖️ Licence

Projet privé — Tous droits réservés.

---

<p align="center">
  Fait avec ✨ en Algérie 🇩🇿
</p>
