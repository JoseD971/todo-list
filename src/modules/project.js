const Project = function(name) {

    Project._counter = (Project._counter || 0) + 1;

    var projects = [
        {
            id: 'personal',
            name: 'Personal',
        },
        {
            id: 'work',
            name: 'Work',
        },
        {
            id: 'life',
            name: 'Life',
        },
    ];

    const properties = {
        id: Project._counter,
        name: name,
        tasks: [],
    }

    const create = (project) => {
        projects.push(project);
    }

    const addTask = (id) => {

    }

    const removeTask = (id) => {

    }

    return {properties, projects, create}
}

export default Project;