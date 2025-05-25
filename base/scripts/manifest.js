import * as config from "/config.js";


// title
if (config.AppName) {
    if (typeof config.AppName === 'object') {
      
        window.bus.on("LoadPage", (data) => {
            if (data.found) 
            document.title = config.AppName[data.page] || config.AppName['*'];
        });
      
    } else {
        document.title = config.AppName;
    }
}


document.head.innerHTML += '<link rel="shortcut icon" href="'+config.AppIcon.Icon+'" type="'+config.AppIcon.Type+'">';

// IdexPage
window.IndexPage = config.IndexPage || null;
window.Path = config.Path


if (config.OSMode) {
    window.IndexPage = "@/base/os/"
    window.Path.os = '/base/os/';
}

window.config = config
