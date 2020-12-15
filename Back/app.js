const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 5000;
const pool = require('./db');

// Middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

// Create todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// Get all Todos

app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todo"
        );
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message);
    }
})

// Get Single Todo
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json(todo.rows)
    } catch (err) {
        console.error(err.message);
    }
})

// Update Todo

app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );
        res.json("Todo was updated!");
    } catch (err) {
        console.error(err.message);
    }
})



app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
})