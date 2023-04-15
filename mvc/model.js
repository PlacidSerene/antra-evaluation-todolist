import { Api } from "./api.js";
import { View } from "./view.js";

export const Model = ((api, view) => {
  class State {
    #todos; //private field
    #completed;
    #onChange; //function, will be called when setter function todos is called
    constructor() {
      this.#todos = [];
      this.#completed = [];
    }
    get todos() {
      return this.#todos;
    }
    set todos(newTodos) {
      // reassign value
      console.log("setter function");
      this.#todos = newTodos;
      this.#onChange?.(); // rendering
    }

    get completed() {
      return this.#completed;
    }
    set completed(newTodos) {
      // reassign value
      console.log("setter function");
      this.#completed = newTodos;
      this.#onChange?.(); // rendering
    }

    subscribe(callback) {
      //subscribe to the change of the state todos
      this.#onChange = callback;
    }
  }

  const { getTodos, createTodo, deleteTodo, updateTodo } = api;
  return {
    State,
    getTodos,
    createTodo,
    deleteTodo,
    updateTodo,
  };
})(Api, View);
