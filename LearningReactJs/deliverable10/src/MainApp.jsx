import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import { useAppContext } from "./context/AppContext";

const MainApp=()=>{
    const {tasks,addTask,toggleTask,deleteTask,filter,setFilter}=useAppContext();

    return (
        <div>
            <h1>HydroTask Manager</h1>
            <TaskForm addTask={addTask}/>
            <FilterBar setFilter={setFilter}></FilterBar>
            <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} filter={filter}></TaskList>
        </div>
    );
};