/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/components/**/*.{js,jsx,ts,tsx}', './src/pages/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'red-hat': "Red Hat Display, sans-serif", // Set Red Hat Display as the global sans-serif font
      },
    },
    colors : {
      white : 'var(--white)',
      black : 'var(--black)',
      gray : {
        900 : 'var(--gray-900)',
      }
    }
  },
  plugins: [],
}

