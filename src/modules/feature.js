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

    const valideForm = () => {
        var info = DOMStuff.getTaskInfo();
        if (info.title == '') {
            alert('PLease, complete the title!');
            return false;
        }
        if (info.dueDate == '') {
            alert('Please, complete the date!');
            return false;
        }
        return true;
    }

    const newTask = () => {
        if(!valideForm()) return;
        var info = DOMStuff.getTaskInfo();
        var todo = new Task(info.title, info.description, info.dueDate, info.priority, info.taskChecked);
        console.log(todo);
        DOMStuff.resetForm();
        DOMStuff.closeModal();
    }

    return {all, today, week, important, completed, newTask}
})();

export default Feature;