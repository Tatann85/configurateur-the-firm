// Données du configurateur. Source : Google Sheet Nomenclature-Poulailler-2026-10-18-rev04, onglet Synthèse.
// Version publique : aucun prix de revient dans ce fichier (dépôt public).
// Les prix de vente seront ajoutés quand la règle de prix sera validée.
const COEF_VENTE = null;

const SOUS_ENSEMBLES = [
  { id: "SE10", nom: "Structure acier", obligatoire: true, prix: null, masse: 571.7, image: "img/structure-acier.png",
    description: "Ossature mécano-soudée en tubes acier, contreventée, avec sa visserie." },
  { id: "SE20", nom: "Roue mobile", prix: null, masse: 61.4, image: "img/roue-mobile.png",
    description: "Deux châssis support et quatre roues 16 x 6.50-8 pour déplacer le poulailler." },
  { id: "SE30", nom: "Protection anti-bec de poule", prix: null, masse: 0,
    description: "Panneaux de protection intérieurs, côté porte et côté trappe." },
  { id: "SE40", nom: "Toile blanche d'isolation", prix: null, masse: 20.6,
    description: "Bâche intérieure en film agricole, tendue sur fil galvanisé." },
  { id: "SE50", nom: "Isolation et structure bois", prix: null, masse: 775.7,
    description: "Laine de roche 80 mm, ossature bois et habillage intérieur PVC." },
  { id: "SE60", nom: "Pare-pluie", prix: null, masse: 0,
    description: "Membrane pare-pluie sur les deux pignons." },
  { id: "SE70", nom: "Tôle ondulée (toiture)", prix: null, masse: 352.0,
    description: "Bac acier 0,63 mm neuf, faîtières et rivets." },
  { id: "SE80", nom: "Bardage pignon côté porte", prix: null, masse: 45.8,
    description: "Bardage acier, porte d'entrée avec serrure, fenêtre et entrées d'air." },
  { id: "SE90", nom: "Bardage pignon côté trappe", prix: null, masse: 44.0,
    description: "Bardage acier, trappes à poules, fenêtre et entrées d'air." },
  { id: "SE100", nom: "Équipements", prix: null, masse: 5.0,
    description: "Réservoir d'eau 90 L." }
];

const OPTIONS = [
  { id: "SE10-OPT1", nom: "Galvanisation à chaud de la structure", prix: null, masse: 28.0, actif: true },
  { id: "MONTAGE", nom: "Montage sur site par charpentiers", prix: null, masse: 0, actif: false, mention: "Bientôt disponible" }
];

const MENTIONS = [
  "Livré en kit, montage par le client.",
  "Prix sur devis : tarifs en cours de validation."
];
