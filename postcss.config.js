// PostCSS est l'outil qui transforme le CSS
// Tailwind s'intègre comme un plugin PostCSS
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}, // Ajoute automatiquement les préfixes navigateur (-webkit-, etc.)
  },
}
