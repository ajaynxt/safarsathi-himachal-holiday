/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F96300',
          'orange-dark': '#E05500',
          'orange-light': '#FFF4EB',
          navy: '#081E3B',
          'navy-dark': '#041021',
          'navy-light': '#102F5A',
          sky: '#EBF4FE'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
      }
    },
  },
  plugins: [],
}
