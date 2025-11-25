let productoseleccionados = JSON.parse(localStorage.getItem("carrito")) || [];
let totalfinal = 0;
let totalproductos = 0;

function cargarcarrito() {
    // Limpiar tabla antes de cargar
    const tbody = document.getElementById("listadeproductos");
    tbody.innerHTML = "";
    totalfinal = 0;
    totalproductos = 0;

    if (productoseleccionados.length === 0) {
        document.getElementById("totalgasto").innerHTML = "$0";
        document.getElementById("totalproducto").innerHTML = "0";
        return;
    }

    for (let productoseleccionado of productoseleccionados) {
        let cantidad = parseInt(productoseleccionado.cantidad);
        let precio = parseFloat(productoseleccionado.precio);
        let total = precio * cantidad;

        totalfinal += total;
        totalproductos += cantidad;

        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td><img src="${productoseleccionado.imagen}" width="50" alt="${productoseleccionado.nombre}"></td>
            <td>${cantidad}</td>
            <td>${productoseleccionado.nombre}</td>
            <td>$${precio.toFixed(2)}</td>
            <td>$${total.toFixed(2)}</td>
            <td><button class="btnEliminar">X</button></td>
        `;
        tbody.appendChild(fila);
    }

    document.getElementById("totalgasto").innerHTML = `$${totalfinal.toFixed(2)}`;
    document.getElementById("totalproducto").innerHTML = totalproductos;
    localStorage.setItem("totalproductos", totalproductos);

    activarBotonesEliminar();
}

function activarBotonesEliminar() {
    const botones = document.querySelectorAll(".btnEliminar");
    botones.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            productoseleccionados.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(productoseleccionados));
            cargarcarrito(); // recarga la tabla y actualiza totales sin recargar la página
        });
    });
}

// Cargar carrito al inicio
cargarcarrito();
