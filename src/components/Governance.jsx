// Governance.jsx — Section gouvernance & token FLY
//
// Explique :
// - Comment les utilisateurs gagnent des FLY en déposant
// - Les décisions soumises au vote on-chain
// - Les paramètres de gouvernance (quorum, délai…)
// - La sécurité (timelock 48h + Guardian pause-only)
// - La distribution de la supply FLY

import { useLang } from '../context/LangContext'

// ── Distribution FLY ──────────────────────────────────────────────────────────
const DISTRIBUTION = [
  { key: 'community', color: '#2ABFAB', pct: 30 },
  { key: 'treasury',  color: '#F5A623', pct: 40 },
  { key: 'team',      color: '#22A898', pct: 20 },
  { key: 'ecosystem', color: '#F7B94A', pct: 10 },
]

// ── Mini donut SVG ────────────────────────────────────────────────────────────
function DonutChart() {
  const cx = 60, cy = 60, r = 48, stroke = 20
  const circumference = 2 * Math.PI * r

  let offset = 0
  const slices = DISTRIBUTION.map(({ pct, color }) => {
    const dash = (pct / 100) * circumference
    const gap  = circumference - dash
    const slice = { color, dash, gap, offset }
    offset += dash
    return slice
  })

  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 flex-shrink-0 -rotate-90">
      {slices.map((s, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={s.color}
          strokeWidth={stroke}
          strokeDasharray={`${s.dash} ${s.gap}`}
          strokeDashoffset={-s.offset}
        />
      ))}
    </svg>
  )
}

// ── Bloc paramètre de vote ────────────────────────────────────────────────────
function VoteParam({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-lgrey last:border-0">
      <span className="text-sm text-navy/60">{label}</span>
      <span className="text-sm font-semibold text-navy">{value}</span>
    </div>
  )
}

// ── Composant principal ───────────────────────────────────────────────────────
export default function Governance() {
  const { t } = useLang()

  return (
    <section id="governance" className="py-16 sm:py-24 bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Titre */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            {t('governance.title')}
          </h2>
          <p className="text-lg text-navy/60 max-w-2xl mx-auto">
            {t('governance.subtitle')}
          </p>
        </div>

        {/* ── Ligne 1 : Gagner FLY + Voter ── */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* Gagner des FLY */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-lgrey">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-teal/10 flex items-center justify-center text-teal text-xl font-bold">
                ✦
              </div>
              <h3 className="text-lg font-bold text-navy">{t('governance.earnTitle')}</h3>
            </div>
            <p className="text-sm text-navy/70 leading-relaxed mb-4">
              {t('governance.earnDesc')}
            </p>
            <div className="bg-teal/5 border border-teal/20 rounded-2xl p-4">
              <p className="text-xs text-teal font-medium leading-relaxed">
                ⓘ {t('governance.earnNote')}
              </p>
            </div>
          </div>

          {/* Voter */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-lgrey">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 text-xl font-bold">
                ⚖
              </div>
              <h3 className="text-lg font-bold text-navy">{t('governance.voteTitle')}</h3>
            </div>
            <p className="text-sm text-navy/70 leading-relaxed mb-4">
              {t('governance.voteDesc')}
            </p>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-navy/50 uppercase tracking-wide mb-3">
                {t('governance.actions')}
              </p>
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex items-start gap-2">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-50 text-amber-500 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {n}
                  </span>
                  <span className="text-sm text-navy/70">{t(`governance.action${n}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Ligne 2 : Sécurité + Paramètres + Distribution ── */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Sécurité gouvernance */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-lgrey">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-navy/5 flex items-center justify-center text-navy text-xl">
                🔒
              </div>
              <h3 className="text-base font-bold text-navy">{t('governance.safetyTitle')}</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-navy/3 rounded-2xl p-4">
                <p className="text-xs font-semibold text-navy mb-1">⏱ Timelock 48h</p>
                <p className="text-xs text-navy/60 leading-relaxed">
                  {t('governance.timelockDesc')}
                </p>
              </div>
              <div className="bg-navy/3 rounded-2xl p-4">
                <p className="text-xs font-semibold text-navy mb-1">🛡 Guardian</p>
                <p className="text-xs text-navy/60 leading-relaxed">
                  {t('governance.guardianDesc')}
                </p>
              </div>
            </div>
          </div>

          {/* Paramètres de vote */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-lgrey">
            <h3 className="text-base font-bold text-navy mb-4">{t('governance.paramsTitle')}</h3>
            <VoteParam label={t('governance.quorum')}       value={t('governance.quorumVal')} />
            <VoteParam label={t('governance.threshold')}    value={t('governance.thresholdVal')} />
            <VoteParam label={t('governance.votingPeriod')} value={t('governance.votingPeriodVal')} />
            <VoteParam label={t('governance.timelock')}     value={t('governance.timelockVal')} />
          </div>

          {/* Distribution GLOW */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-lgrey overflow-hidden">
            <h3 className="text-base font-bold text-navy mb-1">{t('governance.tokenTitle')}</h3>
            <p className="text-xs text-navy/40 mb-4">
              {t('governance.totalSupply')} : {t('governance.totalSupplyVal')}
            </p>
            <div className="flex items-center gap-3 min-w-0">
              <DonutChart />
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                {DISTRIBUTION.map(({ key, color, pct }) => (
                  <div key={key} className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-navy/70 block truncate">
                        {t(`governance.${key}`)}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-navy">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
