// Cargar productos desde localStorage o usar array inicial
let productos = JSON.parse(localStorage.getItem("productos")) || [
    { id: 1, nombre: "The Last of Us", descripcion: "Juego de historia y supervivencia zombi", precio: 21000, stock: 10, imagen: "https://tuimagen.com/thelastofus.jpg" },
    { id: 2, nombre: "Uncharted 4", descripcion: "Aventura de acción y exploración", precio: 18000, stock: 12, imagen: "https://tuimagen.com/uncharted4.jpg" },
    { id: 3, nombre: "God of War", descripcion: "Acción y mitología nórdica", precio: 22000, stock: 8, imagen: "https://tuimagen.com/godofwar.jpg" }
    // Podés agregar los 25 productos aquí o más tarde
];

// Actualizar total del carrito en header
function actualizarCarrito() {
    let total = localStorage.getItem("totalproductos") || 0;
    document.getElementById("totalproducto").innerText = total;
}
actualizarCarrito();

// Mostrar productos en panel de control
function mostrarProductos() {
    const contenedor = document.getElementById("boxproductos");

    // Limpiar contenedor pero mantener el formulario
    const formulario = document.querySelector(".panel-control");
    contenedor.innerHTML = "";
    contenedor.appendChild(formulario);

    for (let producto of productos) {
        let card = document.createElement("div");
        card.className = "boxproducto";
        card.innerHTML = `
            <h2>${producto.nombre}</h2>
            <img src="${producto.imagen}" alt="${producto.nombre}" width="100">
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <p>Stock: ${producto.stock}</p>
            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
        `;
        contenedor.appendChild(card);
    }
}

// Agregar nuevo producto
document.getElementById("btnAgregarProducto").addEventListener("click", () => {
    const nombre = document.getElementById("nombreProducto").value.trim();
    const precio = parseInt(document.getElementById("precioProducto").value);
    const descripcion = document.getElementById("descripcionProducto").value.trim();
    const stock = parseInt(document.getElementById("stockProducto").value);
    const imagenInput = document.getElementById("imagenProducto");

    if (!nombre || !precio || !descripcion || !stock || !imagenInput.files.length) {
        alert("Completa todos los campos correctamente.");
        return;
    }

    // Convertir imagen a URL temporal
    const imagen = URL.createObjectURL(imagenInput.files[0]);

    const nuevoProducto = {
        id: productos.length ? productos[productos.length - 1].id + 1 : 1,
        nombre,
        precio,
        descripcion,
        stock,
        imagen
    };

    productos.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productos));

    // Limpiar formulario
    document.getElementById("nombreProducto").value = "";
    document.getElementById("precioProducto").value = "";
    document.getElementById("descripcionProducto").value = "";
    document.getElementById("stockProducto").value = "";
    document.getElementById("imagenProducto").value = "";

    mostrarProductos();
});

// Eliminar producto
function eliminarProducto(id) {
    productos = productos.filter(p => p.id !== id);
    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarProductos();
}

window.eliminarProducto = eliminarProducto;

// Ejecutar al cargar la página
mostrarProductos();
