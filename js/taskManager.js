// js/taskManager.js

class TaskManager {
  // 1. Constructor con currentId por defecto en 0
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  // 2. Método addTask para registrar objetos en el arreglo
  addTask(name, description, dueDate, status = 'PORHACER') {
    // Incrementar el ID único
    this.currentId++;

    // Crear la nueva tarea como un objeto
    const newTask = {
      id: this.currentId,
      name: name,
      description: description,
      dueDate: dueDate,
      status: status
    };

    // Almacenar la tarea en la lista
    this.tasks.push(newTask);
  }
}