(function () {
  const euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const kg = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
  const nb = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });
  const li = (k, v) => `<li><span>${k}</span><strong>${v}</strong></li>`;
  const $ = id => document.getElementById(id);
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
      tout();
    });
    conteneur.appendChild(lab);
  }

  SOUS_ENSEMBLES.forEach(s => carte(s, $("liste-se")));
  OPTIONS.forEach(o => carte(o, $("liste-opt")));
  $("mentions").innerHTML = MENTIONS.map(m => `<li>${m}</li>`).join("");

  // Quantité et tarif dégressif sur le matériel
  function quantite() { return Math.max(1, Math.round(+$("quantite").value || 1)); }
  function facteur(n) {
    const pente = (REMISE.coefBase - REMISE.coefMin) / (REMISE.quantiteMin - 1);
    return Math.max(REMISE.coefMin, REMISE.coefBase - pente * (n - 1)) / REMISE.coefBase;
  }
  function investissement() {
    const n = quantite(), f = facteur(n);
    let materiel = 0, service = 0;
    [...SOUS_ENSEMBLES, ...OPTIONS].filter(e => selection.has(e.id) && e.actif !== false && e.prix != null)
      .forEach(e => { if (SOUS_ENSEMBLES.includes(e)) materiel += e.prix; else service += e.prix; });
    return { n, f, materiel, service, total: n * (materiel * f + service) };
  }

  function recalcul() {
    const tous = [...SOUS_ENSEMBLES, ...OPTIONS].filter(e => selection.has(e.id) && e.actif !== false);
    const inv = investissement();
    let masse = 0;
    $("recap-lignes").innerHTML = tous.map(e => {
      masse += e.masse;
      return `<li><span>${e.nom}</span><span>${e.prix == null ? "Sur devis" : euro.format(e.prix)}</span></li>`;
    }).join("") +
      (inv.n > 1 ? `<li class="sous"><span>Prix d'un poulailler</span><span>${euro.format(inv.materiel + inv.service)}</span></li>` +
        `<li><span>× ${inv.n} poulaillers</span><span>${euro.format(inv.n * (inv.materiel + inv.service))}</span></li>` : "") +
      (inv.f < 1 ? `<li class="remise"><span>Remise quantité sur le matériel (− ${Math.round((1 - inv.f) * 100)} %)</span><span>− ${euro.format(inv.n * inv.materiel * (1 - inv.f))}</span></li>` : "");
    $("total").textContent = euro.format(inv.total);
    $("ttc").textContent = euro.format(inv.total * (1 + TVA));
    $("masse").textContent = kg.format(masse * inv.n) + " kg";
  }

  // Fiche technique
  const bandesDefaut = Math.round(365 * TECH.occupation / TECH.cycleJours * 10) / 10;
  $("chiffres").innerHTML =
    li("Dimensions au sol", nb.format(TECH.longueur) + " × " + nb.format(TECH.largeur) + " m") +
    li("Hauteur au faîtage", nb.format(TECH.hauteur) + " m") +
    li("Surface intérieure", TECH.surface + " m²") +
    li("Capacité", TECH.poulets + " poulets") +
    li("Densité", nb.format(TECH.poulets / TECH.surface) + " poulets/m²") +
    `<li><span>Durée d'une bande</span><strong><input type="number" id="duree" min="30" max="200" step="1" value="${TECH.cycleJours}"> jours</strong></li>` +
    `<li><span>Bandes par an</span><strong><input type="number" id="bandes" min="0.5" max="12" step="0.1" value="${bandesDefaut}"></strong></li>` +
    `<li><span>Occupation du poulailler</span><strong id="occupation"></strong></li>`;
  $("poussin").value = TECH.prixPoussin;
  $("vente").value = TECH.prixPoulet;

  // Rendement
  function rendement() {
    const annees = +$("annees").value;
    const prixPoussin = +$("poussin").value || 0;
    const prixVente = +$("vente").value || 0;
    const duree = Math.max(1, +$("duree").value || TECH.cycleJours);
    const bandesMax = Math.floor(365 / duree * 10) / 10;
    $("bandes").max = bandesMax;
    let bandes = +$("bandes").value || 0;
    if (bandes > bandesMax) { bandes = bandesMax; $("bandes").value = bandesMax; }
    const inv = investissement(), q = inv.n, invest = inv.total;
    const joursProd = bandes * duree;
    const pouletsAn = q * TECH.poulets * bandes;
    const caAn = pouletsAn * prixVente;
    const poussinsAn = pouletsAn * prixPoussin;
    const alimentAn = q * TECH.poulets * TECH.alimentGJour / 1000 * joursProd * TECH.prixAlimentTonne / 1000;
    const margeAn = caAn - alimentAn - poussinsAn;
    const retour = margeAn > 0 ? invest / margeAn : Infinity;
    $("occupation").textContent = Math.round(joursProd / 365 * 100) + " %";
    $("annees-val").textContent = annees + (annees > 1 ? " ans" : " an");
    $("rendement").innerHTML =
      li("Poulets produits", kg.format(pouletsAn * annees)) +
      li("Chiffre d'affaires", euro.format(caAn * annees)) +
      li("Achat des poussins", "− " + euro.format(poussinsAn * annees)) +
      li("Coût de l'aliment", "− " + euro.format(alimentAn * annees)) +
      li(q > 1 ? "Prix des " + q + " poulaillers" : "Prix du poulailler", "− " + euro.format(invest)) +
      `<li class="net"><span>Résultat net sur ${annees} an${annees > 1 ? "s" : ""}</span><strong>${euro.format(margeAn * annees - invest)}</strong></li>` +
      li(q > 1 ? "Poulaillers amortis en" : "Poulailler amorti en", isFinite(retour) ? nb.format(retour) + " an" + (retour >= 2 ? "s" : "") : "non amorti");
    $("note-rendement").textContent =
      "Estimation indicative : aliment à " + TECH.prixAlimentTonne + " € la tonne, " + TECH.alimentGJour +
      " g par jour et par poulet. Hors main d'œuvre, abattage, mortalité et frais vétérinaires.";
  }

  function tout() { recalcul(); rendement(); }
  ["quantite", "annees", "duree", "bandes", "poussin", "vente"].forEach(id => $(id).addEventListener("input", tout));
  tout();
})();
