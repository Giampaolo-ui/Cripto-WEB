async function createCard(id, title, description, svgString, arrow = true, hovered = false, status = "normal", click = null) {
    // 1️⃣ Crea il wrapper
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", "#"+id);

    // 2️⃣ Aggiungi lo stato hover se richiesto
    if (hovered) {
    card.classList.add("hover");
    }

    // 3️⃣ Aggiungi classe di stato se blocked/completed
    if (status === "blocked" || status === "completed") {
    card.classList.add(status);
    }

    // 4️⃣ Popola l’HTML interno
    card.innerHTML = `
        <span class="icon">
            ${svgString}
        </span>
        <h4>${title}</h4>
        <p>${description}</p>
        <div class="shine"></div>
        <div class="background">
            <div class="tiles">
            <div class="tile tile-1"></div>
            <div class="tile tile-2"></div>
            <div class="tile tile-3"></div>
            <div class="tile tile-4"></div>
            <div class="tile tile-5"></div>
            <div class="tile tile-6"></div>
            <div class="tile tile-7"></div>
            <div class="tile tile-8"></div>
            <div class="tile tile-9"></div>
            <div class="tile tile-10"></div>
            </div>
            <div class="line line-1"></div>
            <div class="line line-2"></div>
            <div class="line line-3"></div>
        </div>

        `;
    if (arrow)
        card.innerHTML +=
          '<svg class="icon-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#a39f9f"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7" stroke="#F3C623" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';
    div = document.createElement("div");
    document.querySelector(".grid").appendChild(card);

    if (click != null) {
        card.addEventListener("click", () => {
            click()
        });
    }
}

function notify(msg) {
    Divnotify = document.querySelector(".notify");
    Divnotify.querySelector("span").innerHTML = msg;
    Divnotify.style.opacity = 1;

    setTimeout(() => {
        Divnotify.style.opacity = 0;
    }, 3500);
}

function checkLogged(func) {
    if (!checkAuth())
        notify("Devi essere loggato per accedere a questa funzionalità");
    else
        func();
}

chapters = [
  // 1
    {
        id: 1,
        title: "La sicurezza nelle reti",
        description:
        "Scopri come proteggere i dati mentre viaggiano tra dispositivi con protocolli e tecniche di difesa.",
        svgString:
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 5C8.34315 5 7 6.34315 7 8C7 9.65685 8.34315 11 10 11C11.6569 11 13 9.65685 13 8C13 6.34315 11.6569 5 10 5ZM13.5058 11.565C14.4281 10.6579 15 9.39576 15 8C15 5.23858 12.7614 3 10 3C7.23858 3 5 5.23858 5 8C5 9.39827 5.57396 10.6625 6.49914 11.5699C3.74942 12.5366 2 14.6259 2 17C2 17.5523 2.44772 18 3 18C3.55228 18 4 17.5523 4 17C4 15.2701 5.93073 13 10 13C12.6152 13 14.4051 13.9719 15.2988 15.1157C15.6389 15.5509 16.2673 15.628 16.7025 15.288C17.1377 14.9479 17.2148 14.3195 16.8748 13.8843C16.0904 12.8804 14.9401 12.0686 13.5058 11.565ZM22.6139 15.2106C23.0499 15.5497 23.1284 16.178 22.7894 16.6139L18.1227 22.6139C17.9485 22.8379 17.6875 22.9773 17.4045 22.9975C17.1216 23.0177 16.8434 22.9167 16.6392 22.7198L14.3059 20.4698C13.9083 20.0865 13.8968 19.4534 14.2802 19.0559C14.6635 18.6583 15.2966 18.6468 15.6941 19.0302L17.2268 20.5081L21.2106 15.3861C21.5497 14.9501 22.178 14.8716 22.6139 15.2106Z" fill="#000000"></path> </g></svg>',
        arrow: true,
        hovered: false,
        status: "normal",
        click: () => {checkLogged(() => {loadPage("symmetric", "point=1")})}
    },
  // 2
    {
        id: 2,
        title: "Cos'è la crittografia?",
        description:
        "Una guida semplice per capire come i messaggi segreti vengono nascosti e protetti nel mondo digitale.",
        svgString:
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 5C8.34315 5 7 6.34315 7 8C7 9.65685 8.34315 11 10 11C11.6569 11 13 9.65685 13 8C13 6.34315 11.6569 5 10 5ZM13.5058 11.565C14.4281 10.6579 15 9.39576 15 8C15 5.23858 12.7614 3 10 3C7.23858 3 5 5.23858 5 8C5 9.39827 5.57396 10.6625 6.49914 11.5699C3.74942 12.5366 2 14.6259 2 17C2 17.5523 2.44772 18 3 18C3.55228 18 4 17.5523 4 17C4 15.2701 5.93073 13 10 13C12.6152 13 14.4051 13.9719 15.2988 15.1157C15.6389 15.5509 16.2673 15.628 16.7025 15.288C17.1377 14.9479 17.2148 14.3195 16.8748 13.8843C16.0904 12.8804 14.9401 12.0686 13.5058 11.565ZM22.6139 15.2106C23.0499 15.5497 23.1284 16.178 22.7894 16.6139L18.1227 22.6139C17.9485 22.8379 17.6875 22.9773 17.4045 22.9975C17.1216 23.0177 16.8434 22.9167 16.6392 22.7198L14.3059 20.4698C13.9083 20.0865 13.8968 19.4534 14.2802 19.0559C14.6635 18.6583 15.2966 18.6468 15.6941 19.0302L17.2268 20.5081L21.2106 15.3861C21.5497 14.9501 22.178 14.8716 22.6139 15.2106Z" fill="#000000"></path> </g></svg>',
        arrow: true,
        hovered: false,
        status: "normal",
        click: () => {checkLogged(() => {loadPage("symmetric", "point=2")})}
    },
  // 3
    {
        id: 3,
        title: "Crittoanalisi",
        description:
        "L’arte (e la scienza) di decifrare messaggi criptati. Chi vince tra codice e mente?",
        svgString:
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 5C8.34315 5 7 6.34315 7 8C7 9.65685 8.34315 11 10 11C11.6569 11 13 9.65685 13 8C13 6.34315 11.6569 5 10 5ZM13.5058 11.565C14.4281 10.6579 15 9.39576 15 8C15 5.23858 12.7614 3 10 3C7.23858 3 5 5.23858 5 8C5 9.39827 5.57396 10.6625 6.49914 11.5699C3.74942 12.5366 2 14.6259 2 17C2 17.5523 2.44772 18 3 18C3.55228 18 4 17.5523 4 17C4 15.2701 5.93073 13 10 13C12.6152 13 14.4051 13.9719 15.2988 15.1157C15.6389 15.5509 16.2673 15.628 16.7025 15.288C17.1377 14.9479 17.2148 14.3195 16.8748 13.8843C16.0904 12.8804 14.9401 12.0686 13.5058 11.565ZM22.6139 15.2106C23.0499 15.5497 23.1284 16.178 22.7894 16.6139L18.1227 22.6139C17.9485 22.8379 17.6875 22.9773 17.4045 22.9975C17.1216 23.0177 16.8434 22.9167 16.6392 22.7198L14.3059 20.4698C13.9083 20.0865 13.8968 19.4534 14.2802 19.0559C14.6635 18.6583 15.2966 18.6468 15.6941 19.0302L17.2268 20.5081L21.2106 15.3861C21.5497 14.9501 22.178 14.8716 22.6139 15.2106Z" fill="#000000"></path> </g></svg>',
        arrow: true,
        hovered: false,
        status: "normal",
        click: () => {checkLogged(() => {loadPage("symmetric", "point=3")})}
    },
    // 4
    {
        id: 4,
        title: "Cifrario DES",
        description:
        "Un tuffo nel passato con uno dei primi algoritmi di cifratura simmetrica più usati al mondo.",
        svgString:
        '<svg fill="#000000" viewBox="0 0 14 14" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m 12.221626,6.77081 -1.509445,0 c -0.242414,0 -0.438991,-0.19656 -0.438991,-0.439 0,-0.24243 0.196553,-0.43899 0.438991,-0.43899 l 1.509445,0 c 0.242414,0 0.438992,0.19656 0.438992,0.43899 -2.5e-5,0.24244 -0.196578,0.439 -0.438992,0.439 z M 9.67311,4.41877 C 9.546265,4.41877 9.420545,4.36417 9.333789,4.25856 9.179795,4.0713 9.206748,3.79467 9.394009,3.64068 l 1.182744,-0.97252 c 0.187455,-0.15407 0.464014,-0.12694 0.617886,0.0603 0.153995,0.18726 0.127041,0.46389 -0.06022,0.61788 L 9.951675,4.31886 C 9.869935,4.38606 9.771191,4.41876 9.67311,4.41876 Z M 6.999975,3.38498 c -0.242414,0 -0.438992,-0.19655 -0.438992,-0.43899 l 0,-1.507 C 6.560983,1.19655 6.757537,1 6.999975,1 7.242389,1 7.438967,1.19655 7.438967,1.43899 l 0,1.507 C 7.438943,3.18843 7.242389,3.38498 6.999975,3.38498 Z M 4.32689,4.41877 c -0.09808,0 -0.196847,-0.0327 -0.278565,-0.0999 L 2.865581,3.34636 C 2.678322,3.19236 2.651368,2.91573 2.805361,2.72847 2.959307,2.54126 3.235866,2.51416 3.423247,2.66817 l 1.182744,0.97252 c 0.187259,0.154 0.214213,0.43063 0.06022,0.61789 -0.08676,0.10554 -0.21255,0.16018 -0.339321,0.16018 z m -1.053283,2.35204 -1.495233,0 c -0.242414,0 -0.438992,-0.19656 -0.438992,-0.439 0,-0.24243 0.196553,-0.43899 0.438992,-0.43899 l 1.495233,0 c 0.242415,0 0.438992,0.19656 0.438992,0.43899 0,0.24244 -0.196577,0.439 -0.438992,0.439 z m 6.824627,0.68341 -6.196468,0 c -0.26455,0 -0.480988,0.21646 -0.480988,0.48099 l 0,4.58378 C 3.420778,12.78354 3.637216,13 3.901766,13 l 6.196468,0 c 0.264549,0 0.480988,-0.21646 0.480988,-0.48101 l 0,-4.58378 c 0,-0.26455 -0.216439,-0.48099 -0.480988,-0.48099 z m -2.784179,3.00954 0,0.62109 c 0,0.17334 -0.140616,0.31398 -0.313982,0.31398 -0.173366,0 -0.313981,-0.14061 -0.313981,-0.31398 l 0,-0.62099 C 6.492938,10.35426 6.362425,10.14719 6.362425,9.90928 6.362425,9.55716 6.647887,9.2717 7,9.2717 c 0.352113,0 0.637575,0.28546 0.637575,0.63758 0,0.23791 -0.130489,0.44495 -0.32352,0.55448 z m 2.202126,-3.00954 -1.443014,0 0,-0.74089 C 8.073167,6.12164 7.59169,5.64016 7,5.64016 c -0.59169,0 -1.073168,0.48148 -1.073168,1.07317 l 0,0.74089 -1.443013,0 0,-0.74089 C 4.483819,5.32591 5.612582,4.19715 7,4.19715 c 1.387418,0 2.516181,1.12876 2.516181,2.51618 l 0,0.74089 z"></path></g></svg>',
        arrow: true,
        hovered: false,
        status: "blocked",
        click: () => {checkLogged(() => {loadPage("symmetric", "point=4")})}
    },
    // 5
    {
        id: 5,
        title: "Triple DES (3-DES)",
        description:
        "Il nuovo standard! Più sicuro, più veloce, più moderno. AES è ovunque: nei tuoi messaggi, nei pagamenti e nelle app. Curioso?",
        svgString:
        '<svg fill="#000000" height="80px" width="80px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" transform="rotate(0)"><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="17.408"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M115.2,256l49.067-49.067c8.533-8.533,8.533-21.333,0-29.867s-21.333-8.533-29.867,0l-64,64 c-8.533,8.533-6.4,21.333,0,29.867l2.133,2.133l61.867,61.867c8.533,8.533,21.333,8.533,29.867,0s8.533-21.333,0-29.867L115.2,256 z"></path> </g> </g> <g> <g> <path d="M441.6,241.067l-64-64c-8.533-8.533-21.333-8.533-29.867,0c-8.533,8.533-8.533,21.333,0,29.867L396.8,256l-49.067,49.067 c-8.533,8.533-8.533,21.333,0,29.867c8.533,8.533,21.333,8.533,29.867,0l64-64C450.133,262.4,448,249.6,441.6,241.067z"></path> </g> </g> <g> <g> <path d="M256,136.533c-34.133,0-61.867,27.733-61.867,61.867c0,12.8,8.533,21.333,21.333,21.333S236.8,211.2,236.8,198.4 c0-10.667,8.533-19.2,19.2-19.2s19.2,8.533,19.2,19.2c0,6.4-2.133,10.667-6.4,14.933c-21.333,19.2-34.133,44.8-34.133,74.667 v4.267c0,12.8,8.533,21.333,21.333,21.333c12.8,0,21.333-8.533,21.333-21.333V288c0-17.067,6.4-32,19.2-42.667 c12.8-10.667,21.333-27.733,21.333-46.933C317.867,164.267,290.133,136.533,256,136.533z"></path> </g> </g> <g> <g> <path d="M256,341.333c-12.8,0-21.333,8.533-21.333,21.333S243.2,384,256,384s21.333-8.533,21.333-21.333 S268.8,341.333,256,341.333z"></path> </g> </g> </g></svg>',
        arrow: true,
        hovered: false,
        status: "blocked",
        click: () => {checkLogged(() => {loadPage("symmetric", "point=5")})}
    },
    // 6
    {
        id: 6,
        title: "IDEA",
        description:
        "Il nuovo standard! Più sicuro, più veloce, più moderno. AES è ovunque: nei tuoi messaggi, nei pagamenti e nelle app. Curioso?",
        svgString:
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3 10.4167C3 7.21907 3 5.62028 3.37752 5.08241C3.75503 4.54454 5.25832 4.02996 8.26491 3.00079L8.83772 2.80472C10.405 2.26824 11.1886 2 12 2C12.8114 2 13.595 2.26824 15.1623 2.80472L15.7351 3.00079C18.7417 4.02996 20.245 4.54454 20.6225 5.08241C21 5.62028 21 7.21907 21 10.4167V11.9914C21 17.6294 16.761 20.3655 14.1014 21.5273C13.38 21.8424 13.0193 22 12 22C10.9807 22 10.62 21.8424 9.89856 21.5273C7.23896 20.3655 3 17.6294 3 11.9914V10.4167ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9ZM12 17C16 17 16 16.1046 16 15C16 13.8954 14.2091 13 12 13C9.79086 13 8 13.8954 8 15C8 16.1046 8 17 12 17Z" fill="#1C274C"></path> </g></svg>',
        arrow: true,
        hovered: false,
        status: "blocked",
        click: () => {checkLogged(() => {loadPage("symmetric", "point=6")})}
    },
    // 7
    {
        id: 7,
        title: "AES",
        description:
        "Un gigante della matematica applicata alla sicurezza. Scopri come funziona l’algoritmo RSA e perché è stato rivoluzionario per la cifratura!",
        svgString:
        '<svg fill="#000000" height="80px" width="80px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" transform="rotate(0)"><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="17.408"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M115.2,256l49.067-49.067c8.533-8.533,8.533-21.333,0-29.867s-21.333-8.533-29.867,0l-64,64 c-8.533,8.533-6.4,21.333,0,29.867l2.133,2.133l61.867,61.867c8.533,8.533,21.333,8.533,29.867,0s8.533-21.333,0-29.867L115.2,256 z"></path> </g> </g> <g> <g> <path d="M441.6,241.067l-64-64c-8.533-8.533-21.333-8.533-29.867,0c-8.533,8.533-8.533,21.333,0,29.867L396.8,256l-49.067,49.067 c-8.533,8.533-8.533,21.333,0,29.867c8.533,8.533,21.333,8.533,29.867,0l64-64C450.133,262.4,448,249.6,441.6,241.067z"></path> </g> </g> <g> <g> <path d="M256,136.533c-34.133,0-61.867,27.733-61.867,61.867c0,12.8,8.533,21.333,21.333,21.333S236.8,211.2,236.8,198.4 c0-10.667,8.533-19.2,19.2-19.2s19.2,8.533,19.2,19.2c0,6.4-2.133,10.667-6.4,14.933c-21.333,19.2-34.133,44.8-34.133,74.667 v4.267c0,12.8,8.533,21.333,21.333,21.333c12.8,0,21.333-8.533,21.333-21.333V288c0-17.067,6.4-32,19.2-42.667 c12.8-10.667,21.333-27.733,21.333-46.933C317.867,164.267,290.133,136.533,256,136.533z"></path> </g> </g> <g> <g> <path d="M256,341.333c-12.8,0-21.333,8.533-21.333,21.333S243.2,384,256,384s21.333-8.533,21.333-21.333 S268.8,341.333,256,341.333z"></path> </g> </g> </g></svg>',
        arrow: true,
        hovered: false,
        status: "blocked",
        click: () => {checkLogged(() => {loadPage("symmetric", "point=7")})}
    },
    // 8
    {
        id: 8,
        title: "Limiti simmetrici",
        description:
        "DES, AES, RSA... chi vince? Qui li mettiamo a confronto per capire punti di forza e debolezze. Spoiler: dipende da cosa ti serve!",
        svgString:
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.5 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8V7.2C3 6.0799 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H15.8C16.9201 4 17.4802 4 17.908 4.21799C18.2843 4.40973 18.5903 4.71569 18.782 5.09202C19 5.51984 19 6.0799 19 7.2V8H3M3 12H11V8M3 16H9M7 4V8M7 12V16M15 4V8M19.8284 19.8284C18.2663 21.3905 15.7337 21.3905 14.1716 19.8284C13.3905 19.0474 13 18.0237 13 17C13 15.9763 13.3905 14.9526 14.1716 14.1716C14.1716 14.1716 14.5 15 15.5 15.5C15.5 14.5 15.75 13 16.9929 12C18 13 19.0456 13.3887 19.8284 14.1716C20.6095 14.9526 21 15.9763 21 17C21 18.0237 20.6095 19.0474 19.8284 19.8284Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>',
        arrow: true,
        hovered: false,
        status: "blocked",
        click: () => {checkLogged(() => {loadPage("symmetric", "point=8")})}
    },
    // 9
    {
        id: 9,
        title: "Crittografia Asimmetrica",
        description:
        "Un sistema di cifratura che utilizza una coppia di chiavi: una pubblica per cifrare i messaggi e una privata per decifrarli. È la base della sicurezza online moderna, come nelle comunicazioni HTTPS!",
        svgString:
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 5C8.34315 5 7 6.34315 7 8C7 9.65685 8.34315 11 10 11C11.6569 11 13 9.65685 13 8C13 6.34315 11.6569 5 10 5ZM13.5058 11.565C14.4281 10.6579 15 9.39576 15 8C15 5.23858 12.7614 3 10 3C7.23858 3 5 5.23858 5 8C5 9.39827 5.57396 10.6625 6.49914 11.5699C3.74942 12.5366 2 14.6259 2 17C2 17.5523 2.44772 18 3 18C3.55228 18 4 17.5523 4 17C4 15.2701 5.93073 13 10 13C12.6152 13 14.4051 13.9719 15.2988 15.1157C15.6389 15.5509 16.2673 15.628 16.7025 15.288C17.1377 14.9479 17.2148 14.3195 16.8748 13.8843C16.0904 12.8804 14.9401 12.0686 13.5058 11.565ZM22.6139 15.2106C23.0499 15.5497 23.1284 16.178 22.7894 16.6139L18.1227 22.6139C17.9485 22.8379 17.6875 22.9773 17.4045 22.9975C17.1216 23.0177 16.8434 22.9167 16.6392 22.7198L14.3059 20.4698C13.9083 20.0865 13.8968 19.4534 14.2802 19.0559C14.6635 18.6583 15.2966 18.6468 15.6941 19.0302L17.2268 20.5081L21.2106 15.3861C21.5497 14.9501 22.178 14.8716 22.6139 15.2106Z" fill="#000000"></path> </g></svg>',
        arrow: true,
        hovered: false,
        status: "blocked",
        click: () => {checkLogged(() => {loadPage("asymmetric", "point=1")})}
    },
    // 10
    {
        id: 10,
        title: "Algoritmo RSA",
        description: "Uno degli algoritmi più famosi per la crittografia asimmetrica. Usa numeri primi giganti per garantire una sicurezza 🔥 a prova di hacker! Viene usato per proteggere dati sensibili in moltissimi ambiti.",
        svgString:
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" style="padding: 20px;" d="M7.78799 2H16.212C17.0305 1.99999 17.7061 1.99998 18.2561 2.04565C18.8274 2.0931 19.3523 2.19496 19.8439 2.45035C20.5745 2.82985 21.1702 3.42553 21.5497 4.1561C21.805 4.64774 21.9069 5.17258 21.9543 5.74393C22 6.29394 22 6.96949 22 7.78802V11.212C22 12.0305 22 12.7061 21.9543 13.2561C21.9069 13.8274 21.805 14.3523 21.5497 14.8439C21.1702 15.5745 20.5745 16.1702 19.8439 16.5497C19.3523 16.805 18.8274 16.9069 18.2561 16.9544C17.7061 17 17.0305 17 16.212 17H13V19H17C17.5523 19 18 19.4477 18 20C18 20.5523 17.5523 21 17 21H7C6.44772 21 6 20.5523 6 20C6 19.4477 6.44772 19 7 19H11V17H7.78798C6.96946 17 6.29393 17 5.74393 16.9544C5.17258 16.9069 4.64774 16.805 4.1561 16.5497C3.42553 16.1702 2.82985 15.5745 2.45035 14.8439C2.19496 14.3523 2.0931 13.8274 2.04565 13.2561C1.99998 12.7061 1.99999 12.0305 2 11.212V7.78799C1.99999 6.96947 1.99998 6.29393 2.04565 5.74393C2.0931 5.17258 2.19496 4.64774 2.45035 4.1561C2.82985 3.42553 3.42553 2.82985 4.1561 2.45035C4.64774 2.19496 5.17258 2.0931 5.74393 2.04565C6.29393 1.99998 6.96947 1.99999 7.78799 2ZM16.17 15C17.041 15 17.6331 14.9992 18.0905 14.9612C18.536 14.9242 18.7634 14.8572 18.9219 14.7748C19.2872 14.5851 19.5851 14.2872 19.7748 13.9219C19.8572 13.7634 19.9242 13.536 19.9612 13.0905C19.9992 12.6331 20 12.041 20 11.17V7.83C20 6.95898 19.9992 6.36686 19.9612 5.90945C19.9242 5.46401 19.8572 5.23663 19.7748 5.07805C19.5851 4.71277 19.2872 4.41493 18.9219 4.22517C18.7634 4.1428 18.536 4.07578 18.0905 4.03879C17.6331 4.0008 17.041 4 16.17 4H7.83C6.95898 4 6.36686 4.0008 5.90945 4.03879C5.46401 4.07578 5.23663 4.1428 5.07805 4.22517C4.71277 4.41493 4.41493 4.71277 4.22517 5.07805C4.1428 5.23663 4.07578 5.46401 4.03879 5.90945C4.0008 6.36686 4 6.95898 4 7.83V11.17C4 12.041 4.0008 12.6331 4.03879 13.0905C4.07578 13.536 4.1428 13.7634 4.22517 13.9219C4.41493 14.2872 4.71277 14.5851 5.07805 14.7748C5.23663 14.8572 5.46401 14.9242 5.90945 14.9612C6.36686 14.9992 6.95898 15 7.83 15H16.17Z" fill="#0F1729"></path> </g></svg>',
        arrow: true,
        hovered: false,
        status: "blocked",
        click: () => {checkLogged(() => {loadPage("asymmetric", "point=2")})}
    },
    // 11
    {
        id: 11,
        title: "Crittografia Ibrida",
        description: "La combinazione perfetta tra crittografia simmetrica (veloce) e asimmetrica (sicura): cifri i dati con una chiave simmetrica, e poi proteggi quella chiave usando l’asimmetrica.",
        svgString:
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" style="padding: 20px;" d="M7.78799 2H16.212C17.0305 1.99999 17.7061 1.99998 18.2561 2.04565C18.8274 2.0931 19.3523 2.19496 19.8439 2.45035C20.5745 2.82985 21.1702 3.42553 21.5497 4.1561C21.805 4.64774 21.9069 5.17258 21.9543 5.74393C22 6.29394 22 6.96949 22 7.78802V11.212C22 12.0305 22 12.7061 21.9543 13.2561C21.9069 13.8274 21.805 14.3523 21.5497 14.8439C21.1702 15.5745 20.5745 16.1702 19.8439 16.5497C19.3523 16.805 18.8274 16.9069 18.2561 16.9544C17.7061 17 17.0305 17 16.212 17H13V19H17C17.5523 19 18 19.4477 18 20C18 20.5523 17.5523 21 17 21H7C6.44772 21 6 20.5523 6 20C6 19.4477 6.44772 19 7 19H11V17H7.78798C6.96946 17 6.29393 17 5.74393 16.9544C5.17258 16.9069 4.64774 16.805 4.1561 16.5497C3.42553 16.1702 2.82985 15.5745 2.45035 14.8439C2.19496 14.3523 2.0931 13.8274 2.04565 13.2561C1.99998 12.7061 1.99999 12.0305 2 11.212V7.78799C1.99999 6.96947 1.99998 6.29393 2.04565 5.74393C2.0931 5.17258 2.19496 4.64774 2.45035 4.1561C2.82985 3.42553 3.42553 2.82985 4.1561 2.45035C4.64774 2.19496 5.17258 2.0931 5.74393 2.04565C6.29393 1.99998 6.96947 1.99999 7.78799 2ZM16.17 15C17.041 15 17.6331 14.9992 18.0905 14.9612C18.536 14.9242 18.7634 14.8572 18.9219 14.7748C19.2872 14.5851 19.5851 14.2872 19.7748 13.9219C19.8572 13.7634 19.9242 13.536 19.9612 13.0905C19.9992 12.6331 20 12.041 20 11.17V7.83C20 6.95898 19.9992 6.36686 19.9612 5.90945C19.9242 5.46401 19.8572 5.23663 19.7748 5.07805C19.5851 4.71277 19.2872 4.41493 18.9219 4.22517C18.7634 4.1428 18.536 4.07578 18.0905 4.03879C17.6331 4.0008 17.041 4 16.17 4H7.83C6.95898 4 6.36686 4.0008 5.90945 4.03879C5.46401 4.07578 5.23663 4.1428 5.07805 4.22517C4.71277 4.41493 4.41493 4.71277 4.22517 5.07805C4.1428 5.23663 4.07578 5.46401 4.03879 5.90945C4.0008 6.36686 4 6.95898 4 7.83V11.17C4 12.041 4.0008 12.6331 4.03879 13.0905C4.07578 13.536 4.1428 13.7634 4.22517 13.9219C4.41493 14.2872 4.71277 14.5851 5.07805 14.7748C5.23663 14.8572 5.46401 14.9242 5.90945 14.9612C6.36686 14.9992 6.95898 15 7.83 15H16.17Z" fill="#0F1729"></path> </g></svg>',
        arrow: true,
        hovered: false,
        status: "blocked",
        click: () => {checkLogged(() => {loadPage("asymmetric", "point=3")})}
    },
    // Work
    {
        id: 100,
        title: "Work in Progress",
        description:
        "Sitamo lavorando a questo capitolo, torneremo presto con nuove informazioni.",
        svgString:
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.567 9.8895C12.2495 8.90124 12.114 7.5637 11.247 6.7325C10.3679 5.88806 9.02339 5.75928 7.99998 6.4215C7.57983 6.69308 7.25013 7.0837 7.05298 7.5435C6.85867 7.99881 6.80774 8.50252 6.90698 8.9875C7.00665 9.47472 7.25054 9.92071 7.60698 10.2675C7.97021 10.6186 8.42786 10.8563 8.92398 10.9515C9.42353 11.049 9.94062 11.0001 10.413 10.8105C10.8798 10.6237 11.2812 10.3033 11.567 9.8895Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.433 17.8895C11.7504 16.9012 11.886 15.5637 12.753 14.7325C13.6321 13.8881 14.9766 13.7593 16 14.4215C16.4202 14.6931 16.7498 15.0837 16.947 15.5435C17.1413 15.9988 17.1922 16.5025 17.093 16.9875C16.9933 17.4747 16.7494 17.9207 16.393 18.2675C16.0298 18.6186 15.5721 18.8563 15.076 18.9515C14.5773 19.0481 14.0614 18.9988 13.59 18.8095C13.1222 18.6234 12.7197 18.3034 12.433 17.8895V17.8895Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 7.75049C11.5858 7.75049 11.25 8.08627 11.25 8.50049C11.25 8.9147 11.5858 9.25049 12 9.25049V7.75049ZM19 9.25049C19.4142 9.25049 19.75 8.9147 19.75 8.50049C19.75 8.08627 19.4142 7.75049 19 7.75049V9.25049ZM6.857 9.25049C7.27121 9.25049 7.607 8.9147 7.607 8.50049C7.607 8.08627 7.27121 7.75049 6.857 7.75049V9.25049ZM5 7.75049C4.58579 7.75049 4.25 8.08627 4.25 8.50049C4.25 8.9147 4.58579 9.25049 5 9.25049V7.75049ZM12 17.2505C12.4142 17.2505 12.75 16.9147 12.75 16.5005C12.75 16.0863 12.4142 15.7505 12 15.7505V17.2505ZM5 15.7505C4.58579 15.7505 4.25 16.0863 4.25 16.5005C4.25 16.9147 4.58579 17.2505 5 17.2505V15.7505ZM17.143 15.7505C16.7288 15.7505 16.393 16.0863 16.393 16.5005C16.393 16.9147 16.7288 17.2505 17.143 17.2505V15.7505ZM19 17.2505C19.4142 17.2505 19.75 16.9147 19.75 16.5005C19.75 16.0863 19.4142 15.7505 19 15.7505V17.2505ZM12 9.25049H19V7.75049H12V9.25049ZM6.857 7.75049H5V9.25049H6.857V7.75049ZM12 15.7505H5V17.2505H12V15.7505ZM17.143 17.2505H19V15.7505H17.143V17.2505Z" fill="#000000"></path> </g></svg>',
        arrow: false,
        hovered: true,
        status: "blocked",
        click: () => { notify("Questo capitolo è in fase di sviluppo, torneremo presto con nuove informazioni."); }
    },
];


// Check Login
if (!checkAuth())
    chapters.forEach((card) => { card.status = 'blocked'; card.hovered = true; });

// Check lever
lvl = getCookie("timeline") !== '' ? parseInt(getCookie("timeline")) : 0;
for (let i = 0; i < chapters.length; i++) {
    if (chapters[i].id <= lvl) {
        chapters[i].status = 'completed';
        chapters[i].hovered = true;
    } else if (!chapters[i].hovered && chapters[i].id !== lvl+1) {
        chapters[i].click = () => {
            checkLogged(() => {
            notify("Questo capitolo è bloccato, completa i capitoli precedenti per sbloccarlo.");
        })}
        chapters[i].status = 'blocked';
    }  else if(!chapters[i].hovered && chapters[i].id == lvl+1) {
        chapters[i].status = '';
    }
}



chapters.forEach((element) => {
    (async () => {
    await createCard(
        element.id,
        element.title,
        element.description,
        element.svgString,
        element.arrow,
        element.hovered,
        element.status,
        element.click
    );
    })();
});


