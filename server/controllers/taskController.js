import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../db.js'; // Assuming you have already set up the pool in db.js

export const createTask = async (req, res) => {
    try {
        const decoded = jwt.verify(req.header('authToken'), process.env.JWT_SECRET);
        const user_id = decoded.user.id;
        const { name, description } = req.body;

        // Generate a unique task_id using uuid
        const taskId = uuidv4();

        // Create a new task record in the database
        const insertTaskQuery = `
            INSERT INTO tasks (task_id, name, description, user_id)
            VALUES ($1, $2, $3, $4)
            RETURNING task_id
        `;
        const taskResult = await pool.query(insertTaskQuery, [taskId, name, description, user_id]);
        const newTaskId = taskResult.rows[0].task_id;

        res.json({ task_id: newTaskId });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const getTasks = async (req, res) => {
    try {
        const decoded = jwt.verify(req.header('authToken'), process.env.JWT_SECRET);
        const user_id = decoded.user.id;

        // Query to get tasks by user_id
        const getTasksQuery = `
            SELECT * FROM tasks
            WHERE user_id = $1
        `;
        const { rows } = await pool.query(getTasksQuery, [user_id]);

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

// PUT /tasks/:id - Update a task by ID
export const editTask = async (req, res) => {
    const task_id = req.params.id;
    const { name, description } = req.body;
    const decoded = jwt.verify(req.header('authToken'), process.env.JWT_SECRET);
        const user_id = decoded.user.id;

    try {
        // Check if the task exists and was created by the authenticated user
        const checkTaskQuery = 'SELECT * FROM tasks WHERE task_id = $1 AND user_id = $2';
        const checkTaskResult = await pool.query(checkTaskQuery, [task_id, user_id]);

        if (checkTaskResult.rows.length === 0) {
            return res.status(404).json({ error: "Task not found or unauthorized to edit" });
        }

        // Update task in the database
        const updateTaskQuery = `
            UPDATE tasks
            SET name = $1, description = $2
            WHERE task_id = $3
            RETURNING *
        `;
        const updatedTaskResult = await pool.query(updateTaskQuery, [name, description, task_id]);
        const updatedTask = updatedTaskResult.rows[0];

        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};



// DELETE /tasks/:id - Delete a task by ID
export const deleteTask = async (req, res) => {
    const task_id = req.params.id;
    const decoded = jwt.verify(req.header('authToken'), process.env.JWT_SECRET);
        const user_id = decoded.user.id;

    try {
        // Check if the task exists and was created by the authenticated user
        const checkTaskQuery = 'SELECT * FROM tasks WHERE task_id = $1 AND user_id = $2';
        const checkTaskResult = await pool.query(checkTaskQuery, [task_id, user_id]);

        if (checkTaskResult.rows.length === 0) {
            return res.status(404).json({ error: "Task not found or unauthorized to delete" });
        }

        // Delete task from the database
        const deleteTaskQuery = 'DELETE FROM tasks WHERE task_id = $1';
        await pool.query(deleteTaskQuery, [task_id]);

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};