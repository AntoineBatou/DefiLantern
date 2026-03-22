# Concerns & Tech Debt — DeFi Lantern Frontend

## HIGH — À traiter avant déploiement mainnet

### 1. Dépôt simulé (mock)
- **Où** : `Deposit.jsx` → `handleDeposit()` → `alert()`
- **Impact** : Aucun vrai contrat appelé. Normal pour le MVP académique.
- **Action** : Remplacer par un vrai appel ERC-4626 via wagmi avant la production.

### 2. WalletConnect Project ID exposé dans le code
- **Où** : `src/config/wagmi.js` ligne 20
- **Impact** : ID visible dans le repo public → risque d'abus.
- **Action** : Passer en variable d'environnement `VITE_WALLETCONNECT_PROJECT_ID`.

### 3. EURC désactivé sans date
- **Où** : `Deposit.jsx` — bouton EURC `disabled`
- **Impact** : UX confuse (l'option est visible mais inutilisable).
- **Action** : Masquer complètement ou afficher une date cible.

---

## MEDIUM

### 4. Gouvernance : nom "FLY" au lieu de "GLOW"
- **Où** : `Governance.jsx` — probablement des références à l'ancien nom du token
- **Impact** : Incohérence avec le branding actuel (GLOW).
- **Action** : Rechercher et remplacer toutes les occurrences de "FLY" → "GLOW".

### 5. Fallback APY silencieux
- **Où** : `useDefiLlama.js` — quand l'API échoue, utilise `fallbackApy` sans avertir l'utilisateur
- **Impact** : Les APY affichés peuvent être dépassés sans que l'utilisateur le sache.
- **Action** : Afficher un badge "Données statiques" quand `hasLiveData === false`.

### 6. fullPoolId manquant pour certains protocoles
- **Où** : `src/data/protocols.js` — sNUSD, stkUSDC, reUSDe, Sierra Money
- **Impact** : Le matching DeFiLlama échoue → pas d'APY live ni de graphe historique.
- **Action** : Trouver et renseigner les UUIDs sur DeFiLlama.

### 7. Livret A hardcodé à 0.5%
- **Où** : `Simulator.jsx` — benchmark de comparaison
- **Impact** : Taux obsolète (Livret A est ~3% actuellement).
- **Action** : Mettre à jour ou rendre configurable.

### 8. Pas de validation sur le montant du simulateur
- **Où** : `Simulator.jsx` — input amount
- **Impact** : L'utilisateur peut saisir des valeurs négatives ou non numériques.
- **Action** : Ajouter `min="0"` et validation basique.

---

## LOW

### 9. Positions Dashboard perdues au refresh
- **Où** : `App.jsx` — state `positions` en mémoire
- **Impact** : L'utilisateur perd ses simulations en rechargeant la page.
- **Action** : Persister dans localStorage.

### 10. Pas de lazy loading des composants
- **Où** : `App.jsx` — tous les composants importés statiquement
- **Impact** : Bundle initial plus lourd (mineur à ce stade).
- **Action** : Ajouter `React.lazy` + `Suspense` si le bundle grossit.

### 11. Pas de variables d'environnement validées au démarrage
- **Où** : Général
- **Impact** : Si une variable manque, l'erreur apparaît tard.
- **Action** : Ajouter un check au démarrage dans `main.jsx`.

### 12. Texte hardcodé en français dans certains composants
- **Où** : `Deposit.jsx`, `Protocols.jsx` — quelques chaînes non passées dans `t()`
- **Impact** : Ne change pas avec le toggle FR/EN.
- **Action** : Identifier et déplacer dans `translations.js`.

### 13. Aucun test automatisé
- **Impact** : Régressions détectées manuellement uniquement.
- **Action** : Voir `TESTING.md` pour le setup suggéré.

---

## Résumé

| Priorité | Nb | Thèmes principaux |
|----------|----|-------------------|
| HIGH | 3 | Mock deposit, secret exposé, EURC UX |
| MEDIUM | 5 | Gouvernance nom, APY silencieux, poolId manquants, Livret A, validation |
| LOW | 5 | Persistance positions, lazy loading, i18n incomplet, tests |
