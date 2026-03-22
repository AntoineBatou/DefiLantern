# Architecture — DeFi Lantern Frontend

## Pattern général

**Single-Page Application (SPA)** — React 18 + Vite, client-side rendering.
Pas de backend. Données depuis DeFiLlama API + wagmi (on-chain).

## Hiérarchie des composants

```
App (LangProvider + RiskProfileProvider)
  └── AppContent
      ├── ParachuteOverlay (Airdrop Hunter uniquement)
      ├── LanternCursor (Dynamic uniquement)
      ├── Header (nav + sélecteur profil + langue)
      └── main
          ├── [home]       Hero + HowItWorks + Protocols + Strategy
          ├── [simulator]  Simulator + Dashboard
          ├── [governance] Governance
          ├── [deposit]    Deposit
          ├── [whitepaper] Whitepaper
          ├── [learn]      Learn
          └── Footer
```

## Couches

| Couche | Fichiers | Rôle |
|--------|----------|------|
| Présentation | `src/components/*.jsx` | UI, rendu |
| État global | `src/context/*.jsx` | Lang + RiskProfile |
| Données statiques | `src/data/protocols.js`, `profiles.js` | Protocoles, profils, poids |
| Intégration | `src/hooks/useDefiLlama.js`, `src/config/wagmi.js` | API + wallet |
| i18n | `src/i18n/translations.js` | FR/EN |

## Gestion de l'état

### Contextes globaux
- **LangContext** — `lang` (fr/en), fonction `t(key)`, en mémoire seulement
- **RiskProfileContext** — `profile` actif, dérivés : `profileConfig`, `isDark`, `profileProtocols`, `profileWeights` — persisté en localStorage

### État local (App.jsx)
- `currentPage` — navigation (home/simulator/governance/deposit/whitepaper/learn)
- `positions` — positions simulées (Dashboard), perdu au refresh
- `pendingScroll` — scroll après changement de page

### Mémoïsation
- `profileAverageApy` (App.jsx) — APY pondéré du profil actif
- `profileHistoricalApy` (App.jsx) — APY historique 12 mois pondéré
- `profileProtocols` (RiskProfileContext) — liste filtrée par profil

## Flux de données

### APY live
```
useDefiLlama (mount) → /api/llama/pools (proxy Vite)
  → match par fullPoolId UUID (primaire)
  → match par project/chain/symbol (fallback)
  → apyData { protocolId: { apy, isLive } }
  → props → composants (Hero, Protocols, Simulator)
```

### Changement de profil
```
clic Header → setProfile(id) → RiskProfileContext
  → localStorage 'riskProfile'
  → re-render de tous les consommateurs du contexte
  → Hero/Protocols/Strategy/Simulator mis à jour
```

### Thème
```
profileConfig.theme → App.jsx → className sur <div> racine
  'light' → rien
  'dark' → '.dark' (Dynamic, cyber/neon)
  'christmas' → '.theme-christmas' (Airdrop Hunter, rouge & or)
```

## Décisions architecturales clés

1. **Context > Redux** — 2 concerns globaux seulement, pas besoin de Redux
2. **DeFiLlama = source de vérité** pour les APY live ; fallbackApy si API down
3. **Matching en 2 passes** — fullPoolId UUID (fiable) puis attributs (dégradé gracieux)
4. **Simulator sans persistance** — positions éphémères, pas de smart contract en v1
5. **Thème au niveau racine** — évite les if/else dans chaque composant
