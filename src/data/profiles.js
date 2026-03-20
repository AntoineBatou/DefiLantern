// profiles.js — Configuration des 4 profils de risque
//
// Architecture : chaque profil définit une liste explicite de protocoles
// et leurs poids d'allocation (sum = 1.0 = 100%).
//
// Prudent       : 9 protocoles (tier 1 + sUSDe + reUSD + Resolv USR)
// Dynamic       : 8 protocoles à rendement élevé (tranches junior incluses)
// Balanced      : 50% capital Prudent + 50% capital Dynamic (17 protocoles)
// AirdropHunter : protocoles innovants avec potentiel airdrop (Sierra Money en premier)
//
// isDark = true pour les profils avec theme !== 'light' (dynamic et airdropHunter).

// ── Listes de protocoles par profil ────────────────────────────────────────
// Les IDs correspondent au champ `id` dans protocols.js
// Airdrop Hunter : liste évolutive — Sierra Money est le premier protocole intégré

const PRUDENT_PROTOCOL_IDS = [
  'aave-v3',
  'morpho-gauntlet',
  'morpho-steakhouse',
  'compound-v3',
  'sparklend',
  'susds',
  'susde',  // delta-neutre audité, tire l'APY vers le haut
  'reusd',  // tranche senior protégée Re Protocol
  'resolv', // USR delta-neutre, rendement modéré
]

const DYNAMIC_PROTOCOL_IDS = [
  'snusd',
  'syrupusdc',
  'jrusde',
  'susd3',
  'imusd',
  'reusde',  // tranche junior Re Protocol
  'rlp',     // tranche junior Resolv
  'stkusdc',
]

// Poids d'allocation pour Prudent (sum = 1.0)
// Règle : aucun protocole ne dépasse 15% (cap structurel, cohérent avec le whitepaper)
const PRUDENT_WEIGHTS = {
  'aave-v3':           0.15,
  'morpho-gauntlet':   0.15,
  'morpho-steakhouse': 0.14,
  'compound-v3':       0.13,
  'sparklend':         0.12,
  'susds':             0.12,
  'susde':             0.08,
  'reusd':             0.06,
  'resolv':            0.05,
}

// Poids d'allocation pour Dynamic (sum = 1.0)
const DYNAMIC_WEIGHTS = {
  'snusd':     0.16,
  'syrupusdc': 0.15,
  'jrusde':    0.14,
  'susd3':     0.13,
  'imusd':     0.12,
  'reusde':    0.11,
  'rlp':       0.11,
  'stkusdc':   0.08,
}

// Poids Balanced = 50% Prudent + 50% Dynamic (sum = 1.0)
const BALANCED_WEIGHTS = Object.fromEntries([
  ...Object.entries(PRUDENT_WEIGHTS).map(([id, w]) => [id, w * 0.5]),
  ...Object.entries(DYNAMIC_WEIGHTS).map(([id, w]) => [id, w * 0.5]),
])

const AIRDROP_HUNTER_PROTOCOL_IDS = [
  'sierra', // premier protocole — liste à compléter au fil des sélections
]

// Poids d'allocation pour Airdrop Hunter (sum = 1.0)
// Sierra = 100% tant qu'il est seul dans le vault
const AIRDROP_HUNTER_WEIGHTS = {
  'sierra': 1.0,
}

// ── Définition des profils ──────────────────────────────────────────────────

export const PROFILES = {
  prudent: {
    id: 'prudent',
    icon: '🛡️',
    shareToken: 'glUSDC-P',
    protocolIds: PRUDENT_PROTOCOL_IDS,
    weights: PRUDENT_WEIGHTS,
    apyRange: '3–7%',
    theme: 'light',
  },
  balanced: {
    id: 'balanced',
    icon: '⚖️',
    shareToken: 'glUSDC-B',
    protocolIds: [...PRUDENT_PROTOCOL_IDS, ...DYNAMIC_PROTOCOL_IDS],
    weights: BALANCED_WEIGHTS,
    apyRange: '5–10%',
    theme: 'light',
  },
  dynamic: {
    id: 'dynamic',
    icon: '⚡',
    shareToken: 'glUSDC-D',
    protocolIds: DYNAMIC_PROTOCOL_IDS,
    weights: DYNAMIC_WEIGHTS,
    apyRange: '8–15%',
    theme: 'dark', // ← déclenche le mode Cyber/Neon
  },
  airdropHunter: {
    id: 'airdropHunter',
    icon: '🪂',
    shareToken: 'glUSDC-AH',
    protocolIds: AIRDROP_HUNTER_PROTOCOL_IDS,
    weights: AIRDROP_HUNTER_WEIGHTS,
    apyRange: 'Variable',
    theme: 'christmas', // ← fond sombre rouge & or (#C0392B + #FFD700)
  },
}

// Couleurs des pills dans le header selon le profil
export const PROFILE_PILL_COLORS = {
  prudent: {
    inactive: 'bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100',
    active: 'bg-[#2ABFAB] text-white shadow-sm',
    dot: '#2ABFAB',
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
  airdropHunter: {
    inactive: 'bg-red-50 text-red-800 border border-red-200 hover:bg-red-100',
    active: 'bg-[#C0392B] text-white shadow-sm',
    dot: '#C0392B',
    darkInactive: 'dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
  },
}
