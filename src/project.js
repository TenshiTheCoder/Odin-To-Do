const body = document.querySelector("#body"); 
const mainContainer = document.querySelector("#main");
import "./project.css";

export class Project{
  constructor(title, description, dueDate, isPriority = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isPriority = isPriority;
  }
}

export function createProject(project) {
  const projectContainer = document.createElement("div");
  projectContainer.classList.add("project-container");

  const projectHeading = document.createElement("h2");
  projectHeading.textContent = project.name;
  projectHeading.classList.add("project-heading");
  
  const editHeading = document.createElement("button");
  editHeading.textContent = "Edit Heading"
  // editTitle.addEventListener("click", editHeading);

  const projectDescription = document.createElement("p");
  projectDescription.textContent = project.description;
  projectDescription.classList.add("project-description");

  const editDescription = document.createElement("button");
  editDescription.textContent = "Edit This Description for your project";
  editDescription.classList.add("description-edit");

  const projectDate = document.createElement("p");
  projectDate.textContent = project.dueDate.toLocaleDateString();
  projectDate.classList.add("project-date");

  const changeDate = document.createElement("button");
  changeDate.textContent = "Change Date";
  changeDate.classList.add("change-date");

  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Is Priority: ";
  priorityLabel.htmlFor = "priority";

  const isPriority = document.createElement("input");
  isPriority.type = "radio"
  isPriority.classList.add("priority-button");
  isPriority.id = "priority";
  isPriority.checked = project.priority;

  projectContainer.append(
    projectHeading, 
    editHeading, 
    projectDescription, 
    editDescription, 
    projectDate, 
    changeDate, 
    priorityLabel, 
    isPriority
  );

  mainContainer.appendChild(projectContainer);
}

