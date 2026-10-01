/* ===== UTILIDADES: atajos, fecha, avisos y etiquetas de estado ===== */
const $=id=>document.getElementById(id);
const hoy=()=>new Date().toLocaleString("es-CO",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});
function toast(m){const t=$("toast");t.textContent=m;t.classList.add("show");clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove("show"),2400)}
const pill=e=>{const c=e==="En transporte"?"transp":e==="En reparto"?"reparto":e==="Entregada"?"entregada":"sin";return `<span class="pill p-${c}">${e}</span>`};
