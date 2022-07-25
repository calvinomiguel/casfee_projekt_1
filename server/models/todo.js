import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: String,
    description: String,
    dueDate: Date,
    priority: String,
    completed: Boolean,
}, { timestamps: true });

const Todo = mongoose.model("Todo", todoSchema);

export default {
    Todo,
};