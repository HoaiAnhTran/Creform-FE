/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        info: '#0492de',
        success: '#1ea431',
        error: '#db221a',
        warning: '#d67813',
        'light-info': '#daebfa',
        'light-success': '#e1fada',
        'light-error': '#f8e0d1',
        'light-warning': '#fef2cb',
        malachite: {
          50: '#f2fcf1',
          100: '#e2f8e0',
          200: '#c5f0c2',
          300: '#96e392',
          400: '#48c642',
          500: '#39b334',
          600: '#2b9326',
          700: '#247421',
          800: '#215c1f',
          900: '#1c4c1b',
          950: '#0a290a',
        },
      },
      height: {
        headerHeight: '90px',
        contentHeight: `calc( 100vh - 90px)`,
      },
    },
  },
  plugins: [],
};
