import React, { useReducer, useState } from "react";
import { todoReducer } from "../reducers/TodoReducers";

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, [
    { text: "Develop to-do list on your own", completed: false },
    { text: "Add CRUD functionality", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState("");

  function handleInputChange(event) {
    setNewTodo(event.target.value);
  }

  function addTodo() {
    dispatch({
      type: "ADD_TODO",
      payload: newTodo,
    });

    setNewTodo("");
  }

  function deleteTodo(id) {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  }

  function editTodo(id) {
    const updatedText = prompt("Edit your todo:", todos[id].text);

    if (updatedText === null) return;

    dispatch({
      type: "EDIT_TODO",
      payload: {
        id,
        updatedText,
      },
    });
  }

  function toggleComplete(id) {
    dispatch({
      type: "TOGGLE_TODO",
      payload: id,
    });
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
              {todo.completed ? "❌" : "✅"}
            </button>

            <button className="delete-button" onClick={() => deleteTodo(index)}>
              Delete
            </button>

            <button className="edit-button" onClick={() => editTodo(index)}>
              Edit
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TodoApp;
