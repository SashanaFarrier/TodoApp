import '../css/site.css';

//import selectActiveTab from "./activeDashboardTab.js";
import searchTasks from "./searchTasks.js";
import filterTasks from "./filterTasks.js";



//show new task form
const addBtn = Array.from(document.querySelectorAll(".add-btn"));
const sideBarNav = document.getElementById("sidebar-nav");

addBtn.forEach(btn => btn.addEventListener("click", () => {
    const hiddenForm = document.querySelector(".new-task")
    hiddenForm.classList.remove("hidden")
}));


//selectActiveTab(sideBarNav);

if(window.location.pathname == "/TaskList") {
    searchTasks();
    filterTasks();
}


