const contenido =
document.getElementById("contenido");

const mensaje =
document.getElementById("mensaje");

const verificar =
document.getElementById("verificar");

const siguiente =
document.getElementById("siguiente");

const puntajeDiv =
document.getElementById("puntaje");

const vidasDiv =
document.getElementById("vidas");

const carrito =
document.getElementById("carrito");

const porcentaje =
document.getElementById("porcentaje");

const correcto =
document.getElementById("correcto");

const incorrecto =
document.getElementById("incorrecto");

const victoria =
document.getElementById("victoria");

let puntaje =
parseInt(
localStorage.getItem("puntaje")
) || 0;

let vidas = 3;

let mision = 0;

let respuestaUsuario = "";

puntajeDiv.textContent =
"⭐ " + puntaje;

const misiones = [

{
titulo:
"¿Cuál es el producto más barato?",

productos:[
{
img:"img/manzana.png",
nombre:"Manzana",
precio:1500
},
{
img:"img/platano.png",
nombre:"Plátano",
precio:1000
},
{
img:"img/naranja.png",
nombre:"Naranja",
precio:2000
}
],

correcta:
"Plátano"
},

{
titulo:
"¿Cuál es el producto más caro?",

productos:[
{
img:"img/leche.png",
nombre:"Leche",
precio:1800
},
{
img:"img/pan.png",
nombre:"Pan",
precio:1200
},
{
img:"img/huevos.png",
nombre:"Huevos",
precio:2500
}
],

correcta:
"Huevos"
},

{
titulo:
"Tienes $5000. ¿Te alcanza?",

texto:
"Pan $1500 + Leche $1200 + Huevos $2000",

opciones:[
"SI",
"NO"
],

correcta:
"SI"
},

{
titulo:
"¿Qué oferta conviene más?",

texto:
"Jugo 1L = $1500 | Jugo 2L = $2300",

opciones:[
"Jugo 1L",
"Jugo 2L"
],

correcta:
"Jugo 2L"
},

{
titulo:
"¿Qué producto cuesta menos?",

productos:[
{
img:"img/manzana.png",
nombre:"Manzana",
precio:1800
},
{
img:"img/pan.png",
nombre:"Pan",
precio:1200
},
{
img:"img/leche.png",
nombre:"Leche",
precio:2200
}
],

correcta:
"Pan"
}

];

cargarMision();

/* CARGAR MISION */

function cargarMision(){

respuestaUsuario = "";

mensaje.textContent = "";

siguiente.style.display =
"none";

let actual =
misiones[mision];

contenido.innerHTML =
`<h2 style="width:100%;margin-bottom:30px;">
${actual.titulo}
</h2>`;

if(actual.productos){

actual.productos.forEach(
producto=>{

contenido.innerHTML +=

`
<div
class="tarjeta opcion"
data-respuesta="${producto.nombre}">

<img
src="${producto.img}">

<div class="nombre">

${producto.nombre}

</div>

<div class="precio">

$${producto.precio}

</div>

</div>
`;

});

}

if(actual.texto){

contenido.innerHTML +=

`
<div
class="tarjeta"
style="width:500px">

<div class="nombre">

${actual.texto}

</div>

</div>
`;

actual.opciones.forEach(
op=>{

contenido.innerHTML +=

`
<div
class="opcion"
data-respuesta="${op}">

${op}

</div>
`;

});

}

document
.querySelectorAll(".opcion")
.forEach(op=>{

op.addEventListener(
"click",
()=>{

document
.querySelectorAll(".opcion")
.forEach(o=>{

o.style.border =
"none";

});

op.style.border =
"4px solid yellow";

respuestaUsuario =
op.dataset.respuesta;

});

});

actualizarBarra();

}

/* VERIFICAR */

verificar.addEventListener(
"click",
()=>{

if(
respuestaUsuario === ""
){

alert(
"Selecciona una respuesta"
);

return;

}

let correcta =
misiones[mision].correcta;

if(
respuestaUsuario ===
correcta
){

mensaje.textContent =
"🎉 ¡Correcto!";

mensaje.className =
"correcto";

correcto.play();

puntaje += 20;

localStorage.setItem(
"puntaje",
puntaje
);

puntajeDiv.textContent =
"⭐ " + puntaje;

confetti({

particleCount:150,
spread:120

});

siguiente.style.display =
"inline-block";

}
else{

vidas--;

vidasDiv.textContent =

"❤️".repeat(vidas)+
"🤍".repeat(3-vidas);

mensaje.textContent =
"❌ Incorrecto";

mensaje.className =
"incorrecto";

incorrecto.play();

if(vidas <= 0){

alert(
"Te quedaste sin vidas"
);

location.reload();

}

}

});

/* SIGUIENTE */

siguiente.addEventListener(
"click",
()=>{

mision++;

if(
mision >= misiones.length
){

finalJuego();

return;

}

cargarMision();

});

/* BARRA */

function actualizarBarra(){

let progreso =

(mision /
misiones.length)
*100;

porcentaje.textContent =

Math.round(
progreso
) + "%";

carrito.style.left =

`calc(${progreso}% - 35px)`;

}

/* FINAL */

function finalJuego(){

victoria.play();

confetti({

particleCount:500,
spread:180

});

contenido.innerHTML =

`
<div class="final">

<h2>

🎉 FELICITACIONES 🎉

</h2>

<br>

<div class="estrellas">

⭐⭐⭐

</div>

<br>

<h3>

Completaste todas las compras

</h3>

<br>

<h2>

⭐ ${puntaje}

</h2>

<br>

<button
onclick="window.location.href='todos.html'">

🏠 Volver al menú

</button>

</div>
`;

verificar.style.display =
"none";

siguiente.style.display =
"none";

mensaje.textContent = "";

porcentaje.textContent =
"100%";

carrito.style.left =
"calc(100% - 70px)";

}