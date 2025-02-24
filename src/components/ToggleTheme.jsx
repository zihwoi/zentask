import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ToggleTheme = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <motion.button

            transition={{ duration: 0.3 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 px-4 rounded-lg transition-colors duration-300
                 bg-gray-200 text-gray-900 hover:bg-gray-300
                 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
        </motion.button>
    );
};

export default ToggleTheme;
