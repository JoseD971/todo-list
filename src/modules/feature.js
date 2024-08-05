import {Task, tasks} from './task.js';
import {Project, projects} from './project.js';
import DOMStuff from './DOMStuff.js';

const Feature = (() => {

    const all = () => {
        DOMStuff.setTemplate('All', 30);
        DOMStuff.displayTasks(tasks);
    }

    const today = () => {
        DOMStuff.setTemplate('Today', 5);
        DOMStuff.displayTasks(tasks);
    }

    const week = () => {
        DOMStuff.setTemplate('This Week', 12);
        DOMStuff.displayTasks(tasks);
    }

    const important = () => {
        DOMStuff.setTemplate('Important', 3);
        DOMStuff.displayTasks(tasks);
    }

    const completed = () => {
        DOMStuff.setTemplate('Completed', 6);
        DOMStuff.displayTasks(tasks);
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
        var project = Project().create(name);
        DOMStuff.displayProjects();
        DOMStuff.resetForm('project');
        DOMStuff.closeElement('project');
    }

    const removeProject = (id) => {
        let text = "All the tasks contained in this project will also be deleted, do you want to continue?";
        if (confirm(text) != true) return;
        projects.forEach((x) => {
            if(x.id == id) {
                var i = projects.indexOf(x);
                projects.splice(i, 1);
            }
        });
        DOMStuff.displayProjects();
    }

    const newTask = () => {
        if(!valideForm('task')) return;
        var info = DOMStuff.getTaskInfo();
        var task = Task().create(info.title, info.description, info.dueDate, info.priority, info.taskChecked);
        console.log(task);
        DOMStuff.displayTasks(tasks);
        DOMStuff.resetForm('task');
        DOMStuff.closeElement('task');
    }

    return {all, today, week, important, completed, newProject, removeProject, newTask}
})();

export default Feature;