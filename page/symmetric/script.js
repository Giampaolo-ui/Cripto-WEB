





sections = document.querySelectorAll("main section");

observer = new IntersectionObserver(
(entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        const index = [...sections].indexOf(entry.target);
        const progress = ((index + 1) / sections.length) * 100;
        console.log(`Sezione visibile: ${index + 1}`);
        setTimeLine(index + 1)

        if ((index+1) > lvl)
            setCookie("timeline", index+1, 7);

    }
    });
},
{
    threshold: 0.5, // Attiva quando almeno il 50% della sezione è visibile
}
);
window.bus.on('LoadPage', () => {
    lvl = getCookie("timeline")
    if (lvl === '')
        lvl = 0

    const Rlvl = getFromURL("point");
    if (Rlvl) {
        // Scroll successivo dopo un'altra attesa
        document.getElementById("section" + Rlvl).scrollIntoView({ behavior: "smooth" });
        setTimeLine(Rlvl);
    } else {
        // Scroll iniziale
        document.getElementById("section" + lvl).scrollIntoView({ behavior: "smooth" });
        setTimeLine(lvl);
    }

    sections.forEach((section) => {
        observer.observe(section);
    });
})