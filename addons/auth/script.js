// auth.js

// Preleva i parametri di percorso e durata da config
const {
  authVars,        // es. ['lvl','data','theme']
  loginPath,
  redirectPath,
  dashboardPath,
  expiresDay
} = window.config.Auth;

// Imposta un cookie: nome, valore e durata (giorni)
function setCookie(name, value, days = expiresDay) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Legge il valore di un cookie
function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const [key, val] = v.split('=');
    return key === name ? decodeURIComponent(val) : r;
  }, '');
}

// Cancella un cookie
function deleteCookie(name) {
  setCookie(name, '', -1);
}

// Effettua il login: salva username e tutte le variabili passate,
// poi reindirizza alla dashboard
// extraData è un oggetto { lvl: '5', data: '...', theme: 'dark', ... }
function login(username, extraData = {}) {
  // 1) salva username
  setCookie('auth_user', username);

  // 2) salva solo le variabili configurate in authVars, prendendole da extraData
  authVars.forEach((varName) => {
    if (varName in extraData) {
      setCookie(varName, extraData[varName]);
    }
  });

  // 3) redirect
  loadPage(dashboardPath);
}

// Controlla l'autenticazione: se non loggato, rimanda al login
function checkAuth() {
    if (!getCookie('auth_user')) {
        return false;
    }
    return true;
}

// Effettua il logout: cancella username e tutte le authVars, poi torna al login
function logout() {
    deleteCookie('auth_user');
    authVars.forEach(deleteCookie);
    loadPage(redirectPath);
}
