/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Tokens legacy (valores Mardini) para no romper clases existentes
        'usa-blue': {
          DEFAULT: '#0D1B3D',
          light: '#1A2F5C',
          dark: '#081229',
        },
        'usa-red': {
          DEFAULT: '#A6A6A6',
          light: '#C0C0C0',
          dark: '#8A8A8A',
        },
        'usa-white': '#FFFFFF',
        'usa-blue-light': '#1A2F5C',
        'usa-blue-dark': '#081229',
        'usa-red-light': '#C0C0C0',
        'usa-red-dark': '#8A8A8A',
        // Tokens de marca Mardini
        'brand-navy': {
          DEFAULT: '#0D1B3D',
          light: '#1A2F5C',
          dark: '#081229',
        },
        'brand-silver': {
          DEFAULT: '#A6A6A6',
          light: '#C0C0C0',
          dark: '#8A8A8A',
        },
        'whatsapp-green': '#25D366',
        'whatsapp-dark': '#1A9247',
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        serif: ['Cinzel', 'Georgia', 'serif'],
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
