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
          if (event.target.textContent === "edit") {
            const li = event.target.parentNode;
            const span = li.firstElementChild;
            const input = document.createElement("input");
            input.type = "text";
            input.value = span.textContent;
            li.insertBefore(input, span);
            li.removeChild(span);
            event.target.textContent = "save";
          } else if (event.target.textContent === "save") {
            const li = event.target.parentNode;
            const input = li.firstElementChild;
            const span = document.createElement("span");
            span.textContent = input.value;
            li.insertBefore(span, input);
            li.removeChild(input);
            event.target.textContent = "edit";
            model
              .updateTodo(id, { content: span.textContent, status: "pending" })
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
        const currentContent =
          event.target.previousElementSibling.previousElementSibling
            .previousElementSibling;
        const newContent = currentContent.textContent;
        console.log(currentContent);

        model
          .updateTodo(id, { content: newContent, status: "complete" })
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
        console.log(id);
        const currentContent =
          event.target.previousElementSibling.previousElementSibling
            .previousElementSibling;
        const newContent = currentContent.textContent;
        console.log(currentContent);

        model
          .updateTodo(id, { content: newContent, status: "pending" })
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
      //   todos.reverse();
      state.todos = todos.reverse().filter((todo) => todo.status === "pending");
      state.completed = todos
        .reverse()
        .filter((todo) => todo.status === "complete");
      //   view.renderTodos(state.todos);
      //   view.renderCompletedTodos(state.completed);
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
