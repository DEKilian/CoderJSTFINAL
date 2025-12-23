const flores = [

    {
        id : 1,
        nombre: "Rosas",
        precio: 1200
    },

    { 
        id: 2,
        nombre: "Tulipanes",
        precio: 1500
    },

    {
        id: 3,
        nombre: "Fresias",
        precio: 800
    },

    {   
        id:4,
        nombre: "Margaritas",
        precio: 1100
    },

    {   
        id: 5,
        nombre: "Claveles",
        precio: 1000
    }
];


const mediadocena = (num1) => num1 * 6;
const unadocena = (num1) => num1 * 12;
 
let total = Number(localStorage.getItem("total")) || 0;
let florSeleccionada = null;


const app = document.getElementById("app");

function mostrarMensaje(texto) {
    mensaje.textContent = texto;
}

function actualizarTotal() {
    inputTotal.value = total;
    localStorage.setItem("total", total)
};

const titulo = document.createElement("h1");
titulo.textContent = "Flores del Mar";
app.appendChild(titulo);

const subtituloFlores = document.createElement("h2");
subtituloFlores.textContent = "Por favor, complete los pasos en orden para poder generar su pedido:";
app.appendChild(subtituloFlores);

const subtituloCompra = document.createElement("h3");
subtituloCompra.textContent = "1)Seleccione la flor que desea para su ramo:";
app.appendChild(subtituloCompra);

const contenedorFlores = document.createElement("div");
app.appendChild(contenedorFlores);
flores.forEach(flor => {
    const botonSeleccionador = document.createElement("button");
    botonSeleccionador.textContent = `${flor.nombre} ($${flor.precio} x unidad)`;

    botonSeleccionador.addEventListener("click", () => {
        florSeleccionada = flor;
        mostrarMensaje(`${flor.nombre}`);
    });

    contenedorFlores.appendChild(botonSeleccionador);
});


const subtituloRamo = document.createElement("h3");
subtituloRamo.textContent = "2)Indique que ramo desea armar:";
app.appendChild(subtituloRamo);

const btnMedia = document.createElement("button");
btnMedia.textContent = "Media docena (6) ";
btnMedia.addEventListener("click", () => {
    if (!florSeleccionada) {
        mostrarMensaje("No ha seleccionado ninguna flor. Por favor, seleccione que flor desea y luego que tipo de ramo.");
        return;
    }

    const subtotal = mediadocena(florSeleccionada.precio);
    total += subtotal;
    actualizarTotal();

    mostrarMensaje(`Agregaste media docena de ${florSeleccionada.nombre}. Subtotal: $${subtotal}`);
});
app.appendChild(btnMedia);

const btnDocena = document.createElement("button");
btnDocena.textContent = "Docena (12) ";
btnDocena.addEventListener("click", () => {
    if (!florSeleccionada) {
        mostrarMensaje("Debes seleccionar una flor primero.");
        return;
    }

    const subtotal = unadocena(florSeleccionada.precio);
    total += subtotal;
    actualizarTotal();

    mostrarMensaje(`Agregaste una docena de ${florSeleccionada.nombre}. Subtotal: $${subtotal}`);
});

app.appendChild(btnDocena);



const totalActual = document.createElement("h3");
totalActual.textContent = "Total actual:";
app.appendChild(totalActual);

const inputTotal = document.createElement("input");
inputTotal.type = "text";
inputTotal.readOnly = true;
inputTotal.value = total;

const mensaje = document.createElement("p");
app.appendChild(mensaje);

app.appendChild(inputTotal);


const btnReiniciar = document.createElement ("button");
btnReiniciar.textContent = "Reiniciar carrito"

btnReiniciar.addEventListener("click", () => {
    total = 0;
    localStorage.setItem("total", 0);
    actualizarTotal();
});

app.appendChild(btnReiniciar);
