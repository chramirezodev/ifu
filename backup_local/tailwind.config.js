/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'usa-red': 'var(--usa-red)',
        'usa-blue': 'var(--usa-blue)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 