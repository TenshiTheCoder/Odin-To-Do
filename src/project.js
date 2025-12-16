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

  priorityContainer.classList.add("priority-container");

  const prioritySelect = document.createElement("select");
  prioritySelect.classList.add("priority-button");
  prioritySelect.id = "priority";

  const priorityZero = document.createElement("option");
  priorityZero.selected = true;
  priorityZero.value = "0";
  priorityZero.textContent = "P0";
  priorityZero.classList.add("priority-zero");

  const priorityOne = document.createElement("option");
  priorityOne.value = "1";
  priorityOne.textContent = "P1";
  priorityOne.classList.add("priority-one");

  const priorityTwo = document.createElement("option");
  priorityTwo.value = "2";
  priorityTwo.textContent = "P2";
  priorityTwo.classList.add("priority-two");

  const priorityThree = document.createElement("option");
  priorityThree.value = "3";
  priorityThree.textContent = "P3";
  priorityThree.classList.add("priority-three");

  prioritySelect.append(priorityZero, priorityOne, priorityTwo, priorityThree);

  function changePriorityLevel () {
      const projectContainer = document.querySelector(`#project-${currentProject.id}`);

      if (prioritySelect.value === "0") {
        projectContainer.classList.add("no-priority");
        projectContainer.classList.remove("priority-blue", "priority-green", "priority-red");
    } else if (prioritySelect.value === "1") {
        projectContainer.classList.add("priority-green");
        projectContainer.classList.remove("no-priority", "priority-blue", "priority-red");
    } else if (prioritySelect.value === "2") {
        projectContainer.classList.add("priority-blue");
        projectContainer.classList.remove("no-priority","priority-green","priority-red");
    } else if (prioritySelect.value === "3") {
        projectContainer.classList.add("priority-red");
        projectContainer.classList.remove("no-priority","priority-blue","priority-green");
    }
  }

  prioritySelect.addEventListener("change", () => {
    changePriorityLevel(currentProject.id);
  })

  priorityContainer.append(priorityInputLabel, prioritySelect);
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
    currentMode
  };
};

const savedProjects = loadProjects();
  savedProjects.forEach(proj => {
    const projectInstance = new Project(proj.title, proj.description, proj.dateAndTime);
    projectInstance.id = proj.id;
    projectInstance.isPriority = proj.priority;
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
  editProject.id = `edit-project-${project.id}`;
  editProject.classList.add("edit-project");
  editProject.innerHTML = `<i class="fa-solid fa-pen"></i>`;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-project");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;

  deleteButton.addEventListener("click", () => {
    deleteProject(project.id);
  })

  editProject.addEventListener("click", () => {
    currentProject = project;
    const dialogData = buildDialog();
    const { dialog, titleInput, descriptionInput, dateInput, timeInput } = dialogData;
    dialog.projectContainer = projectContainer;

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
    tdButton,
    taskDialog,
    toDoContainer
  );
  mainContainer.appendChild(projectContainer);

  return {editProject, toDoContainer, projectContainer};
}

export function newProject() {
  const newProjectButton = document.createElement("button");
  newProjectButton.classList.add("new-project");
  newProjectButton.textContent = "New Project";

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

