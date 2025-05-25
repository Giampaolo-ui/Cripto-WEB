user=getCookie('username');
lvl = getCookie('timeline');


if(user && lvl){

    document.getElementById('logoutBtn').addEventListener('click', ()=>{
        deleteCookie('username');
        deleteCookie('timeline');
        window.location.reload();
    });

    const logoutBtn = document.getElementById("logoutBtn");
    const warning = document.getElementById("logoutWarning");

    // Al passaggio del mouse su Logout, mostro il warning
    logoutBtn.addEventListener("mouseenter", () => {
        warning.style.display = "block";
    });

    // Quando il mouse esce da Logout, nascondo il warning
    logoutBtn.addEventListener("mouseleave", () => {
        warning.style.display = "none";
    });
} else {


    const lvlInput=document.getElementById('level');
    const lvlVal=document.getElementById('levelVal');
    lvlInput.addEventListener('input',()=>lvlVal.textContent=lvlInput.value);

    document.getElementById('loginForm').addEventListener('submit',e=>{
        e.preventDefault();
        const u=document.getElementById('username').value.trim();
        const l=lvlInput.value;
        setCookie('username',u,7);
        setCookie('timeline', l, 7);
        window.location.reload();
    });
}
