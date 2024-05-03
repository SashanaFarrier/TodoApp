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

function filterTasks() {
    const formFiltersContainer = document.querySelector(".form-filters");
        const notFoundMessage = document.querySelector(".not-found-message")
    const formEls = Array.from(formFiltersContainer.querySelectorAll("select"));
    formEls.forEach(el => {
        el.addEventListener("change", (e) => {
            let val = el.value;
            if (e.target.closest(".category-btn")) {
                //hide all tasks and only display search results
                taskContainers.forEach(container => container.style.display = "none");
                if (val == "todo") {
                    //const results = [];

                    const searchResultsArray = taskContainers.filter(container => container.classList.contains(val));
                   
                    if (searchResultsArray.length > 0) {
                        searchResultsArray.forEach(result => result.style.display = "block");
                        notFoundMessage.classList.add("d-none")
                    }
                    else {
                        notFoundMessage.classList.remove("d-none")
                    }
                }
            }

            if (e.target.closest(".priority-btn")) {
              
                if (val == "Medium") {
                    //hide all tasks and only display search results
                    taskContainers.forEach(container => container.querySelectorAll(".card").forEach(el => el.style.display = "none"));
                    const tagsArray = Array.from(document.querySelectorAll(".priority-tag .tag"));
              

                    if (tagsArray.length > 0) {
                        tagsArray.forEach(tag => tag.closest(".card").style.display = "block");
                        //notFoundMessage.classList.add("d-none")
                    }
                   
                }
            }
           
        })
    })
   //console.log(formEl)
}