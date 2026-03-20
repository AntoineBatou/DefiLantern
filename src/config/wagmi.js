// wagmi.js — Configuration wagmi + RainbowKit
//
// Chaînes supportées :
//  - mainnet    : Ethereum mainnet (lecture des données live)
//  - sepolia    : Testnet ETH (déploiement des contrats de test)
//  - polygon    : Requis pour l'épreuve technique Alyra (démo soutenance)
//
// WalletConnect Project ID :
//  Créer un compte gratuit sur https://cloud.walletconnect.com et remplacer
//  la valeur ci-dessous. Sans Project ID valide, WalletConnect (QR code mobile)
//  ne fonctionnera pas — mais MetaMask/Rabby/Coinbase en injection directe
//  continuent de fonctionner normalement.

import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, sepolia, polygon } from 'wagmi/chains'

export const wagmiConfig = getDefaultConfig({
  appName: 'DeFi Lantern Protocol',
  // ⚠️ Remplacer par ton Project ID depuis https://cloud.walletconnect.com
  projectId: '845d2e1c2e43efd450d26931e083466d',
  chains: [mainnet, sepolia, polygon],
  ssr: false,
})
