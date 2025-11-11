import { createProject, Project, projects } from "./barrel";
import { saveProjects, loadProjects } from "./storage";
import { handleProjectEdit } from "./project";
import { format } from "date-fns";



export function submitProjectForm(e) {
    e.preventDefault();

    const projectDialog = document.querySelector("#project-dialog");
    const projectForm = document.querySelector("#project-form");
    const titleInput = document.querySelector("#title-input");
    const descriptionInput = document.querySelector("#description-input");
    const dateInput = document.querySelector("#date-input");
    const timeInput = document.querySelector("#time-input");
    const priority = document.querySelector("#priority-input");

    let dateAndTime;
    if (dateInput.value && timeInput.value) {
        const fullDate = new Date(`${dateInput.value}T${timeInput.value}`);
        dateAndTime = `${format(fullDate, "MMMM d, yyyy : h:mm a")}`;
      } else if (dateInput.value) {
        const dateOnly = new Date(dateInput.value);
        dateAndTime = format(dateOnly, "MMMM d, yyyy");
      } else if (timeInput.value) {
        const timeOnly = new Date(`1970-01-01T${timeInput.value}`);
        dateAndTime = format(timeOnly, "h:mm a");
      } else {
        dateAndTime = "No due date";
      }

      const mode = projectDialog.dataset.currentMode;
      const id = projectDialog.dataset.projectId;

      if (mode === "edit") {
        const projectToEdit = projects.find(p => p.id === Number(id));
        handleProjectEdit(projectToEdit, {
          titleInput,
          descriptionInput,
          dateInput,
          timeInput,
          dialog: projectDialog
        });
      } else {
        const projectInstance = new Project(
          titleInput.value,
          descriptionInput.value,
          dateAndTime
      );
      projects.push(projectInstance);
      createProject(projectInstance);
      saveProjects();
    }

    projectDialog.close();
    projectForm.reset();;
}

