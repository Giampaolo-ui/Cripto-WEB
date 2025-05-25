const blob  = document.getElementById('blob');
overLink = false;
blobOnLink = false;
blobEnable = false;
blobHoverColor = "#38bdf8"
blobColor = "#38bdf8"

function checkBlob(doc = null) {
    if (!doc) doc = document;
    if (!doc.querySelector('blob')) {
        blob.style.display = 'none';
        document.body.style.cursor = "default";
        blobEnable = false;
        return;
    }
    blobEnable = true;

    // Cambia colore del blob
    overLink = false;
    blob.style.width        = '15px';
    blob.style.height       = '15px';
    blob.style.borderRadius = '50%';
    blob.style.backgroundColor = doc.querySelector('blob').getAttribute('color') || '#38bdf8';

    blobColor = blob.style.backgroundColor;
    blobHoverColor = doc.querySelector('blob').getAttribute('hover-color') || blob.style.backgroundColor;
    blobOnLink = doc.querySelector('blob').getAttribute('link') || false;

    if (blobEnable) document.body.style.cursor = 'none';
}

window.bus.on("LoadPage", (data) => {
  checkBlob(data.doc);
 });

window.bus.on("CheckLink", (data) => { 
  data.link.addEventListener("mouseenter", (e) => {
        if (!blobOnLink) return;

        overLink = true;
        const rect = data.link.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        // Blob diventa pulsante della navbar
        blob.style.width = rect.width + "px";
        blob.style.height = rect.height + "px";
        blob.style.borderRadius = "8px";
        blob.style.left = x + "px";
        blob.style.top = y + "px";
        blob.style.backgroundColor = blobHoverColor;
    });

    data.link.addEventListener("mouseleave", () => {
        if (!blobEnable) return;
        blob.style.backgroundColor = blobColor;
        overLink = false;
    });
});

// Pallina segue il cursore
document.body.addEventListener('mousemove', e => {
    if (!blobEnable) {
        blob.style.display = 'none';
        content.style.cursor = 'default';
        return;
    };

    if (!overLink) {
      blob.style.width        = '15px';
      blob.style.height       = '15px';
      blob.style.borderRadius = '50%';
      blob.style.left         = e.clientX + 'px';
      blob.style.top          = e.clientY + 'px';
    }
});
