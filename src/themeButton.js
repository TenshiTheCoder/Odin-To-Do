import {Project} from "./barrel.js";

export function themeButton() {
  const headerContainer = document.querySelector("#main-header");
  const bodyContainer = document.querySelector("#body");
  const footerContainer = document.querySelector("#footer");

  const themeSelect = document.createElement("select");
  themeSelect.name = "themeSelect";
  themeSelect.classList.add("theme-select");

  const lightTheme = document.createElement("option");
  lightTheme.value = "Light";
  lightTheme.textContent = "Light";

  const darkTheme = document.createElement("option");
  darkTheme.value = "Dark";
  darkTheme.textContent = "Dark";

  themeSelect.append(lightTheme, darkTheme);
  
  const savedTheme = localStorage.getItem("user-theme");
  if (savedTheme) {
    themeSelect.value = savedTheme;
  } 

  function applyTheme() {
    if(themeSelect.value === "Light") {
      bodyContainer.classList.add("light-theme");
      bodyContainer.classList.remove("dark-theme");
      headerContainer.classList.add("light-theme");
      headerContainer.classList.remove("dark-theme");
      footerContainer.classList.add("light-theme");
      footerContainer.classList.remove("dark-theme");
    } else {
      bodyContainer.classList.add("dark-theme");
      bodyContainer.classList.remove("light-theme");
      headerContainer.classList.add("dark-theme");
      headerContainer.classList.remove("light-theme");
      footerContainer.classList.add("dark-theme");
      footerContainer.classList.remove("light-theme");
    }
  }

  applyTheme();

  themeSelect.addEventListener("change", () => {
    applyTheme();
    localStorage.setItem("user-theme", themeSelect.value);
  });

  headerContainer.append(themeSelect);
}

