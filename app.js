/* ===== APP: pinta la pantalla, maneja los clics y arranca ===== */
function render(){
  $("user").innerHTML=USERS.map((u,i)=>`<option value="${i}" ${i===S.user?"selected":""}>${u.n}</option>`).join("");
  $("rol").textContent=me().rol==="sube"?"Rol: sube el Excel":"Rol: técnico revisor";
  const p=S.envios.filter(e=>e.estado==="pendiente"&&e.revisor===me().n).length;
  $("badge").textContent=p||"";$("badge").style.display=p?"":"none";
  $("nav-guias").className=view==="guias"?"on":"";$("nav-rev").className=view==="rev"?"on":"";
  $("main").innerHTML=view==="guias"?vGuias():vRev();
}
document.body.addEventListener("click",ev=>{
  const t=ev.target.closest("button,a");if(!t)return;
  if(t.dataset.v){view=t.dataset.v;open=null;render()}
  if(t.id==="up"){$("revisor").innerHTML=USERS.filter(u=>u.rol==="revisa"&&u.n!==me().n).map(u=>`<option>${u.n}</option>`).join("");$("dUp").showModal()}
  if(t.id==="upCancel")$("dUp").close();
  if(t.id==="upSend"){$("dUp").close();nuevoEnvio($("revisor").value)}
  if(t.id==="copy"){try{navigator.clipboard.writeText(S.guias.map(g=>g.guia).join("\n"))}catch(e){}toast("Guías copiadas")}
  if(t.id==="dl")toast("Simulación: aquí se descargaría el archivo");
  if(t.id==="reset"){S={guias:JSON.parse(JSON.stringify(SEED_G)),envios:[],n:1,user:S.user};save();render();toast("Práctica restablecida")}
  if(t.dataset.t){tab=t.dataset.t;open=null;render()}
  if(t.dataset.o){open=t.dataset.o;render()}
  if(t.id==="back"){open=null;render()}
  if(t.dataset.ap)resolver(t.dataset.ap,"aprobado");
  if(t.dataset.dv){$("coment").value="";$("dRet").dataset.id=t.dataset.dv;$("dRet").showModal()}
  if(t.dataset.re)reenviar(t.dataset.re);
  if(t.id==="retCancel")$("dRet").close();
  if(t.id==="retSend"){const c=$("coment").value.trim();if(!c){toast("Escribe qué debe corregirse");return}$("dRet").close();resolver($("dRet").dataset.id,"devuelto",c)}
});
$("user").onchange=e=>{S.user=+e.target.value;open=null;save();render()};
render();
