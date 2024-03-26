// TodoItem.js
import React from 'react';

function TodoItem({ todo, removeTodo }) {
  return (
    <li>
      {todo.text}
      <button onClick={() => removeTodo(todo.id)}>Remove</button>
    </li>
  );
}

export default TodoItem;
