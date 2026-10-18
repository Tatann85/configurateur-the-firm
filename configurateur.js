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
})();
