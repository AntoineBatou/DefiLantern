// VaultDashboard.jsx — Tableau de bord simplifié du vault Prudent
// Affiche : parts glUSD-P, valeur en USDC, performance depuis le déploiement

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useChainId } from 'wagmi'
import { useVault } from '../hooks/useVault'

function UsdcIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <circle cx="12" cy="12" r="12" fill="#2775CA" />
      <path d="M12 4.5C7.86 4.5 4.5 7.86 4.5 12C4.5 16.14 7.86 19.5 12 19.5C16.14 19.5 19.5 16.14 19.5 12C19.5 7.86 16.14 4.5 12 4.5ZM13.5 15.75C13.5 16.16 13.16 16.5 12.75 16.5H11.25C10.84 16.5 10.5 16.16 10.5 15.75V15H9.75C9.34 15 9 14.66 9 14.25V13.5H10.5V14.25H13.5V13.5H10.5C9.67 13.5 9 12.83 9 12V11.25C9 10.42 9.67 9.75 10.5 9.75H10.5V9H13.5V9.75H14.25C14.66 9.75 15 10.09 15 10.5V11.25H13.5V10.5H10.5V11.25H13.5C14.33 11.25 15 11.92 15 12.75V14.25C15 14.66 14.66 15 14.25 15H13.5V15.75Z" fill="white" />
    </svg>
  )
}

const fmt = (val, decimals = 2) => {
  const n = parseFloat(val)
  if (isNaN(n)) return '—'
  return n.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

export default function VaultDashboard() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const isSepolia = chainId === 11155111

  const {
    sharesBalance,
    sharePrice,
    totalAssets,
    isSepoliaSupported,
  } = useVault()

  // ── Calculs ────────────────────────────────────────────────────────────────
  const shares = parseFloat(sharesBalance) || 0
  const price  = parseFloat(sharePrice)   || 1.0
  const valueUsdc = shares * price

  // Performance = gain du share depuis le déploiement (base 1.000000 USDC)
  const perfPct = ((price - 1.0) / 1.0) * 100
  const perfPositive = perfPct >= 0

  const hasPosition = shares > 0

  return (
    <section className="section bg-white min-h-[70vh]">
      <div className="container-main max-w-2xl mx-auto">

        {/* ── En-tête ── */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-navy mb-3">Tableau de bord</h2>
          <p className="text-navy/50 text-sm">Suivez votre position dans le Vault Prudent</p>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#28B092]" />
        </div>

        {/* ── Wallet ── */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <ConnectButton showBalance={false} chainStatus="icon" accountStatus="address" />
          {isConnected && isSepolia && isSepoliaSupported && (
            <span className="text-xs bg-amber-50 border border-amber-200 text-amber-700 font-semibold px-3 py-1 rounded-full">
              Réseau Sepolia (test)
            </span>
          )}
        </div>

        {/* ── Pas connecté ── */}
        {!isConnected && (
          <div className="bg-bg rounded-3xl p-10 text-center text-navy/40 border-2 border-dashed border-lgrey">
            <div className="text-4xl mb-3">🔗</div>
            <p className="font-medium">Connectez votre wallet pour voir votre position</p>
          </div>
        )}

        {/* ── Connecté mais pas de position ── */}
        {isConnected && !hasPosition && (
          <div className="bg-bg rounded-3xl p-10 text-center text-navy/40 border-2 border-dashed border-lgrey">
            <div className="text-4xl mb-3">📭</div>
            <p className="font-medium text-navy/50">Aucune position dans le Vault Prudent</p>
            <p className="text-sm mt-1">Déposez des USDC pour commencer à générer du rendement</p>
          </div>
        )}

        {/* ── Position active ── */}
        {isConnected && hasPosition && (
          <div className="flex flex-col gap-4">

            {/* Carte principale */}
            <div className="bg-navy rounded-3xl p-6 text-white">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-lg">🛡️</span>
                <span className="font-bold text-white/90">Vault Prudent — glUSD-P</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Parts */}
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="text-xs text-white/50 mb-1 uppercase tracking-wide">Mes parts</div>
                  <div className="text-2xl font-black text-white">{fmt(sharesBalance)}</div>
                  <div className="text-xs text-white/40 mt-1">glUSD-P</div>
                </div>

                {/* Valeur */}
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="text-xs text-white/50 mb-1 uppercase tracking-wide">Valeur actuelle</div>
                  <div className="text-2xl font-black text-white flex items-center gap-1">
                    <UsdcIcon size={18} />
                    {fmt(valueUsdc)}
                  </div>
                  <div className="text-xs text-white/40 mt-1">USDC</div>
                </div>
              </div>
            </div>

            {/* Détails */}
            <div className="bg-bg rounded-3xl p-6 flex flex-col gap-4">

              <div className="flex items-center justify-between py-3 border-b border-lgrey">
                <span className="text-sm text-navy/60">Prix par part (glUSD-P)</span>
                <span className="font-bold text-navy">{fmt(sharePrice, 6)} USDC</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-lgrey">
                <span className="text-sm text-navy/60">Performance du vault</span>
                <span className={`font-bold text-lg ${perfPositive ? 'text-green-600' : 'text-red-500'}`}>
                  {perfPositive ? '+' : ''}{fmt(perfPct, 4)} %
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-navy/60">Total dans le vault</span>
                <span className="font-semibold text-navy">{fmt(totalAssets)} USDC</span>
              </div>
            </div>

            {/* Note explicative */}
            <p className="text-center text-xs text-navy/30 px-4">
              La performance est calculée depuis le déploiement du vault (prix initial 1,000000 USDC/part).
              Chaque harvest augmente mécaniquement la valeur de chaque part.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
