# External Integrations — DeFi Lantern Frontend

## Blockchain / Web3

### Wagmi + Viem
- **Chains**: Ethereum mainnet, Sepolia, Polygon PoS
- **Config**: `src/config/wagmi.js`
- **Hooks**: `useAccount()` (address, chain, status), `useBalance()` (ERC-20 token balance)

### USDC Token Addresses
- Ethereum mainnet: `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`
- Sepolia: `0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238`
- Polygon PoS: `0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359`

### RainbowKit 2.2.10
- Wallet modal UI (MetaMask, Rabby, Coinbase Wallet, WalletConnect)
- WalletConnect Project ID: `845d2e1c2e43efd450d26931e083466d`
  - ⚠️ Hardcoded in source — should move to `.env`
  - Register at https://cloud.walletconnect.com

## DeFiLlama API

- **Base URL**: `https://yields.llama.fi`
- **Endpoints**:
  - `/pools` — real-time APY for all protocols (loaded once on mount)
  - `/chart/{poolId}` — 12-month APY history (ProtocolModal)
- **Pool IDs**: stored as `fullPoolId` UUID in `src/data/protocols.js`
- **Timeout**: 8 seconds (AbortSignal.timeout)
- **Dev proxy**: Vite rewrites `/api/llama/*` → `https://yields.llama.fi/*`
- **Fallback**: static `fallbackApy` per protocol if API unreachable

## Google Fonts

- Font: Inter (weights 300–900)
- Loaded via `<link rel="preconnect">` in `index.html`
- Fallback: system fonts

## TanStack Query (React Query)

- Used internally by wagmi for on-chain data caching
- `QueryClient` initialized in `src/main.jsx`
- Default: 5-minute stale time, auto background refetch

## NOT Integrated (v1)

- No backend API (frontend-only)
- No database
- No analytics
- No smart contracts (deposit/withdrawal are mocked)
- No The Graph / subgraph
- No IPFS
