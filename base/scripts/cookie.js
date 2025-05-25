
// funzioni cookie
function setCookie(n,v,d){
    const dt=new Date();
    dt.setTime(dt.getTime()+d*864e5);
    document.cookie=`${n}=${encodeURIComponent(v)}; expires=${dt.toUTCString()}; path=/;`;
}

function getCookie(n){
    return document.cookie.split('; ').reduce((r,c)=>{
      const [k,v]=c.split('='); return k===n?decodeURIComponent(v):r;
    },'');
}

function deleteCookie(n){
    document.cookie=`${n}=; Max-Age=0; path=/;`;
}
