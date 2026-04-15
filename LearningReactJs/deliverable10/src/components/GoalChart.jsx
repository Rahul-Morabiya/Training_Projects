import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const GoalChart = ({ tasks, goal }) => {
  const total = tasks
    .filter((t) => t.completed)
    .reduce((acc, t) => acc + Number(t.water || 0), 0);

  const data = [
    { name: "Goal", value: goal },
    { name: "Consumed", value: total },
  ];

  return (
    <div className="card chart-small">
      <h3>Goal vs Actual</h3>

      <BarChart width={300} height={250} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#22c55e" />
      </BarChart>
    </div>
  );
};

export default GoalChart;