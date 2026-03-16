/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind scanne ces fichiers pour ne garder que les classes CSS utilisées
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  // 'class' = dark mode activé en ajoutant la classe .dark sur un ancêtre
  darkMode: 'class',
  theme: {
    extend: {
      // Couleurs personnalisées extraites du logo Firefly
      colors: {
        teal: {
          DEFAULT: '#2ABFAB',
          dark: '#22A898',
          light: '#E8F8F6',
        },
        amber: {
          firefly: '#F5A623',
          light: '#FEF3DC',
        },
        navy: '#1A2332',
        bg: '#F7FAFA',
        lgrey: '#EEF2F2',
        // Palette Cyber/Neon pour le mode Dynamique
        cyber: {
          950: '#0A0A0F',
          900: '#111118',
          800: '#1A1A2E',
          700: '#16213E',
          600: '#0F3460',
          violet: '#7C3AED',
          'violet-light': '#9333EA',
          cyan: '#06B6D4',
        },
      },
      // Police Inter importée depuis Google Fonts
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Animations
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cyber-glow': 'cyberGlow 2s ease-in-out infinite',
        'neon-pulse': 'neonPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(5deg)' },
          '66%': { transform: 'translateY(-10px) rotate(-3deg)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4', boxShadow: '0 0 20px #F5A623' },
          '50%': { opacity: '0.8', boxShadow: '0 0 60px #F5A623, 0 0 100px #F5A623' },
        },
        cyberGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(124,58,237,0.3), 0 0 20px rgba(6,182,212,0.1)' },
          '50%': { boxShadow: '0 0 25px rgba(124,58,237,0.6), 0 0 50px rgba(6,182,212,0.3)' },
        },
        neonPulse: {
          '0%, 100%': { textShadow: '0 0 7px rgba(124,58,237,0.5)' },
          '50%': { textShadow: '0 0 15px rgba(124,58,237,0.8), 0 0 30px rgba(6,182,212,0.4)' },
        },
      },
    },
  },
  plugins: [],
}
