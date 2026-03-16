// LangContext.jsx — Contexte React pour la gestion FR/EN
//
// Un "Context" React est un mécanisme pour partager des données
// entre des composants sans les passer manuellement de parent en enfant (prop drilling).
// Ici, on partage la langue active et la fonction pour la changer.

import { createContext, useContext, useState } from 'react'
import { translations } from '../i18n/translations'

// 1. Créer le contexte avec une valeur par défaut
// (utilisé si un composant est rendu en dehors du Provider)
const LangContext = createContext({
  lang: 'fr',
  setLang: () => {},
  t: () => '',
})

// 2. Provider : composant qui enveloppe l'app et fournit les valeurs
// Tous les composants enfants pourront lire ces valeurs via useContext(LangContext)
export function LangProvider({ children }) {
  // État de la langue active : 'fr' par défaut
  const [lang, setLang] = useState('fr')

  // Fonction de traduction t(key)
  // Utilisation : t('hero.title') retourne le texte dans la langue active
  const t = (key) => {
    // On navigue dans l'objet translations en découpant la clé par les points
    // Exemple : 'hero.title' → translations['fr']['hero']['title']
    const keys = key.split('.')
    let value = translations[lang]
    for (const k of keys) {
      value = value?.[k]
    }
    // Si la traduction n'existe pas, on retourne la clé (pour débogage)
    return value ?? key
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

// 3. Hook personnalisé pour utiliser le contexte facilement dans n'importe quel composant
// Usage : const { lang, setLang, t } = useLang()
export function useLang() {
  return useContext(LangContext)
}
