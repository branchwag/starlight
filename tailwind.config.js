/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        star: ["Codystar", "sans-serif"],
        apple: ["Homemade Apple", "cursive"],
      },
      colors: {
         night: "#111"
      }
    },
  },
  plugins: [],
};
