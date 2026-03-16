// Deposit.jsx — Page de dépôt (interface wallet + dépôt USDC / EURC)
//
// Interface mock pour la démo académique.
// - Toggle USDC / EURC
// - Saisie du montant
// - Estimation des shares glUSDC reçues et de l'APY
// - Bouton "Connecter le wallet" (simulé — pas de vraie connexion en v1)
//
// En production : intégrer wagmi + RainbowKit pour la vraie connexion wallet.

import { useState } from 'react'
import { useLang } from '../context/LangContext'

// ── Icônes SVG simples ────────────────────────────────────────────────────────
function UsdcIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <circle cx="12" cy="12" r="12" fill="#2775CA" />
      <path d="M12 4.5C7.86 4.5 4.5 7.86 4.5 12C4.5 16.14 7.86 19.5 12 19.5C16.14 19.5 19.5 16.14 19.5 12C19.5 7.86 16.14 4.5 12 4.5ZM13.5 15.75C13.5 16.16 13.16 16.5 12.75 16.5H11.25C10.84 16.5 10.5 16.16 10.5 15.75V15H9.75C9.34 15 9 14.66 9 14.25V13.5H10.5V14.25H13.5V13.5H10.5C9.67 13.5 9 12.83 9 12V11.25C9 10.42 9.67 9.75 10.5 9.75H10.5V9H13.5V9.75H14.25C14.66 9.75 15 10.09 15 10.5V11.25H13.5V10.5H10.5V11.25H13.5C14.33 11.25 15 11.92 15 12.75V14.25C15 14.66 14.66 15 14.25 15H13.5V15.75Z" fill="white" />
    </svg>
  )
}

function EurcIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <circle cx="12" cy="12" r="12" fill="#2563EB" />
      <text x="12" y="16.5" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">€</text>
    </svg>
  )
}

function WalletIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="6" width="20" height="14" rx="2" />
      <path d="M16 12h2" />
      <path d="M2 10h20" />
      <path d="M6 2l4 4H6" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

// ── Composant principal ────────────────────────────────────────────────────────
export default function Deposit({ averageApy }) {
  const { t } = useLang()

  // Actif sélectionné : 'USDC' ou 'EURC'
  const [asset, setAsset] = useState('USDC')

  // Montant saisi par l'utilisateur
  const [amount, setAmount] = useState('')

  // Simulation de connexion wallet (mock)
  const [walletConnected, setWalletConnected] = useState(false)
  const [mockAddress, setMockAddress] = useState('')

  // Solde simulé (fictif pour la démo)
  const mockBalances = { USDC: 10000, EURC: 5000 }

  // ── Calculs ────────────────────────────────────────────────────────────────
  const numAmount = parseFloat(amount) || 0
  // glUSDC reçus : 1:1 au dépôt (le prix du share évolue ensuite)
  const glUsdcReceived = numAmount
  // Rendement annuel estimé
  const estimatedYield = numAmount * (averageApy / 100)

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleMax = () => {
    setAmount(mockBalances[asset].toString())
  }

  const handleConnectWallet = () => {
    // Simulation : génère une adresse mock
    const mockAddr = '0x' + Math.random().toString(16).slice(2, 12).toUpperCase() + '...'
    setMockAddress(mockAddr)
    setWalletConnected(true)
  }

  const handleDeposit = () => {
    // Mock : en v1 pas de vraie transaction
    alert(`[Démo académique] Dépôt simulé : ${numAmount} ${asset} → ${glUsdcReceived.toFixed(2)} glUSDC\n\nCette interface est un prototype — aucun vrai fonds n'est déplacé.`)
  }

  const apyColor =
    averageApy >= 7 ? 'text-green-600' : averageApy >= 4 ? 'text-[#F5A623]' : 'text-gray-500'

  return (
    <section id="deposit" className="section bg-white">
      <div className="container-main">

        {/* ── En-tête ── */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-navy mb-4">
            {t('deposit.title')}
          </h2>
          <p className="text-navy/60 max-w-xl mx-auto">
            {t('deposit.subtitle')}
          </p>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#2ABFAB]" aria-hidden="true" />
        </div>

        {/* ── Layout : formulaire + explications ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">

          {/* ── Formulaire de dépôt ── */}
          <div className="bg-bg rounded-3xl p-6 sm:p-8 flex flex-col gap-6">

            {/* Wallet */}
            <div className="flex items-center justify-between">
              {walletConnected ? (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded-full px-4 py-2">
                  <CheckIcon />
                  <span className="text-sm font-medium">{mockAddress}</span>
                </div>
              ) : (
                <button
                  onClick={handleConnectWallet}
                  className="flex items-center gap-2 bg-navy text-white rounded-full px-4 py-2 hover:bg-navy/80 transition-colors text-sm font-medium"
                >
                  <WalletIcon />
                  {t('deposit.connectWallet')}
                </button>
              )}
              <div className="text-xs text-navy/40">
                {t('deposit.balance')} :{' '}
                <span className="font-medium text-navy/60">
                  {walletConnected ? mockBalances[asset].toLocaleString() : '—'} {asset}
                </span>
              </div>
            </div>

            {/* Toggle USDC / EURC */}
            <div>
              <label className="text-xs font-semibold text-navy/50 uppercase tracking-wider mb-2 block">
                {t('deposit.assetLabel')}
              </label>
              <div className="flex gap-2">
                {/* USDC — actif */}
                <button
                  onClick={() => { setAsset('USDC'); setAmount('') }}
                  className={`flex items-center gap-2 flex-1 justify-center px-4 py-3 rounded-2xl border-2 transition-all font-medium text-sm ${
                    asset === 'USDC'
                      ? 'border-[#2ABFAB] bg-white text-navy shadow-sm'
                      : 'border-lgrey bg-white/50 text-navy/50 hover:border-[#2ABFAB]/50'
                  }`}
                >
                  <UsdcIcon />
                  USDC
                </button>

                {/* EURC — coming soon */}
                <div className="relative flex-1">
                  <button
                    disabled
                    className="w-full flex items-center gap-2 justify-center px-4 py-3 rounded-2xl border-2 border-dashed border-lgrey bg-gray-50 text-navy/30 font-medium text-sm cursor-not-allowed"
                  >
                    <EurcIcon />
                    EURC
                  </button>
                  <span className="absolute -top-2 -right-1 bg-navy/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Bientôt
                  </span>
                </div>
              </div>
            </div>

            {/* Montant */}
            <div>
              <label className="text-xs font-semibold text-navy/50 uppercase tracking-wider mb-2 block">
                {t('deposit.amountLabel')}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  className="w-full bg-white border-2 border-lgrey rounded-2xl px-4 py-4 text-2xl font-bold text-navy placeholder-navy/20 focus:outline-none focus:border-[#2ABFAB] transition-colors pr-24"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    onClick={handleMax}
                    disabled={!walletConnected}
                    className="text-xs font-bold text-[#2ABFAB] hover:text-[#22A898] disabled:text-navy/30 transition-colors"
                  >
                    {t('deposit.maxBtn')}
                  </button>
                  <span className="text-sm font-semibold text-navy/60">{asset}</span>
                </div>
              </div>
            </div>

            {/* Résumé */}
            {numAmount > 0 && (
              <div className="bg-white rounded-2xl border border-lgrey p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-navy/60">{t('deposit.receiveLabel')}</span>
                  <span className="font-bold text-navy">
                    {glUsdcReceived.toLocaleString()} glUSDC
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-navy/60">{t('deposit.apyEstLabel')}</span>
                  <span className={`font-bold ${apyColor}`}>
                    {averageApy.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-navy/60">Rendement / an (est.)</span>
                  <span className="font-bold text-green-600">
                    +{estimatedYield.toFixed(2)} {asset}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-lgrey">
                  <span className="text-sm text-navy/60">Répartition</span>
                  <span className="text-xs font-medium text-navy/60 bg-navy/5 rounded-full px-3 py-1">
                    {t('deposit.protocolCount')} × 10%
                  </span>
                </div>
              </div>
            )}

            {/* Bouton dépôt */}
            {walletConnected ? (
              <button
                onClick={handleDeposit}
                disabled={numAmount <= 0}
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t('deposit.depositBtn')} {numAmount > 0 ? `${numAmount.toLocaleString()} ${asset}` : ''}
              </button>
            ) : (
              <div className="text-center text-sm text-navy/40 border-2 border-dashed border-lgrey rounded-2xl p-4">
                {t('deposit.connectFirst')}
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-center text-xs text-navy/30">
              ⚠️ {t('deposit.disclaimer')}
            </p>
          </div>

          {/* ── Explications ── */}
          <div className="flex flex-col gap-6">

            {/* Comment ça marche */}
            <div className="bg-bg rounded-3xl p-6">
              <h3 className="font-bold text-navy mb-4">{t('deposit.howItWorks')}</h3>
              <div className="flex flex-col gap-4">
                {[
                  { num: '1', text: t('deposit.step1') },
                  { num: '2', text: t('deposit.step2') },
                  { num: '3', text: t('deposit.step3') },
                  { num: '4', text: t('deposit.step4') },
                ].map(({ num, text }) => (
                  <div key={num} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#2ABFAB] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {num}
                    </div>
                    <p className="text-sm text-navy/70 pt-1">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* APY estimé global */}
            <div className="bg-navy rounded-3xl p-6 text-white text-center">
              <div className="text-sm text-white/60 mb-2">{t('deposit.apyEstLabel')} global</div>
              <div className={`text-5xl font-black mb-2 ${apyColor}`}>
                {averageApy.toFixed(2)}%
              </div>
              <div className="text-xs text-white/50">
                Moyenne live DeFiLlama · {t('deposit.protocolCount')}
              </div>
            </div>

            {/* Assets supportés */}
            <div className="bg-bg rounded-3xl p-6">
              <h3 className="font-bold text-navy mb-4 text-sm">Assets supportés</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-lgrey">
                  <UsdcIcon />
                  <div>
                    <div className="font-semibold text-navy text-sm">USDC</div>
                    <div className="text-xs text-navy/50">USD Coin — Circle</div>
                  </div>
                  <span className="ml-auto badge bg-green-100 text-green-700">Supporté</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-lgrey">
                  <EurcIcon />
                  <div>
                    <div className="font-semibold text-navy text-sm">EURC</div>
                    <div className="text-xs text-navy/50">Euro Coin — Circle</div>
                  </div>
                  <span className="ml-auto badge bg-green-100 text-green-700">Supporté</span>
                </div>
              </div>
              <p className="text-xs text-navy/40 mt-3">
                EURC est converti en USDC via un swap intégré avant allocation. Les rendements sont reversés dans l'actif déposé.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
