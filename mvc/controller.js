import { Model } from "./model.js";
import { View } from "./view.js";

export const Controller = ((view, model) => {
  const state = new model.State();
  const init = () => {
    model.getTodos().then((todos) => {
      todos.reverse();
      state.todos = todos.filter((todo) => todo.status === "pending");
      state.completed = todos.filter((todo) => todo.status === "complete");
      view.renderTodos(state.todos);
      view.renderCompletedTodos(state.completed);
    });
  };

  const handleSubmit = () => {
    view.submitBtnEl.addEventListener("click", (event) => {
      /* 
                1. read the value from input
                2. post request
                3. update view
            */
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
    //event bubbling
    /* 
            1. get id
            2. make delete request
            3. update view, remove
        */
    view.todolistEl.addEventListener("click", (event) => {
      if (event.target.className === "delete-btn") {
        const id = event.target.id;
        console.log("id", typeof id);
        model.deleteTodo(+id).then((data) => {
          state.todos = state.todos.filter((todo) => todo.id !== +id);
        });
      }
    });
  };

  const handleDelete2 = () => {
    //event bubbling
    /* 
            1. get id
            2. make delete request
            3. update view, remove
        */
    view.completedTodolistEl.addEventListener("click", (event) => {
      if (event.target.className === "delete-btn") {
        console.log("clicked");
        const id = event.target.id;
        console.log("id", typeof id);
        model.deleteTodo(+id).then((data) => {
          state.todos = state.todos.filter((todo) => todo.id !== +id);
        });
      }
    });
  };

  const handleEdit = () => {
    //event
    /*
        1. get id
        2. 
        3. update view
        */
    // view.todolistEl.addEventListener("click", (event) => {
    //   if (event.target.className === "edit-btn") {
    //     const id = event.target.id;
    //     console.log(id, typeof id);
    //     const currentContent =
    //       event.target.previousElementSibling.previousElementSibling;

    //     if (event.target.textContent === "edit") {
    //       event.target.textContent = "save";
    //       currentContent.contentEditable = "true";
    //     } else {
    //       event.target.textContent = "edit";
    //       currentContent.contentEditable = "false";
    //       const newContent = currentContent.textContent;
    //       model.updateTodo(id, { content: newContent }).then((data) => {
    //         state.todos = state.todos.map((todo) =>
    //           todo.id === data.id ? data : todo
    //         );
    //       });
    //     }
    //   }
    // });

    view.todolistEl.addEventListener("click", (event) => {
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
  };
  const handleEdit2 = () => {
    view.completedTodolistEl.addEventListener("click", (event) => {
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
          console.log(span.textContent);
          model
            .updateTodo(id, { content: span.textContent, status: "complete" })
            .then((data) => {
              state.todos = state.todos.map((todo) =>
                todo.id === data.id ? data : todo
              );
            });
        }
      }
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

  const bootstrap = () => {
    init();
    handleSubmit();
    handleDelete();
    handleDelete2();
    handleEdit();
    handleEdit2();
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
