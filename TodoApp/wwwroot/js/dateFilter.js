export default function dateFilter(todo, value) {
    todo.classList.add("hidden");
    const today = new Date();
    const todoDueDate = new Date(todo.querySelector(".due > span").textContent.split(":")[1]);

    if (value == "today" && todoDueDate.toLocaleDateString() == today.toLocaleDateString()) {
        todo.classList.remove("hidden");

    } else if (value == "this week" && (todoDueDate >= getFirstDateInTheCurrentWeek() && todoDueDate <= getLastDateInTheCurrentWeek())) {

        /* value == "this week" && (todoDueDate.getUTCDate() >= getFirstDateInTheCurrentWeek() && todoDueDate.getUTCDate() <= getLastDateInTheCurrentWeek())*/

        todo.classList.remove("hidden");

    } else if (value == "next week" && getAllDatesForNextWeek(todoDueDate)) {
        /*todoDueDate.toLocaleDateString() <= getAllDatesForNextWeek() && todoDueDate.getUTCDate() > getLastDateInTheCurrentWeek())*/
        todo.classList.remove("hidden");

    }

    return todo;
}


//helper functions
function getAllDatesForNextWeek(date) {
    //const today = new Date();
    //const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    //const sevenDaysFromNow = new Date(Date.now() + sevenDaysInMilliseconds);
    //return sevenDaysFromNow.toLocaleDateString()\

    const endOfCurrentWeek = new Date(getLastDateInTheCurrentWeek());
    const startOfNextWeek = new Date(endOfCurrentWeek.setDate(endOfCurrentWeek.getUTCDate() + 1));
    const endOfNextWeek = new Date(startOfNextWeek.setDate(startOfNextWeek.getUTCDate() + 6))
    if (date >= startOfNextWeek && date <= endOfNextWeek) {
        return true;
    } else {
        return false;
    }
}

//to be refactored
function getLastDateInTheCurrentWeek() {
    const today = new Date();
    const daysInAWeek = 7;
    const currentDate = today.getUTCDate();
    const currentDay = today.getUTCDay();
    const remainingWeekDaysExcludingToday = (daysInAWeek - currentDay) - 1;

    //calculate the last date in the current week
    //const lastDateInTheCurrentWeek = currentDate + remainingWeekDaysExcludingToday;
    const lastDateInTheCurrentWeek = new Date(today.getUTCFullYear(), today.getUTCMonth(), currentDate + remainingWeekDaysExcludingToday);
    return lastDateInTheCurrentWeek;
}

//to be refactored
function getFirstDateInTheCurrentWeek() {
    const today = new Date();
    const daysInAWeek = 7;
    const currentDay = today.getUTCDay();
    const remainingWeekDays = (daysInAWeek - currentDay);

    //calculate the first date in the current week
    const totalNumberOfDaysPassed = daysInAWeek - remainingWeekDays;
    //const firstDateInTheCurrentWeek = today.getUTCDate() - totalNumberOfDaysPassed;
    const firstDateInTheCurrentWeek = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - totalNumberOfDaysPassed);

    return firstDateInTheCurrentWeek;
}
