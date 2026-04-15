import { useAppContext } from "../context/AppContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import FilterBar from "../components/FilterBar";
import WaterProgress from "../components/WaterProgress";

const Dashboard = () => {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    filter,
    setFilter,
    search,
    setSearch,
    goal,
  } = useAppContext();

  return (
    <div className="container">
      <WaterProgress tasks={tasks} goal={goal} />

      <TaskForm addTask={addTask} />

      <FilterBar setFilter={setFilter} setSearch={setSearch} />

      <TaskList
        tasks={tasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        filter={filter}
        search={search}
      />
    </div>
  );
};

export default Dashboard;