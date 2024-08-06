import moment from "moment";

var tasks = [
    {
        id: 'gs',
        project: 'all',
        title: 'Getting Started',
        description: `This application allows you to create to-do's and separate them by projects to organize your day.`,
        dueDate: moment().format('DD-MM-YYYY'),
        priority: 'low',
        completed: true,
    }
];

const Task = function () {   
    // ToDo.counter = ToDo.counter ? ToDo.counter + 1 : 1;
    Task._counter = (Task._counter || 0) + 1;

    var properties = {}

    const create = (project, title, description, dueDate, priority, completed) => {
        properties = {
            id: Task._counter,
            project: project,
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