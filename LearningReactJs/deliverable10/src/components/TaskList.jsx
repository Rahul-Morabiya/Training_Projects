import { useMemo } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleTask, deleteTask, filter, search }) => {
  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (filter === "completed") result = result.filter((t) => t.completed);
    if (filter === "pending") result = result.filter((t) => !t.completed);

    if (search) {
      result = result.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  }, [tasks, filter, search]);

  if (filteredTasks.length === 0) {
    return <p>No tasks found 🚫</p>;
  }

  return (
    <div className="card">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
      ))}
    </div>
  );
};

export default TaskList;