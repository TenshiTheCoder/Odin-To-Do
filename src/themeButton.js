import {Project} from "./barrel.js";

export function themeButton() {
  const headerContainer = document.querySelector("#main-header");
  const bodyContainer = document.querySelector("#body");
  const footerContainer = document.querySelector("#footer");
  const projectContainer = document.querySelector(".project-container");

  const themeSelect = document.createElement("select");
  themeSelect.classList.add("theme-select");

  const lightTheme = document.createElement("option");
  lightTheme.selected = true;
  lightTheme.value = "Light";
  lightTheme.textContent = "Light";

  const greyTheme = document.createElement("option");
  greyTheme.value = "Grey";
  greyTheme.textContent = "Grey";

  const darkTheme = document.createElement("option");
  darkTheme.value = "Dark";
  darkTheme.textContent = "Dark";

  themeSelect.append(lightTheme, greyTheme, darkTheme);
  
  if(themeSelect.value === "Light") {
      bodyContainer.classList.add("light-theme");
      bodyContainer.classList.remove("grey-theme", "dark-theme");
      footerContainer.classList.add("light-theme");
      footerContainer.classList.remove("dark-theme");
      projectContainer.classList.add("light-theme");
      projectContainer.classList.remove("dark-theme");
    } else if (themeSelect.value === "Grey") {
      bodyContainer.classList.add("grey-theme");
      bodyContainer.classList.remove("light-theme", "dark-theme");
    } else {
      bodyContainer.classList.add("dark-theme");
      bodyContainer.classList.remove("light-theme", "grey-theme");
      footerContainer.classList.add("dark-theme");
      footerContainer.classList.remove("light-theme");
      projectContainer.classList.add("dark-theme");
      projectContainer.classList.remove("light-theme");
    }

  themeSelect.addEventListener("change", () => {
    if(themeSelect.value === "Light") {
      bodyContainer.classList.add("light-theme");
      bodyContainer.classList.remove("grey-theme", "dark-theme");
      footerContainer.classList.add("light-theme");
      footerContainer.classList.remove("dark-theme");
      projectContainer.classList.add("light-theme");
      projectContainer.classList.remove("dark-theme");
      
    } else if (themeSelect.value === "Grey") {
      bodyContainer.classList.add("grey-theme");
      bodyContainer.classList.remove("light-theme", "dark-theme");
    } else {
      bodyContainer.classList.add("dark-theme");
      bodyContainer.classList.remove("light-theme", "grey-theme");
      footerContainer.classList.add("dark-theme");
      footerContainer.classList.remove("light-theme");
      projectContainer.classList.add("dark-theme");
      projectContainer.classList.remove("light-theme");
    }
  });

  headerContainer.append(themeSelect);
}

