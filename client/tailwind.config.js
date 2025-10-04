/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ed',
          100: '#dde6d8',
          200: '#bccdb3',
          300: '#9bb48e',
          400: '#7a9b69',
          500: '#5C7F4F', // Main olive green
          600: '#4a6540',
          700: '#384b31',
          800: '#263122',
          900: '#141713',
        },
        gray: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#d0d0d0',
          400: '#a0a0a0',
          500: '#808080',
          600: '#606060',
          700: '#4A4A4A', // Tag background
          800: '#2D2D2D', // Card background
          900: '#1A1A1A', // Main background
        },
        dark: {
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4A4A4A', // Tag background
          800: '#2D2D2D', // Card background
          900: '#1A1A1A', // Main background
        },
        // Design-specific colors
        'design-text-primary': '#FFFFFF',
        'design-text-secondary': '#B0B0B0',
        'design-card-bg': '#2D2D2D',
        'design-main-bg': '#1A1A1A',
        'design-tag-bg': '#4A4A4A',
        'design-required-bg': '#E53935',
        'design-optional-bg': '#757575',
        'design-signup-bg': '#66BB6A',
        'design-registered-bg': '#4A4A4A',
        'design-icon-green': '#8BC34A',
        'design-border-gray': '#4A4A4A'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 10px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
