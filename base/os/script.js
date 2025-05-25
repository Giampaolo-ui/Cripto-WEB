pagesDiv = document.querySelector("#pages")
pages = Object.keys(window.config.Path);

pages.forEach((p) => {
    div = document.createElement("div")
    div.classList.add("name-page")
    div.innerHTML = capitalizeFirstLetter(p)

    div.innerHTML += '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 12C14 14.7614 11.7614 17 9 17H7C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7H7.5M10 12C10 9.23858 12.2386 7 15 7H17C19.7614 7 22 9.23858 22 12C22 14.7614 19.7614 17 17 17H16.5" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round"></path> </g></svg>'

    div.addEventListener("click", () => {
            const ifr = document.createElement("iframe")
            ifr.id = "iframe-" + p
            ifr.src = "/?page="+p+"&iframe=1"
            ifr.width = "100%"
            ifr.height = "100%"
            ifr.style.margin = "0"
            ifr.style.padding = "0"
            ifr.style.border = "none"
            creaFinestra(p, ifr)
    });
    svg = div.querySelector("svg")
    svg.addEventListener("click", () => {
      loadPage(p, 'iframe=1')
    });

    pagesDiv.appendChild(div)
})

function creaFinestra(idFinestra, nodoContenuto, show=true) {
  // 1. Crea struttura della finestra
  const finestra = document.createElement("div");
  finestra.className = "window";
  finestra.id = idFinestra;
  finestra.style.position = "absolute";
  finestra.style.top = "100px";
  finestra.style.left = "100px";
  finestra.style.width = "400px";
  finestra.style.height = "300px";
  finestra.style.display = "flex";
  finestra.style.flexDirection = "column";

  if (!show)
    finestra.style.display = 'none';

  // 2. Header
  const header = document.createElement("div");
  header.className = "window-header";
  header.style.cursor = "move";

  const titolo = document.createElement("span");
  titolo.textContent = capitalizeFirstLetter(idFinestra);

  const pulsanti = document.createElement("div");
  pulsanti.className = "window-buttons";

  const btnMaximize = document.createElement("button");
  btnMaximize.className = "btn maximize";

  const btnClose = document.createElement("button");
  btnClose.className = "btn close";

  pulsanti.appendChild(btnMaximize);
  pulsanti.appendChild(btnClose);
  header.appendChild(titolo);
  header.appendChild(pulsanti);
  finestra.appendChild(header);

  // 3. Contenuto
  const contenuto = document.createElement("div");
  contenuto.className = "window-content";
  contenuto.id = "pages";
  contenuto.style.flex = "1";
  contenuto.appendChild(nodoContenuto);
  finestra.appendChild(contenuto);

  // 4. Aggiungi al body
  document.querySelector(".desktop").appendChild(finestra);

  // 5. Funzionalità Drag e Bottoni
  let offsetX, offsetY, isDragging = false;
  let isMaximized = false;
  let lastSize = {}, lastPosition = {};

  function closeWindow(e) {
    e.stopPropagation();
    finestra.style.display = 'none';
  }

  function maximizeWindow(e) {
    e.stopPropagation();
    if (!isMaximized) {
      lastSize = { width: finestra.style.width, height: finestra.style.height };
      lastPosition = { top: finestra.style.top, left: finestra.style.left };
      finestra.style.top = '0';
      finestra.style.left = '0';
      finestra.style.width = '100vw';
      finestra.style.height = '100vh';
    } else {
      finestra.style.width = lastSize.width;
      finestra.style.height = lastSize.height;
      finestra.style.top = lastPosition.top;
      finestra.style.left = lastPosition.left;
    }
    isMaximized = !isMaximized;
  }

  function startDrag(e) {
    if (isMaximized) return;
    isDragging = true;
    offsetX = e.clientX - finestra.offsetLeft;
    offsetY = e.clientY - finestra.offsetTop;
    document.onmousemove = dragWindow;
    document.onmouseup = stopDrag;
  }

  function dragWindow(e) {
    if (!isDragging) return;
    finestra.style.left = (e.clientX - offsetX) + 'px';
    finestra.style.top = (e.clientY - offsetY) + 'px';
  }

  function stopDrag() {
    isDragging = false;
    document.onmousemove = null;
    document.onmouseup = null;
  }

  // 6. Collega gli eventi
  header.onmousedown = startDrag;
  btnClose.onclick = closeWindow;
  btnMaximize.onclick = maximizeWindow;

  return finestra;
}

function capitalizeFirstLetter(string) {
  if (!string) {
    return string; // Gestisce il caso di stringa vuota o nulla
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}


finestra = creaFinestra('Prova Tu', document.createElement("div"), false)
pagesTry = ['terminal', 'help']
pagesTry.forEach((p) => {
    div = document.createElement("div")
    div.classList.add("name-page")
    div.innerHTML = capitalizeFirstLetter(p)

    div.innerHTML += '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 12C14 14.7614 11.7614 17 9 17H7C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7H7.5M10 12C10 9.23858 12.2386 7 15 7H17C19.7614 7 22 9.23858 22 12C22 14.7614 19.7614 17 17 17H16.5" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round"></path> </g></svg>'

    div.addEventListener("click", () => {
            const ifr = document.createElement("iframe")
            ifr.id = "iframe-" + p
            ifr.src = "/?page="+p+"&iframe=1"
            ifr.width = "100%"
            ifr.height = "100%"
            ifr.style.margin = "0"
            ifr.style.padding = "0"
            ifr.style.border = "none"
            creaFinestra(p, ifr)
    });
    svg = div.querySelector("svg")
    svg.addEventListener("click", () => {
      loadPage(p, 'iframe=1')
    });

    finestra.appendChild(div)
})
function toggleWindowTwo() {
  if (finestra.style.display === 'none')
    finestra.style.display = 'block';
  else
    finestra.style.display = 'none';
}