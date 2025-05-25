// Funzione per caricare uno script e aspettare che abbia finito
function loadScript(src, type = 'text/javascript') {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.type = type;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Errore nel caricamento di ${src}`));
        document.head.appendChild(script);
    });
}

// Carica in ordine
loadScript("/base/scripts/event.js")
  .then(() => loadScript("/base/scripts/manifest.js", "module"))
  .then(() => loadScript("/base/scripts/cookie.js"))
  .then(() => loadScript("/base/scripts/index.js"))
  .then(() => loadScript("/base/scripts/addons.js")) // modulo ES
  .catch((err) => console.error(err));
