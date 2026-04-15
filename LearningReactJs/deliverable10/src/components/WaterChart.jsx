import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const WaterChart = ({ tasks }) => {
  const data = tasks.map((t) => ({
    name: t.title,
    water: Number(t.water),
  }));

  return (
    <LineChart width={500} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="water" />
    </LineChart>
  );
};

export default WaterChart;