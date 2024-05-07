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
      backgroundImage: {
        "gradient-light":
          "linear-gradient(180deg, hsla(216, 41%, 79%, 1)  0%, hsla(186, 33%, 94%, 1) 65%, rgb(255,255,255) 100%)  ",
        "gradient-dark":
          "linear-gradient(180deg, hsla(351, 100%, 25%, 1) 0%, hsla(9, 59%, 7%, 1) 75%, rgb(17,24,39) 100% )",
      },
      boxShadow: {
        "inner-3xl": "inset 0 40px 80px 0 rgba(17,24,39,1)",
      },
    },
  },
  plugins: [],
};
