import { Project } from "./barrel";

export function submitProjectForm(){
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    new Project(
      titleInput.value,
      descriptionInput.value,
      dateInput.value,
      timeInput.value
    )

    if(dateInput.value && timeInput.value){
      {`${dateInput.value}: ${timeInput.value}`};
    } else {
      return;
    }
  })
}