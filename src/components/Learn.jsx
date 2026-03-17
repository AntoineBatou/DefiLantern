// Learn.jsx — Page pédagogique "Comprendre le yield DeFi"
//
// 3 sections :
// 1. D'où vient le rendement ? (4 sources avec APY + risque intégrés)
// 2. Comprendre les risques (3 types)
// 3. Pourquoi DeFi Lantern plutôt qu'un vault concurrent ?

import { useLang } from '../context/LangContext'

// ── Icônes inline SVG ─────────────────────────────────────────────────────────
const Icons = {
  lending: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  rwa: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
  funding: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  stability: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  check: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  cross: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
}

// ── Composant carte de source de rendement ────────────────────────────────────
function YieldSourceCard({ icon, title, desc, example, color, apy, risk, riskColor }) {
  return (
    <div className="bg-white rounded-2xl border border-lgrey p-6 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-navy text-base mb-1">{title}</h3>
        <p className="text-sm text-navy/60 leading-relaxed">{desc}</p>
      </div>
      <div className="text-xs text-navy/40 bg-lgrey rounded-lg px-3 py-2 font-mono">
        ex. {example}
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-lgrey mt-auto">
        <span className="text-xs font-semibold text-[#2ABFAB]">{apy}</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${riskColor}`}>{risk}</span>
      </div>
    </div>
  )
}

// ── Composant colonne de risque ───────────────────────────────────────────────
function RiskColumn({ icon, title, desc, example, level, levelColor }) {
  return (
    <div className="bg-white rounded-2xl border border-lgrey p-6 shadow-sm flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        <h3 className="font-bold text-navy">{title}</h3>
      </div>
      <p className="text-sm text-navy/60 leading-relaxed">{desc}</p>
      <div className="bg-lgrey rounded-xl p-3">
        <p className="text-xs text-navy/50 italic leading-relaxed">{example}</p>
      </div>
      <div className="flex items-center gap-2 mt-auto">
        <div className={`h-2 flex-1 rounded-full ${levelColor}`} />
        <span className="text-xs text-navy/50">{level}</span>
      </div>
    </div>
  )
}

// ── Composant principal ────────────────────────────────────────────────────────
export default function Learn({ navigateTo }) {
  const { t, lang } = useLang()

  // Sources de rendement (avec APY et risque intégrés)
  const yieldSources = [
    {
      icon: Icons.lending,
      titleKey: 'learn.yieldLendingTitle',
      descKey: 'learn.yieldLendingDesc',
      exampleKey: 'learn.yieldLendingExample',
      apyKey: 'learn.yieldLendingApy',
      riskKey: 'learn.yieldLendingRisk',
      color: 'bg-blue-50 text-blue-600',
      riskColor: 'bg-green-100 text-green-700',
    },
    {
      icon: Icons.rwa,
      titleKey: 'learn.yieldRwaTitle',
      descKey: 'learn.yieldRwaDesc',
      exampleKey: 'learn.yieldRwaExample',
      apyKey: 'learn.yieldRwaApy',
      riskKey: 'learn.yieldRwaRisk',
      color: 'bg-amber-50 text-amber-600',
      riskColor: 'bg-blue-100 text-blue-700',
    },
    {
      icon: Icons.funding,
      titleKey: 'learn.yieldFundingTitle',
      descKey: 'learn.yieldFundingDesc',
      exampleKey: 'learn.yieldFundingExample',
      apyKey: 'learn.yieldFundingApy',
      riskKey: 'learn.yieldFundingRisk',
      color: 'bg-green-50 text-green-600',
      riskColor: 'bg-amber-100 text-amber-700',
    },
    {
      icon: Icons.stability,
      titleKey: 'learn.yieldStabilityTitle',
      descKey: 'learn.yieldStabilityDesc',
      exampleKey: 'learn.yieldStabilityExample',
      apyKey: 'learn.yieldStabilityApy',
      riskKey: 'learn.yieldStabilityRisk',
      color: 'bg-purple-50 text-purple-600',
      riskColor: 'bg-purple-100 text-purple-700',
    },
  ]

  // Risques
  const risks = [
    {
      icon: '💻',
      titleKey: 'learn.riskSmartTitle',
      descKey: 'learn.riskSmartDesc',
      exampleKey: 'learn.riskSmartExample',
      level: lang === 'fr' ? 'Risque élevé si exploit' : 'High if exploited',
      levelColor: 'bg-red-300',
    },
    {
      icon: '💧',
      titleKey: 'learn.riskLiqTitle',
      descKey: 'learn.riskLiqDesc',
      exampleKey: 'learn.riskLiqExample',
      level: lang === 'fr' ? 'Gérable avec buffer' : 'Manageable with buffer',
      levelColor: 'bg-amber-300',
    },
    {
      icon: '🗳️',
      titleKey: 'learn.riskGovTitle',
      descKey: 'learn.riskGovDesc',
      exampleKey: 'learn.riskGovExample',
      level: lang === 'fr' ? 'Atténué par timelock' : 'Mitigated by timelock',
      levelColor: 'bg-green-300',
    },
  ]

  // Comparatif vaults concurrents vs DeFi Lantern
  const singleCons = [
    'learn.singleCon1',
    'learn.singleCon2',
    'learn.singleCon3',
    'learn.singleCon4',
    'learn.singleCon5',
    'learn.singleCon6',
    'learn.singleCon7',
  ]
  const fireflyPros = [
    'learn.fireflyPro1',
    'learn.fireflyPro2',
    'learn.fireflyPro3',
    'learn.fireflyPro4',
    'learn.fireflyPro5',
    'learn.fireflyPro6',
    'learn.fireflyPro7',
  ]

  return (
    <div className="min-h-screen bg-bg">

      {/* ── Header de la page ── */}
      <div className="bg-gradient-to-br from-bg via-white to-teal-light py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border border-lgrey rounded-full px-4 py-2 mb-6 shadow-sm">
            <span className="text-lg">🎓</span>
            <span className="text-xs font-semibold text-[#2ABFAB] uppercase tracking-wider">
              {lang === 'fr' ? 'Pédagogie DeFi' : 'DeFi Education'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy mb-4">
            {t('learn.title')}
          </h1>
          <p className="text-navy/60 leading-relaxed">
            {t('learn.subtitle')}
          </p>
          <div className="mt-6 mx-auto w-16 h-1 rounded-full bg-[#2ABFAB]" aria-hidden="true" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col gap-24">

        {/* ── Section 1 : Sources de rendement ── */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-navy mb-2">{t('learn.yieldTitle')}</h2>
            <p className="text-navy/60 max-w-xl mx-auto">{t('learn.yieldSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {yieldSources.map((source) => (
              <YieldSourceCard
                key={source.titleKey}
                icon={source.icon}
                title={t(source.titleKey)}
                desc={t(source.descKey)}
                example={t(source.exampleKey)}
                apy={t(source.apyKey)}
                risk={t(source.riskKey)}
                color={source.color}
                riskColor={source.riskColor}
              />
            ))}
          </div>
        </section>

        {/* ── Section 2 : Risques ── */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-navy mb-2">{t('learn.risksTitle')}</h2>
            <p className="text-navy/60 max-w-xl mx-auto">{t('learn.risksSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {risks.map((r) => (
              <RiskColumn
                key={r.titleKey}
                icon={r.icon}
                title={t(r.titleKey)}
                desc={t(r.descKey)}
                example={t(r.exampleKey)}
                level={r.level}
                levelColor={r.levelColor}
              />
            ))}
          </div>
        </section>

        {/* ── Section 3 : Pourquoi DeFi Lantern vs vaults concurrents ── */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-navy mb-2">{t('learn.diversifyTitle')}</h2>
            <p className="text-navy/60 max-w-2xl mx-auto">{t('learn.diversifySubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Vaults concurrents */}
            <div className="bg-white rounded-2xl border border-lgrey p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl">🏪</div>
                <h3 className="font-bold text-navy">{t('learn.diversifySingle')}</h3>
              </div>
              <div className="flex flex-col gap-3">
                {singleCons.map((key) => (
                  <div key={key} className="flex items-start gap-2 text-sm text-navy/70">
                    {Icons.cross}
                    <span>{t(key)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DeFi Lantern */}
            <div className="bg-gradient-to-br from-teal-light to-white rounded-2xl border border-teal-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#2ABFAB] flex items-center justify-center text-xl">🏮</div>
                <h3 className="font-bold text-navy">{t('learn.diversifyFirefly')}</h3>
              </div>
              <div className="flex flex-col gap-3">
                {fireflyPros.map((key) => (
                  <div key={key} className="flex items-start gap-2 text-sm text-navy/70">
                    {Icons.check}
                    <span>{t(key)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="mt-8 bg-navy rounded-2xl p-6 text-center">
            <p className="text-white/90 text-sm leading-relaxed max-w-2xl mx-auto italic">
              "{t('learn.diversifyConclusion')}"
            </p>
          </div>
        </section>

        {/* ── CTA final ── */}
        <div className="text-center pb-8">
          <p className="text-navy/60 mb-4 text-sm">
            {lang === 'fr'
              ? 'Prêt à mettre vos stablecoins au travail ?'
              : 'Ready to put your stablecoins to work?'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigateTo('simulator')}
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              {lang === 'fr' ? 'Simuler un dépôt' : 'Simulate a deposit'}
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              {lang === 'fr' ? 'Voir les protocoles' : 'View protocols'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
