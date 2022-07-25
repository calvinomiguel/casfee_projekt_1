import {
    ajax
} from "./ajax.service.js";

async function createTodo(todo) {
    return await ajax("POST", "/create", todo);
}

async function updateTodo(id, todo) {
    return await ajax("PUT", `/update${id}`, todo);
}

async function deleteTodo(id) {
    return await ajax("DELETE", `/delete${id}`);
}

async function fetchCompleted() {
    return await ajax("GET", "/get-completed");
}

async function fetchUnCompleted() {
    return await ajax("GET", "/get-uncompleted");
}

export {
    createTodo,
    updateTodo,
    deleteTodo,
    fetchCompleted,
    fetchUnCompleted
};