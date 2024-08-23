export default function filterByCategory(category) {
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