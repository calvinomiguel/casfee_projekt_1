import {
    createTodo,
    deleteTodo,
    completeTodo
} from "../services/todo.service.js";
import {
    todo
} from "../model/todo.model.js";
import {
    fetchUnCompleted,
    fetchCompleted
} from "../services/todo.service.js";

export async function formController() {
    let bgOverlay = document.querySelector(".bg-overlay");
    let form = document.querySelector("#todo-form");
    let openFormBtns = document.querySelectorAll(".btn-create-todo");
    let closeFormBtn = document.querySelector("#cancel-todo");
    let sortSelect = document.querySelector("#sort");
    let todoDoneList = document.querySelector("#todo-done");

    const renderTodos = async function (data) {
        let todos = {
            todos: data,
        };
        let todoTemplate = document.querySelector("#uncompleted-todos").innerHTML;
        // eslint-disable-next-line no-undef
        let compiledTemplate = await Handlebars.compile(todoTemplate);
        document.querySelector("#todos-uncompleted").innerHTML = compiledTemplate(todos);
        setItemsEventListeners();
        setDeleteBtnsEventlisteners();
        setCheckboxesEventlisteners();
    };

    const renderDoneTodos = async function (data) {
        let todos = {
            doneTodos: data
        };
        let doneTodoTemplate = document.querySelector("#completed-todos").innerHTML;
        // eslint-disable-next-line no-undef
        let compiledDoneTemplate = Handlebars.compile(doneTodoTemplate);
        document.querySelector("#todos-completed").innerHTML = compiledDoneTemplate(todos);
    };

    const setItemsEventListeners = () => {
        let todoItems = document.querySelectorAll(".todo-open");

        //3. UPDATING TODO
        todoItems.forEach(item => {
            item.addEventListener("click", function (event) {

                /*As todo element has a delete btn and checkbox that can trigger the opening of the form
                we make sure thah current target only contains main body of todo element by checking
                if the element contains the todo-open class*/
                if (event.currentTarget.classList.contains("todo-open")) {

                    //Get todo data for form population
                    let title = item.querySelector(".todo-title").innerText;
                    let description = item.querySelector(".todo-description").innerText;

                    //In case user doesn't set priority
                    let priority = item.querySelector(".todo-priority") ? item.querySelector(".todo-priority").innerText : "Priority";

                    //In case user doesn't set duedate
                    let dueDate = item.querySelector(".todo-duedate") ? transformDate(item.querySelector(".todo-duedate").getAttribute("data-date")) : "";
                    let id = item.querySelector(".todo-checkbox").getAttribute("id");

                    //Populate form with datte
                    setFormFieldsValues( /*"/update",*/ id, title, description, priority, dueDate);

                    //Hide create task button and reveal update task button
                    form.querySelector("#create-todo").classList.add("hidden");
                    form.querySelector("#update-todo").classList.remove("hidden");

                    toggleForm(); //Reveal form to user
                }
            });
        });
    };

    const setDeleteBtnsEventlisteners = () => {
        let todoDeleteBtns = document.querySelectorAll(".btn-delete-todo");
        /*5. DELETE TODO*/
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

    const setCheckboxesEventlisteners = () => {
        let todoCheckboxes = document.querySelectorAll(".todo-checkbox");
        /*6. COMPLETE TODO*/
        todoCheckboxes.forEach(checkbox => {
            checkbox.addEventListener("click", async function (event) {

                //Stop propagation of event so that todoItem click events isn't triggered
                event.stopPropagation();

                //Get id of todo
                let id = event.currentTarget.getAttribute("id");

                await completeTodo(id).then(await renderTodos(await fetchUnCompleted()),(await renderDoneTodos(await fetchCompleted())));
            });
        });
    };

    await renderTodos(await fetchUnCompleted());
    await renderDoneTodos(await fetchCompleted());


    /*1. MISC METHODS*/

    //Method to toggle form for updating and creating todos
    function toggleForm() {
        bgOverlay.classList.toggle("hidden");
        form.classList.toggle("hidden");
    }

    //Method to set values to form
    function setFormFieldsValues(id, title, description, priority, dueDate) {
        form.querySelector("#todo-id").value = id;
        form.querySelector("#title").value = title;
        form.querySelector("#description").value = description;
        form.querySelector("#priority").value = priority;
        form.querySelector("#duedate").value = dueDate;
    }

    /*Method to create invisible forms and send requests to backend needed e.g. for sorting*/
    function createForm(inputName, inputValue, action) {
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

    /*Method to transform date value from data-date attribute
    into a value that can be accepted by an input type date
    */
    function transformDate(date) {
        let d = new Date(parseInt(date));
        let month = (d.getMonth() + 1).toString().padStart(2, "0");
        let day = d.getDate().toString().padStart(2, "0");
        let year = d.getFullYear();
        return `${year}-${month}-${day}`;
    }

    /*2.CREATING A TODO*/

    //Open form to define a todo
    openFormBtns.forEach(btn => {
        //Add eventlistener to btns used to open form 
        btn.addEventListener("click", function () {

            //Reset form to default meaning no prepopulation only empty fields
            setFormFieldsValues( /*"/create",*/ "", "", "", "Priority", "");

            //Make sure create task button is being shown and not update task button
            form.querySelector("#create-todo").classList.remove("hidden");
            form.querySelector("#update-todo").classList.add("hidden");

            //Reveal form to user
            toggleForm();
        });
    });

    //Get content of todo creation form
    function setTodo() {
        let priority = form["priority"].value === "Priority" ? "" : form["priority"].value;
        return todo(form["title"].value, form["description"].value, form["duedate"].value, priority);
    }

    //Create todo
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        await createTodo(setTodo()).then(await renderTodos(await fetchUnCompleted()));
        toggleForm();
    });



    /*4. CLOSING FORM*/
    /*Add event listener to cancel button and add toggleform method
    in order to close form on click
    */
    closeFormBtn.addEventListener("click", toggleForm);

    /*Add event listener to cancel button and add toggleform method
    in order to close form on click
    */
    bgOverlay.addEventListener("click", toggleForm);


    /*7. SORT TODOS*/
    sortSelect.addEventListener("change", function (event) {
        let sortType = event.currentTarget.value;
        let form;

        /*Check which section is currently open: todo or done todo
        and send request to sort the secion, which is currently open*/
        if (todoDoneList.classList.contains("hidden")) {
            form = createForm("sort_type", sortType, "/sort");
        } else {
            form = createForm("sort_type", `${sortType}_done`, "/sort");
        }
        form.submit();
    });
}