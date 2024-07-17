import React from 'react';
import axios from 'axios';

import './AddTask.css';

const AddTask = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();

        const taskName = document.getElementById('taskName').value;
        const taskDescription = document.getElementById('taskDescription').value;
        const authToken = localStorage.getItem('authToken');

        try {
            const response = await axios.post('http://localhost:5000/user/tasks', {
                name: taskName,
                description: taskDescription
            }, {
                headers: {
                    authToken:localStorage.getItem('authToken')
                }
            });

            if (response.status === 200) {
                alert('Task added successfully!');
                // Optionally, clear the form
                document.getElementById('taskForm').reset();
            } else {
                alert('Failed to add task.');
            }
        } catch (error) {
            console.error('Error adding task:', error);
            alert('An error occurred while adding the task.');
        }
    };

    return (
        <main className="container add-task">
            <section id="add-task-form">
                <h2>Add New Task</h2>
                <form id="taskForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="taskName">Task Name</label>
                        <input type="text" id="taskName" name="taskName" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskDescription">Description</label>
                        <textarea id="taskDescription" name="taskDescription" required></textarea>
                    </div>
                    <button type="submit">Add Task</button>
                </form>
            </section>
        </main>
    );
};

export default AddTask;
