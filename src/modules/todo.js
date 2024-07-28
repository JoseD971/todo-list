const ToDo = function (title, description, dueDate, priority, notes = [], checkList = false) {   
    // ToDo.counter = ToDo.counter ? ToDo.counter + 1 : 1;
    ToDo._counter = (ToDo._counter || 0) + 1;

    const properties = {
        id: ToDo._counter,
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        notes: notes,
        checkList: checkList,
    };

    return {properties}
};

export default ToDo;