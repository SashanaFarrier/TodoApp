
import priorityFilter from "./priorityFilter.js";
import dateFilter from "./dateFilter.js";

export default function filterByPriorityAndDate(priorityVal, dateVal, target) {
    const taskContainers = Array.from(document.getElementsByClassName("tasks"));

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