class Model {
    constructor() {
        this.todos = [
            {
                id: 1,
                title: "Lorem ipsum",
                description: "Your description here.",
                done: false,
                priority: "medium",
                duedate: "01.01.2022"
            }
        ];
    }

    //Method to create a todo
    create(title, description, priority, duedate) {
        const todo = {
            id: this.todos.length < 0 ? 1 : this.todos[this.todos.length - 1].id + 1,
            title: title,
            description: description,
            priority: priority,
            done: false,
            duedate: duedate
        }

        this.todos.push(todo);
    }

    //Method to edit a todo
    edit(id, title, description, priority, duedate) {
        let index = this.todos.findIndex((todo) => todo.id === id);
        this.todos[index] = {
            id: id,
            title: title,
            description: description,
            priority: priority,
            done: false,
            duedate: duedate
        };
    }

    //Method to delete todo 
    delete(id) {
        let index = this.todos.findIndex((todo) => todo.id === id);
        this.todos.splice(index, 1);
    }

    complete(id, done) {
        this.todos.find((todo, index, todos) => {
            if (todo.id === id) {
                todos[index].done = true;
            };
        });
    }
}

class View {
    constructor() {
        //Root element
        this.app = this.getElement("#app");
        this.main = this.createElement("main");
        this.main.innerHTML = `
            <div class="app-wrapper">
                <div class="bg-overlay hidden"></div>
                <nav class="tab">
                <ul>
                    <li class="tab-item tab-active">
                        To-do
                    </li>
                    <li class="tab-item">
                        Done
                    </li>
                </ul>
            </nav>
            <div class="fn-bar btn-container">
                <button class="btn-icon-text mr-auto"><i class="bx bx-filter"></i>Filter</button>
                <button type="button" class="btn-primary btn-create-todo">Create task</button>
            </div>
            <div class="main-container">
                <div class="todo-container">
                    <div class="todo-item">
                        <input type="radio" name="1" id="1" value="1">
                        <div class="todo-item-main-wrapper">
                            <div class="todo-item-main">
                                <h4>Title</h4>
                                <p>Description</p>
                            </div>
                            <div class="todo-item-footer">
                                <div class="todo-priority-tag tag-low mr-2">
                                    <p>Medium</p>
                                </div>
                                <div class="todo-item-due">
                                    <i class="bx bx-time"></i>
                                    <p>12. Jan 2023</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="todo-container todo-done">
                    <!-- <div class="todo-item">
                        <input type="radio" name="1" id="1" value="true" disabled>
                        <div class="todo-item-main-wrapper">
                            <div class="todo-item-main">
                                <h4>Title</h4>
                                <p>Description</p>
                            </div>
                            <div class="todo-item-footer">
                                <div class="todo-priority-tag tag-low mr-2">
                                    <p>Medium</p>
                                </div>
                                <div class="todo-item-due">
                                    <i class="bx bx-time"></i>
                                    <p>12. Jan 2023</p>
                                </div>
                            </div>
                        </div>-->

                </div>

            <div class="empty-state hidden">
                <figure>
                    <img src="./public/img/empty-state.png" alt="Empty State image">
                </figure>
                <div class="empty-state-text">
                    <h4>Seems pretty empty in here</h4>
                    <p>Life doesn't have to be as boring as it is right now. Create your first task.</p>
                </div>
                <button type="button" class="btn-primary btn-create-todo w-full mt-4">Create task</button>
            </div>
            </div>

        <form class="c-form hidden" action="" method="post">
            <input autocomplete="off" class="c-textfield c-textfield-title" type="text" name="title" id="title"
                placeholder="Task title...">
            <input class="c-textfield" style="display:none;" type="date" name="duedate" id="duedate">
            <textarea autocomplete="off" class="c-textarea" name="description" id="description"
                placeholder="Description"></textarea>
            <div class="btn-container">
                <button type="button" class="btn-icon-text mr-auto"><i class="bx bx-calendar"></i>Due
                    date</button><button type="button" class="btn-basic btn-cancel-todo">Cancel</button> <button
                    type="submit" class="btn-primary btn-create-todo">Create task</button>

            </div>
        </form>
            </div>
        `;

        this.app.append(this.main);
    }

    createElement(tag, classes, id, attributes) {
        const elem = document.createElement(tag);

        if (classes)
            for (let className of classes) {
                elem.classList.add(className);
            }

        if (id) elem.setAttribute("id", id);

        if (attributes)
            for (let attr of attributes) {
                elem.setAttribute(attr.name, attr.value);
            }

        return elem;
    }

    getElement(selector) {
        const elem = document.querySelector(selector);
        return elem;
    }
}

class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }
}

const app = new Controller(new Model(), new View())

app.model.create("Hello world", "Description", "medium", "25. Jan 2025");