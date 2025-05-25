// Container e funzione timeline
pcontainer = document.getElementById('progressContainer');
fillEl = document.getElementById('progressFill');
setTimeLine = () => { };
getCurrentStep = () => { };

// Listener per evento custom
window.bus.on('LoadPage', (data) => {
  const timeline = data.doc.querySelector('timeline');
  if (!timeline) {
    pcontainer.style.display = 'none';
    return;
  };

  // Leggi attributi personalizzati
  const width = parseInt(timeline.getAttribute('width')) || 35;
  const background = timeline.getAttribute('bg') || '#1f1f1f';
  const color = timeline.getAttribute('color') || '#00bfff';
  const bottom = timeline.getAttribute("bottom") || "20px";
  const left = timeline.getAttribute("left") || 0;
  const steps = parseInt(timeline.getAttribute('steps')) || 5;
  const duration = parseInt(timeline.getAttribute('duration')) || 2000;
  const vertical = timeline.getAttribute('vertical') || 'false';

  // Mostra e configura container
  pcontainer.style.display = 'block';
  pcontainer.style.width = `${width}%`;
  pcontainer.style.backgroundColor = background;
  pcontainer.style.bottom = `${bottom}`;
  if (left)
    pcontainer.style.left = `${left}`;

  if (vertical === 'true') {
    pcontainer.style.transform = "rotate(90deg) translateX(-50%)";
  }

  // Configura fill element
  fillEl.style.backgroundColor = color;
  fillEl.style.setProperty('--duration', `${duration}ms`);

  // Funzione per avanzare o indietreggiare in modo fluido
  setTimeLine = (step) => {
    step = Math.round(step);
    let idx = Math.min(Math.max(step, 0), steps);
    const percent = (idx / steps) * 100;
    fillEl.style.width = `${percent}%`;
  };

  getCurrentStep = () => {
    const fillEl = document.getElementById("progressFill");
    const widthPercent =
      parseFloat(getComputedStyle(fillEl).width) /
      fillEl.parentElement.offsetWidth;
    return Math.round(widthPercent * steps);
  }

});
