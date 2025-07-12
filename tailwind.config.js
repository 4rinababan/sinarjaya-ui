/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // gray-200
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // slate-800
        background: 'var(--color-background)', // gray-50
        foreground: 'var(--color-foreground)', // slate-800
        primary: {
          DEFAULT: 'var(--color-primary)', // slate-800
          foreground: 'var(--color-primary-foreground)' // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // slate-700
          foreground: 'var(--color-secondary-foreground)' // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-600
          foreground: 'var(--color-destructive-foreground)' // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // gray-50
          foreground: 'var(--color-muted-foreground)' // gray-500
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // orange-600
          foreground: 'var(--color-accent-foreground)' // white
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)' // slate-800
        },
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)' // slate-800
        },
        success: {
          DEFAULT: 'var(--color-success)', // green-600
          foreground: 'var(--color-success-foreground)' // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-500
          foreground: 'var(--color-warning-foreground)' // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-600
          foreground: 'var(--color-error-foreground)' // white
        }
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Roboto', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'elevation-1': '0 2px 8px rgba(44, 62, 80, 0.1)',
        'elevation-2': '0 4px 16px rgba(44, 62, 80, 0.15)',
        'elevation-3': '0 8px 24px rgba(44, 62, 80, 0.2)'
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms'
      },
      transitionTimingFunction: {
        'smooth': 'ease-out'
      },
      zIndex: {
        'navigation': '100',
        'mobile-menu': '200',
        'modal': '300'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate')
  ],
}