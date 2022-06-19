const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const port = 3000;
let todos = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("views", path.join(__dirname, "/src/views"));
app.set("js", path.join(__dirname, "/src/js"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render("page", { todos });
})

app.post("/", function (req, res) {
    todos.push({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.duedate,
        priority: req.body.priority
    })
    console.log(todos);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});