/**
 * addresses.js — Adresses des contrats déployés par réseau
 *
 * IMPORTANT : Ce fichier doit être mis à jour après chaque déploiement.
 * Les adresses ci-dessous sont des placeholders — remplacer après déploiement.
 *
 * Comment obtenir ces adresses :
 *  1. Lancer le script de déploiement Foundry :
 *     forge script script/Deploy.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast
 *  2. Copier les adresses affichées dans le terminal
 *  3. Les coller ici (section "sepolia")
 *
 * Chain IDs :
 *  - Ethereum mainnet : 1
 *  - Sepolia testnet  : 11155111
 *  - Polygon PoS      : 137
 */

export const CONTRACT_ADDRESSES = {
  // ── Sepolia testnet (déploiement académique) ─────────────────────────────
  11155111: {
    mockUSDC:             "0xD68d95B5a5624468490087106eCB497f64925398", // MockUSDC — déployé mars 2026
    vaultPrudent:         "0x47e6837c93d0aec479f00CA21c4890ECB498AE02", // glUSD-P — déployé mars 2026
    // Futurs vaults (v2)
    vaultBalanced:        null,
    vaultDynamic:         null,
    vaultRewardsHunter:   null,
  },

  // ── Ethereum mainnet (production future — pas encore déployé) ────────────
  1: {
    mockUSDC:             null, // N/A — on utilise le vrai USDC sur mainnet
    vaultPrudent:         null,
    vaultBalanced:        null,
    vaultDynamic:         null,
    vaultRewardsHunter:   null,
  },
}

/**
 * Adresse USDC selon la chaîne active.
 * Sur Sepolia : utiliser MockUSDC (notre token de test)
 * Sur mainnet : utiliser le vrai USDC de Circle
 */
export const USDC_ADDRESSES = {
  1:        "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC mainnet
  11155111: "0xD68d95B5a5624468490087106eCB497f64925398", // MockUSDC Sepolia
  137:      "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", // USDC Polygon
}

/**
 * Helper : retourne les adresses pour une chaîne donnée
 * @param {number} chainId — ID de la chaîne active (depuis wagmi useChainId)
 * @returns {object} Adresses des contrats ou null si chaîne non supportée
 */
export function getAddresses(chainId) {
  return CONTRACT_ADDRESSES[chainId] ?? null
}

/**
 * Helper : retourne l'adresse USDC à utiliser (réel ou mock selon la chaîne)
 * @param {number} chainId
 * @param {string|null} mockUSDCAddress — adresse du MockUSDC déployé (pour Sepolia)
 */
export function getUSDCAddress(chainId, mockUSDCAddress = null) {
  if (chainId === 11155111 && mockUSDCAddress) return mockUSDCAddress
  return USDC_ADDRESSES[chainId] ?? null
}
