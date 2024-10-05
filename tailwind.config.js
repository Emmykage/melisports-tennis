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
        "theme-light": "#f1f1f1",
        "theme-dark": "#2e2e2e",
        primary:"#ff4500",
        alt: "#929098",
        "theme-darker": "rgb(20, 56, 80)"
      },
      backgroundColor: {
        theme: 'rgb(20, 56, 80)',
        "theme-light": "#f1f1f1",
        "theme-dark": "#2e2e2e",
        primary: '#ff4500',
        alt: "#929098"


      },
    },
  },
  plugins: [],
};
