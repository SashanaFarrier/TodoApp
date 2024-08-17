// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.


//get all tasks containers
const taskContainers = Array.from(document.getElementsByClassName("tasks"));
const sideBarNav = document.getElementById("sidebar-nav");

const notFoundMessage = document.querySelector(".not-found-message");

//show new task form
const addBtn = Array.from(document.querySelectorAll(".add-btn"));
addBtn.forEach(btn => btn.addEventListener("click", () => {

    const hiddenForm = document.querySelector(".new-task")
    hiddenForm.classList.remove("hidden")
}));

//Dashboard functionalities
selectActiveTab();
function selectActiveTab() {
    const LIs = Array.from(sideBarNav.querySelectorAll("li"));
    LIs.forEach(li => li.classList.remove("active"));
    let pathname = window.location.pathname;

    switch (pathname) {
        case "/Dashboard":
            LIs[0].classList.add("active");
            break;
        case "/TaskList":
            LIs[1].classList.add("active");
            break;
        case "/ProjectOverview":
            LIs[2].classList.add("active");
            break;
        case "/Calendar":
            LIs[3].classList.add("active");
            break;
        case "/Identity/Account/Manage/PersonalData":
            LIs[4].classList.add("active");
            break;
        case "/Identity/Account/Manage/PersonalData?handler=Logout":
            LIs[5].classList.add("active");
    }
}


//search tasks
const formFiltersContainer = document.querySelector(".form-filters");
const formEls = Array.from(formFiltersContainer.querySelectorAll("select"));
const taskTypes = document.querySelector(".task-types");

searchTasks()
filterTasks()
function searchTasks() {
    const searchbarContainer = document.querySelector(".search");
    const searchInput = searchbarContainer.querySelector("input");

    searchInput.addEventListener("input", (e) => {
        let searchVal = e.target.value;
        
        //hide all tasks and only display search results
        taskContainers.forEach(container => container.querySelectorAll(".card").forEach(el => el.style.display = "none"));

        const results = [];

        const searchResultsArray = taskContainers.map(container => {
          return Array.from(container.querySelectorAll(".card-details p")).filter(el => el.textContent.toLowerCase().includes(searchVal));
        }).filter(result => result.length > 0)

        //flatten array
        searchResultsArray.map(arr => results.push(...arr))
    
        if (results.length > 0) {
            results.forEach(result => result.closest(".card").style.display = "block");
            notFoundMessage.classList.add("d-none")
        }
        else {
            notFoundMessage.classList.remove("d-none")
        }

    });
}

function filterTasks() {
    formFiltersContainer.addEventListener("change", (e) => {
        const categoryVal = formEls[0].value;
        const priorityVal = formEls[1].value;
        const dateVal = formEls[2].value;
        const target = e.target.id;
        const targetValue = e.target.value;

        //if no search options were selected
        if (categoryVal == "" && priorityVal == "" && dateVal == "") {
            taskContainers.forEach(container => {
                //for parent divs with a class of hidden
                if (container.classList.contains("hidden")) {
                    container.classList.remove("hidden")
                }

                //for children todo divs with hidden class
                const todos = Array.from(container.querySelectorAll(".task-details .todo"))
                todos.map(todo => {
                    if (todo.classList.contains("hidden")) {
                        todo.classList.remove("hidden")
                    }
                });

            });
        }

        //if seach option selected
        if (targetValue !== "") {
            let categoryTaskContainer;
            switch (target) {
                case "category":
                    categoryTaskContainer = document.querySelector("." + targetValue + "-cards");
                    if (priorityVal === "" && dateVal === "") {
                        filterByCategory(targetValue);
                    } else if (priorityVal !== "" && dateVal !== "") {
                        filterByCategoryPriorityAndDate(categoryTaskContainer, targetValue, priorityVal, dateVal)
                    } else if (priorityVal !== "" && dateVal === "") {
                        filterByCategoryAndPriority(categoryTaskContainer, targetValue, priorityVal);
                    } else if (priorityVal === "" && dateVal !== "") {
                        filterByCategoryAndDate(categoryTaskContainer, targetValue, dateVal);
                    }
                    break;

                case "priority":
                    categoryTaskContainer = document.querySelector("." + categoryVal + "-cards");
                    if (categoryVal === "" && dateVal === "") {
                        taskContainers.map(container => {
                            const todos = Array.from(container.querySelectorAll(".todo"));
                            todos.filter(todo => priorityFilter(todo, targetValue));
                        });
                    } else if (categoryVal !== "" && dateVal !== "") {
                        filterByCategoryPriorityAndDate(categoryTaskContainer, categoryVal, targetValue, dateVal)
                    } else if (categoryVal !== "" && dateVal === "") {
                        filterByCategoryAndPriority(categoryTaskContainer, categoryVal, targetValue);
                    } else if (categoryVal === "" && dateVal !== "") {
                        filterByPriorityAndDate(priorityVal, dateVal);
                    }

                    break;

                case "date":
                    categoryTaskContainer = document.querySelector("." + categoryVal + "-cards");
                    if (categoryVal === "" && priorityVal === "") {
                        taskContainers.map(container => {
                            const todos = Array.from(container.querySelectorAll(".todo"));
                            todos.filter(todo => dateFilter(todo, targetValue));
                        })
                    } else if (categoryVal !== "" && priorityVal !== "") {
                        filterByCategoryPriorityAndDate(categoryTaskContainer, categoryVal, priorityVal, targetValue);
                    } else if (categoryVal !== "" && priorityVal === "") {
                        filterByCategoryAndDate(categoryTaskContainer, categoryVal, targetValue)
                    } else if (categoryVal === "" && priorityVal !== "") {
                        filterByPriorityAndDate(priorityVal, targetValue);
                    }
            }
        }
    });
}

function filterByCategory(category) {
    const tasksContainer = document.querySelector(".tasks-container");
    const todos = tasksContainer.querySelector(".todo-cards");
    const activeTodos = tasksContainer.querySelector(".active-cards");
    const overdueTodos = tasksContainer.querySelector(".overdue-cards");
    const completedTodos = tasksContainer.querySelector(".completed-cards");

    const categories = ["todo", "active", "overdue", "completed"];
    const tasksArray = [todos, activeTodos, overdueTodos, completedTodos];

    tasksArray.forEach(task => {
        task.parentElement.classList.add("hidden");
    });

    if (category === categories[0]) {
        todos.parentElement.classList.remove("hidden")
    } else if (category === categories[1]) {
       activeTodos.parentElement.classList.remove("hidden")
    } else if (category === categories[2]) {
        overdueTodos.parentElement.classList.remove("hidden");
    } else if (category === categories[3]) {
       completedTodos.parentElement.classList.remove("hidden")
    }
}

function filterByCategoryPriorityAndDate(categoryTodos, category, priorityVal, dateVal) {
    const todos = Array.from(categoryTodos.querySelectorAll(".todo"));
    filterByCategory(category);
    todos.filter(todo => {
        priorityFilter(todo, priorityVal)
        dateFilter(todo, dateVal);

    });
}

function filterByCategoryAndPriority(categoryTodos, category, priorityVal) {
    const todos = Array.from(categoryTodos.querySelectorAll(".todo"))
    //todos.forEach(todo => todo.classList.add("hidden"));
    filterByCategory(category);
    todos.filter(todo => priorityFilter(todo, priorityVal));
}

function filterByCategoryAndDate(categoryTodos, category, dateVal) {
    const todos = Array.from(categoryTodos.querySelectorAll(".todo"));
    filterByCategory(category);
    todos.filter(todo => dateFilter(todo, dateVal));
}

function filterByPriorityAndDate(priorityVal, dateVal) {
    taskContainers.filter(container => {
        const todos = container.querySelectorAll(".todo");
        todos.filter(todo => {
            priorityFilter(todo, priorityVal);
            dateFilter(todo, dateVal);
        })
    })
}

function priorityFilter(todo, value) {

    todo.classList.add("hidden");
    if (value == "low" && !todo.querySelector(".tag")) {
        todo.classList.remove("hidden");
    } else if (value == "medium" && todo.querySelector(".medium")) {
        todo.classList.remove("hidden");
    } else if (value == "high" && todo.querySelector(".high")) {
        todo.classList.remove("hidden")
        console.log(todo)
    } 
}

function dateFilter(todo, value) {
    todo.classList.add("hidden");
    const today = new Date();
    const todoDueDate = new Date(todo.querySelector(".due > span").textContent.split(":")[1]);
    
    if (value == "today" && todoDueDate.toLocaleDateString() == today.toLocaleDateString()) {
        todo.classList.remove("hidden");
    } else if (value == "this week" && todoDueDate.getDate() <= getLastDateInTheCurrentWeek()) {
        todo.classList.remove("hidden");
    } else if (value == "next week" && (todoDueDate.toLocaleDateString() <= getAllDatesForNextWeek() && todoDueDate.getDate() > getLastDateInTheCurrentWeek())) {
        todo.classList.remove("hidden");
    }

}

//helper functions
function getAllDatesForNextWeek() {
    const today = new Date();
    const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    const sevenDaysFromNow = new Date(Date.now() + sevenDaysInMilliseconds);
    return sevenDaysFromNow.toLocaleDateString()
}

function getLastDateInTheCurrentWeek() {
    const today = new Date();
    const daysInAWeek = 7;
    const currentDate = today.getDate();
    const currentDay = today.getDay();
    const remainingWeekDaysExcludingToday = (daysInAWeek - currentDay) - 1

    //calculate the last date in the current week
    const lastDateInTheCurrentWeek = currentDate + remainingWeekDaysExcludingToday;

    return lastDateInTheCurrentWeek;
}




