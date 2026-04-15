import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#22c55e", "#ef4444"];

const TaskCompletionChart = ({ tasks }) => {
  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  const data = [
    { name: "Done", value: completed },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="card chart-small">
      <h3>Task Status</h3>

      <PieChart width={300} height={250}>
        <Pie data={data} dataKey="value" outerRadius={80}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default TaskCompletionChart;