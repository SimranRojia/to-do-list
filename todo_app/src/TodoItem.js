// // import React, { useState } from 'react';
// import './TodoItem.css';

// function TodoItem({ todo, removeTodo, updateTodo }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [newText, setNewText] = useState(todo.text);
//   const [newDeadline, setNewDeadline] = useState(todo.deadline);

//   const handleToggleDone = () => {
//     updateTodo(todo._id, { ...todo, done: !todo.done });
//   };

//   const handleRemove = () => {
//     removeTodo(todo._id);
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setNewText(todo.text);
//     setNewDeadline(todo.deadline);
//   };

//   const handleSaveEdit = () => {
//     updateTodo(todo._id, { ...todo, text: newText, deadline: newDeadline });
//     setIsEditing(false);
//   };

//   return (
//     <li className={`todo-item ${todo.done ? 'done' : ''}`}>
//       {isEditing ? (
//         <>
//           <input type="text" value={newText} onChange={(e) => setNewText(e.target.value)} />
//           <input type="date" value={newDeadline} onChange={(e) => setNewDeadline(e.target.value)} />
//           <button onClick={handleSaveEdit}>Save</button>
//           <button onClick={handleCancelEdit}>Cancel</button>
//         </>
//       ) : (
//         <>
//           <span>{todo.text}</span>
//           <span>Deadline: {todo.deadline}</span>
//           <button onClick={handleToggleDone}>{todo.done ? 'Undo' : 'Done'}</button>
//           <button onClick={handleEdit}>Edit</button>
//           <button onClick={handleRemove}>Remove</button>
//         </>
//       )}
//     </li>
//   );
// }

// export default TodoItem;
