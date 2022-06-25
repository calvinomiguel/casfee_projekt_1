let bgOverlay = document.querySelector(".bg-overlay");
let form = document.querySelector("#todo-form");
let openFormBtns = document.querySelectorAll(".btn-create-todo");
let closeFormBtn = document.querySelector("#cancel-todo");
let todoItems = document.querySelectorAll(".todo-open");
let todoCheckboxes = document.querySelectorAll(".todo-checkbox");
let todoDeleteBtns = document.querySelectorAll(".btn-delete-todo");
let sortSelect = document.querySelector("#sort");
let todoList = document.querySelector("#todo-open");
let todoDoneList = document.querySelector("#todo-done");

function setFormFieldsValues(action, id, title, description, priority, dueDate) {
    form.setAttribute("action", action);
    form.querySelector("#todo-id").value = id;
    form.querySelector("#title").value = title;
    form.querySelector("#description").value = description;
    form.querySelector("#priority").value = priority;
    form.querySelector("#duedate").value = dueDate;
}

function toggleForm() {
    bgOverlay.classList.toggle("hidden");
    form.classList.toggle("hidden");
}

function createFrom(inputName, inputValue, action) {
    let form = document.createElement("form");
    let input = document.createElement("input");
    input.setAttribute("name", inputName);
    input.setAttribute("value", inputValue);
    form.setAttribute("method", "POST");
    form.setAttribute("action", action);
    form.appendChild(input);
    document.body.appendChild(form);
    return form;
}

openFormBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        //Reset form to default
        setFormFieldsValues("/create", "", "", "", "Priority", "");
        form.querySelector("#create-todo").classList.remove("hidden");
        form.querySelector("#update-todo").classList.add("hidden");
        toggleForm();
    });
})

todoItems.forEach(item => {
    item.addEventListener("click", function (event) {
        if (event.currentTarget.classList.contains("todo-open")) {
            toggleForm();
            let title = item.querySelector(".todo-title").innerText;
            let description = item.querySelector(".todo-description").innerText;
            let priority = item.querySelector(".todo-priority").innerText;
            let dueDate = item.querySelector(".todo-duedate").innerText;
            let id = item.querySelector(".todo-checkbox").getAttribute("id");
            setFormFieldsValues("/update", id, title, description, priority, dueDate);
            form.querySelector("#create-todo").classList.add("hidden");
            form.querySelector("#update-todo").classList.remove("hidden");
        }
    });
});

closeFormBtn.addEventListener("click", toggleForm);

bgOverlay.addEventListener("click", toggleForm);

todoDeleteBtns.forEach(btn => {
    btn.addEventListener("click", function (event) {
        event.stopPropagation();
        let checkbox = event.currentTarget.parentElement.children[0];
        let id = checkbox.getAttribute("id");
        let form = createFrom("id", id, "/delete");
        form.submit();
    })
});

todoCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("click", function (event) {
        event.stopPropagation();
        let id = event.currentTarget.getAttribute("id");
        let form = createFrom("id", id, "/complete");
        form.submit();
    })
});

sortSelect.addEventListener("change", function (event) {
    let sortType = event.currentTarget.value;
    let form;
    if (todoDoneList.classList.contains("hidden")) {
        form = createFrom("sort_type", sortType, "/sort");
    } else {
        form = createFrom("sort_type", `${sortType}_done`, "/sort");
    }
    form.submit();
})