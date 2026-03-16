// profiles.js — Configuration des 3 profils de risque
//
// Chaque profil définit un niveau de risque max, un thème visuel,
// et un APY cible. Le profil Dynamique déclenche le mode Cyber/Neon.
//
// Le filtrage des protocoles utilise le champ `risk` de protocols.js (1|2|3).

export const PROFILES = {
  prudent: {
    id: 'prudent',
    icon: '🛡️',
    maxRisk: 1,
    apyRange: '~3–4%',
    theme: 'light',
  },
  balanced: {
    id: 'balanced',
    icon: '⚖️',
    maxRisk: 2,
    apyRange: '~5–6%',
    theme: 'light',
  },
  dynamic: {
    id: 'dynamic',
    icon: '⚡',
    maxRisk: 3,
    apyRange: '~7–9%',
    theme: 'dark', // ← déclenche le mode Cyber/Neon
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
}
