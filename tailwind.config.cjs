/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      mobile: { min: '320px', max: '767px' },
      tablet: { min: '768px' },
      laptop: { min: '1024px' },
      sm: '640px',
      md: '768px'
    },
    extend: {
      fontFamily: {
        sans: [
          'Roboto',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Helvetica Neue"',
          '"Noto Sans"',
          'sans-serif'
        ]
      }
    },
    container: {
      padding: '2rem',
      center: true
    }
  },
  plugins: []
}
