/* ===== ACCIONES: lo que cambia datos (enviar, aprobar/devolver, reenviar) ===== */
function nuevoEnvio(revisor){
  const bloq=guiasEnRevision();
  const cand=S.guias.filter(g=>g.estado!=="Entregada"&&g.estado!=="Sin estado"&&!bloq.has(g.guia)).slice(0,5);
  if(!cand.length){toast("No hay guías nuevas para enviar");return}
  S.envios.unshift({id:"R-"+String(S.n++).padStart(3,"0"),por:me().n,revisor,fecha:hoy(),estado:"pendiente",comentario:"",
    leidas:cand.length+3,
    cambios:cand.map(g=>({guia:g.guia,pedido:g.pedido,cliente:g.cliente,de:g.estado,a:"Entregada"})),
    ilegibles:S.guias.filter(g=>g.estado==="Sin estado").map(g=>g.guia)});
  save();toast("Enviado a revisión de "+revisor);view="rev";tab="mis";render();
}
function resolver(id,estado,com){
  const e=S.envios.find(x=>x.id===id);e.estado=estado;e.comentario=com||"";e.resolvio=me().n;e.fechaRes=hoy();
  if(estado==="aprobado")e.cambios.forEach(c=>{const g=S.guias.find(x=>x.guia===c.guia);if(g)g.estado=c.a});
  save();open=null;toast(estado==="aprobado"?"Aprobado: pedidos actualizados":"Devuelto a "+e.por);render();
}
function reenviar(id){const e=S.envios.find(x=>x.id===id);e.estado="pendiente";e.comentario="";save();toast("Reenviado a "+e.revisor);render()}
