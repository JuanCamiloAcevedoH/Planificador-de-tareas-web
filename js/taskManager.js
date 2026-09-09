
class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, description, dueDate, status = 'PORHACER') {
    this.currentId++;
    const newTask = {
      id: this.currentId,
      name: name,
      description: description,
      dueDate: dueDate,
      status: status
    };
    this.tasks.push(newTask);
  }

  // Método para eliminar tarea por ID 
  deleteTask(taskId) {
    const newTasks = [];
    for (let task of this.tasks) {
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }
    this.tasks = newTasks;
  }

  // Persistencia en localStorage
  save() {
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', tasksJson);
    const currentIdStr = String(this.currentId);
    localStorage.setItem('currentId', currentIdStr);
  }

  load() {
    if (localStorage.getItem('tasks')) {
      const tasksJson = localStorage.getItem('tasks');
      this.tasks = JSON.parse(tasksJson);
    }
    if (localStorage.getItem('currentId')) {
      const currentIdStr = localStorage.getItem('currentId');
      this.currentId = Number(currentIdStr);
    }
  }
}