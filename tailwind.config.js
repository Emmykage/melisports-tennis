/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'grid-admin': '14rem 4fr 1fr',
        'sm-admin': '4rem 3fr 1fr',
        'md-admin': '2fr 1fr',

      },
      colors: {
        theme: 'rgb(20, 56, 80)',
      },
    },
  },
  plugins: [],
};
