var chistes = []; // Inicializa el array de chistes vacío
var boton = document.getElementById("boton");
var chistesContainer = document.getElementById("chistes-container");
var chisteActual = null;

function cargarChistes() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                chistes = JSON.parse(xhr.responseText);
            } else {
                console.error('Error al cargar los chistes:', xhr.status);
            }
        }
    };
    xhr.open('GET', 'chistes.json', true);
    xhr.send();
}

function mostrarChiste() {
    if (chisteActual) {
        chistesContainer.removeChild(chisteActual);
    }

    var indice = Math.floor(Math.random() * chistes.length);
    var nuevoChiste = document.createElement("div");
    nuevoChiste.innerHTML = procesarSaltosDeLinea(chistes[indice]); // Utiliza innerHTML
    chistesContainer.appendChild(nuevoChiste);

    chisteActual = nuevoChiste;
}

// Función para procesar los saltos de línea
function procesarSaltosDeLinea(texto) {
    return texto.replace(/\n/g, "<br>");
}

boton.addEventListener("click", mostrarChiste);

// Cargar los chistes cuando se cargue la página
window.addEventListener('load', cargarChistes);
