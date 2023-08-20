/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Poppins: 'Poppins, sans-serif',
        TripSans: ['trip, sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
}
