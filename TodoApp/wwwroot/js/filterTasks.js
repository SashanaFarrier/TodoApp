import filterByCategory from "./filterByCategory.js";
import filterByCategoryPriorityAndDate from "./filterByCategoryPriorityAndDate.js";
import filterByCategoryAndPriority from "./filterByCategoryAndPriority.js";
import filterByCategoryAndDate from "./filterByCategoryAndDate.js";
import filterByPriorityAndDate from "./filterByPriorityAndDate.js";
import dateFilter from "./dateFilter.js";
import priorityFilter from "./priorityFilter.js";


//const taskTypes = document.querySelector(".task-types");

export default function filterTasks() {
    const taskContainers = Array.from(document.getElementsByClassName("tasks"));
    const formFiltersContainer = document.querySelector(".form-filters");
    const formEls = Array.from(formFiltersContainer.querySelectorAll("select"));

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
