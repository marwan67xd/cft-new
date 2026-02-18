import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0f2744',
          dark: '#0a1c2e',
          light: '#152d47',
        },
        ocean: {
          50: '#eef9fc',
          100: '#d5f0f7',
          200: '#b0e2ef',
          300: '#7acce3',
          400: '#3db0d2',
          500: '#2294b8',
          600: '#1f7699',
          700: '#1f5f7d',
          800: '#225067',
          900: '#204357',
          950: '#0f2a39',
        },
        aqua: {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
        },
        sea: {
          DEFAULT: '#0f2a39',
          light: '#1e4a5f',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'wave': 'wave 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0) scaleY(1)' },
          '50%': { transform: 'translateY(-10px) scaleY(1.02)' },
        },
      },
      boxShadow: {
        'nav': '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)',
        'card-hover': '0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.06)',
      },
    },
  },
  plugins: [],
} satisfies Config
