// useDefiLlama.js — Hook pour récupérer les APY en temps réel depuis DeFiLlama
//
// Retourne : { apyData, loading, error, averageApy, hasLiveData }
//
// apyData : { protocolId: { apy, isLive, poolId } }
//   - apy     : APY courant (live ou fallback)
//   - isLive  : true si données fraîches de l'API
//   - poolId  : UUID DeFiLlama complet → utilisé par ProtocolModal pour fetcher l'historique
//               Disponible même quand isLive = false (via llamaConfig.fullPoolId)
//
// Matching en deux passes :
//   1. Par fullPoolId (UUID complet) — le plus fiable
//   2. Par project + chain + symbol + contains — fallback
//
// Note : DeFiLlama autorise access-control-allow-origin: * → pas besoin de proxy.
// L'ancien proxy Vite (/api/llama) causait un bug en production : Vercel renvoyait
// index.html (200 OK) au lieu d'un 404, ce qui faisait échouer le JSON.parse.

import { useState, useEffect } from 'react'
import { RETAINED_PROTOCOLS } from '../data/protocols'

const DEFILLAMA_URL = 'https://yields.llama.fi/pools'

// ── Matching de pool ──────────────────────────────────────────────────────────
function findPool(pools, config) {
  // Passe 1 : matching par UUID complet (prioritaire)
  if (config.fullPoolId) {
    const byId = pools.find((p) => p.pool === config.fullPoolId)
    if (byId) return byId
  }

  // Passe 2 : matching par attributs
  return pools.find((pool) => {
    const projectMatch = config.project
      ? pool.project?.toLowerCase() === config.project.toLowerCase()
      : true
    const chainMatch = config.chain
      ? pool.chain?.toLowerCase() === config.chain.toLowerCase()
      : true
    const symbolMatch = config.symbol
      ? pool.symbol?.toLowerCase().includes(config.symbol.toLowerCase())
      : true
    const containsMatch = config.contains
      ? pool.poolMeta?.toLowerCase().includes(config.contains.toLowerCase()) ||
        pool.symbol?.toLowerCase().includes(config.contains.toLowerCase())
      : true
    return projectMatch && chainMatch && symbolMatch && containsMatch
  })
}

// ── Hook principal ────────────────────────────────────────────────────────────
export function useDefiLlama() {
  const [apyData, setApyData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchApys() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(DEFILLAMA_URL, { signal: AbortSignal.timeout(10000) })
        if (!response.ok) throw new Error(`DeFiLlama API error: ${response.status}`)

        const json = await response.json()
        const pools = json.data || []

        if (cancelled) return

        const result = {}

        for (const protocol of RETAINED_PROTOCOLS) {
          const pool = findPool(pools, protocol.llamaConfig)

          if (pool) {
            const apy = pool.apyBase ?? pool.apy ?? protocol.fallbackApy
            result[protocol.id] = {
              apy: Number(apy.toFixed(2)),
              isLive: true,
              // UUID complet de l'API (pour le chart historique)
              poolId: pool.pool,
            }
          } else {
            result[protocol.id] = {
              apy: protocol.fallbackApy,
              isLive: false,
              // UUID connu depuis protocols.js (permet quand même de fetcher l'historique)
              poolId: protocol.llamaConfig?.fullPoolId ?? null,
            }
          }
        }

        setApyData(result)
      } catch (err) {
        if (cancelled) return

        console.warn('DeFiLlama fetch failed, using fallback APYs:', err.message)
        setError(err.message)

        // En cas d'erreur : fallbacks statiques mais on garde les poolIds connus
        const fallbackResult = {}
        for (const protocol of RETAINED_PROTOCOLS) {
          fallbackResult[protocol.id] = {
            apy: protocol.fallbackApy,
            isLive: false,
            poolId: protocol.llamaConfig?.fullPoolId ?? null,
          }
        }
        setApyData(fallbackResult)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchApys()
    return () => { cancelled = true }
  }, [])

  // Moyenne des APY
  const averageApy = (() => {
    const values = Object.values(apyData)
    if (values.length === 0) {
      const sum = RETAINED_PROTOCOLS.reduce((acc, p) => acc + p.fallbackApy, 0)
      return Number((sum / RETAINED_PROTOCOLS.length).toFixed(2))
    }
    const sum = values.reduce((acc, v) => acc + v.apy, 0)
    return Number((sum / values.length).toFixed(2))
  })()

  const hasLiveData = Object.values(apyData).some((v) => v.isLive)

  return { apyData, loading, error, averageApy, hasLiveData }
}
