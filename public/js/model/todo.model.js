function todo(title = "", description = "", dueDate = "", priority = "", completed = false) {
    return {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        completed: completed
    };
}

export {
    todo
};