/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        K2D: ['K2D', 'sans-serif'], 
        Inter : ["Inter", 'serif'],
        Rubik : ["Rubik", "serif"],
        Montserrat : ["Montserrat", 'sans-serif']
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        slideIn: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.5s ease-out forwards',
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        marquee: 'marquee 10s linear infinite',
      },
      transitionDuration: {
        '1500': '1500ms',
        '2000': '2000ms',
      },
      colors: {
        destructive: '#f87171',
        'destructive-foreground': '#ffffff',
      },
    },
  },
  sidebar: {
    DEFAULT: 'hsl(var(--sidebar-background))',
    foreground: 'hsl(var(--sidebar-foreground))',
    primary: 'hsl(var(--sidebar-primary))',
    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    accent: 'hsl(var(--sidebar-accent))',
    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    border: 'hsl(var(--sidebar-border))',
    ring: 'hsl(var(--sidebar-ring))',
  },
  plugins: [],
}