import {
    createTodo,
    deleteTodo,
    completeTodo,
    updateTodo,
    sortTodos
} from "../services/todo.service.js";
import {
    todo
} from "../model/todo.model.js";
import {
    fetchUnCompleted,
    fetchCompleted
} from "../services/todo.service.js";

export async function todoController() {
    let bgOverlay = document.querySelector(".bg-overlay");
    let form = document.querySelector("#todo-form");
    let openFormBtns = document.querySelectorAll(".btn-create-todo");
    let closeFormBtn = document.querySelector("#cancel-todo");
    let sortSelect = document.querySelector("#sort");
    let todoDoneList = document.querySelector("#todo-done");

    //Method to toggle form for updating and creating todos
    const toggleForm = function () {
        bgOverlay.classList.toggle("hidden");
        form.classList.toggle("hidden");
    };

    //Method for creating todos
    const create = async function (event) {
        event.preventDefault();
        await createTodo(setTodo()).then(await renderTodos(await fetchUnCompleted()), toggleForm());
    };

    //Method for updating todos
    const update = async function (event) {
        event.preventDefault();
        let id = event.currentTarget["todo-id"].value;
        await updateTodo(id, setTodo()).then(
            await renderTodos(await fetchUnCompleted()),
            form.removeEventListener("submit", update),
            form.addEventListener("submit", create),
            toggleForm()
        );

    };

    //Method for rendering uncompleted todos
    const renderTodos = async function (data) {
        let todos = {
            todos: data,
        };
        let todoTemplate = document.querySelector("#uncompleted-todos").innerHTML;
        // eslint-disable-next-line no-undef
        let compiledTemplate = await Handlebars.compile(todoTemplate);
        document.querySelector("#todos-uncompleted").innerHTML = compiledTemplate(todos);

        //Set event listeners and event handlers on new rendered items
        setItemsEventListeners();
        setDeleteBtnsEventlisteners();
        setCheckboxesEventlisteners();
    };

    //Method for rendering completed todos
    const renderDoneTodos = async function (data) {
        let todos = {
            doneTodos: data
        };
        let doneTodoTemplate = document.querySelector("#completed-todos").innerHTML;
        // eslint-disable-next-line no-undef
        let compiledDoneTemplate = Handlebars.compile(doneTodoTemplate);
        document.querySelector("#todos-completed").innerHTML = compiledDoneTemplate(todos);
    };

    //Method for setting event listener to todo items
    const setItemsEventListeners = function () {
        let todoItems = document.querySelectorAll(".todo-open");

        /*UPDATING TODO*/
        todoItems.forEach(item => {
            item.addEventListener("click", function (event) {

                /*As todo element has a delete btn and checkbox that can trigger the opening of the form
                we make sure that current target only contains main body of todo element by checking
                if the element contains the todo-open class*/
                if (event.currentTarget.classList.contains("todo-open")) {

                    //Get todo data for form population
                    let title = item.querySelector(".todo-title").innerText;
                    let description = item.querySelector(".todo-description").innerText;

                    //In case user doesn't set priority
                    let priority = item.querySelector(".todo-priority") ? item.querySelector(".todo-priority").innerText : "Priority";

                    //In case user doesn't set due-date
                    let dueDate = item.querySelector(".todo-duedate") ? item.querySelector(".todo-duedate").getAttribute("data-date") : "";
                    let id = item.querySelector(".todo-checkbox").getAttribute("id");

                    //Populate form with data
                    setFormFieldsValues(id, title, description, priority, dueDate);

                    //Hide create task button and reveal update task button
                    form.querySelector("#create-todo").classList.add("hidden");
                    form.querySelector("#update-todo").classList.remove("hidden");

                    //Reveal form to user
                    toggleForm();

                    //Remove event listener so that form doesn't create a new todo upon submission
                    form.removeEventListener("submit", create);

                    //Add new event listener so that form updates upon submission
                    form.addEventListener("submit", update);
                }
            });
        });
    };

    //Method for setting event listener to todo items delete btn
    const setDeleteBtnsEventlisteners = function () {
        let todoDeleteBtns = document.querySelectorAll(".btn-delete-todo");

        /*DELETE TODO*/
        todoDeleteBtns.forEach(btn => {
            btn.addEventListener("click", async function (event) {
                //Stop propagation of event so that todoItem click events isn't triggered
                event.stopPropagation();

                //Get checkbox of todo item in which the delete button is inside of
                let checkbox = event.currentTarget.parentElement.children[0];

                //Get id of todo
                let id = checkbox.getAttribute("id");
                await deleteTodo(id).then(await renderTodos(await fetchUnCompleted()));
            });
        });
    };

    //Method for setting event listener to todo items checkbox
    const setCheckboxesEventlisteners = function () {
        let todoCheckboxes = document.querySelectorAll(".todo-checkbox");
        /*6. COMPLETE TODO*/
        todoCheckboxes.forEach(checkbox => {
            checkbox.addEventListener("click", async function (event) {

                //Stop propagation of event so that todoItem click events isn't triggered
                event.stopPropagation();

                //Get id of todo
                let id = event.currentTarget.getAttribute("id");

                await completeTodo(id).then(await renderTodos(await fetchUnCompleted()), (await renderDoneTodos(await fetchCompleted())));
            });
        });
    };

    //Method to set values to form
    const setFormFieldsValues = function (id, title, description, priority, dueDate) {
        form.querySelector("#todo-id").value = id;
        form.querySelector("#title").value = title;
        form.querySelector("#description").value = description;
        form.querySelector("#priority").value = priority;
        form.querySelector("#duedate").value = dueDate;
    };

    //Render todos upon DOM rendering
    await renderTodos(await fetchUnCompleted());
    await renderDoneTodos(await fetchCompleted());


    /*CREATING A TODO*/

    //Open form to define a todo
    openFormBtns.forEach(btn => {
        //Add event listener to btns used to open form
        btn.addEventListener("click", function () {

            //Reset form to default meaning no pre population only empty fields
            setFormFieldsValues("", "", "", "Priority", "");

            //Make sure create task button is being shown and not update task button
            form.querySelector("#create-todo").classList.remove("hidden");
            form.querySelector("#update-todo").classList.add("hidden");

            //Reveal form to user
            toggleForm();
        });
    });

    //Method for getting content of todo creation form and model it as todo object
    function setTodo() {
        let priority = form.priority.value === "Priority" ? "" : form.priority.value;
        return todo(form.title.value, form.description.value, form.duedate.value, priority);
    }

    //Create todo
    form.addEventListener("submit", create);

    /*CLOSING FORM*/

    /*Add event listener to cancel button and add toggle form method
    in order to close form on click
    */
    closeFormBtn.addEventListener("click", function () {
        toggleForm();
        form.removeEventListener("submit", update);
        form.addEventListener("submit", create);
    });

    bgOverlay.addEventListener("click", function () {
        toggleForm();
        form.removeEventListener("submit", update);
        form.addEventListener("submit", create);
    });


    /*SORT TODOS*/
    sortSelect.addEventListener("change", async function (event) {
        let options = event.currentTarget.value;
        options = options.replaceAll("'", "\""); //
        options = JSON.parse(options);

        /*Check which section is currently open: todo or done todo
        and send request to sort the section, which is currently open*/
        if (todoDoneList.classList.contains("hidden")) {
            options.completed = false;
            await renderTodos(await sortTodos(options));
        } else {
            options.completed = true;
            await renderDoneTodos(await sortTodos(options));
        }

    });
}