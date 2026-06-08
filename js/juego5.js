const contenedor =
document.getElementById(
"contenedorEjercicios"
);

const respuestasDiv =
document.querySelector(
".respuestas"
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

let vidas = 3;

let puntaje =
parseInt(
localStorage.getItem(
"puntaje"
)
) || 0;

puntajeDiv.textContent =
"⭐ " + puntaje;

vidasDiv.textContent =
"❤️❤️❤️";

const correcto =
document.getElementById(
"correcto"
);

const incorrecto =
document.getElementById(
"incorrecto"
);

const secuencias = [];

for(let i=0;i<5;i++){

let inicio =
Math.floor(
Math.random()*8000
)+1000;

let salto =
Math.floor(
Math.random()*400
)+100;

let faltante =
inicio + salto*2;

secuencias.push({

texto:
`
${inicio}
 →
${inicio+salto}
 →
___
 →
${inicio+salto*3}
 →
${inicio+salto*4}
`,

respuesta:
faltante

});

}

const respuestas = [];

secuencias.forEach(s=>{

respuestas.push(
s.respuesta
);

});

respuestas.sort(
()=>Math.random()-0.5
);

secuencias.forEach(s=>{

contenedor.innerHTML +=

`
<div class="ejercicio">

<p>

${s.texto}

</p>

<div
class="zona"
data-correcto="${s.respuesta}">

?

</div>

</div>
`;

});

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

const respuestasDrag =
document.querySelectorAll(
".respuesta"
);

const zonas =
document.querySelectorAll(
".zona"
);

respuestasDrag.forEach(r=>{

r.addEventListener(
"dragstart",
e=>{

e.dataTransfer.setData(
"valor",
r.dataset.valor
);

});

});

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

const valor =
e.dataTransfer.getData(
"valor"
);

zona.textContent =
valor;

zona.dataset.valor =
valor;

const original =
[...respuestasDrag].find(
r =>
r.dataset.valor === valor
);

if(original){

original.style.visibility =
"hidden";

}

});

});

document.getElementById(
"verificar"
).addEventListener(
"click",
()=>{

let correctas = 0;

zonas.forEach(z=>{

if(
z.dataset.valor ===
z.dataset.correcto
){

correctas++;

}

});

if(
correctas === 5
){

puntaje += 50;

localStorage.setItem(
"puntaje",
puntaje
);

mensaje.textContent =
"🏆 Excelente";

correcto.play();

confetti({

particleCount:400,

spread:180

});

setTimeout(()=>{

window.location.href =
"final.html";

},2500);

}

else{

vidas--;

vidasDiv.textContent =

"❤️".repeat(vidas) +

"🤍".repeat(
3-vidas
);

incorrecto.play();

mensaje.textContent =
"❌ Inténtalo nuevamente";

zonas.forEach(z=>{

z.textContent =
"?";

z.dataset.valor =
"";

});

respuestasDrag.forEach(r=>{

r.style.visibility =
"visible";

});

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