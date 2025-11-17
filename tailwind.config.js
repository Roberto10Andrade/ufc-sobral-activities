/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        background: 'var(--background-color)',
        text: 'var(--text-color)',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideIn: 'slideIn 0.5s ease-in-out',
        blob: 'blob 7s infinite',
        'gradient-slow': 'gradient 15s ease infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'slideUp': 'slideUp 1s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
        'border-flow': 'border-flow 4s linear infinite',
        'pulse-subtle': 'pulse-subtle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'entrance': 'entrance 1.2s cubic-bezier(0.17, 0.84, 0.44, 1)',
        'entrance-delay': 'entrance 1.2s cubic-bezier(0.17, 0.84, 0.44, 1) 0.3s',
        'float-subtle': 'float-subtle 5s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-out forwards 0.5s',
        'spin-slower': 'spin 15s linear infinite',
        'slide-up': 'slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'gradient-x': 'gradient-x 15s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'border-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        slideUp: {
          '0%': { 
            transform: 'translateY(30px) scale(0.9)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0) scale(1)',
            opacity: '1'
          },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.97', transform: 'scale(1.01)' },
        },
        entrance: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95) translateY(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
        'float-subtle': {
          '0%, 100%': {
            transform: 'translateY(0) scale(1)',
          },
          '50%': {
            transform: 'translateY(-5px) scale(1.01)',
          },
        },
        'slide-up': {
          '0%': { 
            transform: 'translateY(100px) scale(0.95)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0) scale(1)',
            opacity: '1'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      utilities: {
        '.animation-delay-2000': {
          'animation-delay': '2s',
        },
        '.animation-delay-4000': {
          'animation-delay': '4s',
        },
      },
      perspective: {
        '1000': '1000px',
      },
      backgroundImage: {
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.animation-delay-2000': {
          'animation-delay': '2s',
        },
        '.animation-delay-4000': {
          'animation-delay': '4s',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
