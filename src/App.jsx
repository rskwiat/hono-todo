import { useEffect } from 'react';
import { create } from 'zustand';
import './App.css'

import TaskItem from './components/taskItem';
import Button from './components/button';


const useTaskStore = create((set) => ({
  tasks: [],
  errors: {},
  fetchTasks: async () => {
    const res = await fetch("http://localhost:3000/api/tasks");
    const data = await res.json();
    console.log(data);
    // set((state) => ({ items: [...state.items, item] })
    set((state) => ({
      tasks: [...data.data]
    }))
  },
  deleteTask: async (id) => {
    await fetch(`http://localhost:3000/api/tasks/${id}`, { method: "delete" })
    const res = await fetch("http://localhost:3000/api/tasks");
    const data = await res.json();
    set({ tasks: data.data });
  },
  // updateTask: async ()
}));


function App() {
  const { fetchTasks, deleteTask, tasks } = useTaskStore((state) => state);

  useEffect(() => {
    fetchTasks();
  }, []);
  
  return (
    <div>
      Add new task
      -----


      {tasks.map((task) => {
    return <div>{task.name}</div>
      })}

    </div>
  );
}

export default App
