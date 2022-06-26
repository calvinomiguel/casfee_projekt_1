import express from "express";
import bodyParser from "body-parser";
import path from "path";
import {
    fileURLToPath
} from "url";
import Nedb from "nedb";

const __filename = fileURLToPath(
    import.meta.url);

//Absolut path
const __dirname = path.dirname(__filename);

const Datastore = Nedb;
const db = new Datastore({
    filename: "./db/todos.db",
    autoload: true,
    timestampData: true
});

const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("views", path.join(__dirname, "/views"));
app.set("js", path.join(__dirname, "/src/js"));
app.set("view engine", "ejs");

//Reserve arrays for todos in document scope
let todos = [];
let doneTodos = [];


function fetchTodos() {
    //Fetch todos to be done
    db.find({
        completed: false
    }).sort({
        createdAt: -1
    }).exec(function (err, allTodos) {
        if (err) {
            console.log(err);
        } else {
            todos = [...allTodos];
        }
    });
}

function fetchTodosDone() {
    //Fetch completed todos
    db.find({
        completed: true
    }).sort({
        createdAt: -1
    }).exec(function (err, allDoneTodos) {
        if (err) {
            console.log(err);
        } else {
            doneTodos = [...allDoneTodos];
        }
    });
}

//Initial fetch before rendering page
fetchTodos();
fetchTodosDone();

//Render fetched todos
app.get("/", (req, res) => {
    res.render("page", {
        todos,
        doneTodos
    });
});

app.post("/update", function (req, res) {
    //Get todo id
    let id = req.body.id;

    //Get todo data
    let todo = {
        title: req.body.title,
        description: req.body.description,
        dueDate: new Date(req.body.duedate).getTime(),
        priority: req.body.priority,
        completed: false,
    };

    //Update todo
    db.update({
        _id: id
    }, todo, function (err) {
        if (err) {
            console.log(err);
        } else {
            db.persistence.compactDatafile();
        }
    });

    //Fetch updated todos
    fetchTodos();

    res.redirect("/");
});

app.post("/delete", function (req, res) {
    let id = req.body.id; //Get id of todo to be deleted

    //Delete todo from DB
    db.remove({
        _id: id
    }, {}, function (err) {
        if (err) {
            console.log(err);
        } else {
            db.persistence.compactDatafile();
        }
    });

    //Fetch updated todos list
    fetchTodos();

    res.redirect("/");
});

app.post("/create", function (req, res) {

    //Get todo data
    let todo = {
        title: req.body.title,
        description: req.body.description,
        dueDate: new Date(req.body.duedate).getTime(),
        priority: req.body.priority,
        completed: false,
    };

    //Insert into DB
    db.insert(todo, function (err) {
        if (err) {
            console.log(err);
        }
    });

    //Fetch updated todos list
    fetchTodos();


    res.redirect("/");
});

app.post("/complete", function (req, res) {
    let id = req.body.id; //Get id of todo to be completed

    //Set todo completed status to true
    db.update({
        _id: id
    }, {
        $set: {
            completed: true
        }
    }, function (err) {
        if (err) {
            console.log(err);
        } else {
            db.persistence.compactDatafile();
        }
    });

    //Fetch updated todos list
    fetchTodos();

    //Fetch updated todos done list
    fetchTodosDone();

    res.redirect("/");
});

app.post("/sort", function (req, res) {

    /*SORTING FOR TODOS TO BE COMPLETED*/
    //Sort todos by ascending order of creation
    if (req.body.sort_type === "asc") {
        db.find({ completed: false }).sort({  createdAt: 1 }).exec(function (err, allTodos) {
             if (err) {
                 console.log(err);
             } else {
                 todos = [...allTodos];
             }
         });
    }

    //Sort todos by descending order of creation
    if (req.body.sort_type === "desc") {
        db.find({ completed: false }).sort({  createdAt: -1 }).exec(function (err, allTodos) {
            if (err) {
                console.log(err);
            } else {
                todos = [...allTodos];
            }
        });
    }

    //Sort todos by descending order of due date
    if (req.body.sort_type === "due_desc") {
        db.find({ completed: false }).sort({ dueDate: -1 }).exec(function (err, allTodos) {
            if (err) {
                console.log(err);
            } else {
                todos = [...allTodos];
            }
        });
    }

    //Sort todos by ascending order of due date
    if (req.body.sort_type === "due_asc") {
        db.find({ completed: false }).sort({ dueDate: 1 }).exec(function (err, allTodos) {
            if (err) {
                console.log(err);
            } else {
                todos = [...allTodos];
            }
        });
    }

    /*SORTING FOR TODOS THAT ARE COMPLETED*/
    //Sort todos by ascending order of creation
    if (req.body.sort_type === "asc_done") {
        db.find({ completed: true }).sort({ "createdAt": 1 }).exec(function (err, allDoneTodos) {
            if (err) {
                console.log(err);
            } else {
                doneTodos = [...allDoneTodos];
            }
        });
    }

    //Sort todos by descending order of creation
    if (req.body.sort_type === "desc_done") {
        db.find({ completed: true }).sort({ createdAt: -1 }).exec(function (err, allDoneTodos) {
            if (err) {
                console.log(err);
            } else {
                doneTodos = [...allDoneTodos];
            }
        });
    }

    //Sort todos by descending order of due date
    if (req.body.sort_type === "due_desc_done") {
        db.find({ completed: true }).sort({ dueDate: -1 }).exec(function (err, allDoneTodos) {
            if (err) {
                console.log(err);
            } else {
                doneTodos = [...allDoneTodos];
            }
        });
    }

    //Sort todos by ascending order of due date
    if (req.body.sort_type === "due_asc_done") {
        db.find({ completed: true }).sort({ dueDate: 1 }).exec(function (err, allDoneTodos) {
            if (err) {
                console.log(err);
            } else {
                doneTodos = [...allDoneTodos];
            }
        });
    }

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});