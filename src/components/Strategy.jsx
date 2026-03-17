// Strategy.jsx — Section "Notre stratégie"
//
// Nouveau : le donut et le tableau des protocoles sont filtrés selon le profil actif.
// L'allocation de chaque protocole = 100 / nb protocoles du profil.

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useLang } from '../context/LangContext'
import { useRiskProfile } from '../context/RiskProfileContext'
import { DONUT_COLORS, RETAINED_PROTOCOLS } from '../data/protocols'
import { PROFILE_PILL_COLORS } from '../data/profiles'

// ── Tooltip personnalisé ───────────────────────────────────────────────────────
function CustomTooltip({ active, payload, apyData }) {
  if (!active || !payload || !payload.length) return null
  const protocol = payload[0].payload
  const apyInfo = apyData[protocol.id]
  const apy = apyInfo?.apy ?? protocol.fallbackApy

  return (
    <div className="bg-white border border-lgrey rounded-xl shadow-lg px-4 py-3">
      <p className="font-semibold text-navy text-sm">{protocol.name}</p>
      <p className="text-[#2ABFAB] font-bold">{protocol.allocation.toFixed(1)}% du capital</p>
      <p className="text-navy/60 text-xs">APY : {apy.toFixed(2)}%</p>
    </div>
  )
}

// ── Légende personnalisée ─────────────────────────────────────────────────────
function CustomLegend({ payload }) {
  return (
    <ul className="flex flex-wrap gap-2 justify-center mt-4">
      {payload.map((entry, index) => (
        <li key={index} className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-xs text-navy/60 whitespace-nowrap">{entry.value}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Strategy({ apyData, averageApy, historicalApy, historicalCoverage }) {
  const { t } = useLang()
  const { profileProtocols, profile, profileWeights } = useRiskProfile()
  const pillColors = PROFILE_PILL_COLORS[profile]

  // Données pour Recharts : protocoles filtrés + poids réels du profil
  const chartData = profileProtocols.map((protocol) => {
    const globalIndex = RETAINED_PROTOCOLS.findIndex(p => p.id === protocol.id)
    const weight = profileWeights[protocol.id] ?? 0
    return {
      ...protocol,
      name: protocol.name.split(' ')[0],
      value: parseFloat((weight * 100).toFixed(1)),
      allocation: parseFloat((weight * 100).toFixed(1)),
      color: DONUT_COLORS[globalIndex % DONUT_COLORS.length],
    }
  })

  // Tiers de risque : filtrés selon le profil (on n'affiche que les tiers présents)
  const allTiers = [
    {
      tier: '1/6',
      labelKey: 'strategy.tier1',
      descKey: 'strategy.tier1Desc',
      color: 'bg-green-50 border-green-200',
      badgeColor: 'bg-green-500',
      textColor: 'text-green-700',
      protocols: ['Aave v3', 'Morpho (×2)', 'sUSDS'],
      maxRisk: 1,
    },
    {
      tier: '2/6',
      labelKey: 'strategy.tier2',
      descKey: 'strategy.tier2Desc',
      color: 'bg-amber-50 border-amber-200',
      badgeColor: 'bg-amber-400',
      textColor: 'text-amber-700',
      protocols: ['USDY', 'scrvUSD', 'sBOLD', 'cUSDO'],
      maxRisk: 2,
    },
    {
      tier: '3/6',
      labelKey: 'strategy.tier3',
      descKey: 'strategy.tier3Desc',
      color: 'bg-orange-50 border-orange-200',
      badgeColor: 'bg-orange-500',
      textColor: 'text-orange-700',
      protocols: ['Resolv', 'syrupUSDC', 'reUSD', 'sUSDe'],
      maxRisk: 3,
    },
  ]

  // Afficher seulement les tiers inclus dans le profil actif
  const visibleTiers = allTiers.filter((tier) => {
    if (profile === 'prudent') return tier.maxRisk <= 1
    if (profile === 'balanced') return tier.maxRisk <= 2
    return true
  })

  return (
    <section id="strategy" className="section bg-white">
      <div className="container-main">

        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-navy mb-4">{t('strategy.title')}</h2>
          <p className="text-navy/60 max-w-xl mx-auto">
            {t('strategy.subtitle')}
          </p>
          {/* Indicateur du profil actif */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-16 h-1 rounded-full bg-[#2ABFAB]" aria-hidden="true" />
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: pillColors.dot }}
            >
              {profileProtocols.length} protocoles sélectionnés
            </span>
            <div className="w-16 h-1 rounded-full bg-[#2ABFAB]" aria-hidden="true" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Colonne gauche : donut */}
          <div>
            <h3 className="text-lg font-semibold text-navy mb-2 text-center">
              {t('strategy.allocationTitle')}
            </h3>
            <p className="text-sm text-navy/60 text-center mb-6">
              <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 text-amber-700 text-xs font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                {t('strategy.governanceNote')}
              </span>
            </p>

            <ResponsiveContainer width="100%" height={380}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="45%"
                  innerRadius={80}
                  outerRadius={130}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip apyData={apyData} />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Texte centré dans le donut */}
            <div
              className="pointer-events-none relative -mt-72 mb-32 flex items-center justify-center"
              aria-hidden="true"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-navy">{averageApy.toFixed(2)}%</div>
                <div className="text-xs text-navy/50">APY moy.</div>
              </div>
            </div>
          </div>

          {/* Colonne droite : infos */}
          <div className="flex flex-col gap-6">

            {/* Performance historique 12 mois du profil */}
            <div className="bg-gradient-to-br from-teal-light to-white rounded-2xl border border-teal-200 p-6">
              <div className="text-sm text-navy/60 mb-1">{t('strategy.historicalApy')}</div>
              {historicalApy !== null ? (
                <>
                  <div className="text-4xl font-extrabold" style={{ color: pillColors.dot }}>
                    {historicalApy.toFixed(1)}%
                    <span className="text-lg font-normal text-navy/40 ml-2">{t('common.perYear')}</span>
                  </div>
                  {/* Note de couverture : précise sur quelle part du portefeuille repose le calcul */}
                  <p className="text-xs text-navy/50 mt-2">
                    {t('strategy.historicalApyNote')}
                  </p>
                  <p className="text-xs text-navy/40 mt-1">
                    Basé sur {historicalCoverage}% du portefeuille · {profileProtocols.length} protocoles actifs
                  </p>
                </>
              ) : (
                <>
                  <div className="text-4xl font-extrabold text-navy/30">—</div>
                  <p className="text-xs text-navy/40 mt-2">
                    {t('protocols.noHistory')}
                  </p>
                </>
              )}
            </div>

            {/* Tiers de risque (filtrés) */}
            <div>
              <h4 className="font-semibold text-navy mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2ABFAB]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                </svg>
                {t('strategy.riskTiers')}
              </h4>

              <div className="flex flex-col gap-3">
                {visibleTiers.map((tier) => (
                  <div key={tier.tier} className={`rounded-xl border p-4 ${tier.color}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-sm font-bold ${tier.textColor}`}>{tier.tier}</span>
                      <span className={`w-2 h-2 rounded-full ${tier.badgeColor}`} />
                      <span className="font-semibold text-navy text-sm">{t(tier.labelKey)}</span>
                    </div>
                    <p className="text-xs text-navy/60 mb-2">{t(tier.descKey)}</p>
                    <div className="flex flex-wrap gap-1">
                      {tier.protocols.map((p) => (
                        <span key={p} className="text-xs bg-white/70 border border-white rounded-full px-2 py-0.5 text-navy/60">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-navy/40 mt-2 text-center italic">
                {t('strategy.riskRef')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
