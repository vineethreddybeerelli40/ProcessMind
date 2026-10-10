/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f2f4fe',
          100: '#e6e9fd',
          200: '#c3caf9',
          300: '#9fabf5',
          400: '#7a86ef',
          500: '#5b63e6',
          600: '#4645cf',
          700: '#3835a8',
          800: '#2b2a80',
          900: '#1e1d5c',
        },
        violet: {
          50: '#f6f2fd',
          100: '#ede4fb',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        ink: {
          900: '#141330',
          700: '#33324f',
          500: '#6b6a85',
          300: '#a6a5bd',
          100: '#e7e6f3',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,19,48,0.04), 0 8px 24px -8px rgba(37,36,110,0.10)',
        popover: '0 12px 32px -8px rgba(37,36,110,0.25)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
