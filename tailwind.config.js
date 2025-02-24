/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all JSX files inside src
  ],
  theme: {
    extend: {
      transitionProperty: {
        'bg': 'background-color'
      }
    },
  },
  plugins: [],
}

