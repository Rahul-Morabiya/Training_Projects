import {useState} from 'react';

const TaskForm = ({addTask})=>{
    
    const [form,setForm]=useState({
        title:"",
        water:0,
    });

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        addTask(form);
        setForm({title:"",water:0});
    };

    return (
        <>
            <form onSubmit={handleSubmit} action="">
                <input name="title" value={form.title} onChange={handleChange} placeholder="Task name" />
                <input type="number" name="water" value={form.water} onChange={handleChange} placeholder="Water (ml)" />
                <button>Add Task</button>
            </form>
        </>
    );
};
export default TaskForm;