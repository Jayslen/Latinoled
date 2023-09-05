/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Poppins: 'Poppins, sans-serif',
        TripSans: ['trip, sans-serif']
      },
      backgroundColor: {
        'green-check': 'rgb(83,141,78)',
        'yellow-check': 'rgb(181,159,59)',
        'default-check': 'rgb(58,58,60)',
        'dark-mode': '#131316'
      },
      colors: {
        'light-mode-text': '#111111',
        'dark-mode-text': '#F2F3F4'
      }
    }
  },
  plugins: [require('tailwindcss-animated')]
}
