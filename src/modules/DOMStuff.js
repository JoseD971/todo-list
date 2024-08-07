import Feature from "./feature.js";
import {projects} from "./project.js";
import {tasks} from "./task.js";
import moment from "moment";

const DOMStuff = (() => {

    const setEvents = () => {
        const showAll = document.getElementById('show-all');
        const showToday = document.getElementById('show-today');
        const showWeek = document.getElementById('show-week');
        const showImportant = document.getElementById('show-important');
        const showCompleted = document.getElementById('show-completed');
        const resetBtn = document.getElementById('todo-form-reset');
        const projectPanelBtn = document.getElementById('open-project-panel');

        showAll.addEventListener('click', Feature.all);
        showToday.addEventListener('click', Feature.today);
        showWeek.addEventListener('click', Feature.week);
        showImportant.addEventListener('click', Feature.important);
        showCompleted.addEventListener('click', Feature.completed);
        resetBtn.addEventListener('click', (evet) => {
            evet.preventDefault();
            resetForm('task');
        });
        projectPanelBtn.addEventListener('click', () => {
            setActionType('add');
        });

        document.addEventListener('DOMContentLoaded', Feature.today);

        displayProjects();
    }

    const initModal = () => {
        const todoModal = document.getElementById('todo-modal');
        const newTodo = document.getElementById('add-todo');
        const clsTodo = document.querySelector('#todo-modal .close-modal');
        const modalTitle = document.getElementById('modal-title');
        
        //Modal
        newTodo.addEventListener("click", () => {
            modalTitle.textContent = 'Add new task';
            resetForm('task');
            todoModal.showModal();
            setEventModal('add');
            document.getElementById('todo-title').focus();
        });
          
        clsTodo.addEventListener("click", () => {
            todoModal.close();
        });
        
        // window.onclick = function(event) {
        //     if (event.target == todoModal) {
        //       todoModal.close();
        //     }
        // }
    }

    const toggleElement = (type) => {
        if(type == 'task') document.getElementById('todo-modal').close();
        if(type == 'project') {
            document.getElementById('project-panel').classList.toggle('hide');
            document.getElementById('project-name').focus();
        } 
    }

    const setTemplate = (title, number, filter) => {
        var content = document.getElementById('content');
        content.innerHTML = '';
        content.innerHTML = `
        <div class="main-panel">
                <div class="header">
                    <h1>${title}</h1>
                    <span>${number}</span>
                </div>
                <div class="options">
                    ${(filter == false) ? '<button class="new-task" id="add-todo"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg> Add new task</button>' : ''}
                    <div class="sort-button">
                        <label for="sort">Sort by</label>
                        <select name="sort" id="sort">
                            <option value="default">Default</option>
                            <option value="asc">Name Asc</option>
                            <option value="desc">Name Desc</option>
                        </select>
                    </div>
                </div>
                <div id="list">
                    
                </div>
            </div>
        `;

        if (filter == false) initModal();
    }

    const resetForm = (type) => {
        if (type == 'task') document.getElementById('todo-form').reset();
        if (type == 'project') document.getElementById('project-name').value = '';
    }

    const getProjectName = () => {
        return document.getElementById('project-name').value;
    }

    const displayProjects = () => {
        const projectsList = document.getElementById('projects-list');

        projectsList.innerHTML = ``;
        projects.forEach((pr) => {
            projectsList.innerHTML += `
                <li>
                    <button class="open-project" project-id="${pr.id}">${pr.name}</button>
                    <div class="action-project-buttons">
                        <button class="edit-project" project-id="${pr.id}" title="Edit project"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg></button>
                        <button class="remove-project" project-id="${pr.id}" title="Delete project"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg></button>
                    </div>
                </li>
            `;
        });

        setProjectEvents();
    }

    const setProjectEvents = () => {
        const openProjBtns = document.getElementsByClassName('open-project');
        const editProjBtns = document.getElementsByClassName('edit-project');
        const removeProjBtns = document.getElementsByClassName('remove-project');

        for (let i = 0; i < openProjBtns.length; i++) {
            let e = openProjBtns[i];
            e.addEventListener('click', () => {
                Feature.openProject(e.getAttribute('project-id'));
            });
        }

        for (let i = 0; i < editProjBtns.length; i++) {
            let e = editProjBtns[i];
            let id = e.getAttribute('project-id');
            e.addEventListener('click', () => {
                let pr = projects.find((x) => x.id == id);
                setActionType('edit', pr.name, pr.id);
            });
        }
        
        for (let i = 0; i < removeProjBtns.length; i++) {
            let e = removeProjBtns[i];
            e.addEventListener('click', () => {
                Feature.removeProject(e.getAttribute('project-id'));
            });
        }
    }

    const setActionType = (type, value = '', id = '') => {
        var actionProjectBtn = document.getElementById('action-project');
        actionProjectBtn.replaceWith(actionProjectBtn.cloneNode(true));
        actionProjectBtn = document.getElementById('action-project');
        actionProjectBtn.setAttribute('action-type', type);
        if(type == 'add') {
            document.getElementById('project-name').value = '';
            toggleElement('project');
            actionProjectBtn.addEventListener('click', () => {
                Feature.newProject();
            });
        } else if(type == 'edit') {
            document.getElementById('project-name').value = value;
            toggleElement('project');
            actionProjectBtn.addEventListener('click', () => {
                Feature.editProject(id);
            });
        }
    }

    const getTaskInfo = () => {
        var title = document.getElementById('todo-title').value;
        var priority = document.getElementById('todo-priority').value;
        var dueDate = document.getElementById('todo-due-date').value;
        var description = document.getElementById('todo-description').value;
        var taskChecked = document.getElementById('todo-completed').checked;

        return {title, priority, dueDate, description, taskChecked}
    }

    const displayTasks = (list) => {
        const tasksList = document.getElementById('list');

        tasksList.innerHTML = ``;
        list.forEach((pr) => {
            tasksList.innerHTML += `
                <div class="card">
                    <input type="checkbox" ${(pr.completed == true) ? 'checked' : ''}>
                    <p>${pr.title}</p>
                    <button task-id="${pr.id}" title="Expand task" class="expand"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-right</title><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg></button>
                </div>
            `;
        });

        setTasksEvents();
    }

    const setTasksEvents = () => {
        const editTaskBtns = document.getElementsByClassName('expand');
        const todoModal = document.getElementById('todo-modal');
        const modalTitle = document.getElementById('modal-title');
        for (let i = 0; i < editTaskBtns.length; i++) {
            let e = editTaskBtns[i];
            e.addEventListener('click', () => {
                modalTitle.textContent = 'Edit task';
                expandEditModal(e.getAttribute('task-id'));
                todoModal.showModal();
                setEventModal('edit', e.getAttribute('task-id'));
            });
        }
    }

    const expandEditModal = (id) => {
        var tks = tasks.find((x) => x.id == id);
        document.getElementById('todo-title').value = tks.title;
        document.getElementById('todo-priority').value = tks.priority;
        var date = document.getElementById('todo-due-date').value = moment(tks.dueDate).format('YYYY-MM-DD');
        console.log(tks.dueDate);
        console.log(date);
        document.getElementById('todo-description').value = tks.description;
        document.getElementById('todo-completed').checked = tks.completed;
    }

    const setEventModal = (type, id = '') => {
        var saveBtn = document.getElementById('todo-form-save');
        saveBtn.replaceWith(saveBtn.cloneNode(true));
        saveBtn = document.getElementById('todo-form-save');
        if(type == 'add') {
            saveBtn.addEventListener('click', (event) => {
                event.preventDefault();
                Feature.newTask();
            });
        } else if(type == 'edit') {
            saveBtn.addEventListener('click', (event) => {
                event.preventDefault();
                Feature.editTask(id);
            });
        }
    }

    return {setEvents, toggleElement, setTemplate, resetForm, getProjectName, displayProjects, getTaskInfo, displayTasks}
})();
 
export default DOMStuff;