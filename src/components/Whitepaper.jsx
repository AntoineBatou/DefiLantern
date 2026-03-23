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
          DeFi Lantern est un agrégateur de rendement pour stablecoins déployé sur Ethereum mainnet.
          Il est <strong>non-custodial</strong> : vos fonds ne transitent jamais par nos mains — ils restent
          dans les protocoles sous-jacents à tout moment.
          Les utilisateurs déposent des USDC et reçoivent en échange des parts —
          <strong>glUSDC-P</strong>, <strong>glUSDC-B</strong>, <strong>glUSDC-D</strong> ou <strong>glUSDC-AH</strong> selon le profil
          de risque choisi — dont la valeur augmente au fil du temps à mesure que le protocole
          collecte les rendements d'une sélection de protocoles DeFi éprouvés.
        </p>
        <p className="text-navy/70 leading-relaxed mt-3">
          DeFi Lantern cible les détenteurs de stablecoins cherchant un rendement passif,
          sans gestion active de portefeuille et sans exposition aux variations du marché.
          Le capital est réparti entre jusqu'à vingt protocoles sous-jacents couvrant les marchés de prêt,
          les produits adossés à des actifs réels (obligations d'État tokenisées, T-bills),
          les stratégies delta-neutres (couvertes contre les variations de prix)
          et le crédit institutionnel.
        </p>
        <p className="text-navy/70 leading-relaxed mt-3">
          Les décisions de gouvernance sont conduites via le token <strong>GLOW</strong> : les détenteurs
          votent on-chain, et toute décision adoptée entre en vigueur après un délai obligatoire de
          48 heures (Timelock). Un comité d'urgence (multisig 2-sur-3) peut uniquement suspendre
          les nouveaux dépôts — jamais accéder aux fonds.
        </p>
      </Section>

      {/* 1. INTRODUCTION */}
      <Section id="intro" title="1. Introduction">
        <SubSection title="1.1 Le problème du rendement stablecoin">
          <p className="text-navy/70 leading-relaxed mb-3">
            Les détenteurs de stablecoins font face à un paysage de rendement fragmenté.
            Des dizaines de protocoles proposent des APY (rendements annuels) compétitifs, chacun avec
            des profils de risque distincts, des fenêtres de liquidité, des périodes de blocage avant retrait
            et une complexité technique différente. Un investisseur doit :
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
              ['Tokens de part', 'glUSDC-P / glUSDC-B / glUSDC-D / glUSDC-AH — un vault ERC-4626 par profil (standard de vault Ethereum)'],
              ['Token de gouvernance', 'GLOW — permet de voter les décisions du protocole'],
              ['Frais', '5% de frais de performance sur les gains nets'],
              ['Garde', 'Non-custodial'],
              ['Retraits', 'Non-custodial, initiés par l\'utilisateur'],
              ['Rééquilibrage', 'Contrôlé par la gouvernance'],
            ]}
          />
        </SubSection>

        <SubSection title="2.2 Caractéristiques clés">
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Rendement à entrée unique.</strong> Un seul dépôt USDC donne accès à jusqu'à seize stratégies de rendement simultanées.</p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Standard ERC-4626.</strong> glUSDC-P, glUSDC-B, glUSDC-D et glUSDC-AH suivent le standard de vault Ethereum ERC-4626 — compatibles avec tout protocole DeFi supportant ce format. Chaque token est interchangeable au sein de son vault : acheter du glUSDC-P sur le marché secondaire, c'est s'exposer exactement aux mêmes protocoles Prudent que le déposant initial.</p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Non-custodial.</strong> Aucune clé admin ne peut déplacer les fonds des utilisateurs. Le comité d'urgence peut uniquement suspendre les nouveaux dépôts — les retraits restent possibles en permanence.</p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Stratégie transparente.</strong> Les poids d'allocation par protocole sont inscrits sur la blockchain (en points de base : 100 bp = 1%, somme = 10 000 bp = 100%). Tout détenteur de GLOW peut les vérifier à tout moment.</p>
          <p className="text-navy/70 text-sm"><strong className="text-navy">Gouvernance on-chain.</strong> Tous les changements de paramètres passent par un vote communautaire suivi d'un délai obligatoire de 48 heures avant exécution.</p>
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
            Le marché des vaults de rendement propose des dizaines d'options — agrégateurs, gestionnaires Morpho (curators), vaults Lagoon. Choisir parmi eux demande des compétences d'analyse avancées et une surveillance continue. DeFi Lantern est conçu pour répondre à ces limites.
          </p>
          <WpTable
            headers={['Critère', 'Vaults concurrents', 'DeFi Lantern']}
            rows={[
              ['Gouvernance de la stratégie', 'Gestionnaire libre de modifier les allocations sans vote communautaire', 'DAO uniquement (vote on-chain + délai 48h obligatoire)'],
              ['Transparence', 'Allocations et décisions rarement traçables en temps réel', 'Tous les paramètres on-chain, vérifiables à tout moment'],
              ['Cap par protocole', 'Concentration possible sur une seule stratégie', 'Aucun protocole ne dépasse 15% du TVL'],
              ['Frais de performance', '10% en moyenne sur le marché', '5% — aligné sur les gains effectifs des déposants'],
              ['Changement de stratégie', 'Possible sans préavis ni délai par le gestionnaire', 'Impossible sans vote DAO et délai obligatoire de 48h'],
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
            DeFi Lantern déploie <strong>quatre vaults distincts</strong>, un par profil de risque,
            chacun avec ses propres protocoles et poids d'allocation. Chaque vault émet un token distinct
            (glUSDC-P, glUSDC-B, glUSDC-D, glUSDC-AH) représentant une part du capital déposé.
            L'utilisateur choisit son profil, dépose ses USDC dans le vault correspondant
            et reçoit des parts dont la valeur augmente avec les rendements accumulés.
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
            Chaque protocole sous-jacent est intégré via un contrat adapter dédié. Tous les adapters
            partagent la même interface — le vault central ne connaît que trois opérations :
            <strong> déposer</strong>, <strong>retirer</strong> et <strong>lire la valeur actuelle</strong>.
            Ajouter ou retirer un protocole ne nécessite que de déployer un nouvel adapter
            et de voter en gouvernance — le vault central n'est jamais modifié.
          </p>
          <p className="text-navy/70 text-sm">
            Certains protocoles n'acceptent pas directement les USDC. Dans ce cas, l'adapter intègre
            automatiquement un échange via Uniswap V3 : les USDC déposés sont convertis au moment du dépôt,
            et reconvertis en USDC au moment du retrait. L'utilisateur ne voit que des USDC à tout moment.
          </p>
        </SubSection>

        <SubSection title="3.3 Structure des contrats">
          <p className="text-navy/70 text-sm mb-3">
            L'architecture repose sur 4 vaults ERC-4626 indépendants, un par profil, et 15 adapters
            (un par protocole sous-jacent). La gouvernance et les frais sont gérés par des contrats dédiés.
          </p>
          <WpTable
            headers={['Contrat', 'Rôle']}
            rows={[
              ['DeFiLanternVaultPrudent/Balanced/Dynamic/AH', 'Vault ERC-4626 — reçoit les dépôts, émet les parts, orchestre les adapters'],
              ['IAdapter + 15 adapters', 'Un adapter par protocole sous-jacent — isole la logique propre à chaque intégration'],
              ['GlowToken.sol', 'Token de gouvernance GLOW (ERC-20Votes, 100M supply fixe)'],
              ['DeFiLanternGovernor.sol', 'Contrat de vote on-chain (OZ Governor)'],
              ['TimelockController.sol', 'Délai obligatoire de 48h avant exécution de toute décision'],
              ['FeeManager.sol', 'Calcul et application des frais de performance (5%)'],
            ]}
          />
        </SubSection>

        <SubSection title="3.4 Allocation du capital et poids">
          <p className="text-navy/70 leading-relaxed mb-3">
            Les poids cibles sont stockés on-chain en points de base (1 bp = 0,01%, somme = 10 000 bp = 100%).
            La fonction <code className="bg-navy/10 px-1 rounded">rebalance()</code> déplace le capital entre les adapters
            pour correspondre aux poids cibles. Le rééquilibrage est déclenché par vote de gouvernance.
          </p>
          <p className="text-navy/70 text-sm font-semibold mb-2">🛡️ glUSDC-P — Vault Prudent (10 protocoles) :</p>
          <WpTable
            headers={['Protocole', 'Catégorie', 'Poids', 'Propriété clé']}
            rows={[
              ['Buffer de liquidité (Aave v3)', 'Retraits instantanés', '10%', 'Obligatoire — pas une allocation de rendement'],
              ['Aave v3 USDC', 'Lending', '15%', 'Allocation rendement (séparée du buffer)'],
              ['Morpho Gauntlet USDC Prime', 'Lending', '15%', 'Collatéral blue-chip uniquement, $0 bad debt'],
              ['Morpho Steakhouse USDC', 'Lending', '13%', 'Curator ultra-conservateur'],
              ['sUSDS (Sky)', 'Savings Rate', '12%', 'Infrastructure MakerDAO depuis 2017'],
              ['sBOLD (Liquity v2)', 'Stability Pool', '10%', 'Code immuable, zéro admin key'],
              ['scrvUSD (Curve)', 'Savings Rate', '9%', 'Timelock 7j (Curve DAO)'],
              ['sUSDe (Ethena)', 'Delta-Neutral', '7%', 'Cooldown 7j, géré par le buffer'],
              ['cUSDO (OpenEden)', 'RWA T-bills', '5%', 'Oracle Chainlink, audit ChainSecurity'],
              ['fxSAVE (f(x) Protocol)', 'Stability Pool', '3%', 'Exception : 16 audits, ERC-4626 natif'],
              ['thBill (Theo Network)', 'RWA T-bills', '1%', 'Exception : cappé, marché secondaire uniquement'],
            ]}
          />
          <InfoBox>
            <strong>Buffer de liquidité :</strong> Le buffer de 10% est placé sur Aave v3 et sert en premier lors des retraits. Il appartient au vault dans son ensemble — ce n'est pas une allocation individuelle par utilisateur et ne touche pas aux positions des autres déposants. L'allocation rendement d'Aave (15%) est une ligne distincte et séparée.
          </InfoBox>
          <p className="text-navy/70 text-sm font-semibold mb-2 mt-4">⚡ glUSDC-D — Vault Dynamic (10 protocoles) :</p>
          <WpTable
            headers={['Protocole', 'Catégorie', 'Poids']}
            rows={[
              ['syrupUSDC (Maple)', 'Institutional Credit', '15%'],
              ['sNUSD (Neutrl)', 'Delta-Neutral', '15%'],
              ['jrUSDe (Strata)', 'Market Neutral', '13%'],
              ['sUSD3 (3Jane)', 'Institutional Credit', '12%'],
              ['sUSDai (USD.AI)', 'RWA / AI Credit', '12%'],
              ['InfiniFI (siUSD)', 'Fractional Reserve', '10%'],
              ['Reservoir (srUSD)', 'CDP Savings Rate', '8%'],
              ['stkUSDC (Aave Umbrella)', 'Safety Module', '7%'],
              ['imUSD (mStable)', 'Fixed Rate', '5%'],
              ['reUSDe (Re Protocol)', 'Reinsurance', '3%'],
            ]}
          />
          <p className="text-navy/70 text-sm font-semibold mb-2 mt-4">⚖️ glUSDC-B — Vault Balanced (20 protocoles) :</p>
          <p className="text-navy/70 text-sm mb-3">
            50% des allocations Prudent + 50% des allocations Dynamic — aucun protocole exclusif. Poids blendés recalculés :
          </p>
          <WpTable
            headers={['Protocole', 'Origine', 'Poids blendé']}
            rows={[
              ['Buffer de liquidité (Aave v3)', 'Prudent', '5.0%'],
              ['Aave v3 USDC', 'Prudent', '7.5%'],
              ['Morpho Gauntlet USDC Prime', 'Prudent', '7.5%'],
              ['syrupUSDC (Maple)', 'Dynamic', '7.5%'],
              ['sNUSD (Neutrl)', 'Dynamic', '7.5%'],
              ['jrUSDe (Strata)', 'Dynamic', '6.5%'],
              ['Morpho Steakhouse USDC', 'Prudent', '6.5%'],
              ['sUSD3 (3Jane)', 'Dynamic', '6.0%'],
              ['sUSDai (USD.AI)', 'Dynamic', '6.0%'],
              ['sUSDS (Sky)', 'Prudent', '6.0%'],
              ['sBOLD (Liquity v2)', 'Prudent', '5.0%'],
              ['InfiniFI (siUSD)', 'Dynamic', '5.0%'],
              ['scrvUSD (Curve)', 'Prudent', '4.5%'],
              ['Reservoir (srUSD)', 'Dynamic', '4.0%'],
              ['stkUSDC (Aave Umbrella)', 'Dynamic', '3.5%'],
              ['sUSDe (Ethena)', 'Prudent', '3.5%'],
              ['cUSDO (OpenEden)', 'Prudent', '2.5%'],
              ['imUSD (mStable)', 'Dynamic', '2.5%'],
              ['fxSAVE (f(x) Protocol)', 'Prudent', '1.5%'],
              ['reUSDe (Re Protocol)', 'Dynamic', '1.5%'],
              ['thBill (Theo Network)', 'Prudent', '0.5%'],
            ]}
          />
          <p className="text-navy/70 text-sm mt-3 mb-4">
            <em>La moitié Prudent contribue un buffer de liquidité de 5% (Aave v3) au vault Balanced pour des retraits instantanés proportionnels.</em>
          </p>
          <p className="text-navy/70 text-sm font-semibold mb-2 mt-4">🪂 glUSDC-AH — Vault Airdrop Hunter (4 protocoles) :</p>
          <WpTable
            headers={['Protocole', 'Catégorie', 'Poids', 'Thèse tokenomics']}
            rows={[
              ['Sierra Money', 'LYT (RWA+DeFi)', '25%', 'Pas de token — backing institutionnel fort (LayerZero OFT sur ETH), TGE probable'],
              ['stcUSD (Cap)', 'Institutional Credit', '25%', 'Pas de token — $500M TVL, contrats immutables, TGE très probable'],
              ['sUSDai (USD.AI)', 'RWA / AI Credit', '25%', 'CHIP token ICO Q1 2026 — partenariat PayPal, collatéral GPU'],
              ['thBill (Theo Network)', 'RWA T-bills', '25%', 'Pas de token — backing institutionnel (Standard Chartered + Wellington), TGE probable'],
            ]}
          />
          <InfoBox>
            ⚠️ <strong>Les airdrops sont un bonus potentiel — jamais un rendement promis.</strong> Les rendements ci-dessus sont viables indépendamment. Revue trimestrielle obligatoire — sortie si l'événement tokenomics est passé sans rationale supplémentaire.
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
            headers={['Profil', 'Protocoles', 'APY cible', 'Logique de sélection']}
            rows={[
              ['🛡️ Prudent', '10 protocoles — lending simple, savings rates, RWA T-bills, delta-neutre audité. Pas de levier.', '3–7%', 'TVL >$100M, ancienneté >1 an, ≥1 audit reconnu. Exceptions documentées (thBill 1%, fxSAVE 3%).'],
              ['⚖️ Équilibré', '20 protocoles — 50% Prudent + 50% Dynamic. Aucun protocole exclusif.', '5–10%', 'Mix des deux profils. Poids proportionnels, max 15% par protocole.'],
              ['⚡ Dynamique', '10 protocoles — tranches junior, crédit institutionnel (KYC accepté), AI credit, fractional reserve', '8–15%', 'TVL >$5M, ≥1 audit ou code public. Risque assumé, max 15% par protocole.'],
              ['🪂 Airdrop Hunter', '4 protocoles — Sierra Money, Cap stcUSD, thBill, sUSDai. Liste évolutive par gouvernance.', 'Variable', 'Protocoles innovants avec potentiel tokenomics (airdrop, TGE). 25% chacun. Airdrops = bonus non garanti.'],
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
            par vote de gouvernance.
          </p>
        </SubSection>
        </div>

        <SubSection title="3.6 Protocoles non-natifs : marché secondaire et cross-chain">
          <p className="text-navy/70 leading-relaxed mb-3">
            Quel que soit le profil, <strong>l'utilisateur dépose et retire uniquement en USDC sur Ethereum mainnet</strong>.
            Certains protocoles retenus ne sont pas accessibles directement en USDC — le vault gère
            ces cas via deux mécanismes :
          </p>
          <WpTable
            headers={['Mécanisme', 'Exemple', 'Fonctionnement']}
            rows={[
              ['Marché secondaire (DEX)', 'thBILL (Theo Network)', 'Le vault achète thBILL via Uniswap V3. Protection : TWAP 30 min + slippage max 0,5%. L\'adapter gère l\'achat et la revente automatiquement.'],
              ['Token bridgé sur ETH', 'Sierra Money (Avalanche)', 'Sierra émet un token représentatif sur ETH via LayerZero OFT. Le vault achète ce token directement, sans bridge actif côté vault. Risque : liquidité du token + tail risk bridge.'],
            ]}
          />
          <InfoBox>
            <strong>Vers l'asynchrone — ERC-7540 (v2) :</strong> certains protocoles imposent un délai avant retrait
            (sUSDe : 7 jours). En v1, le buffer de liquidité de 10% TVL couvre ces cas.
            En v2, DeFi Lantern envisage d'adopter <strong>ERC-7540</strong> — extension d'ERC-4626 introduisant
            un système de file de demandes (<code className="bg-navy/10 px-1 rounded">requestRedeem()</code> →
            attente → <code className="bg-navy/10 px-1 rounded">redeem()</code>) qui gèrerait nativement
            les cooldowns et les flux cross-chain asynchrones. Ce standard est complémentaire d'<strong>ERC-7575</strong>,
            qui sépare le token de part du contrat vault pour plus de composabilité — aligné avec
            notre architecture multi-vaults.
          </InfoBox>
        </SubSection>
      </Section>

      {/* 4. PROTOCOLES SOUS-JACENTS */}
      <Section id="protocols" title="4. Protocoles sous-jacents">
        <SubSection title="4.1 Méthodologie de sélection">
          <p className="text-navy/70 text-sm mb-3">
            <strong>4 filtres universels</strong> (tous profils) : EVM-compatible, pas de hack non résolu {'>'}$1M, protocole actif, code vérifiable.
            Chaque profil applique ensuite ses propres seuils. La répartition est basée sur le <strong>risque de la stratégie</strong> (levier, collatéral, ancienneté, mécanisme) — pas sur le rendement.
          </p>
          <WpTable
            headers={['Critère', '🛡️ Prudent', '⚖️ Balanced', '⚡ Dynamic', '🪂 AH']}
            rows={[
              ['TVL min', '>$100M', '>$20M', '>$5M', 'Aucun'],
              ['Ancienneté', '>1 an (protocole ou équipe)', '>3 mois', '>1 mois', 'Aucune'],
              ['Audits', '≥1 firme reconnue (Tier-1 préféré)', '≥1 (tout niveau)', '≥1 ou code public', 'Recommandé'],
              ['KYC', 'Non (ou secondaire liquide)', 'Non (ou secondaire)', 'Acceptable', 'Acceptable'],
              ['Timelock', 'Fortement recommandé', 'Optionnel', 'Non requis', 'Non requis'],
              ['Max alloc/protocole', '15%', '15%', '15%', '25%'],
            ]}
          />
        </SubSection>

        <SubSection title="4.2 Protocoles retenus">
          <p className="text-navy/70 text-sm mb-3 font-semibold">🛡️ Prudent — 10 protocoles</p>
          <div className="space-y-4 mb-6">
            {[
              { name: 'Aave v3', cat: 'Lending', desc: '~$28B TVL. Référence du lending DeFi. Audité par Trail of Bits, OpenZeppelin, Certora. Oracle Chainlink. Timelock 1–7j. Buffer liquidité 10% TVL.' },
              { name: 'Morpho (Gauntlet USDC Prime)', cat: 'Lending', desc: 'Vault Prime — collatéral blue-chip uniquement (ETH, wstETH, WBTC). $0 bad debt durant le stress test nov. 2025. Trail of Bits, Spearbit.' },
              { name: 'Morpho (Steakhouse USDC)', cat: 'Lending', desc: 'Vault ultra-conservateur par Steakhouse Financial. Collatéraux haute qualité, exposition minimale au risque.' },
              { name: 'sUSDS (Sky)', cat: 'Savings Rate', desc: '~$8B TVL. Taux d\'épargne Sky (ex-MakerDAO). USDC → USDS (PSM 1:1) → sUSDS. Double timelock 18h/48h. Depuis 2017.' },
              { name: 'sUSDe (Ethena)', cat: 'Delta-Neutral', desc: '~$6B TVL. Delta-neutre ETH (spot long + perp short). Funding rates + staking. Cooldown 7j géré par buffer.' },
              { name: 'cUSDO (OpenEden)', cat: 'RWA T-bills', desc: '100% T-bills US. Oracle Chainlink. ChainSecurity audit. Seul produit T-bills pur natif Ethereum.' },
              { name: 'sBOLD (Liquity v2)', cat: 'Stability Pool', desc: 'ERC-4626 natif. Code immuable (zéro admin key). 3 audits Tier-1 (ChainSecurity, Dedaub, Certora). Équipe depuis 2021.' },
              { name: 'scrvUSD (Curve)', cat: 'Savings Rate', desc: 'ERC-4626 natif. Intérêts des emprunteurs crvUSD. Trail of Bits + MixBytes + Quantstamp. Timelock 7j. Curve depuis 2020.' },
              { name: 'fxSAVE (f(x) Protocol)', cat: 'Stability Pool', desc: 'ERC-4626 natif. Delta-neutre auto-compounding. 16 audits (100% code). Aladdin DAO depuis 2021. Exception TVL ($53M).' },
              { name: 'thBill (Theo Network)', cat: 'RWA T-bills', desc: 'T-bills US tokenisés. Standard Chartered + Wellington Management. ERC-4626. Exception — cap 1%. Marché secondaire uniquement (Uniswap V3, TWAP 30min). Revue trimestrielle.' },
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
          <p className="text-navy/70 text-sm mb-3 font-semibold">⚡ Dynamic — 10 protocoles</p>
          <div className="space-y-4 mb-6">
            {[
              { name: 'sNUSD (Neutrl)', cat: 'Delta-Neutral', desc: 'Delta-neutre multi-exchanges. Position longue spot ETH + courte perp. Rendement des funding rates.' },
              { name: 'syrupUSDC (Maple)', cat: 'Institutional Credit', desc: 'Prêts on-chain à des institutions crypto vérifiées. KYC requis — accepté en Dynamic. ERC-4626. Spearbit + Sherlock.' },
              { name: 'jrUSDe (Strata)', cat: 'Market Neutral', desc: 'Tranche junior Ethena. Rendement amplifié en échange d\'absorption prioritaire des pertes.' },
              { name: 'sUSD3 (3Jane)', cat: 'Institutional Credit', desc: 'Prêts institutionnels vérifiés via zkTLS. Soutenu par Paradigm. Cooldown 1 mois.' },
              { name: 'imUSD (mStable)', cat: 'Fixed Rate', desc: 'Stratégie taux fixe via Pendle PT. Rendement défini à l\'avance, risque de taux.' },
              { name: 'reUSDe (Re Protocol)', cat: 'Reinsurance', desc: 'Tranche junior réassurance. Absorbe les pertes en premier si Ethena sous-performe.' },
              { name: 'stkUSDC (Aave Umbrella)', cat: 'Safety Module', desc: 'Module de sécurité Aave v3. USDC stakés pour couvrir les déficits de bad debt. Risque de slashing.' },
              { name: 'sUSDai (USD.AI)', cat: 'RWA / AI Credit', desc: 'Prêts collatéralisés par GPUs NVIDIA. 13–17% APY. CHIP token Q1 2026. Partenariat PayPal.' },
              { name: 'InfiniFI (siUSD)', cat: 'Fractional Reserve', desc: 'Banque fractionnaire on-chain. Tranche liquide (siUSD) sur Aave/Fluid. Certora formal verification. TGE début 2026.' },
              { name: 'Reservoir (srUSD)', cat: 'CDP Stablecoin', desc: 'CDP stablecoin + savings rate. $526M TVL. Halborn + 4 audits spécialisés. Token DAM.' },
            ].map((p) => (
              <div key={p.name} className="bg-bg rounded-xl p-4 border border-lgrey">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-navy text-sm">{p.name}</span>
                  <span className="text-xs bg-[#7C3AED]/10 text-[#7C3AED] rounded-full px-2 py-0.5">{p.cat}</span>
                </div>
                <p className="text-navy/70 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-navy/70 text-sm mb-3 font-semibold">⚖️ Balanced — 20 protocoles (50% Prudent + 50% Dynamic)</p>
          <p className="text-navy/70 text-sm mb-6">
            Le profil Balanced est un mix pur : 50% des allocations Prudent + 50% des allocations Dynamic.
            Il ne contient aucun protocole exclusif — tous les protocoles sont partagés avec Prudent ou Dynamic.
          </p>
          <p className="text-navy/70 text-sm mb-3 font-semibold">🪂 Airdrop Hunter — 4 protocoles</p>
          <div className="space-y-4">
            {[
              { name: 'Sierra Money', cat: 'Liquid Yield Token', desc: 'Hybride RWA + DeFi. T-bills + Aave/Morpho/Pendle. Natif Avalanche, ETH via LayerZero. TGE probable.' },
              { name: 'stcUSD (Cap)', cat: 'Institutional Credit', desc: 'Crédit privé institutionnel. $500M TVL. RedStone oracle. Contrats immutables. Pas de token → TGE probable.' },
              { name: 'thBill (Theo Network)', cat: 'RWA T-bills', desc: 'Aussi en Prudent (5% cap). Potentiel tokenomics Theo Network ($20M seed, backing institutionnel).' },
              { name: 'sUSDai (USD.AI)', cat: 'RWA / AI Credit', desc: 'Aussi en Dynamic. CHIP token ICO attendu avril 2026. Partenariat PayPal + Quantum Solutions.' },
            ].map((p) => (
              <div key={p.name} className="bg-bg rounded-xl p-4 border border-lgrey">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-navy text-sm">{p.name}</span>
                  <span className="text-xs bg-[#C0392B]/10 text-[#C0392B] rounded-full px-2 py-0.5">{p.cat}</span>
                </div>
                <p className="text-navy/70 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="4.3 Protocoles exclus">
          <WpTable
            headers={['Protocole', 'Raison']}
            rows={[
              ['Resupply reUSD', '⛔ Hacké juin 2025 — $9,5M. Dette remboursée mais exclu (CDP niche).'],
              ['USR / RLP (Resolv)', '⛔ Hacké 22 mars 2026 — $80M exploit, USR dépeg -80%.'],
              ['Mountain Protocol USDM', '⛔ Wind-down officiel — primary market fermé août 2025.'],
              ['Moonwell', '⚠️ Oracle misconfiguration fév 2026 — $1,78M bad debt non résolu.'],
              ['Elixir deUSD', 'Halté (contagion Stream Finance $93M).'],
              ['Usual USD0++', 'Dépeg janv 2025, lock 4 ans, tokenomics inflationniste.'],
              ['HLP / JLP / Liminal', 'Non-EVM (Hyperliquid / Solana).'],
              ['GMX GLP/GM', 'Arbitrum uniquement → v2.'],
              ['PT-Pendle', 'Gestion des dates d\'expiration complexe → v2.'],
            ]}
          />
        </SubSection>
      </Section>

      {/* 5. RENDEMENT, FRAIS ET LIQUIDITÉ */}
      <Section id="yield" title="5. Rendement, frais et liquidité">
        <SubSection title="5.1 Harvest">
          <p className="text-navy/70 leading-relaxed">
            La fonction <code className="bg-navy/10 px-1 rounded">harvest()</code> — appelée "collecte" — récupère
            les rendements accumulés sur tous les protocoles, les ajoute au vault et applique les frais de performance.
            Cette collecte est déclenchée manuellement en v1, potentiellement automatisée en v2.
          </p>
        </SubSection>

        <SubSection title="5.2 Frais de performance">
          <p className="text-navy/70 leading-relaxed mb-3">
            DeFi Lantern prélève des <strong>frais de performance de 5%</strong> sur les gains nets,
            appliqués au moment du harvest.
          </p>
          <InfoBox>
            <strong>Comment c'est implémenté :</strong> les frais ne sont jamais prélevés en USDC.
            À chaque collecte, le protocole crée de nouvelles parts glUSDC au bénéfice du treasury
            (le multisig de l'équipe), proportionnellement aux gains générés.
            Ce mécanisme aligne les intérêts de l'équipe avec ceux des déposants :
            le protocole ne perçoit un revenu que quand les utilisateurs en perçoivent un.
          </InfoBox>
          <CodeBlock>{`gain        = totalAssets_après_yield - totalAssets_avant_yield
fee_en_usd  = gain × 5%
new_shares  = fee_en_usd / pricePerShare_après_yield`}</CodeBlock>
          <p className="text-navy/70 text-sm">Le treasury est un multisig Gnosis Safe contrôlé par l'équipe DeFi Lantern.</p>
        </SubSection>

        <SubSection title="5.3 Buffer de liquidité et mécanisme de retrait">
          <p className="text-navy/70 leading-relaxed mb-3">
            DeFi Lantern maintient une <strong>réserve de liquidité de 10% du TVL</strong> (total des actifs déposés),
            placée sur Aave v3 pour un retrait instantané. Cette réserve est distincte et séparée
            de l'allocation rendement Aave (15%) — c'est un coussin collectif dédié aux retraits.
            Elle couvre la très grande majorité des demandes de retrait individuelles sans délai.
          </p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Flux de retrait :</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-4">
            <li>L'utilisateur appelle <code className="bg-navy/10 px-1 rounded">redeem(shares)</code></li>
            <li>Le vault brûle les parts glUSDC et calcule le montant dû</li>
            <li>Le vault utilise le buffer en premier (Aave v3) ; si le retrait dépasse le buffer, le solde est retiré proportionnellement de tous les adapters</li>
            <li>Les USDC sont envoyés à l'utilisateur</li>
          </ol>
          <InfoBox>
            <strong>Buffer = réserve collective, pas individuelle :</strong> Le buffer appartient au vault dans son ensemble. Quand il couvre intégralement un retrait, aucune position d'un autre utilisateur dans aucun protocole n'est touchée. Si le retrait dépasse le buffer, le solde est retiré proportionnellement de tous les adapters — chaque utilisateur ne supporte que sa propre quote-part.
          </InfoBox>
        </SubSection>
      </Section>

      {/* 6. GOUVERNANCE */}
      <Section id="governance" title="6. Gouvernance">
        <SubSection title="6.1 Token GLOW">
          <p className="text-navy/70 leading-relaxed mb-3">
            GLOW est le token de gouvernance de DeFi Lantern. Les détenteurs de GLOW
            peuvent soumettre des propositions et voter sur tous les changements de paramètres du protocole.
            Supply fixe de 100 millions de tokens — pas de création supplémentaire possible.
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
            Toutes les décisions adoptées par vote entrent en vigueur après un délai obligatoire de 48 heures.
            Ce délai permet à tout utilisateur de retirer ses fonds s'il désapprouve une décision
            avant qu'elle soit exécutée.
          </p>
        </SubSection>

        <SubSection title="6.4 Guardian">
          <p className="text-navy/70 leading-relaxed mb-2">
            Un comité d'urgence (multisig 2-sur-3 : 3 membres de l'équipe, 2 signatures requises) détient des pouvoirs limités. Il peut uniquement :
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

        <SubSection title="7.2 Procédures d'urgence">
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
        <SubSection title="9.1 v1 — MVP Académique (6 semaines)">
          <p className="text-navy/70 text-sm mb-3">
            Toutes les stratégies sur Ethereum mainnet. Rééquilibrage manuel (vote de gouvernance). Pas de keeper. Les protocoles avec tokens cross-chain sont accessibles uniquement via Architecture 0 (token OFT bridgé acheté sur ETH — le vault lui-même n'envoie jamais d'actifs cross-chain).
          </p>
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
        </SubSection>

        <SubSection title="9.2 v2 — Protocole en Production">
          <p className="text-navy/70 text-sm mb-3 font-semibold">9.2.1 Stratégie cross-chain</p>
          <p className="text-navy/70 text-sm mb-3">
            Les vaults DeFi Lantern restent ancrés sur Ethereum mainnet. L'accès cross-chain est adressé progressivement via quatre architectures, appliquées dans un ordre strict de complexité croissante :
          </p>
          <WpTable
            headers={['Architecture', 'Mécanisme', 'Coût', 'Quand l\'utiliser']}
            rows={[
              ['0 — Token bridgé sur ETH', 'Le protocole déploie son token sur ETH via LayerZero OFT ou équivalent. Le vault l\'achète sur ETH comme n\'importe quel ERC-20. Pas de bridge actif côté vault.', 'Gas uniquement (~$5–15)', 'Défaut — toujours vérifier en premier. Exemple : Sierra Money (lzSIERRA sur ETH).'],
              ['1a — Keeper + CCTP', 'Keeper off-chain bridge les USDC via Circle CCTP v2 (quasi-gratuit, 2–10s) vers Arbitrum / Base / Optimism puis dépose dans le protocole cible. Solde rapatrié sur ETH via oracle (~1h).', '~$10–30/rééquilibrage', 'Grands L2 EVM avec USDC Circle natif.'],
              ['1b — Keeper + Li.Fi', 'Keeper interroge l\'agrégateur Li.Fi (10+ bridges comparés en temps réel) pour les app-chains sans CCTP : Avalanche, HyperEVM, Plasma, Mantle…', '~$15–40/rééquilibrage', 'Chains EVM sans CCTP.'],
              ['2 — OVault (LayerZero)', 'Contrats satellites sur chaque chain cible, gouvernés par le vault ETH via messages LayerZero. Entièrement décentralisé — pas de keeper requis.', 'Faible on-chain', 'Architecture cible pour v3.'],
            ]}
          />
          <WpTable
            headers={['Profil', 'Architecture']}
            rows={[
              ['Prudent 🛡️', '100% ETH mainnet — pas de cross-chain'],
              ['Balanced ⚖️', '100% ETH mainnet — pas de cross-chain'],
              ['Dynamic ⚡', 'Architecture 0 d\'abord → Architecture 1a si protocole sur un L2 EVM'],
              ['Airdrop Hunter 🪂', 'Architecture 0 (Sierra Money, déjà décidé) → Architecture 1b pour nouveaux protocoles'],
            ]}
          />
          <InfoBox>
            <strong>Comportement en cas d'échec bridge :</strong> si un bridge dépasserait la limite de 0,5% de slippage, ou si Li.Fi ne retourne aucune route viable, le keeper n'exécute pas l'allocation cross-chain. Les USDC restent sur Aave v3 (~3–5% APY de base) et l'allocation est retentée au cycle de harvest suivant. Après 3 cycles consécutifs en échec, une alerte on-chain est émise pour revue de gouvernance. Le seuil de rentabilité du keeper se situe à ~$300K–500K TVL sur les profils concernés.
          </InfoBox>
          <p className="text-navy/70 text-sm mb-3 font-semibold mt-4">9.2.2 Autres jalons v2</p>
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1">
            <li>Rééquilibrage automatisé via Chainlink Automation ou réseau de keepers Gelato</li>
            <li>Intégration PT-Pendle avec rollover automatique à l'expiration</li>
            <li>Redirection partielle des frais de performance vers les stakers GLOW (vote de gouvernance requis)</li>
            <li>Bug bounty public sur Immunefi</li>
            <li>Couverture d'audit élargie (minimum deux firmes avant déploiement mainnet)</li>
          </ul>
        </SubSection>

        <SubSection title="9.3 v3 — Vision Long Terme">
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1">
            <li><strong className="text-navy">Cross-chain décentralisé (Architecture 2) :</strong> standard OVault LayerZero — contrats satellites sur Arbitrum, Base, Avalanche gouvernés on-chain par le vault ETH. Aucun keeper requis. Les utilisateurs peuvent déposer des USDC depuis n'importe quelle chain supportée et recevoir des parts glUSDC sur leur chain via LayerZero OFT.</li>
            <li><strong className="text-navy">Support multi-actifs :</strong> vaults USDT et DAI avec ensembles d'adapters indépendants.</li>
            <li><strong className="text-navy">Couverture RWA élargie :</strong> crédit tokenisé, crédit privé et instruments adossés à des matières premières au fur et à mesure que la liquidité on-chain mature.</li>
            <li><strong className="text-navy">Décentralisation de la gouvernance :</strong> réduction progressive des pouvoirs du Guardian à mesure que le track record du protocole s'établit.</li>
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
        <SubSection title="3.1 Four ERC-4626 Vaults — glUSDC-P / glUSDC-B / glUSDC-D / glUSDC-AH">
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
          <p className="text-navy/70 text-sm font-semibold mb-2">🛡️ glUSDC-P — Prudent vault (10 protocols):</p>
          <WpTable
            headers={['Protocol', 'Category', 'Weight', 'Key property']}
            rows={[
              ['Liquidity Buffer (Aave v3)', 'Instant Withdrawals', '10%', 'Mandatory — not a yield allocation'],
              ['Aave v3 USDC', 'Lending', '15%', 'Tier-1 lending reference'],
              ['Morpho Gauntlet USDC Prime', 'Lending', '15%', 'Blue-chip collateral only, $0 bad debt'],
              ['Morpho Steakhouse USDC', 'Lending', '13%', 'Ultra-conservative curator'],
              ['sUSDS (Sky)', 'Savings Rate', '12%', 'MakerDAO infrastructure since 2017'],
              ['sBOLD (Liquity v2)', 'Stability Pool', '10%', 'Immutable code, no admin keys'],
              ['scrvUSD (Curve)', 'Savings Rate', '9%', '7-day timelock (Curve DAO)'],
              ['sUSDe (Ethena)', 'Delta-Neutral', '7%', '7-day cooldown, buffer-managed'],
              ['cUSDO (OpenEden)', 'RWA T-bills', '5%', 'Chainlink oracle, ChainSecurity audit'],
              ['fxSAVE (f(x) Protocol)', 'Stability Pool', '3%', 'Exception: 16 audits, ERC-4626 native'],
              ['thBill (Theo Network)', 'RWA T-bills', '1%', 'Exception: capped, secondary market only'],
            ]}
          />
          <p className="text-navy/70 text-sm font-semibold mb-2 mt-4">⚡ glUSDC-D — Dynamic vault (10 protocols):</p>
          <WpTable
            headers={['Protocol', 'Category', 'Weight']}
            rows={[
              ['syrupUSDC (Maple)', 'Institutional Credit', '15%'],
              ['sNUSD (Neutrl)', 'Delta-Neutral', '15%'],
              ['jrUSDe (Strata)', 'Market Neutral', '13%'],
              ['sUSD3 (3Jane)', 'Institutional Credit', '12%'],
              ['sUSDai (USD.AI)', 'RWA / AI Credit', '12%'],
              ['InfiniFI (siUSD)', 'Fractional Reserve', '10%'],
              ['Reservoir (srUSD)', 'CDP Savings Rate', '8%'],
              ['stkUSDC (Aave Umbrella)', 'Safety Module', '7%'],
              ['imUSD (mStable)', 'Fixed Rate', '5%'],
              ['reUSDe (Re Protocol)', 'Reinsurance', '3%'],
            ]}
          />
          <p className="text-navy/70 text-sm mt-4">
            <strong>⚖️ glUSDC-B (Balanced)</strong>: 50% Prudent + 50% Dynamic — no exclusive protocols.
            <br/><strong>🪂 glUSDC-AH (Airdrop Hunter)</strong>: Sierra Money 25% + Cap stcUSD 25% + sUSDai 25% + thBill 25%.
          </p>
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
            headers={['Profile', 'Protocols', 'Target APY', 'Selection logic']}
            rows={[
              ['🛡️ Prudent', '10 protocols — simple lending, savings rates, RWA T-bills, audited delta-neutral. No leverage.', '3–7%', 'TVL >$100M, age >1y, ≥1 recognized audit. Documented exceptions (thBill 1%, fxSAVE 3%).'],
              ['⚖️ Balanced', '20 protocols — 50% Prudent + 50% Dynamic. No exclusive protocols.', '5–10%', 'Pure mix of both profiles. Equal weights, max 15% per protocol.'],
              ['⚡ Dynamic', '10 protocols — junior tranches, institutional credit (KYC accepted), AI credit, fractional reserve', '8–15%', 'TVL >$5M, ≥1 audit or public code. Accepted risk, max 15% per protocol.'],
              ['🪂 Airdrop Hunter', '4 protocols — Sierra Money, Cap stcUSD, thBill, sUSDai. Evolving list via governance.', 'Variable', 'Innovative protocols with tokenomics potential (airdrop, TGE). 25% each. Airdrops = potential bonus, never promised.'],
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
            Each profile's allocation weights are stored on-chain and updatable by governance vote.
          </p>
        </SubSection>
        </div>

        <SubSection title="3.5 Non-Native Protocols: Secondary Market and Cross-Chain">
          <p className="text-navy/70 leading-relaxed mb-3">
            Regardless of profile, <strong>users always deposit and withdraw in USDC on Ethereum mainnet</strong>.
            Some retained protocols are not directly accessible in USDC — the vault handles these
            via two mechanisms:
          </p>
          <WpTable
            headers={['Mechanism', 'Example', 'How it works']}
            rows={[
              ['Secondary market (DEX)', 'thBILL (Theo Network)', 'The vault buys thBILL via Uniswap V3. Protection: 30-min TWAP + max 0.5% slippage. The adapter handles buying and selling automatically.'],
              ['Bridged token on ETH', 'Sierra Money (Avalanche)', 'Sierra issues a representative token on ETH via LayerZero OFT. The vault buys this token directly — no active bridge on the vault side. Risk: token liquidity + bridge tail risk.'],
            ]}
          />
          <InfoBox>
            <strong>Towards async flows — ERC-7540 (v2):</strong> some protocols require a waiting period before withdrawal
            (e.g. sUSDe: 7 days). In v1, the 10% TVL liquidity buffer covers these cases.
            In v2, DeFi Lantern plans to adopt <strong>ERC-7540</strong> — an ERC-4626 extension introducing
            a request queue (<code className="bg-navy/10 px-1 rounded">requestRedeem()</code> →
            wait → <code className="bg-navy/10 px-1 rounded">redeem()</code>) that would natively handle
            cooldowns and asynchronous cross-chain flows. This standard pairs with <strong>ERC-7575</strong>,
            which separates the share token from the vault contract for greater composability — already
            aligned with our multi-vault architecture.
          </InfoBox>
        </SubSection>
      </Section>

      {/* 4. UNDERLYING PROTOCOLS */}
      <Section id="protocols-en" title="4. Underlying Protocols">
        <SubSection title="4.1 Selection Methodology">
          <p className="text-navy/70 text-sm mb-3">
            <strong>4 universal filters</strong> (all profiles): EVM-compatible, no unresolved hack {'>'}$1M, active protocol, verifiable code.
            Each profile then applies its own thresholds. Assignment is based on <strong>strategy risk</strong> (leverage, collateral, age, mechanism) — not yield.
          </p>
          <WpTable
            headers={['Criterion', '🛡️ Prudent', '⚖️ Balanced', '⚡ Dynamic', '🪂 AH']}
            rows={[
              ['Min TVL', '>$100M', '>$20M', '>$5M', 'None'],
              ['Min age', '>1 year (protocol or team)', '>3 months', '>1 month', 'None'],
              ['Audits', '≥1 recognized (Tier-1 preferred)', '≥1 (any level)', '≥1 or public code', 'Recommended'],
              ['KYC', 'No (or liquid secondary)', 'No (or secondary)', 'Acceptable', 'Acceptable'],
              ['Timelock', 'Strongly recommended', 'Optional', 'Not required', 'Not required'],
              ['Max alloc/protocol', '15%', '15%', '15%', '25%'],
            ]}
          />
        </SubSection>
        <SubSection title="4.2 Retained Protocols by Profile">
          <p className="text-navy/70 text-sm mb-3">
            <strong>10 Prudent</strong> + <strong>10 Dynamic</strong> + <strong>4 Airdrop Hunter</strong> — some protocols shared across profiles.
            Balanced = pure 50/50 mix of Prudent and Dynamic (no exclusive protocols).
            See the French version above for detailed per-protocol descriptions.
          </p>
          <WpTable
            headers={['Profile', '# Protocols', 'Key protocols']}
            rows={[
              ['🛡️ Prudent', '10', 'Aave v3, Morpho Prime, Morpho Steakhouse, sUSDS, sUSDe, cUSDO, sBOLD, scrvUSD, fxSAVE, thBill'],
              ['⚡ Dynamic', '10', 'sNUSD, syrupUSDC, jrUSDe, sUSD3, imUSD, reUSDe, stkUSDC, sUSDai, InfiniFI, Reservoir'],
              ['⚖️ Balanced', '20', '50% Prudent + 50% Dynamic — equal weights, max 15% per protocol'],
              ['🪂 Airdrop Hunter', '4', 'Sierra Money, Cap stcUSD, thBill, sUSDai'],
            ]}
          />
        </SubSection>

        <SubSection title="4.3 Excluded Protocols">
          <WpTable
            headers={['Protocol', 'Reason']}
            rows={[
              ['Resupply reUSD', 'Hacked June 2025 — $9.5M. Debt repaid but excluded (niche CDP).'],
              ['USR / RLP (Resolv)', 'Hacked March 22, 2026 — $80M exploit, USR depeg -80%.'],
              ['Mountain Protocol USDM', 'Wind-down — primary market closed August 2025.'],
              ['Moonwell', 'Oracle misconfiguration Feb 2026 — $1.78M bad debt.'],
              ['Usual USD0++', 'January 2025 depeg, 4-year lock, inflationary tokenomics.'],
              ['HLP / JLP / Liminal', 'Non-EVM (Hyperliquid / Solana).'],
              ['PT-Pendle', 'Expiry management complexity → v2.'],
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
            Aave's yield allocation (15%) — it is a shared vault reserve dedicated to withdrawals,
            not drawn from any individual user's allocation.
          </p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Withdrawal priority queue:</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-4">
            <li><strong>Liquidity reserve</strong> (10% of TVL, deployed on Aave v3) — instant withdrawal, always served first</li>
            <li><strong>Morpho</strong> — near-instant if underlying market is liquid</li>
            <li><strong>Other no-cooldown protocols</strong> (sUSDS, scrvUSD…)</li>
            <li><strong>Queue</strong> (≤7 days) — amounts exceeding buffer trigger a <code className="bg-navy/10 px-1 rounded">WithdrawalQueued</code> event</li>
          </ol>
          <InfoBox>
            <strong>Why 10% and not 30%?</strong> A 30% buffer would keep a third of capital idle,
            mechanically reducing APY. At 10%, capital is better deployed while still covering routine
            withdrawals. The only critical scenario is a group exit {'>'}10% of TVL, which triggers
            the queue (≤7 days, matching the sUSDe cooldown).
          </InfoBox>
        </SubSection>

        <SubSection title="5.3 Proportional Withdrawal Mechanism">
          <p className="text-navy/70 leading-relaxed mb-3">
            Each glUSDC represents a <strong>proportional claim</strong> across all underlying protocols, in line with the current allocation weights.
          </p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Withdrawal flow:</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-4">
            <li>User calls <code className="bg-navy/10 px-1 rounded">redeem(shares)</code></li>
            <li>Vault burns glUSDC and computes the proportional amount owed</li>
            <li>Vault draws from the buffer first (Aave v3); if the withdrawal exceeds the buffer, the shortfall is drawn proportionally from all adapters</li>
            <li>USDC is sent to the user</li>
          </ol>
          <InfoBox>
            <strong>The buffer is a shared vault reserve, not drawn from individual allocations.</strong> When the buffer covers a withdrawal in full, no other user's position in any protocol is touched. If the withdrawal exceeds the buffer, the shortfall is drawn proportionally from all adapters — each user bears only their own share.
          </InfoBox>
        </SubSection>

        <SubSection title="5.4 Secondary Market Acquisition Policy — Permissioned Protocols">
          <p className="text-navy/70 text-sm mb-3">
            Several protocols in DeFi Lantern's selection operate a <strong>permissioned primary market</strong>: direct mint and redemption require KYC/AML whitelisting, which a smart contract cannot pass. Rather than excluding these protocols, DeFi Lantern accesses them through their <strong>secondary market</strong> (Uniswap V3 or equivalent DEX), where their tokens trade freely between on-chain participants.
          </p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Entry Rules (Buying):</strong></p>
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>Default maximum slippage: <strong>0.5%</strong> (hardcoded in adapter)</li>
            <li>Maximum single swap: <strong>5% of the adapter's target allocation</strong> per harvest cycle</li>
            <li>TWAP oracle: adapter reads the <strong>30-minute TWAP</strong> before any swap — aborted if deviation {'>'} 0.5% from NAV</li>
            <li>MEV protection: swaps routed through private mempool (Flashbots MEV Protect or equivalent)</li>
          </ul>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">No-Liquidity Scenario:</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>Adapter does not revert the full rebalance — failing allocation is isolated</li>
            <li>USDC earmarked for that protocol remains in Aave v3 (~3–5% baseline APY)</li>
            <li>Vault emits <code className="bg-navy/10 px-1 rounded">AdapterAllocationPending(address adapter, uint256 pendingAmount)</code></li>
            <li>Adapter retries automatically on next harvest cycle</li>
            <li>After 3 consecutive failed cycles: <code className="bg-navy/10 px-1 rounded">AdapterLiquidityAlert</code> emitted → governance review triggered</li>
            <li>Governance may vote to extend waiting period, reduce target allocation, or remove the adapter</li>
          </ol>
          <WpTable
            headers={['Risk', 'Mitigation']}
            rows={[
              ['Slippage on large entry/exit', '0.5% hard cap + partial fill + order splitting'],
              ['Price impact on thin pools', 'Liquidity depth check + 5% per-cycle order cap'],
              ['TWAP price manipulation', '30-min TWAP + ≥0.5% deviation abort threshold'],
              ['NAV premium or discount', 'Oracle comparison + redemption halt mechanism'],
              ['Pool illiquidity on entry', 'USDC held in Aave → retry logic → governance alert'],
              ['Pool illiquidity on exit', 'Aave buffer absorbs withdrawal + emergencyHold'],
              ['MEV / sandwich attacks', 'Private mempool routing via Flashbots'],
              ['Single-protocol concentration', 'Hard cap at 1% TVL for exception-tier protocols (e.g. thBill)'],
            ]}
          />
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
        <SubSection title="7.1 Smart Contract Security">
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1">
            <li>All core contracts will be audited by a minimum of two independent security firms before mainnet deployment</li>
            <li>A public bug bounty will be launched on Immunefi prior to launch</li>
            <li>Contracts will use OpenZeppelin v5 as the baseline library</li>
            <li>No external calls within the vault core — all protocol interactions are isolated to adapters</li>
          </ul>
        </SubSection>
        <SubSection title="7.2 Oracle Risk">
          <p className="text-navy/70 leading-relaxed">
            DeFi Lantern does not introduce its own price oracle — each underlying protocol manages its own oracle infrastructure (Chainlink, Pyth, RedStone). DeFi Lantern's <code className="bg-navy/10 px-1 rounded">totalAssets()</code> function aggregates on-chain values reported by adapters, which read balances directly from protocol contracts.
          </p>
        </SubSection>
        <SubSection title="7.3 Emergency Procedures">
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
        <SubSection title="9.1 v1 — Academic MVP (6 weeks)">
          <p className="text-navy/70 text-sm mb-3">
            All strategies on Ethereum mainnet. Manual rebalancing (governance vote). No keeper. Cross-chain token protocols accessed via Architecture 0 only (bridged OFT token bought on ETH — the vault itself never sends assets cross-chain).
          </p>
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
        </SubSection>

        <SubSection title="9.2 v2 — Production Protocol">
          <p className="text-navy/70 text-sm mb-3 font-semibold">9.2.1 Cross-Chain Strategy</p>
          <p className="text-navy/70 text-sm mb-3">
            DeFi Lantern vaults remain anchored on Ethereum mainnet. Cross-chain access is addressed progressively using four architectures, applied in strict order of increasing complexity:
          </p>
          <WpTable
            headers={['Architecture', 'Mechanism', 'Cost', 'When to use']}
            rows={[
              ['0 — Bridged token on ETH', 'Protocol deploys its token on ETH via LayerZero OFT or equivalent. Vault buys it on ETH like any ERC-20. No active bridging from the vault.', 'Gas only (~$5–15)', 'Default — always check first. Example: Sierra Money (lzSIERRA on ETH).'],
              ['1a — Keeper + CCTP', 'Off-chain keeper bridges USDC via Circle CCTP v2 (near-free, 2–10s) to Arbitrum / Base / Optimism and deposits into target protocol. Balance pushed back to ETH via oracle (~1h).', '~$10–30/rebalance', 'Major EVM L2s with native Circle USDC.'],
              ['1b — Keeper + Li.Fi', 'Keeper queries Li.Fi aggregator (10+ bridges compared in real time) for app-chains without CCTP: Avalanche, HyperEVM, Plasma, Mantle…', '~$15–40/rebalance', 'Non-CCTP EVM chains.'],
              ['2 — OVault (LayerZero)', 'Satellite contracts on each target chain, governed by the ETH vault via LayerZero messages. Fully decentralized — no keeper required.', 'Low on-chain', 'Target architecture for v3.'],
            ]}
          />
          <WpTable
            headers={['Profile', 'Architecture']}
            rows={[
              ['Prudent 🛡️', '100% ETH mainnet — no cross-chain'],
              ['Balanced ⚖️', '100% ETH mainnet — no cross-chain'],
              ['Dynamic ⚡', 'Architecture 0 first → Architecture 1a if protocol is on an EVM L2'],
              ['Airdrop Hunter 🪂', 'Architecture 0 (Sierra Money, already decided) → Architecture 1b for new protocols'],
            ]}
          />
          <InfoBox>
            <strong>Bridge failure behavior:</strong> if a bridge swap would exceed the 0.5% slippage limit, or if Li.Fi returns no viable route, the keeper does not execute the cross-chain allocation. USDC remains in Aave v3 (~3–5% baseline APY) and the allocation is retried at the next harvest cycle. After 3 consecutive failed cycles, an on-chain alert is emitted and governance review is triggered. The keeper only makes economic sense above ~$300K–500K TVL on the affected profiles.
          </InfoBox>
          <p className="text-navy/70 text-sm mb-3 font-semibold mt-4">9.2.2 Other v2 Milestones</p>
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1">
            <li>Automated rebalancing via Chainlink Automation or Gelato keeper network</li>
            <li>PT-Pendle integration with automated rollover at expiry</li>
            <li>Performance fee partial redirection to GLOW stakers (governance vote required)</li>
            <li>Public bug bounty on Immunefi</li>
            <li>Third-party audit coverage expansion (minimum two firms pre-mainnet)</li>
          </ul>
        </SubSection>

        <SubSection title="9.3 v3 — Long-Term Vision">
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1">
            <li><strong className="text-navy">Decentralized cross-chain (Architecture 2):</strong> LayerZero OVault standard — satellite contracts on Arbitrum, Base, Avalanche governed on-chain by the ETH vault. No keeper required. Users can deposit USDC from any supported chain and receive glUSDC shares on their chain via LayerZero OFT.</li>
            <li><strong className="text-navy">Multi-asset support:</strong> USDT and DAI vaults with independent adapter sets.</li>
            <li><strong className="text-navy">Expanded RWA coverage:</strong> tokenized credit, private credit, and commodity-backed instruments as on-chain liquidity matures.</li>
            <li><strong className="text-navy">Governance decentralization:</strong> progressive reduction of Guardian powers as protocol track record builds.</li>
          </ul>
        </SubSection>
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
