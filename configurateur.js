(function () {
  const euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const kg = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
  const selection = new Set(SOUS_ENSEMBLES.map(s => s.id));

  function carte(el, conteneur) {
    const lab = document.createElement("label");
    lab.className = "carte" + (el.actif === false ? " inactif" : "") + (selection.has(el.id) ? " choisi" : "");
    const img = el.image
      ? `<img src="${el.image}" alt="${el.nom}">`
      : `<div class="sans-image"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19c8 0 14-6 14-14C11 5 5 11 5 19zm0 0c3-4 6-7 10-9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></div>`;
    const prix = el.prix == null ? (el.mention || "Sur devis") : euro.format(el.prix);
    lab.innerHTML = `
      <input type="checkbox" value="${el.id}" ${selection.has(el.id) ? "checked" : ""}
        ${el.obligatoire || el.actif === false ? "disabled" : ""}>
      ${img}
      <div class="texte">
        <strong>${el.nom}</strong>${el.obligatoire ? ' <span class="tag">Indispensable</span>' : ""}
        ${el.description ? `<p>${el.description}</p>` : ""}
      </div>
      <span class="prix">${prix}</span>`;
    lab.querySelector("input").addEventListener("change", e => {
      e.target.checked ? selection.add(el.id) : selection.delete(el.id);
      lab.classList.toggle("choisi", e.target.checked);
      recalcul();
    });
    conteneur.appendChild(lab);
  }

  SOUS_ENSEMBLES.forEach(s => carte(s, document.getElementById("liste-se")));
  OPTIONS.forEach(o => carte(o, document.getElementById("liste-opt")));
  document.getElementById("mentions").innerHTML = MENTIONS.map(m => `<li>${m}</li>`).join("");

  function recalcul() {
    const tous = [...SOUS_ENSEMBLES, ...OPTIONS].filter(e => selection.has(e.id) && e.actif !== false);
    let total = 0, masse = 0;
    document.getElementById("recap-lignes").innerHTML = tous.map(e => {
      masse += e.masse;
      total += e.prix || 0;
      return `<li><span>${e.nom}</span><span>${e.prix == null ? "Sur devis" : euro.format(e.prix)}</span></li>`;
    }).join("");
    document.getElementById("total").textContent = euro.format(total);
    document.getElementById("ttc").textContent = euro.format(total * (1 + TVA));
    document.getElementById("masse").textContent = kg.format(masse) + " kg";
  }
  recalcul();

  // Fiche technique et rendement
  const nb = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });
  const joursProd = 365 * TECH.occupation;
  const pouletsAn = TECH.poulets * joursProd / TECH.cycleJours;
  const caAn = pouletsAn * TECH.prixPoulet;
  const alimentAn = TECH.poulets * TECH.alimentGJour / 1000 * joursProd * TECH.prixAlimentTonne / 1000;
  const margeAn = caAn - alimentAn;
  const li = (k, v) => `<li><span>${k}</span><strong>${v}</strong></li>`;
  document.getElementById("chiffres").innerHTML =
    li("Dimensions au sol", nb.format(TECH.longueur) + " × " + nb.format(TECH.largeur) + " m") +
    li("Hauteur au faîtage", nb.format(TECH.hauteur) + " m") +
    li("Surface intérieure", TECH.surface + " m²") +
    li("Capacité", TECH.poulets + " poulets") +
    li("Densité", nb.format(TECH.poulets / TECH.surface) + " poulets/m²") +
    li("Durée d'une bande", TECH.cycleJours + " jours") +
    li("Bandes par an", nb.format(joursProd / TECH.cycleJours) + " (occupation " + Math.round(TECH.occupation * 100) + " %)");

  function rendement() {
    const n = +document.getElementById("annees").value;
    document.getElementById("annees-val").textContent = n + (n > 1 ? " ans" : " an");
    const invest = SOUS_ENSEMBLES.concat(OPTIONS).filter(e => selection.has(e.id) && e.prix != null).reduce((a, e) => a + e.prix, 0);
    const retour = invest / margeAn;
    document.getElementById("rendement").innerHTML =
      li("Poulets produits", kg.format(pouletsAn * n)) +
      li("Chiffre d'affaires", euro.format(caAn * n)) +
      li("Coût de l'aliment", "− " + euro.format(alimentAn * n)) +
      li("Marge sur aliment", euro.format(margeAn * n)) +
      li("Poulailler amorti en", nb.format(retour) + " an" + (retour >= 2 ? "s" : ""));
    document.getElementById("note-rendement").textContent =
      "Estimation indicative : " + TECH.prixPoulet + " € par poulet vendu, aliment à " + TECH.prixAlimentTonne +
      " € la tonne, " + TECH.alimentGJour + " g par jour et par poulet. Hors poussins, main d'œuvre, abattage et frais vétérinaires.";
  }
  document.getElementById("annees").addEventListener("input", rendement);
  document.addEventListener("change", rendement);
  rendement();
})();
