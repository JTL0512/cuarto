const avatar =
localStorage.getItem(
"avatar"
);

const nombre =
localStorage.getItem(
"nombre"
);

document.getElementById(
"avatarUsuario"
).src =
avatar;

document.getElementById(
"nombreUsuario"
).textContent =
nombre;

const btnContinuar =
document.getElementById(
"btnContinuar"
);

btnContinuar.style.display =
"none";

window.addEventListener(
"load",
()=>{

const voz =

new SpeechSynthesisUtterance(

"Hola " +
nombre +
". Bienvenido. En esta aventura aprenderás a comparar números, ordenar números, resolver sumas, resolver restas, realizar multiplicaciones y divisiones. Además ganarás puntos durante los desafíos y podrás conseguir una medalla al completar la aventura."

);

voz.lang =
"es-ES";

voz.rate =
0.95;

voz.pitch =
1;

voz.onend = ()=>{

btnContinuar.style.display =
"inline-block";

};

speechSynthesis.cancel();

speechSynthesis.speak(
voz
);

});