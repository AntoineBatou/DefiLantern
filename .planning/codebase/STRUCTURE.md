# Structure — DeFi Lantern Frontend

## Arborescence

```
firefly-app/
├── public/
│   ├── favicon.ico
│   ├── lantern-logo-black.svg
│   ├── lantern-logo-white.svg
│   ├── logo.png
│   └── miniature.jpg / .png
│
├── src/
│   ├── main.jsx                    ← Point d'entrée : providers + ErrorBoundary + App
│   ├── App.jsx                     ← Routing pages, apyData, positions, thème
│   ├── index.css                   ← Tailwind + classes globales + thèmes
│   │
│   ├── components/
│   │   ├── Header.jsx              ← Nav sticky + sélecteur profil + langue + burger mobile
│   │   ├── Hero.jsx                ← Landing, APY live, CTA
│   │   ├── HowItWorks.jsx          ← Explication ERC-4626, frais 5%
│   │   ├── Protocols.jsx           ← Grille protocoles + donut allocation
│   │   ├── Strategy.jsx            ← 4 profils, risk tiers
│   │   ├── Simulator.jsx           ← Calculateur rendement + graphe
│   │   ├── Dashboard.jsx           ← Positions simulées + donut composition
│   │   ├── Deposit.jsx             ← Formulaire dépôt + wallet RainbowKit
│   │   ├── Governance.jsx          ← GLOW token, vote params, distribution
│   │   ├── Learn.jsx               ← Section pédagogique (4 modules)
│   │   ├── Whitepaper.jsx          ← Whitepaper intégré (FR + EN)
│   │   ├── ProtocolModal.jsx       ← Modale détail protocole + historique APY
│   │   ├── Footer.jsx              ← Liens + disclaimers
│   │   ├── LanternCursor.jsx       ← Curseur animé (Dynamic uniquement)
│   │   └── ParachuteOverlay.jsx    ← Overlay parachutes (Airdrop Hunter uniquement)
│   │
│   ├── config/
│   │   └── wagmi.js                ← Config wagmi + RainbowKit (chains, projectId)
│   │
│   ├── context/
│   │   ├── LangContext.jsx         ← Langue FR/EN, fonction t(), hook useLang()
│   │   └── RiskProfileContext.jsx  ← Profil actif, dérivés, localStorage, hook useRiskProfile()
│   │
│   ├── data/
│   │   ├── protocols.js            ← 24 protocoles retenus + CATEGORY_COLORS + DONUT_COLORS
│   │   └── profiles.js             ← 4 profils (PROFILES) + PROFILE_PILL_COLORS + poids
│   │
│   ├── hooks/
│   │   └── useDefiLlama.js         ← Fetch APY live DeFiLlama, matching 2 passes, fallback
│   │
│   └── i18n/
│       └── translations.js         ← Objet { fr: {...}, en: {...} } — 15 sections, 300+ clés
│
├── index.html                      ← Racine HTML, <div id="root">, Google Fonts
├── vite.config.js                  ← Build config, proxy /api/llama, port 3000
├── tailwind.config.js              ← Couleurs custom, animations, darkMode: 'class'
├── postcss.config.js               ← tailwindcss + autoprefixer
├── package.json                    ← Dépendances + scripts (dev/build/preview)
└── CLAUDE.md                       ← Instructions projet pour Claude Code
```

## Fichiers clés

| Fichier | Rôle |
|---------|------|
| `src/main.jsx` | Point d'entrée unique, stack de providers |
| `src/App.jsx` | Routing, données globales, thème |
| `src/data/protocols.js` | Configuration de tous les protocoles |
| `src/data/profiles.js` | Profils + poids d'allocation |
| `src/hooks/useDefiLlama.js` | Seul hook avec fetch réseau |
| `src/i18n/translations.js` | Toutes les traductions FR/EN |
