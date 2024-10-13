/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
        scaleIn: "scaleIn 0.3s ease-out",
      },
      colors: {
        bg: "#F7F7F7",
        primary: "#666AEC",
        secondary: "#1E1F20",
        darkBg: "#151515",
        darkPrimary: "#7F7FFF",
        darkSecondary: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
