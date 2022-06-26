let tabItems = document.querySelectorAll(".tab-item");
let sectionTodosDone = document.querySelector("#todo-done");
let setcionTodosOpen = document.querySelector("#todo-open");
let createTodoBtn = document.querySelector("#main-primary");
let createBtnsEmptyState = document.querySelectorAll(".empty-state .btn-primary");

function hideTodosOpen() {
    sectionTodosDone.classList.remove("hidden");
    setcionTodosOpen.classList.add("hidden");
    createTodoBtn.classList.add("hidden");
    createBtnsEmptyState[1].classList.add("hidden");
}

function hideTodosDone() {
    sectionTodosDone.classList.add("hidden");
    setcionTodosOpen.classList.remove("hidden");
    createTodoBtn.classList.remove("hidden");
}

tabItems.forEach(item => {
    item.addEventListener("click", function () {

        //Remove active class from all tab items
        tabItems.forEach(tabItem => {
            tabItem.classList.remove("tab-active");
        });

        //Add active class to clicked tab item
        item.classList.add("tab-active");

        //Get data-section attribute of click tab item
        let attr = item.getAttribute("data-section");

        //Toggle sections according to attribute of tab item
        if (attr === "done") {
            localStorage.setItem("activeTab", attr);
            hideTodosOpen();
        } else {
            localStorage.setItem("activeTab", attr);
            hideTodosDone();
        }
    });
});

function setActiveTab() {
    let activeTab = localStorage.getItem("activeTab") === "open" ? "open" : "done";

    if (activeTab === "open") {
        document.querySelector("[data-section^='open']").classList.add("tab-active");
        hideTodosDone();
    } else {
        document.querySelector("[data-section^='done']").classList.add("tab-active");
        document.querySelector("[data-section^='open']").classList.remove("tab-active");
        hideTodosOpen();
    }
}

setActiveTab();