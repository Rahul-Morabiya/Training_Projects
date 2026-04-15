import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { getLast7DaysData } from "../utils/chartUtils";

const DailyWaterChart = ({ tasks }) => {
  const data = getLast7DaysData(tasks);

  return (
    <div className="card chart-large">
      <h3>7-Day Hydration Trend</h3>

      <LineChart width={600} height={300} data={data}>
        <CartesianGrid stroke="#334155" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line dataKey="water" stroke="#38bdf8" strokeWidth={3} />
      </LineChart>
    </div>
  );
};

export default DailyWaterChart;