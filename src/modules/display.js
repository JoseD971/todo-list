import ToDo from './todo.js';
import Modal from './modal';
import Project from './project.js';

const Display = (() => {

    const content = document.getElementById('content');

    const init = () => {
        const showAll = document.getElementById('show-all');
        const showToday = document.getElementById('show-today');
        const showWeek = document.getElementById('show-week');
        const showImportant = document.getElementById('show-important');
        const showCompleted = document.getElementById('show-completed');

        showAll.addEventListener('click', all);
        showToday.addEventListener('click', today);
        showWeek.addEventListener('click', week);
        showImportant.addEventListener('click', important);
        showCompleted.addEventListener('click', completed);
    }
    
    const template = (title, number) => {
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

        Modal.activate();
    }

    const all = () => {
        template('All', 30);
    }

    const today = () => {
        template('Today', 5);
    }

    const week = () => {
        template('This Week', 12);
    }

    const important = () => {
        template('Important', 3);
    }

    const completed = () => {
        template('Completed', 6);
    }

    return {init}
})();

export default Display;