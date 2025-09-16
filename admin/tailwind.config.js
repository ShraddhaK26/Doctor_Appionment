/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",              // for Vite
    "./src/**/*.{js,jsx,ts,tsx}" // all React components
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A020F0", // Added the missing #
      },
    },
  },
  plugins: [],
}
