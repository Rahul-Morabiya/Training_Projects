import { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [form, setForm] = useState({
    title: "",
    water: "",
    priority: "medium",
    dueDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) return;

    addTask(form);

    setForm({
      title: "",
      water: "",
      priority: "medium",
      dueDate: "",
    });
  };

  return (
    <div className="card">
      <h3>Add Task</h3>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Task" value={form.title} onChange={handleChange} />
        <input name="water" type="number" placeholder="Water (ml)" value={form.water} onChange={handleChange} />

        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />

        <button>Add</button>
      </form>
    </div>
  );
};

export default TaskForm;