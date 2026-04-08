import React from 'react'

const TaskItem = React.memo(function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      <span>{task.title} ({task.water} ml)</span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
});
