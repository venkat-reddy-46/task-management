const Task = ({ task, onEdit, onDelete }) => (
    <div key={task.task_id} className="task">
        <h3>{task.name}</h3>
        <p>{task.description}</p>
        <div className="task-actions">
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task.task_id)}>Delete</button>
        </div>
    </div>
);

export default Task