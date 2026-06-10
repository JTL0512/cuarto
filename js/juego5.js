const problema =
document.getElementById("problema");

const respuestasDiv =
document.getElementById("respuestas");

const zona =
document.getElementById("zonaRespuesta");

const mensaje =
document.getElementById("mensaje");

const correcto =
document.getElementById("correcto");

const incorrecto =
document.getElementById("incorrecto");

const puntajeDiv =
document.getElementById("puntaje");

const vidasDiv =
document.getElementById("vidas");

let puntaje =
parseInt(localStorage.getItem("puntaje")) || 0;

puntajeDiv.textContent =
"⭐ " + puntaje;

let vidas = 3;

let respuestaCorrecta = 0;

const misiones = [

{
texto:"🧃 Un jugo cuesta $1200 y una galleta $800. ¿Cuánto es en total?",
correcta:2000,
opciones:[2000,1800,2500,1500]
},

{
texto:"🍎 Una manzana cuesta $1500 y una naranja $1000. ¿Cuánto es en total?",
correcta:2500,
opciones:[2500,3000,2000,3500]
},

{
texto:"🥛 Tienes $5000 y compras leche por $2500. ¿Cuánto dinero te queda?",
correcta:2500,
opciones:[2500,2000,3000,1500]
}

];

let nivel = 0;

function cargarNivel(){

const actual =
misiones[nivel];

respuestaCorrecta =
actual.correcta;

problema.textContent =
actual.texto;

zona.textContent =
"Suelta aquí";

zona.dataset.valor = "";

respuestasDiv.innerHTML = "";

actual.opciones
.sort(()=>Math.random()-0.5)
.forEach(valor=>{

const div =
document.createElement("div");

div.className =
"respuesta";

div.draggable = true;

div.dataset.valor =
valor;

div.textContent =
"$" + valor;

div.addEventListener(
"dragstart",
e=>{

e.dataTransfer.setData(
"valor",
valor
);

});

respuestasDiv.appendChild(div);

});

}

zona.addEventListener(
"dragover",
e=>{

e.preventDefault();

});

zona.addEventListener(
"drop",
e=>{

e.preventDefault();

const valor =
e.dataTransfer.getData("valor");

zona.dataset.valor =
valor;

zona.textContent =
"$" + valor;

});

document.getElementById(
"verificar"
).addEventListener(
"click",
()=>{

if(
parseInt(zona.dataset.valor)
=== respuestaCorrecta
){

puntaje += 20;

localStorage.setItem(
"puntaje",
puntaje
);

puntajeDiv.textContent =
"⭐ " + puntaje;

mensaje.textContent =
"🎉 Correcto";

mensaje.className =
"correcto";

correcto.play();

confetti({
particleCount:200,
spread:120
});

nivel++;

if(
nivel < misiones.length
){

setTimeout(
cargarNivel,
1000
);

}else{

document.getElementById(
"btnFinal"
).style.display =
"inline-block";

document.getElementById(
"verificar"
).style.display =
"none";

}

}
else{

vidas--;

vidasDiv.textContent =
"❤️".repeat(vidas)
+
"🤍".repeat(3-vidas);

mensaje.textContent =
"❌ Incorrecto";

mensaje.className =
"incorrecto";

incorrecto.play();

if(
vidas <= 0
){

location.reload();

}

}

});

document.getElementById(
"btnFinal"
).addEventListener(
"click",
()=>{

window.location.href =
"juego6.html";

});

cargarNivel();