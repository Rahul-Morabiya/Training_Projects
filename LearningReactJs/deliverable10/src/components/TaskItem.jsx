import React from "react";

const TaskItem = React.memo(({ task, toggleTask, deleteTask }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
      <div>
        <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />

        <strong style={{ marginLeft: "10px" }}>
          {task.title}
        </strong>

        <p>{task.water} ml 💧 | {task.priority}</p>
        <small>{task.dueDate}</small>
      </div>

      <button onClick={() => deleteTask(task.id)}>❌</button>
    </div>
  );
});

export default TaskItem;