// protocols.js — Données statiques des protocoles DeFi Lantern
//
// Ce fichier centralise toutes les informations sur les protocoles.
// Les fullPoolId sont les UUID complets DeFiLlama, vérifiés en mars 2026.
// Ils permettent de fetcher l'historique APY via /chart/{fullPoolId}
// même quand le pool n'est pas trouvé via le matching en temps réel.

// Couleurs pour les catégories de protocoles
export const CATEGORY_COLORS = {
  'Lending':              { bg: 'bg-blue-100',   text: 'text-blue-700'   },
  'Savings Rate':         { bg: 'bg-purple-100', text: 'text-purple-700' },
  'RWA T-bills':          { bg: 'bg-amber-100',  text: 'text-amber-700'  },
  'Delta-Neutral':        { bg: 'bg-green-100',  text: 'text-green-700'  },
  'Institutional Credit': { bg: 'bg-orange-100', text: 'text-orange-700' },
  'Reinsurance':          { bg: 'bg-rose-100',   text: 'text-rose-700'   },
  'Stability Pool':       { bg: 'bg-red-100',    text: 'text-red-700'    },
  'Market Neutral':       { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  'Fixed Rate':           { bg: 'bg-pink-100',   text: 'text-pink-700'   },
  'Safety Module':        { bg: 'bg-cyan-100',   text: 'text-cyan-700'   },
  'Liquid Yield Token':   { bg: 'bg-red-100',    text: 'text-red-700'    },
  'Fractional Reserve':   { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  'CDP Stablecoin':       { bg: 'bg-violet-100', text: 'text-violet-700' },
  'RWA / AI Credit':      { bg: 'bg-sky-100',    text: 'text-sky-700'    },
}

// Couleurs pour le graphique donut
export const DONUT_COLORS = [
  '#28B092', '#2ABFAB', '#3DD4C0', '#F5A623',
  '#1A9E8C', '#F7B94A', '#50DBC8', '#E8943F',
  '#0D8B7B', '#FAC96B', '#60D2C5', '#F5BC56',
  '#47CBB8', '#E89B47', '#2DB8A7', '#FCBA45',
  '#1BCCB8', '#8B5CF6', '#A78BFA', '#34D399',
  '#6EE7B7', '#FCA5A5', '#FB7185', '#FBBF24',
]

// ── PROTOCOLES RETENUS ──────────────────────────────────────────────────────
//
// 10 Prudent + 10 Dynamic + 4 Rewards Hunter
// Balanced = mix 50% Prudent + 50% Dynamic (aucun protocole exclusif)
// (certains protocoles apparaissent dans plusieurs profils)
//
// llamaConfig : critères pour matcher le pool dans l'API DeFiLlama
//   - fullPoolId : UUID complet DeFiLlama (vérifié mars 2026)
//   - project    : nom du projet dans l'API
//   - chain      : chaîne blockchain
//   - symbol     : symbole du pool

export const RETAINED_PROTOCOLS = [
  // ── Prudent 🛡️ ─────────────────────────────────────────────────────────────
  {
    id: 'aave-v3',
    name: 'Aave v3',
    category: 'Lending',
    fallbackApy: 2.4,
    llamaConfig: {
      fullPoolId: 'aa70268e-4b52-42bf-a116-608b370f9501',
      project: 'aave-v3',
      chain: 'Ethereum',
      symbol: 'USDC',
    },
    descFr: 'La référence du lending DeFi. Vos USDC sont prêtés à des emprunteurs qui déposent un collatéral en garantie et paient des intérêts.',
    descEn: 'The DeFi lending reference. Your USDC is lent to borrowers who post collateral and pay interest.',
    risk: 1,
    link: 'https://aave.com',
  },
  {
    id: 'morpho-gauntlet',
    name: 'Morpho (Gauntlet USDC Prime)',
    category: 'Lending',
    fallbackApy: 2.3,
    llamaConfig: {
      fullPoolId: '71b34441-5a46-431b-a9b3-8c081cd0d74c',
      project: 'morpho-v1',
      chain: 'Ethereum',
      symbol: 'GTUSDCP',
    },
    descFr: 'Vault Morpho Prime géré par Gauntlet. Collatéral blue-chip uniquement (ETH, wstETH, WBTC), risque d\'insolvabilité minimal. $0 de bad debt durant le stress test de novembre 2025.',
    descEn: 'Gauntlet Prime Morpho vault. Blue-chip collateral only (ETH, wstETH, WBTC), minimal insolvency risk. $0 bad debt during November 2025 stress test.',
    risk: 1,
    link: 'https://app.morpho.org/ethereum/vault/0xdd0f28e19C1780eb6396170735D45153D261490d/gauntlet-usdc-prime',
  },
  {
    id: 'morpho-steakhouse',
    name: 'Morpho (Steakhouse USDC)',
    category: 'Lending',
    fallbackApy: 2.0,
    llamaConfig: {
      fullPoolId: 'b55f43a8-f444-4cd8-a3a4-0a4e786ba566',
      project: 'morpho-v1',
      chain: 'Ethereum',
      symbol: 'STEAKUSDC',
    },
    descFr: 'Vault Morpho ultra-conservateur géré par Steakhouse Financial. Collatéraux finement sélectionnés de haute qualité, exposition minimale au risque.',
    descEn: 'Ultra-conservative Morpho vault by Steakhouse Financial. Carefully curated high-quality collateral, minimal risk exposure.',
    risk: 1,
    link: 'https://morpho.org',
  },
  {
    id: 'susds',
    name: 'sUSDS (Sky)',
    category: 'Savings Rate',
    fallbackApy: 3.75,
    llamaConfig: {
      fullPoolId: 'd8c4eff5-c8a9-46fc-a888-057c4c668e72',
      project: 'sky-lending',
      chain: 'Ethereum',
      symbol: 'SUSDS',
    },
    descFr: 'Taux d\'épargne officiel de Sky (ex-MakerDAO), alimenté par les intérêts versés par les emprunteurs de USDS. Parmi les protocoles les plus audités au monde.',
    descEn: 'Official Sky (ex-MakerDAO) savings rate, funded by interest paid by USDS borrowers. Among the most audited protocols in the world.',
    risk: 1,
    link: 'https://sky.money',
  },
  {
    id: 'susde',
    name: 'sUSDe (Ethena)',
    category: 'Delta-Neutral',
    fallbackApy: 3.5,
    llamaConfig: {
      fullPoolId: '66985a81-9c51-46ca-9977-42b4fe7bc6df',
      project: 'ethena-usde',
      chain: 'Ethereum',
      symbol: 'SUSDE',
    },
    descFr: 'Stratégie delta-neutre sur ETH : longue spot + courte en perpétuel. Rendement issu des taux de financement et du staking ETH. Cooldown de retrait : 7 jours.',
    descEn: 'ETH delta-neutral strategy: spot long + perpetual short. Yield from funding rates and ETH staking. Withdrawal cooldown: 7 days.',
    risk: 2,
    link: 'https://ethena.fi',
  },
  {
    id: 'cusdo',
    name: 'cUSDO (OpenEden)',
    category: 'RWA T-bills',
    fallbackApy: 3.25,
    llamaConfig: {
      fullPoolId: 'f083596e-032d-4d6b-a7a8-1836d3f99bcd', // Ethereum (USDO) — ancienne ID était Solana
      project: 'openeden-usdo',
      chain: 'Ethereum',
      symbol: 'USDO',
    },
    descFr: '100% bons du Trésor américains. Le seul produit T-bills pur natif sur Ethereum, avec prix vérifié par Chainlink.',
    descEn: '100% US Treasury bills. The only pure T-bill product native on Ethereum, with Chainlink-verified pricing.',
    risk: 1,
    link: 'https://openeden.com',
  },
  {
    id: 'sbold',
    name: 'sBOLD (Liquity v2)',
    category: 'Stability Pool',
    fallbackApy: 2.7,
    llamaConfig: {
      fullPoolId: 'a635df9a-4cfc-4d17-86d0-934ea441e79f',
      project: 'liquity-v2',
      chain: 'Ethereum',
      symbol: 'BOLD',
    },
    descFr: 'Vos USDC absorbent les liquidations du protocole Liquity v2. Vous récupérez du collatéral à prix réduit et percevez les intérêts des emprunteurs. Protocole immuable, sans clé admin. Équipe depuis 2021.',
    descEn: 'Your USDC absorbs Liquity v2 liquidations. You receive collateral at a discount and earn borrowers\' interest. Immutable protocol, no admin keys. Team since 2021.',
    risk: 2,
    link: 'https://liquity.org',
  },
  {
    id: 'scrvusd',
    name: 'scrvUSD (Curve)',
    category: 'Savings Rate',
    fallbackApy: 3.4,
    llamaConfig: {
      fullPoolId: '5fd328af-4203-471b-bd16-1705c726d926',
      project: 'crvusd',
      chain: 'Ethereum',
      symbol: 'SCRVUSD',
    },
    descFr: 'Taux d\'épargne natif de Curve Finance. Les intérêts versés par les emprunteurs de crvUSD reviennent directement aux déposants. ERC-4626. Audité par Trail of Bits, MixBytes, Quantstamp. Timelock 7 jours.',
    descEn: 'Native Curve Finance savings rate. Interest paid by crvUSD borrowers flows directly back to depositors. ERC-4626. Audited by Trail of Bits, MixBytes, Quantstamp. 7-day timelock.',
    risk: 1,
    link: 'https://curve.fi',
  },
  {
    id: 'fxsave',
    name: 'fxSAVE (f(x) Protocol)',
    category: 'Stability Pool',
    fallbackApy: 3.5,
    llamaConfig: {
      fullPoolId: 'ee0b7069-f8f3-4aa2-a415-728f13e6cc3d',
      project: 'concentrator',
      chain: 'Ethereum',
      symbol: 'FXSAVE',
    },
    descFr: 'Pool de stabilité delta-neutre auto-compounding. Architecture dual-token (fxUSD + xETH). 16 audits couvrant 100% du code déployé. ERC-4626 natif. Équipe Aladdin DAO depuis 2021.',
    descEn: 'Delta-neutral auto-compounding stability pool. Dual-token architecture (fxUSD + xETH). 16 audits covering 100% of deployed code. ERC-4626 native. Aladdin DAO team since 2021.',
    risk: 2,
    link: 'https://fx.aladdin.club',
  },
  {
    id: 'thbill',
    name: 'thBill (Theo Network)',
    category: 'RWA T-bills',
    fallbackApy: 2.5,
    // Contrat ERC-4626 : 0x5FA487BCa6158c64046B2813623e20755091DA0b
    // Source externe : https://app.rwa.xyz/assets/thBILL (APY 7D ~2.53%)
    // DeFiLlama ne liste pas thBill dans l'API yields/pools (protocol-level uniquement)
    // → fallbackApy utilisé ; à remplacer par un appel on-chain convertToAssets() en v2
    tooRecent: true,  // Lancé juil 2025, non indexé DeFiLlama yields
    llamaConfig: {
      fullPoolId: null,
      project: 'theo-network',
      chain: 'Ethereum',
      symbol: 'THBILL',
    },
    descFr: 'T-bills US tokenisés gérés par Theo Network. Partenaires : Standard Chartered (Libeara) + Wellington Management. ERC-4626. Acquisition via marché secondaire (Uniswap V3). Allocation plafonnée à 5% (exception : pas d\'audit Tier-1).',
    descEn: 'Tokenized US T-bills managed by Theo Network. Partners: Standard Chartered (Libeara) + Wellington Management. ERC-4626. Secondary market acquisition (Uniswap V3). Capped at 5% (exception: no Tier-1 audit).',
    risk: 2,
    link: 'https://theo.network',
    airdropPotential: true,
  },

  // ── Dynamic ⚡ ──────────────────────────────────────────────────────────────
  {
    id: 'snusd',
    name: 'sNUSD (Neutrl)',
    category: 'Delta-Neutral',
    fallbackApy: 8.7,
    tooRecent: true,  // Lancé 2025, non indexé DeFiLlama yields
    llamaConfig: {
      fullPoolId: null,
      project: 'neutrl',
      chain: 'Ethereum',
      symbol: 'SNUSD',
    },
    descFr: 'Stratégie delta-neutre multi-exchanges. Position longue spot ETH compensée par position courte perp. Rendement issu des taux de financement.',
    descEn: 'Multi-exchange delta-neutral strategy. ETH spot long offset by perp short. Yield from funding rates.',
    risk: 3,
    link: 'https://neutrl.com',
  },
  {
    id: 'syrupusdc',
    name: 'syrupUSDC (Maple)',
    category: 'Institutional Credit',
    fallbackApy: 4.4,
    llamaConfig: {
      fullPoolId: '43641cf5-a92e-416b-bce9-27113d3c0db6',
      project: 'maple',
      chain: 'Ethereum',
      symbol: 'USDC',
    },
    descFr: 'Prêts on-chain à des institutions crypto vérifiées. Rendement plus élevé en échange d\'un risque de crédit mesuré. KYC requis (profil Dynamic uniquement).',
    descEn: 'On-chain loans to vetted crypto institutions. Higher yield in exchange for measured credit risk. KYC required (Dynamic profile only).',
    risk: 2,
    link: 'https://maple.finance',
  },
  {
    id: 'jrusde',
    name: 'jrUSDe (Strata)',
    category: 'Market Neutral',
    fallbackApy: 5.9,
    llamaConfig: {
      fullPoolId: '8352355c-5ad7-45c5-aca2-628de224f8d8',
      project: 'strata-markets',
      chain: 'Ethereum',
      symbol: 'JRUSDE',
    },
    descFr: 'Tranche junior de la stratégie USDe d\'Ethena. Rendement amplifié en échange d\'une absorption prioritaire des pertes.',
    descEn: 'Junior tranche of Ethena\'s USDe strategy. Amplified yield in exchange for first-loss absorption.',
    risk: 3,
    link: 'https://strata.finance',
  },
  {
    id: 'susd3',
    name: 'sUSD3 (3Jane)',
    category: 'Institutional Credit',
    fallbackApy: 8.2,
    llamaConfig: {
      fullPoolId: 'a99bb965-ebaa-4d98-9ed2-fa18de52c605',
      project: '3jane-lending',
      chain: 'Ethereum',
      symbol: 'SUSD3',
    },
    descFr: 'Prêts institutionnels non-sécurisés vérifiés via zkTLS. Soutenu par Paradigm. Cooldown : 1 mois.',
    descEn: 'Unsecured institutional lending verified via zkTLS. Backed by Paradigm. Cooldown: 1 month.',
    risk: 3,
    link: 'https://3jane.xyz',
  },
  {
    id: 'imusd',
    name: 'mPT-sUSDe (mStable)',
    category: 'Fixed Rate',
    fallbackApy: 13.6,
    llamaConfig: {
      fullPoolId: '6d177bd3-fafa-4d2e-b86f-4fb14ea73c7c',
      project: 'mstable-v2',
      chain: 'Ethereum',
      symbol: 'MPT-SUSDE',
    },
    descFr: 'Stratégie leviérisée : sUSDe (Ethena) + taux fixe Pendle + borrow loop Aave. Rendement amplifié, risque élevé.',
    descEn: 'Leveraged strategy: sUSDe (Ethena) + Pendle fixed rate + Aave borrow loop. Amplified yield, high risk.',
    risk: 3,
    link: 'https://www.mstable.com',
  },
  {
    id: 'reusde',
    name: 'reUSDe (Re Protocol)',
    category: 'Reinsurance',
    fallbackApy: 15.0,
    llamaConfig: {
      fullPoolId: null,
      project: 're-protocol',
      chain: 'Ethereum',
      symbol: 'reUSDe',
    },
    descFr: 'Tranche junior de réassurance Re Protocol. Absorbe les pertes en premier si la stratégie Ethena sous-performe — rendement supérieur en échange.',
    descEn: 'Re Protocol reinsurance junior tranche. Absorbs losses first if Ethena strategy underperforms — higher yield in exchange.',
    risk: 3,
    link: 'https://re.xyz',
  },
  {
    id: 'stkusdc',
    name: 'stkUSDC (Aave Umbrella)',
    category: 'Safety Module',
    fallbackApy: 6.0,
    tooRecent: true,  // Aave Umbrella lancé 2025, non indexé DeFiLlama yields
    llamaConfig: {
      fullPoolId: null,
      project: 'aave-umbrella',
      chain: 'Ethereum',
      symbol: 'STKUSDC',
    },
    descFr: 'Module de sécurité Aave v3 (Umbrella). USDC stakés pour couvrir les déficits de bad debt d\'Aave. Récompenses en échange d\'une exposition au risque de liquidation.',
    descEn: 'Aave v3 safety module (Umbrella). USDC staked to cover Aave bad debt shortfalls. Rewards in exchange for liquidation risk exposure.',
    risk: 3,
    link: 'https://aave.com',
  },
  {
    id: 'susdai',
    name: 'sUSDai (USD.AI)',
    category: 'RWA / AI Credit',
    fallbackApy: 6.8,
    llamaConfig: {
      fullPoolId: '712ce948-bd9e-4f4a-8916-b72c447f7578',
      project: 'usd-ai',
      chain: 'Arbitrum', // Note: sUSDai natif Arbitrum, pas encore sur ETH mainnet
      symbol: 'SUSDAI',
    },
    descFr: 'Prêts collatéralisés par des GPUs NVIDIA pour des data centers IA. Rendement 13–17% issu des remboursements des opérateurs GPU. Token CHIP prévu Q1 2026. Partenariat PayPal.',
    descEn: 'Loans collateralized by NVIDIA GPUs for AI data centers. 13–17% yield from GPU operator repayments. CHIP token expected Q1 2026. PayPal partnership.',
    risk: 3,
    link: 'https://usd.ai',
    airdropPotential: true,
  },

  // ── Balanced propres ⚖️ ────────────────────────────────────────────────────
  {
    id: 'infinifi',
    name: 'InfiniFI (siUSD)',
    category: 'Fractional Reserve',
    fallbackApy: 5.3,
    llamaConfig: {
      fullPoolId: '8fa2e60e-365a-41fc-8d50-fadde5041f94',
      project: 'infinifi',
      chain: 'Ethereum',
      symbol: 'SIUSD',
    },
    descFr: 'Banque fractionnaire on-chain. Tranche liquide (siUSD) déployée sur Aave/Fluid. Waterfall de pertes documenté : liUSD → siUSD → iUSD. Certora (vérification formelle). TGE début 2026.',
    descEn: 'On-chain fractional reserve banking. Liquid tranche (siUSD) deployed to Aave/Fluid. Documented loss waterfall: liUSD → siUSD → iUSD. Certora formal verification. TGE early 2026.',
    risk: 2,
    link: 'https://infinifi.xyz',
  },
  {
    id: 'reservoir',
    name: 'Reservoir (srUSD)',
    category: 'CDP Stablecoin',
    fallbackApy: 4.75,
    llamaConfig: {
      fullPoolId: 'd646f32f-d5af-4e34-a29f-8ebeea6a8520',
      project: 'reservoir-protocol',
      chain: 'Ethereum',
      symbol: 'WSRUSD',
    },
    descFr: 'Stablecoin CDP + taux d\'épargne (srUSD). Rendement des intérêts sur emprunts rUSD. Audité par Halborn + 4 audits spécialisés. Token DAM. TVL $526M.',
    descEn: 'CDP stablecoin + savings rate (srUSD). Yield from rUSD borrowing interest. Audited by Halborn + 4 specialized audits. DAM token. $526M TVL.',
    risk: 2,
    link: 'https://app.reservoir.xyz',
  },

  // ── Rewards Hunter 🪂 ──────────────────────────────────────────────────────
  {
    id: 'sierra',
    name: 'Sierra Money',
    category: 'Liquid Yield Token',
    fallbackApy: 4.78,
    tooRecent: true,  // Lancé nov 2025, natif Avalanche — non indexé DeFiLlama ETH yields
    llamaConfig: {
      fullPoolId: null,
      project: 'sierra-money',
      chain: 'Avalanche',
      symbol: 'SIERRA',
    },
    descFr: 'Protocole hybride RWA + DeFi. Rendement via fonds monétaires US (T-bills) et protocoles DeFi. Natif Avalanche, accessible sur Ethereum via LayerZero. Early adopters positionnés pour un potentiel airdrop.',
    descEn: 'Hybrid RWA + DeFi protocol. Yield through US money market funds and DeFi protocols. Native Avalanche, accessible on Ethereum via LayerZero. Early adopters positioned for potential airdrop.',
    risk: 2,
    link: 'https://app.sierra.money',
    airdropPotential: true,
  },
  {
    id: 'cap',
    name: 'stcUSD (Cap)',
    category: 'Institutional Credit',
    fallbackApy: 3.9,
    llamaConfig: {
      fullPoolId: 'bf6ca887-e357-49ec-8031-0d1a6141c455',
      project: 'cap',
      chain: 'Ethereum',
      symbol: 'STCUSD',
    },
    descFr: 'Crédit privé institutionnel. Des opérateurs (banques, HFT, market makers) empruntent au Cap Credit Engine et génèrent du rendement. Contrats immutables. Oracle RedStone. TVL $500M. Pas de token → TGE probable.',
    descEn: 'Institutional private credit. Operators (banks, HFT firms, market makers) borrow from Cap Credit Engine and generate yield. Immutable contracts. RedStone oracle. $500M TVL. No token yet → TGE likely.',
    risk: 2,
    link: 'https://cap.app',
    airdropPotential: true,
  },
  // thbill et susdai sont aussi dans Rewards Hunter (défini dans profiles.js)
]

// ── Les protocoles EN ÉVALUATION (coming soon) ────────────────────────────────
export const COMING_SOON_PROTOCOLS = [
  {
    id: 'pt-pendle',
    name: 'PT Pendle',
    category: 'Fixed Rate',
    descFr: 'Taux fixe garanti via la séparation du principal et du rendement. Complexité de gestion des dates d\'expiration.',
    descEn: 'Guaranteed fixed rate via principal/yield separation. Complexity in managing expiration dates.',
  },
]
