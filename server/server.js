import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import {routes} from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);

//Absolut path
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../public/assets")));
app.use(routes);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client/views"));
app.set("js", path.join(__dirname, "/src/js"));

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});

