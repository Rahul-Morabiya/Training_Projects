import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem("tasks");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [goal, setGoal] = useState(2000);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => [
      ...prev,
      {
        ...task,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
      },
    ]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString() : null,
            }
          : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const value = {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    filter,
    setFilter,
    search,
    setSearch,
    goal,
    setGoal,
  };

  return (
    <AppContext.Provider value={value}>
      {children} {/* ✅ ONLY this should be rendered */}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
};