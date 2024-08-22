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

searchTasks();
filterTasks();
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

                    //filter by category only
                    if (priorityVal === "" && dateVal === "") {
                        filterByCategory(targetValue);
                    }
                    //filter by category, priority and date
                    else if (priorityVal !== "" && dateVal !== "") {
                        filterByCategoryPriorityAndDate(targetValue, priorityVal, dateVal, target)
                    }
                    //filter by category and priority
                    else if (priorityVal !== "" && dateVal === "") {
                        filterByCategoryAndPriority(categoryTaskContainer, targetValue, priorityVal);
                    }
                    //filter by category date
                    else if (priorityVal === "" && dateVal !== "") {
                        filterByCategoryAndDate(categoryTaskContainer, targetValue, dateVal);
                    }
                    break;

                case "priority":

                    categoryTaskContainer = document.querySelector("." + categoryVal + "-cards");
                    //filter by priority only
                    if (categoryVal === "" && dateVal === "") {
                        taskContainers.map(container => {
                            const todos = Array.from(container.querySelectorAll(".todo"));
                            todos.filter(todo => priorityFilter(todo, targetValue));
                        });
                    }
                    //filter by priority, category and date
                    else if (categoryVal !== "" && dateVal !== "") {
                        filterByCategoryPriorityAndDate(categoryVal, targetValue, dateVal, target)
                    }
                    //filter by priority and category
                    else if (categoryVal !== "" && dateVal === "") {
                        filterByCategoryAndPriority(categoryTaskContainer, categoryVal, targetValue);
                    }
                    //filter by priority and date
                    else if (categoryVal === "" && dateVal !== "") {
                        filterByPriorityAndDate(targetValue, dateVal, target)
                    }
                    break;

                case "date":
                    categoryTaskContainer = document.querySelector("." + categoryVal + "-cards");

                    //filter by date only
                    if (categoryVal === "" && priorityVal === "") {
                        taskContainers.map(container => {
                            const todos = Array.from(container.querySelectorAll(".todo"));
                            todos.filter(todo => dateFilter(todo, targetValue));
                        });
                    }

                    //filter by date, category and priority
                    else if (categoryVal !== "" && priorityVal !== "") {
                        filterByCategoryPriorityAndDate(categoryVal, priorityVal, targetValue, target);
                    }
                    //filter by date and category
                    else if (categoryVal !== "" && priorityVal === "") {
                        filterByCategoryAndDate(categoryTaskContainer, categoryVal, targetValue)
                    }
                    //filter by date and priority
                    else if (categoryVal === "" && priorityVal !== "") {
                        filterByPriorityAndDate(priorityVal, targetValue, target)
                    }
                    break;
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

//try to improve on this logic in the future
function filterByCategoryPriorityAndDate(categoryVal, priorityVal, dateVal, target) {
    
    if (target === "category") {

        filterByCategory(categoryVal);
        taskContainers.filter(container => {
            const category = container.querySelector("." + categoryVal + "-cards");

            if (category != null) {
                const categoryTodos = Array.from(category.querySelectorAll(".todo"));
                categoryTodos.filter(todo => {
                    
                    if (!priorityFilter(todo, priorityVal).classList.contains("hidden") && !dateFilter(todo, dateVal).classList.contains("hidden")) {
                        priorityFilter(todo, priorityVal);
                        dateFilter(todo, dateVal);
                    }
                });
            }
        });
      

    } else if (target === "priority") {
        filterByCategory(categoryVal);
        taskContainers.filter(container => {
            const category = container.querySelector("." + categoryVal + "-cards");

            if (category != null) {
                const categoryTodos = Array.from(category.querySelectorAll(".todo"));
                categoryTodos.filter(todo => {
                    if (!priorityFilter(todo, priorityVal).classList.contains("hidden") && !dateFilter(todo, dateVal).classList.contains("hidden"))
                        priorityFilter(todo, priorityVal);
                });
            }
        });

    } else if (target === "date") {
        filterByCategory(categoryVal);
        taskContainers.filter(container => {
            const category = container.querySelector("." + categoryVal + "-cards");

            if (category != null) {
                const categoryTodos = Array.from(category.querySelectorAll(".todo"));
                categoryTodos.filter(todo => {
                    if (!priorityFilter(todo, priorityVal).classList.contains("hidden") && !dateFilter(todo, dateVal).classList.contains("hidden"))
                        dateFilter(todo, dateVal);
                });
            }
        });
    }
}

function filterByCategoryAndPriority(categoryTodos, category, priorityVal) {
    const todos = Array.from(categoryTodos.querySelectorAll(".todo"))
    
    filterByCategory(category);
    todos.filter(todo => priorityFilter(todo, priorityVal));
}

function filterByCategoryAndDate(categoryTodos, category, dateVal) {
    const todos = Array.from(categoryTodos.querySelectorAll(".todo"));
    filterByCategory(category);
    todos.filter(todo => dateFilter(todo, dateVal));
}

function filterByPriorityAndDate(priorityVal, dateVal, target) {

    if (target === "priority") {

        if (dateVal === "today" || dateVal === "this week" || dateVal === "next week") {
            taskContainers.filter(container => {
                const todos = Array.from(container.querySelectorAll(".task-details .todo"));
                todos.filter(todo => {
                    if (!priorityFilter(todo, priorityVal).classList.contains("hidden") && !dateFilter(todo, dateVal).classList.contains("hidden")) {
                        priorityFilter(todo, priorityVal);
                    }
                });
            });
        } 

    }
    else if (target == "date") {
       
        if (priorityVal === "low") {
            taskContainers.filter(container => {
                const todos = Array.from(container.querySelectorAll(".task-details .todo"));
                todos.filter(todo => {
                    if (!todo.querySelector(".priority-tag")) {
                        dateFilter(todo, dateVal);
                    }
                })
               
            });

        } else if (priorityVal === "medium" || priorityVal === "high") {
            const MediumAndHighPriorityTasks = Array.from(document.querySelectorAll("." + priorityVal));
            MediumAndHighPriorityTasks.filter(task => {
                dateFilter(task.closest(".todo"), dateVal);
                
            })
        }
    } 
}

function priorityFilter(todo, value) {
    todo.classList.add("hidden");
    if (value == "low" && !todo.querySelector(".tag")) {
        todo.classList.remove("hidden");
        
    } else if (value == "medium" && todo.querySelector(".medium")) {
        todo.classList.remove("hidden");
       
    } else if (value == "high" && todo.querySelector(".high")) {
        todo.classList.remove("hidden");
       
    } 
   
    return todo;

}

function dateFilter(todo, value) {
    todo.classList.add("hidden");
    const today = new Date();
    const todoDueDate = new Date(todo.querySelector(".due > span").textContent.split(":")[1]);
   
    if (value == "today" && todoDueDate.toLocaleDateString() == today.toLocaleDateString()) {
        todo.classList.remove("hidden");
       
    } else if (value == "this week" && (todoDueDate.getUTCDate() >= getFirstDateInTheCurrentWeek() && todoDueDate.getUTCDate() <= getLastDateInTheCurrentWeek())) {
        todo.classList.remove("hidden");
       
    } else if (value == "next week" && (todoDueDate.toLocaleDateString() <= getAllDatesForNextWeek() && todoDueDate.getUTCDate() > getLastDateInTheCurrentWeek())) {
        todo.classList.remove("hidden");
       
    }

    return todo;
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
    const currentDate = today.getUTCDate();
    const currentDay = today.getUTCDay();
    const remainingWeekDaysExcludingToday = (daysInAWeek - currentDay) - 1;

    //calculate the last date in the current week
    const lastDateInTheCurrentWeek = currentDate + remainingWeekDaysExcludingToday;
    return lastDateInTheCurrentWeek;
}

function getFirstDateInTheCurrentWeek() {
    const today = new Date();
    const daysInAWeek = 7;
    const currentDay = today.getUTCDay();
    const remainingWeekDays = (daysInAWeek - currentDay); 

    //calculate the first date in the current week
    const totalNumberOfDaysPassed = daysInAWeek - remainingWeekDays;
    const firstDateInTheCurrentWeek = today.getUTCDate() - totalNumberOfDaysPassed;
    return firstDateInTheCurrentWeek;
}





