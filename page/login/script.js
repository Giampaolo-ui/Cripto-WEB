// user=getCookie('username');
// lvl = getCookie('timeline');


// if(user && lvl){

//     document.getElementById('logoutBtn').addEventListener('click', ()=>{
//         deleteCookie('username');
//         deleteCookie('timeline');
//         window.location.reload();
//     });

//     const logoutBtn = document.getElementById("logoutBtn");
//     const warning = document.getElementById("logoutWarning");

//     // Al passaggio del mouse su Logout, mostro il warning
//     logoutBtn.addEventListener("mouseenter", () => {
//         warning.style.display = "block";
//     });

//     // Quando il mouse esce da Logout, nascondo il warning
//     logoutBtn.addEventListener("mouseleave", () => {
//         warning.style.display = "none";
//     });
// } else {


//     const lvlInput=document.getElementById('level');
//     const lvlVal=document.getElementById('levelVal');
//     lvlInput.addEventListener('input',()=>lvlVal.textContent=lvlInput.value);

//     document.getElementById('loginForm').addEventListener('submit',e=>{
//         e.preventDefault();
//         const u=document.getElementById('username').value.trim();
//         const l=lvlInput.value;
//         setCookie('username',u,7);
//         setCookie('timeline', l, 7);
//         window.location.reload();
//     });
// }

levelSlider = document.getElementById("level");
levelDisplay = document.getElementById("levelDisplay");

levelSlider.addEventListener("input", () => {
    levelDisplay.textContent = levelSlider.value;
});

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


function submitClick() {
    const nickname = document.querySelector("#nickname").value;
    const lvl = document.querySelector("#level").value;

    if (nickname) login(nickname, {timeline: lvl})
}