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
          déployé sur Ethereum mainnet. Les utilisateurs déposent des USDC et reçoivent des <strong>glUSDC</strong>,
          un token de part ERC-4626 dont la valeur augmente au fil du temps à mesure que le protocole
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
            DeFi Lantern agrège le rendement de plusieurs protocoles en un seul vault.
            L'utilisateur dépose une fois ses USDC et reçoit des glUSDC dont la valeur
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
              ['Token de part', 'glUSDC (ERC-4626)'],
              ['Token de gouvernance', 'GLOW (ERC-20Votes)'],
              ['Frais', '10% de frais de performance sur les gains nets'],
              ['Garde', 'Non-custodial'],
              ['Retraits', 'Non-custodial, initiés par l\'utilisateur'],
              ['Rééquilibrage', 'Contrôlé par la gouvernance'],
            ]}
          />
        </SubSection>

        <SubSection title="2.2 Caractéristiques clés">
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Rendement à entrée unique.</strong> Un seul dépôt USDC donne accès à jusqu'à seize stratégies de rendement simultanées.</p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Conforme ERC-4626.</strong> glUSDC est un token de vault pleinement standardisé ERC-4626, composable avec tout protocole supportant ce standard.</p>
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
      </Section>

      {/* 3. ARCHITECTURE */}
      <Section id="architecture" title="3. Architecture">
        <SubSection title="3.1 Vault ERC-4626 — glUSDC">
          <p className="text-navy/70 leading-relaxed mb-3">
            Le contrat central <code className="bg-navy/10 px-1 rounded">DeFiLanternVault.sol</code> implémente
            le standard ERC-4626. Les utilisateurs interagissent exclusivement avec ce contrat.
          </p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Flux de dépôt :</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>L'utilisateur appelle <code className="bg-navy/10 px-1 rounded">deposit(amount, receiver)</code></li>
            <li>Le vault tire les USDC de l'utilisateur</li>
            <li>Le vault mint des parts glUSDC proportionnelles à <code className="bg-navy/10 px-1 rounded">amount / pricePerShare</code></li>
            <li>Les USDC sont alloués aux protocoles sous-jacents selon les poids cibles</li>
          </ol>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Flux de retrait :</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>L'utilisateur appelle <code className="bg-navy/10 px-1 rounded">redeem(shares, receiver, owner)</code></li>
            <li>Le vault brûle les parts glUSDC</li>
            <li>Le vault récupère les USDC des protocoles sous-jacents (en respectant les contraintes de cooldown)</li>
            <li>Les USDC sont envoyés à l'utilisateur</li>
          </ol>
          <InfoBox>
            <strong>Prix du share (pricePerShare)</strong> augmente de façon monotone au fil des collectes de rendement.
            Un utilisateur qui dépose 1 000 USDC et reçoit 1 000 glUSDC à t=0 pourra racheter ces 1 000 glUSDC
            contre 1 050 USDC à t=1 an (en supposant un APY net de 5% après frais).
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
          <p className="text-navy/70 leading-relaxed text-sm">
            Ce pattern isole la logique spécifique à chaque protocole du cœur du vault.
            Ajouter ou supprimer un protocole nécessite uniquement de déployer un nouvel adapter
            et de voter en gouvernance — le vault lui-même n'est jamais redéployé.
          </p>
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
            headers={['Protocole', 'Catégorie', 'Poids cible']}
            rows={[
              ['Aave v3', 'Lending', '10%'],
              ['Morpho (Gauntlet USDC Core)', 'Lending', '10%'],
              ['Morpho (Steakhouse USDC)', 'Lending', '10%'],
              ['Compound v3', 'Lending', '10%'],
              ['SparkLend (Sky)', 'Lending', '10%'],
              ['Flux Finance', 'Lending', '10%'],
              ['Euler v2', 'Lending', '10%'],
              ['sUSDS (Sky)', 'Savings Rate', '10%'],
              ['fxSAVE (f(x) Protocol)', 'Stability Pool', '10%'],
              ['USDY (Ondo)', 'RWA T-bills', '10%'],
              ['scrvUSD (Curve)', 'Savings Rate', '10%'],
              ['sBOLD (Liquity v2)', 'Stability Pool', '10%'],
              ['Resolv USR', 'Delta-Neutral', '10%'],
              ['cUSDO (OpenEden)', 'RWA T-bills', '10%'],
              ['syrupUSDC (Maple)', 'Institutional Credit', '10%'],
              ['reUSD (Re Protocol)', 'Reinsurance', '10%'],
            ]}
          />
          <InfoBox>
            <strong>Note sur la liquidité :</strong> Aave et Morpho (×2) sont les adapters les plus liquides
            (retrait instantané, marchés les plus profonds). Leur poids combiné de 30% forme un buffer liquide
            couvrant la grande majorité des demandes de retrait individuelles.
          </InfoBox>
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
              ['Permissionné', 'Pas d\'exigence KYC pour l\'interaction smart contract'],
              ['Cooldown', 'Documenté et gérable dans le buffer de liquidité du vault'],
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
                desc: '~400M$ TVL. USR est un stablecoin delta-neutre adossé à ETH spot long + ETH short en perp. Le rendement provient des taux de financement et des récompenses de staking. Pas de cooldown — remboursement instantané. Audité par PeckShield et Ottersec. DeFi Lantern intègre uniquement USR (pas RLP, la tranche junior).',
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

        <SubSection title="4.3 Protocoles en évaluation">
          <p className="text-navy/70 text-sm mb-3">Les protocoles suivants sont à l'étude pour une intégration future :</p>
          <WpTable
            headers={['Protocole', 'Catégorie', 'Point de discussion']}
            rows={[
              ['sUSDe (Ethena)', 'Market Neutral', 'Taux de financement négatifs en marché baissier. Cooldown : 7 jours.'],
              ['PT Pendle', 'Fixed Rate', 'Gestion des dates d\'expiration dans un agrégateur. Stratégie de rollover nécessaire.'],
              ['USD3 (3Jane)', 'Institutional Credit', 'Prêts non sécurisés zkTLS, soutenu par Paradigm. Cooldown 1 mois (sUSD3).'],
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
            DeFi Lantern prélève des <strong>frais de performance de 10%</strong> sur les gains nets,
            appliqués au moment du harvest.
          </p>
          <InfoBox>
            <strong>Implémentation :</strong> les frais ne sont jamais transférés en USDC.
            À chaque harvest, le FeeManager mint de nouveaux glUSDC au treasury proportionnellement
            au gain, diluant les actionnaires existants de 10% du rendement produit.
            Ce mécanisme aligne les intérêts du treasury avec ceux des utilisateurs —
            le treasury ne perçoit un revenu que lorsque les utilisateurs en perçoivent un.
          </InfoBox>
          <CodeBlock>{`gain        = totalAssets_après_yield - totalAssets_avant_yield
fee_en_usd  = gain × 10%
new_shares  = fee_en_usd / pricePerShare_après_yield`}</CodeBlock>
          <p className="text-navy/70 text-sm">Le treasury est un multisig Gnosis Safe contrôlé par l'équipe DeFi Lantern.</p>
        </SubSection>

        <SubSection title="5.3 Mécanisme de retrait proportionnel">
          <p className="text-navy/70 leading-relaxed mb-3">
            Chaque glUSDC représente une <strong>créance proportionnelle</strong> sur l'ensemble des protocoles
            sous-jacents, conformément aux poids d'allocation en vigueur. Il n'existe aucune mutualisation
            des positions : la position d'un utilisateur dans Aave n'est jamais utilisée pour rembourser
            un autre utilisateur.
          </p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Flux de retrait :</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>L'utilisateur appelle <code className="bg-navy/10 px-1 rounded">redeem(shares)</code></li>
            <li>Le vault brûle les glUSDC et calcule le montant proportionnel dû depuis chaque adapter</li>
            <li>Le vault retire simultanément de chaque protocole (ex. : 10% depuis Aave, 10% depuis Morpho, etc.)</li>
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
              ['3 — Satellite', '5%', 'TVL < 200M$ ou < 1 an en production, audits solides', 'Flux Finance, fxSAVE, Resolv USR, cUSDO, syrupUSDC, reUSD'],
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
              ['Communauté / Liquidity Mining', '30%', '30 000 000', 'Émission sur 48 mois aux déposants glUSDC', 'Bootstrap de l\'adoption par récompense des premiers utilisateurs'],
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

      {/* 10. DISCLAIMER */}
      <Section id="legal" title="10. Avertissement légal">
        <WarningBox>
          DeFi Lantern est un projet logiciel expérimental et open-source développé à des fins académiques.
          Ce n'est pas un produit financier enregistré ni un véhicule d'investissement. Les parts glUSDC
          ne sont pas des titres financiers. Déposer des actifs dans DeFi Lantern implique des risques
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
          Ethereum mainnet. Users deposit USDC and receive <strong>glUSDC</strong>, an ERC-4626 share token
          whose value appreciates over time as the protocol harvests yield from a curated set of
          battle-tested DeFi protocols.
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
            once and receives glUSDC shares that appreciate passively. DeFi Lantern handles allocation,
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
              ['Share token', 'glUSDC (ERC-4626)'],
              ['Governance token', 'GLOW (ERC-20Votes)'],
              ['Fee', '10% performance fee on net gains'],
              ['Custody', 'Non-custodial'],
              ['Withdrawals', 'Non-custodial, user-initiated'],
              ['Rebalancing', 'Governance-controlled'],
            ]}
          />
        </SubSection>
        <SubSection title="2.2 Key Features">
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Single-entry yield.</strong> One USDC deposit gives exposure to up to sixteen yield strategies simultaneously.</p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">ERC-4626 compliant.</strong> glUSDC is a fully standard ERC-4626 vault token, composable with any protocol that supports the standard.</p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Non-custodial by design.</strong> No admin key can move user funds. The Guardian multisig can only pause new deposits — withdrawals remain open at all times.</p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Transparent allocation.</strong> Target weights per protocol are stored on-chain in basis points (sum = 10,000). Any GLOW holder can verify the strategy at any time.</p>
          <p className="text-navy/70 text-sm"><strong className="text-navy">On-chain governance.</strong> All parameter changes go through a Governor contract with a 48-hour Timelock.</p>
        </SubSection>
      </Section>

      {/* 3. ARCHITECTURE */}
      <Section id="architecture-en" title="3. Architecture">
        <SubSection title="3.1 ERC-4626 Vault — glUSDC">
          <p className="text-navy/70 leading-relaxed mb-3">
            The central contract <code className="bg-navy/10 px-1 rounded">DeFiLanternVault.sol</code> implements
            the ERC-4626 tokenized vault standard. Users interact exclusively with this contract.
          </p>
          <InfoBox>
            <strong>Share price (pricePerShare)</strong> increases monotonically as yield is harvested.
            A user who deposits 1,000 USDC and receives 1,000 glUSDC at t=0 will redeem those 1,000 glUSDC
            for 1,050 USDC at t=1 year (assuming 5% net APY after fees).
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
          <p className="text-navy/70 text-sm">
            This pattern isolates protocol-specific logic from the vault core. Adding or removing a protocol
            requires only deploying a new adapter and a governance vote — the vault itself is never redeployed.
          </p>
        </SubSection>
        <SubSection title="3.3 Capital Allocation">
          <WpTable
            headers={['Protocol', 'Category', 'Target Weight']}
            rows={[
              ['Aave v3', 'Lending', '10%'],
              ['Morpho (Gauntlet USDC Core)', 'Lending', '10%'],
              ['Morpho (Steakhouse USDC)', 'Lending', '10%'],
              ['Compound v3', 'Lending', '10%'],
              ['SparkLend (Sky)', 'Lending', '10%'],
              ['Flux Finance', 'Lending', '10%'],
              ['Euler v2', 'Lending', '10%'],
              ['sUSDS (Sky)', 'Savings Rate', '10%'],
              ['fxSAVE (f(x) Protocol)', 'Stability Pool', '10%'],
              ['USDY (Ondo)', 'RWA T-bills', '10%'],
              ['scrvUSD (Curve)', 'Savings Rate', '10%'],
              ['sBOLD (Liquity v2)', 'Stability Pool', '10%'],
              ['Resolv USR', 'Delta-Neutral', '10%'],
              ['cUSDO (OpenEden)', 'RWA T-bills', '10%'],
              ['syrupUSDC (Maple)', 'Institutional Credit', '10%'],
              ['reUSD (Re Protocol)', 'Reinsurance', '10%'],
            ]}
          />
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
              ['Permissioned', 'No KYC requirement for smart contract interaction'],
              ['Cooldown', 'Documented and manageable within vault liquidity buffer'],
              ['Blockchain', 'Ethereum mainnet (native deployment)'],
              ['Team', 'Public or proven track record'],
              ['Proof of Reserve', 'Required for RWA protocols'],
            ]}
          />
        </SubSection>
        <SubSection title="4.2 Retained Protocols (16)">
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
              { name: 'Resolv USR', cat: 'Delta-Neutral', desc: '~$400M TVL. USR is a delta-neutral stablecoin backed by ETH spot long + ETH short perpetuals. Yield from funding rates and staking rewards. Instant redemption — no cooldown. Audited by PeckShield and Ottersec. DeFi Lantern integrates USR only (not RLP, the junior tranche).' },
              { name: 'cUSDO (OpenEden)', cat: 'RWA T-bills', desc: '~$100–150M TVL. 100% US Treasury bills + repo. The only pure T-bill product natively available on Ethereum mainnet. Chainlink oracle (cUSDO/USD). Audited by Certik and ChainSecurity. No cooldown.' },
              { name: 'syrupUSDC (Maple Finance)', cat: 'Institutional Credit', desc: '~$2.66B TVL. Yield from interest on loans to institutional crypto borrowers (market makers, hedge funds). APY: 8–12%. ERC-4626. Audited by Spearbit and Sherlock. Cooldown: ~5 minutes. Historical incident: Orthogonal Trading default Dec. 2022 ($36M). No incident since Maple 2.0 (2023).' },
              { name: 'reUSD (Re Protocol)', cat: 'Reinsurance', desc: 'Capital-protected yield token. Rate = max(risk-free + 250bps, Ethena basis + 250bps). reUSDe (junior tranche) absorbs losses before reUSD is affected. DeFi Lantern integrates reUSD only.' },
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
        <SubSection title="4.3 Protocols Under Evaluation">
          <WpTable
            headers={['Protocol', 'Category', 'Discussion Point']}
            rows={[
              ['sUSDe (Ethena)', 'Market Neutral', 'Negative funding rates in bear markets. 7-day cooldown.'],
              ['PT Pendle', 'Fixed Rate', 'Expiry management in an aggregator context. Rollover strategy needed.'],
              ['USD3 (3Jane)', 'Institutional Credit', 'Unsecured zkTLS lending backed by Paradigm. 1-month cooldown (sUSD3).'],
              ['Venus Core', 'Lending', 'BNB Chain leader. Ethereum mainnet architecture compatibility to confirm.'],
            ]}
          />
        </SubSection>
      </Section>

      {/* 5. YIELD, FEES & LIQUIDITY */}
      <Section id="yield-en" title="5. Yield, Fees & Liquidity">
        <SubSection title="5.1 Performance Fee">
          <p className="text-navy/70 leading-relaxed mb-3">
            DeFi Lantern charges a <strong>10% performance fee</strong> on net gains, applied at harvest time.
          </p>
          <InfoBox>
            <strong>Implementation:</strong> the fee is never transferred as USDC. Instead, at each harvest,
            the FeeManager mints new glUSDC shares to the treasury proportional to the gain, diluting
            existing shareholders by 10% of the yield produced. This mechanism aligns treasury interests
            with user returns — the treasury only earns when users earn.
          </InfoBox>
          <CodeBlock>{`gain        = totalAssets_after_yield - totalAssets_before_yield
fee_in_usd  = gain × 10%
new_shares  = fee_in_usd / pricePerShare_after_yield`}</CodeBlock>
        </SubSection>
        <SubSection title="5.2 Proportional Withdrawal Mechanism">
          <p className="text-navy/70 leading-relaxed mb-3">
            Each glUSDC represents a <strong>proportional claim</strong> across all underlying protocols,
            in line with the current allocation weights. There is no cross-subsidization: one user's
            Aave position is never used to pay another user's withdrawal.
          </p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Withdrawal flow:</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>User calls <code className="bg-navy/10 px-1 rounded">redeem(shares)</code></li>
            <li>Vault burns glUSDC and computes the proportional amount owed from each adapter</li>
            <li>Vault withdraws simultaneously from each protocol (e.g. 10% from Aave, 10% from Morpho, etc.)</li>
            <li>Funds from no-cooldown protocols are sent to the user immediately</li>
            <li>For protocols with a cooldown, the user waits for each protocol's specific delay</li>
          </ol>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Native token withdrawal option (syrupUSDC):</strong></p>
          <p className="text-navy/70 text-sm mb-3">
            For syrupUSDC (cooldown ~5 min), the vault can offer the user their <em>syrupUSDC tokens directly</em>
            instead of waiting for USDC redemption. The user keeps their position and manages it freely
            on Maple Finance — no queue wait required.
          </p>
          <InfoBox>
            <strong>No cross-subsidization:</strong> DeFi Lantern does not build a shared liquidity buffer
            by drawing on other depositors' positions. Every withdrawal is strictly proportional to
            the withdrawing user's share of each underlying protocol.
          </InfoBox>
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
              ['3 — Satellite', '5%', 'TVL < $200M or < 1 year live, strong audits', 'Flux Finance, fxSAVE, Resolv USR, cUSDO, syrupUSDC, reUSD'],
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
              ['Community / Liquidity Mining', '30%', '30,000,000', '48-month emission to glUSDC depositors', 'Bootstraps adoption, rewards early users'],
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

      {/* 10. LEGAL */}
      <Section id="legal-en" title="10. Legal Disclaimer">
        <WarningBox>
          DeFi Lantern is an experimental, open-source software project developed for academic purposes.
          It is not a registered financial product or investment vehicle. glUSDC shares are not securities.
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
  { id: 'protocols', label: '4. Protocoles' },
  { id: 'yield', label: '5. Rendement & Frais' },
  { id: 'governance', label: '6. Gouvernance' },
  { id: 'security', label: '7. Sécurité' },
  { id: 'tokenomics', label: '8. Tokenomique' },
  { id: 'roadmap', label: '9. Feuille de route' },
  { id: 'legal', label: '10. Avertissement légal' },
]

const TOC_EN = [
  { id: 'abstract-en', label: 'Abstract' },
  { id: 'intro-en', label: '1. Introduction' },
  { id: 'overview-en', label: '2. Protocol Overview' },
  { id: 'architecture-en', label: '3. Architecture' },
  { id: 'protocols-en', label: '4. Underlying Protocols' },
  { id: 'yield-en', label: '5. Yield, Fees & Liquidity' },
  { id: 'governance-en', label: '6. Governance' },
  { id: 'security-en', label: '7. Security' },
  { id: 'tokenomics-en', label: '8. Tokenomics' },
  { id: 'roadmap-en', label: '9. Roadmap' },
  { id: 'legal-en', label: '10. Legal Disclaimer' },
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
            <img src="/logo.png" alt="DeFi Lantern" className="h-8 w-8 object-contain" />
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
