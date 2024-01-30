import { useEffect } from 'react';
import { create } from 'zustand';
import './App.css'

import TaskItem from './components/taskItem';
import Button from './components/button';


const useTaskStore = create((set) => ({
  tasks: {},
  fetchTasks: async () => {
      const res = await fetch("http://localhost:3000/api/tasks");
      const data = await res.json();
      set({ tasks: data.data });
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

  if (tasks.length > 0) {
    return tasks.map((item) => {
      return (
        <div key={item.id}>
            {item.name}
            
          <Button
            onClick={() => deleteTask(item.id)}
          label="delete" />    
        </div>
      );
    });
  }

  return (
    <div>
      <h1>Add new tasks</h1>
    </div>
  );
}

export default App
