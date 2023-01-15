/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.js', './pages/**/*.js', './styles/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
