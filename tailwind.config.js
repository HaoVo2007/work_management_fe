/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "Helvetica", "Arial"],
      },
      colors: {
        primary: "#4f46e5",   // Indigo-600
        secondary: "#64748b", // Slate-500
      },
    },
  },
  plugins: [],
}
