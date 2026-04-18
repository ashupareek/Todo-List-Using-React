import React, { useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([
    { text: "Develop to-do list on your own", completed: false },
    { text: "Add CRUD functionality", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  function handleInputChange(event) {
    setNewTodo(event.target.value);
  }

  function addTodo() {
    const trimmedTodo = newTodo.trim();

    if (trimmedTodo !== "") {
      const todoObject = {
        text: trimmedTodo,
        completed: false,
      };

      setTodos((prevTodos) => [todoObject, ...prevTodos]);
      setNewTodo("");
    }
  }

  function deleteTodo(id) {
    const updatedTodo = todos.filter((_, index) => index !== id);
    setTodos(updatedTodo);
  }

  function editTodo(id) {
    const updatedText = prompt("Edit your todo:", todos[id].text);

    if (updatedText === null) return;

    const trimmedText = updatedText.trim();

    if (trimmedText === "") return;

    const updatedTodos = todos.map((todo, index) => {
      if (index === id) {
        return {
          ...todo,
          text: trimmedText,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    const updatedTodos = todos.map((todo, index) => {
      if (index === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
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
            <span
              className="text"
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>

            <button
              className="complete-button"
              onClick={() => toggleComplete(index)}
            >
              {todo.completed ? "❌" : "✅" }
            </button>

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