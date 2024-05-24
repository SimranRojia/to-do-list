// TodoForm.js
import React, { useState } from 'react';
import './TodoForm.css'; // Import CSS file

function TodoForm({ addTodo }) {
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');
  const [todos, setTodos] = useState([]); // State to hold todos
  const [editingIndex, setEditingIndex] = useState(null); // State to track the index of the todo being edited

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ text, deadline, done: false }); // Include 'done' property with initial value 'false'
    setText('');
    setDeadline('');
    setTodos([...todos, { text, deadline, done: false }]); // Add new todo with deadline to the list
  };

  const handleRemove = (index) => {
    const updatedTodos = [...todos]; // Create a copy of the todos array
    updatedTodos.splice(index, 1); // Remove the todo at the specified index
    setTodos(updatedTodos); // Update the todos state
  };

  const handleToggleDone = (index) => {
    const updatedTodos = [...todos]; // Create a copy of the todos array
    updatedTodos[index].done = !updatedTodos[index].done; // Toggle the 'done' state
    setTodos(updatedTodos); // Update the todos state
  };

  const handleEdit = (index, newText) => {
    const updatedTodos = [...todos]; // Create a copy of the todos array
    updatedTodos[index].text = newText; // Update the text of the todo at the specified index
    setTodos(updatedTodos); // Update the todos state
    setEditingIndex(null); // Clear the editing index
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a new todo"
          className="todo-input"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="deadline-input"
        />
        <button type="submit" className="todo-submit">Add</button>
      </form>
      {todos.length > 0 && (
        <div className="todo-list">
          {todos.map((todo, index) => (
            <div key={index} className={`todo-item ${todo.done ? 'done' : ''}`}>
              {editingIndex === index ? (
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) => handleEdit(index, e.target.value)}
                  onBlur={() => setEditingIndex(null)} // Save changes on blur
                  autoFocus // Focus on input field when editing starts
                />
              ) : (
                <>
                  <span>{todo.text}</span>
                  <span>Deadline: {todo.deadline}</span>
                  <div>
                    <button onClick={() => handleToggleDone(index)}>{todo.done ? 'Undo' : 'Done'}</button>
                    <button onClick={() => setEditingIndex(index)}>Edit</button>
                    <button onClick={() => handleRemove(index)}>Remove</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoForm;
