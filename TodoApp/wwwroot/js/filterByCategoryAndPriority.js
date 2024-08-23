import filterByCategory from "./filterByCategory.js";
import priorityFilter from "./priorityFilter.js";

export default function filterByCategoryAndPriority(categoryTodos, category, priorityVal) {
    const todos = Array.from(categoryTodos.querySelectorAll(".todo"))

    filterByCategory(category);
    todos.filter(todo => priorityFilter(todo, priorityVal));
}