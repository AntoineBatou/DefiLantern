/**
 * addresses.js — Adresses des contrats déployés par réseau
 *
 * ⚠️  CONTRAT ACTIF : VaultPrudentGlUSDP (Didier — repo DDA209/Crypto-Lantern)
 *      ABI mis à jour avril 2026 pour correspondre au contrat de Didier.
 *
 * Vault Sepolia (Didier) :
 *   - À CONFIRMER avec Didier : adresse dans son .env NEXT_PUBLIC_VAULT_PRUDENT_GLUSDP_ADDRESS_SEPOLIA
 *   - Candidat probable (déployé par 0x97b3b9... bloc ~10602725) :
 *     0xfb4ec1eb2e5ffab8196b4db00fb1d24cafad9e94
 *   - Déployé avec USDC Aave testnet Sepolia : 0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8
 *
 * MockAdapter Sepolia (Didier) :
 *   - 0x39914a706FF75B603A584e75Bd8DA6fC68330352 (confirmé, bloc 10660921)
 *
 * Chain IDs :
 *  - Ethereum mainnet : 1
 *  - Sepolia testnet  : 11155111
 */

export const CONTRACT_ADDRESSES = {
  // ── Sepolia testnet ───────────────────────────────────────────────────────
  11155111: {
    // USDC Aave testnet Sepolia (utilisé par le vault de Didier)
    // Faucet : https://app.aave.com/faucet/ → sélectionner "USDC" sur Sepolia
    usdc:               "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",

    // VaultPrudentGlUSDP — déployé par Didier (0x97b3b9...), vérifié Etherscan, testé avril 2026
    vaultPrudent:       "0xab539bCfbCAf4d7e1A1eb3a79Dbaa6eb6E2aA37F",

    // Adapter MockAdapter (déployé, confirmé)
    mockAdapter:        "0x39914a706FF75B603A584e75Bd8DA6fC68330352",

    // Futurs vaults (v2)
    vaultBalanced:      null,
    vaultDynamic:       null,
    vaultRewardsHunter: null,
  },

  // ── Ethereum mainnet (production future) ──────────────────────────────────
  1: {
    usdc:               "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC Circle mainnet
    vaultPrudent:       null,
    vaultBalanced:      null,
    vaultDynamic:       null,
    vaultRewardsHunter: null,
  },
}

/**
 * Adresse USDC selon la chaîne active.
 * Sur Sepolia : USDC Aave testnet (0x94a9...)
 * Sur mainnet : USDC Circle (0xA0b8...)
 */
export const USDC_ADDRESSES = {
  1:        "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC mainnet Circle
  11155111: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8", // USDC Aave testnet Sepolia
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
 * Helper : retourne l'adresse USDC à utiliser selon la chaîne
 * @param {number} chainId
 */
export function getUSDCAddress(chainId) {
  return USDC_ADDRESSES[chainId] ?? null
}
