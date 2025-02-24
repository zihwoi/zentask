import { useState } from "react";
import NavBar from "../components/NavBar";
import TaskForm from "../components/TaskForm";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white items-center justify-center">
      <NavBar />
      <div className="p-4 w-full max-w-2xl">
        <TaskForm addTask={addTask} />
        <ul className="mt-4">
          {tasks.map((task, index) => (
            <li key={index} className="p-2 bg-white dark:bg-gray-700 rounded mt-2">
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
