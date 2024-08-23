
import filterByCategory from "./filterByCategory.js";
import dateFilter from "./dateFilter.js";
export default function filterByCategoryAndDate(categoryTodos, category, dateVal) {
    const todos = Array.from(categoryTodos.querySelectorAll(".todo"));
    filterByCategory(category);
    todos.filter(todo => dateFilter(todo, dateVal));
}