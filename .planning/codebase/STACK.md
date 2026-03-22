# Tech Stack — DeFi Lantern Frontend (firefly-app)

## Language & Runtime

- **Language**: JavaScript (ESM modules)
- **Runtime**: Node.js (development), browser ES2020+
- **Type System**: None (plain JavaScript, no TypeScript)

## Frontend Framework

- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.0
- **Dev Server Port**: 3000 (vite.config.js)
- **Styling**: Tailwind CSS 3.4.0 + PostCSS 8.4.32
- **CSS Processing**: autoprefixer 10.4.16

## Core Dependencies

### React
- `react@^18.2.0` — UI library
- `react-dom@^18.2.0` — DOM rendering
- `@vitejs/plugin-react@^4.2.0` — Fast Refresh

### Web3 & Wallet
- `wagmi@^2.19.5` — React hooks for Ethereum
- `viem@^2.47.5` — Low-level Ethereum provider
- `@rainbow-me/rainbowkit@^2.2.10` — Wallet connection modal

### Data Fetching
- `@tanstack/react-query@^5.91.2` — Async state + caching

### Visualization
- `recharts@^2.10.0` — Charts (APY history)

## Build Configuration

### Vite
- Base: `/`
- Dev proxy: `/api/llama/*` → `https://yields.llama.fi/*` (CORS bypass)

### Tailwind
- Dark mode: `class` strategy
- Custom colors: `navy` (#1A2332), `teal` (#2ABFAB), `amber` (#F5A623), `cyber` palette (violet/cyan)
- Custom animations: `float`, `glow`, `pulse-slow`, `cyber-glow`, `neon-pulse`
- Font: Inter (Google Fonts, weights 300–900)

## State Management

No external library. React Context only:
- `LangContext` — FR/EN language toggle
- `RiskProfileContext` — Active risk profile + theme class
- LocalStorage: `riskProfile` persistence

## Data Layer

### Static
- `src/data/protocols.js` — 24 DeFi protocols with DeFiLlama pool IDs, fallback APYs, weights
- `src/data/profiles.js` — 4 risk profiles (Prudent, Balanced, Dynamic, Airdrop Hunter)

### Real-Time
- DeFiLlama API — current + historical APY
- wagmi/viem — on-chain wallet balance (USDC ERC-20)

## Scripts

```
npm run dev      → vite (localhost:3000)
npm run build    → vite build (→ dist/)
npm run preview  → vite preview
```

## Supported Chains

- Ethereum mainnet (primary)
- Sepolia testnet
- Polygon PoS (Alyra demo)
