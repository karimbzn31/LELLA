#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════
 *   🏗️ LELLA — Générateur de données prestataires
 *   Génère 100+ prestataires réalistes pour le marché algérien
 * ═══════════════════════════════════════════════════════════════
 */
const fs = require("fs");
const path = require("path");

// ─── Reviewers ────────────────────────────────────────────────
const REVIEWER_NAMES = [
  "Ines M.", "Amina K.", "Sarah B.", "Lina D.", "Yasmine R.",
  "Nadia T.", "Fatima Z.", "Meriem H.", "Sofia L.", "Dounia K.",
  "Hana B.", "Rania S.", "Lydia M.", "Assia N.", "Warda D.",
  "Dalila R.", "Samyah T.", "Kenza A.", "Malika S.", "Yasmina F.",
  "Nabila O.", "Farida H.", "Souad B.", "Nacera L.", "Zahia M.",
];

const REVIEW_COMMENTS = [
  "Service exceptionnel ! Tout etait parfait, je recommande vivement.",
  "Tres professionnel. A l ecoute de nos besoins, resultat superbe.",
  "Equipe formidable qui a rendu notre journee inoubliable. Merci !",
  "Rapport qualite-prix excellent. Travail soigne et dans les temps.",
  "Ravie de notre choix. Professionnalisme et qualite au rendez-vous.",
  "Tres belle prestation. Petits details a ameliorer mais satisfaite.",
  "Merci pour votre disponibilite et patience, vous avez comprend nos envies.",
  "Experience merveilleuse ! Tout le monde a ete impressionne.",
  "Professionnel, ponctuel, d une grande gentillesse. Je recommande.",
  "Resultat magnifique ! Merci pour ce mariage parfait.",
  "Excellent travail, tres professionnel. Notre famille conquise.",
  "Merci infiniment pour votre travail exceptionnel.",
  "Grand merci pour votre professionnalisme et votre creativite.",
  "Service impeccable, equipe sympathique. Tout parfaitement organise.",
  "Nous recommandons sans hesitation. Seriex et qualite au rendez-vous.",
];

// ─── Wilayas ──────────────────────────────────────────────────
const WILAYAS = [
  { wilaya: "Alger", communes: ["Hydra", "El Biar", "Bouzareah", "Cheraga", "Bab Ezzouar", "Kouba", "Birkhadem", "Sidi Fredj", "Ben Aknoun", "Dely Ibrahim"] },
  { wilaya: "Oran", communes: ["Oran Centre", "Canastel", "Es Senia", "Mers El Kebir", "Gdyel", "Bir El Djir"] },
  { wilaya: "Constantine", communes: ["Constantine Centre", "Didouche Mourad", "El Khroub", "Zighoud Youcef", "Ain Smara"] },
  { wilaya: "Tlemcen", communes: ["Tlemcen Centre", "Mansourah", "Chetouane", "Remchi"] },
  { wilaya: "Annaba", communes: ["Annaba Centre", "El Bouni", "Sidi Amar", "Berrehal"] },
  { wilaya: "Setif", communes: ["Setif Centre", "El Eulma", "Ain Oulmene", "Bougaa"] },
  { wilaya: "Blida", communes: ["Blida Centre", "Beni Tamou", "Ouled Yaich", "Boufarik"] },
  { wilaya: "Bejaia", communes: ["Bejaia Centre", "Tichy", "Akbou", "Kherrata"] },
  { wilaya: "Tizi Ouzou", communes: ["Tizi Ouzou Centre", "Draa Ben Khedda", "Boghni", "Azazga"] },
  { wilaya: "Tipaza", communes: ["Tipaza Centre", "Chenoua", "Douaouda", "Kolea"] },
];

// ─── Helper functions ─────────────────────────────────────────
function getServices(category) {
  const map = {
    "salle-des-fetes": ["Salle climatisée", "Sonorisation", "Eclairage", "Parking VIP", "Cuisine integree", "Espace enfants", "Jardin"],
    "traiteur": ["Menu degustation", "Traiteur complet", "Service a table", "Buffet", "Bar a jus", "Patisserie", "Service traiteur"],
    "neggafa": ["5 tenues traditionnelles", "Coiffure mariee", "Maquillage", "Habillage", "Accessoires", "Essayage", "Accompagnement"],
    "photographe": ["Reportage mariage", "Seance engagement", "Album luxe", "Shooting pre-mariage", "Livraison numerique", "Drone"],
    "orchestre": ["Orchestre complet", "Sonorisation", "Eclairage", "DJ", "Animation", "Repetitions"],
    "robe-mariee": ["Robes sur-mesure", "Retouches", "Location", "Accessoires", "Voiles", "Conseils"],
    "videaste": ["Film mariage", "Teaser", "Clip", "Drone", "Montage", "Livraison HD"],
    "dj-mariage": ["Animation DJ", "Sonorisation", "Eclairage laser", "Playlist personnalisee", "Micro"],
    "decoration-salle": ["Decoration complete", "Compositions florales", "Drapes", "Eclairage", "Mobilier", "Coordination"],
    "hammam": ["Gommage", "Savon noir", "Massage", "Soin visage", "Ghassoul", "Huiles essentielles"],
    "henne-artiste": ["Henne mariage", "Motifs traditionnels", "Motifs modernes", "Soins mains/pieds"],
    "maquilleuse": ["Maquillage mariee", "Maquillage invitees", "Essai", "Soin visage", "Deplacement"],
    "coiffeuse": ["Coiffure mariee", "Chignon", "Tresses", "Accessoires", "Essai", "Extension"],
    "bijoux-traditionnels": ["Location parure", "Bijoux or", "Bijoux argent", "Conseils", "Livraison"],
    "voiture-mariage": ["Voiture luxe", "Chauffeur", "Decoration", "Cortege", "Location journee"],
    "wedding-planner": ["Organisation complete", "Coordination", "Budget", "Selection prestataires", "Planning"],
    "fleuriste": ["Bouquet mariee", "Centre de table", "Arche fleurie", "Composition", "Livraison"],
    "patisserie-traditionnelle": ["Buffet patisserie", "Cornes de gazelle", "Baklawa", "Makrout", "Tamina", "Tcharek"],
    "wedding-cake": ["Gateau mariage", "Piece montee", "Degustation", "Livraison", "Decoration"],
    "invitations-faire-part": ["Faire-part", "Invitations", "Design", "Impression", "Enveloppes"],
    "calligraphe": ["Calligraphie", "Invitations", "Marque-places", "Tableau", "Cartes"],
    "animation-spectacle": ["Spectacle", "Danse", "Animation", "Show", "Artistes", "Coordination"],
    "drone": ["Prise de vue aerienne", "Photo drone", "Video drone", "Montage"],
    "photobooth": ["Cabine photo", "Impressions", "Accessoires", "Album", "Livre d or"],
    "zorna-cortege": ["Zorna", "Tambour", "Cortege", "Musique entree", "Ceremonie"],
    "chanteur": ["Prestation live", "Repertoire varie", "Sonorisation", "Repetition"],
    "caleche": ["Caleche decoree", "Cheval pare", "Cocher", "Cortege", "Entree"],
    "tente-kheima": ["Tente", "Kheima", "Installation", "Climatisation", "Eclairage"],
  };
  return map[category] || ["Prestation de qualite", "Service professionnel"];
}

function getTags(category) {
  const map = {
    "salle-des-fetes": ["salle mariage", "reception", "prestige", "grande capacite", "climatisation", "parking"],
    "traiteur": ["traiteur", "cuisine algerienne", "gastronomie", "halal", "tradition", "buffet"],
    "neggafa": ["neggafa", "mariee", "tradition", "tenues", "karakou", "chedda"],
    "photographe": ["photographie", "mariage", "album", "portrait", "reportage", "drone"],
    "orchestre": ["orchestre", "chaabi", "musique", "mariage", "andalou", "soiree"],
    "robe-mariee": ["robe mariee", "sur-mesure", "location", "tradition", "creatrice", "dentelle"],
    "videaste": ["video", "mariage", "film", "cinematique", "drone", "montage"],
    "dj-mariage": ["dj", "musique", "mariage", "soiree", "animation", "sonorisation"],
    "decoration-salle": ["decoration", "salle", "mariage", "fleurs", "eclairage", "theme"],
    "hammam": ["hammam", "spa", "mariee", "soins", "beaute", "relaxation"],
    "henne-artiste": ["henne", "tradition", "art", "mariee", "motifs", "ceremonie"],
    "maquilleuse": ["maquillage", "mariee", "beaute", "professionnel", "teint", "soiree"],
    "coiffeuse": ["coiffure", "mariee", "chignon", "tresse", "accessoires", "beaute"],
    "bijoux-traditionnels": ["bijoux", "tradition", "or", "argent", "parure", "mariee"],
    "voiture-mariage": ["voiture", "luxe", "cortege", "mariage", "location", "chauffeur"],
    "wedding-planner": ["organisation", "mariage", "planning", "coordination", "prestataires", "budget"],
    "fleuriste": ["fleurs", "bouquet", "mariee", "composition", "decoration", "centre de table"],
    "patisserie-traditionnelle": ["patisserie", "tradition", "algerien", "cornes de gazelle", "baklawa", "makrout"],
    "wedding-cake": ["gateau", "mariage", "piece montee", "patisserie", "design", "sur-mesure"],
    "invitations-faire-part": ["faire-part", "invitations", "mariage", "papier", "creation", "personnalise"],
    "calligraphe": ["calligraphie", "arabe", "art", "invitations", "creation", "personnalise"],
    "animation-spectacle": ["animation", "spectacle", "mariage", "danse", "artistes", "show"],
    "drone": ["drone", "aerien", "video", "photo", "mariage", "survol"],
    "photobooth": ["photobooth", "cabine photo", "mariage", "animation", "souvenirs", "fun"],
    "zorna-cortege": ["zorna", "cortege", "tradition", "musique", "entree", "ceremonie"],
    "chanteur": ["chanteur", "live", "mariage", "musique", "ambiance", "concert"],
    "caleche": ["caleche", "cheval", "entree", "mariage", "tradition", "luxe"],
    "tente-kheima": ["tente", "kheima", "exterieur", "mariage", "tradition", "saharien"],
  };
  return map[category] || ["mariage", "prestation", "algerie"];
}

// ─── Provider names by category ───────────────────────────────
const PROVIDER_NAMES = {
  "salle-des-fetes": [
    { name: "L Ecrin d Alger", desc: "Salle de reception prestigieuse avec vue panoramique sur la baie d Alger. Capacite jusqu a 600 invites.", longDesc: "Nichee sur les hauteurs d Alger, L Ecrin d Alger offre un cadre somptueux avec une vue imprenable sur la Mediterranee. Notre salle principale, ornee de lustres en cristal et de mosaiques traditionnelles, peut accueillir jusqu a 600 convives." },
    { name: "Dar Ed-Dhiaf", desc: "Palace traditionnel algerien alliant authenticite et modernite.", longDesc: "Dar Ed-Dhiaf est un veritable palace aux accents traditionnels. Chaque detail, des zelliges faits main aux plafonds en bois sculpte, raconte l histoire de l artisanat algerien." },
    { name: "Palais El Bahia", desc: "Le luxe discret d un palais mauresque au c ur d Alger.", longDesc: "Palais El Bahia est un havre de paix ou l architecture mauresque rencontre le luxe contemporain. Les fontaines dansent dans les patios fleuris." },
    { name: "Le Grand Salon", desc: "Salle modulable haut de gamme, equipee des dernieres technologies.", longDesc: "Le Grand Salon est le lieu ideal pour les couples modernes. Notre systeme d eclairage scenique permet de creer l ambiance de vos reves." },
    { name: "El Mouradi Palace", desc: "Complexe de reception 5 etoiles avec salle, jardin et espaces VIP.", longDesc: "El Mouradi Palace est un complexe de reception complet avec salle principale de 700m2, jardin paysager de 2000m2, espaces VIP." },
    { name: "Jardin d Orient", desc: "Espace verdoyant avec salle vitree donnant sur un jardin.", longDesc: "Le Jardin d Orient offre un cadre bucolique unique. Notre salle vitree donne sur un jardin a la francaise avec fontaines." },
    { name: "Palais des Mille et Une Nuits", desc: "Salle a theme oriental avec decoration somptueuse.", longDesc: "Plongez dans l univers des Mille et Une Nuits. Mosaiques, tissus precieux, jeux de lumiere : chaque element vous transporte." },
    { name: "Diamant d Alger", desc: "Salle de reception contemporaine avec design epure.", longDesc: "Le Diamant d Alger est le choix des couples qui recherchent un design epure et contemporain." },
    { name: "Villa des Pins", desc: "Villa d exception avec piscine et pinede pour 300 invites.", longDesc: "La Villa des Pins est une propriete d exception nichee dans une pinede centenaire." },
    { name: "Safir Palace", desc: "Complexe hotelier avec salle et hebergement pour invites.", longDesc: "Safir Palace est le complexe ideal pour un mariage cle en main." },
  ],
  "traiteur": [
    { name: "Palais d Orient", desc: "Traiteur de luxe specialise dans la cuisine algerienne traditionnelle.", longDesc: "Depuis 20 ans, le Palais d Orient regale les plus beaux mariages d Algerie. Notre chef sublime les saveurs du terroir." },
    { name: "Les Delices d Alger", desc: "Cuisine raffinee alliant tradition algerienne et gastronomie.", longDesc: "Les Delices d Alger, c est la rencontre entre la tradition culinaire algerienne et les techniques gastronomiques modernes." },
    { name: "Saveurs du Maghreb", desc: "Specialiste des plats traditionnels maghrebins.", longDesc: "Saveurs du Maghreb vous fait voyager a travers les saveurs de toute la region." },
    { name: "Le Jardin des Saveurs", desc: "Traiteur vegetarien et healthy, options traditionnelles revisitees.", longDesc: "Le Jardin des Saveurs propose une cuisine vegetarienne sans sacrifier les saveurs de la tradition." },
    { name: "Dar El Othmani", desc: "Traiteur familial transmis de generation en generation.", longDesc: "Dar El Othmani perpetue depuis 1950 les recettes familiales transmises de mere en fille." },
    { name: "Faste et Saveurs", desc: "Traiteur haut de gamme pour receptions de prestige.", longDesc: "Faste et Saveurs est le traiteur des grandes occasions. Menu degustation en 5 services." },
    { name: "Couscous Royal", desc: "Specialiste du couscous sous toutes ses formes.", longDesc: "Chez Couscous Royal, le couscous est un art. Plus de 15 varietes de ce plat emblematique." },
    { name: "Traiteur El Djazair", desc: "Cuisine algerienne moderne avec produits locaux de saison.", longDesc: "El Djazair mise sur les produits locaux et de saison pour une cuisine fraiche et savoureuse." },
    { name: "Mille et Un Plats", desc: "Service traiteur complet du dinatoire au repas assis.", longDesc: "Mille et Un Plats propose un service traiteur cle en main avec des stations de cuisine live." },
    { name: "Saveurs du Sud", desc: "Specialites culinaires du sud algerien. Mechoui, pain des sables.", longDesc: "Saveurs du Sud vous fait decouvrir les richesses culinaires du grand sud algerien." },
  ],
  "neggafa": [
    { name: "Nour El Hayat", desc: "Neggafa de renom depuis 15 ans, experte en tenues traditionnelles.", longDesc: "Avec 15 ans d experience, Nour El Hayat accompagne plus de 500 mariees. Elle maitrise l art des tenues traditionnelles." },
    { name: "Henne et Soie", desc: "Neggafa specialisee dans les styles regionaux : algierois, oranais, kabyle.", longDesc: "Henne et Soie est specialisee dans les styles regionaux algeriens avec des broderies et bijoux authentiques." },
    { name: "L Art de la Mariee", desc: "Studio de neggafa complet : maquillage, coiffure, habillage.", longDesc: "L Art de la Mariee est un studio complet dedie a la beaute de la mariee." },
    { name: "Tradition et Modernite", desc: "Neggafa mariant traditions seculaires et tendances contemporaines.", longDesc: "Tradition et Modernite est la neggafa des mariees qui veulent le meilleur des deux mondes." },
    { name: "Perle d Orient", desc: "Neggafa de luxe avec selection de tenues de createurs.", longDesc: "Perle d Orient collabore avec les plus grands createurs de tenues traditionnelles algeriennes." },
    { name: "Mille Fleurs", desc: "Specialiste des mariages kabyles et chaouis.", longDesc: "Mille Fleurs est la specialiste des traditions kabyles et chaouies." },
    { name: "Dar Ennegafa", desc: "Institut de beaute avec salon prive pour la mariee.", longDesc: "Dar Ennegafa est un institut complet dedie a la mariee et a sa cour." },
    { name: "Or et Soie", desc: "Neggafa specialisee dans les tenues haut de gamme.", longDesc: "Or et Soie est la neggafa des mariees qui veulent briller avec des bijoux en or." },
    { name: "Nouara", desc: "Jeune neggafa au style frais et moderne.", longDesc: "Nouara est la neggafa des jeunes mariees qui veulent un look frais et tendance." },
    { name: "Lalla Maghnia", desc: "Neggafa traditionnelle avec 30 ans d experience.", longDesc: "Lalla Maghnia est une institution dans le monde de la neggafa algerienne." },
  ],
  "photographe": [
    { name: "Studio Lumieres d Alger", desc: "Photographe de mariage prime, reportages emotionnels.", longDesc: "Studio Lumieres d Alger capture l emotion de votre journee avec un il d artiste." },
    { name: "Capture et Memoire", desc: "Photographie traditionnelle et contemporaine. Albums luxe.", longDesc: "Capture et Memoire vous offre des souvenirs intemporels avec des albums en cuir fait main." },
    { name: "Lens d Orient", desc: "Specialiste des mariages orientaux et tenues traditionnelles.", longDesc: "Lens d Orient sait mettre en valeur les tenues traditionnelles et les bijoux en or." },
    { name: "Focus Algerie", desc: "Studio complet : shooting pre-mariage et reportage.", longDesc: "Focus Algerie propose une experience photographique complete de la seance d essai au reportage." },
    { name: "Memoire d Instant", desc: "Photographe documentaire capturant l authenticite.", longDesc: "Memoire d Instant pratique une photographie documentaire non intrusive." },
    { name: "Diamant Photo", desc: "Photographie luxe avec album dore a l or fin.", longDesc: "Diamant Photo vous propose des albums dore a l or fin 24 carats." },
    { name: "Sana Photo", desc: "Photographe femme specialiste des portraits de mariee.", longDesc: "Sana Photo est photographe femme pour une proximite unique avec la mariee." },
    { name: "Reflets d Eternite", desc: "Photo et video combinees : un seul prestataire.", longDesc: "Reflets d Eternite propose un service combine photo et video." },
    { name: "Nuit d Orient", desc: "Specialiste de la photographie en basse lumiere.", longDesc: "Nuit d Orient maitrise la photo en basse lumiere pour des soirees spectaculaires." },
    { name: "Art et Image", desc: "Studio creatif avec direction artistique editorial.", longDesc: "Art et Image aborde chaque mariage comme un editorial de magazine." },
  ],
  "orchestre": [
    { name: "Chaabi d Or", desc: "Orchestre specialise dans le chaabi algerois authentique.", longDesc: "Chaabi d Or est l orchestre de reference pour le chaabi algerois. 12 musiciens sur scene." },
    { name: "Les Cordes Algeriennes", desc: "Orchestre symphonique : musique andalouse, chaabi et varites.", longDesc: "Les Cordes Algeriennes est un orchestre de 25 musiciens classiques." },
    { name: "Rythmes du Maghreb", desc: "Groupe traditionnel mellant chaabi, staifi et mezoued.", longDesc: "Rythmes du Maghreb est le groupe des grandes occasions." },
    { name: "Harmonie d Orient", desc: "Orchestre polyvalent : andalou, chaabi, moderne.", longDesc: "Harmonie d Orient s adapte a tous les moments de votre mariage." },
    { name: "Groupe El Djazair", desc: "Formation de 7 musiciens couvrant tous les styles.", longDesc: "El Djazair est la formation ideale pour les mariages de taille moyenne." },
    { name: "Nuits d Orient", desc: "Orchestre-spectacle avec show laser et ecrans geants.", longDesc: "Nuits d Orient est un spectacle complet avec show laser." },
    { name: "Takht Andalous", desc: "Formation de musique andalouse authentique.", longDesc: "Takht Andalous est le gardien de la tradition musicale andalouse algerienne." },
    { name: "Melodies du Sud", desc: "Groupe specialise dans la musique touaregue.", longDesc: "Melodies du Sud propose une experience musicale unique." },
    { name: "Fusion d Alger", desc: "DJ set et orchestre : fusion live et mix electronique.", longDesc: "Fusion d Alger est le pionnier du live-mixing en Algerie." },
    { name: "Orchestre El Bahdja", desc: "8 musiciens, chanteuse et danseuse orientale.", longDesc: "El Bahdja est l orchestre qui a l ambiance dans le sang." },
  ],
  "robe-mariee": [
    { name: "Soie et Dentelle", desc: "Creatrice de robes sur-mesure brodees main.", longDesc: "Soie et Dentelle cree des robes qui racontent une histoire avec des fils d or." },
    { name: "Chedda d Or", desc: "Specialiste de la chedda constantinoise.", longDesc: "Chedda d Or est la reference pour la chedda constantinoise." },
    { name: "Karim Couture", desc: "Createur de karakou algerois et gandoura.", longDesc: "Karim Couture perpetue l art du karakou algerois depuis 40 ans." },
    { name: "Reve de Mariee", desc: "Boutique de robes modernes et tenues de fiancailles.", longDesc: "Reve de Mariee est la boutique des mariees modernes." },
    { name: "Artisanat Kabyle", desc: "Specialiste de la robe kabyle traditionnelle.", longDesc: "Artisanat Kabyle valorise le patrimoine vestimentaire kabyle." },
    { name: "Mille et Une Robes", desc: "Showroom de 300 robes en location et vente.", longDesc: "Mille et Une Robes propose plus de 300 robes en showroom." },
    { name: "Dentelle d Orient", desc: "Creatrice de voiles et accessoires brodes main.", longDesc: "Dentelle d Orient est specialisee dans les accessoires de mariee." },
    { name: "La Mariee Moderne", desc: "Tenues contemporaines pour la mariee et son cortege.", longDesc: "La Mariee Moderne propose des tenues contemporaines coordonnees." },
    { name: "Gandoura El Djazair", desc: "Createur de gandouras traditionnelles et modernes.", longDesc: "Gandoura El Djazair est le specialiste de la gandoura." },
    { name: "Tizi Robes", desc: "Creatrice algerienne contemporaine inspiree du patrimoine.", longDesc: "Tizi Robes revisite le patrimoine vestimentaire avec un regard contemporain." },
  ],
  "dj-mariage": [
    { name: "DJ Karim Beats", desc: "DJ specialise dans les mariages. Mix chaabi, rai, electro.", longDesc: "DJ Karim Beats met le feu a vos soirees depuis 15 ans !" },
    { name: "DJ Sarah Mix", desc: "DJ femme pour mariage, mix sophistique et elegant.", longDesc: "DJ Sarah Mix apporte une touche d elegance a votre soiree." },
    { name: "Night Fever", desc: "Sonorisation et animation DJ avec laser et fume.", longDesc: "Night Fever propose des prestations DJ completes." },
    { name: "DJ Oran Style", desc: "Specialiste du rai et de la musique oranaise.", longDesc: "DJ Oran Style est le specialiste du rai." },
    { name: "Mix and Co", desc: "Duo de DJ pour une ambiance continue sans coupure.", longDesc: "Mix and Co c est l innovation d un duo de DJ." },
  ],
  "videaste": [
    { name: "Studio Cinematique", desc: "Realisations de films de mariage facon cinema.", longDesc: "Studio Cinematique realise des films dignes du grand ecran." },
    { name: "Memoire en Film", desc: "Videaste du reportage au clip personnalise.", longDesc: "Memoire en Film capture votre journee avec un regard artistique." },
    { name: "Wedding Stories DZ", desc: "Creation de contenu mariage : film, photos, reseaux.", longDesc: "Wedding Stories DZ cree du contenu pour vos reseaux sociaux." },
    { name: "Vision d Alger", desc: "Realisateur prime. Style documentaire.", longDesc: "Vision d Alger a remporte le prix du meilleur film de mariage 2025." },
    { name: "Drone and Films DZ", desc: "Captation aerienne par drone et video classique.", longDesc: "Specialiste des prises de vue aeriennes par drone." },
  ],
  "decoration-salle": [
    { name: "Deco Mirage", desc: "Studio de decoration evenementielle haut de gamme.", longDesc: "Deco Mirage cree des ambiances uniques pour votre mariage." },
    { name: "Fleurs d Orient", desc: "Decoration florale : bouquet, centre de table, arche.", longDesc: "Fleurs d Orient est le specialiste de la decoration florale." },
    { name: "Art Deco DZ", desc: "Decorateur d interieur specialise dans les receptions.", longDesc: "Art Deco DZ transforme votre salle en un lieu magique." },
    { name: "Lumiere et Decor", desc: "Specialiste de l eclairage scenique.", longDesc: "Lumiere et Decor est le specialiste de l eclairage evenementiel." },
    { name: "Deco Tradition", desc: "Decoration traditionnelle algerienne theme zellige.", longDesc: "Deco Tradition est specialisee dans la decoration traditionnelle." },
  ],
  "hammam": [
    { name: "Hammam El Bahdja", desc: "Institut de beaute et hammam traditionnel.", longDesc: "Hammam El Bahdja propose des forfaits speciaux pour la mariee." },
    { name: "Orient Spa", desc: "Spa de luxe pour preparatifs de mariage.", longDesc: "Orient Spa offre une experience de spa luxueuse." },
    { name: "Hammam Lalla Maghnia", desc: "Hammam feminin traditionnel. Soins ancestraux.", longDesc: "Hammam Lalla Maghnia perpetue les soins ancestraux." },
    { name: "Spa Oranais", desc: "Institut complet : hammam, soins, massage, coiffure.", longDesc: "Spa Oranais est l institut complet pour votre preparation." },
    { name: "Bain d Orient", desc: "Hammam prive avec salles VIP pour groupes.", longDesc: "Bain d Orient propose des formules privatisees pour groupes." },
  ],
  "henne-artiste": [
    { name: "Henne d Orient", desc: "Artiste du henne aux motifs traditionnels algeriens.", longDesc: "Henne d Orient cree des motifs de henne traditionnels algeriens." },
    { name: "Mains de Fee", desc: "Artiste henne pour mariage, motifs personnalises.", longDesc: "Mains de Fee est specialisee dans le henne artistique." },
    { name: "Henne Chic", desc: "Henne moderne aux motifs geometriques contemporains.", longDesc: "Henne Chic revisite l art du henne avec des motifs contemporains." },
    { name: "Tradition et Henne", desc: "Atelier de henne avec ceremonie complete.", longDesc: "Tradition et Henne organise la ceremonie complete avec animations." },
    { name: "Nour et Henne", desc: "Artiste henne professionnelle, 10 ans d experience.", longDesc: "Nour et Henne se deplace dans toute l Algerie." },
  ],
  "maquilleuse": [
    { name: "Glow and Beauty", desc: "Maquilleuse specialisee dans le maquillage de mariee.", longDesc: "Glow and Beauty cree des maquillages de mariee sur mesure." },
    { name: "Noura Makeup", desc: "Maquilleuse a domicile pour la mariee et ses invitees.", longDesc: "Noura Makeup se deplace chez vous ou a la salle." },
    { name: "Paris Beauty DZ", desc: "Maquillage editorial facon francaise.", longDesc: "Paris Beauty DZ apporte le savoir-faire parisien." },
    { name: "Rouge et Pinceaux", desc: "Atelier maquillage et cours d auto-maquillage.", longDesc: "Rouge et Pinceaux propose des cours d auto-maquillage." },
    { name: "Fatma Makeup", desc: "Maquilleuse traditionnelle kabyle.", longDesc: "Fatma Makeup est specialisee dans le maquillage traditionnel kabyle." },
  ],
  "coiffeuse": [
    { name: "Coiffure et Tresse", desc: "Coiffeuse specialisee dans les coiffures de mariee.", longDesc: "Coiffure et Tresse est experte en chignons tresses et accessoires." },
    { name: "Hair by DZ", desc: "Salon de coiffure pour mariee.", longDesc: "Hair by DZ propose un service complet pour la mariee." },
    { name: "Mariee Coiffure", desc: "Coiffeuse a domicile. Forfait mariee et 4 invitees.", longDesc: "Mariee Coiffure se deplace a votre domicile." },
    { name: "Accessoires et Coiffure", desc: "Creatrice d accessoires pour cheveux.", longDesc: "Accessoires et Coiffure cree des accessoires sur mesure." },
  ],
  "bijoux-traditionnels": [
    { name: "Or et Tradition", desc: "Bijouterie specialisee dans les parures de mariee.", longDesc: "Or et Tradition propose des parures de mariee exceptionnelles." },
    { name: "Parures d Algerie", desc: "Location de bijoux traditionnels haute qualite.", longDesc: "Parures d Algerie loue des bijoux traditionnels certifies or 18 carats." },
    { name: "Bijoux Kabyles DZ", desc: "Artisan bijoutier kabyle en argent et corail.", longDesc: "Bijoux Kabyles DZ perpetue l art de la bijouterie kabyle." },
    { name: "Diamant d Orient", desc: "Bijouterie de luxe : diamants, or blanc.", longDesc: "Diamant d Orient est la bijouterie de luxe." },
  ],
  "voiture-mariage": [
    { name: "Prestige Cars DZ", desc: "Location de voitures de luxe pour mariage.", longDesc: "Prestige Cars DZ propose des voitures de luxe pour votre cortege." },
    { name: "Cortege d Alger", desc: "Voitures de collection pour mariage.", longDesc: "Cortege d Alger vous propose des voitures de collection." },
    { name: "Limo Service DZ", desc: "Limousines americaines et SUV stretch.", longDesc: "Limo Service DZ est le specialiste des limousines." },
  ],
  "wedding-planner": [
    { name: "Wedding Dream DZ", desc: "Organisation complete de votre mariage.", longDesc: "Wedding Dream DZ vous accompagne du premier rendez-vous au jour J." },
    { name: "Mariage sur Mesure", desc: "Organisatrice : theme, budget, coordination.", longDesc: "Mariage sur Mesure cree le mariage de vos reves." },
    { name: "Plan et Celebration", desc: "Agence evenementielle specialisee mariages.", longDesc: "Plan et Celebration gere votre mariage de A a Z." },
    { name: "Mariage Concierge", desc: "Service VIP de conciergerie de mariage.", longDesc: "Mariage Concierge est le service premium." },
  ],
  "fleuriste": [
    { name: "Rose d Alger", desc: "Fleuriste specialise dans les compositions de mariage.", longDesc: "Rose d Alger cree des compositions florales somptueuses." },
    { name: "Fleurs et Passion", desc: "Artisan fleuriste pour evenements.", longDesc: "Fleurs et Passion compose des bouquets pour tous vos evenements." },
  ],
  "patisserie-traditionnelle": [
    { name: "Mille et Une Douceurs", desc: "Patisserie traditionnelle haut de gamme.", longDesc: "Mille et Une Douceurs perpetue l art de la patisserie algerienne." },
    { name: "Douceurs d Orient", desc: "Buffet de patisseries algeriennes pour mariage.", longDesc: "Douceurs d Orient cree des buffets de patisseries traditionnelles." },
  ],
  "wedding-cake": [
    { name: "Gateau de Reve", desc: "Createur de wedding cakes personnalises.", longDesc: "Gateau de Reve concoit des pieces montees uniques." },
    { name: "Sweet Art DZ", desc: "Patissier moderne, gateaux design.", longDesc: "Sweet Art DZ repousse les limites du gateau de mariage." },
  ],
  "invitations-faire-part": [
    { name: "Papier d Orient", desc: "Createur de faire-part du traditionnel au moderne.", longDesc: "Papier d Orient concoit des faire-part elegants." },
    { name: "Calligraphie et Papier", desc: "Faire-part calligraphies a la main.", longDesc: "Calligraphie et Papier realise des faire-part uniques." },
  ],
  "calligraphe": [
    { name: "Khatt DZ", desc: "Calligraphe professionnel, invitations et cartes.", longDesc: "Khatt DZ est un calligraphe forme a Istanbul." },
    { name: "Plume d Or", desc: "Artiste calligraphe pour mariage.", longDesc: "Plume d Or realise des calligraphies sur mesure." },
  ],
  "animation-spectacle": [
    { name: "Magic Event DZ", desc: "Spectacles et animations pour mariage.", longDesc: "Magic Event DZ propose des animations spectaculaires." },
    { name: "Folklore d Algerie", desc: "Troupe folklorique danses traditionnelles.", longDesc: "Folklore d Algerie vous fait voyager a travers les danses regionales." },
  ],
  "zorna-cortege": [
    { name: "Zorna d Alger", desc: "Groupe de zorna pour cortege de mariage.", longDesc: "Zorna d Alger anime votre cortege avec la musique traditionnelle." },
    { name: "Cortege Traditionnel", desc: "Ensemble zorna, tambour, chants.", longDesc: "Cortege Traditionnel offre une experience authentique." },
  ],
  "chanteur": [
    { name: "Sarah Voice", desc: "Chanteuse professionnelle pour mariages.", longDesc: "Sarah Voice enchante vos invites avec sa voix puissante." },
    { name: "Groupe Vocal DZ", desc: "Troupe de 6 chanteurs a cappella.", longDesc: "Groupe Vocal DZ peut se produire a cappella ou avec orchestre." },
  ],
  "tente-kheima": [
    { name: "Kheima du Sud", desc: "Location de tentes et kheimas traditionnelles.", longDesc: "Kheima du Sud propose des tentes traditionnelles et modernes." },
    { name: "Tente Royale", desc: "Chapiteaux de reception haut de gamme.", longDesc: "Tente Royale installe des chapiteaux de luxe." },
  ],
  "photobooth": [
    { name: "Selfie Studio DZ", desc: "Cabine photo pour mariage, impressions instantanees.", longDesc: "Selfie Studio DZ apporte une cabine photo a votre mariage." },
    { name: "Booth and Fun", desc: "Miroir interactif et photobooth.", longDesc: "Booth and Fun propose un miroir interactif magique." },
  ],
  "drone": [
    { name: "Drone Master DZ", desc: "Prestation drone pour mariage.", longDesc: "Drone Master DZ capture votre mariage vu du ciel." },
  ],
  "caleche": [
    { name: "Caleche d Orient", desc: "Caleches decorees pour l entree des maries.", longDesc: "Caleche d Orient propose des caleches magnifiquement decorees." },
    { name: "Cheval et Tradition", desc: "Entree a cheval pour marie.", longDesc: "Cheval et Tradition organise l entree du marie a cheval." },
  ],
};

// ─── Generation loop ──────────────────────────────────────────
let providerId = 1;
let reviewId = 1;
const allProviders = [];
const allReviews = [];

const allCategories = Object.keys(PROVIDER_NAMES);

for (const category of allCategories) {
  const providersList = PROVIDER_NAMES[category];
  const tags = getTags(category);
  const imageFile = `${category}.jpg`;

  for (const p of providersList) {
    const wilayaIdx = providerId % WILAYAS.length;
    const wilaya = WILAYAS[wilayaIdx];
    const communeIdx = providerId % wilaya.communes.length;

    const rating = (4 + Math.random() * 0.9).toFixed(1);
    const reviewCount = Math.floor(Math.random() * 50) + 5;
    const years = Math.floor(Math.random() * 20) + 3;
    const minPrice = Math.floor(Math.random() * 100000) + 30000;
    const maxPrice = minPrice + Math.floor(Math.random() * 200000) + 50000;
    const isFeatured = providerId % 7 === 0;
    const isVerified = providerId % 3 !== 0;

    const cleanName = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const emailName = p.name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 15);
    const phoneNum = String(Math.floor(Math.random() * 100000000)).padStart(8, "0");
    const insta = p.name.toLowerCase().replace(/[^a-z0-9]/g, "_").slice(0, 20);

    const providerSlug = cleanName;
    const providerEmail = emailName + "@lella.dz";

    allProviders.push({
      id: "prov-" + providerId,
      name: p.name,
      slug: providerSlug,
      category: category,
      subcategories: [category],
      description: p.desc,
      longDescription: p.longDesc,
      coverImage: "/images/categories/" + imageFile,
      logo: "",
      gallery: [],
      location: { wilaya: wilaya.wilaya, commune: wilaya.communes[communeIdx] },
      priceRange: { min: minPrice, max: maxPrice },
      rating: parseFloat(rating),
      reviewCount,
      isVerified,
      isFeatured,
      yearsExperience: years,
      phone: "+213 5" + phoneNum,
      email: providerEmail,
      website: "",
      socialLinks: { instagram: "@" + insta },
      services: getServices(category),
      tags: tags,
      availability: [],
      reviews: [],
      createdAt: "2024-" + String(Math.floor(Math.random() * 12) + 1).padStart(2, "0") + "-" + String(Math.floor(Math.random() * 28) + 1).padStart(2, "0"),
      updatedAt: "2026-" + String(Math.floor(Math.random() * 6) + 1).padStart(2, "0") + "-" + String(Math.floor(Math.random() * 28) + 1).padStart(2, "0"),
    });

    // Generate 1-3 reviews per provider
    const reviewCountGen = Math.floor(Math.random() * 3) + 1;
    for (let r = 0; r < reviewCountGen; r++) {
      allReviews.push({
        id: "rev-" + reviewId,
        providerId: "prov-" + providerId,
        clientId: "client-" + reviewId,
        clientName: REVIEWER_NAMES[reviewId % REVIEWER_NAMES.length],
        clientAvatar: "",
        rating: Math.floor(Math.random() * 2) + 4,
        comment: REVIEW_COMMENTS[reviewId % REVIEW_COMMENTS.length],
        date: "2026-" + String(Math.floor(Math.random() * 6) + 1).padStart(2, "0") + "-" + String(Math.floor(Math.random() * 28) + 1).padStart(2, "0"),
        eventType: "mariage",
      });
      reviewId++;
    }

    providerId++;
  }
}

// ─── Generate output ──────────────────────────────────────────
const output = `// ═══════════════════════════════════════════════════════════════
//   🏗️ LELLA — Prestataires (mock data genere)
//   ${allProviders.length} prestataires — ${allReviews.length} avis
//   Generé le ${new Date().toISOString().split("T")[0]}
// ═══════════════════════════════════════════════════════════════

import type { Provider, Review } from "@/types";

export const reviews: Review[] = ${JSON.stringify(allReviews, null, 2)};

export const providers: Provider[] = ${JSON.stringify(allProviders, null, 2)};

// ─── Helpers ──────────────────────────────────────────────────
export function getFeaturedProviders(): Provider[] {
  return providers.filter(p => p.isFeatured);
}

export function getProvidersByCategory(category: string): Provider[] {
  return providers.filter(p => p.category === category);
}

export function getProviderBySlug(slug: string): Provider | undefined {
  return providers.find(p => p.slug === slug);
}

export function getProvidersByWilaya(wilaya: string): Provider[] {
  return providers.filter(p => p.location.wilaya === wilaya);
}

export function searchProviders(query: string): Provider[] {
  const q = query.toLowerCase();
  return providers.filter(
    p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.location.wilaya.toLowerCase().includes(q)
  );
}

export function getFilteredProviders(filters: {
  category?: string;
  wilaya?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
}): Provider[] {
  let result = [...providers];

  if (filters.category) {
    result = result.filter(p => p.category === filters.category);
  }
  if (filters.wilaya) {
    result = result.filter(p => p.location.wilaya === filters.wilaya);
  }
  if (filters.minPrice) {
    result = result.filter(p => p.priceRange.max >= filters.minPrice);
  }
  if (filters.maxPrice) {
    result = result.filter(p => p.priceRange.min <= filters.maxPrice);
  }
  if (filters.minRating) {
    result = result.filter(p => p.rating >= filters.minRating);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.location.wilaya.toLowerCase().includes(q)
    );
  }

  return result;
}
`;

const outDir = path.join(__dirname, "..", "src", "lib", "mock-data");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "providers.ts"), output, "utf8");
console.log("✅ " + allProviders.length + " prestataires et " + allReviews.length + " avis generes !");
console.log("📁 Fichier : src/lib/mock-data/providers.ts");
