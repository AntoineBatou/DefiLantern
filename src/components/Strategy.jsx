// Strategy.jsx — Section "Notre stratégie"
//
// Nouveau : le donut et le tableau des protocoles sont filtrés selon le profil actif.
// L'allocation de chaque protocole = 100 / nb protocoles du profil.

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { useLang } from '../context/LangContext'
import { useRiskProfile } from '../context/RiskProfileContext'
import { DONUT_COLORS, RETAINED_PROTOCOLS } from '../data/protocols'
import { PROFILE_PILL_COLORS } from '../data/profiles'

// Construit la clé de traduction pour la description du profil actif
// ex: 'prudent' → 'strategy.profileDescPrudent'
function profileDescKey(profileId) {
  const capitalized = profileId.charAt(0).toUpperCase() + profileId.slice(1)
  return `strategy.profileDesc${capitalized}`
}

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


export default function Strategy({ apyData, averageApy, historicalApy }) {
  const { t, lang } = useLang()
  const { profileProtocols, profile, profileWeights, profileConfig, isDark } = useRiskProfile()
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

  // Tiers de risque : dérivés dynamiquement depuis profileProtocols
  const tierDefs = [
    {
      risk: 1, tier: '1/6',
      labelKey: 'strategy.tier1', descKey: 'strategy.tier1Desc',
      color: 'bg-green-50 border-green-200',
      badgeColor: 'bg-green-500', textColor: 'text-green-700',
    },
    {
      risk: 2, tier: '2/6',
      labelKey: 'strategy.tier2', descKey: 'strategy.tier2Desc',
      color: 'bg-amber-50 border-amber-200',
      badgeColor: 'bg-amber-400', textColor: 'text-amber-700',
    },
    {
      risk: 3, tier: '3/6',
      labelKey: 'strategy.tier3', descKey: 'strategy.tier3Desc',
      color: 'bg-orange-50 border-orange-200',
      badgeColor: 'bg-orange-500', textColor: 'text-orange-700',
    },
  ]

  const visibleTiers = tierDefs
    .map((tierDef) => ({
      ...tierDef,
      protocols: profileProtocols
        .filter((p) => p.risk === tierDef.risk)
        .map((p) => p.name),
    }))
    .filter((tier) => tier.protocols.length > 0)

  return (
    <section id="strategy" className="section bg-white">
      <div className="container-main">

        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-navy mb-4">{t('strategy.title')}</h2>
          <p className="text-navy/60 max-w-xl mx-auto">
            {{
              prudent: {
                fr: 'Préservation du capital en priorité — rendement optimisé sur les protocoles DeFi les plus éprouvés.',
                en: 'Capital preservation first — yield optimised across the most battle-tested DeFi protocols.',
              },
              balanced: {
                fr: "L'équilibre entre sécurité et performance — exposition diversifiée sur l'ensemble du spectre DeFi.",
                en: 'Balancing safety and performance — diversified exposure across the full DeFi spectrum.',
              },
              dynamic: {
                fr: 'Rendement maximisé — stratégies avancées pour investisseurs avertis, avec une gestion rigoureuse du risque.',
                en: 'Maximised yield — advanced strategies for experienced investors, with rigorous risk management.',
              },
              airdropHunter: {
                fr: "Protocoles innovants sélectionnés pour leur rendement compétitif et leur potentiel d'airdrop.",
                en: 'Innovative protocols selected for their competitive yield and airdrop potential.',
              },
            }[profile]?.[lang] ?? t('strategy.subtitle')}
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

          {/* Carte de description du profil — placée sous l'indicateur */}
          <div className={`mt-6 p-4 rounded-lg max-w-xl mx-auto ${
            profileConfig?.theme === 'christmas'
              ? 'bg-red-950/40 border border-red-900'
              : isDark
                ? 'bg-gray-800 border border-gray-700'
                : 'bg-blue-50 border border-blue-100'
          }`}>
            <p className="text-sm leading-relaxed text-navy/70">
              {t(profileDescKey(profile))}
            </p>
            {/* Avertissement spécifique Airdrop Hunter */}
            {profile === 'airdropHunter' && (
              <p className="mt-2 text-xs font-medium" style={{ color: '#FFD700' }}>
                {t('strategy.airdropDisclaimerShort')}
              </p>
            )}
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

            {/* SVG seul — sans Legend intégrée pour un cy="50%" fiable */}
            <div className="relative">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
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
                </PieChart>
              </ResponsiveContainer>

              {/* Overlay : cy="50%" → top 50% → parfaitement centré dans le trou */}
              <div
                className="pointer-events-none absolute inset-x-0 flex items-center justify-center"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
                aria-hidden="true"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-navy">{averageApy !== null ? `${averageApy.toFixed(2)}%` : '—'}</div>
                  <div className="text-xs text-navy/50">APY moy.</div>
                </div>
              </div>
            </div>

            {/* Légende hors SVG — liste simple sans dépendance Recharts */}
            <ul className="flex flex-wrap gap-2 justify-center mt-4">
              {chartData.map((entry, index) => (
                <li key={index} className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
                  <span className="text-xs text-navy/60 whitespace-nowrap">{entry.name}</span>
                </li>
              ))}
            </ul>
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
                  <p className="text-xs text-navy/50 mt-2">
                    {t('strategy.historicalApyNote')}
                  </p>
                  <p className="text-xs text-navy/40 mt-1 italic">
                    * Pour les protocoles de moins de 12 mois, le rendement actuel est utilisé à défaut.
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
