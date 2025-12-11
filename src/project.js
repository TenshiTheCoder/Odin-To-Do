import { submitProjectForm, themeButton, renderToDoList } from "./barrel.js";
import { toDoDialog } from "./to-do.js";
import {saveProjects, loadProjects, deleteProject, clearProjects} from "./storage.js";
import { format } from "date-fns";
import "./styles.css";

const body = document.querySelector("#body");
const mainContainer = document.querySelector("#main");

document.addEventListener("DOMContentLoaded", () => {
  console.log("Loaded Projects: ", loadProjects());
})



export class Project{
  constructor(title, description, dueDate, timeDue, isPriority = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.timeDue = timeDue;
    this.isPriority = isPriority;
    this.todos = [];
    this.id = Date.now();
  }
}

export const projects = [];

export let currentProject = null;

// Function to build dialog for project creation
export function buildDialog() {
  const dialog = document.createElement("dialog");
  dialog.id = "project-dialog";
  body.append(dialog);

  const projectForm = document.createElement("form");
  projectForm.name = "project-form";
  projectForm.id = "project-form";

  projectForm.addEventListener("submit", submitProjectForm);

  const titleInputLabel = document.createElement("label");
  titleInputLabel.classList.add("title-label");
  titleInputLabel.htmlFor = "title-input";
  titleInputLabel.textContent = "Project Title: ";

  const titleInput = document.createElement("input");
  titleInput.classList.add("title-input");
  titleInput.id = "title-input";
  titleInput.name = "title";
  titleInput.type = "text";
  titleInput.maxLength = 100;
  titleInput.placeHolder = "Enter Project Title Here";
  titleInput.required = true;

  const descriptionLabel = document.createElement("label");
  descriptionLabel.classList.add("description-label");
  descriptionLabel.htmlFor = "description-input";
  descriptionLabel.textContent = "Description: ";

  const descriptionInput = document.createElement("textarea");
  descriptionInput.id = "description-input";
  descriptionInput.name = "description";
  descriptionInput.maxLength = 500;
  descriptionInput.placeholder = "Enter description here";

  const dateLabel = document.createElement("label");
  dateLabel.classList.add("date-label");
  dateLabel.htmlFor = "date-input";
  dateLabel.textContent = "Date: ";

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.id = "date-input";
  dateInput.name = "date";
  dateInput.valueAsDate = new Date();
  dateInput.required = true;

  const timeLabel = document.createElement("label");
  timeLabel.classList.add("time-label");
  timeLabel.htmlFor = "time-input";
  timeLabel.textContent = "Time: ";

  const timeInput = document.createElement("input");
  timeInput.id = "time-input";
  timeInput.type = "time";
  timeInput.name = "time";
  
  const priorityContainer = document.createElement("div");

  const priorityInputLabel = document.createElement("label");
  priorityInputLabel.htmlFor = "priority-input";
  priorityInputLabel.textContent = "Priority: ";

  const priorityInput = document.createElement("input");
  priorityInput.type = "checkbox";
  priorityInput.name = "priority";
  priorityInput.id = "priority-input";
  priorityInput.checked = false;

  priorityContainer.append(priorityInputLabel, priorityInput);
  priorityContainer.classList.add("priority-container");

  let currentMode = "create";

  const formButtonContainer = document.createElement("div");
  formButtonContainer.classList.add("form-button-container");

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Submit";
  submitButton.classList.add("submit-button");
  
  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.classList.add("cancel-button");
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
  })

  formButtonContainer.append(submitButton, cancelButton);

  projectForm.append(
    titleInputLabel,
    titleInput,
    descriptionLabel,
    descriptionInput,
    dateLabel,
    dateInput,
    timeLabel,
    timeInput,
    priorityContainer,
    formButtonContainer
  )
  dialog.appendChild(projectForm);

  return {
    dialog, 
    titleInput, 
    descriptionInput,
    dateInput, 
    timeInput, 
    priorityInput, 
    currentMode
  };
};

const savedProjects = loadProjects();
  savedProjects.forEach(proj => {
    const projectInstance = new Project(proj.title, proj.description, proj.dateAndTime);
    projectInstance.id = proj.id;
    projectInstance.priority = proj.priority;
    projects.push(projectInstance);

    createProject(projectInstance);
  });

export function handleProjectEdit(project, { dialog, titleInput, descriptionInput, dateInput, timeInput }) {
  const newTitle = titleInput.value.trim();
  const newDescription = descriptionInput.value.trim();

  let newDateAndTime;
    if (dateInput.value && timeInput.value) {
        const fullDate = new Date(`${dateInput.value}T${timeInput.value}`);
        newDateAndTime = `${format(fullDate, "MMMM d, yyyy : h:mm a")}`;
      } else if (dateInput.value) {
        const dateOnly = new Date(dateInput.value);
        newDateAndTime = format(dateOnly, "MMMM d, yyyy");
      } else if (timeInput.value) {
        const timeOnly = new Date(`1970-01-01T${timeInput.value}`);
        newDateAndTime = format(timeOnly, "h:mm a");
      } else {
        newDateAndTime = "No due date";
      }

  project.title = newTitle || project.title;
  project.description = newDescription || project.description;
  project.dueDate = newDateAndTime;

  const projectContainer = document.querySelector(`#project-${project.id}`);
  if (projectContainer) {
    projectContainer.querySelector(".project-title").textContent = project.title;
    projectContainer.querySelector(".project-description").textContent = project.description;
    projectContainer.querySelector(".project-date").textContent = project.dueDate;
  }

  dialog.close();
}

export function createProject(project) {
  const projectContainer = document.createElement("div");
  projectContainer.id = `project-${project.id}`;
  projectContainer.classList.add("project-container");

  const projectTop = document.createElement("div");
  projectTop.classList.add("project-top");

  const projectTitle = document.createElement("h2");
  projectTitle.textContent = project.title;
  projectTitle.classList.add("project-title");
  
  const editProject = document.createElement("button");
  editProject.id = "edit-project-${project.id}";
  editProject.innerHTML = `<i class="fa-solid fa-pen"></i>`;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-project");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;

  deleteButton.addEventListener("click", () => {
    deleteProject(project.id);
  })

  editProject.addEventListener("click", () => {
  const dialogData = buildDialog();
  const { dialog, titleInput, descriptionInput, dateInput, timeInput } = dialogData;

  dialog.dataset.currentMode = "edit";
  dialog.dataset.projectId = project.id;

  titleInput.value = project.title;
  descriptionInput.value = project.description;
  dateInput.value = project.dueDate || "";
  timeInput.value = project.timeDue || "";

  dialog.showModal();
});

  projectTop.append(projectTitle, editProject, deleteButton);
  
  const projectDescription = document.createElement("p");
  projectDescription.textContent = project.description;
  projectDescription.classList.add("project-description");

  const projectDate = document.createElement("p");
  projectDate.textContent = project.formattedDate;
  projectDate.classList.add("project-date");

  const projectTime = document.createElement("p");
  projectTime.textContent = project.timeDue;
  projectTime.classList.add("project-time");

  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Is Priority: ";
  priorityLabel.htmlFor = "priority";

  const isPriority = document.createElement("input");
  isPriority.type = "checkbox";
  isPriority.classList.add("priority-button");
  isPriority.id = "priority";
  isPriority.checked = project.isPriority;

  const priorityContainer = document.createElement("div");
  priorityContainer.classList.add("priority-container");

  priorityContainer.append(priorityLabel, isPriority);

  const tdButton = document.createElement("button");
  tdButton.classList.add("td-button");
  tdButton.textContent = "Add Task";

  const taskDialog = toDoDialog(project);

  tdButton.addEventListener("click", () => {
    currentProject = project;
    console.log(`Current project is: ${currentProject.title}`);
    taskDialog.showModal();
  })

  const toDoContainer = document.createElement("div");
  toDoContainer.id = "td-container-${project.id}";

  projectContainer.append(
    projectTop,
    projectDescription,
    projectDate, 
    projectTime,
    priorityContainer,
    tdButton,
    taskDialog,
    toDoContainer
  );
  mainContainer.appendChild(projectContainer);

  return {editProject, isPriority, toDoContainer};
}

export function newProject() {
  const newProjectButton = document.createElement("button");
  newProjectButton.classList.add("new-project");
  newProjectButton.textContent = "New Project";
  // newProjectButton.innerHTML = `<i class="fa-solid fa-plus"></i>`

  newProjectButton.addEventListener("click", () => {
    const dialogData = buildDialog();
    dialogData.dialog.dataset.currentMode = "add";
    dialogData.dialog.showModal();
  })

  mainContainer.appendChild(newProjectButton);
}

export function wipeProjects() {
  const wipeProjects = document.createElement("button");
  wipeProjects.classList.add("clear-projects"); 
  wipeProjects.textContent = "Clear Projects";

  wipeProjects.addEventListener("click", () => {
    clearProjects();
  })

  mainContainer.appendChild(wipeProjects);
}

newProject();
wipeProjects();

