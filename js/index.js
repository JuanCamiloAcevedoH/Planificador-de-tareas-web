// js/index.js

// 1. Instancia de TaskManager
const taskManager = new TaskManager();

// Referencias del DOM para el Formulario
const formTarea = document.querySelector('#form-tarea');
const inputNombre = document.querySelector('#input-nombre');
const inputDescripcion = document.querySelector('#input-descripcion');
const inputFecha = document.querySelector('#input-fecha');
const selectEstado = document.querySelector('#select-estado');

// Modales de Bootstrap
const modalErrorElemento = document.getElementById('modalError');
const modalErrorBS = new bootstrap.Modal(modalErrorElemento);
const contenidoModalError = document.getElementById('contenido-modal-error');

const modalExitoElemento = document.getElementById('modalExito');
const modalExitoBS = new bootstrap.Modal(modalExitoElemento);

// Función de validación
function validFormFieldInput(data) {
  if (data.nombre.trim() === '') return "El nombre de la tarea no puede estar vacío.";
  if (data.descripcion.trim() === '') return "La descripción no puede estar vacía.";
  if (data.fecha === '') return "Debe ingresar una fecha de entrega válida.";
  if (data.estado === '') return "Debe seleccionar un estado.";
  return true;
}

// 2. Escuchar el evento submit del formulario
if (formTarea) {
  formTarea.addEventListener('submit', (event) => {
    event.preventDefault();

    const dataTarea = {
      nombre: inputNombre.value,
      descripcion: inputDescripcion.value,
      fecha: inputFecha.value,
      estado: selectEstado.value
    };

    const resultado = validFormFieldInput(dataTarea);

    if (resultado !== true) {
      contenidoModalError.textContent = resultado;
      modalErrorBS.show();
    } else {
      // Registro programático en la clase TaskManager
      taskManager.addTask(
        dataTarea.nombre,
        dataTarea.descripcion,
        dataTarea.fecha,
        dataTarea.estado
      );

      console.log("Tareas registradas en taskManager.tasks:", taskManager.tasks);
      
      modalExitoBS.show();
      formTarea.reset();
    }
  });
}

// 3. Interacción para conmutar estado de las tarjetas (Completada/Pendiente)
const contenedorTareas = document.querySelector('#contenedor-tareas');

if (contenedorTareas) {
  contenedorTareas.addEventListener('click', (event) => {
    // Buscar si el clic proviene del botón de estado (icono de check o botón verde)
    const btnCompletar = event.target.closest('.btn-outline-success, .btn-success');
    
    if (btnCompletar) {
      const tarjeta = btnCompletar.closest('.card-tarea');
      const badgeEstado = tarjeta.querySelector('.badge');
      const estaCompletada = tarjeta.classList.contains('estado-completada');

      if (estaCompletada) {
        // Volver a estado Pendiente
        tarjeta.classList.remove('estado-completada');
        tarjeta.classList.add('estado-pendiente');
        if (badgeEstado) {
          badgeEstado.className = 'badge bg-warning text-dark';
          badgeEstado.textContent = 'Pendiente';
        }
        btnCompletar.classList.remove('btn-success');
        btnCompletar.classList.add('btn-outline-success');
      } else {
        // Cambiar a estado Completada
        tarjeta.classList.remove('estado-pendiente', 'estado-en-proceso');
        tarjeta.classList.add('estado-completada');
        if (badgeEstado) {
          badgeEstado.className = 'badge bg-success';
          badgeEstado.textContent = 'Completada';
        }
        btnCompletar.classList.remove('btn-outline-success');
        btnCompletar.classList.add('btn-success');
      }
    }
  });
}