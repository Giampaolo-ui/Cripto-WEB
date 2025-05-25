Addons = window.config.Addons

const addonDiv = document.querySelector(".addons");

async function loadAddon(addon) {

    let url = `/addons/${addon}/index.html`;
    let res = await fetch(url);

    if (!res.ok) {
        console.error(`Errore nel caricamento dell'addon ${addon}: ${res.statusText}`);
        return;
    }

    const html = await res.text();
    const doc  = new DOMParser().parseFromString(html, 'text/html');

    // Check conditions
    await checkConditions(doc);

    console.log(doc.innerHTML)

    // Aggiorna content
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.left = "0";
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.overflow = "hidden";
    div.style.zIndex = "15";
    div.classList.add(addon+'-iframe');

    div.innerHTML = doc.body.innerHTML
    addonDiv.appendChild(div);

    const promises = [];
    doc.querySelectorAll("script").forEach((oldScript) => {
        const script = document.createElement("script");
        // copia attributi...
        if (!oldScript.src) {
        script.textContent = oldScript.textContent;
        document.body.appendChild(script);
        // inline eseguito subito, niente promise
        } else {
        // script esterno: metti async=false e onload
        script.src = oldScript.src;
        script.async = false;
        const p = new Promise((res) => (script.onload = res));
        promises.push(p);
        document.body.appendChild(script);
        }
    });

    // aspetta che tutti gli script esterni siano caricati
    await Promise.all(promises);
    
}

Addons.forEach((addon) => { loadAddon(addon); });
