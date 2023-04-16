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
                <button class="delete-btn" id="${todo.id}"><svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      aria-label="fontSize small"
      fill="#fff"
      width="20px"
    >
      <path
        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
      ></path>
    </svg></button>
                <button class="right-btn" id="${todo.id}"><svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="ArrowForwardIcon"
      aria-label="fontSize small"
      fill = "#fff"
      width = "20px"
    >
      <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
    </svg></button>
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
            <button class="delete-btn" id="${comp.id}"><svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      aria-label="fontSize small"
      fill="#fff"
      width="20px"
    >
      <path
        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
      ></path>
    </svg></button>
            <button class="left-btn" id="${comp.id}"><svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      aria-label="fontSize small"
      fill="#fff"
      width="20px"
    >
      <path
        d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
      ></path>
    </svg></button>
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
