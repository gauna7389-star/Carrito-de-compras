// -------------------------------------------------
// 🔥 CONEXIÓN A FIREBASE
// -------------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCxqCRnzVHfk6YhP2vW9kEWi3WqxNolth8",
    authDomain: "emic-76f78.firebaseapp.com",
    projectId: "emic-76f78",
    storageBucket: "emic-76f78.firebasestorage.app",
    messagingSenderId: "742574706627",
    appId: "1:742574706627:web:25a33b1bdd4e1550177776"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// -------------------------------------------------
// VARIABLES
// -------------------------------------------------
let productos = [];   // ← se llena desde Firebase
const boxproductos = document.getElementById("boxproductos");
const contadores = {}; 

// -------------------------------------------------
// 📥 CARGAR PRODUCTOS DESDE FIREBASE
// -------------------------------------------------
async function cargarDesdeFirebase() {
    const querySnapshot = await getDocs(collection(db, "productos"));
    productos = [];

    querySnapshot.forEach(doc => {
        productos.push({
            id: doc.id,
            ...doc.data()
        });
    });

    cargarProductos(productos);
    actualizarCarritoIcono();
}

// -------------------------------------------------
// 🎮 MOSTRAR PRODUCTOS EN PANTALLA
// -------------------------------------------------
function cargarProductos(lista) {
    boxproductos.innerHTML = "";

    lista.forEach(producto => {
        contadores[producto.id] = 1;

        const card = document.createElement("div");
        card.className = "boxproducto";

        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagenProducto">
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion}</p>
            <p>Plataforma: ${producto.play}</p>
            <h3>${producto.precio === 0 ? "Gratis" : "$" + producto.precio}</h3>
            <p>Stock: ${producto.stock}</p>

            <div class="boxcontador">
                <button onclick="restarProducto('${producto.id}')">-</button>
                <p id="contador-${producto.id}">1</p>
                <button onclick="sumarProducto('${producto.id}')">+</button>
            </div>

            <button onclick="agregarCarrito('${producto.id}')">Agregar al Carrito</button>
        `;

        boxproductos.appendChild(card);
    });
}

// -------------------------------------------------
// ➕➖ CONTADORES
// -------------------------------------------------
window.sumarProducto = function(id) {
    const producto = productos.find(p => p.id === id);
    if (contadores[id] < producto.stock) contadores[id]++;
    document.getElementById(`contador-${id}`).innerText = contadores[id];
}

window.restarProducto = function(id) {
    if (contadores[id] > 1) contadores[id]--;
    document.getElementById(`contador-${id}`).innerText = contadores[id];
}

// -------------------------------------------------
// 🛒 AGREGAR AL CARRITO
// -------------------------------------------------
window.agregarCarrito = function(id) {
    const producto = productos.find(p => p.id === id);
    const cantidad = contadores[id];
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existente = carrito.find(p => p.id === id);

    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({
            id: id,
            nombre: producto.nombre,
            imagen: producto.imagen,
            precio: producto.precio,
            cantidad: cantidad
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem(
        "totalproductos",
        carrito.reduce((sum, p) => sum + p.cantidad, 0)
    );

    alert(`${producto.nombre} agregado al carrito!`);

    contadores[id] = 1;
    document.getElementById(`contador-${id}`).innerText = 1;
    actualizarCarritoIcono();
};

// -------------------------------------------------
// 🧮 ACTUALIZAR ICONO DEL CARRITO
// -------------------------------------------------
function actualizarCarritoIcono() {
    const total = localStorage.getItem("totalproductos") || 0;
    document.getElementById("totalproducto").innerText = total;
}

// -------------------------------------------------
// 🔎 BUSCADOR
// -------------------------------------------------
const buscador = document.getElementById("buscador");
const btnBuscar = document.getElementById("btnBuscar");

btnBuscar.addEventListener("click", () => {
    const texto = buscador.value.toLowerCase().trim();
    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );
    cargarProductos(filtrados);
});

// -------------------------------------------------
// 🚀 INICIAR
// -------------------------------------------------
cargarDesdeFirebase();
