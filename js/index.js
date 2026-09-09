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

// Función auxiliar para renderizar tareas registradas en el DOM
function renderTasks() {
  if (!contenedorTareas) return;
  contenedorTareas.innerHTML = '';

  taskManager.tasks.forEach(task => {
    let badgeClass = 'bg-warning text-dark';
    let badgeText = 'Pendiente';
    let btnCompletarClass = 'btn-outline-success';
    let cardClass = 'estado-pendiente';

    if (task.status === 'COMPLETADA') {
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
            <button class="btn ${btnCompletarClass} btn-sm btn-completar">
              <i class="bi bi-check-lg"></i>
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

// Cargar tareas guardadas al iniciar la vista
renderTasks();

// Función de validación de entradas
function validFormFieldInput(data) {
  if (data.nombre.trim() === '') return "El nombre de la tarea no puede estar vacío.";
  if (data.descripcion.trim() === '') return "La descripción no puede estar vacía.";
  if (data.fecha === '') return "Debe ingresar una fecha de entrega válida.";
  if (data.estado === '' || data.estado === null) return "Debe seleccionar un estado.";
  return true;
}

// 2. Escuchar evento submit del formulario
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
      // Registrar tarea en la clase y guardar en LocalStorage
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

// 3. Delegación de eventos para Conmutar Estado y Eliminar Tareas
if (contenedorTareas) {
  contenedorTareas.addEventListener('click', (event) => {

    // Accion A: ELIMINAR TAREA
    if (event.target.classList.contains('delete-button')) {
      const parentTask = event.target.closest('.card-tarea');

      if (parentTask) {
        const taskId = Number(parentTask.dataset.taskId);
        taskManager.deleteTask(taskId);
        taskManager.save();
        renderTasks();
      }
    }

    // Accion B: MARCAR COMO COMPLETADA / PENDIENTE
    const btnCompletar = event.target.closest('.btn-completar');
    if (btnCompletar) {
      const parentTask = btnCompletar.closest('.card-tarea');
      const taskId = Number(parentTask.dataset.taskId);

      // Buscar la tarea en la colección de TaskManager
      const task = taskManager.tasks.find(t => t.id === taskId);

      if (task) {
        task.status = (task.status === 'COMPLETADA') ? 'PORHACER' : 'COMPLETADA';
        taskManager.save();
        renderTasks();
      }
    }
  });
}