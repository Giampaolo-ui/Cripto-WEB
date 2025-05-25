matrixContainer = document.getElementById("matrix");
function createNumber() {
    const number = document.createElement("div");
    number.classList.add("number");
    number.style.left = `${Math.random() * 100}%`;
    number.style.top = `${Math.random() * 100}%`;
    number.style.animationDuration = `${Math.random() * 2 + 2}s`;
    number.textContent = Math.floor(Math.random() * 10);
    matrixContainer.appendChild(number);

    setTimeout(() => {
    number.remove();
    }, 5000);
}

setInterval(createNumber, 10);