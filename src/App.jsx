import fs from "fs";
import './App.css'

import tasks from "./task";
import TaskItem from './components/taskItem';

const updateTasks = (value) => {
  fs.readWriteFile("./task", value);
}; 

function App() {

  const onCheck = (e, task) => {
    // e.target.value
    //modified data -> write to the tasks file
    // fs.writeFile()
    // ta

    const updatedTask = {
      ...task,
      completed: e.target.value === "on" ? true : false,
    };

    updateTasks(updatedTask);
  };

  return (
    <>
      <div>
        {tasks.map((task) => (
          <TaskItem 
            key={task.id}
            id={task.id}
            name={task.name}
            completed={task.completed}
            onCheck={(e) => onCheck(e, task)}
          />
        ))}
        </div>
    </>
  )
}

export default App
