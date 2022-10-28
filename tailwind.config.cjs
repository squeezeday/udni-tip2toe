/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'udni-teal-100': '#EDFBFD',
        'udni-teal-200': '#91E7F2',
        'udni-teal-400': '#48D7EA',
        'udni-teal': '#18B6CC',
        'udni-purple': '#4F5C5F',
      },
      fontSize: {
        base: '14px',
        lg: '16px',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
