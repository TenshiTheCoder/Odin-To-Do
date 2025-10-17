import "./project.css";

const body = document.querySelector("#body");
const mainContainer = document.querySelector("#main");
export let currentProject = null;

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

export function buildDialog() {
  const dialog = document.createElement("dialog");
  dialog.id = "project-dialog";
  body.append(dialog);

  const projectForm = document.createElement("form");
  projectForm.id = "project-form";

  const titleInputLabel = document.createElement("label");
  titleInputLabel.htmlFor = "title-input";
  titleInputLabel.textContent = "Project Title: ";

  const titleInput = document.createElement("input")
  titleInput.id = "title-input";
  titleInput.name = "title";
  titleInput.type = "text";
  titleInput.maxLength = 100;
  titleInput.placeHolder = "Enter Project Title Here";
  titleInput.required = true;

  const descriptionLabel = document.createElement("label");
  descriptionLabel.htmlFor = "description-input";
  descriptionLabel.textContent = "Description: ";

  const descriptionInput = document.createElement("textarea");
  descriptionInput.id = "description-input";
  descriptionInput.name = "description";
  descriptionInput.maxLength = 500;
  descriptionInput.placeholder = "Enter description here";

  const dateLabel = document.createElement("label");
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

  const timeInput = document.createElement("input");
  timeInput.id = "time-input";
  timeInput.type = "time";
  timeInput.name = "time";
  
  const priorityInputLabel = document.createElement("label");
  priorityInputLabel.htmlFor = "priority-input";
  priorityInputLabel.textContent = "Priority?";

  const priorityInput = document.createElement("input");
  priorityInput.type = "checkbox";
  priorityInput.name = "priority";
  priorityInput.id = "priority-input";
  priorityInput.checked = false;

  let currentMode = "create";
  

  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const titleValue = titleInput.value;
    const descriptionValue = descriptionInput.value;
    const dateValue = dateInput.value;
    const timeValue = timeInput.value;

    let dueDate, timeDue;
    if(timeValue) {
      const dueDateTime = new Date(`${dateValue}T${timeValue}`);
      dueDate = dueDateTime;
      timeDue = dueDateTime;
    } else {
      dueDate = dateValue;
      timeDue = "";
    }

    if(currentMode === "create") {
      const newProject = new Project (
        titleValue,
        descriptionValue,
        dueDate,
        timeDue,
        priorityInput.checked,
      )
    } else if (currentMode === "edit") {
        currentProject.title = titleInput.value;
        currentProject.description = descriptionInput.value;

        if (timeValue) {
          const combinedDateTime = new Date(`${dateInput.value}T${timeInput.value}`);
          currentProject.dueDate = combinedDateTime;
          currentProject.timeDue = combinedDateTime;
        } else {
          currentProject.dueDate = dateInput.value;
          currentProject.timeDue = "";
        }
        currentProject.isPriority = priorityInput.checked;
      }
    })
  
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

  projectForm.append(
    titleInputLabel,
    titleInput,
    descriptionLabel,
    descriptionInput,
    dateLabel,
    dateInput,
    timeLabel,
    timeInput,
    priorityInputLabel,
    priorityInput,
    submitButton, 
    cancelButton
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
  editTitle.textContent = "Edit Title";
  
  const projectDescription = document.createElement("p");
  projectDescription.textContent = project.description;
  projectDescription.classList.add("project-description");

  const editDescription = document.createElement("button");
  editDescription.textContent = "Edit Description";
  editDescription.classList.add("description-edit");

  const projectDate = document.createElement("p");
  projectDate.textContent = project.dueDate.toLocaleDateString();
  projectDate.classList.add("project-date");

  const changeDate = document.createElement("button");
  changeDate.textContent = "Change Date";
  changeDate.classList.add("change-date");

  const projectTime = document.createElement("p");
    if (project.timeDue) {
    // timeDue is a Date object if provided
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

export function attachListeners(project) {
  const {editTitle, editDescription, isPriority, changeDate, changeTime} = createProject()
  const {dialog, titleInput, descriptionInput, dateInput, timeInput} = buildDialog();

  editTitle.addEventListener("click", () => {
    dialog.showModal();
    titleInput.focus();
  });

  editDescription.addEventListener("click", () => {
    dialog.showModal();
    descriptionInput.focus();
  }); 
    
  changeDate.addEventListener("click", () => {
    dialog.showModal();
    dateInput.focus();
  });

  changeTime.addEventListener("click", () => {
    dialog.showModal();
    timeInput.focus();
  })

  isPriority.addEventListener("change", () => {
    console.log("Priority changed:", isPriority.checked);
  });
}

function newProject() {
  const newProjectButton = document.createElement("button");
  newProjectButton.textContent = "New Project";

  newProjectButton.addEventListener("click", () => {
    const dialogData = buildDialog();
    dialogData.dialog.showModal();
  })

  mainContainer.appendChild(newProjectButton);
}


newProject();