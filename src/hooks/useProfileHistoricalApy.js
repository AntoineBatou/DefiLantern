// useProfileHistoricalApy.js
//
// Calcule la performance pondérée 12 mois glissants d'un profil de risque.
//
// Pour chaque protocole du profil :
//   1. Récupère l'historique APY via DeFiLlama /chart/{poolId}
//   2. Si ≥11 mois de données → moyenne des apyBase sur les 12 derniers mois
//   3. Si trop récent ou pas de poolId → fallback sur l'APY actuel (live ou statique)
// Puis calcule la moyenne pondérée selon les poids du profil.
//
// Les charts sont mis en cache (Map module-level) pour éviter de re-fetcher
// lors des changements de profil dans la même session.
//
// Retourne : { historicalApy: number|null, loading: boolean }

import { useState, useEffect, useRef } from 'react'

const ONE_YEAR_MS    = 365 * 24 * 60 * 60 * 1000
const MIN_HISTORY_MS = 330 * 24 * 60 * 60 * 1000  // ~11 mois

// Cache partagé entre tous les appels du hook dans la session
const chartCache = new Map()

// ── Conversion timestamp → ms ─────────────────────────────────────────────────
function toMs(ts) {
  if (typeof ts === 'string') return new Date(ts).getTime()
  return ts * 1000
}

// ── Fetch chart d'un pool DeFiLlama ──────────────────────────────────────────
async function fetchChart(poolId) {
  if (!poolId) return null
  if (chartCache.has(poolId)) return chartCache.get(poolId)

  const urls = [
    `/api/llama/chart/${poolId}`,
    `https://yields.llama.fi/chart/${poolId}`,
  ]
  for (const url of urls) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) })
      if (!res.ok) continue
      const json = await res.json()
      const data = json.data || []
      chartCache.set(poolId, data)
      return data
    } catch {
      continue
    }
  }
  chartCache.set(poolId, null)
  return null
}

// ── Calcul moyenne 12 mois glissants ─────────────────────────────────────────
// Retourne la moyenne ou null si trop récent / pas de données
function compute12mAvg(history) {
  if (!history || history.length === 0) return null

  const nowMs      = Date.now()
  const oneYearAgo = nowMs - ONE_YEAR_MS

  // Trouve le vrai plus ancien timestamp (ordre API indéterminé)
  const allMs = history.map(d => toMs(d.timestamp)).filter(t => !isNaN(t))
  if (allMs.length === 0) return null

  const oldestMs = Math.min(...allMs)
  if (nowMs - oldestMs < MIN_HISTORY_MS) return null  // trop récent → fallback

  const last12m = history.filter(d => toMs(d.timestamp) >= oneYearAgo)
  const valid   = last12m
    .map(d => d.apyBase ?? d.apy)
    .filter(v => typeof v === 'number' && !isNaN(v) && v >= 0 && v < 200)

  if (valid.length === 0) return null
  return valid.reduce((a, b) => a + b, 0) / valid.length
}

// ── Hook principal ─────────────────────────────────────────────────────────────
export function useProfileHistoricalApy({ profileProtocols, profileWeights, apyData }) {
  const [historicalApy, setHistoricalApy] = useState(null)
  const [loading, setLoading]             = useState(true)
  const cancelledRef = useRef(false)

  useEffect(() => {
    // Attend que les données live soient disponibles
    if (!profileProtocols?.length || Object.keys(apyData).length === 0) return

    cancelledRef.current = false
    setLoading(true)

    async function compute() {
      // Fetch tous les charts en parallèle
      const results = await Promise.all(
        profileProtocols.map(async (protocol) => {
          const poolId  = apyData[protocol.id]?.poolId ?? null
          const history = await fetchChart(poolId)
          const avg12m  = compute12mAvg(history)

          // Fallback : APY live si trop récent, sinon statique
          const fallback = apyData[protocol.id]?.apy ?? protocol.fallbackApy

          return {
            id:  protocol.id,
            apy: avg12m ?? fallback,
            used12m: avg12m !== null,
          }
        })
      )

      if (cancelledRef.current) return

      // Moyenne pondérée (les poids somment déjà à 1.0)
      const weighted = results.reduce((sum, r) => {
        const w = profileWeights[r.id] ?? 0
        return sum + w * r.apy
      }, 0)

      setHistoricalApy(weighted)
      setLoading(false)
    }

    compute()
    return () => { cancelledRef.current = true }
  }, [
    // Re-calcule si le profil ou les données live changent
    // eslint-disable-next-line react-hooks/exhaustive-deps
    profileProtocols?.map(p => p.id).join(','),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.keys(apyData).length,
  ])

  return { historicalApy, loading }
}
