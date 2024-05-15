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
        loader: "30px 0 0 #ff3d00",
      },
      animation: {
        rotate: "rotate 1s infinite",
        "ball-red": "ballRed 1s infinite",
        "ball-light": "ballLight 1s infinite",
        "ball-dark": "ballDark 1s infinite",
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg) scale(0.8)" },
          "50%": { transform: "rotate(360deg) scale(1.2)" },
          "100%": { transform: "rotate(720deg) scale(0.8)" },
        },
        ballRed: {
          "0%": { boxShadow: "30px 0 0 #ff3d00" },
          "50%": {
            boxShadow: "0 0 0 #ff3d00",
            marginBottom: 0,
            transform: "translate(15px, 15px)",
          },
          "100%": {
            boxShadow: "30px 0 0 #ff3d00",
            marginBottom: "10px",
          },
        },
        ballLight: {
          "0%": {
            boxShadow: "30px 0 0 #fff",
          },
          "50%": {
            boxShadow: "0 0 0 #fff",
            marginTop: "-20px",
            transform: "translate(15px, 15px)",
          },
          "100%": {
            boxShadow: "30px 0 0 #fff",
            marginTop: 0,
          },
        },
        ballDark: {
          "0%": {
            boxShadow: "30px 0 0 #222",
          },
          "50%": {
            boxShadow: "0 0 0 #222",
            marginTop: "-20px",
            transform: "translate(15px, 15px)",
          },
          "100%": {
            boxShadow: "30px 0 0 #222",
            marginTop: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
