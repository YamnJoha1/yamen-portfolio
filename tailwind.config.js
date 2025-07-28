/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#000000', 
        'secondary': '#FFFFFF',
        'accent': '#B8860B',    
        'bg-gradient-light': '#F0F0F0', 
        'bg-gradient-dark': '#111111', 
      },
      fontFamily: {
        'brand': ['ui-serif', 'Georgia'], 
        'body': ['IBM Plex Sans', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}