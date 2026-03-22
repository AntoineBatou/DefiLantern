# Testing — DeFi Lantern Frontend

## État actuel

**Aucun test automatisé.** Projet académique — priorité sur les fonctionnalités et l'UI.

- Pas de framework de test installé (pas de Jest, Vitest, RTL)
- Pas de scripts de test dans `package.json`
- Pas de fichiers `.test.js` / `.spec.js`

## Tests manuels (approche actuelle)

- [ ] Les 4 profils de risque s'affichent correctement
- [ ] Toggle FR/EN met à jour tous les textes
- [ ] Thème Dark (Dynamic) et Christmas (Airdrop Hunter) s'appliquent
- [ ] APY live charge depuis DeFiLlama (ou fallback gracieux)
- [ ] Simulateur calcule correctement le rendement
- [ ] Dashboard : ajout/suppression de positions
- [ ] Modale protocole s'ouvre/ferme
- [ ] Responsive sur mobile/tablette/desktop

## Ce qui bénéficierait de tests (si ajoutés)

### Hooks
- `useDefiLlama` : matching par fullPoolId, fallback API, timeout
- `LangContext` : clés manquantes, persistance, FR→EN→FR

### Données
- `protocols.js` : poids somme = 1.0 par profil
- `profiles.js` : tous les protocolIds existent dans RETAINED_PROTOCOLS
- `translations.js` : toutes les clés FR ont un équivalent EN

### Composants
- `Simulator` : calculs de rendement avec différents montants/durées
- `Deposit` : état wallet connecté vs déconnecté

## Setup futur (non encore fait)

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```

Ajouter dans `package.json` :
```json
"test": "vitest"
```
