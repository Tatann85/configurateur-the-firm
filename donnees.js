// Données du configurateur. Source : Google Sheet Nomenclature-Poulailler-2026-10-18-rev04, onglet Synthèse.
// Prix de vente HT par sous-ensemble.
const TVA = 0.20;

const SOUS_ENSEMBLES = [
  { id: "SE10", nom: "Structure acier", obligatoire: true, prix: 6773, masse: 571.7, image: "img/structure-acier.jpg",
    description: "Ossature en tubes acier, contreventée, livrée avec sa visserie." },
  { id: "SE20", nom: "Roue mobile", prix: 929, masse: 61.4, image: "img/roue-mobile.png",
    description: "Deux châssis et quatre roues 16 x 6.50-8 pour déplacer le poulailler sur de l'herbe fraîche." },
  { id: "SE30", nom: "Protection anti-bec de poule", prix: 362, masse: 0, image: "img/anti-bec.svg",
    description: "Panneaux de protection intérieurs, côté porte et côté trappe." },
  { id: "SE40", nom: "Toile blanche d'isolation", prix: 176, masse: 20.6, image: "img/toile.svg",
    description: "Bâche intérieure en film agricole, tendue sur fil galvanisé." },
  { id: "SE50", nom: "Isolation et structure bois", prix: 2480, masse: 775.7, image: "img/isolation.svg",
    description: "Laine de roche 80 mm, ossature bois et habillage intérieur." },
  { id: "SE60", nom: "Pare-pluie", prix: 38, masse: 0, image: "img/pare-pluie.svg",
    description: "Membrane pare-pluie sur les deux pignons." },
  { id: "SE70", nom: "Tôle ondulée (toiture)", prix: 2109, masse: 352.0, image: "img/tole.svg",
    description: "Bac acier 0,63 mm, faîtières et rivets." },
  { id: "SE80", nom: "Bardage pignon côté porte", prix: 618, masse: 45.8, image: "img/bardage-porte.svg",
    description: "Bardage acier, porte d'entrée avec serrure, fenêtre et entrées d'air." },
  { id: "SE90", nom: "Bardage pignon côté trappe", prix: 640, masse: 44.0, image: "img/bardage-trappe.svg",
    description: "Bardage acier, trappes à poules, fenêtre et entrées d'air." },
  { id: "SE100", nom: "Équipements", prix: 120, masse: 5.0, image: "img/equipements.svg",
    description: "Réservoir d'eau 90 L." }
];

const OPTIONS = [
  { id: "MONTAGE", nom: "Montage sur site par charpentiers", prix: null, masse: 0, actif: false, mention: "Bientôt disponible",
    description: "Une équipe vient monter le poulailler chez vous." }
];

const MENTIONS = [
  "Livré en kit, montage par vos soins.",
  "Prix indicatifs. Livraison sur devis."
];
