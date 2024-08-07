var projects = [
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
        return properties;
    }

    return {create}
}

export {Project, projects};