export default function priorityFilter(todo, value) {
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