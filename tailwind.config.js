/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['*.html'],
  prefix: 'tw-',
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        highlight: '#1e7e34',
      }
    },
  },
  plugins: [],
}
