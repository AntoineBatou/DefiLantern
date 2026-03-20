// LanternCursor.jsx — Curseur lanterne avec spotlight pour les profils Dynamic et Airdrop Hunter
//
// Visible quand le profil actif est 'dynamic' (halo violet) ou 'airdropHunter' (halo or).
// Deux éléments visuels suivent la souris avec un léger décalage (lerp = interpolation
// linéaire) pour un effet fluide et organique :
//   1. Un halo radial coloré (spotlight)
//   2. Une petite icône de lanterne
//
// requestAnimationFrame assure des animations à 60fps sans bloquer le thread principal.
// Les refs (mouseRef, posRef) évitent de déclencher des re-renders React à chaque
// mouvement de souris — la mise à jour se fait directement sur les styles DOM.

import { useEffect, useRef } from 'react'
import { useRiskProfile } from '../context/RiskProfileContext'

const cursorTheme = {
  dynamic: {
    spotlight: 'radial-gradient(circle, rgba(124,58,237,0.20) 0%, transparent 65%)',
    glow: 'drop-shadow(0 0 8px rgba(124,58,237,0.8))',
    logo: 'lantern-logo-white.svg',
  },
  airdropHunter: {
    spotlight: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 65%)',
    glow: 'drop-shadow(0 0 8px rgba(255,215,0,0.9))',
    logo: 'lantern-logo-black.svg',
  },
}

export default function LanternCursor() {
  const { profile } = useRiskProfile()

  // Ref pour la position cible (souris)
  const mouseRef = useRef({ x: 0, y: 0 })
  // Ref pour la position actuelle (interpolée)
  const posRef = useRef({ x: 0, y: 0 })
  // Refs vers les éléments DOM (évite les re-renders)
  const spotlightRef = useRef(null)
  const logoRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    // Ne s'active que pour Dynamic et Airdrop Hunter
    if (profile !== 'dynamic' && profile !== 'airdropHunter') return

    // Capture la position de la souris à chaque mouvement
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Boucle d'animation : interpolation vers la position cible
    const animate = () => {
      // lerp = facteur d'interpolation (0.08 = mouvement doux, légèrement en retard)
      const lerp = 0.08
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * lerp
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * lerp

      const { x, y } = posRef.current

      // Mise à jour directe du DOM (plus performant que setState)
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${x - 175}px`  // centré sur le curseur
        spotlightRef.current.style.top  = `${y - 175}px`
      }
      if (logoRef.current) {
        logoRef.current.style.left = `${x + 15}px`  // légèrement décalé
        logoRef.current.style.top  = `${y + 15}px`
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    // Nettoyage au démontage ou changement de profil
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [profile])

  // Ne rien afficher hors des profils concernés
  if (profile !== 'dynamic' && profile !== 'airdropHunter') return null

  const theme = cursorTheme[profile]

  return (
    <>
      {/* Halo radial coloré — suit la souris avec interpolation */}
      <div
        ref={spotlightRef}
        style={{
          position: 'fixed',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: theme.spotlight,
          pointerEvents: 'none',
          zIndex: 1,
          transform: 'translateZ(0)', // force GPU pour fluidité
        }}
        aria-hidden="true"
      />
      {/* Mini logo lanterne — suit la souris légèrement décalé */}
      <img
        ref={logoRef}
        src={`${import.meta.env.BASE_URL}${theme.logo}`}
        alt=""
        style={{
          position: 'fixed',
          height: '2rem',
          pointerEvents: 'none',
          zIndex: 2,
          filter: theme.glow,
          transform: 'translateZ(0)',
        }}
        aria-hidden="true"
      />
    </>
  )
}
