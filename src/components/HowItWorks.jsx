// HowItWorks.jsx — Section "Comment ça marche ?"
//
// Présente le fonctionnement du protocole en 3 étapes simples.
// Design : 3 cartes avec numéros ambré, icônes et descriptions.

import { useLang } from '../context/LangContext'

export default function HowItWorks() {
  const { t } = useLang()

  // Les 3 étapes avec leurs icônes SVG
  // On définit les données ici et on les rend dynamiquement
  const steps = [
    {
      number: '01',
      emoji: '🏦',
      titleKey: 'howItWorks.step1Title',
      descKey: 'howItWorks.step1Desc',
      // Icône SVG — représente un dépôt/banque
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'bg-blue-50 text-blue-600',
    },
    {
      number: '02',
      emoji: '⚡',
      titleKey: 'howItWorks.step2Title',
      descKey: 'howItWorks.step2Desc',
      // Icône SVG — représente l'optimisation/réseau
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'bg-amber-50 text-[#F5A623]',
    },
    {
      number: '03',
      emoji: '📈',
      titleKey: 'howItWorks.step3Title',
      descKey: 'howItWorks.step3Desc',
      // Icône SVG — représente la croissance
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: 'bg-teal-light text-[#2ABFAB]',
    },
  ]

  return (
    <section id="how-it-works" className="section bg-white">
      <div className="container-main">

        {/* ── En-tête de section ── */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-navy mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-navy/60 max-w-xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
          {/* Ligne décorative teal */}
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#2ABFAB]" aria-hidden="true" />
        </div>

        {/* ── 3 étapes ── */}
        {/* Sur mobile : empilées. Sur desktop : en ligne avec flèches entre elles */}
        <div className="relative">

          {/* Ligne de connexion entre les cartes (desktop seulement) */}
          <div
            className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-200 via-amber-200 to-teal-200 z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative bg-white rounded-2xl border border-lgrey p-8 text-center shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 z-10"
              >
                {/* Badge numéro ambré — positionné en haut au centre */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    {/* Icône dans un cercle coloré */}
                    <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center`}>
                      {step.icon}
                    </div>
                    {/* Badge numéro superposé en bas à droite */}
                    <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#F5A623] text-white text-xs font-bold flex items-center justify-center shadow-sm">
                      {step.number}
                    </div>
                  </div>
                </div>

                {/* Titre de l'étape */}
                <h3 className="text-lg font-semibold text-navy mb-3">
                  {t(step.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-navy/60 text-sm leading-relaxed">
                  {t(step.descKey)}
                </p>

                {/* Flèche vers la droite entre les cartes (sauf la dernière) */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white border border-lgrey rounded-full items-center justify-center shadow-sm"
                    aria-hidden="true"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#2ABFAB]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Note sur le token fyUSDC ── */}
        <div className="mt-12 bg-teal-light rounded-2xl p-6 flex gap-4 items-start">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2ABFAB] flex items-center justify-center mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-navy/70 leading-relaxed">
              <strong className="text-navy">glUSDC</strong> est un jeton de dépôt standardisé (ERC-4626).
              Contrairement à un staking classique, vous n'attendez pas de "récompenses" séparées —
              la valeur de chaque jeton glUSDC augmente directement dans le temps.
              1 glUSDC vaut toujours <em>plus</em> d'USDC qu'au moment du dépôt.
            </p>
          </div>
        </div>

        {/* ── Bloc frais de performance ── */}
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4 items-start">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F5A623] flex items-center justify-center mt-0.5 text-white font-bold text-sm">
            %
          </div>
          <div>
            <p className="text-sm font-semibold text-navy mb-1">{t('howItWorks.feesTitle')}</p>
            <p className="text-sm text-navy/70 leading-relaxed">
              {t('howItWorks.feesDesc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
