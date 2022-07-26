import { todoController } from "./controller/todo.controller.js";
import { modeController } from "./controller/mode.controller.js";
import { sectionsController } from "./controller/sections.controller.js";

todoController().catch(err => console.log(err));
modeController();
sectionsController();