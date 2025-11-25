# 🛒 Proyecto Final – Carrito de Compras

Este proyecto es una **aplicación web completa de Carrito de Compras**, desarrollada como trabajo final del cuatrimestre.  
El objetivo fue implementar una solución moderna utilizando **HTML, CSS, JavaScript y Firebase**, priorizando la lógica del carrito, el manejo del DOM, la persistencia de datos y una interfaz clara y funcional.

---

## 🎯 Objetivo del Proyecto

Desarrollar una aplicación web que permita:

- Visualizar productos desde una base de datos en Firebase.
- Ver el detalle de cada producto.
- Agregar productos al carrito con control de stock.
- Mostrar un contador dinámico en el ícono del carrito.
- Eliminar productos del carrito.
- Calcular automáticamente subtotales y total final.
- Guardar los productos seleccionados en `localStorage`.
- Finalizar la compra mostrando un mensaje profesional de éxito.
- Contar con diseño responsive y ordenado en filas de 5 productos.

---

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **HTML5** — Estructura semántica y modular.
- **CSS3** — Estilos personalizados, responsive design, grid de productos.
- **JavaScript Vanilla** — Manejo del DOM, lógica de negocio, buscador, carrito.

### **Backend / Base de Datos**
- **Firebase Firestore** — Lectura dinámica de productos.

### **Persistencia**
- **LocalStorage** — Guardado local del carrito incluso al recargar la página.

### **Herramientas de Trabajo**
- **Git & GitHub** — Versionado y repositorio online.
- **Vercel** — Hosting y despliegue de la aplicación.

---

## 🧩 Funcionalidades Principales

### 🛒 **Carrito de Compras Completo**
- Agregar productos desde el detalle o desde la vista principal.
- Sumar/restar cantidades sin superar el stock.
- Eliminación individual.
- Contador sincronizado con `localStorage`.
- Cálculo automático del total general.

### 📦 **Carga de Productos**
- Productos cargados dinámicamente desde Firebase.
- Renderizado de tarjetas con imagen, nombre, precio, descripción y stock.
- Distribución en **filas de 5 productos** (grid profesional).

### 🔍 **Buscador Funcional**
- Filtro dinámico según nombre del producto.

### 🔐 **Persistencia**
- Todo el carrito se guarda en `localStorage` para evitar pérdida de información.

### 🎉 **Finalización de Compra**
- Confirmación visual gracias a un mensaje estilizado y profesional.

---

## 🚀 Deploy

El proyecto está online gracias a **Vercel**:

🔗 **https://carrito-de-compras-umber.vercel.app/**

---

## 💻 Instalación y Uso en Local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/gauna7389-star/Carrito-de-compras.git
