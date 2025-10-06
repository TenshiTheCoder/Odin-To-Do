import { Project, createProject } from "./barrel";

const mainContainer = document.querySelector("#main");

const initialProject = new Project(
  "New Project",
  "Change this description to fit your project",
  new Date(),
  false
);

createProject(initialProject);
