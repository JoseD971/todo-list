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

const Project = function() {

    var properties = {}

    const create = (name) => {
        Project._counter = (Project._counter || 0) + 1;
        properties = {
            id: Project._counter,
            name: name,
            tasks: [],
        }
        projects.push(properties);
        return {properties}
    }

    // const listAll = () => {
    //     console.log(projects);
    //     return projects;
    // }

    const addTask = () => {
        
    }

    const removeTask = (id) => {

    }

    return {create}
}

export {Project, projects};