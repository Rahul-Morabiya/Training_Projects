import {TodoStore} from "./store/TodoStore.js";
import {Filter} from "./filters/filters.js";

const store = new TodoStore();

let currentFilter:Filter="all";

const form=document.getElementById("todo-form") as HTMLFormElement;
const input=document.getElementById("todo-input") as HTMLInputElement;
const list = document.getElementById("todo-list") as HTMLUListElement;
const clearBtn=document.getElementById("clear-btn") as HTMLButtonElement;

const render=()=>{
    const todos=store.filtered(currentFilter);

    list.innerHTML="";
    todos.forEach(todo=>{
        const li=document.createElement("li");
        if(todo.completed)li.classList.add("completed");
        const label=document.createElement("span");
        label.textContent=todo.title;
        label.onclick=()=>{
            store.toggle(todo.id);
        }
        const del=document.createElement("button");
        del.textContent="Delete";
        del.className="delete";
        del.onclick=()=>store.remove(todo.id);
        li.appendChild(label);
        li.appendChild(del);
        list.appendChild(li);
    })
}

store.subscribe(render);

form.addEventListener("submit",e=>{
    e.preventDefault();
    const value=input.value.trim();
    if(!value)return;
    store.add(value);
    input.value="";
})

clearBtn.onclick=()=>{
    store.clearCompleted();
}

document.querySelectorAll("[data-filter]").forEach(btn=>{
    btn.addEventListener("click",()=>{
        currentFilter=btn.getAttribute("data-filter") as Filter;
        document.querySelectorAll("[data-filter]").forEach(b=>{
            b.setAttribute("aria-pressed","false");
        })
        render();
    })
})

render();