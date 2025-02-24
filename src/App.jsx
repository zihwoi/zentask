import "./App.css";
import { useState } from "react"; // Import useState hook
import NavBar from "./components/NavBar"; // Import NavBar component
import TaskForm from "./components/TaskForm"; // Import TaskForm component
import TaskList from "./components/TaskList"; // Import TaskList component

function App() {
  const [editingTask, setEditingTask] = useState(null); // State to store the task being edited
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center">
      <NavBar className="w-full" />
      <div className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mt-6">
        <TaskForm addTask={() => { }} editTask={setEditingTask} editingTask={editingTask} />
        <TaskList editTask={setEditingTask} />
      </div>
    </div>
  ); // Render the Home page
}

export default App;
