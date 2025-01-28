// src/services/projectService.js

let cachedProjects = null;

// 1. getProjects()
// Načítá data z "/data/projects.json", ale jen jednou.
// Uloží je do cachedProjects, abychom je při dalším volání už nefetchovali.
export async function getProjects() {
  if (!cachedProjects) {
    const res = await fetch("/data/projects.json");
    const data = await res.json();
    cachedProjects = data; 
  }
  return cachedProjects;
}

// 2. createProject()
// V reálu by to byl POST na server. Tady jen upravíme paměť (cachedProjects)
export async function createProject(projectData) {
  // Pokud ještě nemáme data načtená, fetchneme
  if (!cachedProjects) {
    await getProjects(); 
  }
  // Simulace generování nového ID (timestamp)
  const newId = Date.now(); 
  const newProject = {
    id: newId,
    ...projectData
  };
  cachedProjects.push(newProject);
  console.log("Simulated: project added to cachedProjects", newProject);
  return newProject;
}

// 3. Případně i updateProjectStatus(...)
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
