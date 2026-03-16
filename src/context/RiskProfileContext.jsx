// RiskProfileContext.jsx — Contexte global pour le profil de risque
//
// State : profile ('prudent' | 'balanced' | 'dynamic')
// Dérivé : isDark (true si profile === 'dynamic'), profileConfig, profileProtocols
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

  // Protocoles filtrés selon le niveau de risque max du profil
  // Utilise le champ `risk` (1|2|3) de chaque protocole
  const profileProtocols = useMemo(() => {
    return RETAINED_PROTOCOLS.filter((p) => p.risk <= profileConfig.maxRisk)
  }, [profile]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <RiskProfileContext.Provider value={{ profile, setProfile, profileConfig, isDark, profileProtocols }}>
      {children}
    </RiskProfileContext.Provider>
  )
}

export function useRiskProfile() {
  const ctx = useContext(RiskProfileContext)
  if (!ctx) throw new Error('useRiskProfile doit être utilisé dans RiskProfileProvider')
  return ctx
}
