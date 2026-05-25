/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        cream: '#FFFAF0',
        sunshine: '#FFD93D',
        orange: '#FF8C42',
        mint: '#6BCB77',
        peach: '#FFB3A7',
        warm: {
          50: '#FFF9F0',
          100: '#FFF3E0',
          200: '#FFE0B2',
          300: '#FFCC80',
          400: '#FFB74D',
          500: '#FFA726',
        },
        dusk: {
          50: '#f5f0ff',
          100: '#e8deff',
          200: '#d4c0ff',
          300: '#b794f6',
          400: '#9f7aea',
          500: '#805ad5',
          600: '#6b46c1',
          700: '#553c9a',
          800: '#44337a',
          900: '#322659',
          950: '#1e1a3a',
        },
      },
      animation: {
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'pop': 'pop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'float-slow': 'floatSlow 20s ease-in-out infinite',
        'float-medium': 'floatMedium 15s ease-in-out infinite',
        'float-fast': 'floatFast 12s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
        'gradient-shift': 'gradientShift 15s ease infinite',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(30px, -20px)' },
          '50%': { transform: 'translate(-15px, 25px)' },
          '75%': { transform: 'translate(20px, 15px)' },
        },
        floatMedium: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(-25px, 15px)' },
          '66%': { transform: 'translate(20px, -30px)' },
        },
        floatFast: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(15px, -15px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
