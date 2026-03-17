import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration Vite pour React
// defineConfig fournit l'autocomplétion et la validation des options
export default defineConfig({
  plugins: [react()],
  // base = chemin public où sera déployée l'app
  // '/v2/' → les assets seront référencés en /v2/assets/... dans le HTML buildé
  base: '/',
  // Configuration du serveur de développement
  server: {
    port: 3000,
    // Proxy pour éviter les problèmes CORS avec DeFiLlama
    // En développement, les requêtes vers /api/llama sont redirigées vers l'API réelle
    proxy: {
      '/api/llama': {
        target: 'https://yields.llama.fi',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/llama/, ''),
        secure: false,
      },
    },
  },
})
