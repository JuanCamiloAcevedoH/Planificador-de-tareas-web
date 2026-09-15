// 1. Instancia global de TaskManager y carga inicial de localStorage
const taskManager = new TaskManager();
taskManager.load();

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

const contenedorTareas = document.querySelector('#contenedor-tareas');

// Función auxiliar para renderizar la lista de tareas
function renderTasks() {
  if (!contenedorTareas) return;
  contenedorTareas.innerHTML = '';

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
      <div class="card card-tarea bg-secondary text-white mb-3 ${cardClass}" data-task-id="${task.id}">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="card-title mb-0">${task.name}</h5>
            <span class="badge ${badgeClass}">${badgeText}</span>
          </div>
          <p class="card-text">${task.description}</p>
          <p class="card-text"><small class="text-light-50">Fecha de entrega: ${task.dueDate}</small></p>
          <div class="d-flex justify-content-end gap-2">
            <button class="done-button btn ${btnCompletarClass} btn-sm btn-completar">
              Mark As Done
            </button>
            <button class="delete-button btn btn-danger btn-sm">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    `;
    contenedorTareas.insertAdjacentHTML('beforeend', taskHtml);
  });
}

// Cargar tareas al iniciar
renderTasks();

// Función de validación de entradas
function validFormFieldInput(data) {
  if (data.nombre.trim() === '') return "El nombre de la tarea no puede estar vacío.";
  if (data.descripcion.trim() === '') return "La descripción no puede estar vacía.";
  if (data.fecha === '') return "Debe ingresar una fecha de entrega válida.";
  if (data.estado === '' || data.estado === null) return "Debe seleccionar un estado.";
  return true;
}

// Escuchar evento submit del formulario
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

// Delegación de eventos para la Lista de Tareas (Paso 2 y Paso 5 Tarea 7)
if (contenedorTareas) {
  contenedorTareas.addEventListener('click', (event) => {
    
    // 1. Detección del botón "Mark As Done" (.done-button)
    const btnDone = event.target.closest('.done-button');
    if (btnDone) {
      const parentTask = btnDone.closest('.card-tarea');
      if (parentTask) {
        const taskId = Number(parentTask.dataset.taskId);
        const task = taskManager.getTaskById(taskId);
        
        if (task) {
          task.status = (task.status === 'DONE') ? 'PORHACER' : 'DONE';
          taskManager.save();
          renderTasks();
        }
      }
    }

    // 2. Detección del botón "Eliminar" (.delete-button)
    if (event.target.classList.contains('delete-button')) {
      const parentTask = event.target.closest('.card-tarea');
      if (parentTask) {
        const taskId = Number(parentTask.dataset.taskId);
        taskManager.deleteTask(taskId);
        taskManager.save();
        renderTasks();
      }
    }
  });
}