const contenedor =
document.getElementById(
"contenedorEjercicios"
);

const contenedorRespuestas =
document.querySelector(
".respuestas"
);

const mensaje =
document.getElementById(
"mensaje"
);

const correcto =
document.getElementById(
"correcto"
);

const incorrecto =
document.getElementById(
"incorrecto"
);

const puntajeDiv =
document.getElementById(
"puntaje"
);

let puntaje =
parseInt(
localStorage.getItem(
"puntaje"
)
) || 0;

puntajeDiv.textContent =
"⭐ " + puntaje;

const ejercicios = [];
const respuestas = [];

/* CREAR EJERCICIOS */

for(let i=0;i<4;i++){

    const tipo =
    Math.random() < 0.5
    ? "+"
    : "-";

    let n1;
    let n2;
    let resultado;

    if(tipo === "+"){

        n1 =
        Math.floor(
        Math.random()*500
        ) + 100;

        n2 =
        Math.floor(
        Math.random()*500
        ) + 100;

        resultado =
        n1 + n2;

    }

    else{

        n1 =
        Math.floor(
        Math.random()*900
        ) + 100;

        n2 =
        Math.floor(
        Math.random()*n1
        );

        resultado =
        n1 - n2;

    }

    ejercicios.push({

        n1,
        n2,
        tipo,
        resultado

    });

    respuestas.push(
    resultado
    );

}

/* MEZCLAR RESPUESTAS */

respuestas.sort(
()=> Math.random()-0.5
);

/* MOSTRAR EJERCICIOS */

ejercicios.forEach(e=>{

    contenedor.innerHTML +=

    `
    <div class="ejercicio">

        ${e.n1}
        ${e.tipo}
        ${e.n2}
        =

        <div
        class="zona"
        data-correcto="${e.resultado}">

        ?

        </div>

    </div>
    `;

});

/* MOSTRAR RESPUESTAS */

respuestas.forEach(r=>{

    contenedorRespuestas.innerHTML +=

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

/* DRAG */

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

/* DROP */

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

/* VERIFICAR */

document.getElementById(
"verificar"
).addEventListener(
"click",
()=>{

    let correctas = 0;

    zonas.forEach(zona=>{

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

        correcto.currentTime = 0;

        correcto.play();

        confetti({

            particleCount:300,
            spread:150

        });

        document.getElementById(
        "btnSiguiente"
        ).style.display =
        "inline-block";

    }

    else{

        mensaje.textContent =
        "❌ Incorrecto. Inténtalo nuevamente";

        incorrecto.currentTime = 0;

        incorrecto.play();

        zonas.forEach(zona=>{

            zona.textContent =
            "?";

            zona.dataset.valor =
            "";

        });

        respuestasDrag.forEach(r=>{

            r.style.visibility =
            "visible";

        });

    }

});

document.getElementById(
"btnSiguiente"
).addEventListener(
"click",
()=>{

    window.location.href =
    "juego4.html";

});