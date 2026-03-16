// Point d'entrée de l'application React
// ReactDOM.createRoot est la méthode React 18 pour monter l'app
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Styles globaux Tailwind

// StrictMode : détecte les problèmes potentiels en développement
// (double rendu des composants pour repérer les effets de bord)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
