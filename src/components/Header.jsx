// Header.jsx — Barre de navigation sticky
//
// Nouveautés :
// - Sélecteur de profil de risque (Prudent / Équilibré / Dynamique)
// - Lien "Apprendre" dans la nav
// - Le sélecteur est un pill dropdown, adapté mobile dans le menu burger

import { useState, useEffect, useRef } from 'react'
import { useLang } from '../context/LangContext'
import { useRiskProfile } from '../context/RiskProfileContext'
import { PROFILES, PROFILE_PILL_COLORS } from '../data/profiles'

export default function Header({ currentPage, navigateTo, navigateToSection }) {
  const { lang, setLang, t } = useLang()
  const { profile, setProfile, profileConfig, isDark } = useRiskProfile()

  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Ferme le dropdown profil si clic en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const navLinks = [
    { label: t('nav.howItWorks'), type: 'section', target: 'how-it-works' },
    { label: t('nav.protocols'),  type: 'section', target: 'protocols' },
    { label: t('nav.strategy'),   type: 'section', target: 'strategy' },
    { label: t('nav.simulator'),  type: 'page',    target: 'simulator' },
    { label: t('nav.learn'),      type: 'page',    target: 'learn' },
    { label: t('nav.governance'), type: 'page',    target: 'governance' },
    { label: t('nav.deposit'),    type: 'page',    target: 'deposit', cta: true },
  ]

  const handleLinkClick = (link) => {
    closeMenu()
    if (link.type === 'section') {
      navigateToSection(link.target)
    } else {
      navigateTo(link.target)
    }
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    navigateTo('home')
  }

  const handleProfileSelect = (id) => {
    setProfile(id)
    setProfileOpen(false)
  }

  // Couleurs du pill actif
  const pillColors = PROFILE_PILL_COLORS[profile]

  // Labels de profil traduits
  const profileLabels = {
    prudent:       t('profile.prudent'),
    balanced:      t('profile.balanced'),
    dynamic:       t('profile.dynamic'),
    airdropHunter: t('profile.airdropHunter'),
  }

  // Nombre de protocoles par profil (issu des listes explicites dans profiles.js)
  const profileProtocolCounts = {
    prudent:       8,   // tier 1 + sUSDe + reUSD
    balanced:      15,  // 50% Prudent + 50% Dynamic
    dynamic:       7,   // tranches junior (reUSDe inclus)
    airdropHunter: 1,   // Sierra Money (liste évolutive)
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm border-b border-lgrey'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-3">

          {/* ── Logo ── */}
          <a href="/" onClick={handleLogoClick} className="flex items-center gap-2 group flex-shrink-0">
            <img
              src={`${import.meta.env.BASE_URL}${isDark ? 'lantern-logo-black.svg' : 'lantern-logo-white.svg'}`}
              alt="DeFi Lantern"
              className="h-10 w-auto transition-transform duration-200 group-hover:scale-105"
            />
            <span className="font-bold text-xl tracking-tight text-[#2ABFAB]">
              DeFi Lantern
            </span>
          </a>

          {/* ── Sélecteur de profil (centre) ── */}
          <div className="relative hidden sm:block" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${pillColors.active}`}
              aria-haspopup="true"
              aria-expanded={profileOpen}
            >
              <span>{profileConfig.icon}</span>
              <span>{profileLabels[profile]}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3.5 w-3.5 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Dropdown profil */}
            {profileOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-lgrey py-2 z-50 animate-fadeIn">
                {Object.values(PROFILES).map((p) => {
                  const colors = PROFILE_PILL_COLORS[p.id]
                  const isActive = profile === p.id
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleProfileSelect(p.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-lgrey ${
                        isActive ? 'bg-lgrey' : ''
                      }`}
                    >
                      {/* Icône + infos */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0 ${
                        isActive ? colors.active : colors.inactive
                      }`}>
                        {p.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-navy">
                            {profileLabels[p.id]}
                          </span>
                          {isActive && (
                            <span className="text-xs font-medium px-1.5 py-0.5 rounded-full" style={{ backgroundColor: colors.dot, color: 'white' }}>
                              actif
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-navy/50">
                            {profileProtocolCounts[p.id]} {t('profile.protocols')}
                          </span>
                          <span className="text-xs text-navy/30">·</span>
                          <span className="text-xs font-medium" style={{ color: colors.dot }}>
                            {p.apyRange}
                          </span>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* ── Navigation desktop ── */}
          <nav className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => {
              if (link.cta) {
                return (
                  <button
                    key={link.target}
                    onClick={() => handleLinkClick(link)}
                    className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-colors duration-200 ${
                      currentPage === 'deposit'
                        ? 'bg-[#22A898] text-white'
                        : 'bg-[#2ABFAB] text-white hover:bg-[#22A898]'
                    }`}
                  >
                    {link.label}
                  </button>
                )
              }

              return (
                <button
                  key={link.target}
                  onClick={() => handleLinkClick(link)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    link.type === 'page' && currentPage === link.target
                      ? 'text-[#2ABFAB] font-semibold'
                      : 'text-navy/70 hover:text-[#2ABFAB]'
                  }`}
                >
                  {link.label}
                </button>
              )
            })}
          </nav>

          {/* ── Actions droite : toggle FR/EN + hamburger ── */}
          <div className="flex items-center gap-2 flex-shrink-0">

            {/* Bouton bascule FR/EN */}
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="flex items-center bg-[#EEF2F2] rounded-full p-0.5 transition-all duration-200 hover:bg-teal-light"
              aria-label={`Changer la langue — actuellement ${lang.toUpperCase()}`}
            >
              <span className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${lang === 'fr' ? 'bg-[#2ABFAB] text-white shadow-sm' : 'text-navy/50 hover:text-navy/70'}`}>
                FR
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${lang === 'en' ? 'bg-[#2ABFAB] text-white shadow-sm' : 'text-navy/50 hover:text-navy/70'}`}>
                EN
              </span>
            </button>

            {/* Hamburger mobile */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-lgrey transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu de navigation"
              aria-expanded={menuOpen}
            >
              <div className="w-5 h-5 flex flex-col justify-center gap-1">
                <span className={`block h-0.5 bg-navy transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block h-0.5 bg-navy transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-navy transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* ── Menu mobile déroulant ── */}
        {menuOpen && (
          <div className="md:hidden border-t border-lgrey py-4">

            {/* Sélecteur de profil dans le menu mobile */}
            <div className="px-4 mb-4">
              <p className="text-xs font-semibold text-navy/50 uppercase tracking-wider mb-2">
                {t('profile.label')}
              </p>
              <div className="flex gap-2 flex-wrap">
                {Object.values(PROFILES).map((p) => {
                  const colors = PROFILE_PILL_COLORS[p.id]
                  const isActive = profile === p.id
                  return (
                    <button
                      key={p.id}
                      onClick={() => { handleProfileSelect(p.id); closeMenu() }}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                        isActive ? colors.active : colors.inactive
                      }`}
                    >
                      <span>{p.icon}</span>
                      <span>{profileLabels[p.id]}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Liens navigation */}
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => handleLinkClick(link)}
                  className={`text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    link.cta
                      ? 'bg-[#2ABFAB] text-white hover:bg-[#22A898] mx-2 text-center'
                      : link.type === 'page' && currentPage === link.target
                        ? 'text-[#2ABFAB] bg-teal-light font-semibold'
                        : 'text-navy/70 hover:text-[#2ABFAB] hover:bg-teal-light'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
