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

window.addEventListener(
"load",
()=>{

const voz =

new SpeechSynthesisUtterance(

"Hola " +
nombre +
". En esta aventura aprenderás matemáticas, ganarás puntos y podrás conseguir una medalla."

);

voz.lang =
"es-ES";

voz.rate =
0.95;

speechSynthesis.speak(
voz
);

});