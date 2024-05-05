/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: ".75rem",
    },
    extend: {
      fontFamily: {
        "madefor-text": ["Wix Madefor Text", "sans-serif"],
        "comic-neue": ["Comic Neue", "sans-serif"],
      },
      rotate: {
        270: "270deg",
      },
      width: {
        120: "30rem",
      },
    },
  },
  plugins: [],
};
