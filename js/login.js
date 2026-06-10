const nombre =
document.getElementById("nombre");

const avatares =
document.querySelectorAll(".avatar");

const btnEntrar =
document.getElementById("btnEntrar");

let avatarSeleccionado = "";

/* VOZ */

function hablar(texto){

    speechSynthesis.cancel();

    const voz =
    new SpeechSynthesisUtterance(texto);

    voz.lang = "es-CL";

    voz.rate = 0.95;

    speechSynthesis.speak(voz);

}

/* MENSAJE INICIAL */

window.addEventListener(
"load",
()=>{

    setTimeout(()=>{

        hablar(
        "Bienvenido. Escribe tu nombre y selecciona un avatar para comenzar."
        );

    },1000);

});

/* AVATAR */

avatares.forEach(avatar=>{

    avatar.addEventListener("click",()=>{

        avatares.forEach(a=>{

            a.classList.remove(
            "seleccionado"
            );

        });

        avatar.classList.add(
        "seleccionado"
        );

        avatarSeleccionado =
        avatar.src;

        hablar(
        "Avatar seleccionado"
        );

    });

});

/* ENTRAR */

btnEntrar.addEventListener("click",()=>{

    if(
        nombre.value.trim()==="" &&
        avatarSeleccionado === ""
    ){

        hablar(
        "Debes escribir tu nombre y seleccionar un avatar"
        );

        alert(
        "Escribe tu nombre y selecciona un avatar"
        );

        return;

    }

    if(
        nombre.value.trim()===""
    ){

        hablar(
        "Debes escribir tu nombre"
        );

        alert(
        "Escribe tu nombre"
        );

        return;

    }

    if(
        avatarSeleccionado === ""
    ){

        hablar(
        "Debes seleccionar un avatar"
        );

        alert(
        "Selecciona un avatar"
        );

        return;

    }

    localStorage.setItem(
    "nombre",
    nombre.value
    );

    localStorage.setItem(
    "avatar",
    avatarSeleccionado
    );

    localStorage.setItem(
    "puntaje",
    0
    );

    hablar(
    "Excelente. Comencemos la aventura matemática."
    );

    setTimeout(()=>{

        window.location.href =
        "bienvenida2.html";

    },2000);

});