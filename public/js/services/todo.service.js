import {
    ajax
} from "./ajax.service.js";

async function createTodo(todo) {
    return await ajax("POST", "/create", todo);
}

async function updateTodo(id, todo) {
    await ajax("PUT", `/update${id}`, todo);
}

async function completeTodo(id) {
    await ajax("PUT", `/complete${id}`);
}

async function deleteTodo(id) {
    await ajax("DELETE", `/delete${id}`);
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
    fetchUnCompleted,
    completeTodo
};