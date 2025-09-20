/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        accent: '#000000',
        secondary: '#f5f5f5',
        text: '#000000',
        success: '#10b981',
        warning: '#f59e0b',
        electric: {
          blue: '#000000',
          'light-blue': '#f5f5f5',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          600: '#4b5563',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'circuit-flow': 'circuit-flow 4s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(37, 99, 235, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.8)' },
        },
        'circuit-flow': {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        }
      },
      backdropBlur: {
        'glass': '10px',
      }
    },
  },
  plugins: [],
}

export default config
