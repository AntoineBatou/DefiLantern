// RiskProfileContext.jsx — Contexte global pour le profil de risque
//
// State : profile ('prudent' | 'balanced' | 'dynamic')
// Dérivé : isDark (true si profile === 'dynamic'), profileConfig,
//          profileProtocols (liste filtrée), profileWeights (poids d'allocation)
// Persistance : localStorage pour retrouver le profil au retour

import { createContext, useContext, useState, useMemo } from 'react'
import { PROFILES } from '../data/profiles'
import { RETAINED_PROTOCOLS } from '../data/protocols'

const RiskProfileContext = createContext(null)

export function RiskProfileProvider({ children }) {
  // Lecture du profil depuis localStorage, défaut = 'balanced'
  const [profile, setProfileState] = useState(() => {
    const stored = localStorage.getItem('riskProfile')
    return stored && PROFILES[stored] ? stored : 'balanced'
  })

  const setProfile = (id) => {
    if (!PROFILES[id]) return
    setProfileState(id)
    localStorage.setItem('riskProfile', id)
  }

  const profileConfig = PROFILES[profile]

  // Mode sombre uniquement pour le profil Dynamique
  const isDark = profile === 'dynamic'

  // Protocoles du profil actif — filtrés par liste explicite d'IDs
  const profileProtocols = useMemo(() => {
    const ids = new Set(profileConfig.protocolIds)
    return RETAINED_PROTOCOLS.filter((p) => ids.has(p.id))
  }, [profile]) // eslint-disable-line react-hooks/exhaustive-deps

  // Poids d'allocation du profil actif (ex : { 'aave-v3': 0.15, ... })
  const profileWeights = profileConfig.weights

  return (
    <RiskProfileContext.Provider value={{ profile, setProfile, profileConfig, isDark, profileProtocols, profileWeights }}>
      {children}
    </RiskProfileContext.Provider>
  )
}

export function useRiskProfile() {
  const ctx = useContext(RiskProfileContext)
  if (!ctx) throw new Error('useRiskProfile doit être utilisé dans RiskProfileProvider')
  return ctx
}
