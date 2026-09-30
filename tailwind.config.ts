import type { Config } from 'tailwindcss';

/**
 * CareNest design tokens.
 * Red is reserved for errors and emergencies. Grey (not red) means "unavailable".
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#E8F4F8',
          100: '#CFE7EF',
          600: '#0B6E8A',
          700: '#095A72',
          800: '#074A5E',
        },
        ink: '#0F1F2B',
        muted: '#4B5B68',
        line: '#DDE5EB',
        surface: '#F6F9FB',
        success: { DEFAULT: '#17784A', soft: '#E7F5EE' },
        warning: { DEFAULT: '#8A5300', soft: '#FFF4E0' },
        danger: { DEFAULT: '#B71C1C', soft: '#FDECEC' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: { md: '0.5rem', lg: '0.75rem' },
      boxShadow: {
        card: '0 1px 2px rgba(15,31,43,0.06), 0 1px 3px rgba(15,31,43,0.06)',
        overlay: '0 10px 30px rgba(15,31,43,0.14)',
      },
    },
  },
  plugins: [],
} satisfies Config;
