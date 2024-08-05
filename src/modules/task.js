var tasks = [];

const Task = function () {   
    // ToDo.counter = ToDo.counter ? ToDo.counter + 1 : 1;
    Task._counter = (Task._counter || 0) + 1;

    var properties = {}

    const create = (title, description, dueDate, priority, completed) => {
        properties = {
            id: Task._counter,
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority,
            completed: completed,
        };
        tasks.push(properties);
        return properties;
    }

    const changeState = () => {

    }

    const changePriority = () => {

    }

    const listAll = () =>  {
        
    }

    return {create}
};

export {Task, tasks};