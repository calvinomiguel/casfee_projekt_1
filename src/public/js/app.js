let tabItems = document.querySelectorAll(".tab ul li");
let todos = document.querySelectorAll(".todo-item");
let fnBar = document.querySelector(".fn-bar");
let emptyState = document.querySelector(".empty-state");
let openCreateBtns = document.querySelectorAll(".btn-create-todo");
let bgOverlay = document.querySelector(".bg-overlay");
let todoForms = document.querySelector(".c-form");
let btnCancel = document.querySelector(".btn-cancel-todo");

let openCreateTodo = function () {
    bgOverlay.classList.remove("hidden");
    todoForms.classList.remove("hidden");
};

let closeCreateTodo = function () {
    bgOverlay.classList.add("hidden");
    todoForms.classList.add("hidden");
};

for (let btn of openCreateBtns) {
    btn.onclick = openCreateTodo;
}

let checkTodos = function () {
    if (todos.length < 1) {
        if (!fnBar.classList.contains("hidden"))
            fnBar.classList.add("hidden");

        if (emptyState.classList.contains("hidden"))
            emptyState.classList.remove("hidden");
    }

    if (todos.length > 0) {
        if (fnBar.classList.contains("hidden"))
            fnBar.classList.remove("hidden");

        if (!emptyState.classList.contains("hidden"))
            emptyState.classList.add("hidden");
    }
};

checkTodos();

btnCancel.onclick = closeCreateTodo;

window.onclick = checkTodos;

for (let item of tabItems) {
    item.addEventListener("click", () => {

        for (let tabItem of tabItems) {
            tabItem.classList.remove("tab-active");
        }

        if (!item.classList.contains("tab-active"))
            item.classList.toggle("tab-active");
    });
}