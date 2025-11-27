// Array con los productos
const productos = [
    { id: 1, nombre: "The Last of Us", descripcion: "Juego de historia y supervivencia zombi", precio: 21000, stock: 10, imagen: "https://tuimagen.com/thelastofus.jpg" },
    { id: 2, nombre: "Uncharted 4", descripcion: "Aventura de acción y exploración", precio: 18000, stock: 12, imagen: "https://tuimagen.com/uncharted4.jpg" },
    { id: 3, nombre: "God of War", descripcion: "Acción y mitología nórdica", precio: 22000, stock: 8, imagen: "https://tuimagen.com/godofwar.jpg" }
];

// Función para mostrar productos
function cargarproductos(listaProductos = productos) {
    const contenedor = document.getElementById("boxproductos");
    contenedor.innerHTML = "";

    listaProductos.forEach(producto => {
        const card = document.createElement("div");
        card.className = "boxproducto";

        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagenProducto" onclick="verdetalle(${producto.id})">
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion}</p>
            <h3>${producto.precio === 0 ? "Gratis" : "$" + producto.precio}</h3>
            <button class="btnVer" onclick="verdetalle(${producto.id})">Ver Detalle</button>
        `;

        contenedor.appendChild(card);
    });

    // Animación
    document.querySelectorAll(".boxproducto").forEach((card, i) => {
        card.style.animation = `fadeIn 0.5s ease forwards ${i * 0.1}s`;
    });
}

// Función para ir a detalle
function verdetalle(idProducto) {
    const detalleProducto = productos.find(p => p.id === idProducto);

    if (!detalleProducto) {
        alert("Error cargando el producto");
        return;
    }

    localStorage.setItem("detalle", JSON.stringify(detalleProducto));
    window.location.href = "detalle.html";
}

window.verdetalle = verdetalle;

// Buscador
const inputBuscador = document.getElementById("buscador");
if (inputBuscador) {
    inputBuscador.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            buscarProducto(inputBuscador.value);
        }
    });
}

function buscarProducto(texto) {
    const busqueda = texto.toLowerCase();

    const resultado = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda)
    );

    if (resultado.length > 0) {
        cargarproductos(resultado);
    } else {
        alert("No se encontró ningún juego con ese nombre");
    }
}

// Carrito
function actualizarCarrito() {
    let total = localStorage.getItem("totalproductos") || 0;
    document.getElementById("totalproducto").innerHTML = total;
}

cargarproductos();
actualizarCarrito();
