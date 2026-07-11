#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════
 *   🏗️ LELLA — Générateur d'icônes SVG pour catégories
 *   Style : motifs géométriques algériens (zellige, arabesques)
 *   Couleurs : or (#C7A45D) sur ivoire (#FBF7F0)
 * ═══════════════════════════════════════════════════════════════
 */
const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(__dirname, "..", "public/images/categories");

function frame() {
  return `<rect x="20" y="20" width="360" height="260" rx="8" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="60" y1="275" x2="340" y2="275" stroke="#C7A45D" stroke-width="0.3" opacity="0.15"/>`;
}

function text(name) {
  return `<text x="200" y="250" text-anchor="middle" fill="#C7A45D" font-family="serif" font-size="13" opacity="0.5">${name}</text>`;
}

function makeSVG(inner, name) {
  return `<svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="400" height="300" fill="#FBF7F0"/>
<rect x="20" y="20" width="360" height="260" rx="8" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
${inner}
<line x1="60" y1="275" x2="340" y2="275" stroke="#C7A45D" stroke-width="0.3" opacity="0.15"/>
<text x="200" y="260" text-anchor="middle" fill="#C7A45D" font-family="serif" font-size="12" opacity="0.5">${name}</text>
</svg>`;
}

const categories = {
  // ─── 🏛️ Lieu & Réception ─────────────────────────────────
  "salle-des-fetes": {
    name: "Salle des Fêtes",
    svg: `<rect x="150" y="60" width="100" height="130" rx="3" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<path d="M130 90 L200 50 L270 90" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.4"/>
<line x1="170" y1="120" x2="170" y2="150" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="200" y1="120" x2="200" y2="150" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="230" y1="120" x2="230" y2="150" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<rect x="155" y="160" width="90" height="30" rx="2" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<circle cx="200" cy="195" r="3" fill="#C7A45D" opacity="0.2"/>`,
  },
  "villa-domaine": {
    name: "Villa & Domaine",
    svg: `<rect x="140" y="90" width="120" height="100" rx="3" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<path d="M120 130 L200 60 L280 130" fill="none" stroke="#C7A45D" stroke-width="1.2" opacity="0.5"/>
<rect x="165" y="140" width="30" height="50" rx="2" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<rect x="205" y="140" width="30" height="50" rx="2" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<polygon points="200,70 230,85 170,85" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<circle cx="200" cy="205" r="3" fill="#C7A45D" opacity="0.2"/>`,
  },
  "traiteur": {
    name: "Traiteur",
    svg: `<circle cx="200" cy="115" r="50" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<circle cx="200" cy="115" r="35" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<circle cx="200" cy="115" r="20" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.2"/>
<path d="M180 100 Q200 90 220 100" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="200" y1="165" x2="200" y2="185" stroke="#C7A45D" stroke-width="0.8" opacity="0.4"/>
<line x1="185" y1="185" x2="215" y2="185" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>`,
  },
  "patisserie-traditionnelle": {
    name: "Pâtisserie Traditionnelle",
    svg: `<polygon points="200,70 240,90 240,130 200,150 160,130 160,90" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<line x1="180" y1="95" x2="180" y2="125" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="200" y1="85" x2="200" y2="135" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="220" y1="95" x2="220" y2="125" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<circle cx="200" cy="110" r="4" fill="#C7A45D" opacity="0.2"/>
<circle cx="187" cy="108" r="2" fill="#C7A45D" opacity="0.15"/>
<circle cx="213" cy="108" r="2" fill="#C7A45D" opacity="0.15"/>`,
  },
  "wedding-cake": {
    name: "Wedding Cake",
    svg: `<rect x="150" y="130" width="100" height="45" rx="4" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<rect x="165" y="100" width="70" height="35" rx="3" fill="none" stroke="#C7A45D" stroke-width="0.8" opacity="0.4"/>
<rect x="180" y="75" width="40" height="28" rx="2" fill="none" stroke="#C7A45D" stroke-width="0.6" opacity="0.3"/>
<circle cx="200" cy="65" r="5" fill="#C7A45D" opacity="0.2"/>
<line x1="155" y1="152" x2="245" y2="152" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>`,
  },
  "decoration-salle": {
    name: "Décoration de Salle",
    svg: `<path d="M100 150 Q150 80 200 120 Q250 80 300 150" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<path d="M120 150 Q150 100 200 130 Q250 100 280 150" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<circle cx="200" cy="85" r="8" fill="none" stroke="#C7A45D" stroke-width="0.8" opacity="0.4"/>
<line x1="200" y1="77" x2="200" y2="93" stroke="#C7A45D" stroke-width="0.3" opacity="0.3"/>
<line x1="192" y1="85" x2="208" y2="85" stroke="#C7A45D" stroke-width="0.3" opacity="0.3"/>`,
  },
  "fleuriste": {
    name: "Fleuriste",
    svg: `<circle cx="200" cy="110" r="8" fill="#C7A45D" opacity="0.15"/>
<circle cx="180" cy="95" r="6" fill="#C7A45D" opacity="0.1"/>
<circle cx="220" cy="95" r="6" fill="#C7A45D" opacity="0.1"/>
<circle cx="175" cy="120" r="6" fill="#C7A45D" opacity="0.1"/>
<circle cx="225" cy="120" r="6" fill="#C7A45D" opacity="0.1"/>
<circle cx="200" cy="85" r="6" fill="#C7A45D" opacity="0.1"/>
<line x1="200" y1="118" x2="200" y2="150" stroke="#C7A45D" stroke-width="0.8" opacity="0.4"/>
<path d="M190 150 Q200 145 210 150" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>`,
  },

  // ─── 🎥 Image & Souvenir ──────────────────────────────────
  "photographe": {
    name: "Photographe",
    svg: `<rect x="140" y="80" width="120" height="90" rx="5" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<circle cx="200" cy="125" r="25" fill="none" stroke="#C7A45D" stroke-width="0.8" opacity="0.4"/>
<circle cx="200" cy="125" r="12" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<rect x="170" y="70" width="10" height="15" rx="2" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>`,
  },
  "videaste": {
    name: "Vidéaste",
    svg: `<rect x="130" y="90" width="120" height="80" rx="4" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<polygon points="175,105 175,155 215,130" fill="#C7A45D" opacity="0.2"/>
<circle cx="260" cy="110" r="15" fill="none" stroke="#C7A45D" stroke-width="0.8" opacity="0.4"/>`,
  },
  "drone": {
    name: "Drone",
    svg: `<line x1="140" y1="130" x2="260" y2="130" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<circle cx="160" cy="130" r="12" fill="none" stroke="#C7A45D" stroke-width="0.8" opacity="0.4"/>
<circle cx="240" cy="130" r="12" fill="none" stroke="#C7A45D" stroke-width="0.8" opacity="0.4"/>
<rect x="190" y="125" width="20" height="10" rx="3" fill="none" stroke="#C7A45D" stroke-width="0.6" opacity="0.4"/>
<circle cx="200" cy="150" r="5" fill="#C7A45D" opacity="0.2"/>
<line x1="160" y1="118" x2="150" y2="105" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="240" y1="118" x2="250" y2="105" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>`,
  },
  "photobooth": {
    name: "Photobooth",
    svg: `<rect x="140" y="80" width="120" height="100" rx="5" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<circle cx="200" cy="120" r="20" fill="none" stroke="#C7A45D" stroke-width="0.6" opacity="0.4"/>
<rect x="155" y="100" width="12" height="8" rx="1" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="160" y1="180" x2="240" y2="180" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<rect x="180" y="155" width="40" height="20" rx="2" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>`,
  },

  // ─── 🎶 Musique & Ambiance ────────────────────────────────
  "orchestre": {
    name: "Orchestre",
    svg: `<rect x="150" y="90" width="100" height="70" rx="4" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<line x1="160" y1="100" x2="160" y2="150" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="190" y1="100" x2="190" y2="150" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="220" y1="100" x2="220" y2="150" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="240" y1="100" x2="240" y2="150" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<path d="M155 90 Q175 75 195 90 Q215 75 235 90 Q245 85 250 90" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>`,
  },
  "zorna-cortege": {
    name: "Zorna & Cortège",
    svg: `<path d="M140 140 L180 110 L200 110 L240 140" fill="none" stroke="#C7A45D" stroke-width="1.2" opacity="0.5"/>
<line x1="160" y1="120" x2="160" y2="160" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="185" y1="115" x2="185" y2="160" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="210" y1="115" x2="210" y2="160" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="235" y1="120" x2="235" y2="160" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<path d="M130 150 Q160 170 200 155 Q240 140 270 150" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.2"/>`,
  },
  "dj-mariage": {
    name: "DJ Mariage",
    svg: `<rect x="160" y="90" width="80" height="60" rx="4" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<circle cx="185" cy="120" r="15" fill="none" stroke="#C7A45D" stroke-width="0.6" opacity="0.4"/>
<circle cx="215" cy="120" r="15" fill="none" stroke="#C7A45D" stroke-width="0.6" opacity="0.4"/>
<circle cx="185" cy="120" r="6" fill="#C7A45D" opacity="0.15"/>
<circle cx="215" cy="120" r="6" fill="#C7A45D" opacity="0.15"/>
<line x1="185" y1="150" x2="185" y2="165" stroke="#C7A45D" stroke-width="1" opacity="0.4"/>
<line x1="215" y1="150" x2="215" y2="165" stroke="#C7A45D" stroke-width="1" opacity="0.4"/>`,
  },
  "chanteur": {
    name: "Chanteur(se)",
    svg: `<circle cx="200" cy="100" r="15" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<path d="M185 115 Q200 125 215 115" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<path d="M190 120 L190 145 Q200 155 210 145 L210 120" fill="none" stroke="#C7A45D" stroke-width="0.8" opacity="0.4"/>
<path d="M170 135 Q155 120 145 130" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<path d="M230 135 Q245 120 255 130" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>`,
  },
  "animation-spectacle": {
    name: "Animation & Spectacles",
    svg: `<polygon points="200,70 215,95 240,90 225,110 245,130 220,125 200,145 180,125 155,130 175,110 160,90 185,95" fill="none" stroke="#C7A45D" stroke-width="0.8" opacity="0.5"/>
<circle cx="200" cy="105" r="8" fill="none" stroke="#C7A45D" stroke-width="0.6" opacity="0.4"/>
<line x1="200" y1="60" x2="200" y2="70" stroke="#C7A45D" stroke-width="0.5" opacity="0.2"/>
<line x1="200" y1="145" x2="200" y2="155" stroke="#C7A45D" stroke-width="0.5" opacity="0.2"/>`,
  },

  // ─── 👑 Beauté & Style ────────────────────────────────────
  "neggafa": {
    name: "Neggafa",
    svg: `<circle cx="200" cy="95" r="18" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<path d="M180 115 Q200 130 220 115" fill="none" stroke="#C7A45D" stroke-width="0.6" opacity="0.4"/>
<path d="M185 120 L185 155 Q200 165 215 155 L215 120" fill="none" stroke="#C7A45D" stroke-width="0.8" opacity="0.4"/>
<path d="M160 130 Q175 110 185 115" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<path d="M240 130 Q225 110 215 115" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<circle cx="200" cy="85" r="6" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.2"/>`,
  },
  "robe-mariee": {
    name: "Robe de Mariée",
    svg: `<path d="M175 150 L185 90 Q200 70 215 90 L225 150" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<path d="M170 150 Q200 175 230 150" fill="none" stroke="#C7A45D" stroke-width="0.8" opacity="0.4"/>
<line x1="185" y1="90" x2="185" y2="70" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="215" y1="90" x2="215" y2="70" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="200" y1="68" x2="200" y2="55" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<circle cx="200" cy="50" r="5" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.2"/>`,
  },
  "bijoux-traditionnels": {
    name: "Bijoux Traditionnels",
    svg: `<polygon points="200,70 220,85 220,115 200,130 180,115 180,85" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<circle cx="200" cy="100" r="10" fill="none" stroke="#C7A45D" stroke-width="0.6" opacity="0.4"/>
<circle cx="200" cy="100" r="4" fill="#C7A45D" opacity="0.15"/>
<circle cx="185" cy="85" r="3" fill="#C7A45D" opacity="0.12"/>
<circle cx="215" cy="85" r="3" fill="#C7A45D" opacity="0.12"/>
<circle cx="185" cy="115" r="3" fill="#C7A45D" opacity="0.12"/>
<circle cx="215" cy="115" r="3" fill="#C7A45D" opacity="0.12"/>`,
  },
  "maquilleuse": {
    name: "Maquilleuse",
    svg: `<circle cx="200" cy="100" r="20" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<circle cx="200" cy="95" r="8" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="200" y1="95" x2="200" y2="120" stroke="#C7A45D" stroke-width="0.3" opacity="0.2"/>
<path d="M180 100 Q185 90 195 95" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<rect x="150" y="125" width="100" height="6" rx="3" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<circle cx="200" cy="128" r="2" fill="#C7A45D" opacity="0.2"/>`,
  },
  "coiffeuse": {
    name: "Coiffeuse Mariée",
    svg: `<circle cx="200" cy="95" r="15" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<path d="M195 80 Q180 60 190 55 Q200 60 195 80" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<path d="M205 80 Q220 60 210 55 Q200 60 205 80" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<path d="M200 80 Q190 70 200 60 Q210 70 200 80" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<path d="M185 110 Q200 125 215 110" fill="none" stroke="#C7A45D" stroke-width="0.6" opacity="0.4"/>
<line x1="200" y1="110" x2="200" y2="140" stroke="#C7A45D" stroke-width="0.8" opacity="0.4"/>`,
  },
  "hammam": {
    name: "Hammam & Spa",
    svg: `<rect x="150" y="80" width="100" height="80" rx="30" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<path d="M160 100 Q170 90 180 100 Q190 110 200 100 Q210 90 220 100 Q230 110 240 100" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<path d="M160 115 Q170 105 180 115 Q190 125 200 115 Q210 105 220 115 Q230 125 240 115" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.2"/>
<line x1="200" y1="80" x2="200" y2="65" stroke="#C7A45D" stroke-width="0.8" opacity="0.4"/>
<path d="M190 65 Q200 58 210 65" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>`,
  },
  "henne-artiste": {
    name: "Henné Artiste",
    svg: `<circle cx="200" cy="110" r="30" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<circle cx="200" cy="110" r="18" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<circle cx="200" cy="110" r="8" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.2"/>
<circle cx="200" cy="110" r="3" fill="#C7A45D" opacity="0.2"/>
<line x1="200" y1="80" x2="200" y2="140" stroke="#C7A45D" stroke-width="0.3" opacity="0.15"/>
<line x1="170" y1="110" x2="230" y2="110" stroke="#C7A45D" stroke-width="0.3" opacity="0.15"/>`,
  },

  // ─── 🚗 Transport & Logistique ─────────────────────────────
  "voiture-mariage": {
    name: "Voiture de Mariage",
    svg: `<rect x="130" y="120" width="140" height="40" rx="8" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<path d="M150 120 L165 95 L200 95 L235 120" fill="none" stroke="#C7A45D" stroke-width="0.8" opacity="0.4"/>
<circle cx="155" cy="160" r="10" fill="none" stroke="#C7A45D" stroke-width="0.6" opacity="0.4"/>
<circle cx="245" cy="160" r="10" fill="none" stroke="#C7A45D" stroke-width="0.6" opacity="0.4"/>
<rect x="195" y="105" width="30" height="15" rx="2" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<circle cx="155" cy="160" r="4" fill="none" stroke="#C7A45D" stroke-width="0.4" opacity="0.2"/>
<circle cx="245" cy="160" r="4" fill="none" stroke="#C7A45D" stroke-width="0.4" opacity="0.2"/>`,
  },
  "caleche": {
    name: "Calèche & Entrée",
    svg: `<circle cx="160" cy="155" r="12" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<circle cx="240" cy="155" r="12" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<line x1="200" y1="140" x2="200" y2="105" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<rect x="170" y="105" width="60" height="40" rx="4" fill="none" stroke="#C7A45D" stroke-width="0.8" opacity="0.4"/>
<path d="M170 105 Q200 85 230 105" fill="none" stroke="#C7A45D" stroke-width="0.6" opacity="0.3"/>
<line x1="160" y1="135" x2="240" y2="135" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>`,
  },
  "tente-kheima": {
    name: "Tente & Kheima",
    svg: `<polygon points="120,150 200,60 280,150" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<line x1="145" y1="150" x2="200" y2="80" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="255" y1="150" x2="200" y2="80" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="170" y1="150" x2="200" y2="95" stroke="#C7A45D" stroke-width="0.5" opacity="0.2"/>
<line x1="230" y1="150" x2="200" y2="95" stroke="#C7A45D" stroke-width="0.5" opacity="0.2"/>
<line x1="120" y1="150" x2="280" y2="150" stroke="#C7A45D" stroke-width="0.8" opacity="0.4"/>
<path d="M140 140 Q200 160 260 140" fill="none" stroke="#C7A45D" stroke-width="0.3" opacity="0.2"/>`,
  },

  // ─── 📋 Organisation ──────────────────────────────────────
  "wedding-planner": {
    name: "Wedding Planner",
    svg: `<rect x="160" y="80" width="80" height="90" rx="4" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<line x1="175" y1="95" x2="225" y2="95" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="175" y1="105" x2="225" y2="105" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="175" y1="115" x2="225" y2="115" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="175" y1="125" x2="225" y2="125" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="175" y1="135" x2="225" y2="135" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="175" y1="145" x2="225" y2="145" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<line x1="180" y1="95" x2="180" y2="145" stroke="#C7A45D" stroke-width="0.3" opacity="0.2"/>
<circle cx="200" cy="65" r="5" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>`,
  },
  "calligraphe": {
    name: "Calligraphe",
    svg: `<path d="M140 140 Q180 70 200 90 Q220 110 180 120 Q200 95 220 100 Q240 110 260 140" fill="none" stroke="#C7A45D" stroke-width="1.2" opacity="0.5"/>
<circle cx="200" cy="155" r="3" fill="#C7A45D" opacity="0.15"/>
<path d="M160 130 Q180 75 200 90" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.2"/>
<path d="M240 130 Q220 75 200 90" fill="none" stroke="#C7A45D" stroke-width="0.5" opacity="0.2"/>`,
  },
  "invitations-faire-part": {
    name: "Invitations & Faire-part",
    svg: `<rect x="140" y="80" width="120" height="85" rx="3" fill="none" stroke="#C7A45D" stroke-width="1" opacity="0.5"/>
<line x1="155" y1="105" x2="245" y2="105" stroke="#C7A45D" stroke-width="0.4" opacity="0.3"/>
<line x1="155" y1="115" x2="245" y2="115" stroke="#C7A45D" stroke-width="0.4" opacity="0.3"/>
<line x1="155" y1="125" x2="245" y2="125" stroke="#C7A45D" stroke-width="0.4" opacity="0.3"/>
<line x1="155" y1="135" x2="245" y2="135" stroke="#C7A45D" stroke-width="0.4" opacity="0.3"/>
<path d="M200 80 L200 90" stroke="#C7A45D" stroke-width="0.5" opacity="0.3"/>
<circle cx="155" cy="95" r="4" fill="none" stroke="#C7A45D" stroke-width="0.4" opacity="0.2"/>`,
  },
};

// Génération
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

Object.entries(categories).forEach(([id, cat]) => {
  const svg = makeSVG(cat.svg, cat.name);
  const filePath = path.join(OUT_DIR, `${id}.svg`);
  fs.writeFileSync(filePath, svg, "utf8");
  console.log(`✅ ${id}.svg — ${cat.name}`);
});

console.log(`\n🎉 ${Object.keys(categories).length} SVGs générés dans ${OUT_DIR}`);
