import {Todo} from "../models/Todo.js";

export type Filter = "all" | "active" | "completed";

export const applyFilter = (todos:Todo[],filter:Filter):Todo[] =>{
    if(filter==="active")return todos.filter(p=>!p.completed);
    if(filter==="completed")return todos.filter(p=>p.completed);
    return todos;
}