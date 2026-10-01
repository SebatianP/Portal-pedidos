/* ===== DATOS: usuarios y guías de ejemplo (ficticios) ===== */
const USERS=[
 {n:"Daniela Ruiz",rol:"sube"},{n:"Mateo Silva",rol:"sube"},
 {n:"Laura Gómez",rol:"revisa"},{n:"Carlos Mejía",rol:"revisa"}];
const SEED_G=[
 ["82330501001","PED-2026-0301","Cliente Uno S.A.S.","Bogotá","Coordinadora","28/9",2,"En transporte"],
 ["82330501002","PED-2026-0302","Cliente Dos Ltda.","Medellín","Coordinadora","28/9",2,"En reparto"],
 ["82330501003","FV-2-15001","Cliente Tres","Barranquilla","Coordinadora","29/9",1,"En transporte"],
 ["82330501004","FV-2-15002","Cliente Cuatro","Cali","Envía","29/9",1,"En reparto"],
 ["82330501005","0929-401","Cliente Cinco S.A.S.","Pereira","Coordinadora","29/9",1,"En transporte"],
 ["82330501006","0929-402","Cliente Seis","Cartagena","Coordinadora","29/9",1,"En transporte"],
 ["82330501007","FV-2-15003","Cliente Siete","Bogotá","Coordinadora","29/9",1,"En reparto"],
 ["82330501008","0930-403","Cliente Ocho","Segovia","Envía","30/9",0,"Sin estado"],
 ["82330501009","0930-404","Cliente Nueve","Medellín","Coordinadora","30/9",0,"En transporte"],
 ["82330501010","FV-2-15004","Cliente Diez","Bogotá","Coordinadora","30/9",0,"En reparto"]
].map(a=>({guia:a[0],pedido:a[1],cliente:a[2],ciudad:a[3],transp:a[4],desp:a[5],dias:a[6],estado:a[7]}));
