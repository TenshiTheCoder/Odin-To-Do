import { Project, createProject, themeButton, projects, saveProjects } from "./barrel";
import { format } from "date-fns";
import { attachListeners } from "./project";

const mainContainer = document.querySelector("#main");

// Initial template project
const initialProject = new Project(
  "New Project",
  "Description",
  format(new Date(), "MMMM d, yyyy : h:mm a"),
);


createProject(initialProject);
projects.push(initialProject);
saveProjects();
themeButton();

