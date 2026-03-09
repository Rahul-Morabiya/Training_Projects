import {Todo} from "../models/Todo.js";

const KEY="todos";

export const saveTodos=(todos:Todo[])=>{
    if(typeof localStorage === "undefined") return; 
    localStorage.setItem(KEY,JSON.stringify(todos));
}

export const loadTodos=():Todo[]=>{
    if(typeof localStorage==="undefined")return [];
    const raw=localStorage.getItem(KEY);
    if(!raw)return [];
    return JSON.parse(raw);
}