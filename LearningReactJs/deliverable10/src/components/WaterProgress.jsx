import { useMemo } from "react";

const WaterProgress = ({ tasks, goal }) => {
  const todayWater = useMemo(() => {
    const today = new Date().toLocaleDateString();

    return tasks
      .filter(
        (t) =>
          t.completed &&
          t.completedAt &&
          new Date(t.completedAt).toLocaleDateString() === today
      )
      .reduce((acc, t) => acc + Number(t.water || 0), 0);
  }, [tasks]);

  const percent = Math.min((todayWater / goal) * 100, 100);

  return (
    <div className="card">
      <h3>
        {todayWater} / {goal} ml 💧
      </h3>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default WaterProgress;