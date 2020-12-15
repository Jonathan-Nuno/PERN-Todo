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

// Get todos

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


app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
})