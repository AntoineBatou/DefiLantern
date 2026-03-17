// Protocols.jsx — Section d'affichage des protocoles avec APY live DeFiLlama
//
// Affiche 11 protocoles retenus + 4 "coming soon"
// Chaque carte est cliquable → ouvre un modal avec détails + historique APY
// Skeleton loading pendant le chargement des APY

import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { useRiskProfile } from '../context/RiskProfileContext'
import { RETAINED_PROTOCOLS, COMING_SOON_PROTOCOLS, CATEGORY_COLORS } from '../data/protocols'
import { PROFILE_PILL_COLORS } from '../data/profiles'
import ProtocolModal from './ProtocolModal'

// ── Composant carte protocole retenu ──────────────────────────────────────────
function ProtocolCard({ protocol, apyData, loading, lang, onClick, profileColor, weight }) {
  const { t } = useLang()

  const apyInfo = apyData[protocol.id]
  const isLive = apyInfo?.isLive ?? false
  const apy = apyInfo?.apy ?? null

  const apyColor =
    apy === null ? '' : apy >= 7 ? 'text-green-600' : apy >= 4 ? 'text-[#F5A623]' : 'text-gray-500'

  const catColor = CATEGORY_COLORS[protocol.category] || {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
  }

  const desc = lang === 'fr' ? protocol.descFr : protocol.descEn

  return (
    <button
      onClick={() => onClick(protocol)}
      className="relative bg-white rounded-2xl border border-lgrey p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col gap-4 text-left w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2ABFAB]"
      aria-label={`Voir les détails de ${protocol.name}`}
    >
      {/* Badge profil */}
      <div
        className="absolute top-2 right-2 w-2 h-2 rounded-full"
        style={{ backgroundColor: profileColor }}
        title="Inclus dans votre profil"
        aria-hidden="true"
      />

      {/* En-tête */}
      <div className="flex items-start justify-between gap-2 pr-4">
        <h3 className="font-semibold text-navy text-sm leading-tight">{protocol.name}</h3>
        <span className={`badge ${catColor.bg} ${catColor.text} whitespace-nowrap flex-shrink-0`}>
          {protocol.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-navy/60 leading-relaxed flex-1 line-clamp-3">{desc}</p>

      {/* APY + Allocation */}
      <div className="flex items-end justify-between pt-2 border-t border-lgrey">
        <div>
          {loading && !apyInfo ? (
            <div className="skeleton h-7 w-16 rounded" />
          ) : (
            <div className="flex items-center gap-1.5">
              {isLive && <span className="w-2 h-2 rounded-full flex-shrink-0 bg-green-500 animate-pulse" />}
              {apy !== null ? (
                <span className={`text-2xl font-bold ${apyColor}`}>{apy.toFixed(2)}%</span>
              ) : (
                <span className="text-2xl font-bold text-navy/30">—</span>
              )}
            </div>
          )}
          <div className="text-xs text-navy/40 mt-0.5">
            {t('protocols.currentApy')}
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-navy">{((weight ?? 0) * 100).toFixed(1)}%</div>
          <div className="text-xs text-navy/40">{t('protocols.allocation')}</div>
        </div>
      </div>
    </button>
  )
}

// ── Composant carte "Coming Soon" ─────────────────────────────────────────────
function ComingSoonCard({ protocol }) {
  const { t } = useLang()
  const catColor = CATEGORY_COLORS[protocol.category] || {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
  }

  return (
    // Carte grisée avec overlay "bientôt disponible"
    <div className="relative bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-5 flex flex-col gap-4 opacity-75">

      {/* Overlay badge "Bientôt" */}
      <div className="absolute top-3 right-3 bg-navy/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
        {t('protocols.comingSoon')}
      </div>

      {/* En-tête */}
      <div className="flex items-start justify-between gap-2 pr-16">
        <h3 className="font-semibold text-navy/60 text-sm leading-tight">
          {protocol.name}
        </h3>
      </div>

      {/* Badge catégorie grisé */}
      <span className={`badge ${catColor.bg} ${catColor.text} self-start`}>
        {protocol.category}
      </span>

      {/* APY placeholder */}
      <div className="flex items-end justify-between pt-2 border-t border-gray-200">
        <div>
          <div className="text-2xl font-bold text-gray-400">—%</div>
          <div className="text-xs text-gray-400 mt-0.5">{t('protocols.underEvaluation')}</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-400">—</div>
          <div className="text-xs text-gray-400">{t('protocols.allocation')}</div>
        </div>
      </div>
    </div>
  )
}

// ── Composant principal ────────────────────────────────────────────────────────
export default function Protocols({ apyData, loading }) {
  const { t, lang } = useLang()
  const { profileProtocols, profile, profileWeights } = useRiskProfile()
  const pillColors = PROFILE_PILL_COLORS[profile]

  const [selectedProtocol, setSelectedProtocol] = useState(null)

  const hasAnyLive = Object.values(apyData).some((v) => v.isLive)
  const selectedApyInfo = selectedProtocol ? apyData[selectedProtocol.id] : null

  return (
    <section id="protocols" className="section bg-bg">
      <div className="container-main">

        {/* En-tête */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-navy mb-4">{t('protocols.title')}</h2>
          <p className="text-navy/60 max-w-xl mx-auto mb-4">{t('protocols.subtitle')}</p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            {/* Badge DeFiLlama */}
            <div className="inline-flex items-center gap-2 bg-white border border-lgrey rounded-full px-4 py-2 shadow-sm">
              {loading ? (
                <>
                  <div className="skeleton w-2 h-2 rounded-full" />
                  <span className="text-xs text-navy/50">{t('protocols.loading')}</span>
                </>
              ) : (
                <>
                  <span className={`w-2 h-2 rounded-full ${hasAnyLive ? 'bg-green-500 animate-pulse' : 'bg-amber-400'}`} />
                  <span className="text-xs text-navy/50">{t('protocols.dataSource')}</span>
                </>
              )}
            </div>

            {/* Badge profil actif */}
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white"
              style={{ backgroundColor: pillColors.dot }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              {profileProtocols.length} protocoles dans votre profil
            </div>
          </div>

          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#2ABFAB]" aria-hidden="true" />
        </div>

        {/* Sous-titre */}
        <div className="mt-10 mb-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-lgrey" />
          <h3 className="text-sm font-semibold text-navy/50 uppercase tracking-wider px-2">
            {t('protocols.retained')} ({profileProtocols.length})
          </h3>
          <div className="flex-1 h-px bg-lgrey" />
        </div>

        {/* Grille des protocoles du profil actif */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {profileProtocols.map((protocol) => (
            <ProtocolCard
              key={protocol.id}
              protocol={protocol}
              apyData={apyData}
              loading={loading}
              lang={lang}
              onClick={setSelectedProtocol}
              profileColor={pillColors.dot}
              weight={profileWeights[protocol.id]}
            />
          ))}
        </div>

        {/* ── Sous-titre "En évaluation" ── */}
        <div className="mt-12 mb-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-lgrey" />
          <h3 className="text-sm font-semibold text-navy/50 uppercase tracking-wider px-2">
            {t('protocols.evaluation')} ({COMING_SOON_PROTOCOLS.length})
          </h3>
          <div className="flex-1 h-px bg-lgrey" />
        </div>

        {/* ── Grille des protocoles coming soon ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMING_SOON_PROTOCOLS.map((protocol) => (
            <ComingSoonCard key={protocol.id} protocol={protocol} />
          ))}
        </div>

        {/* ── Hint "clique pour les détails" ── */}
        <p className="text-center text-xs text-navy/40 mt-6">
          {lang === 'fr'
            ? '💡 Cliquez sur un protocole pour voir ses détails et l\'historique APY'
            : '💡 Click on a protocol to see its details and APY history'}
        </p>
      </div>

      {/* ── Modal ── */}
      {selectedProtocol && (
        <ProtocolModal
          protocol={selectedProtocol}
          apyInfo={selectedApyInfo}
          onClose={() => setSelectedProtocol(null)}
        />
      )}
    </section>
  )
}
