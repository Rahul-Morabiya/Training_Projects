import { useAppContext } from "../context/AppContext";
import StatsCards from "../components/StatsCards";
import DailyWaterChart from "../components/DailyWaterChart";
import TaskCompletionChart from "../components/TaskCompletionChart";
import GoalChart from "../components/GoalChart";

const Stats = () => {
  const { tasks, goal } = useAppContext();

  return (
    <div className="container">
      <h2>📊 Analytics Dashboard</h2>

      <StatsCards tasks={tasks} goal={goal} />

      <div className="chart-grid">
        <DailyWaterChart tasks={tasks} />

        <div>
          <TaskCompletionChart tasks={tasks} />
          <GoalChart tasks={tasks} goal={goal} />
        </div>
      </div>
    </div>
  );
};

export default Stats;