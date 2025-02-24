import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

const TaskForm = ({ addTask, editTask, editingTask }) => {
    const [task, setTask] = useState("");

    useEffect(() => {
        if (editingTask) {
            setTask(editingTask.text);
        }
    }, [editingTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (task.trim() === "") return;

        try {
            if (editingTask) {

                await updateDoc(doc(db, "tasks", editingTask.id), { text: task });
                editTask(null); // Exit edit mode
            } else {

                const docRef = await addDoc(collection(db, "tasks"), {
                    text: task,
                    createdAt: new Date(),
                });

                addTask({ id: docRef.id, text: task });
            }

            setTask("");
        } catch (error) {
            console.error("Error adding/updating task:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-3">
            <input
                type="text"
                placeholder="New Task..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full p-3 border rounded-lg text-gray-900 
                   bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500
                   dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 
                   dark:focus:ring-blue-400"
            />
            <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-lg 
                   hover:bg-blue-700 transition-all dark:bg-blue-500 
                   dark:hover:bg-blue-400"
            >
                Add
            </button>
        </form>
    );
};

export default TaskForm;
