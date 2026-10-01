/* ===== ESTADO: datos de la sesión y guardado en el navegador ===== */
let S;try{S=JSON.parse(localStorage.getItem("gp"))}catch(e){}
if(!S||!S.guias)S={guias:JSON.parse(JSON.stringify(SEED_G)),envios:[],n:1,user:2};
let view="guias",tab="pend",open=null;
const save=()=>{try{localStorage.setItem("gp",JSON.stringify(S))}catch(e){}};
const me=()=>USERS[S.user];
const guiasEnRevision=()=>new Set(S.envios.filter(e=>e.estado==="pendiente").flatMap(e=>e.cambios.map(c=>c.guia)));
