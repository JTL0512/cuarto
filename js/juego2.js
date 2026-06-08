const numerosContenedor =
document.getElementById("numeros");

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
parseInt(
localStorage.getItem("puntaje")
) || 0;

let vidas = 3;

puntajeDiv.textContent =
"⭐ " + puntaje;

vidasDiv.textContent =
"❤️❤️❤️";

/* NUMEROS ALEATORIOS */

let numeros = [];

while(numeros.length < 4){

let numero =
Math.floor(
Math.random()*9000
)+1000;

if(!numeros.includes(numero)){

numeros.push(numero);

}

}

let ordenados =
[...numeros].sort(
(a,b)=>a-b
);

/* MEZCLAR */

numeros.sort(
()=>Math.random()-0.5
);

/* CREAR TARJETAS */

numeros.forEach(numero=>{

numerosContenedor.innerHTML +=

`
<div
class="numero"
draggable="true"
data-numero="${numero}">
${numero}
</div>
`;

});

/* CREAR RESPUESTAS */

const zonas =
document.querySelectorAll(".zona");

zonas.forEach((zona,index)=>{

zona.dataset.correcto =
ordenados[index];

});

/* DRAG */

document.querySelectorAll(
".numero"
).forEach(numero=>{

numero.addEventListener(
"dragstart",
e=>{

e.dataTransfer.setData(
"numero",
numero.dataset.numero
);

});

});

/* DROP */

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

if(
zona.dataset.valor
){
return;
}

const numero =
e.dataTransfer.getData(
"numero"
);

zona.textContent =
numero;

zona.dataset.valor =
numero;

document
.querySelector(
`[data-numero="${numero}"]`
)
.style.visibility =
"hidden";

});

});

/* VERIFICAR */

document.getElementById(
"verificar"
).addEventListener(
"click",
()=>{

let correctas = 0;

zonas.forEach(zona=>{

if(
zona.dataset.valor ===
zona.dataset.correcto
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

correcto.currentTime = 0;

correcto.play();

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
3-vidas
);

mensaje.textContent =
"❌ Incorrecto";

mensaje.className =
"incorrecto";

incorrecto.currentTime = 0;

incorrecto.play();

zonas.forEach(
(zona,index)=>{

zona.textContent =
(index+1)+"°";

zona.dataset.valor =
"";

});

document
.querySelectorAll(
".numero"
)
.forEach(numero=>{

numero.style.visibility =
"visible";

});

if(vidas <= 0){

alert(
"Te quedaste sin vidas"
);

location.reload();

}

}

});

document.getElementById(
"btnSiguiente"
).addEventListener(
"click",
()=>{

window.location.href =
"juego3.html";

});