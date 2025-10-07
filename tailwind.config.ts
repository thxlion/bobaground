import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: '#0b0b0c',
        panel: '#151517',
      },
      borderColor: {
        subtle: 'rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;


