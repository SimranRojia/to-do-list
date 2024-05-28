import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/todos'); // Adjust the URL as per your backend server
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (todo) => {
    try {
      const response = await axios.post('http://localhost:3000/todos', todo); // Adjust the URL as per your backend server
      setTodos([...todos, response.data]); // Update todos state with the newly created todo
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`); // Adjust the URL as per your backend server
      setTodos(todos.filter(todo => todo._id !== id)); // Update todos state after removing the todo
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.put(`http://localhost:3000/todos/${id}`, updatedTodo); // Adjust the URL as per your backend server
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo))); // Update todos state after updating the todo
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
