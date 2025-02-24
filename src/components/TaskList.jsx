import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";

const TaskList = ({ editTask }) => {
    const [tasks, setTasks] = useState([]);
    const [taskCompleted, setTaskCompleted] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
            setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, []);

    const toggleCompleteTask = async (taskId, currentStatus) => {
        try {
            await updateDoc(doc(db, "tasks", taskId), { completed: !currentStatus });

            if (!currentStatus) { 
                setTaskCompleted(true);
                setTimeout(() => setTaskCompleted(false), 3000); // Hide confetti after 3 sec
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };
    
    const handleDeleteTask = async (taskId) => {
        try {
            await deleteDoc(doc(db, "tasks", taskId));
            setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId)); // Update UI
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="relative">
            {/* 🎉 Confetti with Smooth Fade-Out */}
            <AnimatePresence>
                {taskCompleted && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 1 } }} // Smooth fade-out
                        className="fixed top-0 left-0 w-full h-full pointer-events-none"
                    >
                        <Confetti />
                    </motion.div>
                )}
            </AnimatePresence>

            <ul className="mt-4 space-y-2">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="flex justify-between items-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md"
                    >
                        <span className="text-gray-900 dark:text-gray-100">{task.text}</span>

                        <div className="flex gap-2">

                            {/* <button
                                onClick={() => toggleCompleteTask(task.id, task.completed)}
                                className={`p-2 rounded-md transition-all
                                    ${task.completed ? "text-green-800 dark:text-green-400" : "text-gray-600 dark:text-gray-300"}
                                    hover:bg-gray-200 dark:hover:bg-gray-700`}
                            >
                                ✅
                            </button> */}

                            <button
                                onClick={() => editTask(task)}
                                className="p-2 rounded-md text-blue-600 dark:text-blue-400 
                         hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                            >
                                ✏️
                            </button>
                            <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="p-2 rounded-md text-red-600 dark:text-red-400 
                         hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                            >
                                🗑️
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
