const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./src/**/*.{tsx,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.teal,
      },
    },
  },
  variants: {
    margin: ['responsive', 'hover', 'first'],
    extend: {},
  },
  plugins: [],
}
