import React, { useState } from 'react';
import TodoForm from './Create';
import './Create.css'

function HomePage() {
    const [todos, setTodos] = useState([]);

    return (
        <div>
            <h2>TO DO LIST</h2>
            <TodoForm addTodo={(todo) => setTodos([...todos, todo])} />
            {todos.length === 0 ? (
                <div>
                    <h2>No records</h2>
                </div>
            ) : (
                <ul>
                    {todos.map((todo, index) => (
                        <li key={index}>{todo}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default HomePage;
