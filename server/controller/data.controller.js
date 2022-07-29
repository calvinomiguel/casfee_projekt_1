import {
    removeTodo,
    fetchTodos,
    updateTodo,
    createTodo,
    completeTodo,
    sortTodos,
} from "../db/db.js";

async function fetchUncompleted(req, res) {
    res.json((await fetchTodos(false)));
}

async function fetchCompleted(req, res) {
    res.json((await fetchTodos(true)));
}

async function remove(req, res) {
    await removeTodo(req.params.id).then(res.status(200));
}

async function update(req, res) {
    let todo = req.body;
    await updateTodo(req.params.id, todo).then(res.status(200));
}

const create = async (req, res) => {
    let todo = req.body;
    res.json(await createTodo(todo));
};

async function complete(req, res) {
    await completeTodo(req.params.id).then(res.status(200));
}

async function sort(req, res) {
    let sortOptions = { [req.params.attr]: req.params.order };
    res.json(await sortTodos(JSON.parse(req.params.completed), sortOptions));
}

export {
    fetchUncompleted,
    fetchCompleted,
    remove,
    update,
    create,
    complete,
    sort
};