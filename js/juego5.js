const puntajeDiv =
document.getElementById("puntaje");

const vidasDiv =
document.getElementById("vidas");

const mensaje =
document.getElementById("mensaje");

const correcto =
document.getElementById("correcto");

const incorrecto =
document.getElementById("incorrecto");

let puntaje =
parseInt(
localStorage.getItem("puntaje")
) || 0;

let vidas = 3;

puntajeDiv.textContent =
"⭐ " + puntaje;

document
.querySelectorAll(".item")
.forEach(item=>{

item.addEventListener(
"dragstart",
e=>{

e.dataTransfer.setData(
"tipo",
item.dataset.tipo
);

e.dataTransfer.setData(
"texto",
item.innerHTML
);

});

});

document
.querySelectorAll(".zona")
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

zona.dataset.valor =
e.dataTransfer.getData(
"tipo"
);

zona.innerHTML =
e.dataTransfer.getData(
"texto"
);

});

});

document
.getElementById("verificar")
.addEventListener(
"click",
()=>{

let correctas = 0;

document
.querySelectorAll(".zona")
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
"btnFinal"
)
.style.display =
"inline-block";

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

if(vidas <= 0){

location.reload();

}

}

});

document
.getElementById("btnFinal")
.addEventListener(
"click",
()=>{

window.location.href =
"juego6.html";

});