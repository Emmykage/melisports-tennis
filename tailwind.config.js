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
        'info-bottom': "2fr 1fr 1fr 2fr"

      },
      colors: {
        theme: 'rgb(20, 56, 80)',
        "theme-alt": "#16304b",
        "theme-light": "#93c4e4",

        "light": "#f1f1f1",
        "theme-dark": "#2e2e2e",
        primary:"#ff4500",
        "primary-alt": "#929098",
        "theme-darker": "rgb(20, 56, 80)"
      },
      // backgroundColor: {
      //   theme: '#16304b',
      //   "theme-light": "#f1f1f1",
      //   "theme-dark": "#2e2e2e",
      //   primary: '#ff4500',
      //   alt: "#929098"


      // },
    },
  },
  plugins: [],
};
