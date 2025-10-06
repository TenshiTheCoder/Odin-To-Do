import { Project } from "./project"

export function toDoDialog(project){
  const tdDialog = document.createElement("dialog");
  tdDialog.classList.add = "td-dialog";

  const tdForm = document.createElement("form");  
  tdForm.classList.add = "td-form";

  const tdTitleLabel = document.createElement("label");
  tdTitleLabel.htmlFor = "tdTitle";

  const tdTitle = document.createElement("input");
  tdTitle.id = "tdTitle";
  tdTitle.placeholder = "Title";

  

}