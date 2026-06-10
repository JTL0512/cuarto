const respuestasDiv =
document.getElementById("respuestas");

const ejerciciosDiv =
document.getElementById("ejercicios");

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

let respuestasCorrectas = [];

/* CREAR EJERCICIOS */

for(let i=0;i<4;i++){

let a =
Math.floor(Math.random()*400)+100;

let b =
Math.floor(Math.random()*200)+50;

let operacion =
Math.random() < 0.5
? "+"
: "-";

let resultado;

if(operacion === "+"){

resultado = a + b;

}else{

resultado = a - b;

}

respuestasCorrectas.push(
resultado
);

ejerciciosDiv.innerHTML +=

`
<div class="ejercicio">

<span>
${a}
${operacion}
${b}
=
</span>

<div
class="zona"
data-correcto="${resultado}">
?
</div>

</div>
`;

}

/* MEZCLAR RESPUESTAS */

let respuestas =
[...respuestasCorrectas];

respuestas.sort(
()=>Math.random()-0.5
);

respuestas.forEach(r=>{

respuestasDiv.innerHTML +=

`
<div
class="respuesta"
draggable="true"
data-valor="${r}">

${r}

</div>
`;

});

/* DRAG */

document
.querySelectorAll(
".respuesta"
)
.forEach(respuesta=>{

respuesta.addEventListener(
"dragstart",
e=>{

e.dataTransfer.setData(
"valor",
respuesta.dataset.valor
);

});

});

/* DROP */

document
.querySelectorAll(
".zona"
)
.forEach(zona=>{

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

const valor =
e.dataTransfer.getData(
"valor"
);

zona.textContent =
valor;

zona.dataset.valor =
valor;

document
.querySelector(
`[data-valor="${valor}"]`
)
.style.visibility =
"hidden";

});

});

/* VERIFICAR */

document
.getElementById(
"verificar"
)
.addEventListener(
"click",
()=>{

let correctas = 0;

document
.querySelectorAll(
".zona"
)
.forEach(zona=>{

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

correcto.play();

confetti({

particleCount:300,

spread:180

});

document
.getElementById(
"btnSiguiente"
)
.style.display =
"inline-block";

document
.getElementById(
"verificar"
)
.style.display =
"none";

}else{

vidas--;

vidasDiv.textContent =

"❤️".repeat(vidas)+
"🤍".repeat(3-vidas);

mensaje.textContent =
"❌ Inténtalo nuevamente";

mensaje.className =
"incorrecto";

incorrecto.play();

document
.querySelectorAll(
".zona"
)
.forEach(z=>{

z.textContent="?";

z.dataset.valor="";

});

document
.querySelectorAll(
".respuesta"
)
.forEach(r=>{

r.style.visibility=
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

document
.getElementById(
"btnSiguiente"
)
.addEventListener(
"click",
()=>{

window.location.href =
"juego4.html";

});