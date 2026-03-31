/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          green: "#2D5A27",
          brown: "#5C4033",
          light: "#F5F5F5",
        }
      }
    },
  },
  plugins: [],
}
