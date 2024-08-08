import moment from "moment";
import LocalStorageController from "./localStorage";

var tasks = [];

const Task = function () {   
    // ToDo.counter = ToDo.counter ? ToDo.counter + 1 : 1;
    var properties = {}

    const create = (project, title, description, dueDate, priority, completed) => {
        Task._counter = (Task._counter || 0) + 1;
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
        saveLS(tasks);
        return properties;
    }

    const setGeneric = () => {
        var generic = [
            {
                id: 'gs',
                project: 'all',
                title: 'Getting Started',
                description: `This application allows you to create to-do's and separate them by projects to organize your day.`,
                dueDate: moment().format('YYYY-MM-DD'),
                priority: 'low',
                completed: true,
            }
        ];
        LocalStorageController.storage('tasks', generic);
    }

    const getStorage = () => {
        var storedInfo = LocalStorageController.search('tasks');
        if(storedInfo == false) {
            tasks = tasks;
        } else {
            tasks = storedInfo;
        }
        console.log(tasks);
    }

    const saveLS = (value) => {
        LocalStorageController.storage('tasks', value);
    }

    // const updateLS = (value) => {
    //     LocalStorageController.remove('tasks', value);
    // }

    return {create, setGeneric, getStorage, saveLS}
};

export {Task, tasks};