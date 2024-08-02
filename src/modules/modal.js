const Modal = (() => {
    const activate = () => {
        const todoModal = document.getElementById('todo-modal');
        const newTodo = document.getElementById("add-todo");
        const clsTodo = document.querySelector("#todo-modal .close-modal");
        
        //Modal
        newTodo.addEventListener("click", () => {
            todoModal.showModal();
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

    return {activate}
})();

export default Modal;