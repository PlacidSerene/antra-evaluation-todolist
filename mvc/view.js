export const View = (() => {
  const todolistEl = document.querySelector(".todo-list");
  const completedTodolistEl = document.querySelector(".completed-todo-list");
  const submitBtnEl = document.querySelector(".submit-btn");
  const inputEl = document.querySelector(".input");

  //for pending list
  const renderTodos = (todos) => {
    let todosTemplate = "";
    todos.forEach((todo) => {
      const liTemplate = `
            <li class="task">
                <span>${todo.content}</span>
                <button class="edit-btn" id="${todo.id}">edit</button>
                <button class="delete-btn" id="${todo.id}">delete</button>
                <button class="right-btn" id="${todo.id}">right</button>
            </li>`;
      todosTemplate += liTemplate;
    });
    if (todos.length === 0) {
      todosTemplate = "<h4>no task to display!</h4>";
    }
    todolistEl.innerHTML = todosTemplate;
  };

  //For completed list
  const renderCompletedTodos = (completed) => {
    let completedTemplate = "";
    completed.forEach((comp) => {
      const liTemplate = `
            <li class="task">
            <span>${comp.content}</span>
            <button class="edit-btn" id="${comp.id}">edit</button>
            <button class="delete-btn" id="${comp.id}">delete</button>
            <button class="left-btn" id="${comp.id}">left</button>
            </li>`;
      completedTemplate += liTemplate;
    });
    if (completed.length === 0) {
      completedTemplate = "<h4>no task to display!</h4>";
    }
    completedTodolistEl.innerHTML = completedTemplate;
  };

  const clearInput = () => {
    inputEl.value = "";
  };

  return {
    renderTodos,
    renderCompletedTodos,
    submitBtnEl,
    inputEl,
    clearInput,
    todolistEl,
    completedTodolistEl,
  };
})();
