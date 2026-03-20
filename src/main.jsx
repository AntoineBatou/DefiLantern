// Point d'entrée de l'application React
// ReactDOM.createRoot est la méthode React 18 pour monter l'app
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from './config/wagmi.js'
import App from './App.jsx'
import './index.css'                        // Styles globaux Tailwind
import '@rainbow-me/rainbowkit/styles.css' // Styles du modal Connect Wallet

const queryClient = new QueryClient()

// ErrorBoundary temporaire pour afficher l'erreur au lieu d'une page blanche
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'monospace', color: 'red' }}>
          <h2>Erreur React détectée :</h2>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {this.state.error.toString()}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

// StrictMode : détecte les problèmes potentiels en développement
// (double rendu des composants pour repérer les effets de bord)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <App />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
