nombreUsuario.textContent =
localStorage.getItem("nombre");

avatarUsuario.src =
localStorage.getItem("avatar");

function hablar(texto){

    const voz =
    new SpeechSynthesisUtterance(
    texto
    );

    voz.lang =
    "es-ES";

    speechSynthesis.cancel();

    speechSynthesis.speak(voz);

}

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

const btnContinuar =
document.getElementById(
"btnContinuar"
);

if(btnContinuar){

btnContinuar.style.display =
"none";

window.addEventListener(
"load",
()=>{

const voz =
new SpeechSynthesisUtterance(

"Hola " +
localStorage.getItem("nombre") +
". Bienvenido. Aquí aprenderás los contenidos necesarios antes de comenzar los desafíos matemáticos."

);

voz.lang =
"es-ES";

voz.rate =
0.95;

voz.onend = ()=>{

btnContinuar.style.display =
"inline-block";

};

speechSynthesis.cancel();

speechSynthesis.speak(
voz
);

});

}