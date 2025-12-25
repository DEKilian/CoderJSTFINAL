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


const mediadocena = (precio) => precio * 6;
const unadocena = (precio) => precio * 12;

let total = Number(localStorage.getItem("total")) || 0;
let florSeleccionada = null;

const codigos = {
    brisa: 0.05,
    florero: 0.10,
    oculto: 0.25
};

let descuentosUsados = [];

const app = document.getElementById("app");

function actualizarTotal() {
    inputTotal.value = total.toLocaleString();
    localStorage.setItem("total", total);
}

const titulo = document.createElement("h1");
titulo.textContent = "Flores del Mar";
app.appendChild(titulo);

const subtituloFlores = document.createElement("h2");
subtituloFlores.textContent = "Por favor, complete los pasos en orden para generar su pedido:";
app.appendChild(subtituloFlores);

const subtituloCompra = document.createElement("h3");
subtituloCompra.textContent = "1) Seleccione la flor que desea para su ramo:";
app.appendChild(subtituloCompra);

const contenedorFlores = document.createElement("div");
app.appendChild(contenedorFlores);

flores.forEach(flor => {
    const botonSeleccionador = document.createElement("button");
    botonSeleccionador.textContent = `${flor.nombre} ($${flor.precio} x unidad)`;

    botonSeleccionador.addEventListener("click", () => {
        florSeleccionada = flor;

        Swal.fire({
            icon: 'info',
            title: 'Flor seleccionada',
            text: `Has seleccionado ${flor.nombre}`,
            timer: 1500,
            showConfirmButton: false
        });
    });

    contenedorFlores.appendChild(botonSeleccionador);
});

const subtituloRamo = document.createElement("h3");
subtituloRamo.textContent = "2) Indique qué ramo desea armar:";
app.appendChild(subtituloRamo);

const btnMedia = document.createElement("button");
btnMedia.textContent = "Media docena (6)";
btnMedia.addEventListener("click", () => {
    if (!florSeleccionada) {
        Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: 'Primero debes seleccionar una flor'
        });
        return;
    }

    const subtotal = mediadocena(florSeleccionada.precio);
    total += subtotal;
    actualizarTotal();

    Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: `Agregaste media docena de ${florSeleccionada.nombre} ($${subtotal})`
    });
});
app.appendChild(btnMedia);

const btnDocena = document.createElement("button");
btnDocena.textContent = "Docena (12)";
btnDocena.addEventListener("click", () => {
    if (!florSeleccionada) {
        Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: 'Primero debes seleccionar una flor'
        });
        return;
    }

    const subtotal = unadocena(florSeleccionada.precio);
    total += subtotal;
    actualizarTotal();

    Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: `Agregaste una docena de ${florSeleccionada.nombre} ($${subtotal})`
    });
});
app.appendChild(btnDocena);

const totalActual = document.createElement("h3");
totalActual.textContent = "Total actual:";
app.appendChild(totalActual);

const inputTotal = document.createElement("input");
inputTotal.type = "text";
inputTotal.readOnly = true;
inputTotal.value = total;
app.appendChild(inputTotal);

const btnReiniciar = document.createElement("button");
btnReiniciar.textContent = "Reiniciar carrito";

btnReiniciar.addEventListener("click", () => {
    Swal.fire({
        title: '¿Reiniciar carrito?',
        text: 'Se eliminará el total actual',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, reiniciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            total = 0;
            localStorage.setItem("total", 0);
            actualizarTotal();

            Swal.fire(
                'Reiniciado',
                'El carrito fue reiniciado correctamente',
                'success'
            );
        }
    });
});
app.appendChild(btnReiniciar);

const btnFinalizar = document.createElement("button");
btnFinalizar.textContent = "Finalizar compra";

const btnDescuento = document.createElement("button");
btnDescuento.textContent = "Ingresar código de descuento";

btnDescuento.addEventListener("click", () => {

    if (descuentosUsados.length > 0) {
        Swal.fire("Descuento ya aplicado", "Solo se permite un código por compra", "info");
        return;
    }

    if (total <= 6000) {
        Swal.fire("Monto insuficiente", "El total debe ser mayor a $6000", "warning");
        return;
    }

    Swal.fire({
        title: "Ingrese su código",
        input: "text",
        showCancelButton: true
    }).then(result => {

        if (!result.isConfirmed) return;

        const codigo = result.value.toLowerCase();

        if (!codigos[codigo]) {
            Swal.fire("Código inválido", "El código ingresado no es válido", "error");
            return;
        }

        const porcentaje = codigos[codigo];
        total -= total * porcentaje;

        descuentosUsados.push(codigo);

        actualizarTotal();

        Swal.fire(
            "Descuento aplicado",
            `Se aplicó un ${porcentaje * 100}% de descuento`,
            "success"
        );
    });
});

app.appendChild(btnDescuento);

btnFinalizar.addEventListener("click", () => {
    if (total === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Carrito vacío',
            text: 'No hay productos en el carrito para finalizar la compra'
        });
        return;
    }

    Swal.fire({
        title: '¿Desea finalizar la compra?',
        html: `<strong>Total a pagar:</strong> $${total}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Confirmar compra',
        cancelButtonText: 'Cancelar compra'
    }).then((result) => {
        if (result.isConfirmed) {
          
            Swal.fire({
                title: 'Procesando tu compra...',
                text: 'Por favor espera un momento',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading(); 
                }
            });

            setTimeout(() => {
                Swal.close(); 
                Swal.fire({
                    icon: 'success',
                    title: '¡Compra realizada!',
                    text: 'Gracias por comprar con nosotros, vuelva pronto!'
                });

                total = 0;
                localStorage.setItem("total", 0);
                actualizarTotal();
            }, 2000); 
        }
    });
});
app.appendChild(btnFinalizar);