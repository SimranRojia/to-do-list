import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

function TodoForm() {
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        try {
            // Send POST request to add todo
            const response = await axios.post('/api/todos', { text });
            console.log('Todo added:', response.data);
            // Clear input after adding todo
            setText('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new todo"
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default TodoForm;
