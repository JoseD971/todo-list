import {Task, tasks} from './task.js';
import {Project, projects} from './project.js';
import DOMStuff from './DOMStuff.js';
import moment from 'moment/moment.js';

var currentList = 'today';

const Feature = (() => {

    const all = () => {
        currentList = 'all';
        DOMStuff.setTemplate('All', tasks.length, true);
        DOMStuff.displayTasks(tasks);
        sortTasks('default');
    }

    const today = () => {
        currentList = 'today';
        var today = search(moment().format('YYYY-MM-DD'));
        DOMStuff.setTemplate('Today', today.length, true, 'today');
        DOMStuff.displayTasks(today);
        sortTasks('default');
    }

    const week = () => {
        currentList = 'week';
        var week = search(moment().week());
        DOMStuff.setTemplate('This week', week.length, true, 'week');
        DOMStuff.displayTasks(week);
        sortTasks('default');
    }

    const important = () => {
        currentList = 'important';
        var important = search('high');
        DOMStuff.setTemplate('Important', important.length, true);
        DOMStuff.displayTasks(important);
        sortTasks('default');
    }

    const completed = () => {
        currentList = 'completed';
        var completed = search(true);
        DOMStuff.setTemplate('Completed', completed.length, true);
        DOMStuff.displayTasks(completed);
        sortTasks('default');
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
        if (pr != undefined) {
            var list = search(currentList);
            DOMStuff.setTemplate(pr.name, list.length, false);
            DOMStuff.displayTasks(list);
        } else {
            filter(currentList);
        }
    }

    const editProject = (id) => {
        if(!valideForm('project')) return;
        const name = DOMStuff.getProjectName();
        let pr = projects.findIndex((x) => x.id == id);
        projects[pr].name = name;
        if(currentList == projects[pr].id) {
            openProject(projects[pr].id);
        }
        updateLocalStorage();
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
                x.todos.forEach((t) => {
                    if(t.project == x.id) {
                        var i = tasks.indexOf(t);
                        tasks.splice(i, 1);
                    }
                });
                var i = projects.indexOf(x);
                projects.splice(i, 1);
            }
        });
        DOMStuff.closeElement('project');
        updateLocalStorage();
        DOMStuff.displayProjects();
        openProject(currentList);
    }

    const newTask = () => {
        if(!valideForm('task')) return;
        var info = DOMStuff.getTaskInfo();
        var task = Task().create(currentList, info.title, info.description, moment(info.dueDate).format('YYYY-MM-DD'), info.priority, info.taskChecked);
        var parentPro = projects.find((x) => x.id == currentList);
        var i = projects.indexOf(parentPro);
        projects[i].todos.push(task);
        updateLocalStorage();
        openProject(currentList);
        sortTasks('default');
        DOMStuff.resetForm('task');
        DOMStuff.closeElement('task');
    }

    const editTask = (id) => {
        if(!valideForm('task')) return;
        var info = DOMStuff.getTaskInfo();
        let pr = tasks.findIndex((x) => x.id == id);
        tasks[pr].title = info.title;
        tasks[pr].description = info.description;
        tasks[pr].dueDate = info.dueDate;
        tasks[pr].priority = info.priority;
        tasks[pr].completed = info.taskChecked;
        updateLocalStorage();
        filter(currentList);
        DOMStuff.resetForm('task');
        DOMStuff.closeElement('task');
    }

    const changeTaskState = (id, value) => {
        let pr = tasks.findIndex((x) => x.id == id);
        tasks[pr].completed = value;
        updateLocalStorage();
        filter(currentList);
        DOMStuff.resetForm('task');
        DOMStuff.closeElement('task');
    }

    const removeTask = (id) => {
        let text = 'Sure you want to eliminate this task?';
        if (confirm(text) != true) return;
        tasks.forEach((x) => {
            if(x.id == id) {
                if(x.id == currentList) {
                    today();
                }
                var i = tasks.indexOf(x);
                tasks.splice(i, 1);
            }
        });
        updateLocalStorage();
        openProject(currentList);
    }

    const updateLocalStorage = () => {
        Project().saveLS(projects);
        Task().saveLS(tasks);
        Project().getStorage();
        Task().getStorage();
    }

    const sortTasks = (type) => {
        var filters = ['all', 'today', 'week', 'important', 'completed'];
        var isFilter = false;
        var list;
        filters.forEach((x) => {
            if(x == currentList) {
                isFilter = true;
            }
        });
        if(isFilter == false) {
            list = tasks.filter((x) => x.project == currentList);
        } else {
            switch (currentList) {
                case 'all':
                    list = tasks;
                    break;
                case 'today':
                    list = search(moment().format('YYYY-MM-DD'));
                    break;
                case 'week':
                    list = search(true);
                    break;
                case 'important':
                    list = search('high');
                    break;
                case 'completed':
                    list = search();
                    break;
                default:
                    break;
            }
        }
        
        switch (type) {
            case 'default':
                list = list.sort(function(a, b){
                    return new Date(b.dueDate) - new Date(a.dueDate);
                });
                break;
            case 'date asc':
                list = list.sort(function(a, b){
                    return new Date(a.dueDate) - new Date(b.dueDate);
                });
                break;
            case 'name asc':
                list = list.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name desc':
                list = list.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                console.log("GG");
                break;
        }
        DOMStuff.displayTasks(list);
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
                openProject(value);
                break;
        }
    }

    const search = (value) => {
        var found;

        switch (currentList) {
            case 'today':
                found = tasks.filter((x) => x.dueDate == value);
                break;
            case 'week': 
                found = tasks.filter((x) => moment(x.dueDate).week() == value);
                break;
            case 'important':
                found = tasks.filter((x) => x.priority == value);
                break;
            case 'completed':
                found = tasks.filter((x) => x.completed == value);
                break;
            default:
                found = tasks.filter((x) => x.project == value);
                break;
        }
    
        return found;
    }

    return {all, today, week, important, completed, newProject, openProject, editProject, removeProject, newTask, editTask, changeTaskState, removeTask, sortTasks}
})();

export default Feature;