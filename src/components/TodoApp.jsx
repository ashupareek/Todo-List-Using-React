import React, { useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([
    "Develop to-do list on your own",
    "Add CRUD functionality",
  ]);
  const [newTodo, setNewTodo] = useState("");

  function handleInputChange(event) {
    setNewTodo(event.target.value);
  }

  function addTodo() {
    if (newTodo.trim() !== "") {
      setTodos((todo) => [newTodo, ...todo]);
      setNewTodo("");
    }
  }

  function deleteTodo(id) {
    const updatedTodo = todos.filter((_, index) => index !== id);
    setTodos(updatedTodo);
  }

  function editTodo(id) {
    const updatedText = prompt("Edit your todo:", todos[id]);

    if (updatedText === null) return;

    const trimmedText = updatedText.trim();

    if (trimmedText === "") return;

    const updatedTodos = todos.map((todo, index) => {
      if (index === id) {
        return trimmedText;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  return (
    <div className="to-do-list">
      <h1>Todo List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTodo}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTodo}>
          Add
        </button>
      </div>

      <ol>
        {todos.map((todo, index) => (
          <li key={index}>
            <span className="text">{todo}</span>

            <button
              className="delete-button"
              onClick={() => deleteTodo(index)}
            >
              Delete
            </button>

            <button
              className="edit-button"
              onClick={() => editTodo(index)}
            >
              Edit
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TodoApp;