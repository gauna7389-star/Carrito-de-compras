// Mostrar u ocultar confirmación de contraseña
const inpver = document.getElementById("inpver");
inpver.addEventListener("change", () => {
    if (inpver.checked) {
        document.getElementById("lblconfirmar").style.display = "block";
        document.getElementById("password2").style.display = "block";
    } else {
        document.getElementById("lblconfirmar").style.display = "none";
        document.getElementById("password2").style.display = "none";
    }
});

// Manejo del formulario
const form = document.getElementById("login");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const password2 = document.getElementById("password2").value.trim();

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (inpver.checked) {
        // Crear nueva cuenta
        if (password !== password2) {
            mensaje.innerText = "Las contraseñas no coinciden.";
            mensaje.style.color = "red";
            return;
        }

        if (usuarios.find(u => u.email === email)) {
            mensaje.innerText = "El usuario ya existe.";
            mensaje.style.color = "red";
            return;
        }

        usuarios.push({ email, password });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        mensaje.innerText = "Cuenta creada correctamente. Inicia sesión.";
        mensaje.style.color = "green";

        form.reset();
        document.getElementById("lblconfirmar").style.display = "none";
        document.getElementById("password2").style.display = "none";

    } else {
        // Iniciar sesión
        const usuario = usuarios.find(u => u.email === email && u.password === password);
        if (!usuario) {
            mensaje.innerText = "Usuario o contraseña incorrectos.";
            mensaje.style.color = "red";
            return;
        }

        mensaje.innerText = "Inicio de sesión exitoso.";
        mensaje.style.color = "green";

        // Guardar usuario activo
        localStorage.setItem("usuarioActivo", email);

        // Redirigir al inicio
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    }
});

// Actualizar total de carrito en header
function actualizarCarrito() {
    let total = localStorage.getItem("totalproductos") || 0;
    document.getElementById("totalproducto").innerText = total;
}

actualizarCarrito();
