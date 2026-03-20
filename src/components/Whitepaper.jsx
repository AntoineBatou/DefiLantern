// Whitepaper.jsx — Page Livre Blanc / Whitepaper
//
// Affiche le whitepaper complet de DeFi Lantern en français ou en anglais
// selon la langue active du site.
// Accessible uniquement via le lien "Whitepaper" dans le footer.

import { useLang } from '../context/LangContext'

// ── Composants de mise en page ─────────────────────────────────────────────

function Section({ id, title, children }) {
  return (
    <section id={id} className="mb-12">
      <h2 className="text-2xl font-bold text-navy mb-6 pb-3 border-b border-lgrey">
        {title}
      </h2>
      {children}
    </section>
  )
}

function SubSection({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-navy mb-3">{title}</h3>
      {children}
    </div>
  )
}

function WpTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-navy text-white">
            {headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-2 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-bg'}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 text-navy/80 border-b border-lgrey">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CodeBlock({ children }) {
  return (
    <pre className="bg-navy text-[#2ABFAB] rounded-xl p-4 text-sm overflow-x-auto mb-4 font-mono leading-relaxed">
      <code>{children}</code>
    </pre>
  )
}

function InfoBox({ children }) {
  return (
    <div className="bg-teal-light border-l-4 border-[#2ABFAB] rounded-r-xl p-4 mb-4 text-sm text-navy/80 leading-relaxed">
      {children}
    </div>
  )
}

function WarningBox({ children }) {
  return (
    <div className="bg-amber-50 border-l-4 border-[#F5A623] rounded-r-xl p-4 mb-4 text-sm text-navy/80 leading-relaxed">
      {children}
    </div>
  )
}

// ── Contenu Français ───────────────────────────────────────────────────────

function WhitepaperFR() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-navy mb-3">DeFi Lantern — Livre Blanc v0.2</h1>
        <p className="text-navy/50 text-sm">Statut : Brouillon — Mars 2026. Tous les paramètres sont susceptibles de modification.</p>
        <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#2ABFAB]" />
      </div>

      {/* RÉSUMÉ */}
      <Section id="abstract" title="Résumé">
        <p className="text-navy/70 leading-relaxed">
          DeFi Lantern est un agrégateur de rendement non-custodial et multi-protocoles pour stablecoins,
          déployé sur Ethereum mainnet. Les utilisateurs déposent des USDC et reçoivent des parts ERC-4626 —
          <strong>glUSDC-P</strong>, <strong>glUSDC-B</strong>, <strong>glUSDC-D</strong> ou <strong>glUSDC-AH</strong> selon le profil
          de risque choisi — dont la valeur augmente au fil du temps à mesure que le protocole
          collecte les rendements d'un ensemble sélectionné de protocoles DeFi éprouvés.
        </p>
        <p className="text-navy/70 leading-relaxed mt-3">
          DeFi Lantern cible les détenteurs de stablecoins cherchant un rendement optimisé et passif,
          sans gestion active de portefeuille, sans exposition marché et sans risque de garde.
          Le capital est alloué entre seize protocoles sous-jacents couvrant les marchés de prêt,
          les instruments d'épargne en actifs réels (RWA), les stratégies delta-neutres,
          les pools de stabilité et le crédit institutionnel.
        </p>
        <p className="text-navy/70 leading-relaxed mt-3">
          La gouvernance est conduite on-chain via le token <strong>GLOW</strong> à travers une
          architecture Governor + Timelock, avec un multisig Guardian conservant uniquement
          des pouvoirs d'urgence (pause).
        </p>
      </Section>

      {/* 1. INTRODUCTION */}
      <Section id="intro" title="1. Introduction">
        <SubSection title="1.1 Le problème du rendement stablecoin">
          <p className="text-navy/70 leading-relaxed mb-3">
            Les détenteurs de stablecoins font face à un paysage de rendement fragmenté.
            Des dizaines de protocoles proposent des APY compétitifs, chacun avec des profils
            de risque distincts, des fenêtres de liquidité, des périodes de cooldown et
            une complexité d'intégration différentes. Un investisseur classique doit :
          </p>
          <ul className="list-disc list-inside text-navy/70 space-y-1 text-sm mb-3">
            <li>Surveiller les taux sur plusieurs protocoles simultanément</li>
            <li>Rééquilibrer manuellement le capital entre les stratégies</li>
            <li>Gérer les cooldowns et files d'attente de retrait indépendamment</li>
            <li>Évaluer les risques smart contract, oracle et contrepartie pour chaque protocole</li>
          </ul>
          <p className="text-navy/70 leading-relaxed">
            Cette friction entraîne soit du rendement laissé sur la table (capital inactif),
            soit une concentration excessive du risque (surexposition à un seul protocole).
          </p>
        </SubSection>

        <SubSection title="1.2 La réponse DeFi Lantern">
          <p className="text-navy/70 leading-relaxed mb-3">
            DeFi Lantern agrège le rendement de plusieurs protocoles via quatre vaults spécialisés.
            L'utilisateur choisit un profil de risque, dépose ses USDC dans le vault correspondant
            et reçoit des parts ERC-4626 (glUSDC-P, glUSDC-B, glUSDC-D ou glUSDC-AH) dont la valeur
            s'apprécie passivement. DeFi Lantern gère l'allocation, la collecte des rendements
            et le rééquilibrage.
          </p>
          <p className="text-navy/70 leading-relaxed">
            DeFi Lantern ne prend pas la garde des fonds utilisateurs — les actifs restent
            dans les protocoles sous-jacents à tout moment, accessibles uniquement via
            le mécanisme de retrait non-custodial du vault.
          </p>
        </SubSection>
      </Section>

      {/* 2. VUE D'ENSEMBLE */}
      <Section id="overview" title="2. Vue d'ensemble du protocole">
        <SubSection title="2.1 Propriétés fondamentales">
          <WpTable
            headers={['Propriété', 'Valeur']}
            rows={[
              ['Blockchain', 'Ethereum mainnet'],
              ['Actif de dépôt', 'USDC'],
              ['Tokens de part', 'glUSDC-P / glUSDC-B / glUSDC-D (ERC-4626, un vault par profil)'],
              ['Token de gouvernance', 'GLOW (ERC-20Votes)'],
              ['Frais', '5% de frais de performance sur les gains nets'],
              ['Garde', 'Non-custodial'],
              ['Retraits', 'Non-custodial, initiés par l\'utilisateur'],
              ['Rééquilibrage', 'Contrôlé par la gouvernance'],
            ]}
          />
        </SubSection>

        <SubSection title="2.2 Caractéristiques clés">
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Rendement à entrée unique.</strong> Un seul dépôt USDC donne accès à jusqu'à seize stratégies de rendement simultanées.</p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Conforme ERC-4626.</strong> glUSDC-P, glUSDC-B, glUSDC-D et glUSDC-AH sont des tokens de vault pleinement standardisés ERC-4626, composables avec tout protocole supportant ce standard. Chaque token est pleinement fongible au sein de son vault — un acheteur sur le marché secondaire connaît immédiatement son exposition.</p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Non-custodial par conception.</strong> Aucune clé admin ne peut déplacer les fonds des utilisateurs. Le multisig Guardian peut uniquement mettre en pause les nouveaux dépôts — les retraits restent ouverts en permanence.</p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Allocation transparente.</strong> Les poids cibles par protocole sont stockés on-chain en points de base (somme = 10 000). Tout détenteur de GLOW peut vérifier la stratégie à tout moment.</p>
          <p className="text-navy/70 text-sm"><strong className="text-navy">Gouvernance on-chain.</strong> Tous les changements de paramètres passent par un contrat Governor avec un Timelock de 48 heures.</p>
        </SubSection>

        <SubSection title="2.3 Utilisateurs cibles">
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1">
            <li>Détenteurs de stablecoins cherchant un rendement sans gestion active</li>
            <li>Investisseurs crypto natifs souhaitant une exposition diversifiée au rendement DeFi</li>
            <li>Institutions à l'aise avec l'infrastructure non-custodiale de smart contracts</li>
            <li>Développeurs construisant sur une couche de rendement ERC-4626 composable</li>
          </ul>
        </SubSection>

        <SubSection title="2.4 DeFi Lantern vs vaults concurrents">
          <p className="text-navy/70 text-sm mb-3">
            Le marché des vaults de rendement propose des dizaines d'options — agrégateurs, curators Morpho, vaults Lagoon. Choisir parmi eux demande des compétences d'analyse avancées, une connaissance des risques sous-jacents et une surveillance continue. DeFi Lantern est conçu pour répondre structurellement à ces limites.
          </p>
          <WpTable
            headers={['Critère', 'Vaults concurrents', 'DeFi Lantern']}
            rows={[
              ['Gouvernance de la stratégie', 'Curator libre de modifier les allocations sans vote', 'DAO uniquement (vote on-chain + Timelock 48h)'],
              ['Transparence', 'Allocations et décisions rarement traçables en temps réel', 'Tous les paramètres on-chain, vérifiables à tout moment'],
              ['Cap par protocole', 'Concentration possible sur une seule stratégie', 'Aucun protocole ne dépasse 15% du TVL'],
              ['Frais de performance', '10% en moyenne sur le marché', '5% — aligné sur les gains effectifs des déposants'],
              ['Changement de stratégie', 'Possible sans préavis ni délai par le curator', 'Impossible sans vote DAO et délai Timelock 48h'],
              ['Diversification', 'Variable selon le vault choisi', '9 à 17 protocoles selon le profil, revus par gouvernance'],
            ]}
          />
          <InfoBox>
            <strong>Code plutôt que confiance.</strong> Chez DeFi Lantern, la stratégie n'est pas une promesse — c'est du code. Aucun humain ne peut modifier unilatéralement les allocations, ajouter un protocole risqué ou abaisser les standards d'intégration sans un vote de la communauté suivi d'un délai obligatoire de 48 heures. Les détenteurs de glUSDC sont structurellement protégés contre les décisions discrétionnaires.
          </InfoBox>
        </SubSection>
      </Section>

      {/* 3. ARCHITECTURE */}
      <Section id="architecture" title="3. Architecture">
        <SubSection title="3.1 Quatre vaults ERC-4626 — glUSDC-P / glUSDC-B / glUSDC-D / glUSDC-AH">
          <p className="text-navy/70 leading-relaxed mb-3">
            DeFi Lantern déploie <strong>quatre instances du même contrat</strong>{' '}
            <code className="bg-navy/10 px-1 rounded">DeFiLanternVault.sol</code>, chacune avec
            ses propres adapters et poids d'allocation. Chaque vault émet un token distinct
            (glUSDC-P, glUSDC-B, glUSDC-D, glUSDC-AH), pleinement fongible au sein de son vault.
            L'utilisateur choisit son profil puis interagit avec le vault correspondant.
          </p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Flux de dépôt :</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>L'utilisateur choisit son profil (Prudent / Équilibré / Dynamique / Airdrop Hunter) et sélectionne le vault correspondant</li>
            <li>Il appelle <code className="bg-navy/10 px-1 rounded">deposit(amount, receiver)</code> sur ce vault</li>
            <li>Le vault mint des parts (glUSDC-P/B/D/AH) proportionnelles à <code className="bg-navy/10 px-1 rounded">amount / pricePerShare</code></li>
            <li>Les USDC sont alloués aux protocoles du profil selon les poids cibles</li>
          </ol>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Flux de retrait :</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>L'utilisateur appelle <code className="bg-navy/10 px-1 rounded">redeem(shares, receiver, owner)</code></li>
            <li>Le vault brûle les parts glUSDC-P/B/D/AH</li>
            <li>Le vault récupère les USDC des protocoles sous-jacents (en respectant les contraintes de cooldown)</li>
            <li>Les USDC sont envoyés à l'utilisateur</li>
          </ol>
          <InfoBox>
            <strong>Prix du share (pricePerShare)</strong> augmente de façon monotone au fil des collectes de rendement.
            Un utilisateur qui dépose 1 000 USDC dans le vault Prudent et reçoit 1 000 glUSDC-P à t=0
            pourra racheter ces 1 000 glUSDC-P contre ~1 035 USDC à t=1 an (APY net ~3,5% après frais).
            Sur le marché secondaire, tout acheteur de glUSDC-P sait qu'il s'expose aux seuls protocoles du profil Prudent.
          </InfoBox>
        </SubSection>

        <SubSection title="3.2 Pattern Adapter">
          <p className="text-navy/70 leading-relaxed mb-3">
            Chaque protocole sous-jacent est intégré via un contrat adapter dédié implémentant
            l'interface <code className="bg-navy/10 px-1 rounded">IAdapter</code> :
          </p>
          <CodeBlock>{`interface IAdapter {
    function deposit(uint256 amount) external;
    function withdraw(uint256 amount) external;
    function totalAssets() external view returns (uint256);
    function hasCooldown() external view returns (bool);
    function cooldownRemaining() external view returns (uint256);
}`}</CodeBlock>
          <p className="text-navy/70 leading-relaxed text-sm mb-4">
            Ce pattern isole la logique spécifique à chaque protocole du cœur du vault.
            Ajouter ou supprimer un protocole nécessite uniquement de déployer un nouvel adapter
            et de voter en gouvernance — le vault lui-même n'est jamais redéployé.
          </p>
          <InfoBox>
            <strong>Swap Adapters — protocoles non-USDC</strong><br />
            Certains protocoles n'acceptent pas directement les USDC. Le pattern <em>swap adapter</em> résout
            cela en intégrant un swap Uniswap V3 inline dans chaque adapter :
            <CodeBlock>{`deposit() : USDC → swap DEX → token requis → dépôt protocole → shares
withdraw() : shares → retrait protocole → token requis → swap DEX → USDC
totalAssets() : shares × pricePerShare (oracle Chainlink) → USDC équivalent`}</CodeBlock>
            Exemples concrets :
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>jrUSDe (Strata) :</strong> USDC → USDe (pool Uniswap V3 USDe/USDC) → jrUSDe</li>
              <li><strong>mPT-sUSDe (mStable) :</strong> USDC → USDe (Uniswap V3) → sUSDe (Ethena) → PT-sUSDe (Pendle) → vault mStable</li>
              <li><strong>sBOLD (Liquity v2) :</strong> USDC → BOLD (pool Uniswap V3 BOLD/USDC) → sBOLD</li>
            </ul>
            Coûts additionnels : ~150–200k gas pour le swap + slippage 0,1–0,5% selon la liquidité du pool.
            L'oracle <code className="bg-navy/10 px-1 rounded">totalAssets()</code> utilise Chainlink pour ramener
            la valeur des shares en USDC sans dépendre du prix spot instantané.
          </InfoBox>
        </SubSection>

        <SubSection title="3.3 Structure des contrats">
          <CodeBlock>{`contracts/
├── DeFiLanternVault.sol       ← ERC-4626, logique centrale
├── interfaces/
│   └── IAdapter.sol           ← Interface adapter commune
├── adapters/
│   ├── AaveAdapter.sol
│   ├── MorphoGauntletAdapter.sol
│   ├── MorphoSteakhouseAdapter.sol
│   ├── CompoundV3Adapter.sol
│   ├── SparkLendAdapter.sol
│   ├── FluxFinanceAdapter.sol
│   ├── EulerV2Adapter.sol
│   ├── sUSDSAdapter.sol
│   ├── fxSAVEAdapter.sol
│   ├── USDYAdapter.sol
│   ├── scrvUSDAdapter.sol
│   ├── sBOLDAdapter.sol
│   ├── ResolvUSRAdapter.sol
│   ├── cUSDOAdapter.sol
│   ├── syrupUSDCAdapter.sol
│   └── reUSDAdapter.sol
├── governance/
│   ├── GlowToken.sol          ← ERC-20Votes (GLOW)
│   ├── DeFiLanternGovernor.sol← OZ Governor
│   └── TimelockController.sol
└── utils/
    └── FeeManager.sol`}</CodeBlock>
        </SubSection>

        <SubSection title="3.4 Allocation du capital et poids">
          <p className="text-navy/70 leading-relaxed mb-3">
            Les poids cibles sont stockés on-chain en points de base (1 bp = 0,01%, somme = 10 000 bp = 100%).
            La fonction <code className="bg-navy/10 px-1 rounded">rebalance()</code> déplace le capital entre les adapters
            pour correspondre aux poids cibles. Le rééquilibrage est déclenché par vote de gouvernance.
          </p>
          <WpTable
            headers={['Protocole', 'Tier', 'Catégorie', 'Poids cible']}
            rows={[
              ['Aave v3', '1 — Core', 'Lending', '15%'],
              ['Morpho (Gauntlet USDC Core)', '1 — Core', 'Lending', '12%'],
              ['Morpho (Steakhouse USDC)', '1 — Core', 'Lending', '10%'],
              ['Compound v3', '2 — Standard', 'Lending', '7%'],
              ['SparkLend (Sky)', '2 — Standard', 'Lending', '7%'],
              ['sUSDS (Sky)', '2 — Standard', 'Savings Rate', '8%'],
              ['USDY (Ondo)', '2 — Standard', 'RWA T-bills', '6%'],
              ['scrvUSD (Curve)', '2 — Standard', 'Savings Rate', '6%'],
              ['sBOLD (Liquity v2)', '2 — Standard', 'Stability Pool', '6%'],
              ['Euler v2', '2 — Standard', 'Lending', '5%'],
              ['Resolv USR', '3 — Satellite', 'Delta-Neutral', '4%'],
              ['cUSDO (OpenEden)', '3 — Satellite', 'RWA T-bills', '4%'],
              ['fxSAVE (f(x) Protocol)', '3 — Satellite', 'Stability Pool', '4%'],
              ['Flux Finance', '3 — Satellite', 'Lending', '3%'],
              ['syrupUSDC (Maple)', '3 — Satellite', 'Institutional Credit', '2%'],
              ['reUSD (Re Protocol)', '3 — Satellite', 'Reinsurance', '1%'],
            ]}
          />
          <InfoBox>
            <strong>Note sur la liquidité :</strong> En parallèle de ces allocations, DeFi Lantern maintient une <strong>réserve de liquidité séparée de 10% du TVL</strong>, déposée sur Aave v3 (retrait instantané). Cette réserve est distincte du poids d'allocation d'Aave dans le tableau ci-dessus — elle s'y ajoute. En cas de retrait supérieur à cette réserve, une file de priorité s'active : Morpho → autres protocoles sans cooldown → file d'attente (max 7 jours). Les poids cibles ci-dessus sont indicatifs (v0.2) et seront affinés par la gouvernance au lancement.
          </InfoBox>
        </SubSection>

        <div id="risk-profiles">
        <SubSection title="3.5 Profils de risque">
          <p className="text-navy/70 leading-relaxed mb-3">
            DeFi Lantern déploie <strong>quatre vaults ERC-4626 distincts</strong>, un par profil de risque,
            chacun émettant son propre token fongible. L'utilisateur choisit son profil à l'entrée
            et dépose dans le vault correspondant. Ce design garantit qu'un acheteur sur le marché
            secondaire connaît immédiatement son exposition : glUSDC-P = uniquement des protocoles
            tier 1, glUSDC-D = uniquement des protocoles tier 3.
          </p>
          <WpTable
            headers={['Profil', 'Protocoles', 'APY cible', 'Allocation']}
            rows={[
              ['🛡️ Prudent', '9 protocoles — tier 1 + sUSDe (delta-neutre audité) + reUSD (tranche senior Re Protocol) + Resolv USR (delta-neutre, rendement modéré)', '~4–6%', 'Poids max 15% par protocole — concentrés sur les protocoles les plus audités et liquides'],
              ['⚖️ Équilibré', '17 protocoles — 50% capital Prudent + 50% capital Dynamique', '~6–9%', 'Mix équipondéré entre les deux pools (poids × 0,5)'],
              ['⚡ Dynamique', '8 protocoles — tier 3 (sNUSD, syrupUSDC, jrUSDe, sUSD3, imUSD, reUSDe, RLP, stkUSDC)', '~9–15%', 'Poids concentrés sur les protocoles à rendement élevé, y compris tranches juniors'],
              ['🪂 Airdrop Hunter', '1+ protocole(s) — Sierra Money (hybride RWA+DeFi, T-bills + Aave/Morpho, natif Avalanche bridgé LayerZero). Liste évolutive par vote de gouvernance.', 'Variable (~4–8%+)', 'Protocoles innovants sélectionnés pour vision, exécution technique et potentiel d\'airdrop. Poids 100% Sierra Money en v1.'],
            ]}
          />
          <InfoBox>
            <strong>Profil Dynamique et mode Cyber/Neon :</strong> en plus d'une allocation
            plus agressive, le profil Dynamique active une interface visuelle distincte
            (thème sombre violet/cyan) pour signaler visuellement le changement de niveau de risque.
            Ce signal UI rappelle à l'utilisateur qu'il opère dans une stratégie plus risquée.
          </InfoBox>
          <InfoBox>
            <strong>Profil Airdrop Hunter et thème Rouge & Or :</strong> le profil Airdrop Hunter
            active un thème visuel distinct (fond sombre <code className="bg-navy/10 px-1 rounded">#1A0A0A</code>, accents rouge{' '}
            <code className="bg-navy/10 px-1 rounded">#C0392B</code> et or{' '}
            <code className="bg-navy/10 px-1 rounded">#FFD700</code>). Ce signal UI différencie clairement
            ce profil des autres et rappelle à l'utilisateur sa nature spéculative.{' '}
            <strong>Les airdrops constituent un bonus potentiel non garanti — jamais un rendement promis.</strong>
          </InfoBox>
          <p className="text-navy/70 text-sm">
            Les poids d'allocation de chaque profil sont stockés on-chain et modifiables
            par vote de gouvernance, dans les limites fixées par les tiers de risque (§7.2).
          </p>
        </SubSection>
        </div>

        <SubSection title="3.6 Architecture cross-chain (Dynamic et Airdrop Hunter)">
          <p className="text-navy/70 leading-relaxed mb-3">
            Les profils Prudent et Balanced s'appuient exclusivement sur des protocoles natifs Ethereum.
            Pour les profils Dynamic et Airdrop Hunter, DeFi Lantern accède à des protocoles
            sur d'autres chaînes tout en maintenant l'invariant fondamental : <strong>l'utilisateur
            dépose et retire uniquement en USDC sur Ethereum mainnet</strong>.
          </p>
          <SubSection title="Problème fondamental">
            <p className="text-navy/70 text-sm mb-3">
              L'ERC-4626 suppose que <code className="bg-navy/10 px-1 rounded">totalAssets()</code> est
              synchrone et observable on-chain. En contexte cross-chain, cette valeur dépend
              d'actifs déposés sur d'autres chaînes, introduisant des délais et des risques d'oracle.
            </p>
          </SubSection>
          <SubSection title="Quatre architectures possibles">
            <WpTable
              headers={['Architecture', 'Principe', 'Décentralisation', 'Complexité', 'Réalisme MVP']}
              rows={[
                ['0 — Token bridgé sur ETH', 'Le protocole cible émet un token représentatif sur ETH (ex. Sierra Money via LayerZero OFT). Le vault achète ce token directement.', '✅ Complète', 'Faible', '⭐⭐⭐⭐⭐'],
                ['1 — Keeper + bridge natif', 'Un keeper off-chain exécute les bridges via Stargate V2 et pousse un oracle de balance toutes les ~1h.', '❌ Keeper central', 'Moyenne', '⭐⭐⭐'],
                ['2 — Satellites + LayerZero', 'Contrats satellites déployés sur chaque chaîne cible ; le vault ETH coordonne via messages LZ. Architecture cible v2.', '✅ On-chain', 'Très haute', '⭐'],
                ['3 — Chainlink CCIP', 'Identique à l\'Arch. 2 avec CCIP. Latence 5–15 min. Standard institutionnel (Sommelier, Synthetix v3).', '✅ On-chain', 'Extrême', '⭐'],
              ]}
            />
          </SubSection>
          <InfoBox>
            <strong>Choix MVP — Architecture 0 (token bridgé sur ETH) :</strong> en v1,
            DeFi Lantern n'intègre que des protocoles disposant d'un token représentatif sur
            Ethereum mainnet (OFT LayerZero ou équivalent). Sierra Money en est l'exemple
            fondateur. Cette approche maintient le vault 100% on-chain sur ETH,
            avec <code className="bg-navy/10 px-1 rounded">totalAssets()</code> synchrone et les retraits
            instantanés. L'Architecture 2 (satellites) constitue la roadmap v2 pour les
            protocoles sans représentation sur ETH.
          </InfoBox>
          <SubSection title="Protocoles cross-chain étudiés">
            <WpTable
              headers={['Protocole', 'Chaîne native', 'Type', 'APY', 'Bridge ETH', 'Intégration']}
              rows={[
                ['Sierra Money', 'Avalanche', 'LYT hybride RWA+DeFi', '~4,78%', '✅ LayerZero OFT', '★★☆ — Arch. 0, SierraAdapter.sol requis'],
                ['sUSDai (USD.AI)', 'ETH mainnet + L2s', 'Stablecoin adossé à des GPU IA (~13–17%)', '~13–17%', 'À confirmer (natif ETH probable)', '★★☆ — Arch. 0 si disponible sur ETH mainnet'],
                ['yzPP — Yuzu Money', 'Plasma L1 (Tether)', 'Junior tranche (first-loss buffer)', '14–40% variable', '❌ Aucun bridge ETH connu', '★☆☆ — Arch. 1 ou 2 requise'],
              ]}
            />
          </SubSection>
          <SubSection title="Gestion des risques cross-chain">
            <WpTable
              headers={['Risque', 'Impact', 'Mitigation']}
              rows={[
                ['Oracle stale (délai de mise à jour)', 'NAV potentiellement incorrecte', 'TWAP + circuit breaker + MAX_STALENESS on-chain'],
                ['Bridge hors service', 'Fonds temporairement inaccessibles', 'Buffer 10% TVL sur Aave v3 (ETH) toujours accessible'],
                ['Slippage bridge', 'Drag sur le rendement net', 'Harvest hebdomadaire, Stargate Bus (réduction coûts >90%)'],
                ['Exploit bridge', 'Perte partielle cross-chain', 'Cap 15% par protocole applicable aux positions cross-chain'],
              ]}
            />
          </SubSection>
        </SubSection>
      </Section>

      {/* 4. PROTOCOLES SOUS-JACENTS */}
      <Section id="protocols" title="4. Protocoles sous-jacents">
        <SubSection title="4.1 Méthodologie de sélection">
          <WpTable
            headers={['Critère', 'Exigence']}
            rows={[
              ['Qualité des audits', 'Minimum 2 audits par des firmes reconnues'],
              ['TVL', '> 100M$ (ou < 100M$ avec profil de risque exceptionnel)'],
              ['Oracle', 'Chainlink ou flux décentralisé équivalent'],
              ['Permissionné', 'Pas d\'exigence KYC au niveau smart contract (exception : syrupUSDC — les emprunteurs institutionnels sont KYC, mais le dépôt dans le vault reste permissionless)'],
              ['Cooldown', 'Documenté et géré via le buffer de liquidité 10% + file d\'attente (voir §5.3)'],
              ['Blockchain', 'Ethereum mainnet (déploiement natif)'],
              ['Équipe', 'Publique ou avec un track record avéré'],
              ['Proof of Reserve', 'Pour les protocoles RWA'],
            ]}
          />
        </SubSection>

        <SubSection title="4.2 Protocoles retenus">
          <div className="space-y-4">
            {[
              {
                name: 'Aave v3',
                cat: 'Lending',
                desc: 'Le protocole de lending de référence avec ~28Md$ TVL. Vos USDC sont prêtés à des emprunteurs qui déposent un collatéral en garantie. Audité par Trail of Bits, OpenZeppelin, Certora (vérification formelle), PeckShield et ABDK. Oracle : Chainlink. Timelock : 1 jour / 7 jours. Pas de cooldown.',
              },
              {
                name: 'Morpho (Gauntlet USDC Core)',
                cat: 'Lending',
                desc: 'Vault Morpho géré par Gauntlet avec ~5Md$ TVL sur Ethereum. Marchés de risque isolés — chaque vault n\'expose les prêteurs qu\'à son ensemble spécifique de collatéraux. Audité par Trail of Bits, Dedaub, Spearbit et Cantina. Pas de cooldown.',
              },
              {
                name: 'Morpho (Steakhouse USDC)',
                cat: 'Lending',
                desc: 'Vault Morpho ultra-conservateur géré par Steakhouse Financial. Collatéraux de haute qualité finement sélectionnés (ETH, wstETH, WBTC), exposition minimale au risque. Pas de cooldown.',
              },
              {
                name: 'Compound v3',
                cat: 'Lending',
                desc: 'Protocole de lending historique de la DeFi. Le marché USDC v3 sur Ethereum est l\'un des plus audités et des plus liquides de l\'écosystème. Audité par OpenZeppelin, Trail of Bits. Oracle : Chainlink. Pas de cooldown.',
              },
              {
                name: 'SparkLend (Sky)',
                cat: 'Lending',
                desc: 'Fork Aave v3 développé par Sky (ex-MakerDAO). Bénéficie de l\'infrastructure et de l\'expérience de l\'un des protocoles DeFi les plus éprouvés. Audits complets et timelock robuste hérité de MakerDAO.',
              },
              {
                name: 'Flux Finance',
                cat: 'Lending',
                desc: 'Fork Compound v2 spécialisé supportant OUSG (T-bills Ondo) comme collatéral. Permet aux détenteurs de RWA institutionnels d\'emprunter contre leurs actifs. Deux audits réalisés. Pas de cooldown.',
              },
              {
                name: 'Euler v2',
                cat: 'Lending',
                desc: 'Protocole de lending modulaire relancé après l\'incident de 2023 (remboursement intégral des ~200M$ perdus). Architecture entièrement repensée avec des vaults isolés, une sécurité renforcée et un programme de bug bounty actif.',
              },
              {
                name: 'sUSDS (Sky)',
                cat: 'Savings Rate',
                desc: '~8Md$ TVL. Taux d\'épargne officiel de Sky (ex-MakerDAO). Les USDC sont convertis en USDS via le PSM de Sky (sans slippage, 1:1) puis déposés dans le contrat Sky Savings Rate. Rendement issu des intérêts des emprunteurs USDS. Double timelock : 18h et 48h. Pas de cooldown.',
              },
              {
                name: 'fxSAVE (f(x) Protocol)',
                cat: 'Stability Pool',
                desc: 'Pool de stabilité ERC-4626 du protocole f(x). Architecture innovante à deux tokens (fxUSD et xETH) : fxSAVE absorbe les liquidations de xETH et perçoit les intérêts des emprunteurs fxUSD. Rendement plus élevé en échange d\'une légère exposition aux liquidations.',
              },
              {
                name: 'USDY (Ondo Finance)',
                cat: 'RWA T-bills',
                desc: '~650M$ TVL. USDC achète USDY, un token porteur de rendement adossé à des bons du Trésor américains à court terme et des obligations de qualité investment grade (BlackRock, Franklin Templeton). APY : 4,3–5,3%. Sans permission (Reg S — résidents US exclus). Oracle : Chainlink. Pas de cooldown.',
              },
              {
                name: 'scrvUSD (Curve Finance)',
                cat: 'Savings Rate',
                desc: 'ERC-4626 natif. Le rendement provient des intérêts versés par les emprunteurs crvUSD (marchés LLAMMA). APY variable (~9% sept. 2025). Audité par Trail of Bits, MixBytes, Quantstamp. Timelock : 7 jours (vote Curve DAO). Pas de cooldown.',
              },
              {
                name: 'sBOLD (Liquity v2)',
                cat: 'Stability Pool',
                desc: 'ERC-4626 natif. Le rendement provient de 75% des intérêts des emprunteurs BOLD, distribués aux déposants de la Pool de Stabilité. Le cœur de Liquity v2 est immuable (pas de clés admin). Audité par ChainSecurity, Dedaub et Certora. Pas de cooldown.',
              },
              {
                name: 'Resolv USR',
                cat: 'Delta-Neutral',
                desc: '~400M$ TVL. USR est un stablecoin delta-neutre adossé à ETH spot long + ETH short en perp. Le rendement provient des taux de financement et des récompenses de staking. Pas de cooldown — remboursement instantané. Audité par PeckShield et Ottersec. DeFi Lantern intègre USR dans les profils Prudent et Équilibré. RLP (tranche junior, prix non-stable ~$1,28) est intégré uniquement dans le profil Dynamique.',
              },
              {
                name: 'cUSDO (OpenEden)',
                cat: 'RWA T-bills',
                desc: '~100-150M$ TVL. 100% bons du Trésor américains + repo. Le seul produit T-bills pur natif sur Ethereum mainnet. Oracle Chainlink (cUSDO/USD). Audité par Certik et ChainSecurity. Pas de cooldown.',
              },
              {
                name: 'syrupUSDC (Maple Finance)',
                cat: 'Institutional Credit',
                desc: '~2,66Md$ TVL. Rendement issu des intérêts sur des prêts à des institutions crypto vérifiées (market makers, hedge funds). APY : 8–12%. ERC-4626. Audité par Spearbit et Sherlock. Incident historique : défaut d\'Orthogonal Trading déc. 2022 (perte 36M$). Protocole sans incident depuis Maple 2.0 (2023).',
              },
              {
                name: 'reUSD (Re Protocol)',
                cat: 'Reinsurance',
                desc: 'Token de rendement à capital protégé. Taux = max(taux sans risque + 250 bps, rendement Ethena + 250 bps). reUSDe (tranche junior) absorbe les pertes avant que reUSD ne soit affecté. DeFi Lantern intègre uniquement reUSD.',
              },
              {
                name: 'sNUSD (Neutrl)',
                cat: 'Delta-Neutral',
                desc: '~16–17% APY. Stratégie delta-neutre sur ETH via positions couvertes sur plusieurs CEX/DEX. Dépôt USDC direct. Rendement issu des taux de financement des positions courtes en perp. Audits en cours.',
              },
              {
                name: 'jrUSDe (Strata Finance)',
                cat: 'Market Neutral',
                desc: '~12–20% APY variable. Tranche junior de la stratégie USDe d\'Ethena. Rendement amplifié en échange d\'une absorption prioritaire des pertes si les taux de financement deviennent négatifs. Swap adapter : USDC → USDe (Uniswap V3) → jrUSDe.',
              },
              {
                name: 'sUSD3 (3Jane)',
                cat: 'Institutional Credit',
                desc: '~8–12% APY. Protocole de prêts institutionnels non-sécurisés vérifiés via zkTLS (preuve de solvabilité on-chain). Soutenu par Paradigm. Protocole récent (~3 mois). Cooldown : 1 mois. DeFi Lantern suit son évolution de près.',
              },
              {
                name: 'mPT-sUSDe (mStable)',
                cat: 'Fixed Rate',
                desc: '~15–35% APY. Stratégie leviérisée combinant sUSDe (Ethena), un PT à taux fixe via Pendle et un borrow loop sur Aave. mStable gère la boucle automatiquement. Swap adapter : USDC → USDe (Uniswap V3) → sUSDe → PT-sUSDe (Pendle) → vault mStable.',
              },
              {
                name: 'stkUSDC (Aave Umbrella)',
                cat: 'Safety Module',
                desc: '~3–5% APY. Module de sécurité Aave v3 (Umbrella). USDC convertis en aUSDC puis stakés pour couvrir les déficits de bad debt d\'Aave en dernier recours. Récompenses de sécurité en compensation du risque. Flux : USDC → aUSDC → stake.',
              },
              {
                name: 'reUSDe (Re Protocol)',
                cat: 'Reinsurance',
                desc: '~8–12% APY. Tranche junior du protocole Re, adossée à la stratégie sUSDe d\'Ethena. reUSDe absorbe les pertes en premier si Ethena sous-performe — en échange d\'un rendement amplifié. DeFi Lantern intègre reUSDe uniquement dans le profil Dynamique. Disponible sur Ethereum mainnet.',
              },
              {
                name: 'RLP (Resolv)',
                cat: 'Delta-Neutral',
                desc: '~15–25% APY variable. Tranche junior du protocole Resolv — absorbe les pertes avant que USR ne soit affecté. Actif à prix variable (~1,28$), non-stable par conception. Disponible sur Ethereum mainnet. DeFi Lantern intègre RLP uniquement dans le profil Dynamique en raison de son prix non-stable et de son rôle de tranche junior. Audité par PeckShield et Ottersec.',
              },
            ].map((p) => (
              <div key={p.name} className="bg-bg rounded-xl p-4 border border-lgrey">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-navy text-sm">{p.name}</span>
                  <span className="text-xs bg-[#2ABFAB]/10 text-[#2ABFAB] rounded-full px-2 py-0.5">{p.cat}</span>
                </div>
                <p className="text-navy/70 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="4.3 Protocoles exclus — justification">
          <p className="text-navy/70 text-sm mb-3">Les protocoles suivants ont été explicitement écartés :</p>
          <WpTable
            headers={['Protocole', 'Catégorie', 'Raison d\'exclusion']}
            rows={[
              ['sUSD (Synthetix)', 'Synthétique', 'Dépeg historique à $0,86 lors de la crise Synthetix (2023). Mécanisme de peg moins robuste que les stablecoins adossés à des collatéraux réels ou à des stratégies delta-neutres.'],
              ['Resupply reUSD', 'Lending', 'Protocole hacké en juin 2025 (~$9,5M de pertes). Exclus définitivement de la v1.'],
              ['syrupUSDC (KYC wall)', 'Credit', 'Inclus en tier 3. Note : les emprunteurs institutionnels sont KYC — le dépôt dans le vault reste permissionless.'],
            ]}
          />
          <InfoBox>
            <strong>Note RLP :</strong> RLP (Resolv Liquidity Pool) était initialement envisagé comme exclu en raison de son prix non-stable (~$1,28) et de son rôle de tranche junior. Il a finalement été intégré dans le <strong>profil Dynamique uniquement</strong>, où son rendement élevé (15–25% APY) est justifié par le profil de risque explicitement plus agressif de ce vault.
          </InfoBox>
        </SubSection>

        <SubSection title="4.4 Protocoles en évaluation">
          <p className="text-navy/70 text-sm mb-3">Les protocoles suivants sont à l'étude pour une intégration future :</p>
          <WpTable
            headers={['Protocole', 'Catégorie', 'Point de discussion']}
            rows={[
              ['PT Pendle', 'Fixed Rate', 'Gestion des dates d\'expiration dans un agrégateur. Stratégie de rollover nécessaire.'],
              ['Venus Core', 'Lending', 'Leader sur BNB Chain. Compatibilité avec l\'architecture Ethereum mainnet à confirmer.'],
            ]}
          />
        </SubSection>
      </Section>

      {/* 5. RENDEMENT, FRAIS ET LIQUIDITÉ */}
      <Section id="yield" title="5. Rendement, frais et liquidité">
        <SubSection title="5.1 Harvest">
          <p className="text-navy/70 leading-relaxed">
            La fonction <code className="bg-navy/10 px-1 rounded">harvest()</code> collecte les rendements
            accumulés de tous les adapters, les compose dans le vault et applique les frais de performance.
            Le harvest est déclenché périodiquement (manuellement en v1, potentiellement automatisé en v2).
          </p>
        </SubSection>

        <SubSection title="5.2 Frais de performance">
          <p className="text-navy/70 leading-relaxed mb-3">
            DeFi Lantern prélève des <strong>frais de performance de 5%</strong> sur les gains nets,
            appliqués au moment du harvest.
          </p>
          <InfoBox>
            <strong>Implémentation :</strong> les frais ne sont jamais transférés en USDC.
            À chaque harvest, le FeeManager mint de nouveaux tokens glUSDC-P/B/D/AH au treasury proportionnellement
            au gain, diluant les actionnaires existants de 5% du rendement produit.
            Ce mécanisme aligne les intérêts du treasury avec ceux des utilisateurs —
            le treasury ne perçoit un revenu que lorsque les utilisateurs en perçoivent un.
          </InfoBox>
          <CodeBlock>{`gain        = totalAssets_après_yield - totalAssets_avant_yield
fee_en_usd  = gain × 5%
new_shares  = fee_en_usd / pricePerShare_après_yield`}</CodeBlock>
          <p className="text-navy/70 text-sm">Le treasury est un multisig Gnosis Safe contrôlé par l'équipe DeFi Lantern.</p>
        </SubSection>

        <SubSection title="5.3 Buffer de liquidité et mécanisme de retrait">
          <p className="text-navy/70 leading-relaxed mb-3">
            DeFi Lantern maintient une <strong>réserve de liquidité permanente de 10% du TVL</strong>,
            déposée sur Aave v3 (retrait instantané). Cette réserve est distincte du poids
            d'allocation d'Aave dans le tableau des poids — elle s'y ajoute en tant que coussin
            liquide dédié. Elle couvre la grande majorité des demandes de retrait individuelles sans délai.
          </p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">File de priorité de retrait :</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-4">
            <li><strong>Réserve de liquidité</strong> (10% du TVL, déposée sur Aave v3) — retrait instantané, servie en premier</li>
            <li><strong>Morpho</strong> — quasi-instantané si le marché sous-jacent est liquide</li>
            <li><strong>Autres protocoles sans cooldown</strong> (Compound, SparkLend, sUSDS…)</li>
            <li><strong>File d'attente</strong> (max 7 jours) — un event <code className="bg-navy/10 px-1 rounded">WithdrawalQueued</code> est émis si les liquidités disponibles sont insuffisantes</li>
          </ol>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Flux de retrait :</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>L'utilisateur appelle <code className="bg-navy/10 px-1 rounded">redeem(shares)</code></li>
            <li>Le vault brûle les parts glUSDC-P/B/D/AH et calcule le montant proportionnel dû depuis chaque adapter</li>
            <li>Les fonds des protocoles sans cooldown sont reversés immédiatement à l'utilisateur</li>
            <li>Pour les protocoles avec cooldown, l'utilisateur attend la fin du délai propre à chaque protocole</li>
          </ol>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Option de retrait en tokens natifs (syrupUSDC) :</strong></p>
          <p className="text-navy/70 text-sm mb-3">
            Pour syrupUSDC (cooldown ~5 min), le vault peut proposer à l'utilisateur de recevoir
            directement ses <em>syrupUSDC</em> au lieu d'attendre le rachat en USDC.
            L'utilisateur conserve ainsi sa position et peut la gérer librement sur Maple Finance,
            sans subir de délai d'attente dans la queue du vault.
          </p>
          <InfoBox>
            <strong>Pas de mutualisation :</strong> DeFi Lantern ne constitue pas de buffer de liquidité commun
            en puisant dans les positions des autres déposants. Chaque retrait est strictement
            proportionnel à la position de l'utilisateur concerné dans chaque protocole sous-jacent.
          </InfoBox>
        </SubSection>
      </Section>

      {/* 6. GOUVERNANCE */}
      <Section id="governance" title="6. Gouvernance">
        <SubSection title="6.1 Token GLOW">
          <p className="text-navy/70 leading-relaxed mb-3">
            GLOW est le token de gouvernance ERC-20Votes de DeFi Lantern. Les détenteurs de GLOW
            peuvent proposer et voter sur tous les changements de paramètres du protocole.
          </p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Actions gouvernables :</strong></p>
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1">
            <li><code className="bg-navy/10 px-1 rounded">addAdapter(address)</code> — ajouter une nouvelle intégration protocole</li>
            <li><code className="bg-navy/10 px-1 rounded">removeAdapter(address)</code> — déprécier une intégration existante</li>
            <li><code className="bg-navy/10 px-1 rounded">setWeights(uint256[])</code> — mettre à jour les poids d'allocation cibles</li>
            <li><code className="bg-navy/10 px-1 rounded">setPerformanceFee(uint256)</code> — mettre à jour le pourcentage de frais</li>
            <li><code className="bg-navy/10 px-1 rounded">setTreasury(address)</code> — mettre à jour l'adresse du treasury</li>
          </ul>
        </SubSection>

        <SubSection title="6.2 Paramètres du Governor">
          <WpTable
            headers={['Paramètre', 'Valeur']}
            rows={[
              ['Délai de vote', '1 jour (après création de la proposition)'],
              ['Période de vote', '3 jours'],
              ['Quorum', '10% de l\'offre totale de GLOW'],
              ['Seuil de proposition', '1% de l\'offre totale de GLOW'],
              ['Délai Timelock', '48 heures'],
            ]}
          />
        </SubSection>

        <SubSection title="6.3 Timelock">
          <p className="text-navy/70 leading-relaxed">
            Toutes les décisions de gouvernance passent par un TimelockController de 48 heures
            avant exécution. Cela donne aux utilisateurs le temps de quitter le protocole
            s'ils désapprouvent une proposition adoptée.
          </p>
        </SubSection>

        <SubSection title="6.4 Guardian">
          <p className="text-navy/70 leading-relaxed mb-2">
            Un multisig 2-sur-3 contrôlé par l'équipe principale détient les droits Guardian. Le Guardian peut :
          </p>
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>Appeler <code className="bg-navy/10 px-1 rounded">pause()</code> — bloque les nouveaux dépôts et les rééquilibrages</li>
            <li>Appeler <code className="bg-navy/10 px-1 rounded">emergencyExit(address adapter)</code> — force le retrait immédiat de tous les fonds d'un protocole sous-jacent spécifique en cas de hack ou d'anomalie critique</li>
          </ul>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Fonctionnement de emergencyExit :</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>Le Guardian identifie un protocole compromis et appelle <code className="bg-navy/10 px-1 rounded">emergencyExit(adapter)</code></li>
            <li>L'adapter retire tous les fonds du protocole défaillant — les USDC (ou tokens) atterrissent dans le vault</li>
            <li>Les utilisateurs peuvent immédiatement retirer leur part proportionnelle de ces fonds</li>
            <li>La gouvernance vote ensuite pour réallouer le capital restant sur les autres protocoles actifs</li>
          </ol>
          <InfoBox>
            <strong>Garantie de non-confiscation :</strong> Le Guardian ne peut en aucun cas transférer les fonds vers une adresse externe. <code className="bg-navy/10 px-1 rounded">emergencyExit</code> déplace uniquement les fonds vers le vault lui-même — ils restent accessibles aux utilisateurs via leurs retraits normaux.
          </InfoBox>
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1">
            <li><strong>Ne peut pas</strong> modifier les poids ou les frais</li>
            <li><strong>Ne peut pas</strong> ajouter ou supprimer des protocoles (action de gouvernance)</li>
            <li><strong>Ne peut pas</strong> envoyer les fonds en dehors du vault</li>
          </ul>
        </SubSection>
      </Section>

      {/* 7. SÉCURITÉ */}
      <Section id="security" title="7. Sécurité">
        <SubSection title="7.1 Sécurité des smart contracts">
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1">
            <li>Tous les contrats cœur seront audités par au minimum deux firmes de sécurité indépendantes avant le déploiement en mainnet</li>
            <li>Un bug bounty public sera lancé sur Immunefi avant le lancement</li>
            <li>Les contrats utiliseront OpenZeppelin v5 comme bibliothèque de base</li>
            <li>Pas d'appels externes dans le cœur du vault — toutes les interactions protocoles sont isolées dans les adapters</li>
          </ul>
        </SubSection>

        <SubSection title="7.2 Gestion du risque protocole">
          <WpTable
            headers={['Niveau', 'Allocation max.', 'Critères', 'Protocoles']}
            rows={[
              ['1 — Core', '20%', 'TVL > 1Md$, 3+ audits Tier-1, 2+ ans en production', 'Aave v3, Morpho (×2)'],
              ['2 — Standard', '10%', 'TVL > 200M$, 2+ audits, 1+ an en production', 'Compound v3, SparkLend, Euler v2, sUSDS, USDY, scrvUSD, sBOLD'],
              ['3 — Satellite', '5%', 'TVL < 200M$ ou < 1 an en production, audits solides', 'Flux Finance, fxSAVE, Resolv USR, cUSDO, syrupUSDC, reUSD, reUSDe, RLP'],
            ]}
          />
        </SubSection>

        <SubSection title="7.3 Procédures d'urgence">
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Scénario 1 — Anomalie générale (pause) :</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-4">
            <li>Guardian détecte une anomalie → appelle <code className="bg-navy/10 px-1 rounded">pause()</code> → nouveaux dépôts et rééquilibrages stoppés</li>
            <li>Les utilisateurs peuvent toujours retirer selon le mécanisme proportionnel habituel</li>
            <li>La gouvernance vote sur la résolution et l'exécution est soumise au Timelock 48h</li>
          </ol>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Scénario 2 — Hack ou défaillance d'un protocole sous-jacent :</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1">
            <li>Guardian identifie le protocole compromis → appelle <code className="bg-navy/10 px-1 rounded">emergencyExit(adapter)</code></li>
            <li>Tous les fonds du protocole défaillant sont retirés et conservés dans le vault</li>
            <li>Les utilisateurs peuvent retirer leur part proportionnelle immédiatement</li>
            <li>La gouvernance vote pour réallouer le capital restant sur les autres adapters actifs (soumis au Timelock 48h)</li>
          </ol>
        </SubSection>
      </Section>

      {/* 8. TOKENOMIQUE */}
      <Section id="tokenomics" title="8. Tokenomique">
        <WarningBox>
          <strong>Note :</strong> les paramètres de tokenomique sont indicatifs et susceptibles de révision.
        </WarningBox>

        <SubSection title="8.1 Token GLOW">
          <WpTable
            headers={['Paramètre', 'Valeur']}
            rows={[
              ['Offre totale', '100 000 000 GLOW'],
              ['Standard', 'ERC-20Votes'],
              ['Inflation', 'Aucune (offre fixe)'],
            ]}
          />
        </SubSection>

        <SubSection title="8.2 Distribution initiale">
          <WpTable
            headers={['Allocation', '%', 'Montant', 'Vesting', 'Justification']}
            rows={[
              ['Équipe (5 fondateurs)', '20%', '4 000 000 chacun', 'Cliff 12 mois + linéaire 24 mois', 'Les fondateurs ne peuvent pas vendre au lancement'],
              ['Treasury / DAO', '40%', '40 000 000', 'Gouverné par la DAO', 'Finance les audits, l\'infrastructure, le développement'],
              ['Communauté / Liquidity Mining', '30%', '30 000 000', 'Émission sur 48 mois aux déposants des 4 vaults (glUSDC-P/B/D/AH)', 'Bootstrap de l\'adoption par récompense des premiers utilisateurs'],
              ['Écosystème / Grants', '10%', '10 000 000', 'Discrétionnaire, gouverné par la DAO', 'Intégrations, hackathons, partenariats tiers'],
            ]}
          />
        </SubSection>

        <SubSection title="8.3 Utilité du GLOW">
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1">
            <li><strong className="text-navy">Gouvernance :</strong> voter sur tous les paramètres du protocole (poids, frais, adapters)</li>
            <li><strong className="text-navy">Droits de proposition :</strong> détenir ≥ 1% de l'offre (1 000 000 GLOW) permet de proposer des changements</li>
            <li><strong className="text-navy">Partage des frais (v2) :</strong> une part des frais de performance pourra être redirigée vers les stakers GLOW par vote de gouvernance</li>
          </ul>
        </SubSection>
      </Section>

      {/* 9. ROADMAP */}
      <Section id="roadmap" title="9. Feuille de route">
        <WpTable
          headers={['Phase', 'Étape clé', 'Cible']}
          rows={[
            ['Phase 1', 'Architecture, IAdapter + squelette du Vault', 'Semaine 1'],
            ['Phase 2', 'AaveAdapter + MorphoAdapter (×2) + tests unitaires', 'Semaine 2'],
            ['Phase 3', 'Tous les adapters restants + FeeManager', 'Semaine 3'],
            ['Phase 4', 'Contrats de gouvernance (GLOW + Governor + Timelock)', 'Semaine 4'],
            ['Phase 5', 'Tests d\'intégration (Foundry fork mainnet), déploiement Sepolia', 'Semaine 5'],
            ['Phase 6', 'Frontend (React + wagmi + RainbowKit), audit final, démo', 'Semaine 6'],
          ]}
        />
        <SubSection title="Futur (v2)">
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1">
            <li>Rééquilibrage automatisé via keeper (Chainlink Automation ou Gelato)</li>
            <li>Intégration PT-Pendle avec rollover automatique</li>
            <li>Intégration sUSDe (en attente d'analyse de stress en marché baissier)</li>
            <li>Support multi-actifs (USDT, DAI)</li>
            <li>Expansion cross-chain</li>
          </ul>
        </SubSection>
      </Section>

      {/* 10. CONCLUSION */}
      <Section id="conclusion" title="10. Conclusion">
        <p className="text-navy/70 leading-relaxed mb-4">
          DeFi Lantern répond à un problème structurel du rendement stablecoin en DeFi :
          la fragmentation. Aujourd'hui, optimiser son rendement exige de surveiller des dizaines
          de protocoles, de gérer des cooldowns hétérogènes et d'évaluer des risques complexes —
          une charge cognitive et opérationnelle que la grande majorité des détenteurs de stablecoins
          n'est pas en mesure d'assumer.
        </p>
        <p className="text-navy/70 leading-relaxed mb-4">
          Notre réponse est un vault ERC-4626 non-custodial qui agrège seize sources de rendement
          complémentaires en un seul point d'entrée. L'utilisateur dépose une fois et reçoit des
          glUSDC-P, glUSDC-B, glUSDC-D ou glUSDC-AH dont la valeur s'apprécie automatiquement. DeFi Lantern gère l'allocation,
          le harvest et le rééquilibrage — sans jamais prendre la garde des fonds.
        </p>
        <p className="text-navy/70 leading-relaxed mb-4">
          La proposition de valeur repose sur trois piliers distinctifs :
        </p>
        <ul className="list-disc list-inside text-navy/70 text-sm space-y-2 mb-4">
          <li><strong className="text-navy">Diversification structurelle :</strong> aucun protocole ne dépasse 15% du TVL. Une défaillance isolée ne compromet pas l'ensemble du vault — contrairement à une position unique sur Morpho ou Aave.</li>
          <li><strong className="text-navy">Liquidité gérée :</strong> une réserve de 10% du TVL déposée sur Aave v3 — distincte de son allocation protocolaire — couvre la majorité des retraits sans délai. La file de priorité et l'option de retrait en tokens natifs gèrent les cas extrêmes sans friction.</li>
          <li><strong className="text-navy">Gouvernance transparente :</strong> tous les paramètres — poids, frais, adapters — sont modifiables uniquement par vote on-chain avec Timelock 48 heures. Le Guardian ne peut que mettre en pause, jamais confisquer.</li>
        </ul>
        <p className="text-navy/70 leading-relaxed mb-4">
          DeFi Lantern n'est pas un énième agrégateur de rendement. C'est une infrastructure de confiance :
          un vault dont les règles sont gravées dans le code, auditable par tous, et gouverné par ses
          utilisateurs. Avec 5% de frais de performance strictement alignés sur les gains des déposants,
          le protocole ne perçoit un revenu que lorsque ses utilisateurs en perçoivent un.
        </p>
        <InfoBox>
          <strong>Vision long terme :</strong> DeFi Lantern a vocation à devenir la couche de rendement
          de référence pour les stablecoins sur Ethereum mainnet — composable avec tout protocole
          ERC-4626, extensible à d'autres actifs (USDT, DAI) et à d'autres chaînes en v2.
          Chaque adapter ajouté par gouvernance élargit la diversification sans modifier
          le cœur du vault.
        </InfoBox>
        <p className="text-navy/70 leading-relaxed text-sm">
          Ce livre blanc est un point de départ. Le protocole évoluera avec ses utilisateurs,
          ses auditeurs et sa communauté de gouvernance. Les paramètres actuels (poids, frais,
          quorum) sont des hypothèses de travail qui seront affinées avant le déploiement en mainnet.
        </p>
      </Section>

      {/* 11. DISCLAIMER */}
      <Section id="legal" title="11. Avertissement légal">
        <WarningBox>
          DeFi Lantern est un projet logiciel expérimental et open-source développé à des fins académiques.
          Ce n'est pas un produit financier enregistré ni un véhicule d'investissement. Les parts glUSDC-P,
          glUSDC-B, glUSDC-D et glUSDC-AH ne sont pas des titres financiers. Déposer des actifs dans DeFi Lantern implique des risques
          significatifs incluant, sans s'y limiter : des vulnérabilités de smart contracts, des défaillances
          d'oracle, des défaillances des protocoles sous-jacents, des contraintes de liquidité et des
          changements réglementaires.
        </WarningBox>
        <p className="text-navy/60 text-sm leading-relaxed">
          Les utilisateurs interagissent avec DeFi Lantern à leurs propres risques. L'équipe principale
          ne fournit aucune garantie de rendement, de préservation du capital ou d'accès ininterrompu
          aux fonds. Les performances passées des protocoles sous-jacents ne préjugent pas des
          résultats futurs.
        </p>
        <p className="text-navy/60 text-sm leading-relaxed mt-3">
          Ce document est un livre blanc préliminaire et ne constitue pas un prospectus, un conseil
          en investissement ou une sollicitation de quelque nature que ce soit.
        </p>
        <p className="text-navy/40 text-xs mt-6 text-center">
          DeFi Lantern — Livre Blanc v0.2 — Mars 2026<br />
          Ce document sera mis à jour au fur et à mesure de l'évolution du protocole.
        </p>
      </Section>
    </div>
  )
}

// ── Contenu Anglais ────────────────────────────────────────────────────────

function WhitepaperEN() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-navy mb-3">DeFi Lantern — Whitepaper v0.2</h1>
        <p className="text-navy/50 text-sm">Status: Draft — March 2026. All parameters subject to change.</p>
        <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#2ABFAB]" />
      </div>

      {/* ABSTRACT */}
      <Section id="abstract-en" title="Abstract">
        <p className="text-navy/70 leading-relaxed">
          DeFi Lantern is a non-custodial, multi-protocol yield aggregator for stablecoins deployed on
          Ethereum mainnet. Users deposit USDC and receive ERC-4626 share tokens —
          <strong>glUSDC-P</strong>, <strong>glUSDC-B</strong>, <strong>glUSDC-D</strong>, or <strong>glUSDC-AH</strong> depending
          on their chosen risk profile — whose value appreciates over time as the protocol harvests
          yield from a curated set of battle-tested DeFi protocols.
        </p>
        <p className="text-navy/70 leading-relaxed mt-3">
          DeFi Lantern targets stablecoin holders seeking optimized, passive yield without active portfolio
          management, market exposure, or counterparty custody risk. Capital is allocated across sixteen
          underlying protocols spanning lending markets, RWA savings instruments, delta-neutral strategies,
          stability pools, and institutional credit.
        </p>
        <p className="text-navy/70 leading-relaxed mt-3">
          Governance is conducted on-chain via the <strong>GLOW</strong> token through a Governor + Timelock
          architecture, with a Guardian multisig retaining pause-only emergency powers.
        </p>
      </Section>

      {/* 1. INTRODUCTION */}
      <Section id="intro-en" title="1. Introduction">
        <SubSection title="1.1 The Stablecoin Yield Problem">
          <p className="text-navy/70 leading-relaxed mb-3">
            Stablecoin holders face a fragmented yield landscape. Dozens of protocols offer competitive APYs,
            each with distinct risk profiles, liquidity windows, cooldown periods, and integration complexity.
            A typical investor must:
          </p>
          <ul className="list-disc list-inside text-navy/70 space-y-1 text-sm">
            <li>Monitor rates across multiple protocols simultaneously</li>
            <li>Manually rebalance capital between strategies</li>
            <li>Manage cooldown periods and withdrawal queues independently</li>
            <li>Evaluate smart contract, oracle, and counterparty risks for each protocol</li>
          </ul>
        </SubSection>
        <SubSection title="1.2 The DeFi Lantern Answer">
          <p className="text-navy/70 leading-relaxed">
            DeFi Lantern aggregates yield from multiple protocols into a single vault. The user deposits USDC
            once into their chosen vault and receives glUSDC-P/B/D/AH shares that appreciate passively. DeFi Lantern handles allocation,
            harvesting, and rebalancing. DeFi Lantern does not take custody of user funds — assets remain
            in the underlying protocols at all times, accessible only through the vault's non-custodial
            withdrawal mechanism.
          </p>
        </SubSection>
      </Section>

      {/* 2. PROTOCOL OVERVIEW */}
      <Section id="overview-en" title="2. Protocol Overview">
        <SubSection title="2.1 Core Properties">
          <WpTable
            headers={['Property', 'Value']}
            rows={[
              ['Blockchain', 'Ethereum mainnet'],
              ['Deposit asset', 'USDC'],
              ['Share tokens', 'glUSDC-P / glUSDC-B / glUSDC-D (ERC-4626, one vault per profile)'],
              ['Governance token', 'GLOW (ERC-20Votes)'],
              ['Fee', '5% performance fee on net gains'],
              ['Custody', 'Non-custodial'],
              ['Withdrawals', 'Non-custodial, user-initiated'],
              ['Rebalancing', 'Governance-controlled'],
            ]}
          />
        </SubSection>
        <SubSection title="2.2 Key Features">
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Single-entry yield.</strong> One USDC deposit gives exposure to up to sixteen yield strategies simultaneously.</p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">ERC-4626 compliant.</strong> glUSDC-P, glUSDC-B, glUSDC-D, and glUSDC-AH are fully standard ERC-4626 vault tokens, composable with any protocol supporting the standard. Each token is fully fungible within its vault — a secondary market buyer immediately knows their exact risk exposure.</p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Non-custodial by design.</strong> No admin key can move user funds. The Guardian multisig can only pause new deposits — withdrawals remain open at all times.</p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Transparent allocation.</strong> Target weights per protocol are stored on-chain in basis points (sum = 10,000). Any GLOW holder can verify the strategy at any time.</p>
          <p className="text-navy/70 text-sm"><strong className="text-navy">On-chain governance.</strong> All parameter changes go through a Governor contract with a 48-hour Timelock.</p>
        </SubSection>

        <SubSection title="2.3 DeFi Lantern vs Competing Vaults">
          <p className="text-navy/70 text-sm mb-3">
            The yield vault market offers dozens of options — aggregators, Morpho curators, Lagoon vaults. Choosing among them requires advanced analytical skills, risk knowledge, and ongoing monitoring. DeFi Lantern is designed to structurally address these limitations.
          </p>
          <WpTable
            headers={['Criterion', 'Competing vaults', 'DeFi Lantern']}
            rows={[
              ['Strategy governance', 'Curator free to change allocations without a vote', 'DAO only (on-chain vote + 48h Timelock)'],
              ['Transparency', 'Allocations and decisions rarely traceable in real time', 'All parameters on-chain, verifiable at any time'],
              ['Per-protocol cap', 'Possible concentration on a single high-yield strategy', 'No protocol exceeds 15% of TVL'],
              ['Performance fee', '10% market average', '5% — aligned with depositor actual gains'],
              ['Strategy change', 'Possible without notice or delay by the curator', 'Impossible without DAO vote and 48h Timelock delay'],
              ['Diversification', 'Varies by vault', '9 to 17 protocols per profile, reviewed by governance'],
            ]}
          />
          <InfoBox>
            <strong>Code over trust.</strong> At DeFi Lantern, strategy is not a promise — it is code. No individual can unilaterally modify allocations, add a risky protocol, or lower integration standards without a community vote followed by a mandatory 48-hour delay. glUSDC holders are structurally protected against discretionary decisions.
          </InfoBox>
        </SubSection>
      </Section>

      {/* 3. ARCHITECTURE */}
      <Section id="architecture-en" title="3. Architecture">
        <SubSection title="3.1 Three ERC-4626 Vaults — glUSDC-P / glUSDC-B / glUSDC-D">
          <p className="text-navy/70 leading-relaxed mb-3">
            The central contract <code className="bg-navy/10 px-1 rounded">DeFiLanternVault.sol</code> implements
            the ERC-4626 tokenized vault standard. Users interact exclusively with this contract.
          </p>
          <InfoBox>
            <strong>Share price (pricePerShare)</strong> increases monotonically as yield is harvested.
            A user who deposits 1,000 USDC into the Prudent vault and receives 1,000 glUSDC-P at t=0
            will redeem those 1,000 glUSDC-P for ~1,035 USDC at t=1 year (~3.5% net APY after fees).
            On the secondary market, any buyer of glUSDC-P knows they are exposed exclusively to Prudent profile protocols.
          </InfoBox>
        </SubSection>
        <SubSection title="3.2 Adapter Pattern">
          <CodeBlock>{`interface IAdapter {
    function deposit(uint256 amount) external;
    function withdraw(uint256 amount) external;
    function totalAssets() external view returns (uint256);
    function hasCooldown() external view returns (bool);
    function cooldownRemaining() external view returns (uint256);
}`}</CodeBlock>
          <p className="text-navy/70 text-sm mb-4">
            This pattern isolates protocol-specific logic from the vault core. Adding or removing a protocol
            requires only deploying a new adapter and a governance vote — the vault itself is never redeployed.
          </p>
          <InfoBox>
            <strong>Swap Adapters — non-USDC protocols</strong><br />
            Some protocols do not accept USDC directly. The <em>swap adapter</em> pattern solves this by
            embedding a Uniswap V3 swap inline within each adapter:
            <CodeBlock>{`deposit() : USDC → DEX swap → required token → protocol deposit → shares
withdraw() : shares → protocol withdrawal → required token → DEX swap → USDC
totalAssets() : shares × pricePerShare (Chainlink oracle) → USDC equivalent`}</CodeBlock>
            Concrete examples:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>jrUSDe (Strata):</strong> USDC → USDe (Uniswap V3 USDe/USDC pool) → jrUSDe</li>
              <li><strong>mPT-sUSDe (mStable):</strong> USDC → USDe (Uniswap V3) → sUSDe (Ethena) → PT-sUSDe (Pendle) → mStable vault</li>
              <li><strong>sBOLD (Liquity v2):</strong> USDC → BOLD (Uniswap V3 BOLD/USDC pool) → sBOLD</li>
            </ul>
            Additional costs: ~150–200k gas for the swap + 0.1–0.5% slippage depending on pool liquidity.
            The <code className="bg-navy/10 px-1 rounded">totalAssets()</code> oracle uses Chainlink to convert
            share value back to USDC without relying on instantaneous spot prices.
          </InfoBox>
        </SubSection>
        <SubSection title="3.3 Capital Allocation">
          <WpTable
            headers={['Protocol', 'Tier', 'Category', 'Target Weight']}
            rows={[
              ['Aave v3', '1 — Core', 'Lending', '15%'],
              ['Morpho (Gauntlet USDC Core)', '1 — Core', 'Lending', '12%'],
              ['Morpho (Steakhouse USDC)', '1 — Core', 'Lending', '10%'],
              ['Compound v3', '2 — Standard', 'Lending', '7%'],
              ['SparkLend (Sky)', '2 — Standard', 'Lending', '7%'],
              ['sUSDS (Sky)', '2 — Standard', 'Savings Rate', '8%'],
              ['USDY (Ondo)', '2 — Standard', 'RWA T-bills', '6%'],
              ['scrvUSD (Curve)', '2 — Standard', 'Savings Rate', '6%'],
              ['sBOLD (Liquity v2)', '2 — Standard', 'Stability Pool', '6%'],
              ['Euler v2', '2 — Standard', 'Lending', '5%'],
              ['Resolv USR', '3 — Satellite', 'Delta-Neutral', '4%'],
              ['cUSDO (OpenEden)', '3 — Satellite', 'RWA T-bills', '4%'],
              ['fxSAVE (f(x) Protocol)', '3 — Satellite', 'Stability Pool', '4%'],
              ['Flux Finance', '3 — Satellite', 'Lending', '3%'],
              ['syrupUSDC (Maple)', '3 — Satellite', 'Institutional Credit', '2%'],
              ['reUSD (Re Protocol)', '3 — Satellite', 'Reinsurance', '1%'],
            ]}
          />
        </SubSection>

        <div id="risk-profiles-en">
        <SubSection title="3.4 Risk Profiles">
          <p className="text-navy/70 leading-relaxed mb-3">
            DeFi Lantern deploys <strong>four distinct ERC-4626 vaults</strong>, one per risk profile,
            each issuing its own fully fungible token. The user selects a profile at entry
            and deposits into the corresponding vault. This design ensures that any secondary
            market buyer knows their exact exposure immediately: glUSDC-P = tier 1 protocols only,
            glUSDC-D = tier 3 protocols only.
          </p>
          <WpTable
            headers={['Profile', 'Protocols', 'Target APY', 'Allocation']}
            rows={[
              ['🛡️ Prudent', '9 protocols — tier 1 + sUSDe (audited delta-neutral) + reUSD (capital-protected senior tranche, Re Protocol) + Resolv USR (delta-neutral, moderate yield)', '~4–6%', 'Max 15% per protocol — concentrated in the most audited, most liquid protocols'],
              ['⚖️ Balanced', '17 protocols — 50% capital in Prudent pool + 50% in Dynamic pool', '~6–9%', 'Equal-weight blend of both pools (weights × 0.5)'],
              ['⚡ Dynamic', '8 protocols — tier 3 (sNUSD, syrupUSDC, jrUSDe, sUSD3, imUSD, reUSDe, RLP, stkUSDC)', '~9–15%', 'Concentrated in high-yield protocols, including junior tranches'],
              ['🪂 Airdrop Hunter', '1+ protocol(s) — Sierra Money (RWA+DeFi hybrid, T-bills + Aave/Morpho, native Avalanche bridged via LayerZero). Evolving list via governance vote.', 'Variable (~4–8%+)', 'Innovative protocols selected for vision, technical execution, and airdrop potential. 100% Sierra Money weight in v1.'],
            ]}
          />
          <InfoBox>
            <strong>Dynamic profile & Cyber/Neon mode:</strong> in addition to a more aggressive
            allocation, the Dynamic profile activates a distinct visual interface (dark violet/cyan
            theme) to signal the change in risk level. This UI cue reminds the user they are
            operating in a higher-risk strategy.
          </InfoBox>
          <InfoBox>
            <strong>Airdrop Hunter profile & Red/Gold theme:</strong> the Airdrop Hunter profile
            activates a distinct visual theme (dark background <code className="bg-navy/10 px-1 rounded">#1A0A0A</code>, red accent{' '}
            <code className="bg-navy/10 px-1 rounded">#C0392B</code> and gold{' '}
            <code className="bg-navy/10 px-1 rounded">#FFD700</code>). This UI signal clearly differentiates
            this profile from others and reminds the user of its speculative nature.{' '}
            <strong>Airdrops are a potential bonus, never a guaranteed return.</strong>
          </InfoBox>
          <p className="text-navy/70 text-sm">
            Each profile's allocation weights are stored on-chain and updatable by governance vote,
            within the limits set by the risk tiers (§7.1).
          </p>
        </SubSection>
        </div>

        <SubSection title="3.5 Cross-Chain Architecture (Dynamic and Airdrop Hunter)">
          <p className="text-navy/70 leading-relaxed mb-3">
            The Prudent and Balanced profiles rely exclusively on native Ethereum protocols.
            For the Dynamic and Airdrop Hunter profiles, DeFi Lantern accesses protocols on
            other chains while maintaining the fundamental invariant: <strong>users deposit
            and withdraw only in USDC on Ethereum mainnet</strong>.
          </p>
          <SubSection title="Core Challenge">
            <p className="text-navy/70 text-sm mb-3">
              ERC-4626 assumes <code className="bg-navy/10 px-1 rounded">totalAssets()</code> is
              synchronous and observable on-chain. In a cross-chain context, this value depends
              on assets deposited on other chains, introducing oracle delays and additional risks.
            </p>
          </SubSection>
          <SubSection title="Four Possible Architectures">
            <WpTable
              headers={['Architecture', 'Principle', 'Decentralization', 'Complexity', 'MVP Realism']}
              rows={[
                ['0 — Bridged token on ETH', 'The target protocol issues a representative token on ETH (e.g. Sierra Money via LayerZero OFT). The vault buys this token directly.', '✅ Full', 'Low', '⭐⭐⭐⭐⭐'],
                ['1 — Keeper + native bridge', 'An off-chain keeper executes bridges via Stargate V2 and pushes a balance oracle every ~1h.', '❌ Centralized keeper', 'Medium', '⭐⭐⭐'],
                ['2 — Satellites + LayerZero', 'Satellite contracts deployed on each target chain; the ETH vault coordinates via LZ messages. Target architecture for v2.', '✅ On-chain', 'Very high', '⭐'],
                ['3 — Chainlink CCIP', 'Same as Arch. 2 with CCIP. 5–15 min latency. Institutional standard (Sommelier, Synthetix v3).', '✅ On-chain', 'Extreme', '⭐'],
              ]}
            />
          </SubSection>
          <InfoBox>
            <strong>MVP Choice — Architecture 0 (bridged token on ETH):</strong> in v1,
            DeFi Lantern only integrates protocols that have a representative token on
            Ethereum mainnet (LayerZero OFT or equivalent). Sierra Money is the founding
            example. This approach keeps the vault 100% on-chain on ETH, with a synchronous{' '}
            <code className="bg-navy/10 px-1 rounded">totalAssets()</code> and instant withdrawals.
            Architecture 2 (satellites) forms the v2 roadmap for protocols without an ETH representation.
          </InfoBox>
          <SubSection title="Cross-Chain Protocols Under Study">
            <WpTable
              headers={['Protocol', 'Native Chain', 'Type', 'APY', 'ETH Bridge', 'Integration']}
              rows={[
                ['Sierra Money', 'Avalanche', 'LYT hybrid RWA+DeFi', '~4.78%', '✅ LayerZero OFT', '★★☆ — Arch. 0, SierraAdapter.sol required'],
                ['sUSDai (USD.AI)', 'ETH mainnet + L2s', 'Stablecoin backed by AI GPUs', '~13–17%', 'To confirm (likely native ETH)', '★★☆ — Arch. 0 if available on ETH mainnet'],
                ['yzPP — Yuzu Money', 'Plasma L1 (Tether)', 'Junior tranche (first-loss buffer)', '14–40% variable', '❌ No known ETH bridge', '★☆☆ — Arch. 1 or 2 required'],
              ]}
            />
          </SubSection>
          <SubSection title="Cross-Chain Risk Management">
            <WpTable
              headers={['Risk', 'Impact', 'Mitigation']}
              rows={[
                ['Stale oracle (update delay)', 'Potentially incorrect NAV', 'TWAP + circuit breaker + on-chain MAX_STALENESS'],
                ['Bridge offline', 'Temporarily inaccessible funds', '10% TVL buffer on Aave v3 (ETH) always accessible'],
                ['Bridge slippage', 'Net yield drag', 'Weekly harvest, Stargate Bus (>90% cost reduction)'],
                ['Bridge exploit', 'Partial cross-chain loss', '15% cap per protocol applies to cross-chain positions'],
              ]}
            />
          </SubSection>
        </SubSection>
      </Section>

      {/* 4. UNDERLYING PROTOCOLS */}
      <Section id="protocols-en" title="4. Underlying Protocols">
        <SubSection title="4.1 Selection Methodology">
          <WpTable
            headers={['Criterion', 'Requirement']}
            rows={[
              ['Audit quality', 'Minimum 2 audits by recognized firms'],
              ['TVL', '> $100M (or < $100M with exceptional risk profile)'],
              ['Oracle', 'Chainlink or equivalent decentralized feed'],
              ['Permissioned', 'No KYC at smart contract level (exception: syrupUSDC — institutional borrowers are KYC\'d, but depositing into the vault is permissionless)'],
              ['Cooldown', 'Documented and managed via the 10% liquidity buffer + withdrawal queue (see §5.2)'],
              ['Blockchain', 'Ethereum mainnet (native deployment)'],
              ['Team', 'Public or proven track record'],
              ['Proof of Reserve', 'Required for RWA protocols'],
            ]}
          />
        </SubSection>
        <SubSection title="4.2 Retained Protocols (21)">
          <div className="space-y-3">
            {[
              { name: 'Aave v3', cat: 'Lending', desc: '~$28B TVL. The DeFi lending reference. Your USDC is lent to overcollateralized borrowers. Audited by Trail of Bits, OpenZeppelin, Certora (formal verification), PeckShield, ABDK. Oracle: Chainlink. Timelock: 1–7 days. No cooldown.' },
              { name: 'Morpho (Gauntlet USDC Core)', cat: 'Lending', desc: '~$5B TVL on Ethereum. Isolated risk markets — each vault exposes lenders only to its specific collateral set. Curated by Gauntlet. Audited by Trail of Bits, Dedaub, Spearbit, Cantina. No cooldown.' },
              { name: 'Morpho (Steakhouse USDC)', cat: 'Lending', desc: 'Ultra-conservative Morpho vault by Steakhouse Financial. Carefully curated high-quality collateral (ETH, wstETH, WBTC). Minimal risk exposure. No cooldown.' },
              { name: 'Compound v3', cat: 'Lending', desc: 'A historic DeFi lending protocol. The USDC v3 market on Ethereum is one of the most audited and liquid in the ecosystem. Audited by OpenZeppelin, Trail of Bits. Oracle: Chainlink. No cooldown.' },
              { name: 'SparkLend (Sky)', cat: 'Lending', desc: 'Aave v3 fork developed by Sky (ex-MakerDAO). Benefits from the infrastructure and experience of one of DeFi\'s most battle-tested protocols. Robust timelock inherited from MakerDAO architecture.' },
              { name: 'Flux Finance', cat: 'Lending', desc: 'Compound v2 fork supporting OUSG (Ondo T-bills) as collateral. Allows institutional RWA holders to borrow against their assets. Two audits completed. No cooldown.' },
              { name: 'Euler v2', cat: 'Lending', desc: 'Modular lending protocol relaunched after the 2023 incident (full ~$200M repayment). Completely redesigned with isolated vaults, enhanced security, and an active bug bounty program.' },
              { name: 'sUSDS (Sky)', cat: 'Savings Rate', desc: '~$8B TVL. Official Sky (ex-MakerDAO) savings rate. USDC is converted to USDS via the Sky PSM (no slippage, 1:1) then deposited into the Sky Savings Rate contract. Yield from USDS borrower interest. Double timelock: 18h and 48h. No cooldown.' },
              { name: 'fxSAVE (f(x) Protocol)', cat: 'Stability Pool', desc: 'ERC-4626 stability pool for f(x) protocol. Innovative dual-token architecture (fxUSD and xETH): fxSAVE absorbs xETH liquidations and earns fxUSD borrower interest. Higher yield in exchange for slight liquidation exposure.' },
              { name: 'USDY (Ondo Finance)', cat: 'RWA T-bills', desc: '~$650M TVL. USDC buys USDY, a yield-bearing token backed by short-term US Treasuries and investment-grade bonds (BlackRock, Franklin Templeton). APY: 4.3–5.3%. Permissionless (Reg S — US persons excluded). Oracle: Chainlink. No cooldown.' },
              { name: 'scrvUSD (Curve Finance)', cat: 'Savings Rate', desc: 'ERC-4626 native. Yield from interest paid by crvUSD borrowers (LLAMMA markets). Variable APY (~9% Sept. 2025). Audited by Trail of Bits, MixBytes, Quantstamp. Timelock: 7 days (Curve DAO vote). No cooldown.' },
              { name: 'sBOLD (Liquity v2)', cat: 'Stability Pool', desc: 'ERC-4626 native. Yield from 75% of BOLD borrower interest distributed to Stability Pool depositors. Liquity v2 core is immutable (no admin keys). Audited by ChainSecurity, Dedaub, and Certora. No cooldown.' },
              { name: 'Resolv USR', cat: 'Delta-Neutral', desc: '~$400M TVL. USR is a delta-neutral stablecoin backed by ETH spot long + ETH short perpetuals. Yield from funding rates and staking rewards. Instant redemption — no cooldown. Audited by PeckShield and Ottersec. DeFi Lantern integrates USR in the Prudent and Balanced profiles. RLP (junior tranche, non-stable price ~$1.28) is integrated exclusively in the Dynamic profile.' },
              { name: 'cUSDO (OpenEden)', cat: 'RWA T-bills', desc: '~$100–150M TVL. 100% US Treasury bills + repo. The only pure T-bill product natively available on Ethereum mainnet. Chainlink oracle (cUSDO/USD). Audited by Certik and ChainSecurity. No cooldown.' },
              { name: 'syrupUSDC (Maple Finance)', cat: 'Institutional Credit', desc: '~$2.66B TVL. Yield from interest on loans to institutional crypto borrowers (market makers, hedge funds). APY: 8–12%. ERC-4626. Audited by Spearbit and Sherlock. Cooldown: ~5 minutes. Historical incident: Orthogonal Trading default Dec. 2022 ($36M). No incident since Maple 2.0 (2023).' },
              { name: 'reUSD (Re Protocol)', cat: 'Reinsurance', desc: 'Capital-protected yield token. Rate = max(risk-free + 250bps, Ethena basis + 250bps). reUSDe (junior tranche) absorbs losses before reUSD is affected. DeFi Lantern integrates reUSD only.' },
              { name: 'sNUSD (Neutrl)', cat: 'Delta-Neutral', desc: '~16–17% APY. ETH delta-neutral strategy via hedged positions across multiple CEX/DEX. Direct USDC deposit. Yield from perp funding rates. Audits in progress.' },
              { name: 'jrUSDe (Strata Finance)', cat: 'Market Neutral', desc: '~12–20% variable APY. Junior tranche of Ethena\'s USDe strategy. Amplified yield in exchange for first-loss absorption if funding rates turn negative. Swap adapter: USDC → USDe (Uniswap V3) → jrUSDe.' },
              { name: 'sUSD3 (3Jane)', cat: 'Institutional Credit', desc: '~8–12% APY. Unsecured institutional lending verified via zkTLS (on-chain solvency proof). Backed by Paradigm. Recent protocol (~3 months). Cooldown: 1 month.' },
              { name: 'mPT-sUSDe (mStable)', cat: 'Fixed Rate', desc: '~15–35% APY. Leveraged strategy combining sUSDe (Ethena), a fixed-rate PT via Pendle, and a borrow loop on Aave. mStable manages the loop automatically. Swap adapter: USDC → USDe (Uniswap V3) → sUSDe → PT-sUSDe (Pendle) → mStable vault.' },
              { name: 'stkUSDC (Aave Umbrella)', cat: 'Safety Module', desc: '~3–5% APY. Aave v3 safety module (Umbrella). USDC converted to aUSDC then staked to cover Aave bad debt shortfalls as last resort. Safety rewards compensate for the risk. Flow: USDC → aUSDC → stake.' },
              { name: 'reUSDe (Re Protocol)', cat: 'Reinsurance', desc: '~8–12% APY. Junior tranche of Re Protocol, backed by Ethena\'s sUSDe strategy. reUSDe absorbs losses first if Ethena underperforms — in exchange for amplified yield. DeFi Lantern integrates reUSDe exclusively in the Dynamic profile. Available on Ethereum mainnet.' },
              { name: 'RLP (Resolv)', cat: 'Delta-Neutral', desc: '~15–25% variable APY. Junior tranche of Resolv — absorbs losses before USR is affected. Variable-price asset (~$1.28), non-stable by design. Available on Ethereum mainnet. DeFi Lantern integrates RLP exclusively in the Dynamic profile due to its non-stable price and first-loss junior role. Audited by PeckShield and Ottersec.' },
            ].map((p) => (
              <div key={p.name} className="bg-bg rounded-xl p-4 border border-lgrey">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-navy text-sm">{p.name}</span>
                  <span className="text-xs bg-[#2ABFAB]/10 text-[#2ABFAB] rounded-full px-2 py-0.5">{p.cat}</span>
                </div>
                <p className="text-navy/70 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="4.3 Excluded Protocols — Rationale">
          <p className="text-navy/70 text-sm mb-3">The following protocols were explicitly excluded:</p>
          <WpTable
            headers={['Protocol', 'Category', 'Exclusion Rationale']}
            rows={[
              ['sUSD (Synthetix)', 'Synthetic', 'Historical depeg to $0.86 during the Synthetix crisis (2023). Less robust peg mechanism than collateral-backed or delta-neutral stablecoins.'],
              ['Resupply reUSD', 'Lending', 'Protocol hacked in June 2025 (~$9.5M in losses). Definitively excluded from v1.'],
            ]}
          />
          <InfoBox>
            <strong>Note on RLP:</strong> RLP (Resolv Liquidity Pool) was initially considered for exclusion due to its non-stable price (~$1.28) and junior tranche role. It has been integrated into the <strong>Dynamic profile only</strong>, where its high yield (15–25% APY) is justified by the explicitly more aggressive risk profile of that vault.
          </InfoBox>
        </SubSection>

        <SubSection title="4.4 Protocols Under Evaluation">
          <WpTable
            headers={['Protocol', 'Category', 'Discussion Point']}
            rows={[
              ['PT Pendle', 'Fixed Rate', 'Expiry management in an aggregator context. Rollover strategy needed.'],
              ['Venus Core', 'Lending', 'BNB Chain leader. Ethereum mainnet architecture compatibility to confirm.'],
            ]}
          />
        </SubSection>
      </Section>

      {/* 5. YIELD, FEES & LIQUIDITY */}
      <Section id="yield-en" title="5. Yield, Fees & Liquidity">
        <SubSection title="5.1 Performance Fee">
          <p className="text-navy/70 leading-relaxed mb-3">
            DeFi Lantern charges a <strong>5% performance fee on net gains</strong>,
            applied at harvest time.
          </p>
          <InfoBox>
            <strong>Implementation:</strong> the fee is never transferred as USDC. At each harvest,
            the FeeManager mints new glUSDC-P/B/D/AH shares to the treasury proportional to the gain,
            diluting existing shareholders by 5% of the yield produced.
            This mechanism aligns the treasury's interests with those of users —
            the treasury only earns when users earn.
          </InfoBox>
          <CodeBlock>{`gain        = totalAssets_after_yield - totalAssets_before_yield
fee_in_usd  = gain × 5%
new_shares  = fee_in_usd / pricePerShare_after_yield`}</CodeBlock>
          <p className="text-navy/70 text-sm">The treasury is a Gnosis Safe multisig controlled by the DeFi Lantern team.</p>
        </SubSection>

        <SubSection title="5.2 Liquidity Buffer & Withdrawal Mechanism">
          <p className="text-navy/70 leading-relaxed mb-3">
            DeFi Lantern maintains a <strong>permanent 10% liquidity reserve of TVL</strong>,
            deployed on Aave v3 (instant withdrawal). This reserve is separate from and additional to
            Aave's protocol allocation weight in the portfolio — it is a dedicated liquid cushion,
            not a constraint on Aave's target weight. This design is inspired by Yearn Finance
            (~5–10% idle) and Enzyme Finance (configurable liquidity thresholds).
          </p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Withdrawal priority queue:</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-4">
            <li><strong>Liquidity reserve</strong> (10% of TVL, deployed on Aave v3) — instant withdrawal, always served first</li>
            <li><strong>Morpho</strong> — near-instant if underlying market is liquid</li>
            <li><strong>Other no-cooldown protocols</strong> (Compound, SparkLend, sUSDS…)</li>
            <li><strong>Queue</strong> (≤7 days) — amounts exceeding buffer trigger a <code className="bg-navy/10 px-1 rounded">WithdrawalQueued</code> event</li>
          </ol>
          <InfoBox>
            <strong>Why 10% and not 30%?</strong> A 30% buffer would keep a third of capital idle,
            mechanically reducing APY. At 10%, capital is better deployed while still covering routine
            withdrawals. The only critical scenario is a group exit {'>'}10% of TVL, which triggers
            the queue (≤7 days, matching the sUSDe cooldown).
          </InfoBox>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Native token withdrawal option:</strong></p>
          <p className="text-navy/70 text-sm">
            For protocols with a cooldown (e.g. syrupUSDC, ~5 min), the vault can offer users their native tokens directly
            (e.g. <em>syrupUSDC</em>) instead of waiting for USDC redemption. The user then manages the
            redemption independently on the source protocol, without incurring any vault queue delay.
          </p>
        </SubSection>

      </Section>

      {/* 6. GOVERNANCE */}
      <Section id="governance-en" title="6. Governance">
        <SubSection title="6.1 GLOW Token">
          <p className="text-navy/70 leading-relaxed mb-2">
            GLOW is the ERC-20Votes governance token of DeFi Lantern. GLOW holders can propose and vote
            on all protocol parameter changes: <code className="bg-navy/10 px-1 rounded">addAdapter</code>,
            {' '}<code className="bg-navy/10 px-1 rounded">removeAdapter</code>,
            {' '}<code className="bg-navy/10 px-1 rounded">setWeights</code>,
            {' '}<code className="bg-navy/10 px-1 rounded">setPerformanceFee</code>,
            {' '}<code className="bg-navy/10 px-1 rounded">setTreasury</code>.
          </p>
        </SubSection>
        <SubSection title="6.2 Governor Parameters">
          <WpTable
            headers={['Parameter', 'Value']}
            rows={[
              ['Voting delay', '1 day (after proposal creation)'],
              ['Voting period', '3 days'],
              ['Quorum', '10% of GLOW total supply'],
              ['Proposal threshold', '1% of GLOW total supply'],
              ['Timelock delay', '48 hours'],
            ]}
          />
        </SubSection>
        <SubSection title="6.3 Guardian">
          <p className="text-navy/70 text-sm mb-2">
            A 2-of-3 multisig controlled by the core team holds Guardian rights. The Guardian can:
          </p>
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>Call <code className="bg-navy/10 px-1 rounded">pause()</code> — blocks new deposits and rebalancing</li>
            <li>Call <code className="bg-navy/10 px-1 rounded">emergencyExit(address adapter)</code> — forces immediate withdrawal of all funds from a specific compromised protocol adapter</li>
          </ul>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">emergencyExit flow:</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>Guardian identifies compromised protocol → calls <code className="bg-navy/10 px-1 rounded">emergencyExit(adapter)</code></li>
            <li>Adapter withdraws all funds from the failing protocol — USDC (or tokens) land in the vault</li>
            <li>Users can immediately withdraw their proportional share of these held funds</li>
            <li>Governance votes to reallocate remaining capital to other active protocols</li>
          </ol>
          <InfoBox>
            <strong>Non-confiscation guarantee:</strong> The Guardian can never transfer funds to an external address.
            <code className="bg-navy/10 px-1 rounded"> emergencyExit</code> only moves funds into the vault itself —
            they remain accessible to users through normal withdrawals.
          </InfoBox>
          <p className="text-navy/70 text-sm">The Guardian <strong>cannot</strong> modify weights, fees, or the protocol list. Paused state must be resolved by governance vote.</p>
        </SubSection>
      </Section>

      {/* 7. SECURITY */}
      <Section id="security-en" title="7. Security">
        <SubSection title="7.1 Protocol Risk Tiers">
          <WpTable
            headers={['Tier', 'Max Allocation', 'Criteria', 'Protocols']}
            rows={[
              ['1 — Core', '20%', 'TVL > $1B, 3+ Tier-1 audits, 2+ years live', 'Aave v3, Morpho (×2)'],
              ['2 — Standard', '10%', 'TVL > $200M, 2+ audits, 1+ year live', 'Compound v3, SparkLend, Euler v2, sUSDS, USDY, scrvUSD, sBOLD'],
              ['3 — Satellite', '5%', 'TVL < $200M or < 1 year live, strong audits', 'Flux Finance, fxSAVE, Resolv USR, cUSDO, syrupUSDC, reUSD, reUSDe, RLP'],
            ]}
          />
        </SubSection>
        <SubSection title="7.2 Emergency Procedures">
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Scenario 1 — General anomaly (pause):</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-4">
            <li>Guardian detects anomaly → calls <code className="bg-navy/10 px-1 rounded">pause()</code> → new deposits and rebalancing stopped</li>
            <li>Users can always withdraw proportionally, even in paused state</li>
            <li>Governance votes on resolution, subject to 48h Timelock</li>
          </ol>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Scenario 2 — Hack or failure of an underlying protocol:</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1">
            <li>Guardian identifies compromised protocol → calls <code className="bg-navy/10 px-1 rounded">emergencyExit(adapter)</code></li>
            <li>All funds from the failing protocol are withdrawn and held in the vault</li>
            <li>Users can immediately withdraw their proportional share of those funds</li>
            <li>Governance votes to reallocate remaining capital to other active adapters (subject to 48h Timelock)</li>
          </ol>
        </SubSection>
      </Section>

      {/* 8. TOKENOMICS */}
      <Section id="tokenomics-en" title="8. Tokenomics">
        <WarningBox>
          <strong>Note:</strong> tokenomics parameters are indicative and subject to revision.
        </WarningBox>
        <SubSection title="8.1 GLOW Token">
          <WpTable
            headers={['Parameter', 'Value']}
            rows={[
              ['Total supply', '100,000,000 GLOW'],
              ['Standard', 'ERC-20Votes'],
              ['Inflation', 'None (fixed supply)'],
            ]}
          />
        </SubSection>
        <SubSection title="8.2 Initial Distribution">
          <WpTable
            headers={['Allocation', '%', 'Amount', 'Vesting', 'Rationale']}
            rows={[
              ['Team (5 founders)', '20%', '4,000,000 each', '12-month cliff + 24-month linear', 'Founders cannot sell at launch'],
              ['Treasury / DAO', '40%', '40,000,000', 'DAO-governed', 'Funds audits, infrastructure, development'],
              ['Community / Liquidity Mining', '30%', '30,000,000', '48-month emission to depositors across all 4 vaults (glUSDC-P/B/D/AH)', 'Bootstraps adoption, rewards early users'],
              ['Ecosystem / Grants', '10%', '10,000,000', 'Discretionary, DAO-governed', 'Integrations, hackathons, partnerships'],
            ]}
          />
        </SubSection>
        <SubSection title="8.3 GLOW Utility">
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1">
            <li><strong className="text-navy">Governance:</strong> vote on all protocol parameters (weights, fees, adapters)</li>
            <li><strong className="text-navy">Proposal rights:</strong> holding ≥ 1% of supply allows proposing changes</li>
            <li><strong className="text-navy">Fee sharing (v2):</strong> a portion of performance fees may be redirected to GLOW stakers via governance vote</li>
          </ul>
        </SubSection>
      </Section>

      {/* 9. ROADMAP */}
      <Section id="roadmap-en" title="9. Roadmap">
        <WpTable
          headers={['Phase', 'Milestone', 'Target']}
          rows={[
            ['Phase 1', 'Architecture finalization, IAdapter + Vault skeleton', 'Week 1'],
            ['Phase 2', 'AaveAdapter + MorphoAdapter (×2) + unit tests', 'Week 2'],
            ['Phase 3', 'All remaining adapters + FeeManager', 'Week 3'],
            ['Phase 4', 'Governance contracts (GLOW + Governor + Timelock)', 'Week 4'],
            ['Phase 5', 'Integration tests (Foundry fork mainnet), Sepolia deployment', 'Week 5'],
            ['Phase 6', 'Frontend (React + wagmi + RainbowKit), final audit, demo', 'Week 6'],
          ]}
        />
      </Section>

      {/* 10. CONCLUSION */}
      <Section id="conclusion-en" title="10. Conclusion">
        <p className="text-navy/70 leading-relaxed mb-4">
          DeFi Lantern addresses a structural problem in stablecoin yield: fragmentation.
          Today, optimizing yield requires monitoring dozens of protocols, managing heterogeneous
          cooldowns, and evaluating complex risks — an operational and cognitive burden that the
          vast majority of stablecoin holders are not equipped to handle.
        </p>
        <p className="text-navy/70 leading-relaxed mb-4">
          Our answer is a non-custodial ERC-4626 vault that aggregates yield across four specialized vaults.
          Users deposit once into their chosen vault and receive glUSDC-P/B/D/AH shares
          that appreciate automatically. DeFi Lantern handles allocation, harvesting, and
          rebalancing — without ever taking custody of funds.
        </p>
        <p className="text-navy/70 leading-relaxed mb-4">
          The value proposition rests on three distinctive pillars:
        </p>
        <ul className="list-disc list-inside text-navy/70 text-sm space-y-2 mb-4">
          <li><strong className="text-navy">Structural diversification:</strong> no single protocol exceeds 15% of TVL. An isolated failure does not compromise the entire vault — unlike a single-protocol position on Morpho or Aave alone.</li>
          <li><strong className="text-navy">Managed liquidity:</strong> a 10% TVL reserve deployed on Aave v3 — separate from its protocol allocation — covers most withdrawals without delay. The priority queue and native token option handle edge cases without friction.</li>
          <li><strong className="text-navy">Transparent governance:</strong> all parameters — weights, fees, adapters — are modifiable only via on-chain vote with a 48-hour Timelock. The Guardian can only pause, never confiscate.</li>
        </ul>
        <p className="text-navy/70 leading-relaxed mb-4">
          DeFi Lantern is not just another yield aggregator. It is a trust infrastructure:
          a vault whose rules are encoded in immutable smart contracts, auditable by anyone,
          and governed by its users. With a 5% performance fee strictly aligned with depositor
          gains, the protocol earns only when its users earn.
        </p>
        <InfoBox>
          <strong>Long-term vision:</strong> DeFi Lantern aims to become the reference yield
          layer for stablecoins on Ethereum mainnet — composable with any ERC-4626 protocol,
          extensible to other assets (USDT, DAI) and other chains in v2.
          Every adapter added through governance expands diversification without
          modifying the vault core.
        </InfoBox>
        <p className="text-navy/70 leading-relaxed text-sm">
          This whitepaper is a starting point. The protocol will evolve alongside its users,
          auditors, and governance community. Current parameters (weights, fees, quorum) are
          working hypotheses that will be refined before mainnet deployment.
        </p>
      </Section>

      {/* 11. LEGAL */}
      <Section id="legal-en" title="11. Legal Disclaimer">
        <WarningBox>
          DeFi Lantern is an experimental, open-source software project developed for academic purposes.
          It is not a registered financial product or investment vehicle. glUSDC-P, glUSDC-B, glUSDC-D, and glUSDC-AH shares are not securities.
          Depositing assets into DeFi Lantern involves significant risks including, but not limited to:
          smart contract vulnerabilities, oracle failures, underlying protocol failures, liquidity constraints,
          and regulatory changes.
        </WarningBox>
        <p className="text-navy/60 text-sm leading-relaxed">
          Users interact with DeFi Lantern at their own risk. The core team provides no guarantee of returns,
          capital preservation, or uninterrupted access to funds. Past performance of underlying protocols
          is not indicative of future results. This document is a draft whitepaper and does not constitute
          a prospectus, investment advice, or solicitation of any kind.
        </p>
        <p className="text-navy/40 text-xs mt-6 text-center">
          DeFi Lantern — Whitepaper v0.2 — March 2026<br />
          This document will be updated as the protocol evolves.
        </p>
      </Section>
    </div>
  )
}

// ── Table des matières ────────────────────────────────────────────────────

const TOC_FR = [
  { id: 'abstract', label: 'Résumé' },
  { id: 'intro', label: '1. Introduction' },
  { id: 'overview', label: '2. Vue d\'ensemble' },
  { id: 'architecture', label: '3. Architecture' },
  { id: 'risk-profiles', label: '3.5 Profils de risque' },
  { id: 'protocols', label: '4. Protocoles' },
  { id: 'yield', label: '5. Rendement & Frais' },
  { id: 'governance', label: '6. Gouvernance' },
  { id: 'security', label: '7. Sécurité' },
  { id: 'tokenomics', label: '8. Tokenomique' },
  { id: 'roadmap', label: '9. Feuille de route' },
  { id: 'conclusion', label: '10. Conclusion' },
  { id: 'legal', label: '11. Avertissement légal' },
]

const TOC_EN = [
  { id: 'abstract-en', label: 'Abstract' },
  { id: 'intro-en', label: '1. Introduction' },
  { id: 'overview-en', label: '2. Protocol Overview' },
  { id: 'architecture-en', label: '3. Architecture' },
  { id: 'risk-profiles-en', label: '3.4 Risk Profiles' },
  { id: 'protocols-en', label: '4. Underlying Protocols' },
  { id: 'yield-en', label: '5. Yield, Fees & Liquidity' },
  { id: 'governance-en', label: '6. Governance' },
  { id: 'security-en', label: '7. Security' },
  { id: 'tokenomics-en', label: '8. Tokenomics' },
  { id: 'roadmap-en', label: '9. Roadmap' },
  { id: 'conclusion-en', label: '10. Conclusion' },
  { id: 'legal-en', label: '11. Legal Disclaimer' },
]

// ── Composant principal ────────────────────────────────────────────────────

export default function Whitepaper({ navigateTo }) {
  const { lang } = useLang()
  const isFR = lang === 'fr'
  const toc = isFR ? TOC_FR : TOC_EN

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* ── Bandeau header de page ── */}
      <div className="bg-navy text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 text-white/60 hover:text-[#2ABFAB] transition-colors text-sm mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            {isFR ? 'Retour au site' : 'Back to site'}
          </button>
          <div className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}lantern-logo.svg`} alt="DeFi Lantern" className="h-8 w-auto" />
            <div>
              <h1 className="text-2xl font-bold text-[#2ABFAB]">DeFi Lantern</h1>
              <p className="text-white/50 text-sm">{isFR ? 'Livre Blanc v0.2 — Mars 2026' : 'Whitepaper v0.2 — March 2026'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Contenu principal + table des matières ── */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex gap-8 items-start">

          {/* ── Table des matières (sticky, desktop) ── */}
          <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-6">
            <nav className="bg-white rounded-2xl border border-lgrey p-4">
              <p className="text-xs font-bold text-navy/50 uppercase tracking-wider mb-3">
                {isFR ? 'Table des matières' : 'Contents'}
              </p>
              <ul className="space-y-1">
                {toc.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="w-full text-left text-xs text-navy/60 hover:text-[#2ABFAB] transition-colors py-0.5 leading-relaxed"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* ── Contenu whitepaper ── */}
          <main className="flex-1 bg-white rounded-2xl border border-lgrey p-8 lg:p-12 min-w-0">
            {isFR ? <WhitepaperFR /> : <WhitepaperEN />}
          </main>
        </div>
      </div>
    </div>
  )
}
