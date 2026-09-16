// 1. Instancia global de TaskManager y carga inicial desde LocalStorage
const taskManager = new TaskManager();
taskManager.load();

// Variable global para almacenar el ID de la tarea a eliminar
let idTareaAEliminar = null;

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

const modalConfirmarElemento = document.getElementById('modalConfirmarEliminar');
const modalConfirmarBS = new bootstrap.Modal(modalConfirmarElemento);
const btnConfirmarEliminar = document.getElementById('btn-confirmar-eliminar');

const contenedorTareas = document.querySelector('#contenedor-tareas');

// 2. Función de renderizado dinámico con estado vacío (Empty State)
function renderTasks() {
  if (!contenedorTareas) return;
  contenedorTareas.innerHTML = '';

  // Actualizar el contador de tareas en la cabecera
  const contadorElemento = document.querySelector('#contador-tareas');
  if (contadorElemento) {
    contadorElemento.textContent = taskManager.tasks.length;
  }

  // VALIDACIÓN: Si no hay tareas registradas, mostrar la tarjeta receptora (Empty State)
  if (taskManager.tasks.length === 0) {
    contenedorTareas.innerHTML = `
      <div class="text-center py-5 empty-state">
        <i class="bi bi-clipboard-check display-1 mb-3 d-block"></i>
        <h5 class="text-white fw-semibold">¡Todo al día!</h5>
        <p class="text-light-50 mb-0">No tienes tareas registradas. Agrega una nueva desde el formulario.</p>
      </div>
    `;
    return;
  }

  // Si existen tareas, renderizarlas en el DOM
  taskManager.tasks.forEach(task => {
    let badgeClass = 'bg-warning text-dark';
    let badgeText = 'Pendiente';
    let btnCompletarClass = 'btn-outline-success';
    let cardClass = 'estado-pendiente';

    if (task.status === 'DONE' || task.status === 'COMPLETADA') {
      badgeClass = 'bg-success';
      badgeText = 'Completada';
      btnCompletarClass = 'btn-success';
      cardClass = 'estado-completada';
    } else if (task.status === 'ENPROCESO') {
      badgeClass = 'bg-info text-dark';
      badgeText = 'En proceso';
    }

    const taskHtml = `
      <div class="card card-tarea text-white p-3 ${cardClass}" data-task-id="${task.id}">
        <div class="card-body p-0">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="card-title mb-0 fs-5">${task.name}</h5>
            <span class="badge ${badgeClass}">${badgeText}</span>
          </div>
          <p class="card-text text-light-50 mb-2">${task.description}</p>
          <div class="d-flex justify-content-between align-items-center pt-2 border-top border-secondary">
            <small class="text-light-50"><i class="bi bi-calendar3 me-1"></i>Entrega: ${task.dueDate}</small>
            <div class="d-flex gap-2">
              <button class="done-button btn ${btnCompletarClass} btn-sm btn-completar">
                <i class="bi bi-check-lg"></i>
              </button>
              <button class="delete-button btn btn-outline-danger btn-sm">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    contenedorTareas.insertAdjacentHTML('beforeend', taskHtml);
  });
}

// Renderizar tareas guardadas al cargar la vista
renderTasks();

// 3. Función de validación de formulario
function validFormFieldInput(data) {
  if (data.nombre.trim() === '') return "El nombre de la tarea no puede estar vacío.";
  if (data.descripcion.trim() === '') return "La descripción no puede estar vacía.";
  if (data.fecha === '') return "Debe ingresar una fecha de entrega válida.";
  if (data.estado === '' || data.estado === null) return "Debe seleccionar un estado.";
  return true;
}

// 4. Escuchador de envío de formulario (Crear Tarea)
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
      taskManager.addTask(
        dataTarea.nombre,
        dataTarea.descripcion,
        dataTarea.fecha,
        dataTarea.estado
      );
      taskManager.save();
      renderTasks();
      modalExitoBS.show();
      formTarea.reset();
    }
  });
}

// 5. Delegación de eventos para tarjetas de tareas
if (contenedorTareas) {
  contenedorTareas.addEventListener('click', (event) => {
    
    // ACCIÓN 1: Marcar como Hecho (Mark As Done)
    const btnDone = event.target.closest('.done-button');
    if (btnDone) {
      const parentTask = btnDone.closest('.card-tarea');
      if (parentTask) {
        const taskId = Number(parentTask.dataset.taskId);
        const task = taskManager.getTaskById(taskId);
        
        if (task) {
          task.status = (task.status === 'DONE' || task.status === 'COMPLETADA') ? 'PORHACER' : 'DONE';
          taskManager.save();
          renderTasks();
        }
      }
    }

    // ACCIÓN 2: Interceptar eliminación y abrir modal de advertencia
    const btnDelete = event.target.closest('.delete-button');
    if (btnDelete) {
      const parentTask = btnDelete.closest('.card-tarea');
      if (parentTask) {
        idTareaAEliminar = Number(parentTask.dataset.taskId);
        modalConfirmarBS.show();
      }
    }
  });
}

// 6. Confirmación definitiva de eliminación desde el Modal
if (btnConfirmarEliminar) {
  btnConfirmarEliminar.addEventListener('click', () => {
    if (idTareaAEliminar !== null) {
      taskManager.deleteTask(idTareaAEliminar);
      taskManager.save();
      renderTasks();
      modalConfirmarBS.hide();
      idTareaAEliminar = null;
    }
  });
}