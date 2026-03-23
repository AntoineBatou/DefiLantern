// useVault.js — Hook wagmi v2 pour interagir avec DeFiLanternVaultPrudent sur Sepolia
//
// Flux dépôt en 2 étapes :
//   1. approve(vaultAddress, amount) sur MockUSDC  → autorise le vault à prendre nos USDC
//   2. deposit(amount, userAddress) sur le vault   → dépose et reçoit des glUSDC-P
//
// On utilise useWriteContract (wagmi v2) qui gère signature + broadcast.

import { useWriteContract, useReadContract, useAccount, useChainId } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { CONTRACT_ADDRESSES } from '../contracts/addresses'
import MockUSDCABI from '../contracts/MockUSDC.json'
import VaultABI from '../contracts/DeFiLanternVaultPrudent.json'

export function useVault() {
  const { address } = useAccount()
  const chainId = useChainId()
  const addrs = CONTRACT_ADDRESSES[chainId]

  // ── Écriture on-chain ────────────────────────────────────────────────────
  const { writeContractAsync, isPending, isSuccess, error } = useWriteContract()

  // ── Lecture : solde MockUSDC du wallet ──────────────────────────────────
  const { data: mockUsdcBalance, refetch: refetchBalance } = useReadContract({
    address: addrs?.mockUSDC,
    abi: MockUSDCABI.abi,
    functionName: 'balanceOf',
    args: [address],
    query: { enabled: !!address && !!addrs?.mockUSDC },
  })

  // ── Lecture : solde de shares glUSDC-P du wallet ────────────────────────
  const { data: sharesBalance, refetch: refetchShares } = useReadContract({
    address: addrs?.vaultPrudent,
    abi: VaultABI.abi,
    functionName: 'balanceOf',
    args: [address],
    query: { enabled: !!address && !!addrs?.vaultPrudent },
  })

  // ── Lecture : totalAssets du vault ──────────────────────────────────────
  const { data: totalAssets } = useReadContract({
    address: addrs?.vaultPrudent,
    abi: VaultABI.abi,
    functionName: 'totalAssets',
    query: { enabled: !!addrs?.vaultPrudent },
  })

  // ── Action : faucet MockUSDC (demander 1 000 USDC de test) ──────────────
  const faucet = async () => {
    return writeContractAsync({
      address: addrs.mockUSDC,
      abi: MockUSDCABI.abi,
      functionName: 'faucet',
    })
  }

  // ── Action : dépôt (approve + deposit) ──────────────────────────────────
  const deposit = async (amountUsdc) => {
    // USDC a 6 décimales — 100 USDC = 100_000_000 en unités brutes
    const amountRaw = parseUnits(String(amountUsdc), 6)

    // Étape 1 : approuver le vault
    await writeContractAsync({
      address: addrs.mockUSDC,
      abi: MockUSDCABI.abi,
      functionName: 'approve',
      args: [addrs.vaultPrudent, amountRaw],
    })

    // Étape 2 : déposer
    await writeContractAsync({
      address: addrs.vaultPrudent,
      abi: VaultABI.abi,
      functionName: 'deposit',
      args: [amountRaw, address],
    })

    // Rafraîchir les soldes
    refetchBalance()
    refetchShares()
  }

  // ── Helpers de formatage ─────────────────────────────────────────────────
  const formattedMockUsdcBalance = mockUsdcBalance
    ? parseFloat(formatUnits(mockUsdcBalance, 6)).toFixed(2)
    : '0.00'

  const formattedSharesBalance = sharesBalance
    ? parseFloat(formatUnits(sharesBalance, 6)).toFixed(2)
    : '0.00'

  const formattedTotalAssets = totalAssets
    ? parseFloat(formatUnits(totalAssets, 6)).toFixed(2)
    : '0.00'

  const isSepoliaSupported = !!addrs?.vaultPrudent

  return {
    deposit,
    faucet,
    isPending,
    isSuccess,
    error,
    mockUsdcBalance: formattedMockUsdcBalance,
    sharesBalance: formattedSharesBalance,
    totalAssets: formattedTotalAssets,
    isSepoliaSupported,
    addresses: addrs,
  }
}
