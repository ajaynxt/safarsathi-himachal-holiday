/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // AJAYNXT Premium Maroon Palette
        maroon: {
          50: '#FAF3F5',
          100: '#F5E5E9',
          200: '#ECD0D8',
          300: '#D9B7C0', // Rose Silver
          400: '#B6667D',
          500: '#8A304A', // Wine Accent
          600: '#64152C', // Primary Maroon
          700: '#4E1022',
          800: '#3B0A19', // Deep Burgundy
          900: '#250610', // Dark Text / Deep Wine
          950: '#140208',
        },
        // Alias brand to maroon for seamless backwards compatibility
        brand: {
          50: '#FAF3F5',
          100: '#F5E5E9',
          200: '#ECD0D8',
          300: '#D9B7C0',
          400: '#B6667D',
          500: '#8A304A',
          600: '#64152C',
          700: '#4E1022',
          800: '#3B0A19',
          900: '#250610',
          950: '#140208',
        },
        // Official brand colors as explicit tokens
        burgundy: '#3B0A19',
        wine: '#8A304A',
        roseSilver: '#D9B7C0',
        darkText: '#25171C',
        appBg: '#F7F1F2',
        appDarkBg: '#130308',
        instagram: {
          purple: '#833ab4',
          pink: '#fd1d1d',
          orange: '#fcb045',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          'Inter',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ],
      },
      boxShadow: {
        'glass': '0 8px 30px 0 rgba(100, 21, 44, 0.04), inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)',
        'glass-hover': '0 14px 40px 0 rgba(100, 21, 44, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
        'glass-maroon': '0 10px 30px -5px rgba(100, 21, 44, 0.35)',
        'glass-dark': '0 10px 32px 0 rgba(0, 0, 0, 0.45), inset 0 1px 1px 0 rgba(217, 183, 192, 0.12)',
        'glass-dark-hover': '0 16px 44px 0 rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(217, 183, 192, 0.2)',
      },
      backdropBlur: {
        'apple': '16px',
        'subtle': '8px',
      }
    },
  },
  plugins: [],
}
