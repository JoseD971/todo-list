import LocalStorageController from "./localStorage";
import { Task } from "./task";

var projects = [];

const Project = function() {

    var properties = {}

    const create = (name) => {
        Project._counter = (Project._counter || 0) + 1;
        properties = {
            id: Project._counter,
            name: name,
            todos: [],
        }
        projects.push(properties);
        saveLS(projects);
        return properties;
    }

    const setGeneric = () => {
        var generics = [
            {
                id: 'personal',
                name: 'Personal',
                todos: [],
            },
            {
                id: 'work',
                name: 'Work',
                todos: [],
            },
            {
                id: 'life',
                name: 'Life',
                todos: [],
            },
        ];
        LocalStorageController.storage('projects', generics);
        Task().setGeneric();
    }

    const getStorage = () => {
        if(LocalStorageController.isFirstTime()) {
            setGeneric();
        };
        var storedInfo = LocalStorageController.search('projects');
        if(storedInfo == false) {
            projects = projects;
        } else {
            projects = storedInfo;
        }
        console.log(projects);
    }

    const saveLS = (value) => {
        LocalStorageController.storage('projects', value);
    }

    // const updateLS = (value) => {
    //     LocalStorageController.remove('projects', value);
    // }

    return {create, getStorage, saveLS}
}

export {Project, projects};