// src/services/projectService.js

let cachedProjects = null;

export async function getProjects() {
  if (!cachedProjects) {
    const res = await fetch("/data/projects.json");
    const data = await res.json();
    cachedProjects = data; 
  }
  return cachedProjects;
}


export async function createProject(projectData) {

  if (!cachedProjects) {
    await getProjects(); 
  }

  const newId = Date.now(); 
  const newProject = {
    id: newId,
    ...projectData
  };
  cachedProjects.push(newProject);
  console.log("Simulated: project added to cachedProjects", newProject);
  return newProject;
}


export async function updateProjectStatus(projectId, newStatus) {
  if (!cachedProjects) {
    await getProjects();
  }
  const p = cachedProjects.find(p => p.id === projectId);
  if (p) {
    p.status = newStatus;
    console.log(`Simulated: project #${projectId} updated to status: ${newStatus}`);
  }
  return true;
}
