# Conventions — DeFi Lantern Frontend

## Nommage des fichiers

- **Composants** : PascalCase → `Header.jsx`, `ProtocolModal.jsx`
- **Hooks** : camelCase préfixé `use` → `useDefiLlama.js`
- **Données** : camelCase → `protocols.js`, `profiles.js`
- **Contextes** : suffixe `Context` → `LangContext.jsx`, `RiskProfileContext.jsx`

## Structure des composants

### En-tête de fichier
Chaque fichier commence par un commentaire expliquant le rôle :
```js
// ComponentName.jsx — Description courte
//
// - Point clé 1
// - Point clé 2
```

### Contextes (LangContext, RiskProfileContext)
- `createContext(defaultValue)` + export du Provider + export du hook custom
- Persistance via `localStorage` si nécessaire
- État dérivé via `useMemo`

### Composants page/section
- Imports contextes en premier : `const { t } = useLang()`
- Helpers internes définis avant le `export default`
- Rendu conditionnel via ternaires ou if simple

## CSS & Tailwind

### Approche utility-first
- Classes Tailwind directement dans le JSX
- Responsive : `sm:`, `md:`, `lg:`
- Dark mode : `dark:`

### Classes globales réutilisables (`index.css`)
- `.btn-primary` — bouton teal
- `.btn-secondary` — bouton outline
- `.card` — carte blanche avec ombre
- `.section` — espacement vertical standard
- `.badge` — tag coloré

### Palette couleurs
- Fond light : `bg` (#F7FAFA), `lgrey` (#EEF2F2)
- Texte : `navy` (#1A2332)
- Accent principal : `#2ABFAB` (teal)
- Accent secondaire : `#F5A623` (amber)

### Thèmes profil
- **Light** (Prudent/Balanced) : pas de classe → thème par défaut
- **Dark** (Dynamic) : classe `.dark` sur le div racine
- **Christmas** (Airdrop Hunter) : classe `.theme-christmas` sur le div racine

## i18n

### Structure translations.js
```js
export const translations = {
  fr: { nav: {}, hero: {}, ... },
  en: { nav: {}, hero: {}, ... }
}
```

### Clés hiérarchiques
Format : `section.clé` → `nav.howItWorks`, `hero.title`, `simulator.amount`

### Usage dans les composants
```js
const { t } = useLang()
// t('section.key') → string traduit, ou la clé si manquante
```

## Données statiques

### protocols.js — structure d'un protocole
```js
{
  id: 'aave-v3',
  name: 'Aave v3',
  category: 'Lending',
  fallbackApy: 4.2,
  historicalApy12m: 3.8,
  llamaConfig: { fullPoolId: 'uuid', project: 'aave-v3', chain: 'Ethereum', symbol: 'USDC' },
  descFr: '...', descEn: '...',
  risk: 1,           // 1 = faible, 3 = élevé
  link: 'https://...'
}
```

### profiles.js — structure d'un profil
```js
PROFILES = {
  prudent: {
    id: 'prudent',
    icon: '🛡️',
    shareToken: 'glUSDC-P',
    protocolIds: [...],
    weights: { 'aave-v3': 0.15, ... }, // somme = 1.0
    apyRange: '3–7%',
    theme: 'light'
  }
}
```

## Ordre des imports

1. React / libs externes
2. Contextes
3. Hooks
4. Données
5. Composants
6. CSS
