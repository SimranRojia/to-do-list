const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');


const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb://localhost:27017'; // Update with your MongoDB connection URI

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
let db;
MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
        return;
    }
    console.log('Connected to MongoDB');
    db = client.db('todo_app'); // Replace 'todo_app' with your database name
});

// Routes
// Get all todos
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await db.collection('todos').find().toArray();
        res.json(todos);
    } catch (err) {
        console.error('Error fetching todos:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a new todo
app.post('/api/todos', async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    try {
        const result = await db.collection('todos').insertOne({ text });
        const newTodo = await db.collection('todos').findOne({ _id: result.insertedId });
        res.status(201).json(newTodo);
    } catch (err) {
        console.error('Error adding todo:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
