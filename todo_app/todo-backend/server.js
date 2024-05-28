const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/todoList', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Define a schema for todo items
const todoSchema = new mongoose.Schema({
  text: String,
  deadline: Date,
});

const Todo = mongoose.model('Todo', todoSchema);

// GET all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new todo
app.post('/todos', async (req, res) => {
  const { text, deadline, done } = req.body; // Ensure these fields match your request body
  try {
    const newTodo = new Todo({
      text,
      deadline
    });
    await newTodo.save(); // Save the new todo item to the database
    res.status(201).json(newTodo); // Respond with the created todo object
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT to update a todo
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { text, deadline, done } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { text, deadline, done },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
