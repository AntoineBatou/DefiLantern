// ParachuteOverlay.jsx — Overlay de parachutes décoratifs
//
// Rendu uniquement quand le thème actif est 'christmas' (profil Airdrop Hunter).
// Les parachutes tombent lentement depuis le haut de l'écran avec des délais variés
// pour créer un effet de profondeur et de mouvement organique.
// position: fixed → les parachutes restent à l'écran pendant le scroll.
// z-index: 1 → derrière le header (z-50) mais devant le contenu de page.

import { useRiskProfile } from '../context/RiskProfileContext'

// Configuration des 5 parachutes : position horizontale, délai, durée
// Valeurs choisies pour un effet naturel non-synchronisé
const PARACHUTES = [
  { left: '8%',  delay: '0s',  duration: '18s' },
  { left: '22%', delay: '5s',  duration: '22s' },
  { left: '50%', delay: '10s', duration: '19s' },
  { left: '70%', delay: '3s',  duration: '24s' },
  { left: '88%', delay: '14s', duration: '20s' },
]

export default function ParachuteOverlay() {
  const { profileConfig } = useRiskProfile()

  // Ne rien afficher si on n'est pas dans le thème Christmas
  if (profileConfig?.theme !== 'christmas') return null

  return (
    <>
      {PARACHUTES.map((p, i) => (
        <span
          key={i}
          className="parachute-element"
          style={{
            left: p.left,
            top: 0,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
          aria-hidden="true"
        >
          🪂
        </span>
      ))}
    </>
  )
}
