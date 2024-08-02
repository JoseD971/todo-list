import ToDo from './todo.js';
import Project from './project.js';

const Display = (() => {

    const init = () => {
        const content = document.getElementById('content');
        const sortToday = document.getElementById('sort-today');

        sortToday.addEventListener('click', today);
    }
    
    const today = () => {
        content.innerHTML = `
        <div class="main-panel">
                <div class="header">
                    <h1>Today</h1>
                    <span>8</span>
                </div>
                <div class="options">
                    <button class="new-task"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg> Add new task</button>
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
                    <div class="card">
                        <input type="checkbox" name="chckd">
                        <p>Task number 1</p>
                        <button title="Expand task" class="expand"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-right</title><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg></button>
                    </div>
                </div>
            </div>
        `;
    }

    return {init}
})();

export default Display;