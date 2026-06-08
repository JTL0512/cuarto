const nombre =
document.getElementById("nombre");

const avatares =
document.querySelectorAll(".avatar");

const btnEntrar =
document.getElementById("btnEntrar");

let avatarSeleccionado = "";

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

    });

});

/* ENTRAR */

btnEntrar.addEventListener("click",()=>{

    if(
        nombre.value.trim()===""
    ){

        alert(
        "Escribe tu nombre"
        );

        return;

    }

    if(
        avatarSeleccionado === ""
    ){

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

    window.location.href =
    "bienvenida2.html";

});