import { useState } from 'react'
import './App.css'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useTask } from './hooks/useTask';

function App(){

  const {tasks,addTask,toggleTask,deleteTask}=useTask();

  return (
    <>
        <div>
          <h1>HydroTask Manager</h1>
          <TaskForm addTask={addTask}/>
          <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask}/>
        </div>
    </>
  );
}

export default App
