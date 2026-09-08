// 1. Instancia de TaskManager
const taskManager = new TaskManager();
console.log(taskManager.tasks);

// 2. Elementos del DOM del formulario
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

// 3. Función de validación
function validFormFieldInput(data) {
  if (data.nombre.trim() === '') return "El nombre de la tarea no puede estar vacío.";
  if (data.descripcion.trim() === '') return "La descripción no puede estar vacía.";
  if (data.fecha === '') return "Debe ingresar una fecha de entrega válida.";
  if (data.estado === '') return "Debe seleccionar un estado.";
  return true;
}

// 4. Listener del formulario
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
    modalExitoBS.show();
    formTarea.reset();
  }
});

// 5. Interacción para marcar/desmarcar tarea completada (Sprint 2)
const contenedorTareas = document.querySelector('#contenedor-tareas');

if (contenedorTareas) {
  contenedorTareas.addEventListener('click', (event) => {
    const btnCompletar = event.target.closest('.btn-outline-success, .btn-success');
    
    if (btnCompletar) {
      const tarjeta = btnCompletar.closest('.card-tarea');
      const badgeEstado = tarjeta.querySelector('.badge');
      const estaCompletada = tarjeta.classList.contains('estado-completada');

      if (estaCompletada) {
        tarjeta.classList.remove('estado-completada');
        tarjeta.classList.add('estado-pendiente');
        badgeEstado.className = 'badge bg-warning text-dark';
        badgeEstado.textContent = 'Pendiente';
        btnCompletar.classList.remove('btn-success');
        btnCompletar.classList.add('btn-outline-success');
      } else {
        tarjeta.classList.remove('estado-pendiente', 'estado-en-proceso');
        tarjeta.classList.add('estado-completada');
        badgeEstado.className = 'badge bg-success';
        badgeEstado.textContent = 'Completada';
        btnCompletar.classList.remove('btn-outline-success');
        btnCompletar.classList.add('btn-success');
      }
    }
  });
}
