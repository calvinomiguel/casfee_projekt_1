import express from "express";
import {
    fetchUncompleted,
    fetchCompleted,
    remove,
    update,
    create,
    complete,
    sort
} from "../controller/data.controller.js";
const router = express.Router();

router.get("/get-completed", fetchCompleted);
router.get("/get-uncompleted", fetchUncompleted);
router.post("/create", create);
router.delete("/delete:id", remove);
router.put("/update:id", update);
router.put("/complete:id", complete);
router.get("/sort/:attr/:order/:completed", sort);

const routes = router;

export {
    routes
};