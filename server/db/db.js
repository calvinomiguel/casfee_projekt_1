import Nedb from "nedb-promises";
import path from "path";
import {
    fileURLToPath
} from "url";

//Absolut path
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

//Initiate DB
const db = Nedb.create({
    filename: path.join(__dirname, "./todo.db"),
    autoload: true,
    timestampData: true,
});

//Method do make changes in db persistent upon event
const compactDB = () => {
    db.__original.compactDatafile();
};


async function updateTodo(id, todo) {
    await db.update({
        _id: id
    }, todo, {
        multi: true
    }).catch(err => console.log(err));
    compactDB();
}

async function removeTodo(id) {
    await db.remove({
        _id: id
    }, {}).catch(err => console.log(err));
    compactDB();
}

async function fetchTodos(completed) {
    return await db.find({
        completed: completed
    }).sort({
        createdAt: -1
    }).exec();
}

async function createTodo(todo) {
    return await db.insert(todo).catch(err => console.log(err));
}

async function completeTodo(id) {
    await db.update({
        _id: id
    }, {
        $set: {
            completed: true
        }
    }).catch(err => {
        console.log(err);
    });
    compactDB();
}

async function sortTodos(completed, sortOptions) {
    return await db.find({
        completed: completed
    }).sort(sortOptions).exec(function (err, docs) {
        console.log(err, docs);
    });
}

export {
    removeTodo,
    fetchTodos,
    updateTodo,
    createTodo,
    completeTodo,
    sortTodos
};