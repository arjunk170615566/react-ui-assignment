import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(0 0% 85%)',
        text: 'hsl(220 12% 20%)',
        muted: 'hsl(220 14% 96%)',
        brand: {
          DEFAULT: 'hsl(222 84% 56%)',
          hover: 'hsl(222 84% 48%)'
        }
      },
      boxShadow: {
        soft: '0 4px 18px rgba(0,0,0,0.06)'
      },
      borderRadius: {
        '2xl': '1rem'
      }
    }
  },
  plugins: []
} satisfies Config
