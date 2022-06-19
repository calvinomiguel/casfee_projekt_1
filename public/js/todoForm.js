let bgOverlay = document.querySelector(".bg-overlay");
let form = document.querySelector("#todo-form");
let openFormBtns = document.querySelectorAll(".btn-create-todo");
let closeFormBtn = document.querySelector("#cancel-todo");
let todoItems = document.querySelectorAll(".todo-open");

function toggleForm() {
    bgOverlay.classList.toggle("hidden");
    form.classList.toggle("hidden");
}

openFormBtns.forEach(btn => {
    btn.addEventListener("click", toggleForm);
})

todoItems.forEach(item => {
    item.addEventListener("click", function (event) {
        if (!event.target.classList.contains("todo-checkbox")) {
            toggleForm();
            let title = item.querySelector(".todo-title").innerText;
            let description = item.querySelector(".todo-description").innerText;
            let priority = item.querySelector(".todo-priority").innerText;
            let dueDate = item.querySelector(".todo-duedate").innerText;
            
            form.querySelector("#title").value = title;
            form.querySelector("#description").value = description;
            form.querySelector("#priority").value = priority;
            form.querySelector("#duedate").value = dueDate;
        }
    });
});

closeFormBtn.addEventListener("click", toggleForm);

bgOverlay.addEventListener("click", toggleForm);