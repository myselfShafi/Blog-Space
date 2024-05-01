/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        "madefor-text": ["Wix Madefor Text", "sans-serif"],
        "comic-neue": ["Comic Neue", "sans-serif"],
      },
      rotate: {
        270: "270deg",
      },
    },
  },
  plugins: [],
};
