// Deposit.jsx — Page de dépôt (interface wallet + dépôt USDC / EURC)
//
// Connexion wallet réelle via wagmi + RainbowKit.
// - ConnectButton RainbowKit : MetaMask, Rabby, Coinbase, WalletConnect…
// - useAccount : adresse et statut de connexion
// - useBalance : solde USDC on-chain (Ethereum mainnet / Sepolia / Polygon)
// - Le dépôt reste simulé (bouton mock) — aucun contrat déployé en v1 académique

import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useChainId } from 'wagmi'
import { useLang } from '../context/LangContext'
import { useRiskProfile } from '../context/RiskProfileContext'
import { PROFILES, PROFILE_PILL_COLORS } from '../data/profiles'
import { useVault } from '../hooks/useVault'

// ── Icônes SVG simples ────────────────────────────────────────────────────────
function UsdcIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <circle cx="12" cy="12" r="12" fill="#2775CA" />
      <path d="M12 4.5C7.86 4.5 4.5 7.86 4.5 12C4.5 16.14 7.86 19.5 12 19.5C16.14 19.5 19.5 16.14 19.5 12C19.5 7.86 16.14 4.5 12 4.5ZM13.5 15.75C13.5 16.16 13.16 16.5 12.75 16.5H11.25C10.84 16.5 10.5 16.16 10.5 15.75V15H9.75C9.34 15 9 14.66 9 14.25V13.5H10.5V14.25H13.5V13.5H10.5C9.67 13.5 9 12.83 9 12V11.25C9 10.42 9.67 9.75 10.5 9.75H10.5V9H13.5V9.75H14.25C14.66 9.75 15 10.09 15 10.5V11.25H13.5V10.5H10.5V11.25H13.5C14.33 11.25 15 11.92 15 12.75V14.25C15 14.66 14.66 15 14.25 15H13.5V15.75Z" fill="white" />
    </svg>
  )
}

// ── Composant principal ────────────────────────────────────────────────────────
export default function Deposit({ averageApy }) {
  const { t } = useLang()
  const { profile, setProfile, profileConfig } = useRiskProfile()
  const shareToken = profileConfig.shareToken

  // ── Wagmi : état du wallet réel ──────────────────────────────────────────
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const isSepolia = chainId === 11155111

  // ── Hook vault : lecture + écriture on-chain ─────────────────────────────
  const {
    deposit,
    withdraw,
    faucet,
    isPending,
    error: vaultError,
    usdcBalance,
    sharesBalance,
    sharePrice,
    isSepoliaSupported,
  } = useVault()

  const handleFaucet = async () => {
    try {
      setTxStep('Mint de 1 000 USDC de test...')
      await faucet()
      setTxStep('1 000 USDC reçus !')
      setTimeout(() => setTxStep(''), 3000)
    } catch (e) {
      setTxStep('Erreur — ce token testnet ne supporte pas le mint direct.')
      setTimeout(() => setTxStep(''), 4000)
    }
  }

  // Mode : dépôt ou retrait
  const [mode, setMode] = useState('deposit')

  // Actif sélectionné (USDC uniquement pour l'instant)
  const [asset] = useState('USDC')

  // Montant saisi par l'utilisateur
  const [amount, setAmount] = useState('')
  const [txStep, setTxStep] = useState('') // message d'étape pendant la tx

  // ── Calculs ────────────────────────────────────────────────────────────────
  const numAmount = parseFloat(amount) || 0
  const glUsdcReceived = numAmount
  const estimatedYield = numAmount * ((averageApy ?? 0) / 100)

  // Solde affiché : USDC Aave testnet sur Sepolia, sinon '—'
  const usdcBalNum = parseFloat(usdcBalance)
  const usdcBalanceFormatted = isSepolia && isSepoliaSupported && !isNaN(usdcBalNum)
    ? usdcBalNum.toLocaleString('fr-FR', { maximumFractionDigits: 2 })
    : '—'

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleMax = () => {
    if (!isConnected) return
    if (mode === 'withdraw') {
      if (parseFloat(sharesBalance) > 0) setAmount(sharesBalance)
    } else {
      if (parseFloat(usdcBalance) > 0) setAmount(usdcBalance)
    }
  }

  const handleDeposit = async () => {
    if (!isSepolia || !isSepoliaSupported) {
      alert('Connecte-toi au réseau Sepolia pour utiliser la démo on-chain.')
      return
    }
    try {
      setTxStep('Étape 1/2 — Autorisation USDC...')
      await deposit(numAmount)
      setTxStep(`Dépôt réussi ! Tu as reçu ${glUsdcReceived.toFixed(2)} glUSD-P`)
      setAmount('')
      setTimeout(() => setTxStep(''), 5000)
    } catch (e) {
      setTxStep('Transaction annulée ou échouée.')
      setTimeout(() => setTxStep(''), 3000)
    }
  }

  const handleWithdraw = async () => {
    if (!isSepolia || !isSepoliaSupported) {
      alert('Connecte-toi au réseau Sepolia pour utiliser la démo on-chain.')
      return
    }
    try {
      setTxStep('Retrait en cours...')
      await withdraw(numAmount)
      setTxStep(`Retrait réussi ! ${numAmount.toFixed(2)} USDC reçus`)
      setAmount('')
      setTimeout(() => setTxStep(''), 5000)
    } catch (e) {
      setTxStep('Transaction annulée ou échouée.')
      setTimeout(() => setTxStep(''), 3000)
    }
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
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#28B092]" aria-hidden="true" />
        </div>

        {/* ── Wallet — au-dessus de la box, pleine largeur ── */}
        <div className="max-w-4xl mx-auto mb-4 flex items-center justify-between flex-wrap gap-2">
          <ConnectButton
            showBalance={false}
            chainStatus="icon"
            accountStatus="address"
          />
          {isConnected && (
            <div className="text-xs text-navy/40">
              {mode === 'withdraw' ? 'Solde glUSD-P' : t('deposit.balance')} :{' '}
              <span className="font-medium text-navy/60">
                {mode === 'withdraw' ? `${sharesBalance} glUSD-P` : `${usdcBalanceFormatted} USDC`}
              </span>
            </div>
          )}
        </div>

        {/* ── Layout : formulaire + explications ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">

          {/* ── Formulaire de dépôt / retrait ── */}
          <div className="bg-bg rounded-3xl p-6 sm:p-8 flex flex-col gap-6">

            {/* Toggle Déposer / Retirer */}
            <div className="flex rounded-2xl border-2 border-lgrey overflow-hidden">
              <button
                onClick={() => { setMode('deposit'); setAmount('') }}
                className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                  mode === 'deposit'
                    ? 'bg-[#28B092] text-white'
                    : 'bg-white text-navy/50 hover:text-navy'
                }`}
              >
                Déposer
              </button>
              <button
                onClick={() => { setMode('withdraw'); setAmount('') }}
                className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                  mode === 'withdraw'
                    ? 'bg-navy text-white'
                    : 'bg-white text-navy/50 hover:text-navy'
                }`}
              >
                Retirer
              </button>
            </div>

                    {/* Bandeau testnet Sepolia */}
            {isConnected && isSepolia && isSepoliaSupported && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-800">Réseau Sepolia (test)</span>
                  <button
                    onClick={handleFaucet}
                    disabled={isPending}
                    className="text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-full transition-colors disabled:opacity-50"
                  >
                    + 1 000 USDC de test
                  </button>
                </div>
                <div className="text-xs text-amber-700">
                  Solde USDC : <span className="font-bold">{usdcBalance} USDC</span>
                </div>
              </div>
            )}

            {/* Sélecteur de profil */}
            <div>
              <label className="text-xs font-semibold text-navy/50 uppercase tracking-wider mb-2 block">
                Profil de risque
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(PROFILES).map((p) => {
                  const colors = PROFILE_PILL_COLORS[p.id]
                  const isActive = profile === p.id
                  const isPrudent = p.id === 'prudent'
                  return (
                    <div key={p.id} className="relative">
                      <button
                        onClick={() => isPrudent && setProfile(p.id)}
                        disabled={!isPrudent}
                        className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-2xl border-2 transition-all text-left ${
                          !isPrudent
                            ? 'border-lgrey bg-gray-50 text-navy/30 cursor-not-allowed'
                            : isActive
                            ? 'border-transparent text-white shadow-sm'
                            : 'border-lgrey bg-white/50 text-navy/70 hover:border-navy/20'
                        }`}
                        style={isPrudent && isActive ? { backgroundColor: colors.dot } : {}}
                      >
                        <span className={`text-base flex-shrink-0 ${!isPrudent ? 'grayscale opacity-40' : ''}`}>{p.icon}</span>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold leading-tight truncate">
                            {p.shareToken}
                          </div>
                          <div className={`text-[10px] leading-tight ${isPrudent && isActive ? 'text-white/70' : 'text-navy/40'}`}>
                            {p.apyRange}
                          </div>
                        </div>
                      </button>
                      {!isPrudent && (
                        <span className="absolute -top-2 -right-1 bg-navy/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-full pointer-events-none">
                          Bientôt
                        </span>
                      )}
                    </div>
                  )
                })}
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
                  className="w-full bg-white border-2 border-lgrey rounded-2xl px-4 py-4 text-2xl font-bold text-navy placeholder-navy/20 focus:outline-none focus:border-[#28B092] transition-colors pr-24"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    onClick={handleMax}
                    disabled={!isConnected || (mode === 'withdraw' ? parseFloat(sharesBalance) <= 0 : parseFloat(usdcBalance) <= 0)}
                    className="text-xs font-bold text-[#28B092] hover:text-[#2ABFAB] disabled:text-navy/30 transition-colors"
                  >
                    {t('deposit.maxBtn')}
                  </button>
                  <span className="text-sm font-semibold text-navy/60">{asset}</span>
                </div>
              </div>
              {isConnected && (
                <p className="text-xs text-navy/40 mt-2">
                  Disponible :{' '}
                  <span className="font-medium">
                    {mode === 'withdraw'
                      ? `${sharesBalance} glUSD-P`
                      : `${usdcBalanceFormatted} USDC`}
                  </span>
                </p>
              )}
            </div>

            {/* Résumé */}
            {numAmount > 0 && (
              <div className="bg-white rounded-2xl border border-lgrey p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-navy/60">{t('deposit.receiveLabel')}</span>
                  <span className="font-bold text-navy">
                    {glUsdcReceived.toLocaleString()} {shareToken}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-navy/60">{t('deposit.apyEstLabel')}</span>
                  <span className={`font-bold ${apyColor}`}>
                    {averageApy !== null ? `${averageApy.toFixed(2)}%` : '—'}
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

            {/* Feedback transaction */}
            {txStep && (
              <div className="text-center text-sm font-medium text-[#28B092] bg-[#28B092]/10 rounded-2xl py-3 px-4">
                {txStep}
              </div>
            )}

            {/* Bouton action */}
            {isConnected ? (
              <button
                onClick={mode === 'deposit' ? handleDeposit : handleWithdraw}
                disabled={numAmount <= 0 || isPending}
                className={`disabled:opacity-40 disabled:cursor-not-allowed ${
                  mode === 'withdraw'
                    ? 'bg-navy hover:bg-navy/90 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95'
                    : 'btn-primary'
                }`}
              >
                {isPending
                  ? 'Transaction en cours...'
                  : mode === 'withdraw'
                  ? `Retirer ${numAmount > 0 ? `${numAmount.toLocaleString()} USDC` : ''}`
                  : `${t('deposit.depositBtn')} ${numAmount > 0 ? `${numAmount.toLocaleString()} ${asset}` : ''}`
                }
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
                    <div className="w-7 h-7 rounded-full bg-[#28B092] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
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
                {averageApy !== null ? `${averageApy.toFixed(2)}%` : '—'}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
