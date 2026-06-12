const nombreUsuario =
document.getElementById(
"nombreUsuario"
);

const avatarUsuario =
document.getElementById(
"avatarUsuario"
);

nombreUsuario.textContent =
localStorage.getItem(
"nombre"
);

avatarUsuario.src =
localStorage.getItem(
"avatar"
);

const btnJuego =
document.querySelector(
".btnJuego"
);

/* OCULTAR BOTONES */

btnJuego.style.display =
"none";

document
.querySelectorAll(
".btnAudio"
)
.forEach(btn=>{

btn.style.display =
"none";

});

/* VOZ DE BIENVENIDA */

window.addEventListener(
"load",
()=>{

const voz =

new SpeechSynthesisUtterance(

"Hola " +
localStorage.getItem("nombre") +
". Aquí aprenderás a comparar números, ordenarlos, resolver sumas, restas, multiplicaciones y divisiones. Escucha los ejemplos para aprender antes de comenzar los juegos."

);

voz.lang =
"es-CL";

voz.rate =
0.95;

voz.pitch =
1;

voz.onend = ()=>{

document
.querySelectorAll(
".btnAudio"
)
.forEach(btn=>{

btn.style.display =
"inline-block";

});

btnJuego.style.display =
"block";

};

speechSynthesis.cancel();

speechSynthesis.speak(
voz
);

});

/* FUNCION GENERAL */

function hablar(texto){

speechSynthesis.cancel();

const voz =
new SpeechSynthesisUtterance(
texto
);

voz.lang =
"es-CL";

voz.rate =
0.95;

speechSynthesis.speak(
voz
);

}

/* AUDIOS */

function audioMayor(){

hablar(
"Ocho mil setecientos treinta y cuatro es mayor que ocho mil cuatrocientos treinta y uno"
);

}

function audioOrden(){

hablar(
"Los números se pueden ordenar de menor a mayor"
);

}

function audioSuma(){

hablar(
"Doscientos cuarenta y cinco más trescientos setenta y ocho es igual a seiscientos veintitrés"
);

}

function audioResta(){

hablar(
"Novecientos cincuenta menos cuatrocientos veinticinco es igual a quinientos veinticinco"
);

}

function audioMulti(){

hablar(
"Veinticuatro por seis es igual a ciento cuarenta y cuatro"
);

}

function audioDivision(){

hablar(
"Ochenta y cuatro dividido en siete es igual a doce"
);

}