import { Project, createProject, themeButton, projects } from "./barrel";
import { attachListeners } from "./project";

const mainContainer = document.querySelector("#main");

// Initial template project
const initialProject = new Project(
  "New Project",
  "Change this description to fit your project",
  new Date(),
  false
);

createProject(initialProject);
projects.push(initialProject);
// attachListeners(initialProject);
themeButton();

