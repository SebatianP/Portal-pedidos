/* ===== VISTAS: HTML de cada pantalla (Guías, Revisiones, Detalle) ===== */
function vGuias(){
  const t=S.guias.map(g=>`<tr><td class="m">${g.guia}</td><td>${g.pedido}</td><td>${g.cliente}</td><td>${g.ciudad}</td><td>${g.transp}</td><td>${g.desp}</td><td>${g.dias}</td><td>${pill(g.estado)}</td></tr>`).join("");
  const pend=guiasEnRevision().size;
  return `<h2>Guías</h2><div class="sub">Rastreo de pedidos despachados${pend?` · ${pend} guías esperan revisión antes de actualizarse`:""}</div>
  <div class="bar"><button class="btn dark" id="copy">Copiar ${S.guias.length} guías</button><button class="btn" id="dl">Descargar</button><button class="btn">Rastreo Coordinadora</button><span class="sp"></span>
  <button class="btn dark" id="up" ${me().rol!=="sube"?'disabled title="Solo quien sube el Excel puede usar esto"':""}>Subir Excel del rastreo</button></div>
  <div class="tw"><table><thead><tr><th>GUÍA</th><th>PEDIDO</th><th>CLIENTE</th><th>CIUDAD</th><th>TRANSPORTADORA</th><th>DESPACHO</th><th>DÍAS</th><th>ESTADO</th></tr></thead><tbody>${t}</tbody></table></div>
  <p class="foot">Datos ficticios guardados en este navegador. <button id="reset">Restablecer práctica</button></p>`;
}
function vRev(){
  const m=me();
  const pend=S.envios.filter(e=>e.estado==="pendiente"&&e.revisor===m.n);
  const mis=S.envios.filter(e=>e.por===m.n);
  const hist=S.envios.filter(e=>e.estado!=="pendiente");
  const lista={pend,mis,hist}[tab];
  const nombres={pend:"Por revisar",mis:"Mis envíos",hist:"Historial"};
  let h=`<h2>Revisiones</h2><div class="sub">Nada se actualiza hasta que el técnico lo aprueba.</div>
  <div class="tabs">${["pend","mis","hist"].map(k=>`<button class="tab ${k===tab?"on":""}" data-t="${k}">${nombres[k]}${k==="pend"?` (${pend.length})`:""}</button>`).join("")}</div>`;
  if(open){const e=S.envios.find(x=>x.id===open);return h+detalle(e)}
  h+=`<div class="card">`+(lista.length?lista.map(e=>`<div class="env"><div><b>${e.id}</b> · ${e.cambios.length} pedidos a actualizar<small>Subido por ${e.por} · revisa ${e.revisor} · ${e.fecha}</small></div>
   <div><span class="pill p-${e.estado}">${e.estado[0].toUpperCase()+e.estado.slice(1)}</span> <button class="btn" data-o="${e.id}">Abrir</button></div></div>`).join(""):`<div class="empty">No hay envíos aquí.</div>`)+`</div>`;
  return h;
}
function detalle(e){
  const puede=me().rol==="revisa"&&e.revisor===me().n&&e.estado==="pendiente";
  const propio=e.por===me().n;
  const filas=e.cambios.map(c=>`<tr><td class="m">${c.guia}</td><td>${c.pedido}</td><td>${c.cliente}</td><td>${pill(c.de)}<span class="arrow">→</span>${pill(c.a)}</td></tr>`).join("");
  return `<button class="btn" id="back">← Volver a la lista</button>
  <div class="card" style="margin-top:12px"><b>${e.id}</b> · subido por ${e.por} · revisa ${e.revisor}<br>
  Se leyeron ${e.leidas} guías · ${e.cambios.length} pedidos cambiarían de estado
  ${e.estado==="devuelto"?`<div class="note"><b>Devuelto por ${e.resolvio}:</b> ${e.comentario}</div>`:""}
  ${e.estado==="aprobado"?`<div style="margin-top:8px"><span class="pill p-aprobado">Aprobado por ${e.resolvio} · ${e.fechaRes}</span></div>`:""}</div>
  <div class="tw"><table><thead><tr><th>GUÍA</th><th>PEDIDO</th><th>CLIENTE</th><th>CAMBIO DE ESTADO</th></tr></thead><tbody>${filas}</tbody></table></div>
  <div class="card" style="margin-top:16px"><b>Sin estado legible (no se tocarán):</b><div class="unread">${e.ilegibles.join(", ")||"Ninguna"}</div></div>
  <div class="bar">${puede?`<button class="btn ok" data-ap="${e.id}">Aprobar y actualizar pedidos</button><button class="btn bad" data-dv="${e.id}">Devolver con comentario</button>`:""}
  ${e.estado==="devuelto"&&propio?`<button class="btn dark" data-re="${e.id}">Reenviar a revisión</button>`:""}
  ${!puede&&e.estado==="pendiente"?`<span class="sub" style="margin:0">Esperando a ${e.revisor}${me().n===e.por?"":" · tú no eres el revisor asignado"}.</span>`:""}</div>`;
}
