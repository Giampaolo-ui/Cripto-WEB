const content = document.querySelector('.content');
currentPage = null

function getFromURL(value) {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get(value);
    return page;
}


async function loadPage(page, args = '', dest = content, point = '') {

  dest.classList.add('fade-out');
  await new Promise(r => setTimeout(r, 300));

  if (page.startsWith("@")) {
    url = page.substring(1);
  } else {
    try {
      url = window.Path[page]
    } catch (e) {
    loadPage("@/base/error/general.html", "value=Content&msg=// index.js → errore nel caricamento della pagina (PATH non trovato): " + e.message, dest);
    return;
    }
  }
  let res = await fetch(url);

  if (!res.ok) {
    url = `/base/error/404.html`;
    args = `redirect=${currentPage}`;
    document.title = "Page Not Found";
    res = await fetch(url);
  }

  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');
  if (!page.startsWith("@") && dest.classList.contains("index"))
    history.pushState({}, "", `?page=${page}&${args}#${point}`);
  else if (dest.classList.contains("index"))
    history.pushState({}, "", `?${args}`);
  else if (!dest.classList.contains("index"))
    history.pushState({}, "", `?page=${getFromURL('page')}&${args}#${point}`);


  // Check conditions
  await checkConditions(doc);
  await processDynamicExpressions(doc);

  // Aggiorna content
  try {
    dest.innerHTML = doc.querySelector(".content").innerHTML;
    checkIPage(dest)
  } catch (e) {
    loadPage("@/base/error/general.html", "value=Content&msg=// index.js → errore nel caricamento della pagina (possibile content mancante): " + e.message, dest);
    return;
  }
  checkLink(dest);
  
  dest.classList.remove("fade-out");
  currentPage = page;

  // Load Script
  const promises = [];
  doc.querySelectorAll("script").forEach((oldScript) => {
    const script = document.createElement("script");
    script.id = "loaded-script"
      // copia attributi...
      if (!oldScript.src) {
      script.textContent = oldScript.textContent;
      dest.appendChild(script);
      // inline eseguito subito, niente promise
      } else {
      // script esterno: metti async=false e onload
      script.src = oldScript.src;
      script.async = false;
      const p = new Promise((res) => (script.onload = res));
      promises.push(p);
      dest.appendChild(script);
      }
  });

  // aspetta che tutti gli script esterni siano caricati
  await Promise.all(promises);

  window.bus.emit("LoadPage", { page: page, args: args, doc: doc, found: !(url === `/base/error/404.html`), dest: dest });

}



// Classe link redirect
function checkLink(document = content) {
  document.querySelectorAll('.link').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
        const page = a.getAttribute('page') || "";

        args = a.getAttribute('args') || "";
        point = a.getAttribute('point') || "";

        loadPage(page, args, document, point);
      });


    window.bus.emit("CheckLink", { link: a });


    }
    );
}

// Funzione per il rendering delle condizioni
function checkConditions(root = document) {
  // Prendi tutti gli <if> con attributo condition, poi inverti l’array
  const ifElements = Array.from(
    root.querySelectorAll("if[condition]")
  ).reverse();

  ifElements.forEach((ifEl) => {
    const conditionExpr = ifEl.getAttribute("condition");
    const ifContent = [];
    const elseContent = [];

    // Separa i nodi “if” da quelli “else”
    Array.from(ifEl.childNodes).forEach((node) => {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.tagName.toLowerCase() === "else"
      ) {
        // raccolgo i figli di <else>
        Array.from(node.childNodes).forEach((child) => {
          elseContent.push(child.cloneNode(true));
        });
      } else {
        // tutto il resto va in ifContent
        ifContent.push(node.cloneNode(true));
      }
    });

    // Valuta la condizione in sandbox
    let showIf = false;
    try {
      showIf = Function('"use strict"; return (' + conditionExpr + ")")();
    } catch (e) {
      console.error("Errore nella condizione:", conditionExpr, e);
    }

    // Sostituisci il tag <if> con il contenuto giusto
    const frag = document.createDocumentFragment();
    (showIf ? ifContent : elseContent).forEach((n) => frag.appendChild(n));
    ifEl.replaceWith(frag);
  });
}

// Uso: quando il DOM è pronto
window.addEventListener("DOMContentLoaded", () => {
  checkConditions(); // processa anche eventuali <if> annidati
});

function processDynamicExpressions(root = document.body) {
  const elements = root.querySelectorAll("*");

  elements.forEach((el) => {
    // 1. PROCESSA GLI ATTRIBUTI
    for (let attr of el.attributes) {
      if (attr.value.includes("${")) {
        try {
          const newVal = attr.value.replace(/\$\{([^}]+)\}/g, (_, code) =>
            eval(code)
          );
          el.setAttribute(attr.name, newVal);
        } catch (e) {
          el.setAttribute(attr.name, `[Errore: ${e.message}]`);
        }
      }
    }

    // 2. PROCESSA IL CONTENUTO TESTUALE
    el.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.includes("${")) {
        try {
          const newText = node.nodeValue.replace(/\$\{([^}]+)\}/g, (_, code) =>
            eval(code)
          );
          node.nodeValue = newText;
        } catch (e) {
          node.nodeValue = `[Errore: ${e.message}]`;
        }
      }
    });
  });
}

function checkIPage(root = document) {
  const elements = root.querySelectorAll("ipage");

  elements.forEach((el) => {
    const page = el.getAttribute("page") || "";
    const args = el.getAttribute("args") || "";

    if (page) {
      const ifr = document.createElement("iframe")
      ifr.id = "iframe-" + page
      ifr.src = "/?page="+page
      ifr.width = "100%"
      ifr.height = "100%"
      ifr.style.margin = "0"
      ifr.style.padding = "0"
      ifr.style.border = "none"
      el.appendChild(ifr)
    }
  });
}


window.addEventListener('popstate', () => {
    const p = new URL(location).searchParams.get('page') || 'home';
    loadPage(p);
});

// Load Page
if (window.config.OSMode && !getFromURL('iframe')) {
  loadPage('os')
  console.log(getFromURL('iframe'))
} else if (getFromURL('page')) {
  loadPage(getFromURL('page'));
} else if (window.IndexPage) {
  loadPage(window.IndexPage);
} else {
  loadPage(
    "@/base/error/general.html",
    "value=IndexPage&msg=// config.js → manca la proprietà IndexPage"
  );
}
