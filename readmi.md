# 📋 Planificador de Tareas Web

### **Desarrollado por:** 👨‍💻 Juan Camilo Acevedo Hoyos  
*Programa Desarrollador Web Junior Full Stack - Generation Colombia*

---

## 📝 Descripción del Proyecto

Aplicación web interactiva desarrollada con arquitectura modular orientada a objetos para la gestión eficiente de tareas cotidianas. El proyecto cuenta con un diseño *responsive* en dos columnas, una paleta de colores oscura (*Dark Mesh Gradient*) y tipografías creativas (Poppins & Fredoka).

Permite crear, clasificar, conmutar estado entre **Pendiente / Completada**, eliminar tareas y persistir la información en el navegador mediante la **Web Storage API (LocalStorage)**.

---

## 🚀 Tecnologías Utilizadas

* **HTML5:** Estructuración semántica de la interfaz y componentes accesibles.
* **CSS3:** Flexbox, CSS Grid, degradados personalizados, animaciones y tipografías de Google Fonts (*Fredoka & Poppins*).
* **Bootstrap 5 & Icons:** Sistema de rejilla responsivo a dos columnas, modales interactivos para alertas e iconografía.
* **JavaScript (ES6+):** Programación Orientada a Objetos (Clases), manipulación del DOM, delegación de eventos y métodos de arreglos (`push`, `find`, `filter`).
* **Web Storage API:** Persistencia de datos en `localStorage` mediante serialización JSON.

---

## 🔗 Enlaces del Proyecto

* 📌 **Tablero de Trello:** [Ver Tablero de Trabajo](https://trello.com/b/LadBl85T/proyecto-individual)
* 🎨 **Diseño en Figma:** [Ver Wireframe en Figma](https://www.figma.com/design/IuHofj6IJqHlTcYGOGMfDQ/WireFrame-Planificador-de-tareas?node-id=2002-20&m=dev&t=ma3kVS3LZ0ujfInt-1)
* 🌐 **Demo en Vivo (GitHub Pages):** [Probar Planificador de Tareas](https://juancamiloacevedoh.github.io/Planificador-de-tareas-web/)

---

## ⚙️ Funcionalidades Implementadas

### **Sprint 1: Maquetación y Validación**
* **Maquetación Responsiva:** Adaptación a pantallas de escritorio, tablets y móviles mediante Bootstrap 5.
* **Validación de Formularios:** Control de errores en JavaScript que impide el envío de campos vacíos y despliega ventanas modales interactivas.

### **Sprint 2: Lógica y Arquitectura Orientada a Objetos**
* **Clase `TaskManager`:** Estructura modular en `js/taskManager.js` que administra la colección de tareas y genera identificadores únicos autoincrementables (`currentId`).
* **Adición Programática:** Creación e inserción de nuevos objetos de tarea en el arreglo `tasks` tras envíos válidos del formulario.
* **Interacción de Estado:** Posibilidad de conmutar el estado de cada tarjeta (*Pendiente* / *Completada*) de forma interactiva en la interfaz.

### **Sprint 3: Actualización, Eliminación y Persistencia**
* **Actualización de Estado (`Mark As Done`):** Método `getTaskById()` para buscar tareas por su atributo `data-task-id` y actualizar su propiedad `status` a `'DONE'`.
* **Eliminación Lógica (`deleteTask`):** Eliminación de objetos del arreglo mediante filtrado e hidratación dinámica del DOM sin recargar la página.
* **Persistencia en LocalStorage:** Métodos `save()` y `load()` que guardan la lista de tareas y el contador `currentId` en `localStorage` (`JSON.stringify` / `JSON.parse`), garantizando que la información se mantenga intacta tras refrescar el navegador.