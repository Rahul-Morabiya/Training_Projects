export const getLast7DaysData = (tasks) => {
  const days = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);

    const dateStr = d.toLocaleDateString();

    const total = tasks
      .filter(
        (t) =>
          t.completed &&
          t.completedAt &&
          new Date(t.completedAt).toLocaleDateString() === dateStr
      )
      .reduce((acc, t) => acc + Number(t.water || 0), 0);

    days.push({
      date: dateStr,
      water: total,
    });
  }

  return days;
};