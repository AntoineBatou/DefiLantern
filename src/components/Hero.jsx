// Hero.jsx — Section d'accroche principale
//
// Nouveau : affiche le badge du profil actif + APY du profil (non global)

import { useLang } from '../context/LangContext'
import { useRiskProfile } from '../context/RiskProfileContext'
import { PROFILE_PILL_COLORS } from '../data/profiles'

export default function Hero({ averageApy, loading, hasLiveData, onSimulateClick, historicalApy, historicalCoverage }) {
  const { t } = useLang()
  const { profile, profileConfig, profileProtocols } = useRiskProfile()
  const pillColors = PROFILE_PILL_COLORS[profile]

  const profileLabels = {
    prudent:  t('profile.prudent'),
    balanced: t('profile.balanced'),
    dynamic:  t('profile.dynamic'),
  }

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-bg via-white to-teal-light py-24 px-4"
    >
      {/* Décoratifs d'arrière-plan */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #2ABFAB 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="firefly-element absolute top-1/4 right-1/4 w-6 h-6 rounded-full"
        style={{ backgroundColor: '#F5A623' }}
        aria-hidden="true"
      />
      <div
        className="firefly-element absolute top-1/3 right-1/3 w-3 h-3 rounded-full opacity-60"
        style={{ backgroundColor: '#F5A623', animationDelay: '2s', animationDuration: '10s' }}
        aria-hidden="true"
      />
      <div
        className="firefly-element absolute top-1/2 right-1/5 w-2 h-2 rounded-full opacity-40"
        style={{ backgroundColor: '#F7B94A', animationDelay: '4s', animationDuration: '12s' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #F5A623 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badges : données live + profil actif */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
            {/* Live data badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-lgrey rounded-full px-4 py-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-navy/60">{t('hero.liveData')}</span>
            </div>

            {/* Badge profil actif */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
              style={{ backgroundColor: pillColors.dot, color: 'white' }}
            >
              <span>{profileConfig.icon}</span>
              <span>{t('profile.label')} : {profileLabels[profile]}</span>
              <span className="opacity-75">— {profileConfig.apyRange}</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy leading-tight mb-6">
            {t('hero.title')}
          </h1>

          {/* Sous-titre */}
          <p className="text-lg text-navy/60 leading-relaxed mb-10 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>

          {/* Stats clés */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">

            {/* Stat 1 : Nombre de protocoles dans le profil */}
            <div className="bg-white rounded-2xl shadow-sm border border-lgrey px-8 py-5 text-center min-w-[140px]">
              <div className="text-3xl font-extrabold text-[#2ABFAB]">{profileProtocols.length}</div>
              <div className="text-sm text-navy/50 font-medium mt-1">{t('hero.protocols')}</div>
            </div>

            {/* Stat 2 : APY actuel (live DeFiLlama) */}
            <div className="bg-white rounded-2xl shadow-sm border border-lgrey px-8 py-5 text-center min-w-[140px]">
              {loading ? (
                <div className="skeleton h-8 w-20 mx-auto mb-1 rounded" />
              ) : (
                <div className="text-3xl font-extrabold" style={{ color: pillColors.dot }}>
                  {averageApy.toFixed(1)}%
                </div>
              )}
              <div className="text-sm text-navy/50 font-medium mt-1">{t('hero.currentApy')}</div>
              {hasLiveData && !loading && (
                <div className="flex items-center justify-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-xs text-navy/40">live</span>
                </div>
              )}
            </div>

            {/* Stat 3 : Performance historique 12 mois du profil */}
            <div className="bg-white rounded-2xl shadow-sm border border-lgrey px-8 py-5 text-center min-w-[140px]">
              {loading ? (
                <div className="skeleton h-8 w-20 mx-auto mb-1 rounded" />
              ) : historicalApy !== null ? (
                <div className="text-3xl font-extrabold" style={{ color: pillColors.dot }}>
                  {historicalApy.toFixed(1)}%
                </div>
              ) : (
                <div className="text-3xl font-extrabold text-navy/30">—</div>
              )}
              <div className="text-sm text-navy/50 font-medium mt-1">{t('hero.historicalApy')}</div>
              {!loading && historicalApy !== null && (
                <div className="text-xs text-navy/40 mt-1">
                  {historicalCoverage}% du portef.
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onSimulateClick}
              className="btn-primary inline-flex items-center justify-center gap-2 text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10A1 1 0 019 9z" clipRule="evenodd" />
              </svg>
              {t('hero.ctaSimulate')}
            </button>
            <a
              href="#how-it-works"
              className="btn-secondary inline-flex items-center justify-center gap-2 text-base"
            >
              {t('hero.ctaLearnMore')}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
