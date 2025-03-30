/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'usa-blue': {
          DEFAULT: '#3C3B6E',
          light: '#5C5B9E',
          dark: '#2C2B5E',
        },
        'usa-red': {
          DEFAULT: '#B22234',
          light: '#D24254',
          dark: '#921224',
        },
        'usa-white': '#FFFFFF',
        
        // Variantes y tonos adicionales
        'usa-blue-light': '#4E4D8C',
        'usa-blue-dark': '#2A2950',
        'usa-red-light': '#D84254',
        'usa-red-dark': '#8C1A28',
        
        // Colores para Whatsapp
        'whatsapp-green': '#25D366',
        'whatsapp-dark': '#1A9247',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/images/usa-flag-bg.jpg')",
        'liberty-statue': "url('/images/statue-of-liberty.jpg')",
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
        'button': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 