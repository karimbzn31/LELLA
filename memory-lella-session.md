---
name: projet-lella-25
description: "Projet LELLA 2.5 — Marketplace premium événements familiaux Algérie"
metadata:
  type: project
  updated: 2026-07-10
---

# 🏗️ LELLA 2.5 — Sauvegarde de session

## Dernière mise à jour : 10/07/2026

### ✅ Ce qui est construit

**Landing page (refonte visuelle complète)**
- Hero : photo sombre mariage `hero-dark-wedding.jpg`, titre "L'amour s'invite, la tradition s'illumine" avec texte doré lumineux, bande dorée latérale, stats en bas
- Section "L'Esprit LELLA" : split screen éditorial façon magazine (photo + manifeste)
- Comment ça marche : timeline horizontale avec connecteurs dorés
- Stats : compteurs animés avec barre hover
- Catégories : 6 grandes cards immersives sur fond navy en pleine hauteur
- Coups de cœur : 3 cards premium avec hover shadow
- Pourquoi LELLA : 3 features avec icônes, hover animations
- Témoignages : carousel avec auto-rotation, navigation dots
- CTA final : titre fort avec glow orbes

**12 pages fonctionnelles**
- Landing, Marketplace, Détail prestataire, Auth (login/signup), 3 Dashboards, Messagerie, Notifications

**Design system**
- Palette : ivoire (#FBF7F0), nuit (#1A1A2E), or (#C7A45D), bordeaux (#8B1A2B), terracotta (#D4A574)
- Typo : Playfair Display (titres) + Inter (corps)
- Text-gradient doré lumineux : #F5D97A → #C7A45D → #E8D5A3
- Composants : Button, Card, Badge, Input, StarRating, Counter...
- Animations Framer Motion

**Architecture**
- `lib/data-access/` prêt pour Supabase
- `lib/mock-data/` : 10 prestataires, 16 catégories, 8 avis
- `lib/i18n/` : FR/AR/EN structuré, RTL ready
- `types/` : interfaces TypeScript complètes

**Visuels**
- 16 SVG catégories
- `hero-bg.svg` (silhouette mariée algérienne)
- `amour-mariage.svg` (scène mariage avec cœurs)
- 7 photos Unsplash libres (hero, couple, mariée, détails, soirée)

### 📁 Emplacement
```
C:/Users/DELL/Desktop/Karim/AI/Jarvis Karim/lella/
```

### 🚀 Lancer
```bash
cd "C:/Users/DELL/Desktop/Karim/AI/Jarvis Karim/lella"
npm run dev
```
👉 http://localhost:3000

### 🔜 Prochaines étapes (à la demande)
- Brancher Supabase (DB + Auth)
- Déploiement Vercel
- Photos réelles prestataires
- Paiements Stripe
- Mode sombre
- Curseur personnalisé partout
- Loading animé logo LELLA
- Page confirmation devis avec confettis

### 📌 Note
Projet prêt à être déplacé vers son emplacement final.
