/** @type {import('tailwindcss').Config} */
module.exports = {
  // ... other config
  theme: {
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '8%, 12%': { transform: 'scale(1.2)' },
          '28%, 32%': { transform: 'scale(1.2)' },
          '16%, 24%': { transform: 'scale(1)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'heartbeat': 'heartbeat 2.5s ease-in-out infinite',
      },
    },
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
};
