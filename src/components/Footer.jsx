// Footer.jsx — Pied de page
//
// Contenu :
// - Logo + tagline
// - Liens (Whitepaper, GitHub, Twitter)
// - "Construit sur Ethereum" avec logo ETH
// - Disclaimer légal
// - Copyright

import { useLang } from '../context/LangContext'

// Icône Ethereum SVG (logo officiel simplifié)
function EthLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      fill="currentColor"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Formes du logo Ethereum */}
      <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
    </svg>
  )
}

// Icône GitHub SVG
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

// Icône Twitter/X SVG
function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function Footer({ navigateTo }) {
  const { t } = useLang()

  const links = [
    {
      label: t('footer.whitepaper'),
      onClick: () => navigateTo('whitepaper'),
      external: false,
    },
    {
      label: t('footer.github'),
      href: 'https://github.com',
      external: true,
      icon: <GithubIcon />,
    },
    {
      label: t('footer.twitter'),
      href: 'https://x.com',
      external: true,
      icon: <TwitterIcon />,
    },
  ]

  return (
    <footer className="bg-navy text-white">
      {/* ── Section principale ── */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* ── Colonne 1 : Logo + tagline ── */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <img
                src={`${import.meta.env.BASE_URL}lantern-logo.svg`}
                alt="DeFi Lantern"
                className="h-8 w-auto"
              />
              <span className="font-bold text-xl text-[#2ABFAB]">DeFi Lantern</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>

            {/* Badge "Construit sur Ethereum" */}
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 self-start">
              <span className="text-[#627EEA]">
                <EthLogo />
              </span>
              <span className="text-xs text-white/70 font-medium">{t('footer.builtOn')}</span>
            </div>
          </div>

          {/* ── Colonne 2 : Liens ── */}
          <div>
            <h4 className="font-semibold text-white/80 text-sm uppercase tracking-wider mb-4">
              {t('footer.links')}
            </h4>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.label}>
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className="text-white/60 hover:text-[#2ABFAB] transition-colors text-sm flex items-center gap-2"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-white/60 hover:text-[#2ABFAB] transition-colors text-sm flex items-center gap-2"
                    >
                      {link.icon && <span>{link.icon}</span>}
                      {link.label}
                      {link.external && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 opacity-50" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                        </svg>
                      )}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Colonne 3 : Disclaimer ── */}
          <div>
            <h4 className="font-semibold text-white/80 text-sm uppercase tracking-wider mb-4">
              Disclaimer
            </h4>
            <p className="text-white/40 text-xs leading-relaxed">
              {t('footer.legal')}
            </p>

            {/* Luciole décorative */}
            <div className="mt-4 flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse"
                aria-hidden="true"
              />
              <span className="text-xs text-white/30">Simulation — Projet académique</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bande copyright ── */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/30 text-xs">{t('footer.copyright')}</p>
          {/* Version du protocole */}
          <span className="text-xs text-white/20 bg-white/5 px-2.5 py-1 rounded-full">
            v1.0.0 — MVP
          </span>
        </div>
      </div>
    </footer>
  )
}
