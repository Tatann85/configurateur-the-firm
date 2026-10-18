// Données du configurateur. Source : Google Sheet Nomenclature-Poulailler-2026-10-18-rev04, onglet Synthèse.
// Prix de vente HT par sous-ensemble.
const TVA = 0.20;

const SOUS_ENSEMBLES = [
  { id: "SE10", nom: "Structure acier", obligatoire: true, prix: 8467, masse: 571.7, image: "img/structure-acier.jpg",
    description: "Ossature en tubes acier, contreventée, livrée avec sa visserie." },
  { id: "SE20", nom: "Roue mobile", prix: 1161, masse: 61.4, image: "img/roue-mobile.png",
    description: "Deux châssis et quatre roues 16 x 6.50-8 pour déplacer le poulailler sur de l'herbe fraîche." },
  { id: "SE30", nom: "Protection anti-bec de poule", prix: 452, masse: 0, image: "img/anti-bec.svg",
    description: "Panneaux de protection intérieurs, côté porte et côté trappe." },
  { id: "SE40", nom: "Toile blanche d'isolation", prix: 220, masse: 20.6, image: "img/toile.svg",
    description: "Bâche intérieure en film agricole, tendue sur fil galvanisé." },
  { id: "SE50", nom: "Isolation et structure bois", prix: 3101, masse: 775.7, image: "img/isolation.svg",
    description: "Laine de roche 80 mm, ossature bois et habillage intérieur." },
  { id: "SE60", nom: "Pare-pluie", prix: 48, masse: 0, image: "img/pare-pluie.svg",
    description: "Membrane pare-pluie sur les deux pignons." },
  { id: "SE70", nom: "Tôle ondulée (toiture)", prix: 2636, masse: 352.0, image: "img/tole.svg",
    description: "Bac acier 0,63 mm, faîtières et rivets." },
  { id: "SE80", nom: "Bardage pignon côté porte", prix: 772, masse: 45.8, image: "img/bardage-porte.svg",
    description: "Bardage acier, porte d'entrée avec serrure, fenêtre et entrées d'air." },
  { id: "SE90", nom: "Bardage pignon côté trappe", prix: 800, masse: 44.0, image: "img/bardage-trappe.svg",
    description: "Bardage acier, trappes à poules, fenêtre et entrées d'air." },
  { id: "SE100", nom: "Équipements", prix: 150, masse: 5.0, image: "img/equipements.svg",
    description: "Réservoir d'eau 90 L." }
];

// Montage : 2 charpentiers x 2 semaines x 35 h = 140 h a 120 EUR HT/h.
const MONTAGE = { personnes: 2, semaines: 2, heuresParSemaine: 35, tauxHoraire: 120 };
const HEURES_MONTAGE = MONTAGE.personnes * MONTAGE.semaines * MONTAGE.heuresParSemaine;

const OPTIONS = [
  { id: "MONTAGE", nom: "Montage sur site par nos charpentiers", prix: HEURES_MONTAGE * MONTAGE.tauxHoraire, masse: 0,
    description: "2 charpentiers pendant 2 semaines montent le poulailler chez vous (" + HEURES_MONTAGE + " h à " + MONTAGE.tauxHoraire + " € HT/h)." }
];

const MENTIONS = [
  "Livré en kit : montage par vos soins, ou par notre équipe en option.",
  "Prix indicatifs. Livraison sur devis."
];