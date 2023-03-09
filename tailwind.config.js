/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    ripple: theme => ({
        colors: theme('colors'),
        modifierTransition: 'background 0.2s',
        activeTransition: 'background 0.1s'
    }),
  },
  plugins: [
    require('tailwindcss-ripple')(),
  ],
}
