import TaskItem from "./TaskItem";
import React from 'react'
import { useTask } from "../hooks/useTask";
import { useMemo } from "react";

const TaskList = ({tasks,toggleTask,filter,deleteTask}) => {

  const filteredTasks=useMemo(()=>{
    switch(filter){
      case "completed":
        return tasks.filter((t)=>t.completed);
      case "pending":
        return tasks.filter((t)=>!t.completed);
      default:
        return tasks;
    }
  },[tasks,filter]);

  return (
    <div>
      {
        tasks.map((task,idx)=>(
            <TaskItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask}/>
        ))
      }
    </div>
  )
}

export default TaskList
