// Simulator.jsx — Simulateur de rendement interactif
//
// Fonctionnalités :
// - Slider + input pour le montant (100 → 100 000 USDC)
// - Onglets de durée (1m, 3m, 6m, 1an, 3ans)
// - Calcul en temps réel des résultats
// - Graphique de croissance comparative (Firefly vs livret)
// - Bouton "Ajouter au Dashboard"
// - Toast de confirmation

import { useState, useMemo, useCallback } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useLang } from '../context/LangContext'

// ── Constantes de durée ────────────────────────────────────────────────────────
// months = durée en mois pour le calcul
// label = clé de traduction
const DURATIONS = [
  { key: '1m', months: 1 },
  { key: '3m', months: 3 },
  { key: '6m', months: 6 },
  { key: '1y', months: 12 },
  { key: '3y', months: 36 },
]

// ── Fonctions de calcul ────────────────────────────────────────────────────────

// Calcule le rendement composé mensuel
// Formule : capital * ((1 + apy/100)^(mois/12) - 1)
function calculateYield(capital, apyPercent, months) {
  const rate = apyPercent / 100
  const years = months / 12
  // Intérêts composés annuels
  const finalValue = capital * Math.pow(1 + rate, years)
  return {
    yield: finalValue - capital,
    finalValue,
  }
}

// Génère les données pour le graphique (un point par mois)
function generateChartData(capital, apyPercent, totalMonths) {
  const data = []
  for (let month = 0; month <= totalMonths; month++) {
    const fireflyValue = capital * Math.pow(1 + apyPercent / 100, month / 12)
    const savingsValue = capital * Math.pow(1 + 0.5 / 100, month / 12) // 0.5% livret A
    data.push({
      month,
      firefly: Number(fireflyValue.toFixed(2)),
      savings: Number(savingsValue.toFixed(2)),
    })
  }
  return data
}

// ── Tooltip personnalisé du graphique ─────────────────────────────────────────
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null

  const formatMonth = (m) => {
    if (m === 0) return 'Début'
    if (m < 12) return `Mois ${m}`
    const years = Math.floor(m / 12)
    const rem = m % 12
    return rem > 0 ? `${years}a ${rem}m` : `${years} an${years > 1 ? 's' : ''}`
  }

  return (
    <div className="bg-white border border-lgrey rounded-xl shadow-lg px-4 py-3">
      <p className="text-xs font-medium text-navy/50 mb-2">{formatMonth(label)}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name} :{' '}
          {entry.value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $
        </p>
      ))}
    </div>
  )
}

// ── Composant Toast notification ───────────────────────────────────────────────
function Toast({ message, visible }) {
  if (!visible) return null
  return (
    <div className="fixed bottom-6 right-6 z-50 toast-enter bg-green-600 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <span className="font-medium text-sm">{message}</span>
    </div>
  )
}

// ── Composant Résultat ─────────────────────────────────────────────────────────
function ResultCard({ label, value, highlight = false }) {
  return (
    <div className={`rounded-xl p-4 ${highlight ? 'bg-teal-light border border-teal-200' : 'bg-lgrey'}`}>
      <div className="text-xs text-navy/50 mb-1">{label}</div>
      <div className={`text-xl font-bold ${highlight ? 'text-[#2ABFAB]' : 'text-navy'}`}>
        {value}
      </div>
    </div>
  )
}

// ── Composant principal ────────────────────────────────────────────────────────
export default function Simulator({ averageApy, onAddPosition }) {
  const { t } = useLang()

  // États du simulateur
  const [amount, setAmount] = useState(1000)           // Montant en USDC
  const [selectedDuration, setSelectedDuration] = useState('1y') // Durée sélectionnée
  const [showToast, setShowToast] = useState(false)    // Visibilité du toast

  // Durée active en mois
  const activeDuration = DURATIONS.find((d) => d.key === selectedDuration)
  const months = activeDuration?.months ?? 12

  // Calculs mémoïsés : recalcule seulement quand amount, months ou averageApy changent
  // useMemo optimise les performances en évitant les recalculs inutiles
  const results = useMemo(() => {
    const { yield: yieldAmount, finalValue } = calculateYield(amount, averageApy, months)
    return {
      initialDeposit: amount,
      glUsdcReceived: amount, // 1:1 à l'entrée
      estimatedYield: yieldAmount,
      finalValue,
    }
  }, [amount, months, averageApy])

  const chartData = useMemo(
    () => generateChartData(amount, averageApy, months),
    [amount, months, averageApy]
  )

  // Gestion du slider et de l'input texte (synchronisés)
  const handleAmountChange = useCallback((value) => {
    const parsed = Math.max(100, Math.min(100000, Number(value) || 100))
    setAmount(parsed)
  }, [])

  // Ajoute la simulation au Dashboard
  const handleAddToDashboard = () => {
    onAddPosition({
      id: Date.now(), // ID unique basé sur le timestamp
      date: new Date().toLocaleDateString('fr-FR'),
      amount,
      duration: t(`simulator.dur${selectedDuration}`),
      apy: averageApy,
      yield: results.estimatedYield,
      finalValue: results.finalValue,
    })
    // Affiche le toast pendant 3 secondes
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  // Formatage des montants avec séparateurs de milliers
  const fmt = (n) =>
    n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  // Labels de l'axe X du graphique (affiche seulement certains mois)
  const xTickFormatter = (month) => {
    if (month === 0) return 'Début'
    if (month < 12) return `${month}m`
    return `${month / 12}a`
  }

  return (
    <section id="simulator" className="section bg-bg">
      <div className="container-main">

        {/* ── En-tête ── */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy mb-4">{t('simulator.title')}</h2>
          <p className="text-navy/60 max-w-xl mx-auto">{t('simulator.subtitle')}</p>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#2ABFAB]" aria-hidden="true" />
        </div>

        {/* ── Layout principal : inputs à gauche, résultats à droite ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          {/* ── Colonne gauche : inputs ── */}
          <div className="bg-white rounded-2xl border border-lgrey p-6 shadow-sm flex flex-col gap-6">

            {/* Input montant */}
            <div>
              <label className="block text-sm font-semibold text-navy mb-3" htmlFor="sim-amount">
                {t('simulator.amountLabel')}
              </label>

              {/* Champ texte + unité USDC */}
              <div className="relative mb-4">
                <input
                  id="sim-amount"
                  type="number"
                  min="100"
                  max="100000"
                  step="100"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="w-full border border-lgrey rounded-xl px-4 py-3 pr-20 text-lg font-bold text-navy focus:outline-none focus:ring-2 focus:ring-[#2ABFAB] focus:border-transparent"
                  aria-label="Montant à déposer en USDC"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-navy/40">
                  USDC
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="100"
                max="100000"
                step="100"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="w-full accent-[#2ABFAB]"
                aria-label="Slider du montant à déposer"
              />

              {/* Marqueurs min/max du slider */}
              <div className="flex justify-between text-xs text-navy/40 mt-1">
                <span>100 $</span>
                <span>100 000 $</span>
              </div>
            </div>

            {/* Sélecteur de durée */}
            <div>
              <label className="block text-sm font-semibold text-navy mb-3">
                {t('simulator.durationLabel')}
              </label>
              <div className="flex flex-wrap gap-2">
                {DURATIONS.map((dur) => (
                  <button
                    key={dur.key}
                    onClick={() => setSelectedDuration(dur.key)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                      selectedDuration === dur.key
                        ? 'bg-[#2ABFAB] text-white shadow-sm'
                        : 'bg-lgrey text-navy/60 hover:bg-teal-light hover:text-[#2ABFAB]'
                    }`}
                    aria-pressed={selectedDuration === dur.key}
                  >
                    {t(`simulator.dur${dur.key}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* APY moyen utilisé (basé sur le profil actif) */}
            <div className="bg-navy/5 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-sm text-navy/60">{t('simulator.avgApy')}</span>
                <p className="text-xs text-navy/40 mt-0.5">{t('profile.label')}</p>
              </div>
              <span className="text-xl font-bold text-[#2ABFAB]">{averageApy.toFixed(2)}%</span>
            </div>
          </div>

          {/* ── Colonne droite : résultats ── */}
          <div className="flex flex-col gap-4">

            {/* Grille des 4 résultats */}
            <div className="grid grid-cols-2 gap-3">
              <ResultCard
                label={t('simulator.initialDeposit')}
                value={`${fmt(results.initialDeposit)} $`}
              />
              <ResultCard
                label={t('simulator.glUsdcReceived')}
                value={`${fmt(results.glUsdcReceived)} glUSDC`}
              />
              <ResultCard
                label={t('simulator.estimatedYield')}
                value={`+${fmt(results.estimatedYield)} $`}
              />
              <ResultCard
                label={t('simulator.finalValue')}
                value={`${fmt(results.finalValue)} $`}
                highlight
              />
            </div>

            {/* Gain annualisé visuel */}
            <div className="bg-white rounded-xl border border-lgrey p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-navy/50">{t('simulator.comparison')}</span>
                <span className="text-xs text-navy/50">0.5% APY</span>
              </div>
              {/* Barre de comparaison */}
              <div className="relative h-3 bg-lgrey rounded-full overflow-hidden">
                {/* Barre livret A (taille fixe) */}
                <div
                  className="absolute left-0 top-0 h-full bg-gray-300 rounded-full"
                  style={{ width: '5%' }}
                />
                {/* Barre Firefly (proportionnelle au gain) */}
                <div
                  className="absolute left-0 top-0 h-full bg-[#2ABFAB] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((averageApy / 15) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-gray-400">Livret A</span>
                <span className="text-[#2ABFAB] font-semibold">DeFi Lantern {averageApy.toFixed(2)}%</span>
              </div>
            </div>

            {/* Bouton Ajouter au Dashboard */}
            <button
              onClick={handleAddToDashboard}
              className="btn-primary w-full flex items-center justify-center gap-2 text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              {t('simulator.addToDashboard')}
            </button>
          </div>
        </div>

        {/* ── Graphique de croissance ── */}
        <div className="bg-white rounded-2xl border border-lgrey p-6 shadow-sm">
          <h3 className="font-semibold text-navy mb-6">{t('simulator.chartTitle')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              {/* Dégradé pour la zone Firefly */}
              <defs>
                <linearGradient id="colorFirefly" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2ABFAB" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2ABFAB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F2" />
              <XAxis
                dataKey="month"
                tickFormatter={xTickFormatter}
                tick={{ fontSize: 11, fill: '#1A2332', opacity: 0.5 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k$`}
                tick={{ fontSize: 11, fill: '#1A2332', opacity: 0.5 }}
                axisLine={false}
                tickLine={false}
                width={45}
              />
              <Tooltip content={<ChartTooltip />} />
              <Legend
                formatter={(value) => value === 'firefly'
                  ? t('simulator.firefly')
                  : t('simulator.savingsAccount')
                }
              />

              {/* Zone grise = livret traditionnel */}
              <Area
                type="monotone"
                dataKey="savings"
                stroke="#9CA3AF"
                strokeWidth={1.5}
                fill="url(#colorSavings)"
                strokeDasharray="4 4"
                name="savings"
              />

              {/* Zone teal = Firefly */}
              <Area
                type="monotone"
                dataKey="firefly"
                stroke="#2ABFAB"
                strokeWidth={2.5}
                fill="url(#colorFirefly)"
                name="firefly"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* ── Disclaimer légal ── */}
        <p className="text-xs text-navy/40 text-center mt-6 max-w-2xl mx-auto leading-relaxed">
          {t('simulator.disclaimer')}
        </p>
      </div>

      {/* Toast de confirmation (positionné en fixed dans le coin bas-droit) */}
      <Toast message={t('simulator.addedSuccess')} visible={showToast} />
    </section>
  )
}
