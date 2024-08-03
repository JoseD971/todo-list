const Task = function (title, description, dueDate, priority, completed = false) {   
    // ToDo.counter = ToDo.counter ? ToDo.counter + 1 : 1;
    Task._counter = (Task._counter || 0) + 1;

    var tasks = [];

    const properties = {
        id: Task._counter,
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        completed: completed,
    };

    return {properties}
};

export default Task;