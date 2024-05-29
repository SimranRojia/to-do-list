import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoForm from './TodoForm';
import pic1 from './todobackground.png'


function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (todo) => {
    try {
      const response = await axios.post('http://localhost:3000/todos', todo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  };

  const toggleDone = async (id) => {
    try {
      const updatedTodo = todos.find(todo => todo._id === id);
      updatedTodo.done = !updatedTodo.done;
      await axios.put(`http://localhost:3000/todos/${id}`, updatedTodo);
      setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div
      className="todo-container"
      style={{ backgroundImage: `url(${pic1})` }} // Inline style for background image
    >
      
      
      <h1>To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className={`todo-item ${todo.done ? 'done' : ''}`}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleDone(todo._id)}
            />
            <span>{todo.task}</span>
            <button onClick={() => removeTodo(todo._id)} className="remove-btn">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
