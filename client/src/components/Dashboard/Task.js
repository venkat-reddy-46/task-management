// Task.js

import React, { useState } from 'react';

import './Dashboard.css'

const Task = ({ task, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value });
    };

    const handleSave = () => {
        onEdit(editedTask);
        setIsEditing(false);
    };

    return (
        <div key={task.task_id} className="task">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        name="name"
                        value={editedTask.name}
                        onChange={handleChange}
                    />
                    <textarea
                    className="description-textarea"
                        name="description"
                        value={editedTask.description}
                        onChange={handleChange}
                    ></textarea>
                    <button className='btn' onClick={handleSave}>Save</button>
                    <button className='btn' onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h3>{task.name}</h3>
                    <p className='task-desc'>{task.description}</p>
                    <div className="task-actions">
                        <button className='btn' onClick={() => setIsEditing(true)}>Edit</button>
                        <button className='btn' onClick={() => onDelete(task.task_id)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Task;
