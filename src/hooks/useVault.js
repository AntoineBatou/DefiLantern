// useVault.js — Hook wagmi v2 pour interagir avec VaultPrudentGlUSDP (Didier — DDA209/Crypto-Lantern)
//
// Contrat : VaultPrudentGlUSDP.sol (avril 2026)
// USDC Sepolia : 0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8 (Aave testnet)
// Faucet USDC  : https://app.aave.com/faucet/ → USDC sur Sepolia
//
// Flux dépôt (2 étapes) :
//   1. approve(vaultAddress, amount) sur USDC → autorise le vault
//   2. deposit(amount, userAddress) sur le vault → reçoit glUSD-P
//
// Flux retrait (2 étapes) :
//   1. Si le caller n'est pas l'owner : approve de shares requis (ERC-4626)
//   2. withdraw(amount, receiver, owner) sur le vault → récupère USDC

import { useEffect } from 'react'
import { useWriteContract, useReadContract, useBlockNumber, useAccount, useChainId } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { CONTRACT_ADDRESSES, USDC_ADDRESSES } from '../contracts/addresses'
import VaultABI from '../contracts/DeFiLanternVaultPrudent.json'

// ABI minimal ERC-20 — inclut mint() pour le faucet testnet (Aave TestnetERC20)
const ERC20_ABI = [
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'allowance',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [],
  },
]

export function useVault() {
  const { address } = useAccount()
  const chainId = useChainId()
  const addrs = CONTRACT_ADDRESSES[chainId]
  const usdcAddress = USDC_ADDRESSES[chainId]

  // ── Écriture on-chain ────────────────────────────────────────────────────
  const { writeContractAsync, isPending, isSuccess, error } = useWriteContract()

  // ── Numéro de bloc courant — se met à jour à chaque nouveau bloc ─────────
  const { data: blockNumber } = useBlockNumber({ watch: true })

  // ── Lecture : solde USDC du wallet ──────────────────────────────────────
  const { data: usdcBalance, refetch: refetchBalance } = useReadContract({
    address: usdcAddress,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [address],
    query: {
      enabled: !!address && !!usdcAddress,
      refetchInterval: 3000,
      staleTime: 0,
      refetchOnMount: true,
    },
  })

  // ── Lecture : solde de shares glUSD-P du wallet ────────────────────────
  const { data: sharesBalance, refetch: refetchShares } = useReadContract({
    address: addrs?.vaultPrudent,
    abi: VaultABI.abi,
    functionName: 'balanceOf',
    args: [address],
    query: {
      enabled: !!address && !!addrs?.vaultPrudent,
      refetchInterval: 3000,
      staleTime: 0,
      refetchOnMount: true,
    },
  })

  // ── Refetch à chaque nouveau bloc ET à la connexion du wallet ────────────
  useEffect(() => {
    if (address) {
      refetchBalance()
      refetchShares()
    }
  }, [blockNumber, address])

  // ── Lecture : totalAssets du vault ──────────────────────────────────────
  const { data: totalAssets } = useReadContract({
    address: addrs?.vaultPrudent,
    abi: VaultABI.abi,
    functionName: 'totalAssets',
    query: { enabled: !!addrs?.vaultPrudent },
  })

  // ── Lecture : buffer USDC idle dans le vault ────────────────────────────
  const { data: bufferAssets } = useReadContract({
    address: addrs?.vaultPrudent,
    abi: VaultABI.abi,
    functionName: 'getBufferTotalAssets',
    query: { enabled: !!addrs?.vaultPrudent },
  })

  // ── Lecture : timestamp de déploiement (pour calcul APY) ────────────────
  const { data: deploymentTimestamp } = useReadContract({
    address: addrs?.vaultPrudent,
    abi: VaultABI.abi,
    functionName: 'deploymentTimestamp',
    query: { enabled: !!addrs?.vaultPrudent },
  })

  // ── Lecture : convertToAssets(1e6) → prix d'un share en USDC ────────────
  const { data: sharePrice } = useReadContract({
    address: addrs?.vaultPrudent,
    abi: VaultABI.abi,
    functionName: 'convertToAssets',
    args: [BigInt(1_000_000)], // 1 glUSD-P (6 décimales)
    query: { enabled: !!addrs?.vaultPrudent },
  })

  // ── Action : faucet — mint 1 000 USDC de test ───────────────────────────
  const faucet = async () => {
    const amountRaw = parseUnits('1000', 6) // 1 000 USDC
    await writeContractAsync({
      address: usdcAddress,
      abi: ERC20_ABI,
      functionName: 'mint',
      args: [address, amountRaw],
    })
    refetchBalance()
  }

  // ── Action : dépôt (approve USDC + deposit) ─────────────────────────────
  const deposit = async (amountUsdc) => {
    // USDC a 6 décimales — 100 USDC = 100_000_000 en unités brutes
    const amountRaw = parseUnits(String(amountUsdc), 6)

    // Étape 1 : approuver le vault sur le contrat USDC
    await writeContractAsync({
      address: usdcAddress,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [addrs.vaultPrudent, amountRaw],
    })

    // Étape 2 : déposer → reçoit des shares glUSD-P
    await writeContractAsync({
      address: addrs.vaultPrudent,
      abi: VaultABI.abi,
      functionName: 'deposit',
      args: [amountRaw, address],
    })

    refetchBalance()
    refetchShares()
  }

  // ── Action : retrait (withdraw) ──────────────────────────────────────────
  // withdraw(assetAmount, receiver, owner)
  // Pour l'utilisateur retirant ses propres fonds : owner = receiver = address
  const withdraw = async (amountUsdc) => {
    const amountRaw = parseUnits(String(amountUsdc), 6)

    await writeContractAsync({
      address: addrs.vaultPrudent,
      abi: VaultABI.abi,
      functionName: 'withdraw',
      args: [amountRaw, address, address],
    })

    refetchBalance()
    refetchShares()
  }

  // ── Helpers de formatage ─────────────────────────────────────────────────
  const formattedUsdcBalance = usdcBalance
    ? parseFloat(formatUnits(usdcBalance, 6)).toFixed(2)
    : '0.00'

  const formattedSharesBalance = sharesBalance
    ? parseFloat(formatUnits(sharesBalance, 6)).toFixed(2)
    : '0.00'

  const formattedTotalAssets = totalAssets
    ? parseFloat(formatUnits(totalAssets, 6)).toFixed(2)
    : '0.00'

  const formattedBufferAssets = bufferAssets
    ? parseFloat(formatUnits(bufferAssets, 6)).toFixed(2)
    : '0.00'

  // Prix d'un share en USDC (démarre à 1.000000, augmente avec les rendements)
  const formattedSharePrice = sharePrice
    ? parseFloat(formatUnits(sharePrice, 6)).toFixed(6)
    : '1.000000'

  const isSepoliaSupported = !!addrs?.vaultPrudent

  return {
    deposit,
    withdraw,
    faucet,
    isPending,
    isSuccess,
    error,
    usdcBalance: formattedUsdcBalance,
    sharesBalance: formattedSharesBalance,
    totalAssets: formattedTotalAssets,
    bufferAssets: formattedBufferAssets,
    sharePrice: formattedSharePrice,
    deploymentTimestamp,
    isSepoliaSupported,
    usdcAddress,
    addresses: addrs,
  }
}
