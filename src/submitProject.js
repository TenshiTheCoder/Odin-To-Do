import { createProject, Project, projects } from "./barrel";

export function submitProjectForm() {
  const projectForm = document.querySelector("#project-form");
  const titleInput = document.querySelector("#title-input");
  const descriptionInput = document.querySelector("#description-input");
  const dateInput = document.querySelector("#date-input");
  const timeInput = document.querySelector("#time-input");
  const priority = document.querySelector("#priority-input");

  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let dateAndTime;
    if (dateInput.value && timeInput.value) {
      dateAndTime = new Date(`${dateInput.value}T${timeInput.value}`);
    } else {
      dateAndTime = new Date(dateInput.value);
    }

    const projectInstance = new Project(
      titleInput.value,
      descriptionInput.value,
      dateAndTime,
      timeInput.value,
      priority.checked || false
    );

    projects.push(projectInstance);
    createProject(projectInstance);

    projectForm.reset();
  });
}
