const simbolos =
document.querySelectorAll(".simbolo");

const contenedor =
document.getElementById(
"contenedorEjercicios"
);

const mensaje =
document.getElementById(
"mensaje"
);

const puntajeDiv =
document.getElementById(
"puntaje"
);

const vidasDiv =
document.getElementById(
"vidas"
);

const sonidoCorrecto =
document.getElementById(
"correcto"
);

const sonidoIncorrecto =
document.getElementById(
"incorrecto"
);

let puntaje =
parseInt(
localStorage.getItem(
"puntaje"
)
) || 0;

let vidas = 3;

puntajeDiv.textContent =
"⭐ " + puntaje;

vidasDiv.textContent =
"❤️❤️❤️";

/* CREAR EJERCICIOS */

for(let i=0;i<4;i++){

let n1 =
Math.floor(
Math.random()*9000
)+1000;

let n2 =
Math.floor(
Math.random()*9000
)+1000;

let respuesta = "";

if(i === 3){

n2 = n1;

respuesta = "=";

}
else{

respuesta =
n1 > n2
? ">"
: "<";

}

contenedor.innerHTML +=

`
<div class="ejercicio">

<span>${n1}</span>

<div
class="zona"
data-respuesta="${respuesta}">

?

</div>

<span>${n2}</span>

</div>
`;

}

/* DRAG */

simbolos.forEach(simbolo=>{

simbolo.addEventListener(
"dragstart",
e=>{

e.dataTransfer.setData(
"simbolo",
simbolo.dataset.simbolo
);

});

});

setTimeout(()=>{

const zonas =
document.querySelectorAll(
".zona"
);

zonas.forEach(zona=>{

zona.addEventListener(
"dragover",
e=>{

e.preventDefault();

});

zona.addEventListener(
"drop",
e=>{

e.preventDefault();

const simbolo =
e.dataTransfer.getData(
"simbolo"
);

zona.textContent =
simbolo;

zona.dataset.valor =
simbolo;

});

});

},100);

/* VERIFICAR */

document.getElementById(
"verificar"
).addEventListener(
"click",
()=>{

const zonas =
document.querySelectorAll(
".zona"
);

let correctas = 0;

zonas.forEach(zona=>{

if(
zona.dataset.valor ===
zona.dataset.respuesta
){

correctas++;

}

});

if(correctas === 4){

puntaje += 40;

localStorage.setItem(
"puntaje",
puntaje
);

puntajeDiv.textContent =
"⭐ " + puntaje;

mensaje.textContent =
"🎉 ¡Excelente!";

mensaje.className =
"correcto";

sonidoCorrecto.currentTime=0;
sonidoCorrecto.play();

confetti({

particleCount:300,

spread:180

});

document.getElementById(
"btnSiguiente"
).style.display =
"inline-block";

document.getElementById(
"verificar"
).style.display =
"none";

}
else{

vidas--;

vidasDiv.textContent =

"❤️".repeat(vidas) +

"🤍".repeat(
3 - vidas
);

mensaje.textContent =
"❌ Inténtalo nuevamente";

mensaje.className =
"incorrecto";

sonidoIncorrecto.currentTime=0;
sonidoIncorrecto.play();

const zonas =
document.querySelectorAll(
".zona"
);

zonas.forEach(z=>{

z.textContent =
"?";

z.dataset.valor =
"";

});

if(vidas <= 0){

alert(
"Te quedaste sin vidas"
);

location.reload();

}

}

});

/* SIGUIENTE */

document.getElementById(
"btnSiguiente"
).addEventListener(
"click",
()=>{

window.location.href =
"juego2.html";

});

/* VOZ INICIAL */

window.addEventListener(
"load",
()=>{

const voz =
new SpeechSynthesisUtterance(

"Arrastra el símbolo correcto entre los números"

);

voz.lang =
"es-ES";

speechSynthesis.speak(
voz
);

});