import { Model } from "./model.js";
import { View } from "./view.js";

export const Controller = ((view, model) => {
  const state = new model.State();

  const handleSubmit = () => {
    view.submitBtnEl.addEventListener("click", (event) => {
      const inputValue = view.inputEl.value;
      model
        .createTodo({ content: inputValue, status: "pending" })
        .then((data) => {
          state.todos = [data, ...state.todos];
          view.clearInput();
        });
    });
  };

  const handleDelete = () => {
    [view.todolistEl, view.completedTodolistEl].forEach((item) => {
      item.addEventListener("click", (event) => {
        if (event.target.className === "delete-btn") {
          console.log("clicked");
          const id = event.target.id;
          console.log("id", typeof id);
          model.deleteTodo(+id).then((data) => {
            state.todos = state.todos.filter((todo) => todo.id !== +id);
          });
        }
      });
    });
  };

  const handleEdit = () => {
    [view.todolistEl, view.completedTodolistEl].forEach((item) => {
      item.addEventListener("click", (event) => {
        if (event.target.className === "edit-btn") {
          const id = event.target.id;
          const li = event.target.parentNode;
          const span = li.getElementsByTagName("span");
          if (span.length !== 0) {
            const span = li.getElementsByTagName("span")[0];
            const input = document.createElement("input");
            input.type = "text";
            input.value = span.textContent;
            li.insertBefore(input, span);
            li.removeChild(span);
          } else {
            const input = li.getElementsByTagName("input")[0];
            const span = document.createElement("span");
            span.textContent = input.value;
            li.insertBefore(span, input);
            li.removeChild(input);
            let status = "pending";
            if (item.className === "completed-todo-list") {
              status = "complete";
            }
            model
              .updateTodo(id, { content: span.textContent, status: status })
              .then((data) => {
                state.todos = state.todos.map((todo) =>
                  todo.id === data.id ? data : todo
                );
              });
          }
        }
      });
    });
  };

  const handleRightShift = () => {
    view.todolistEl.addEventListener("click", (event) => {
      if (event.target.className === "right-btn") {
        const id = event.target.id;
        const li = event.target.parentNode;
        const span = li.getElementsByTagName("span")[0];
        const currentContent = span.textContent;

        model
          .updateTodo(id, { content: currentContent, status: "complete" })
          .then((data) => {
            state.todos = state.todos.filter((todo) => todo.id !== data.id);
            state.completed = [data, ...state.completed];
          });
      }
    });
  };

  const handleLeftShift = () => {
    view.completedTodolistEl.addEventListener("click", (event) => {
      if (event.target.className === "left-btn") {
        const id = event.target.id;
        const li = event.target.parentNode;
        const span = li.getElementsByTagName("span")[0];
        const currentContent = span.textContent;

        model
          .updateTodo(id, { content: currentContent, status: "pending" })
          .then((data) => {
            state.todos = [data, ...state.todos];
            state.completed = state.completed.filter(
              (completed) => completed.id !== data.id
            );
          });
      }
    });
  };

  const init = () => {
    model.getTodos().then((todos) => {
      state.todos = todos.reverse().filter((todo) => todo.status === "pending");
      state.completed = todos
        .reverse()
        .filter((todo) => todo.status === "complete");
    });
  };

  const bootstrap = () => {
    init();
    handleSubmit();
    handleDelete();
    handleEdit();
    handleRightShift();
    handleLeftShift();
    state.subscribe(() => {
      view.renderTodos(state.todos);
      view.renderCompletedTodos(state.completed);
    });
  };
  return {
    bootstrap,
  };
})(View, Model);
