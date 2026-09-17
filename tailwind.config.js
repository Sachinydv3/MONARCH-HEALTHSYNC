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
          DEFAULT: '#0B2A6F', // Deep Navy / Healthcare Blue
          light: '#EBF5FF',   // Soft blue for backgrounds
          dark: '#081D4D',    // Darker blue for depth
        },
        secondary: {
          DEFAULT: '#0097A7', // Teal
          light: '#E0F7F4',   // Soft teal
          dark: '#007A85',    // Darker teal
        },
        accent: {
          DEFAULT: '#1976F3', // Bright Blue
          purple: '#8A2BE2',
          orange: '#FF8C00',
          green: '#4CAF50',
        },
        surface: {
          DEFAULT: '#F7FBFF', // Very light blue/white
          card: '#FFFFFF',
        },
        border: {
          DEFAULT: '#DCEAF6',
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 6px 24px rgba(20,60,120,0.08)',
        'premium': '0 10px 20px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
