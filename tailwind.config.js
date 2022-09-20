/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        bitpasar : '#3465a4',
        beige : '#CECCC6',
        darkbeige : '#ACA368'
      },
      fontFamily : {
        mono : ["'Space Mono'", ...defaultTheme.fontFamily.mono],
        robotomono : "'Roboto Mono', monospace"
      }
    },
    container : {
      padding : {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      }
    }
  },
  plugins: [],
}
