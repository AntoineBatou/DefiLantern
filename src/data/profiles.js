// profiles.js — Configuration des 4 profils de risque
//
// Architecture : chaque profil définit une liste explicite de protocoles
// et leurs poids d'allocation (sum = 1.0 = 100%).
//
// Prudent       : 10 protocoles (lending, savings, RWA, delta-neutral audité)
// Dynamic       : 10 protocoles (fractional reserve, crédit institutionnel, tranches junior)
// Balanced      : 50% capital Prudent + 50% capital Dynamic (20 protocoles, aucun exclusif)
// RewardsHunter : 4 protocoles innovants avec potentiel tokenomics
//
// Note : la répartition par profil est basée sur le RISQUE de la stratégie
// (levier, collatéral, ancienneté, mécanisme) et NON sur le yield.
//
// Règle de pondération :
//   - Poids égaux pour tous les protocoles standard (≤ 15% max)
//   - Exceptions (score < 8/12 ou TVL insuffisante) → allocation réduite à 5%
//   - RewardsHunter : 25% par protocole (répartition équitable)

// ── Listes de protocoles par profil ────────────────────────────────────────
// Les IDs correspondent au champ `id` dans protocols.js

const PRUDENT_PROTOCOL_IDS = [
  'aave-v3',
  'morpho-gauntlet',   // Gauntlet Prime (blue-chip only)
  'morpho-steakhouse',
  'susds',
  'susde',
  'cusdo',
  'sbold',             // Liquity v2, immutable, 3 audits Tier-1
  'scrvusd',           // Curve savings rate, ERC-4626
  'fxsave',            // Exception TVL ($53M) : 16 audits + ERC-4626 + Aladdin DAO 2021
  'thbill',            // Exception score : T-bills AAA, Standard Chartered, cap 5%
]

const DYNAMIC_PROTOCOL_IDS = [
  'snusd',
  'syrupusdc',         // KYC requis — accepté en Dynamic
  'jrusde',
  'susd3',
  'imusd',
  'reusde',
  'stkusdc',
  'susdai',            // Aussi dans Rewards Hunter (CHIP token)
  'infinifi',          // siUSD fractional reserve — TGE 2026
  'reservoir',         // srUSD CDP stablecoin — token DAM lancé
]

const REWARDS_HUNTER_PROTOCOL_IDS = [
  'sierra',
  'cap',               // stcUSD, pas de token → TGE probable
  'thbill',            // Aussi en Prudent — potentiel tokenomics Theo
  'susdai',            // Aussi en Dynamic — CHIP ICO avril 2026
]

// ── Poids d'allocation ────────────────────────────────────────────────────

// Prudent (sum = 0.90 = 90% du capital déployé en rendement)
// 8 protocoles standard × 10% + fxSAVE 5% (exception TVL) + thBILL 5% (exception score — cap 5%)
// = 0.80 + 0.05 + 0.05 = 0.90 ✓ (+ 10% buffer idle USDC dans le vault = 100% TVL)
const PRUDENT_WEIGHTS = {
  'aave-v3':           0.10,
  'morpho-gauntlet':   0.10,
  'morpho-steakhouse': 0.10,
  'susds':             0.10,
  'susde':             0.10,
  'cusdo':             0.10,
  'sbold':             0.10,
  'scrvusd':           0.10,
  'fxsave':            0.05,   // exception TVL — allocation réduite
  'thbill':            0.05,   // exception score — cap 5%
}

// Dynamic (sum = 1.0)
// Poids différenciés selon le niveau de risque de chaque stratégie
// Source : Whitepaper.jsx section EN §3.3 (lignes 1069–1079)
// Stratégies plus risquées = poids réduit ; plus établies = poids plus élevé
const DYNAMIC_WEIGHTS = {
  'syrupusdc': 0.15,  // 15% — Crédit institutionnel (KYC, track record Maple)
  'snusd':     0.15,  // 15% — Delta-neutre multi-exchanges (funding rate)
  'jrusde':    0.13,  // 13% — Tranche junior Ethena (rendement amplifié)
  'susd3':     0.12,  // 12% — Crédit institutionnel non-sécurisé (zkTLS)
  'susdai':    0.12,  // 12% — Prêts GPU/IA collatéralisés (CHIP token)
  'infinifi':  0.10,  // 10% — Banque fractionnaire on-chain (Certora)
  'reservoir': 0.08,  //  8% — CDP stablecoin + savings rate
  'stkusdc':   0.07,  //  7% — Safety module Aave Umbrella (liquidation risk)
  'imusd':     0.05,  //  5% — Levier sUSDe + Pendle + Aave (stratégie avancée)
  'reusde':    0.03,  //  3% — Réassurance junior tranche (premier-loss)
  // Somme = 1.00 ✓
}

// Balanced = 50% Prudent + 50% Dynamic (sum = 1.0)
// Aucun protocole exclusif — mix pur des deux profils
const BALANCED_WEIGHTS = Object.fromEntries([
  ...Object.entries(PRUDENT_WEIGHTS).map(([id, w]) => [id, w * 0.50]),
  ...Object.entries(DYNAMIC_WEIGHTS).map(([id, w]) => [id, w * 0.50]),
])

// Rewards Hunter (sum = 1.0) — répartition équitable
const REWARDS_HUNTER_WEIGHTS = {
  'sierra': 0.25,
  'cap':    0.25,
  'thbill': 0.25,
  'susdai': 0.25,
}

// ── Définition des profils ──────────────────────────────────────────────────

export const PROFILES = {
  prudent: {
    id: 'prudent',
    icon: '🛡️',
    shareToken: 'glUSD-P',
    protocolIds: PRUDENT_PROTOCOL_IDS,
    weights: PRUDENT_WEIGHTS,
    apyRange: '3–7%',
    theme: 'light',
  },
  balanced: {
    id: 'balanced',
    icon: '⚖️',
    shareToken: 'glUSD-B',
    protocolIds: [...PRUDENT_PROTOCOL_IDS, ...DYNAMIC_PROTOCOL_IDS],
    weights: BALANCED_WEIGHTS,
    apyRange: '5–10%',
    theme: 'light',
  },
  dynamic: {
    id: 'dynamic',
    icon: '⚡',
    shareToken: 'glUSD-D',
    protocolIds: DYNAMIC_PROTOCOL_IDS,
    weights: DYNAMIC_WEIGHTS,
    apyRange: '8–15%',
    theme: 'dark',
  },
  rewardsHunter: {
    id: 'rewardsHunter',
    icon: '🪂',
    shareToken: 'glUSD-RH',
    protocolIds: REWARDS_HUNTER_PROTOCOL_IDS,
    weights: REWARDS_HUNTER_WEIGHTS,
    apyRange: 'Variable',
    theme: 'christmas',
  },
}

// Couleurs des pills dans le header selon le profil
export const PROFILE_PILL_COLORS = {
  prudent: {
    inactive: 'bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100',
    active: 'bg-[#28B092] text-white shadow-sm',
    dot: '#28B092',
    darkInactive: 'dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700',
  },
  balanced: {
    inactive: 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100',
    active: 'bg-[#F5A623] text-white shadow-sm',
    dot: '#F5A623',
    darkInactive: 'dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700',
  },
  dynamic: {
    inactive: 'bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100',
    active: 'bg-[#7C3AED] text-white shadow-sm',
    dot: '#7C3AED',
    darkInactive: 'dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-700',
  },
  rewardsHunter: {
    inactive: 'bg-red-50 text-red-800 border border-red-200 hover:bg-red-100',
    active: 'bg-[#C0392B] text-white shadow-sm',
    dot: '#C0392B',
    darkInactive: 'dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
  },
}
