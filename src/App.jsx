// App.jsx — Composant racine de l'application Firefly Protocol
//
// Architecture des données :
// App.jsx (state global : page + positions + données DeFiLlama)
//   ├── LangProvider (contexte FR/EN)
//   ├── RiskProfileProvider (contexte profil de risque)
//   ├── Header (navigation + profile selector)
//   ├── [page 'home']       : Hero → HowItWorks → Protocols → Strategy
//   ├── [page 'simulator']  : Simulator → Dashboard
//   ├── [page 'deposit']    : Deposit
//   ├── [page 'learn']      : Learn
//   └── Footer

import { useState, useEffect, useMemo } from 'react'
import { LangProvider } from './context/LangContext'
import { RiskProfileProvider, useRiskProfile } from './context/RiskProfileContext'
import { useDefiLlama } from './hooks/useDefiLlama'

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

// ── Composant interne qui utilise les deux contextes ──────────────────────────
function AppContent() {
  const { apyData, loading, averageApy, hasLiveData } = useDefiLlama()
  const { isDark, profileProtocols } = useRiskProfile()

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

  // ── APY moyen calculé sur les protocoles du profil actif ─────────────────
  const profileAverageApy = useMemo(() => {
    if (!profileProtocols || profileProtocols.length === 0) return averageApy
    const values = profileProtocols.map((p) => apyData[p.id]?.apy ?? p.fallbackApy)
    return values.reduce((sum, v) => sum + v, 0) / values.length
  }, [profileProtocols, apyData, averageApy])

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

  return (
    // Wrapper racine : la classe .dark active le mode Cyber/Neon sur tout l'arbre
    // theme-transition = transitions douces sur background-color/color/border
    <div className={`${isDark ? 'dark' : ''} theme-transition min-h-screen`}>
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
            />
            <HowItWorks />
            <Protocols apyData={apyData} loading={loading} />
            <Strategy apyData={apyData} averageApy={profileAverageApy} />
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

        {/* ── Page Dépôt ── */}
        {currentPage === 'deposit' && <Deposit averageApy={profileAverageApy} />}

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
