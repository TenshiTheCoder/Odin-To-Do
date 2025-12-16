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

    const rawDate = dateInput.value || "";
    const rawTime = timeInput.value || "";

// Compute formatted date ONLY for display
    let dateAndTime;
    if (rawDate && rawTime) {
      const fullDate = new Date(`${rawDate}T${rawTime}`);
      dateAndTime = format(fullDate, "MMMM d, yyyy : h:mm a");
    } else if (rawDate) {
      const dateOnly = new Date(rawDate);
      dateAndTime = format(dateOnly, "MMMM d, yyyy");
    } else if (rawTime) {
      const timeOnly = new Date(`1970-01-01T${rawTime}`);
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
          rawDate,
          rawTime
      );
      projects.push(projectInstance);
      createProject(projectInstance);
      saveProjects();
    }

    projectDialog.close();
    projectForm.reset();;
}

