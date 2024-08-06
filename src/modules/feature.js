import {Task, tasks} from './task.js';
import {Project, projects} from './project.js';
import DOMStuff from './DOMStuff.js';
import moment from 'moment/moment.js';

var currentList = 'today';

const Feature = (() => {

    const all = () => {
        currentList = 'all';
        DOMStuff.setTemplate('All', tasks.length);
        DOMStuff.displayTasks(tasks);
    }

    const today = () => {
        currentList = 'today';
        var today = search(moment().format('DD-MM-YYYY'));
        DOMStuff.setTemplate('Today', today.length);
        DOMStuff.displayTasks(today);
    }

    const week = () => {
        currentList = 'week';
        var week = search(moment().week());
        DOMStuff.setTemplate('This week', week.length);
        DOMStuff.displayTasks(week);
    }

    const important = () => {
        currentList = 'important';
        var important = search('high');
        DOMStuff.setTemplate('Important', important.length);
        DOMStuff.displayTasks(important);
    }

    const completed = () => {
        currentList = 'completed';
        var completed = search(true);
        DOMStuff.setTemplate('Completed', completed.length);
        DOMStuff.displayTasks(completed);
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
        const name = DOMStuff.getProjectName();
        Project().create(name);
        DOMStuff.displayProjects();
        DOMStuff.resetForm('project');
        DOMStuff.toggleElement('project');
    }

    const openProject = (id) => {
        currentList = id;
        const pr = projects.find((x) => x.id == id);
        var list = search(currentList);
        DOMStuff.setTemplate(pr.name, list.length);
        DOMStuff.displayTasks(list);
    }

    const editProject = (id) => {
        if(!valideForm('project')) return;
        const name = DOMStuff.getProjectName();
        let pr = projects.findIndex((x) => x.id === id);
        projects[pr].name = name;
        DOMStuff.displayProjects();
        DOMStuff.resetForm('project');
        DOMStuff.toggleElement('project');
    }

    const removeProject = (id) => {
        let text = 'All the tasks contained in this project will also be deleted, do you want to continue?';
        if (confirm(text) != true) return;
        projects.forEach((x) => {
            if(x.id == id) {
                if(x.id == currentList) {
                    today();
                }
                var i = projects.indexOf(x);
                projects.splice(i, 1);
            }
        });
        DOMStuff.toggleElement('project');
        DOMStuff.displayProjects();
    }

    const newTask = () => {
        if(!valideForm('task')) return;
        var info = DOMStuff.getTaskInfo();
        Task().create(currentList, info.title, info.description, moment(info.dueDate).format('DD-MM-YYYY'), info.priority, info.taskChecked);
        filter(currentList);
        DOMStuff.resetForm('task');
        DOMStuff.toggleElement('task');
    }

    const filter = (value) => {
        switch (value) {
            case 'all':
                all();
                break;
            case 'today':
                today();
                break;
            case 'week':
                week();
                break;
            case 'important':
                important();
                break;
            case 'completed':
                completed();
                break;
            default:
                search(value);
                break;
        }
    }

    const search = (value) => {
        var found;
 
        switch (currentList) {
            case 'today':
                found = tasks.filter((x) => x.dueDate === value);
                break;
            case 'week': 
                found = tasks.filter((x) => moment(x.dueDate, 'DD-MM-YYYY').week() === value);
                break;
            case 'important':
                found = tasks.filter((x) => x.priority === value);
                break;
            case 'completed':
                found = tasks.filter((x) => x.completed === value);
                break;
            default:
                found = tasks.filter((x) => x.project === value);
                break;
        }
    
        return found;
    }

    return {all, today, week, important, completed, newProject, editProject, removeProject, newTask, openProject}
})();

export default Feature;