/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/components/**/*.{js,jsx,ts,tsx}', './src/pages/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'red-hat': ['"Red Hat Display"', 'sans-serif'], // Set Red Hat Display as the global sans-serif font
      },
      colors : {
        primary : '#6BB1FF',

      }
    },
  },
  plugins: [],
}

