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
        highlight: '#388659',
      }
    },
  },
  plugins: [],
}
