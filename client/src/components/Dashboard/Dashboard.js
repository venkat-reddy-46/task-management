import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Task from './Task.js'

import './Dashboard.css'

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const authToken = localStorage.getItem('authToken');

                const response = await axios.get('http://localhost:5000/user/tasks', {
                    headers: {
                        'authToken': authToken
                    }
                });

                setTasks(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleEditTask = async(taskId) => {
        try {
            const authToken = localStorage.getItem('authToken');

            const response = await axios.delete(`http://localhost:5000/user/tasks/${taskId}`, {
                headers: {
                    'authToken': authToken
                }
            });

            if (response.status === 200) {
                // Remove the deleted task from the UI
                setTasks(tasks.filter(task => task.task_id !== taskId));
                alert('Task deleted successfully!');
            } else {
                alert('Failed to delete task.');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('An error occurred while deleting the task.');
        }
    };

    const handleDeleteTask = async (taskId) => {
        // Implement delete functionality here
        try {
            const authToken = localStorage.getItem('authToken');

            const response = await axios.delete(`http://localhost:5000/user/tasks/${taskId}`, {
                headers: {
                    'authToken': authToken
                }
            });

            if (response.status === 200) {
                // Remove the deleted task from the UI
                setTasks(tasks.filter(task => task.task_id !== taskId));
                alert('Task deleted successfully!');
            } else {
                alert('Failed to delete task.');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('An error occurred while deleting the task.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main className="container">
            <section id="task-list">
                <h2>Tasks</h2>
                {tasks.length !== 0 ? tasks.map((task) => (
                    <Task key={task.task_id} task={task} onEdit={handleEditTask} onDelete={handleDeleteTask} />
                )) : <p>No Tasks to display</p>}
            </section>
        </main>
    );
};

export default Dashboard;