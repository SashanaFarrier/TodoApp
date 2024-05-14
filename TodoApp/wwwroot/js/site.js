// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.



//get all tasks containers
const taskContainers = Array.from(document.getElementsByClassName("tasks"));

//show new task form
const addBtn = Array.from(document.querySelectorAll(".add-btn"));
addBtn.forEach(btn => btn.addEventListener("click", () => {

    const form = document.querySelector(".todo-cards").querySelector("form")
    form.classList.remove("hidden")
}));



//search tasks
searchTasks()
filterTasks()
function searchTasks() {
    const searchbarContainer = document.querySelector(".search");
    const searchInput = searchbarContainer.querySelector("input");
    const notFoundMessage = document.querySelector(".not-found-message")

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

const notFoundMessage = document.querySelector(".not-found-message")

function filterTasks() {
    const formFiltersContainer = document.querySelector(".form-filters");
        
    const formEls = Array.from(formFiltersContainer.querySelectorAll("select"));
    let results = []
    formEls.forEach(el => {
        el.addEventListener("change", (e) => {
            let val = el.value;
            let priorityLabel = document.querySelector("#priority")
            console.log(priorityLabel.value)
            /*let categoryLabel,priorityLabel, dateLabel*/
            //hide all tasks and only display search results
           /* taskContainers.forEach(container => container.style.display = "none");*/
           // taskContainers.forEach(container => container.querySelectorAll(".card").forEach(el => el.style.display = "none"));

            if (e.target.closest(".category-btn")) {
                //let taskPriority;
                //if (priorityLabel != "Priority") {
                //    taskPriority = priorityLabel.value;
                //    filterByCategory(val).filter(tasksContainer => {
                //        const getPriority = Array.from(tasksContainer.querySelectorAll(".tag"))
                //        const tags = getPriority.filter(tag => tag.textContent == taskPriority)
                //        console.log(task)
                //    })
                //}
                const category = filterByCategory(val);
              
                // console.log(category)
                if (category.length > 0) {
                    results.push(...category)
                }
            }

            if (e.target.closest(".priority-btn")) {

                const priority = filterByPriority(val);
                //console.log(priority)
                if (priority.length > 0) {
                    results.push(...priority)
                }

                //if (results.length > 0) {
                //    results.map(result => {
                //        result.parentElement.parentElement.style.display = "block";
                //    })
                //}

            }

            if (results.length > 0) {
               // console.log(results)
                results.forEach(result => {
                   // let tag = result.querySelector(".priority-tag .tag");
                   // tag.closest(".card").style.display = "block";
                    result.style.display = "block";
                    
                    notFoundMessage.classList.add("d-none")
                })

            }
            else {
                notFoundMessage.classList.remove("d-none")
            }

            //empty results array to reset
            results = []
        })


    }); 
}


function filterByCategory(val) {
    let priorityContainer;
    let priorityFilter = document.querySelector("#priority").value; 
    let searchResultsArray = []

    taskContainers.forEach(container => container.style.display = "none");

  

    if (val == "todo") {
        let parentEl = Array.from(document.querySelectorAll(".todo.tasks"))
        //check if other filters have already been applied
        if (priorityFilter != "Priority") {
            // const taskContainer = document.querySelector(`.${categoryFilter}`)
            priorityContainer = Array.from(parentEl.querySelectorAll(".priority-tag"));

            //FIX HERE 
            //priorityContainer = priorityContainer.filter(priority => {
            //    const tag = priority.querySelector(".tag") || "Low"
            //    if (tag.textContent == "Medium") {
            //        return tag.closest(".todo")
            //    } else if (tag.textContent == "High") {
            //        return tag.closest(".todo")
            //    }
            //});
            searchResultsArray = priorityContainer;
        } else {
            searchResultsArray = parentEl.filter(container => container.classList.contains(val));
          //  tagsContainer = Array.from(document.querySelectorAll(".priority-tag"));
        }
      /*  searchResultsArray = parentEl.filter(container => container.classList.contains(val));*/

    } else if (val == "completed") {
        let parentEl = Array.from(document.querySelectorAll(".completed.tasks"))
        searchResultsArray = parentEl.filter(container => container.classList.contains(val));
    } else if (val == "in progress") {
        let parentEl = Array.from(document.querySelectorAll(".in-progress.tasks"))
        searchResultsArray = parentEl.filter(container => container.classList.contains(val));
        return;
    } else if (val == "overdue") {
        let parentEl = Array.from(document.querySelectorAll(".overdue.tasks"))
        searchResultsArray = parentEl.filter(container => container.classList.contains(val));
    }
   

    return searchResultsArray
}

function filterByPriority(val) {
    /*   let tagsContainer = Array.from(document.querySelectorAll(".priority-tag"));*/
    let tagsContainer;
    let categoryFilter = document.querySelector("#category").value;
    //if categoryFilter has a space, remove space and add hyphen
    categoryFilter = categoryFilter.replace(/\s+/g, "-");

    let searchResultsArray = [];

    //hide tasks container to only show the filtered result
    taskContainers.forEach(container => container.querySelectorAll(".card").forEach(el => el.style.display = "none"));

    //check if other filters have already been applied
    if (categoryFilter != "Category") {
        const taskContainer = document.querySelector(`.${categoryFilter.toLowerCase()}`)
        tagsContainer = Array.from(taskContainer.querySelectorAll(".priority-tag"));
    } else {
        tagsContainer = Array.from(document.querySelectorAll(".priority-tag"));
    }


        if (val == "Medium") {
            const results = []
            tagsContainer.filter(container => {

                const tag = container.querySelector(".tag")
                if (tag !== null && tag.textContent == "Medium") {
                    const parentEl = tag.closest(".card");
                    parentEl.parentElement.parentElement.style.display = "block";
                  //  console.log(parentEl.parentElement.parentElement)
                    results.push(parentEl)
                }

                return results

            })
            //console.log(results)
            searchResultsArray = [...results]

        } else if (val == "High") {
            const results = []
            tagsContainer.filter(container => {
                const tag = container.querySelector(".tag")
                if (tag !== null && tag.textContent == "High") {
                    const parentEl = tag.closest(".card");
                    parentEl.parentElement.parentElement.style.display = "block";
                    results.push(parentEl)
                }

                return results

            })
            searchResultsArray = [...results]

        } else if (val == "Low") {
            const results = []
            tagsContainer.filter(container => {
                if (container.children.length == 0) {
                    const parentEl = container.closest(".card");
                    parentEl.parentElement.parentElement.style.display = "block";
                    results.push(parentEl)
                }

                return results

            });
            searchResultsArray = [...results]
        }
       
    
   // console.log(searchResultsArray)
    return searchResultsArray
}