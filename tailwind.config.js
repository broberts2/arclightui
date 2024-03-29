/** @type {import('tailwindcss').Config} */

module.exports = {
  prefix: "arclight-",
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
      },
      fontFamily: {
        primary: ["RussoOne-Regular"],
      },
      colors: {
        text: {
          primary: "rgb(255,255,255)",
          secondary: "rgb(141, 0, 222)",
        },
        background: {
          primary: "rgb(40,44,52)",
          secondary: "rgb(32,32,32)",
          tertiary: "rgb(255, 222, 145)",
          quarternary: "rgb(203,213,225)",
        },
        visibility: {
          primary: "rgba(0,0,0,0.75)",
        },
      },
    },
  },
  important: true,
};
