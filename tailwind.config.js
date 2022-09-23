/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens : {
      'xs' : '300px',
      'divbreak' : '845px',
      ...defaultTheme.screens
    },
    extend: {
      colors : {
        bitpasar : '#3465a4',
        beige : '#CECCC6',
        darkbeige : '#ACA368',
        lightbeige : '#ECE9DC',
        lightblue : '#E4F2FF',
        button : '#D5D4CD',
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
