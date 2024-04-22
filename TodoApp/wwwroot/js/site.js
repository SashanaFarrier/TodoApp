// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// project overview page
const projectOverviewDropdownBtns = document.querySelectorAll(".table-body .dropdown-btn");
projectOverviewDropdownBtns.forEach(btn => {
    const listItemsUL = btn.closest("div").querySelector("ul")
    btn.addEventListener("click", () => {
       listItemsUL.classList.toggle("hidden")
    })
})

//get all tasks containers
const taskContainers = Array.from(document.getElementsByClassName("tasks"));

//show empty form
const addBtn = document.querySelector(".add-btn");
addBtn.addEventListener("click", () => {

    const form = document.querySelector(".todo-cards").querySelector("form")
    form.classList.remove("hidden")
})


//handle form filter


//search tasks
searchTasks()
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


