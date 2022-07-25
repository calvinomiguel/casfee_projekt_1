import Nedb from "nedb-promises";
import path from "path";
import {
    fileURLToPath
} from "url";

//Absolut path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = Nedb.create({
    filename: path.join(__dirname, "./todo.db"),
    autoload: true,
});

//Method do make changes in db persistent upon event
const compactDB = () => {
    db.__original.persistence.compactDatafile();
};


async function updateTodo(id, todo) {
    await db.update({
        _id: id
    }, todo).catch(err => console.log(err));
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
    }).then(db.persistence.compactDatafile()).catch(err => {
        console.log(err);
    });
}

async function sortTodos(sortOrder, completed) {
    sortOrder = sortOrder.replaceAll("'", "\"");
    sortOrder = JSON.parse(sortOrder);

    if (completed) {
        return await db.find({
            completed: completed
        }).sort(sortOrder).exec().catch(err => console.log(err));
    }

    return await db.find({
        completed: false
    }).sort(sortOrder).exec().catch(err => console.log(err));

}

export {
    removeTodo,
    fetchTodos,
    updateTodo,
    createTodo,
    completeTodo,
    sortTodos
};