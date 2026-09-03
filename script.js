// Elementos del DOM
const formTarea = document.querySelector('#form-tarea');
const inputNombre = document.querySelector('#input-nombre');
const inputDescripcion = document.querySelector('#input-descripcion');
const inputFecha = document.querySelector('#input-fecha');
const selectEstado = document.querySelector('#select-estado');

// Inicialización de Modales de Bootstrap
const modalErrorElemento = document.getElementById('modalError');
const modalErrorBS = new bootstrap.Modal(modalErrorElemento);
const contenidoModalError = document.getElementById('contenido-modal-error');

const modalExitoElemento = document.getElementById('modalExito');
const modalExitoBS = new bootstrap.Modal(modalExitoElemento);

// Función de validación
function validFormFieldInput(data) {
  if (data.nombre.trim() === '') {
    return "El nombre de la tarea no puede estar vacío.";
  }
  if (data.descripcion.trim() === '') {
    return "La descripción no puede estar vacía.";
  }
  if (data.fecha === '') {
    return "Debe ingresar una fecha de entrega válida.";
  }
  if (data.estado === '') {
    return "Debe seleccionar un estado.";
  }
  return true;
}

// Escuchador de eventos del formulario
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
    // Si hay error, abre el modal de error
    contenidoModalError.textContent = resultado;
    modalErrorBS.show();
  } else {
    // Si todo está correcto, abre el modal de éxito y limpia el formulario
    modalExitoBS.show();
    formTarea.reset();
  }
});