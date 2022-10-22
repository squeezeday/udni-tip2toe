/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
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
  plugins: [],
};
