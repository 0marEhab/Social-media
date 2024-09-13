/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        bg:"#F7F7F7",
        primary:"#666AEC",
        secondary:"#1E1F20"
      }
    },
  },
  plugins: [],
};
