const puntajeDiv = document.getElementById("puntaje");
const vidasDiv = document.getElementById("vidas");
const mensaje = document.getElementById("mensaje");
const contenido = document.getElementById("contenidoMision");
const titulo = document.getElementById("tituloMision");
const progreso = document.getElementById("progreso");
const carrito = document.getElementById("carritoBarra");

const correcto = document.getElementById("correcto");
const incorrecto = document.getElementById("incorrecto");

function hablar(texto){

    speechSynthesis.cancel();

    const voz =
    new SpeechSynthesisUtterance(texto);

    voz.lang = "es-CL";

    voz.rate = 0.95;

    voz.pitch = 1;

    speechSynthesis.speak(voz);

}

window.addEventListener("load",()=>{

    const btnComenzar =
    document.getElementById("btnComenzar");

    // Ocultar botón al inicio
    btnComenzar.style.display = "none";

    const texto =
    "Bienvenido al supermercado matemático. Acompáñame en esta aventura dentro del supermercado. Resolverás desafíos matemáticos usando precios, sumas, restas y comparaciones. Llena tu carrito y completa todas las misiones.";

    const voz =
    new SpeechSynthesisUtterance(texto);

    voz.lang = "es-CL";
    voz.rate = 0.95;
    voz.pitch = 1;

    // Cuando termine de hablar aparece el botón
voz.onend = () => {

    btnComenzar.style.display =
    "inline-block";

    setTimeout(()=>{

        btnComenzar.classList.add(
        "mostrar"
        );

    },100);

};

    speechSynthesis.speak(voz);

});

let puntaje =
parseInt(localStorage.getItem("puntaje")) || 0;

let vidas = 3;
let mision = 0;
let seleccion = "";

puntajeDiv.textContent = "⭐ " + puntaje;

const misiones = [

{
titulo:"Misión 1",
pregunta:"¿Cuál producto es más barato?",
correcta:"platano",
productos:[
["manzana","$1500"],
["platano","$1000"],
["naranja","$2000"]
]
},

{
titulo:"Misión 2",
pregunta:"¿Cuál producto cuesta menos?",
correcta:"jugo",
productos:[
["leche","$2500"],
["jugo","$1500"],
["queso","$3000"]
]
},

{
titulo:"Misión 3",
pregunta:"¿Qué producto cuesta menos?",
correcta:"pan",
productos:[
["pan","$2000"],
["cereal","$3500"],
["huevos","$2800"]
]
},

{
titulo:"Misión 4",
pregunta:"¿Cuál es el precio menor?",
correcta:"yogurt",
productos:[
["yogurt","$1800"],
["bebida","$2500"],
["galletas","$2200"]
]
},

{
titulo:"Misión 5",
pregunta:"Tienes $10000. Compras Leche($2500), Pan($2000), Jugo($1500) y Queso($2000). ¿Cuánto sobra?",
correcta:"2000",
opciones:["1500","2000","2500","3000"]
}

];

document
.getElementById("btnComenzar")
.addEventListener("click",()=>{

    document.getElementById(
    "pantallaInicio"
    ).style.display="none";

    document.getElementById(
    "juego"
    ).style.display="block";

    cargarMision();

});


function cargarMision(){

const actual = misiones[mision];

titulo.textContent = actual.titulo;

contenido.innerHTML = "";

mensaje.textContent = "";

seleccion = "";

if(actual.productos){

contenido.innerHTML = `
<div class="tarjeta">
<h3>${actual.pregunta}</h3>
<div class="productos">
${actual.productos.map(p=>`
<div class="producto"
onclick="seleccionar('${p[0]}',this)">
<img src="img/${p[0]}.png">
<p>${p[1]}</p>
</div>
`).join("")}
</div>
</div>
`;

}else{

contenido.innerHTML = `
<div class="tarjeta">
<h3>${actual.pregunta}</h3>
<div class="productos">
${actual.opciones.map(op=>`
<div class="producto"
onclick="seleccionar('${op}',this)">
<p>${op}</p>
</div>
`).join("")}
</div>
</div>
`;

}

}

function seleccionar(valor,elemento){

seleccion = valor;

document
.querySelectorAll(".producto")
.forEach(p=>{

p.style.border="2px solid cyan";

});

elemento.style.border=
"4px solid lime";

}

document
.getElementById("verificar")
.addEventListener("click",()=>{

if(seleccion==="") return;

const actual = misiones[mision];

if(seleccion===actual.correcta){

puntaje+=20;

localStorage.setItem(
"puntaje",
puntaje
);

puntajeDiv.textContent=
"⭐ "+puntaje;

mensaje.textContent=
"🎉 ¡Correcto!";

mensaje.className=
"correcto";

correcto.play();

confetti({
particleCount:200,
spread:150
});

mision++;

const porcentaje =
(mision/5)*100;

progreso.style.width=
porcentaje+"%";

carrito.style.left=
`calc(${porcentaje}% - 30px)`;

if(mision===5){

document
.getElementById("btnFinal")
.style.display=
"inline-block";

document
.getElementById("verificar")
.style.display=
"none";

mensaje.textContent=
"🏆 ¡Supermercado completado!";

return;

}

setTimeout(
cargarMision,
1200
);

}else{

vidas--;

vidasDiv.textContent=
"❤️".repeat(vidas)+
"🤍".repeat(3-vidas);

mensaje.textContent=
"❌ Incorrecto";

mensaje.className=
"incorrecto";

incorrecto.play();

if(vidas<=0){

alert(
"Te quedaste sin vidas"
);

location.reload();

}

}

});

document
.getElementById("btnFinal")
.addEventListener("click",()=>{

window.location.href=
"final.html";

});