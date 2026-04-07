// App.jsx — Composant racine de l'application Firefly Protocol
//
// Architecture des données :
// App.jsx (state global : page + positions + données DeFiLlama)
//   ├── LangProvider (contexte FR/EN)
//   ├── RiskProfileProvider (contexte profil de risque)
//   ├── Header (navigation + profile selector)
//   ├── [page 'home']       : Hero → HowItWorks → Protocols → Strategy
//   ├── [page 'simulator']  : Simulator → Dashboard
//   ├── [page 'learn']      : Learn
//   ├── [page 'governance'] : Governance
//   └── Footer
// Dépôt/retrait → app.cryptoluciole.com (site séparé)

import { useState, useEffect, useMemo } from 'react'
import { LangProvider } from './context/LangContext'
import { RiskProfileProvider, useRiskProfile } from './context/RiskProfileContext'
import { useDefiLlama } from './hooks/useDefiLlama'
import { useProfileHistoricalApy } from './hooks/useProfileHistoricalApy'

// Import de tous les composants section
import Header from './components/Header'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Protocols from './components/Protocols'
import Strategy from './components/Strategy'
import Simulator from './components/Simulator'
import Dashboard from './components/Dashboard'
import Deposit from './components/Deposit'
import Footer from './components/Footer'
import Governance from './components/Governance'
import Whitepaper from './components/Whitepaper'
import Learn from './components/Learn'
import ParachuteOverlay from './components/ParachuteOverlay'
import LanternCursor from './components/LanternCursor'

const IS_APP = window.location.hostname === 'app.cryptoluciole.com'

// ── Composant interne qui utilise les deux contextes ──────────────────────────
function AppContent() {
  const { apyData, loading, averageApy, hasLiveData } = useDefiLlama()
  const { isDark, profileProtocols, profileConfig } = useRiskProfile()

  // ── Page active ───────────────────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(() =>
    window.location.hash === '#whitepaper' ? 'whitepaper' : 'home'
  )
  const [pendingScroll, setPendingScroll] = useState(null)

  // ── Positions simulées (partagées entre Simulator et Dashboard) ───────────
  const [positions, setPositions] = useState([])

  const handleAddPosition = (newPosition) => {
    setPositions((prev) => [...prev, newPosition])
  }

  const handleDeletePosition = (id) => {
    setPositions((prev) => prev.filter((p) => p.id !== id))
  }

  // ── APY moyen pondéré calculé sur les protocoles du profil actif ─────────
  // Tous les protocoles du profil, sans filtre ni renormalisation.
  // APY courant = live DeFiLlama si disponible, sinon fallbackApy statique.
  // Retourne null pendant le chargement initial (apyData vide) pour le skeleton.
  const profileAverageApy = useMemo(() => {
    if (!profileProtocols || profileProtocols.length === 0) return null
    if (Object.keys(apyData).length === 0) return null
    const weights = profileConfig.weights
    return profileProtocols.reduce((sum, p) => {
      const apy = apyData[p.id]?.apy ?? p.fallbackApy
      const weight = weights[p.id] ?? 0
      return sum + weight * apy
    }, 0)
  }, [profileProtocols, profileConfig, apyData])

  // ── APY historique pondéré (12 mois) ─────────────────────────────────────
  // Pour chaque protocole : moyenne DeFiLlama sur 12 mois glissants si dispo,
  // sinon APY live/fallback. Moyenne pondérée selon les poids du profil.
  const { historicalApy: profileHistoricalApy } = useProfileHistoricalApy({
    profileProtocols,
    profileWeights: profileConfig.weights,
    apyData,
  })

  // ── Navigation ────────────────────────────────────────────────────────────
  const navigateTo = (page) => {
    setCurrentPage(page)
    window.location.hash = page === 'whitepaper' ? 'whitepaper' : ''
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToSection = (sectionId) => {
    if (currentPage === 'home') {
      const el = document.getElementById(sectionId)
      el?.scrollIntoView({ behavior: 'smooth' })
    } else {
      setCurrentPage('home')
      setPendingScroll(sectionId)
    }
  }

  useEffect(() => {
    if (pendingScroll && currentPage === 'home') {
      const timer = setTimeout(() => {
        const el = document.getElementById(pendingScroll)
        el?.scrollIntoView({ behavior: 'smooth' })
        setPendingScroll(null)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [currentPage, pendingScroll])

  // Calcule la classe de thème selon le profil actif :
  // - 'light'     → pas de classe (thème clair par défaut)
  // - 'dark'      → classe .dark (mode Cyber/Neon pour Dynamic)
  // - 'christmas' → classe .theme-christmas (mode Rouge & Or pour Rewards Hunter)
  const themeClass = profileConfig.theme === 'light' ? ''
    : profileConfig.theme === 'dark' ? 'dark'
    : `theme-${profileConfig.theme}` // → 'theme-christmas'

  // ── app.cryptoluciole.com : page dépôt uniquement ────────────────────────
  if (IS_APP) {
    return (
      <div className="theme-transition min-h-screen">
        <Header currentPage="deposit" navigateTo={() => {}} navigateToSection={() => {}} />
        <main>
          <Deposit averageApy={profileAverageApy} />
        </main>
        <Footer navigateTo={() => {}} />
      </div>
    )
  }

  return (
    // Wrapper racine : la classe de thème active le mode visuel sur tout l'arbre
    // theme-transition = transitions douces sur background-color/color/border
    <div className={`${themeClass} theme-transition min-h-screen`}>
      {/* Overlay parachutes — visible uniquement en mode Rewards Hunter */}
      <ParachuteOverlay />
      {/* Curseur lanterne — visible uniquement en mode Dynamic */}
      <LanternCursor />
      <Header
        currentPage={currentPage}
        navigateTo={navigateTo}
        navigateToSection={navigateToSection}
      />

      <main>
        {/* ── Page Accueil ── */}
        {currentPage === 'home' && (
          <>
            <Hero
              averageApy={profileAverageApy}
              loading={loading}
              hasLiveData={hasLiveData}
              onSimulateClick={() => navigateTo('simulator')}
              historicalApy={profileHistoricalApy}
            />
            <HowItWorks />
            <Protocols apyData={apyData} loading={loading} />
            <Strategy
              apyData={apyData}
              averageApy={profileAverageApy}
              historicalApy={profileHistoricalApy}
            />
          </>
        )}

        {/* ── Page Simulateur ── */}
        {currentPage === 'simulator' && (
          <>
            <Simulator
              averageApy={profileAverageApy}
              onAddPosition={handleAddPosition}
            />
            <Dashboard
              positions={positions}
              onDeletePosition={handleDeletePosition}
            />
          </>
        )}

        {/* ── Page Gouvernance ── */}
        {currentPage === 'governance' && <Governance />}

        {/* ── Page Whitepaper ── */}
        {currentPage === 'whitepaper' && <Whitepaper navigateTo={navigateTo} />}

        {/* ── Page Pédagogie ── */}
        {currentPage === 'learn' && <Learn navigateTo={navigateTo} />}
      </main>

      {currentPage !== 'whitepaper' && <Footer navigateTo={navigateTo} />}
    </div>
  )
}

// ── Composant racine avec les Providers ───────────────────────────────────────
export default function App() {
  return (
    <LangProvider>
      <RiskProfileProvider>
        <AppContent />
      </RiskProfileProvider>
    </LangProvider>
  )
}
