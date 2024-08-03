import Task from './task.js';
import Project from './project.js';
import DOMStuff from './DOMStuff.js';

const Feature = (() => {

    const all = () => {
        DOMStuff.setTemplate('All', 30);
    }

    const today = () => {
        DOMStuff.setTemplate('Today', 5);
    }

    const week = () => {
        DOMStuff.setTemplate('This Week', 12);
    }

    const important = () => {
        DOMStuff.setTemplate('Important', 3);
    }

    const completed = () => {
        DOMStuff.setTemplate('Completed', 6);
    }

    const valideForm = (type) => {
        if (type == 'task') {
            var info = DOMStuff.getTaskInfo();
            if (info.title == '') {
                alert('Please, complete the title!');
                return false;
            }
            if (info.dueDate == '') {
                alert('Please, complete the date!');
                return false;
            }
        } else if (type == 'project') {
            if(DOMStuff.getProjectName() == '') {
                alert('Please, set a name for the project');
                return false;
            }
        }
        return true;
    }

    const newProject = () => {
        if(!valideForm('project')) return;
        const name = document.getElementById('project-name').value;
        var project = Project(name);
        project.create(project.properties);
        console.log(project.projects);
        DOMStuff.resetForm('project');
        DOMStuff.closeElement('project');
    }

    const newTask = () => {
        if(!valideForm('task')) return;
        var info = DOMStuff.getTaskInfo();
        var todo = new Task(info.title, info.description, info.dueDate, info.priority, info.taskChecked);
        console.log(todo);
        DOMStuff.resetForm('task');
        DOMStuff.closeElement('task');
    }

    return {all, today, week, important, completed, newProject, newTask}
})();

export default Feature;