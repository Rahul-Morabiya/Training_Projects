import { useMemo } from "react";

const StatsCards = ({ tasks, goal }) => {
  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.completed);

    const totalWater = completed.reduce(
      (acc, t) => acc + Number(t.water || 0),
      0
    );

    const today = new Date().toLocaleDateString();

    const todayWater = completed
      .filter(
        (t) =>
          t.completedAt &&
          new Date(t.completedAt).toLocaleDateString() === today
      )
      .reduce((acc, t) => acc + Number(t.water || 0), 0);

    return {
      totalWater,
      todayWater,
      completionRate: tasks.length
        ? Math.round((completed.length / tasks.length) * 100)
        : 0,
    };
  }, [tasks]);

  return (
    <div className="stats-grid">
      <div className="card stat">
        <h4>Total Water</h4>
        <h2>{stats.totalWater} ml 💧</h2>
      </div>

      <div className="card stat">
        <h4>Today</h4>
        <h2>{stats.todayWater} ml</h2>
      </div>

      <div className="card stat">
        <h4>Completion</h4>
        <h2>{stats.completionRate}%</h2>
      </div>

      <div className="card stat">
        <h4>Goal</h4>
        <h2>{goal} ml</h2>
      </div>
    </div>
  );
};

export default StatsCards;