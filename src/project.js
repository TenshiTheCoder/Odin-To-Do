import { submitProjectForm } from "./barrel.js";
import "./styles.css";
import { themeButton } from "./themeButton.js";

export let currentProject = null;

const body = document.querySelector("#body");
const mainContainer = document.querySelector("#main");

export class Project{
  constructor(title, description, dueDate, timeDue, isPriority = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.timeDue = timeDue;
    this.isPriority = isPriority;
    this.todos = [];
  }
}

export const projects = [];

// Function to build dialog for project creation
export function buildDialog() {
  const dialog = document.createElement("dialog");
  dialog.id = "project-dialog";
  body.append(dialog);

  const projectForm = document.createElement("form");
  projectForm.id = "project-form";

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

  submitButton.addEventListener("click", () => {
    submitProjectForm();
  })
  
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

export function createProject(project) {
  const projectContainer = document.createElement("div");
  projectContainer.classList.add("project-container");

  const projectTitle = document.createElement("h2");
  projectTitle.textContent = project.title;
  projectTitle.classList.add("project-title");
  
  const editTitle = document.createElement("button");
  editTitle.id = "edit-title";
  editTitle.textContent = "Edit Title";
  
  const projectDescription = document.createElement("p");
  projectDescription.textContent = project.description;
  projectDescription.classList.add("project-description");

  const editDescription = document.createElement("button");
  editDescription.textContent = "Edit Description";
  editDescription.classList.add("change-description");

  const projectDate = document.createElement("p");
  projectDate.textContent = project.dueDate.toLocaleDateString();
  projectDate.classList.add("project-date");

  const changeDate = document.createElement("button");
  changeDate.textContent = "Change Date";
  changeDate.classList.add("change-date");

  const projectTime = document.createElement("p");
    if (project.timeDue) {
    projectTime.textContent = project.timeDue.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  } else {
    projectTime.textContent = "No time set";
  }

  const changeTime = document.createElement("button");
  changeTime.textContent = "Change Time";
  changeTime.classList.add("change-time");

  const priorityLabel = document.createElement("label");
  priorityLabel.textContent = "Is Priority: ";
  priorityLabel.htmlFor = "priority";

  const isPriority = document.createElement("input");
  isPriority.type = "checkbox";
  isPriority.classList.add("priority-button");
  isPriority.id = "priority";
  isPriority.checked = project.isPriority;

  const toDoContainer = document.createElement("div");
  toDoContainer.id = "todo-container";

  projectContainer.append(
    projectTitle, 
    editTitle, 
    projectDescription, 
    editDescription, 
    projectDate, 
    changeDate, 
    projectTime,
    changeTime,
    priorityLabel, 
    isPriority,
    toDoContainer
  );
  mainContainer.appendChild(projectContainer);

  return {editDescription, editTitle, changeDate, changeTime, isPriority, toDoContainer};
}

export function newProject() {
  const newProjectButton = document.createElement("button");
  newProjectButton.classList.add("new-project");
  newProjectButton.textContent = "New Project";

  newProjectButton.addEventListener("click", () => {
    const dialogData = buildDialog();
    dialogData.dialog.showModal();
  })

  mainContainer.appendChild(newProjectButton);
}

newProject();

