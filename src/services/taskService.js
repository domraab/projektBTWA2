// src/services/taskService.js

export async function getTasks() {
    const response = await fetch('/data/tasks.json');
    const tasks = await response.json();
    return tasks;
  }
  
  export async function createTask(taskData) {
    // V reálné situaci by to byl POST na API
    console.log("Simulated: Create task", taskData);
    return { ...taskData, id: Date.now() }; 
  }
  