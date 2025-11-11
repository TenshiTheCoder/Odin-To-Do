import { createProject, Project, projects } from "./barrel";

export function saveProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function loadProjects() {
  const saved = localStorage.getItem("projects");

  if (!saved) return [];       // return empty array if nothing is stored
  try {
    return JSON.parse(saved);  // parse JSON safely
  } catch (err) {
    console.error("Failed to parse projects from localStorage:", err);
    return [];
  }
}

export function deleteProject(id) {
  console.log("Deleting project. ID is: ", id);
  console.log("Projects in storage before deletion:", loadProjects());

  const confirmation = confirm ("This project will be deleted. Continue?");
  if(!confirmation) return;

  const updatedProjects = loadProjects().filter(p => p.id !== id);

  projects.length = 0;
  projects.push(...updatedProjects);

  saveProjects(updatedProjects);

  const projectElement = document.getElementById(`project-${id}`);
  if(projectElement) projectElement.remove();

  console.log("Projects in memory:", projects);
}

export function clearProjects() {
  const confirmation = confirm ("This will delete ALL projects. Continue?");
  if(!confirmation) return;

  localStorage.removeItem("projects");
  const mainContainer = document.querySelector("#main-container");
  mainContainer.innerHTML = "";
}