const puntajeDiv =
document.getElementById("puntaje");

const vidasDiv =
document.getElementById("vidas");

const contenido =
document.getElementById("contenidoMision");

const titulo =
document.getElementById("tituloMision");

const mensaje =
document.getElementById("mensaje");

const progreso =
document.getElementById("progreso");

const carritoBarra =
document.getElementById("carritoBarra");

const correcto =
document.getElementById("correcto");

const incorrecto =
document.getElementById("incorrecto");

let puntaje =
parseInt(
localStorage.getItem("puntaje")
) || 0;

let vidas = 3;

let misionActual = 0;

let seleccion = "";

puntajeDiv.textContent =
"⭐ " + puntaje;

vidasDiv.textContent =
"❤️❤️❤️";

/* VOZ */

function hablarBienvenida(){

speechSynthesis.cancel();

const voz =
new SpeechSynthesisUtterance(

"Bienvenido al supermercado matemático. Acompáñame en esta aventura dentro del supermercado. Resolverás desafíos matemáticos usando precios, sumas, restas y comparaciones. Ayuda a tu familia a comprar correctamente y completa todas las misiones para llenar tu carrito."

);

voz.lang = "es-CL";

voz.rate = 0.95;

voz.pitch = 1;

voz.onend = ()=>{

document.getElementById(
"btnComenzar"
).style.display =
"inline-block";

};

speechSynthesis.speak(
voz
);

}

/* MISIONES */

const misiones = [

{
titulo:"🛒 Misión 1",
pregunta:"¿Cuál producto es el más barato?",

correcta:"platano",

productos:[
["manzana","$1500"],
["platano","$1000"],
["naranja","$2000"]
]
},

{
titulo:"💰 Misión 2",
pregunta:"¿Cuál producto es el más caro?",

correcta:"queso",

productos:[
["leche","$2500"],
["jugo","$1500"],
["queso","$3000"]
]
},

{
titulo:"👩 Misión 3",
pregunta:
"Mamá te dio $6000 para comprar Cereal ($3500) y Huevos ($2000). ¿Cuánto dinero te sobrará?",

correcta:"500",

opciones:[
"500",
"1000",
"1500",
"2000"
]
},

{
titulo:"➕ Misión 4",
pregunta:
"Compras Pan ($2000) y Leche ($2500). ¿Cuánto gastarás en total?",

correcta:"4500",

opciones:[
"3500",
"4000",
"4500",
"5000"
]
},

{
titulo:"🏆 Misión 5",
pregunta:
"Tienes $10000. Compras Leche ($2500), Pan ($2000), Jugo ($1500) y Queso ($2000). ¿Cuánto dinero te sobra?",

correcta:"2000",

opciones:[
"1500",
"2000",
"2500",
"3000"
]
}

];

/* COMENZAR */

document
.getElementById("btnComenzar")
.addEventListener(
"click",
()=>{

document.getElementById(
"pantallaInicio"
).style.display="none";

document.getElementById(
"juego"
).style.display="block";

cargarMision();

});

/* CARGAR MISION */

function cargarMision(){

const m =
misiones[misionActual];

titulo.textContent =
m.titulo;

seleccion = "";

mensaje.textContent = "";

if(m.productos){

contenido.innerHTML =

`
<div class="tarjeta">

<h3>${m.pregunta}</h3>

<div class="productos">

${m.productos.map(p=>`

<div
class="producto"
onclick="seleccionar('${p[0]}',this)">

<img src="img/${p[0]}.png">

<p>${p[1]}</p>

</div>

`).join("")}

</div>

</div>
`;

}else{

contenido.innerHTML =

`
<div class="tarjeta">

<h3>${m.pregunta}</h3>

<div class="productos">

${m.opciones.map(op=>`

<div
class="producto"
onclick="seleccionar('${op}',this)">

<p style="font-size:32px;">
$${op}
</p>

</div>

`).join("")}

</div>

</div>
`;

}

}

/* SELECCIONAR */

function seleccionar(valor,elemento){

seleccion = valor;

document
.querySelectorAll(".producto")
.forEach(p=>{

p.style.border =
"2px solid cyan";

});

elemento.style.border =
"4px solid lime";

}

/* VERIFICAR */

document
.getElementById("verificar")
.addEventListener(
"click",
()=>{

if(seleccion === ""){
return;
}

const m =
misiones[misionActual];

if(
seleccion ===
m.correcta
){

puntaje += 20;

localStorage.setItem(
"puntaje",
puntaje
);

puntajeDiv.textContent =
"⭐ " + puntaje;

mensaje.textContent =
"🎉 ¡Correcto!";

mensaje.className =
"correcto";

correcto.currentTime = 0;
correcto.play();

confetti({

particleCount:200,

spread:150

});

misionActual++;

const porcentaje =

(misionActual /
misiones.length)

* 100;

progreso.style.width =
porcentaje + "%";

carritoBarra.style.left =
`calc(${porcentaje}% - 20px)`;

if(
misionActual >=
misiones.length
){

mensaje.textContent =
"🏆 ¡Supermercado completado!";

document
.getElementById(
"btnFinal"
)
.style.display =
"inline-block";

document
.getElementById(
"verificar"
)
.style.display =
"none";

return;

}

setTimeout(
cargarMision,
1200
);

}
else{

vidas--;

vidasDiv.textContent =

"❤️".repeat(vidas)

+

"🤍".repeat(
3 - vidas
);

mensaje.textContent =
"❌ Incorrecto";

mensaje.className =
"incorrecto";

incorrecto.currentTime = 0;
incorrecto.play();

if(
vidas <= 0
){

alert(
"Te quedaste sin vidas"
);

location.reload();

}

}

});

/* FINAL */

window.addEventListener(
"load",
()=>{

document.getElementById(
"btnComenzar"
).style.display =
"none";

setTimeout(()=>{

hablarBienvenida();

},1000);

});