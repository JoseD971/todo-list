import Feature from "./feature.js";
import {Project, projects} from "./project.js";
import {Task, tasks} from "./task.js";

const DOMStuff = (() => {

    const setEvents = () => {
        const showAll = document.getElementById('show-all');
        const showToday = document.getElementById('show-today');
        const showWeek = document.getElementById('show-week');
        const showImportant = document.getElementById('show-important');
        const showCompleted = document.getElementById('show-completed');
        const resetBtn = document.getElementById('todo-form-reset');
        const saveBtn = document.getElementById('todo-form-save');
        const projectPanelBtn = document.getElementById('open-project-panel');
        const addProjectBtn = document.getElementById('add-project');

        showAll.addEventListener('click', Feature.all);
        showToday.addEventListener('click', Feature.today);
        showWeek.addEventListener('click', Feature.week);
        showImportant.addEventListener('click', Feature.important);
        showCompleted.addEventListener('click', Feature.completed);
        resetBtn.addEventListener('click', (evet) => {
            evet.preventDefault();
            resetForm();
        });
        saveBtn.addEventListener('click', (event) => {
            event.preventDefault();
            Feature.newTask();
        });
        projectPanelBtn.addEventListener('click', () => {
            closeElement('project');
        });
        addProjectBtn.addEventListener('click', Feature.newProject);

        document.addEventListener('DOMContentLoaded', Feature.today);

        displayProjects();
    }

    const initModal = () => {
        const todoModal = document.getElementById('todo-modal');
        const newTodo = document.getElementById("add-todo");
        const clsTodo = document.querySelector("#todo-modal .close-modal");
        
        //Modal
        newTodo.addEventListener("click", () => {
            todoModal.showModal();
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

    const closeElement = (type) => {
        if(type == 'task') document.getElementById('todo-modal').close();
        if(type == 'project') {
            document.getElementById('project-panel').classList.toggle('hide');
            document.getElementById('project-name').focus();
        } 
    }

    const setTemplate = (title, number) => {
        var content = document.getElementById('content');
        content.innerHTML = '';
        content.innerHTML = `
        <div class="main-panel">
                <div class="header">
                    <h1>${title}</h1>
                    <span>${number}</span>
                </div>
                <div class="options">
                    <button class="new-task" id="add-todo"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg> Add new task</button>
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

        initModal();
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
                    <button class="open-project" id="project-${pr.id}">${pr.name}</button>
                    <button class="remove-project" project-id="${pr.id}" title="Delete project"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg></button>
                </li>
            `;
        });

        setProjectEvents();
    }

    const setProjectEvents = () => {
        const removeProjBtns =  document.getElementsByClassName('remove-project');
        
        for (let i = 0; i < removeProjBtns.length; i++) {
            let e = removeProjBtns[i];
            e.addEventListener('click', () => {
                Feature.removeProject(e.getAttribute('project-id'));
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
                    <input type="checkbox" id="task-${pr.id}">
                    <p>${pr.title}</p>
                    <button title="Expand task" class="expand"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-right</title><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg></button>
                </div>
            `;
        });
    }

    return {setEvents, closeElement, setTemplate, resetForm, getProjectName, displayProjects, getTaskInfo, displayTasks}
})();
 
export default DOMStuff;