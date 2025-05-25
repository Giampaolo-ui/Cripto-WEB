export const IndexPage = 'home';
// export const AppName = "Cryptography Site";
export const AppName = {
    "home": "Cryptography Site",
    "login": "Login",
    "section": "Chapters",
    "about": "About",
    "symmetric": "Symmetric Cryptography",
    "*": "Default"
}

export const Path = {
    "home": "/page/home/",
    "login": "/page/login/",
    "logout": "/page/login/logout",
    "section": "/page/section",
    "about": "/page/about/",
    "symmetric": "/page/symmetric",
    "asymmetric": "/page/asymmetric",
    "sym": "/page/symmetric/",
    "asym": "/page/asymmetric/",
    "oldlogin": "/page/old-login",
    "terminal": "/page/terminal",
    "help": "/page/help",
}

export const Addons = [
    'blob',
    'timeline',
    "auth"
];

export const AppIcon = {
    Icon: '/assets/icon.png',
    Type: 'image/png'
};

export const Auth = {
    loginPath: 'login',
    redirectPath: 'home',
    dashboardPath: 'logout',
    expiresDay: 7,
    authVars: ['timeline'],
}

// Easter Egg
export const OSMode = true;
