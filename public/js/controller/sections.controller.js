export function sectionsController() {
    let tabItems = document.querySelectorAll(".tab-item");
    let sectionTodosDone = document.querySelector("#todo-done");
    let setcionTodosOpen = document.querySelector("#todo-open");
    let createTodoBtn = document.querySelector("#main-primary");

    //Method to hide section of todos to be done
    function hideTodosOpen() {
        sectionTodosDone.classList.remove("hidden");
        setcionTodosOpen.classList.add("hidden");
        createTodoBtn.classList.add("hidden");
    }

    //Method to hide section of todos that are done
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

            /*Toggle sections according to attribute of tab item
             use localStore to make changes permanent for when page
             is refreshed. It's useful for cases like sorting */
            if (attr === "done") {
                localStorage.setItem("activeTab", attr);
                hideTodosOpen();
            } else {
                localStorage.setItem("activeTab", attr);
                hideTodosDone();
            }
        });
    });

    //Check localStorage to see which tab should be active upon refresh
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
}