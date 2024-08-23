import filterByCategory from "./filterByCategory.js";
import priorityFilter from "./priorityFilter.js";
import dateFilter from "./dateFilter.js";

export default function filterByCategoryPriorityAndDate(categoryVal, priorityVal, dateVal, target) {
    const taskContainers = Array.from(document.getElementsByClassName("tasks"));
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
