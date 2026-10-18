(function () {
  const euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
  const kg = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
  const coef = COEF_VENTE || 1;
  

  const selection = new Set(SOUS_ENSEMBLES.map(s => s.id));

  function carte(el, conteneur) {
    const lab = document.createElement("label");
    lab.className = "carte" + (el.actif === false ? " inactif" : "");
    const img = el.image
      ? `<img src="${el.image}" alt="${el.nom}">`
      : `<div class="sans-image">${el.description !== undefined ? "Image à venir" : ""}</div>`;
    const prix = el.prix == null ? (el.mention || "Sur devis") : euro.format(el.prix * coef);
    const reserves = (el.reserves || []).map(r => `<li>${r}</li>`).join("");
    lab.innerHTML = `
      <input type="checkbox" value="${el.id}" ${selection.has(el.id) ? "checked" : ""}
        ${el.obligatoire || el.actif === false ? "disabled" : ""}>
      ${img}
      <div class="texte">
        <strong>${el.nom}</strong>${el.obligatoire ? ' <span class="tag">Obligatoire</span>' : ""}
        ${el.description ? `<p>${el.description}</p>` : ""}
        ${reserves ? `<ul class="reserves">${reserves}</ul>` : ""}
      </div>
      <span class="prix">${prix}</span>`;
    lab.querySelector("input").addEventListener("change", e => {
      e.target.checked ? selection.add(el.id) : selection.delete(el.id);
      recalcul();
    });
    conteneur.appendChild(lab);
  }

  SOUS_ENSEMBLES.forEach(s => carte(s, document.getElementById("liste-se")));
  OPTIONS.forEach(o => carte(o, document.getElementById("liste-opt")));
  document.getElementById("mentions").innerHTML = MENTIONS.map(m => `<li>${m}</li>`).join("");

  function recalcul() {
    const tous = [...SOUS_ENSEMBLES, ...OPTIONS].filter(e => selection.has(e.id) && e.actif !== false);
    let devis = false;
    let total = 0, masse = 0;
    document.getElementById("recap-lignes").innerHTML = tous.map(e => {
      masse += e.masse;
      if (e.prix == null) { devis = true; return `<li><span>${e.nom}</span><span>Sur devis</span></li>`; }
      total += e.prix * coef;
      return `<li><span>${e.nom}</span><span>${euro.format(e.prix * coef)}</span></li>`;
    }).join("");
    document.getElementById("total").textContent = devis ? "Sur devis" : euro.format(total);
    document.getElementById("masse").textContent = kg.format(masse) + " kg";
  }
  recalcul();
})();
