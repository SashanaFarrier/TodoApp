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

        const target = e.target.id;
        const value = e.target.value;
        //console.log(value)
        //category filter
        if (target == "category" && value !== "") {
            filterByCategory(value);
        } else if (target == "priority" && value !== "") {
            filterByPriority(value);
        } else if (target == "date" && value !== "") {
            filterByDate(value);
        }

        const filterState = formEls.every(el => {
            console.log(el.value)
            el.value = ""
        })

        console.log(filterState)
    });
}

    
            
function filterByCategory(value) {
    const priorityVal = formEls[1].value;
    const dateEl = formEls[2].value;
   
    taskContainers.forEach(container => {
        if (!container.classList.contains(value.toLowerCase())) {
            container.classList.add("hidden");
        } else {
            container.classList.remove("hidden");
            //const todos = Array.from(container.querySelectorAll(".todo"));
            //const dueDate = container.querySelector(".due > span").textContent;

            //if (priorityVal) {
            //    const todos = Array.from(container.querySelectorAll(".todo"));
            //    todos.forEach(todo => {
            //        todo.classList.add("hidden");
            //        if (!todo.querySelector(".tag") && priorityVal == "low") {
            //            todo.classList.remove("hidden");
            //        } else {
            //            if (priorityVal == "medium") {
            //                const mediumPriorityTasks = Array.from(container.querySelectorAll(".medium"));
            //                mediumPriorityTasks.forEach(task => {
            //                    task.closest(".todo").classList.remove("hidden")
            //                })


            //            } else if (priorityVal == "high") {
            //                const highPriorityTasks = Array.from(container.querySelectorAll(".high"));
            //                highPriorityTasks.forEach(task => {
            //                    task.closest(".todo").classList.remove("hidden")
            //                })
            //            }
            //        }

            //    })
            //}
        }

    });

   
}

function filterByPriority(value) {
    //const categoryVal = formEls[0].value;
    const dateEl = formEls[2].value;
    //console.log(dateEl)

    taskContainers.forEach(container => {
        const todos = Array.from(container.querySelectorAll(".todo"));
        todos.forEach(todo => {
            todo.classList.add("hidden");
            if (!todo.querySelector(".tag") && value == "low") {
                todo.classList.remove("hidden");
            } else {
                if (value == "medium") {
                    const mediumPriorityTasks = Array.from(container.querySelectorAll(".medium"));
                    mediumPriorityTasks.forEach(task => {
                        task.closest(".todo").classList.remove("hidden")
                    });

                } else if (value == "high") {
                    const highPriorityTasks = Array.from(container.querySelectorAll(".high"));
                    highPriorityTasks.forEach(task => {
                        task.closest(".todo").classList.remove("hidden")
                    });
                }
            }

        });
     
    });
}

function filterByDate(value) {
    taskContainers.forEach(container => {
       //console.log(container)
        const todos = Array.from(container.querySelectorAll(".todo"));
       
        todos.forEach(todo => {
            todo.classList.add("hidden");
            const todoCardsDueDates = Array.from(todo.querySelectorAll(".due > span"))
            
            todoCardsDueDates.filter(el => {
                if (el.textContent) {
                    const dueDate = el.textContent.split(":")[1];
                    const formattedDueDate = new Date(dueDate);
                    const today = new Date();
                    const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
                    const sevenDaysFromNow = new Date(Date.now() + sevenDaysInMilliseconds);
                    
                   
                    if (value == "today" && formattedDueDate.toLocaleDateString() == today.toLocaleDateString()) {
                        todo.classList.remove("hidden");
                       
                    } else if (value == "this week" && today.getDay()) {
                        todo.classList.remove("hidden");
                        //console.log(day + date)
                    } else if (value == "next week" && formattedDueDate.toLocaleDateString() == sevenDaysFromNow.toLocaleDateString()) {
                        todo.classList.remove("hidden");
                    } 
                    
                }
            })
            
        });

    });
}





