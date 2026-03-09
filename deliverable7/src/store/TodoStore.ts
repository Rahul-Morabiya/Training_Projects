import {Todo} from "../models/Todo.js";
import {createId} from "../utils/id.js";
import {applyFilter,Filter} from "../filters/filters.js";

type Listener=(todos:Todo[])=>void;

export class TodoStore{
    private todos:Map<string,Todo>;
    private listeners:Set<Listener>;

    constructor(initial:Todo[]=[]){
        this.todos=new Map(initial.map(t=>[t.id,t]));
        this.listeners=new Set();
    }

    subscribe(listener:Listener){
        this.listeners.add(listener);
        return ()=>this.listeners.delete(listener);
    }

    private notify (){
        const snapshot=this.getAll();
        this.listeners.forEach(l=>l(snapshot));
    }

    getAll():Todo[]{
        return Array.from(this.todos.values());
    }

    add(title:string){
        const todo:Todo={
            id:createId(),
            title,
            completed:false,
            createdAt:Date.now()
        }

        const next=new Map(this.todos);
        next.set(todo.id,todo);
        this.todos=next;
        this.notify();
        return todo;
    }

    toggle(id:string){
        const current=this.todos.get(id);
        if(!current)return;
        
        const updated:Todo={
            ...current,
            completed:!current.completed
        }

        const next=new Map(this.todos);
        next.set(id,updated);

        this.todos=next;
        this.notify();
    }

    remove(id:string){
        if(!this.todos.has(id))return;
        const next=new Map(this.todos);
        next.delete(id);
        this.todos=next;
        this.notify();
    }

    clearCompleted(){
        const next=new Map(
            Array.from(this.todos.entries()).filter(([_,t])=>!t.completed)
        )
        this.todos=next;
        this.notify();
    }

    filtered(filter:Filter){
        return applyFilter(this.getAll(),filter)
    }
}