/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom1: '#CB429C', // pink
        custom2: '#AE07F5', // magenta
        custom3: '#6D37FF', // purple
      },
    },
  },
  plugins: [],
}

