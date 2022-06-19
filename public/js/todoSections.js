let tabItems = document.querySelectorAll(".tab-item");
let sectionTodosDone = document.querySelector("#todo-done");
let setcionTodosOpen = document.querySelector("#todo-open");
let createTodoBtn = document.querySelector("#main-primary");

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
            sectionTodosDone.classList.remove("hidden");
            setcionTodosOpen.classList.add("hidden");
            createTodoBtn.classList.add("hidden");
        } else {
            sectionTodosDone.classList.add("hidden");
            setcionTodosOpen.classList.remove("hidden");
            createTodoBtn.classList.remove("hidden");
        }


    });
   
})