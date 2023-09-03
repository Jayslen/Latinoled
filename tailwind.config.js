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
        'default-check': 'rgb(58,58,60)'

      }
    }
  },
  plugins: [require('tailwindcss-animated')]
}
