const avatar =
localStorage.getItem(
"avatar"
);

const nombre =
localStorage.getItem(
"nombre"
);

const puntaje =
parseInt(
localStorage.getItem(
"puntaje"
)
) || 0;

document.getElementById(
"avatarUsuario"
).src =
avatar;

document.getElementById(
"nombreUsuario"
).textContent =
nombre;

document.getElementById(
"puntajeFinal"
).textContent =

"⭐ Puntaje Total: " +
puntaje;

/* MEDALLAS */

let medalla = "";

if(puntaje >= 200){

medalla =
"🏆 MEDALLA DE ORO";

}
else if(puntaje >= 120){

medalla =
"🥈 MEDALLA DE PLATA";

}
else{

medalla =
"🥉 MEDALLA DE BRONCE";

}

document.getElementById(
"medallaFinal"
).textContent =
medalla;

/* CONFETI */

confetti({

particleCount:600,

spread:180

});

/* VOZ */

const voz =

new SpeechSynthesisUtterance(

"Felicitaciones " +
nombre +
". Completaste todos los juegos. Tu puntaje fue " +
puntaje +
" puntos. " +
medalla

);

voz.lang =
"es-ES";

voz.rate = 0.95;

speechSynthesis.cancel();

speechSynthesis.speak(
voz
);