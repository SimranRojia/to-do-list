import React, { useState } from 'react';
import './TodoForm.css'; // Import CSS file

function TodoForm({ addTodo }) {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [todos, setTodos] = useState([]); // State to hold todos
  const [editingIndex, setEditingIndex] = useState(null); // State to track the index of the todo being edited

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Combine date and time into a single string
    const dateTimeString = date + 'T' + time;
    
    // Create a new Date object
    const deadline = new Date(dateTimeString);
    
    // Check if the deadline is a valid date
    if (isNaN(deadline.getTime())) {
      alert('Please enter a valid date and time.');
      return;
    }

    addTodo({ text, deadline, done: false }); // Include 'done' property with initial value 'false'
    setText('');
    setDate('');
    setTime('');
    setTodos([...todos, { text, deadline, done: false }]);
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
          placeholder="Enter a new task"
          className="todo-input"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="deadline-input"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
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
                  onBlur={() => setEditingIndex(null)}
                  autoFocus
                />
              ) : (
                <>
                  <span>{todo.text}</span>
                  <span>Deadline: {new Date(todo.deadline).toLocaleString()}</span>
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
