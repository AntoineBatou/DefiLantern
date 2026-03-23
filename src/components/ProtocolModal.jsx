// ProtocolModal.jsx — Modal de détail d'un protocole
//
// Affiché quand l'utilisateur clique sur une carte protocole.
// Montre : description, APY actuel (live), performance 12 mois glissants.
//
// Données historiques : /api/llama/chart/{poolId}
// Format de réponse : { data: [ { timestamp: "2024-11-14T23:01:13.171Z", apyBase, apy, ... } ] }
// ⚠️ Les timestamps sont des ISO strings, PAS des Unix timestamps.
//
// Logique 12 mois :
//   - Si le protocole a < ~11 mois de données → "Protocole trop récent"
//   - Sinon → moyenne des apyBase sur les 365 derniers jours
//   - Sans poolId connu → "Non disponible"

import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LangContext'
import { CATEGORY_COLORS } from '../data/protocols'

// ── Constantes ────────────────────────────────────────────────────────────────
const ONE_YEAR_MS    = 365 * 24 * 60 * 60 * 1000  // 1 an en millisecondes
const MIN_HISTORY_MS = 330 * 24 * 60 * 60 * 1000  // ~11 mois — seuil "trop récent"

// ── Conversion timestamp → millisecondes ─────────────────────────────────────
// DeFiLlama retourne des ISO strings ("2024-11-14T23:01:13.171Z")
// mais peut aussi retourner des Unix secondes selon l'endpoint
function toMs(timestamp) {
  if (typeof timestamp === 'string') {
    return new Date(timestamp).getTime()
  }
  // Unix secondes → millisecondes
  return timestamp * 1000
}

// ── Badge de risque ───────────────────────────────────────────────────────────
function RiskBadge({ risk }) {
  const { t } = useLang()
  const config = {
    1: { color: 'bg-green-100 text-green-700',  label: t('modal.risk1') },
    2: { color: 'bg-amber-100 text-amber-700',  label: t('modal.risk2') },
    3: { color: 'bg-orange-100 text-orange-700', label: t('modal.risk3') },
  }[risk] || { color: 'bg-gray-100 text-gray-700', label: '—' }

  return (
    <span className={`badge ${config.color}`}>
      Risque {config.label}
    </span>
  )
}

// ── Fetch de l'historique ─────────────────────────────────────────────────────
// Essaie d'abord le proxy Vite (/api/llama), sinon l'URL directe DeFiLlama
async function fetchApyHistory(poolId) {
  if (!poolId) return null
  const urls = [
    `/api/llama/chart/${poolId}`,
    `https://yields.llama.fi/chart/${poolId}`,
  ]
  for (const url of urls) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
      if (!res.ok) continue
      const json = await res.json()
      return json.data || []
    } catch {
      continue
    }
  }
  return null
}

// ── Calcul performance 12 mois glissants ─────────────────────────────────────
// Retourne { avg, tooRecent, dataPoints }
function computeAvg12m(history) {
  if (!history || history.length === 0) {
    return { avg: null, tooRecent: false, dataPoints: 0 }
  }

  const nowMs      = Date.now()
  const oneYearAgo = nowMs - ONE_YEAR_MS

  // Ancienneté du protocole : on prend le MIN sur tous les timestamps
  // car DeFiLlama peut retourner l'historique en ordre décroissant (plus récent d'abord)
  const allMs = history.map((d) => toMs(d.timestamp)).filter((t) => !isNaN(t))
  if (allMs.length === 0) {
    return { avg: null, tooRecent: false, dataPoints: 0 }
  }
  const oldestMs = Math.min(...allMs)

  if (nowMs - oldestMs < MIN_HISTORY_MS) {
    // Moins de ~11 mois de données → trop récent
    return { avg: null, tooRecent: true, dataPoints: history.length }
  }

  // Filtre les points des 12 derniers mois
  const last12m = history.filter((d) => toMs(d.timestamp) >= oneYearAgo)

  // Extrait les APY valides (priorité apyBase, sinon apy ; rejette les outliers)
  const valid = last12m
    .map((d) => d.apyBase ?? d.apy)
    .filter((v) => typeof v === 'number' && !isNaN(v) && v >= 0 && v < 200)

  if (valid.length === 0) {
    return { avg: null, tooRecent: false, dataPoints: 0 }
  }

  const avg = valid.reduce((a, b) => a + b, 0) / valid.length
  return { avg, tooRecent: false, dataPoints: valid.length }
}

// ── Modal principal ────────────────────────────────────────────────────────────
export default function ProtocolModal({ protocol, apyInfo, onClose }) {
  const { t, lang } = useLang()
  const overlayRef = useRef(null)

  const [histResult, setHistResult] = useState({ avg: null, tooRecent: false, dataPoints: 0 })
  const [loadingHistory, setLoadingHistory] = useState(false)

  useEffect(() => {
    if (!protocol) return

    // On utilise le poolId disponible dans apyInfo (live ou connu depuis protocols.js)
    const poolId = apyInfo?.poolId ?? null

    if (poolId) {
      setLoadingHistory(true)
      setHistResult({ avg: null, tooRecent: false, dataPoints: 0 })

      fetchApyHistory(poolId).then((history) => {
        setHistResult(computeAvg12m(history))
        setLoadingHistory(false)
      })
    } else {
      setHistResult({ avg: null, tooRecent: false, dataPoints: 0 })
    }
  }, [protocol, apyInfo])

  // Fermeture Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  if (!protocol) return null

  const apy      = apyInfo?.apy ?? protocol.fallbackApy
  const isLive   = apyInfo?.isLive ?? false
  const desc     = lang === 'fr' ? protocol.descFr : protocol.descEn
  const catColor = CATEGORY_COLORS[protocol.category] || { bg: 'bg-gray-100', text: 'text-gray-700' }

  const apyColor =
    apy >= 7 ? 'text-green-600' : apy >= 4 ? 'text-[#F5A623]' : 'text-gray-500'

  const avg12mColor =
    histResult.avg >= 7 ? 'text-green-600'
    : histResult.avg >= 4 ? 'text-[#F5A623]'
    : 'text-navy'

  const riskColors = { 1: 'text-green-600', 2: 'text-amber-500', 3: 'text-orange-500' }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={protocol.name}
    >
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 flex flex-col gap-5 animate-fadeIn">

        {/* Fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-500 hover:text-navy"
          aria-label={t('modal.close')}
        >
          ✕
        </button>

        {/* En-tête */}
        <div className="flex items-start gap-3 pr-10">
          <div>
            <h2 className="text-xl font-bold text-navy leading-tight">{protocol.name}</h2>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className={`badge ${catColor.bg} ${catColor.text}`}>{protocol.category}</span>
              <RiskBadge risk={protocol.risk} />
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-navy/70 leading-relaxed">{desc}</p>

        {/* ── APY actuel + Performance 12 mois ── */}
        <div className="grid grid-cols-2 gap-3">

          {/* APY actuel */}
          <div className="bg-bg rounded-2xl p-4">
            <div className="text-xs text-navy/50 mb-1">{t('modal.currentApy')}</div>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isLive ? 'bg-green-500 animate-pulse' : 'bg-amber-400'}`} />
              <span className={`text-3xl font-bold ${apyColor}`}>
                {apy.toFixed(2)}%
              </span>
            </div>
            <div className="text-xs text-navy/40 mt-1">
              {isLive ? t('modal.liveSource') : t('modal.estSource')}
            </div>
          </div>

          {/* Performance 12 mois */}
          <div className="bg-bg rounded-2xl p-4">
            <div className="text-xs text-navy/50 mb-1">{t('modal.avg12m')}</div>

            {loadingHistory ? (
              <div className="skeleton h-8 w-20 rounded mt-1" />

            ) : histResult.avg !== null ? (
              <>
                <span className={`text-3xl font-bold ${avg12mColor}`}>
                  {histResult.avg.toFixed(2)}%
                </span>
                <div className="text-xs text-navy/40 mt-1">
                  {t('modal.avg12mLabel')}
                  {histResult.dataPoints > 0 && (
                    <span className="ml-1 opacity-60">({histResult.dataPoints}j)</span>
                  )}
                </div>
              </>

            ) : histResult.tooRecent ? (
              <div className="mt-1">
                <span className="text-sm font-medium text-amber-500 block">
                  {t('modal.tooRecent')}
                </span>
                <span className="text-xs text-navy/40">{t('modal.tooRecentDesc')}</span>
              </div>

            ) : (
              <span className="text-sm text-navy/40 mt-2 block">{t('modal.noHistory')}</span>
            )}
          </div>
        </div>

        {/* ── Allocation + Risque + Chain ── */}
        <div className="flex items-center justify-between border-t border-lgrey pt-4">
          <div className="text-center">
            <div className="text-xs text-navy/40 mb-1">{t('modal.allocationLabel')}</div>
            <div className="text-2xl font-bold text-navy">{protocol.allocation}%</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-navy/40 mb-1">{t('modal.riskLabel')}</div>
            <div className={`text-2xl font-bold ${riskColors[protocol.risk] || 'text-gray-500'}`}>
              {protocol.risk}/6
            </div>
            <div className="text-xs text-navy/30 mt-0.5">{t('modal.riskContext')}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-navy/40 mb-1">Blockchain</div>
            <div className="text-lg font-bold text-navy">Ethereum</div>
          </div>
        </div>

        {/* CTA */}
        <a
          href={protocol.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-center"
        >
          {t('modal.learnMore')} ↗
        </a>
      </div>
    </div>
  )
}
