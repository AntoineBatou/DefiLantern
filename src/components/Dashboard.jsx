// Dashboard.jsx — Dashboard des positions simulées
//
// Fonctionnalités :
// - État vide avec illustration et bouton vers le simulateur
// - Si positions : résumé (total déposé, rendement, APY pondéré)
// - Tableau des positions avec suppression
// - Graphique à barres des rendements par position
// - Mini donut de composition du portefeuille

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { useLang } from '../context/LangContext'
import { RETAINED_PROTOCOLS, DONUT_COLORS } from '../data/protocols'

// ── Composant état vide ────────────────────────────────────────────────────────
function EmptyState() {
  const { t } = useLang()

  return (
    <div className="text-center py-20">
      {/* Illustration SVG simple d'une luciole qui attend */}
      <div className="mb-6" aria-hidden="true">
        <svg
          viewBox="0 0 120 120"
          className="w-32 h-32 mx-auto opacity-20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="60" cy="60" r="50" stroke="#28B092" strokeWidth="2" strokeDasharray="8 4" />
          <circle cx="60" cy="60" r="20" fill="#F5A623" opacity="0.5" />
          <circle cx="60" cy="60" r="8" fill="#F5A623" />
          <line x1="60" y1="10" x2="60" y2="40" stroke="#28B092" strokeWidth="1.5" />
          <line x1="60" y1="80" x2="60" y2="110" stroke="#28B092" strokeWidth="1.5" />
          <line x1="10" y1="60" x2="40" y2="60" stroke="#28B092" strokeWidth="1.5" />
          <line x1="80" y1="60" x2="110" y2="60" stroke="#28B092" strokeWidth="1.5" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-navy mb-2">{t('dashboard.emptyTitle')}</h3>
      <p className="text-navy/50 mb-8 max-w-sm mx-auto">{t('dashboard.emptyDesc')}</p>
      <a href="#simulator" className="btn-primary inline-flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10A1 1 0 019 9z" clipRule="evenodd" />
        </svg>
        {t('dashboard.emptyBtn')}
      </a>
    </div>
  )
}

// ── Composant carte de stat résumé ─────────────────────────────────────────────
function StatCard({ label, value, sub, accent = false }) {
  return (
    <div className={`rounded-2xl p-5 ${accent ? 'bg-teal-light border border-teal-200' : 'bg-white border border-lgrey'} shadow-sm`}>
      <div className="text-xs text-navy/50 mb-1">{label}</div>
      <div className={`text-2xl font-bold ${accent ? 'text-[#28B092]' : 'text-navy'}`}>{value}</div>
      {sub && <div className="text-xs text-navy/40 mt-1">{sub}</div>}
    </div>
  )
}

// ── Composant principal ────────────────────────────────────────────────────────
export default function Dashboard({ positions, onDeletePosition }) {
  const { t } = useLang()

  // Calculs agrégés sur toutes les positions
  const totalDeposited = positions.reduce((sum, p) => sum + p.amount, 0)
  const totalYield = positions.reduce((sum, p) => sum + p.yield, 0)
  // APY moyen pondéré par le montant déposé
  const weightedApy =
    positions.length > 0
      ? positions.reduce((sum, p) => sum + p.apy * p.amount, 0) / totalDeposited
      : 0

  // Format montant
  const fmt = (n) =>
    n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  // Données pour le graphique à barres
  const barData = positions.map((p, i) => ({
    name: `#${i + 1}`,
    rendement: Number(p.yield.toFixed(2)),
    depot: p.amount,
  }))

  // Données pour le mini donut (allocation fixe 10% × 10 protocoles)
  const donutData = RETAINED_PROTOCOLS.map((p, i) => ({
    name: p.name.split(' ')[0],
    value: 10,
    color: DONUT_COLORS[i],
  }))

  return (
    <section id="dashboard" className="section bg-bg">
      <div className="container-main">

        {/* ── En-tête ── */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-navy mb-4">{t('dashboard.title')}</h2>
          <p className="text-navy/60 max-w-xl mx-auto">{t('dashboard.subtitle')}</p>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#28B092]" aria-hidden="true" />
        </div>

        {/* ── Rendu conditionnel : vide ou avec données ── */}
        {positions.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-8">

            {/* ── Note de session ── */}
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {t('dashboard.sessionNote')}
            </div>

            {/* ── Résumé (3 stats) ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                label={t('dashboard.totalDeposited')}
                value={`${fmt(totalDeposited)} $`}
                sub={`${positions.length} position${positions.length > 1 ? 's' : ''}`}
              />
              <StatCard
                label={t('dashboard.totalYield')}
                value={`+${fmt(totalYield)} $`}
                accent
              />
              <StatCard
                label={t('dashboard.weightedApy')}
                value={`${weightedApy.toFixed(2)}%`}
                sub={t('common.perYear')}
              />
            </div>

            {/* ── Tableau des positions ── */}
            <div className="bg-white rounded-2xl border border-lgrey shadow-sm overflow-hidden">
              {/* overflow-x-auto : scroll horizontal sur mobile si le tableau est trop large */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm" role="table" aria-label="Positions simulées">
                  <thead>
                    <tr className="bg-lgrey/50 text-navy/50 text-xs uppercase tracking-wide">
                      <th className="px-4 py-3 text-left font-semibold">{t('dashboard.colDate')}</th>
                      <th className="px-4 py-3 text-right font-semibold">{t('dashboard.colAmount')}</th>
                      <th className="px-4 py-3 text-center font-semibold">{t('dashboard.colDuration')}</th>
                      <th className="px-4 py-3 text-left font-semibold">{t('dashboard.colProtocol')}</th>
                      <th className="px-4 py-3 text-right font-semibold">{t('dashboard.colApy')}</th>
                      <th className="px-4 py-3 text-right font-semibold">{t('dashboard.colYield')}</th>
                      <th className="px-4 py-3 text-right font-semibold">{t('dashboard.colFinal')}</th>
                      <th className="px-4 py-3 text-center font-semibold">—</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-lgrey">
                    {positions.map((position, index) => (
                      <tr
                        key={position.id}
                        className="hover:bg-lgrey/30 transition-colors"
                      >
                        {/* Date */}
                        <td className="px-4 py-3 text-navy/60 whitespace-nowrap">
                          {position.date}
                        </td>

                        {/* Montant déposé */}
                        <td className="px-4 py-3 text-right font-semibold text-navy whitespace-nowrap">
                          {fmt(position.amount)} $
                        </td>

                        {/* Durée */}
                        <td className="px-4 py-3 text-center">
                          <span className="bg-lgrey text-navy/60 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                            {position.duration}
                          </span>
                        </td>

                        {/* Mix protocoles */}
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1.5 whitespace-nowrap">
                            <img src="/logo.png" alt="DeFi Lantern" className="w-4 h-4 object-contain" />
                            <span className="text-navy/70 text-xs">{t('dashboard.protocolMix')}</span>
                          </span>
                        </td>

                        {/* APY */}
                        <td className="px-4 py-3 text-right font-bold text-[#28B092] whitespace-nowrap">
                          {position.apy.toFixed(2)}%
                        </td>

                        {/* Rendement estimé */}
                        <td className="px-4 py-3 text-right font-semibold text-green-600 whitespace-nowrap">
                          +{fmt(position.yield)} $
                        </td>

                        {/* Valeur finale */}
                        <td className="px-4 py-3 text-right font-bold text-navy whitespace-nowrap">
                          {fmt(position.finalValue)} $
                        </td>

                        {/* Bouton supprimer */}
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => onDeletePosition(position.id)}
                            className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 flex items-center justify-center transition-colors mx-auto"
                            aria-label={`Supprimer la position #${index + 1}`}
                            title={t('dashboard.deletePosition')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Graphiques en bas ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Graphique à barres (occupe 2/3) */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-lgrey p-6 shadow-sm">
                <h3 className="font-semibold text-navy mb-6">{t('dashboard.yieldPerPosition')}</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={barData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F2" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: '#1A2332', opacity: 0.5 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tickFormatter={(v) => `${v}$`}
                      tick={{ fontSize: 11, fill: '#1A2332', opacity: 0.5 }}
                      axisLine={false}
                      tickLine={false}
                      width={45}
                    />
                    <Tooltip
                      formatter={(value, name) => [
                        `${fmt(value)} $`,
                        name === 'rendement' ? 'Rendement estimé' : 'Dépôt initial',
                      ]}
                      contentStyle={{
                        borderRadius: '12px',
                        border: '1px solid #EEF2F2',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      }}
                    />
                    {/* Barre dépôt (gris) */}
                    <Bar dataKey="depot" fill="#EEF2F2" radius={[4, 4, 0, 0]} name="depot" />
                    {/* Barre rendement (teal) */}
                    <Bar dataKey="rendement" fill="#28B092" radius={[4, 4, 0, 0]} name="rendement" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Mini donut de composition (occupe 1/3) */}
              <div className="bg-white rounded-2xl border border-lgrey p-6 shadow-sm">
                <h3 className="font-semibold text-navy mb-2">{t('dashboard.portfolioComposition')}</h3>
                <p className="text-xs text-navy/50 mb-4">{t('dashboard.portfolioCaption')}</p>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={1.5}
                      dataKey="value"
                    >
                      {donutData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke="white"
                          strokeWidth={1}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value}%`, name]}
                      contentStyle={{
                        borderRadius: '8px',
                        fontSize: '11px',
                        border: '1px solid #EEF2F2',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Légende texte */}
                <p className="text-center text-xs text-navy/40">Répartition entre {RETAINED_PROTOCOLS.length} protocoles</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
