import { currentProject, Project, projects } from "./project.js";
import { parseISO, format } from "date-fns";
import { saveProjects } from "./storage";
const main = document.querySelector("#main-container");

export function toDoDialog(project){
  const tdDialog = document.createElement("dialog");
  tdDialog.classList.add("td-dialog");

  const tdForm = document.createElement("form");  
  tdForm.classList.add("td-form")

  const tdButton = document.createElement("button");
  tdButton.classList.add("td-open");
  tdButton.textContent = "Add To-Do";
  
  const tdTitleLabel = document.createElement("label");
  tdTitleLabel.classList.add("title-label");
  tdTitleLabel.htmlFor = "tdTitle";
  tdTitleLabel.textContent = "Title: ";

  const tdTitle = document.createElement("input");
  tdTitle.id = "tdTitle";
  tdTitle.placeholder = "Title";

  const tdTaskLabel = document.createElement("label");
  tdTaskLabel.htmlFor = "tdTask";
  tdTaskLabel.classList.add("task-label");
  tdTaskLabel.textContent = "Tasks: "

  const tdTask = document.createElement("input");
  tdTask.placeholder = "Short description of you task here";
  tdTask.classList.add("td-task");

  const tdDueLabel = document.createElement("label"); 
  tdDueLabel.htmlFor = "tdDueDate";
  tdDueLabel.classList.add("due-date-label");
  tdDueLabel.textContent = "Due Date: ";

  const tdDueDate = document.createElement("input");
  tdDueDate.id = "tdDueDate";
  tdDueDate.type = "datetime-local";

  const tdSubmit = document.createElement("button");
  tdSubmit.classList.add("td-submit");
  tdSubmit.textContent = "Submit";

  const tdCancel = document.createElement("button");
  tdCancel.classList.add("td-cancel");
  tdCancel.textContent = "Cancel";
  tdCancel.type = "button";

  tdCancel.addEventListener("click", () => {
    tdDialog.close();
  })


  tdForm.addEventListener("submit", handleTodoSubmit);

  tdForm.append(
    tdTitleLabel,
    tdTitle,
    tdTaskLabel,
    tdTask,
    tdDueLabel,
    tdDueDate,
    tdSubmit,
    tdCancel
  )

  tdDialog.appendChild(tdForm);

  return tdDialog;
};

export function handleTodoSubmit(e) {
  debugger;
  e.preventDefault();

  const todoTitle = document.querySelector("#tdTitle");
  const todoTask = document.querySelector(".td-task");
  const todoDate = document.querySelector("#tdDueDate");

  currentProject.todos = currentProject.todos || [];
  currentProject.todos.push ({
    id: Date.now(),
    title: todoTitle.value,
    description: todoTask.value,
    dueDate: todoDate.value
  });

  saveProjects();
  renderToDoList(currentProject);
}

export function renderToDoList(project){
  const toDoContainer = document.querySelector("#td-container");

  project.todos.forEach(todo => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const titleEl = document.createElement("h3");
    titleEl.textContent = todo.title;

    const taskEl = document.createElement("p");
    taskEl.textContent = todo.description;

    const dateEl = document.createElement("span");
    dateEl.textContent = todo.dueDate;

    todoItem.append(titleEl, taskEl, dateEl);
    toDoContainer.appendChild(todoItem);
  });
}



