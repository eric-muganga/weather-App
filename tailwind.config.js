/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  options: {
    safelist: [
      /^Mui/,  // Whitelist Material-UI classes
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [],
}