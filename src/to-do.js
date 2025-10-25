import { currentProject, Project } from "./project"

export function toDoDialog(project){
  const tdDialog = document.createElement("dialog");
  tdDialog.classList.add = "td-dialog";

  const tdForm = document.createElement("form");  
  tdForm.classList.add = "td-form";

  const tdButton = document.createElement("button");
  tdButton.classList.add("td-open");
  tdButton.textContent = "Add To-Do";
  tdButton.addEventListener("click", () => {
    tdDialog.showModal;
  });



  const tdTitleLabel = document.createElement("label");
  tdTitleLabel.classList.add = "title-label";
  tdTitleLabel.htmlFor = "tdTitle";
  tdTitleLabel.textContent = "Title: ";

  const tdTitle = document.createElement("input");
  tdTitle.id = "tdTitle";
  tdTitle.placeholder = "Title";

  const tdTaskLabel = document.createElement("label");
  tdTaskLabel.htmlFor = "tdTask";
  tdTaskLabel.classList.add = "task-label"
  tdTaskLabel.textContent = "Tasks: "

  const tdTask = document.createElement("input");
  tdTask.placeholder = "Short description of you task here";
  tdTask.classList.add = "td-task";

  const tdDueLabel = document.createElement("label"); 
  tdDueLabel.htmlFor = "tdDueDate";
  tdDueLabel.classList.add = "due-date-label";
  tdDueLabel.textContent = "Due Date: ";

  const tdDueDate = document.createElement("input");
  tdDueDate.id = "tdDueDate";
  tdDueDate.type = "datetime-local";

  tdForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const tdTitleValue = tdTitle.value;
    const tdTaskValue = tdTask.value;

    const rawDate = tdDueDate.value;
    const formattedDate = new Date(rawDate).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

    const tdDateValue = formattedDate;
    const newToDo = {tdTitleValue, tdTaskValue, tdDateValue};
    currentProject.todos.push(newToDo);
  })

  tdForm.append(
    tdTitleLabel,
    tdTitle,
    tdTaskLabel,
    tdTask,
    tdDueLabel,
    tdDueDate
  )

  tdDialog.appendChild(tdForm)
};

export function renderToDoList(project){
  const toDoContainer = currentProject.toDoContainer;
  toDoContainer.innerHTML = "";

  currentProject.todos.forEach(todo => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const titleEl = document.createElement("h3");
    titleEl.textContent = todo.tdTitleValue;

    const taskEl = document.createElement("p");
    taskEl.textContent = todo.tdTaskValue;

    const dateEl = document.createElement("span");
    dateEl.textContent = todo.tdDateValue;

    todoItem.append(titleEl, taskEl, dateEl);
    toDoContainer.appendChild(todoItem);
  })
}
