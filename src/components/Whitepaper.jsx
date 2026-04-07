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
    <pre className="bg-navy text-[#28B092] rounded-xl p-4 text-sm overflow-x-auto mb-4 font-mono leading-relaxed">
      <code>{children}</code>
    </pre>
  )
}

function InfoBox({ children }) {
  return (
    <div className="bg-teal-light border-l-4 border-[#28B092] rounded-r-xl p-4 mb-4 text-sm text-navy/80 leading-relaxed">
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
        <h1 className="text-4xl font-black text-navy mb-3">DeFi Lantern — Livre Blanc v0.3</h1>
        <p className="text-navy/50 text-sm">Statut : Brouillon — Avril 2026. Tous les paramètres sont susceptibles de modification.</p>
        <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#28B092]" />
      </div>

      {/* RÉSUMÉ */}
      <Section id="abstract" title="Résumé">
        <p className="text-navy/70 leading-relaxed">
          DeFi Lantern est un agrégateur de rendement pour stablecoins déployé sur Ethereum mainnet.
          Il est <strong>non-custodial</strong> : vos fonds ne transitent jamais par nos mains — ils restent
          dans les protocoles sous-jacents à tout moment.
          Les utilisateurs déposent des USDC et reçoivent en échange des parts —
          <strong>glUSD-P</strong>, <strong>glUSD-B</strong>, <strong>glUSD-D</strong> ou <strong>glUSD-RH</strong> selon le profil
          de risque choisi — dont la valeur augmente au fil du temps à mesure que le protocole
          collecte les rendements d'une sélection de protocoles DeFi éprouvés.
        </p>
        <p className="text-navy/70 leading-relaxed mt-3">
          DeFi Lantern cible les détenteurs de stablecoins cherchant un rendement passif,
          sans gestion active de portefeuille et sans exposition aux variations du marché.
          Le capital est réparti entre jusqu'à vingt protocoles sous-jacents couvrant les marchés de prêt,
          les produits adossés à des actifs réels (T-bills, obligations souveraines tokenisées),
          les stratégies delta-neutres, le crédit institutionnel,
          les pools de stabilité et d'autres stratégies de rendement diversifiées.
        </p>
        <p className="text-navy/70 leading-relaxed mt-3">
          Les décisions de gouvernance sont conduites via le token <strong>GLOW</strong> : les détenteurs
          votent on-chain, et toute décision adoptée entre en vigueur après un délai obligatoire de
          48 heures (Timelock).
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
            et reçoit des parts ERC-4626 (glUSD-P, glUSD-B, glUSD-D ou glUSD-RH) dont la valeur
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
              ['Tokens de part', 'glUSD-P / glUSD-B / glUSD-D / glUSD-RH — un vault ERC-4626 par profil (standard de vault Ethereum)'],
              ['Token de gouvernance', 'GLOW — permet de voter les décisions du protocole'],
              ['Frais', '5% de frais de performance sur les gains nets'],
              ['Garde', 'Non-custodial'],
              ['Retraits', 'Non-custodial, initiés par l\'utilisateur'],
              ['Rééquilibrage', 'Automatique lors du harvest (équipe) ; modification des poids par gouvernance'],
            ]}
          />
        </SubSection>

        <SubSection title="2.2 Caractéristiques clés">
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Rendement à entrée unique.</strong> Un seul dépôt USDC donne accès à de multiples stratégies de rendement simultanées.</p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Standard ERC-4626.</strong> glUSD-P, glUSD-B, glUSD-D et glUSD-RH suivent le standard de vault Ethereum ERC-4626 — compatibles avec tout protocole DeFi supportant ce format.</p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Non-custodial.</strong> Aucune clé admin ne peut déplacer les fonds des utilisateurs vers une adresse externe. En cas d'urgence, le Guardian peut retirer les fonds d'un protocole compromis pour les rapatrier dans le vault — seuls les utilisateurs peuvent ensuite les récupérer. Les retraits restent possibles en permanence.</p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Stratégie transparente.</strong> Les allocations par protocole sont inscrites sur la blockchain et vérifiables par tout détenteur de GLOW.</p>
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
            <strong>Code plutôt que confiance.</strong> Chez DeFi Lantern, la stratégie n'est pas une promesse — c'est du code. Aucun humain ne peut modifier unilatéralement les allocations, ajouter un protocole risqué ou abaisser les standards d'intégration sans un vote de la communauté suivi d'un délai obligatoire de 48 heures. Les détenteurs de glUSD sont structurellement protégés contre les décisions discrétionnaires.
          </InfoBox>
        </SubSection>
      </Section>

      {/* 3. ARCHITECTURE */}
      <Section id="architecture" title="3. Architecture">
        <SubSection title="3.1 Quatre vaults ERC-4626 — glUSD-P / glUSD-B / glUSD-D / glUSD-RH">
          <p className="text-navy/70 leading-relaxed mb-3">
            DeFi Lantern déploie <strong>quatre vaults distincts</strong>, un par profil de risque,
            chacun avec ses propres protocoles et poids d'allocation. Chaque vault émet un token distinct
            (glUSD-P, glUSD-B, glUSD-D, glUSD-RH) représentant une part du capital déposé.
            L'utilisateur choisit son profil, dépose ses USDC dans le vault correspondant
            et reçoit des parts dont la valeur augmente avec les rendements accumulés.
          </p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Flux de dépôt :</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>L'utilisateur choisit son profil (Prudent / Équilibré / Dynamique / Rewards Hunter) et sélectionne le vault correspondant</li>
            <li>Il appelle <code className="bg-navy/10 px-1 rounded">deposit(amount, receiver)</code> sur ce vault</li>
            <li>Le vault mint des parts (glUSD-P/B/D/RH) proportionnelles à <code className="bg-navy/10 px-1 rounded">amount / pricePerShare</code></li>
            <li>Les USDC sont alloués aux protocoles du profil selon les poids cibles</li>
          </ol>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Flux de retrait :</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>L'utilisateur appelle <code className="bg-navy/10 px-1 rounded">redeem(shares, receiver, owner)</code></li>
            <li>Le vault brûle les parts glUSD-P/B/D/RH</li>
            <li>Le vault récupère les USDC des protocoles sous-jacents (en respectant les contraintes de cooldown)</li>
            <li>Les USDC sont envoyés à l'utilisateur</li>
          </ol>
          <InfoBox>
            <strong>Prix du share (pricePerShare)</strong> augmente de façon monotone au fil des collectes de rendement.
            Un utilisateur qui dépose 1 000 USDC dans le vault Prudent et reçoit 1 000 glUSD-P à t=0
            pourra racheter ces 1 000 glUSD-P contre ~1 035 USDC à t=1 an (APY net ~3,5% après frais).
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
            (Fonctionnalité prévue en V2.)
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
              ['DeFiLanternVaultPrudent/Balanced/Dynamic/RH', 'Vault ERC-4626 — reçoit les dépôts, émet les parts, orchestre les adapters'],
              ['IAdapter + 15 adapters', 'Un adapter par protocole sous-jacent — isole la logique propre à chaque intégration'],
              ['GlowToken.sol', 'Token de gouvernance GLOW (ERC-20Votes, 100M supply fixe)'],
              ['DeFiLanternGovernor.sol', 'Contrat de vote on-chain (OZ Governor)'],
              ['TimelockController.sol', 'Délai obligatoire de 48h avant exécution de toute décision'],
              ['FeeManager.sol', 'Calcul et application des frais de performance (5%)'],
            ]}
          />
        </SubSection>

        <div id="risk-profiles">
        <SubSection title="3.4 Profils de risque">
          <p className="text-navy/70 leading-relaxed mb-3">
            DeFi Lantern propose <strong>4 vaults ERC-4626 indépendants</strong>, chacun avec son propre token de part,
            son ensemble de protocoles cibles et sa philosophie de risque. Les utilisateurs peuvent détenir
            plusieurs profils simultanément — ils sont entièrement isolés les uns des autres. Chaque vault
            stocke ses poids d'allocation on-chain en points de base (somme = 10 000) ; la fonction{' '}
            <code className="bg-navy/10 px-1 rounded">rebalance()</code> les ajuste via vote de gouvernance.
          </p>
          <WpTable
            headers={['', '🛡️ Prudent', '⚖️ Balanced', '⚡ Dynamic', '🪂 Rewards Hunter']}
            rows={[
              ['Token', 'glUSD-P', 'glUSD-B', 'glUSD-D', 'glUSD-RH'],
              ['APY cible', '3–7%', '5–10%', '8–15%', 'Variable'],
              ['Nb protocoles', '10', '20', '10', '4'],
              ['Composition', 'Lending conservateur + RWA', 'Mix égal Prudent & Dynamic', 'Haut rendement, risque élevé', 'Early-stage, upside tokenomics'],
              ['Utilisateur idéal', 'Préservation du capital, faible volatilité', 'Diversification, exposition équilibrée', 'Maximisation du rendement', 'Early adopter avec tolérance au risque'],
            ]}
          />

          <hr className="my-4 border-lgrey" />

          <InfoBox>
            <strong>Buffer de liquidité (commun à tous les vaults) :</strong> Chaque vault conserve <strong>10% du TVL</strong> en USDC inactif dans le vault — distinct des allocations de rendement, jamais déployé sur un protocole. Sur un dépôt de 100 USDC : 10 USDC vont au buffer, 90 USDC aux stratégies. Ce coussin couvre la quasi-totalité des retraits individuels sans délai et sans toucher aux positions des autres utilisateurs.
          </InfoBox>

          <h4 className="font-semibold text-navy mb-2 mt-4">🛡️ glUSD-P — Prudent</h4>
          <p className="text-navy/70 text-sm mb-4">
            Préservation du capital en priorité. Le vault sélectionne des protocoles avec des audits Tier-1,
            des timelocks on-chain et du code immuable. Aucun protocole de rendement ne peut dépasser 15% du TVL.
          </p>

          <h4 className="font-semibold text-navy mb-2">⚡ glUSD-D — Dynamic</h4>
          <p className="text-navy/70 text-sm mb-4">
            Maximisation du rendement pour les utilisateurs acceptant un risque sous-jacent plus élevé.
            Les stratégies incluent le crédit institutionnel, le levier delta-neutre,
            des tranches junior et le collatéral AI/RWA. Aucun protocole ne dépasse 15% du TVL.
            La sélection est discrétionnaire et révisée trimestriellement.
          </p>

          <h4 className="font-semibold text-navy mb-2">⚖️ glUSD-B — Balanced</h4>
          <p className="text-navy/70 text-sm mb-4">
            Un mix mécanique pur : chaque USDC déposé est divisé à 50/50 entre les allocations Prudent
            et Dynamic, donnant une exposition simultanée aux 20 protocoles. Il n'y a aucun protocole
            exclusif au Balanced.
          </p>

          <h4 className="font-semibold text-navy mb-2">🪂 glUSD-RH — Rewards Hunter</h4>
          <p className="text-navy/70 text-sm">
            Se positionner sur des protocoles early-stage qui combinent un rendement compétitif avec
            un événement tokenomics crédible (airdrop, programme de points, TGE imminent). Le rendement
            est réel et primaire — le potentiel d'airdrop est un bonus documenté, jamais un rendement
            promis. Les positions sont révisées trimestriellement ; tout protocole dont l'événement
            tokenomics est passé et dont le rationale a expiré est remplacé.
          </p>
        </SubSection>
        </div>
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
          <WpTable
            headers={['Protocole', 'Stratégie']}
            rows={[
              ['Aave v3 USDC', 'Lending'],
              ['Morpho — Gauntlet USDC Prime', 'Lending'],
              ['Morpho — Steakhouse USDC', 'Lending'],
              ['sUSDS (Sky)', 'Savings Rate'],
              ['sUSDe (Ethena)', 'Delta-Neutral'],
              ['cUSDO (OpenEden)', 'RWA T-bills'],
              ['sBOLD (Liquity v2)', 'Stability Pool'],
              ['scrvUSD (Curve)', 'Savings Rate'],
              ['fxSAVE (f(x) Protocol)', 'Stability Pool'],
              ['thBill (Theo Network)', 'RWA T-bills'],
            ]}
          />
          <p className="text-navy/70 text-sm mb-3 font-semibold">⚡ Dynamic — 10 protocoles</p>
          <WpTable
            headers={['Protocole', 'Stratégie']}
            rows={[
              ['sNUSD (Neutrl)', 'Delta-Neutral'],
              ['syrupUSDC (Maple)', 'Institutional Credit'],
              ['jrUSDe (Strata)', 'Market Neutral'],
              ['sUSD3 (3Jane)', 'Institutional Credit'],
              ['imUSD (mStable)', 'Fixed Rate'],
              ['reUSDe (Re Protocol)', 'Reinsurance'],
              ['stkUSDC (Aave Umbrella)', 'Safety Module'],
              ['sUSDai (USD.AI)', 'RWA / AI Credit'],
              ['InfiniFI (siUSD)', 'Fractional Reserve'],
              ['Reservoir (srUSD)', 'CDP Stablecoin'],
            ]}
          />
          <p className="text-navy/70 text-sm mb-3 font-semibold">⚖️ Balanced — 20 protocoles (50% Prudent + 50% Dynamic)</p>
          <p className="text-navy/70 text-sm mb-6">
            Le profil Balanced est un mix pur : 50% des allocations Prudent + 50% des allocations Dynamic.
            Il ne contient aucun protocole exclusif — tous les protocoles sont partagés avec Prudent ou Dynamic.
          </p>
          <p className="text-navy/70 text-sm mb-3 font-semibold">🪂 Rewards Hunter — 4 protocoles</p>
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
          <InfoBox>
            <strong>v1 — Exécution manuelle :</strong> En v1, <code className="bg-navy/10 px-1 rounded">harvest()</code> est appelé manuellement par le Guardian multisig. Aucun keeper automatique. La fréquence est dictée par l'économie des frais de gas : à faible TVL, harvester trop souvent détruit le rendement. Un harvest est déclenché lors d'un dépôt ou retrait significatif, ou quand les gains accumulés justifient le coût.<br /><br />
            <strong>Pas de claim() nécessaire :</strong> Tous les protocoles Prudent sont ERC-4626 ou auto-compoundants natifs. Leur valeur augmente automatiquement — aucun appel <code className="bg-navy/10 px-1 rounded">claim()</code> requis. Cela simplifie le harvest et réduit significativement le gas.
          </InfoBox>
        </SubSection>

        <SubSection title="5.2 Frais de performance">
          <p className="text-navy/70 leading-relaxed mb-3">
            DeFi Lantern prélève des <strong>frais de performance de 5%</strong> sur les gains nets,
            appliqués au moment du harvest.
          </p>
          <InfoBox>
            <strong>Comment c'est implémenté :</strong> les frais ne sont jamais prélevés en USDC.
            À chaque collecte, le protocole crée de nouvelles parts glUSD au bénéfice du treasury
            (le multisig de l'équipe), proportionnellement aux gains générés.
            Ce mécanisme aligne les intérêts de l'équipe avec ceux des déposants :
            le protocole ne perçoit un revenu que quand les utilisateurs en perçoivent un.
          </InfoBox>
          <p className="text-navy/70 text-sm">Le treasury est l'adresse du TimelockController (DAO). Toute utilisation des fonds nécessite un vote de gouvernance GLOW suivi d'un délai obligatoire de 48 heures.</p>
          <InfoBox>
            <strong>Fee Accrual — séparation continue (sans dépeg au harvest) :</strong><br /><br />
            Sans mécanisme dédié, le mint de shares à la trésorerie au harvest augmente <code className="bg-navy/10 px-1 rounded">totalSupply</code> instantanément sans changer <code className="bg-navy/10 px-1 rounded">totalAssets</code>, provoquant une micro-chute du <code className="bg-navy/10 px-1 rounded">pricePerShare</code>.<br /><br />
            DeFi Lantern maintient une variable <code className="bg-navy/10 px-1 rounded">accruedFees</code> qui comptabilise la part des gains appartenant à la trésorerie <strong>en continu</strong> entre deux harvests. Le <code className="bg-navy/10 px-1 rounded">totalAssets()</code> est défini comme net des fees : <code className="bg-navy/10 px-1 rounded">totalAssets_net = totalAssets_brut − accruedFees</code>.<br /><br />
            Au harvest, le mint converti les <code className="bg-navy/10 px-1 rounded">accruedFees</code> en shares puis les remet à zéro — sans aucun impact sur le <code className="bg-navy/10 px-1 rounded">pricePerShare</code>, puisque ces fees en étaient déjà exclues. Le <code className="bg-navy/10 px-1 rounded">pricePerShare</code> est ainsi strictement non-décroissant en conditions normales.
          </InfoBox>
        </SubSection>

        <SubSection title="5.3 Buffer de liquidité et mécanisme de retrait">
          <p className="text-navy/70 leading-relaxed mb-3">
            DeFi Lantern maintient une <strong>réserve de liquidité de 10% du TVL</strong> conservée en USDC inactif
            dans le vault, disponible pour les retraits immédiats.
            Cette réserve est distincte et séparée de l'allocation rendement — c'est un coussin collectif dédié aux retraits.
            Elle couvre la très grande majorité des demandes de retrait individuelles sans délai.
          </p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Flux de retrait :</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-4">
            <li>L'utilisateur appelle <code className="bg-navy/10 px-1 rounded">redeem(shares)</code></li>
            <li>Le vault brûle les parts glUSD et calcule le montant dû</li>
            <li>Le vault utilise le buffer en premier (USDC idle dans le vault) ; si le retrait dépasse le buffer, le solde est retiré proportionnellement de tous les adapters</li>
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
            headers={['Paramètre', 'Valeur', 'Ce que ça signifie']}
            rows={[
              ['Délai de vote', '1 jour', 'Après la création d\'une proposition, 24h s\'écoulent avant l\'ouverture du vote — temps pour les détenteurs de GLOW de lire la proposition et déléguer leurs tokens si nécessaire'],
              ['Période de vote', '3 jours', 'Fenêtre pendant laquelle les détenteurs de GLOW peuvent voter (Pour / Contre / Abstention)'],
              ['Type de majorité', 'Majorité simple', 'La proposition passe si Pour > Contre parmi les votes exprimés — les abstentions ne comptent ni pour ni contre'],
              ['Quorum', '10% de l\'offre totale (10 000 000 GLOW)', 'Seuil minimum de participation : au moins 10M GLOW doivent avoir voté (Pour ou Contre) pour que le vote soit valide — évite qu\'une décision importante passe avec une poignée de votes'],
              ['Seuil de proposition', '1% de l\'offre totale (1 000 000 GLOW)', 'Minimum requis pour soumettre une proposition — évite le spam de propositions'],
              ['Délai Timelock', '48 heures', 'Après un vote accepté, 48h s\'écoulent avant l\'exécution — fenêtre pour que tout utilisateur désapprouvant la décision puisse retirer ses fonds'],
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
            Un comité d'urgence (multisig 3-sur-5 : 5 membres de l'équipe, 3 signatures requises) détient des pouvoirs limités. Il peut uniquement :
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

        <SubSection title="7.3 Politique d'acquisition sur marché secondaire">
          <p className="text-navy/70 text-sm mb-3 leading-relaxed font-semibold text-navy/50">
            Cette fonctionnalité est prévue pour la V2 du protocole et n'est pas implémentée dans le MVP.
          </p>
          <p className="text-navy/70 text-sm mb-3 leading-relaxed">
            La politique marché secondaire couvre deux situations distinctes où DeFi Lantern ne peut pas utiliser le marché primaire (émission/remboursement officiel) d'un protocole.
          </p>
          <p className="text-navy/70 text-sm mb-1"><strong className="text-navy">Cas 1 — Entrée : protocoles à KYC primaire (thBILL, stcUSD)</strong></p>
          <p className="text-navy/70 text-sm mb-3 leading-relaxed">
            Ces protocoles opèrent un <strong>marché primaire permissionné</strong> : le mint direct auprès de l'émetteur requiert un KYC/AML qu'un smart contract ne peut pas passer. DeFi Lantern achète ces tokens sur leur <strong>marché secondaire</strong> (Uniswap V3), où ils s'échangent librement entre adresses on-chain.
          </p>
          <p className="text-navy/70 text-sm mb-1"><strong className="text-navy">Cas 2 — Sortie urgente : sUSDe (Ethena) et le cooldown 7 jours</strong></p>
          <p className="text-navy/70 text-sm mb-3 leading-relaxed">
            sUSDe impose un <strong>cooldown de 7 jours</strong> pour le remboursement officiel. Si un utilisateur souhaite retirer ses fonds immédiatement et que le buffer est insuffisant, l'adapter vend sUSDe directement sur Curve (pool sUSDe/USDC) pour obtenir des USDC sans délai. Les mêmes règles de slippage (0,5%) et de validation TWAP s'appliquent. Si la décote dépasse <strong>1%</strong> sous la NAV officielle, la vente est suspendue et une alerte gouvernance est émise.
          </p>
          <InfoBox>
            <strong>Exemple — retrait urgent avec sUSDe :</strong><br />
            Un utilisateur demande un retrait de 80 000 USDC. Le buffer (USDC idle dans le vault) ne contient que 50 000 USDC (retrait partiel possible). Il manque 30 000 USDC.<br /><br />
            Le vault détient 200 000 sUSDe. Plutôt que de déclencher le cooldown Ethena (7 jours d'attente), l'adapter vend 30 150 sUSDe sur Curve (légère marge de sécurité). TWAP 30 min : 1 sUSDe = 0,9985 USDC. NAV officielle Ethena : 1,0000 USDC. Décote = 0,15% &lt; 1% → vente autorisée. L'utilisateur reçoit ses 80 000 USDC en une seule transaction.
          </InfoBox>
          <h4 className="font-semibold text-navy mb-2">Règles d'entrée (achat)</h4>
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li><strong>Slippage max : 0,5%</strong> (codé en dur dans l'adapter) — configurable par gouvernance jusqu'à 1% maximum</li>
            <li><strong>Validation TWAP 30 min :</strong> avant tout swap, l'adapter lit le TWAP Uniswap V3. Si l'écart avec la NAV du protocole dépasse 0,5%, le swap est annulé (protection anti-manipulation, sandwich attacks)</li>
            <li><strong>Taille des ordres :</strong> max 5% de l'allocation cible de l'adapter par cycle de harvest — si l'impact de prix dépasse 0,3%, l'ordre est réduit automatiquement et le reste reporté au cycle suivant</li>
            <li><strong>Protection MEV :</strong> swaps routés via Flashbots MEV Protect (ou mempool privé équivalent)</li>
          </ul>
          <InfoBox>
            <strong>Exemple concret — cycle de harvest thBILL :</strong><br />
            Le vault Prudent a un TVL de 10 000 000 USDC. Allocation cible thBILL : 5 % = 500 000 USDC.<br /><br />
            <strong>① Vérification TWAP :</strong> l'adapter lit le pool Uniswap V3 USDC/thBILL sur 30 minutes.
            TWAP : 1 thBILL = 1,0012 USDC. NAV déclarée par Theo Network : 1,0015 USDC.
            Écart = 0,03 % &lt; 0,5 % → swap autorisé.<br /><br />
            <strong>② Cap de l'ordre :</strong> 5 % × 500 000 = <strong>25 000 USDC max</strong> par cycle.<br /><br />
            <strong>③ Impact de prix :</strong> le pool contient 2 000 000 $ de liquidité. Acheter 25 000 USDC de thBILL
            déplacerait le prix de ~1,25 % &gt; 0,3 % → l'ordre est automatiquement réduit à <strong>~8 000 USDC</strong>
            (seuil d'impact 0,3 %).<br /><br />
            <strong>④ Résultat :</strong> 8 000 USDC de thBILL acquis sans perturbation du marché.
            Il faudra ~62 cycles de harvest pour constituer la position complète de 500 000 USDC,
            avec un impact de prix &lt; 0,3 % par cycle.
          </InfoBox>
          <h4 className="font-semibold text-navy mb-2">Scénario sans liquidité</h4>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>L'adapter n'annule pas le rééquilibrage global — l'allocation défaillante est isolée</li>
            <li>L'USDC prévu pour ce protocole reste sur Aave v3 (~3–5% APY de base)</li>
            <li>Le vault émet <code className="bg-navy/10 px-1 rounded">AdapterAllocationPending</code></li>
            <li>Au harvest suivant, si les conditions sont réunies (TWAP, slippage, impact de prix dans les limites), le swap est exécuté. Sinon, les USDC restent sur Aave v3 un cycle de plus.</li>
            <li>Après 3 harvests consécutifs sans conditions satisfaites : <code className="bg-navy/10 px-1 rounded">AdapterLiquidityAlert</code> est émis et la gouvernance est notifiée pour revue manuelle</li>
          </ol>
          <h4 className="font-semibold text-navy mb-2">Règles de sortie (vente)</h4>
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>Mêmes règles de slippage et validation TWAP qu'à l'entrée</li>
            <li>Si le prix du marché secondaire tombe sous la NAV de plus de <strong>1%</strong> : le remboursement est suspendu et un événement on-chain est émis pour revue de gouvernance</li>
            <li>En cas de retrait utilisateur : le vault utilise d'abord le buffer (USDC idle) — l'adapter illiquide est marqué en attente de sortie</li>
          </ul>
          <WpTable
            headers={['Risque', 'Dispositif de protection']}
            rows={[
              ['Slippage entrée/sortie', '0,5% cap + fill partiel + fractionnement d\'ordres'],
              ['Impact de prix sur pools peu liquides', 'Vérif. profondeur + cap 5% par cycle'],
              ['Manipulation TWAP', 'TWAP 30 min + seuil d\'abandon 0,5%'],
              ['Premium/discount NAV', 'Comparaison oracle + suspension de remboursement'],
              ['Illiquidité sur entrée', 'USDC conservé sur Aave → retry → alerte gouvernance'],
              ['Illiquidité sur sortie', 'Buffer (USDC idle) absorbe le retrait + emergencyHold'],
              ['MEV / sandwich attacks', 'Routage mempool privé via Flashbots'],
              ['Concentration sur un protocole', 'Cap 5% du TVL Prudent pour protocoles en exception (thBill)'],
            ]}
          />
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
              ['Équipe — Genesis Gouvernance (5 fondateurs)', '10%', '2 000 000 chacun', 'Attribués immédiatement — non cessibles pendant 24 mois', 'Permet le vote dès le premier jour pour assurer le fonctionnement de la gouvernance'],
              ['Équipe — Vesting long terme (5 fondateurs)', '10%', '2 000 000 chacun', 'Cliff 12 mois puis libération linéaire sur 24 mois', 'Alignement long terme — les fondateurs ne peuvent pas vendre au lancement'],
              ['Treasury / DAO', '40%', '40 000 000', 'Gouverné par la DAO', 'Finance les audits, l\'infrastructure, le développement'],
              ['Communauté / Liquidity Mining', '30%', '30 000 000', 'Émission sur 48 mois aux déposants des 4 vaults (glUSD-P/B/D/RH)', 'Bootstrap de l\'adoption par récompense des premiers utilisateurs'],
              ['Écosystème / Grants', '10%', '10 000 000', 'Discrétionnaire, gouverné par la DAO', 'Intégrations, hackathons, partenariats tiers'],
            ]}
          />
        </SubSection>

        <SubSection title="8.3 Utilité du GLOW">
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1">
            <li><strong className="text-navy">Gouvernance :</strong> voter sur tous les paramètres du protocole (poids, frais, adapters)</li>
            <li><strong className="text-navy">Droits de proposition :</strong> détenir ≥ 1% de l'offre (1 000 000 GLOW) permet de proposer des changements</li>
            <li><strong className="text-navy">Partage des frais (perspective long terme) :</strong> à très long terme, une part des frais de performance pourrait être redirigée vers les stakers GLOW par vote de gouvernance — cette évolution n'est pas prévue dans les versions immédiates du protocole.</li>
          </ul>
        </SubSection>
      </Section>

      {/* 9. ROADMAP */}
      <Section id="roadmap" title="9. Feuille de route">
        <SubSection title="9.1 Vision Long Terme">
          <p className="text-navy/70 text-sm mb-3">
            DeFi Lantern a vocation à devenir la couche de rendement de référence pour les stablecoins sur Ethereum mainnet — composable avec tout protocole ERC-4626, extensible à d'autres actifs et à d'autres chaînes.
          </p>
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1 mb-4">
            <li><strong className="text-navy">Cross-chain décentralisé :</strong> contrats satellites sur Arbitrum, Base, Avalanche gouvernés on-chain par le vault ETH. Les utilisateurs pourront déposer depuis n'importe quelle chain supportée.</li>
            <li><strong className="text-navy">Support multi-actifs :</strong> vaults USDT et DAI avec ensembles d'adapters indépendants.</li>
            <li><strong className="text-navy">Couverture RWA élargie :</strong> crédit tokenisé, crédit privé et instruments adossés à des matières premières au fur et à mesure que la liquidité on-chain mature.</li>
            <li><strong className="text-navy">Décentralisation de la gouvernance :</strong> réduction progressive des pouvoirs du Guardian à mesure que le track record du protocole s'établit.</li>
          </ul>
          <p className="text-navy/70 text-sm mb-2 font-semibold">Fonctionnalités non incluses en V1 (prévues V2+) :</p>
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1">
            <li>Marché secondaire pour les actifs illiquides (TWAP, slippage protégé)</li>
            <li>Architecture cross-chain (dépôts depuis d'autres blockchains)</li>
            <li>Harvest automatique via keeper (Chainlink Automation ou équivalent)</li>
            <li>Adapters supplémentaires (PT Pendle, GMX sur Arbitrum, etc.)</li>
            <li>Partage des frais avec les stakers GLOW</li>
            <li>Gouvernance déléguée et vote par signature (EIP-712)</li>
            <li>Dashboard analytics avancé (historique APY par stratégie)</li>
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
          Notre réponse est un vault ERC-4626 non-custodial qui agrège de multiples sources de rendement
          complémentaires en un seul point d'entrée. L'utilisateur dépose une fois et reçoit des
          glUSD-P, glUSD-B, glUSD-D ou glUSD-RH dont la valeur s'apprécie automatiquement. DeFi Lantern gère l'allocation,
          le harvest et le rééquilibrage — sans jamais prendre la garde des fonds.
        </p>
        <p className="text-navy/70 leading-relaxed mb-4">
          La proposition de valeur repose sur trois piliers distinctifs :
        </p>
        <ul className="list-disc list-inside text-navy/70 text-sm space-y-2 mb-4">
          <li><strong className="text-navy">Diversification structurelle :</strong> aucun protocole ne dépasse 15% du TVL. Une défaillance isolée ne compromet pas l'ensemble du vault — contrairement à une position unique sur Morpho ou Aave.</li>
          <li><strong className="text-navy">Liquidité gérée :</strong> une réserve de 10% du TVL conservée en USDC inactif dans le vault couvre la majorité des retraits sans délai. La file de priorité et l'option de retrait en tokens natifs gèrent les cas extrêmes sans friction.</li>
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

      {/* 11. REWARDS HUNTER */}
      <Section id="rewards-hunter" title="11. Détail du fonctionnement Rewards Hunter (glUSD-RH)">
        <p className="text-navy/70 text-sm leading-relaxed mb-4">
          Le vault Rewards Hunter est un agrégateur de positions de rendement ciblant spécifiquement les protocoles qui
          proposent des campagnes d'incentives — émissions de tokens en temps réel ou systèmes de points à long terme
          récompensés par un futur airdrop. Il constitue un <strong className="text-navy">point d'entrée unique</strong> vers
          plusieurs campagnes, sans que l'utilisateur ait à interagir avec chaque protocole individuellement.
        </p>

        <SubSection title="Deux scénarios de récompenses">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mb-4">
              <thead>
                <tr className="bg-navy/5">
                  <th className="text-left p-2 text-navy font-semibold border border-navy/10">Scénario</th>
                  <th className="text-left p-2 text-navy font-semibold border border-navy/10">Mécanisme</th>
                  <th className="text-left p-2 text-navy font-semibold border border-navy/10">Expérience utilisateur</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-navy/10 text-navy font-medium">Campagnes d'incentives live</td>
                  <td className="p-2 border border-navy/10 text-navy/70">Les tokens sont émis en temps réel par les protocoles partenaires et routés directement vers Merkl — ils ne transitent jamais par le vault.</td>
                  <td className="p-2 border border-navy/10 text-navy/70">Le solde augmente en temps réel sur le portail Merkl. Le claim est disponible immédiatement.</td>
                </tr>
                <tr className="bg-navy/5">
                  <td className="p-2 border border-navy/10 text-navy font-medium">Campagnes de points à long terme</td>
                  <td className="p-2 border border-navy/10 text-navy/70">Quand un protocole convertit des points en tokens (événement airdrop), le vault reçoit les tokens et les redistribue via un Gnosis Safe (multisig) vers Merkl, proportionnellement au poids de chaque déposant.</td>
                  <td className="p-2 border border-navy/10 text-navy/70">L'utilisateur surveille le portail Merkl et effectue le claim après la clôture de la campagne.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="Partenariat Merkl — Distribution des récompenses">
          <p className="text-navy/70 text-sm leading-relaxed mb-3">
            La redistribution des récompenses est gérée en partenariat avec <strong className="text-navy">Merkl</strong> (by Angle Labs),
            choisi pour sa fiabilité, sa réputation institutionnelle et son interface de réclamation unifiée.
            Merkl indexe en continu les balances des déposants pour permettre un claim précis, proportionnel à l'allocation de chacun.
          </p>
        </SubSection>

        <SubSection title="Modèle de sécurité">
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-2 mb-3">
            <li><strong className="text-navy">Fonction <code>sweep()</code> :</strong> seuls les tokens qui ne sont pas l'actif de réserve (USDC) peuvent être transférés du vault vers le Gnosis Safe — les dépôts utilisateurs ne peuvent jamais transiter par ce chemin.</li>
            <li><strong className="text-navy">Whitelist du Safe :</strong> depuis le Safe, seule l'adresse du contrat Merkl est autorisée à recevoir des tokens. Aucun membre de l'équipe ne peut rediriger les flux de récompenses vers une autre destination.</li>
            <li><strong className="text-navy">Aucun partenariat commercial :</strong> DeFi Lantern n'a aucun accord commercial avec les protocoles du vault. Les critères et la finalité des airdrops sont déterminés uniquement par chaque protocole tiers.</li>
          </ul>
          <WarningBox>
            DeFi Lantern ne décide pas des critères, du calendrier ni du montant final des airdrops tiers.
            Le protocole contrôle uniquement la façon dont les tokens reçus au niveau du vault sont routés vers les déposants.
            Les airdrops sont des décisions discrétionnaires des protocoles externes et ne constituent en aucun cas un rendement garanti.
          </WarningBox>
        </SubSection>
      </Section>

      {/* 12. LIQUIDITÉ MARCHÉS SECONDAIRES */}
      <Section id="liquidity" title="12. Liquidité de nos jetons sur le marché secondaire">
        <p className="text-navy/70 text-sm leading-relaxed mb-4">
          En tant que yield-bearing tokens (YBT) ERC-4626, les parts glUSD sont normalement mintées au dépôt et brûlées au retrait.
          Cela crée deux limitations : chaque remboursement draine le buffer USDC du vault, et en cas de crise de liquidité
          ou d'incident, les retraits peuvent être retardés.
        </p>

        <SubSection title="Solution — Pools de liquidité sur Curve Finance">
          <p className="text-navy/70 text-sm leading-relaxed mb-3">
            DeFi Lantern déploiera des <strong className="text-navy">pools glUSD/USDC sur Curve Finance</strong> (standard Stableswap NG),
            créant un marché secondaire où les utilisateurs peuvent céder leurs glUSD directement à d'autres participants
            sans déclencher un retrait du vault. La pool constitue une <strong className="text-navy">couche de sortie complémentaire</strong>.
          </p>
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li><strong className="text-navy">Pourquoi Curve :</strong> Curve est spécialement optimisé pour les pools d'actifs stables et de yield-bearing tokens — idéal pour nos glUSD.</li>
            <li><strong className="text-navy">VoteMarket :</strong> l'écosystème Curve/VoteMarket permet d'incentiver la pool via des <em>bribes</em>, attirant des apporteurs de liquidité tiers à faible coût direct.</li>
            <li><strong className="text-navy">Sortie d'urgence :</strong> en cas de pause du vault ou d'incident, le marché secondaire reste opérationnel et constitue une sortie alternative pour les utilisateurs.</li>
          </ul>
        </SubSection>

        <SubSection title="La boucle vertueuse (Liquidity Providing Flywheel)">
          <p className="text-navy/70 text-sm leading-relaxed mb-3">
            Une partie des performance fees collectés par DeFi Lantern finance des bribes sur VoteMarket, créant un cycle auto-entretenu :
          </p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>Création d'une pool glUSD-P/USDC sur Curve, alimentée par la trésorerie</li>
            <li>Demande de création d'une gauge Curve pour permettre les votes CRV</li>
            <li>Financement de bribes sur VoteMarket (trésorerie + performance fees) → direction des émissions CRV vers la pool</li>
            <li>L'APY de la pool augmente → attire des apporteurs de liquidité tiers</li>
            <li>Plus de liquidité → plus de frais de swap perçus</li>
            <li>Une partie des CRV reçus est swappée en USDC pour alimenter de nouvelles bribes</li>
            <li>Selon l'état de la pool, les fees sont soit réinvestis dans la pool, soit dirigés vers des bribes, soit retournés à la trésorerie</li>
            <li>À terme : si suffisamment de CRV accumulés, arbitrage entre locker en veCRV (voter directement pour la gauge) ou vendre pour financer de nouvelles bribes</li>
          </ol>
          <InfoBox>
            <strong>Aucune contamination des rendements déposants :</strong> les performance fees utilisés pour financer les bribes sont des revenus de la trésorerie — ils ne sont jamais prélevés sur le principal ni sur les rendements alloués aux déposants. La pool est opérée séparément des stratégies de rendement du vault.
          </InfoBox>
        </SubSection>

        <SubSection title="Bénéfices">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-navy/5">
                  <th className="text-left p-2 text-navy font-semibold border border-navy/10">Bénéfice</th>
                  <th className="text-left p-2 text-navy font-semibold border border-navy/10">Mécanisme</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border border-navy/10 text-navy/70">Sortie secondaire pour les déposants</td><td className="p-2 border border-navy/10 text-navy/70">glUSD échangeable contre USDC sur Curve sans passer par le vault</td></tr>
                <tr className="bg-navy/5"><td className="p-2 border border-navy/10 text-navy/70">Sortie d'urgence en cas de crise</td><td className="p-2 border border-navy/10 text-navy/70">La pool reste opérationnelle même si les retraits du vault sont en pause</td></tr>
                <tr><td className="p-2 border border-navy/10 text-navy/70">Bootstrapping de liquidité efficient</td><td className="p-2 border border-navy/10 text-navy/70">Les bribes levent la liquidité tierce sans immobiliser de capital propre excessif</td></tr>
                <tr className="bg-navy/5"><td className="p-2 border border-navy/10 text-navy/70">Réduction de la pression vendeuse</td><td className="p-2 border border-navy/10 text-navy/70">Les glUSD changent de main plutôt que d'être brûlés, préservant la profondeur de la pool</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>
      </Section>

      {/* 13. DISCLAIMER */}
      <Section id="legal" title="13. Avertissement légal">
        <WarningBox>
          DeFi Lantern est un projet logiciel expérimental et open-source développé à des fins académiques.
          Ce n'est pas un produit financier enregistré ni un véhicule d'investissement. Les parts glUSD-P,
          glUSD-B, glUSD-D et glUSD-RH ne sont pas des titres financiers. Déposer des actifs dans DeFi Lantern implique des risques
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
          DeFi Lantern — Livre Blanc v0.3 — Avril 2026<br />
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
        <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-[#28B092]" />
      </div>

      {/* ABSTRACT */}
      <Section id="abstract-en" title="Abstract">
        <p className="text-navy/70 leading-relaxed">
          DeFi Lantern is a non-custodial, multi-protocol yield aggregator for stablecoins deployed on
          Ethereum mainnet. Users deposit USDC and receive ERC-4626 share tokens —
          <strong>glUSD-P</strong>, <strong>glUSD-B</strong>, <strong>glUSD-D</strong>, or <strong>glUSD-RH</strong> depending
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
            once into their chosen vault and receives glUSD-P/B/D/RH shares that appreciate passively. DeFi Lantern handles allocation,
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
              ['Share tokens', 'glUSD-P / glUSD-B / glUSD-D (ERC-4626, one vault per profile)'],
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
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">ERC-4626 compliant.</strong> glUSD-P, glUSD-B, glUSD-D, and glUSD-RH are fully standard ERC-4626 vault tokens, composable with any protocol supporting the standard. Each token is fully fungible within its vault — a secondary market buyer immediately knows their exact risk exposure.</p>
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
            <strong>Code over trust.</strong> At DeFi Lantern, strategy is not a promise — it is code. No individual can unilaterally modify allocations, add a risky protocol, or lower integration standards without a community vote followed by a mandatory 48-hour delay. glUSD holders are structurally protected against discretionary decisions.
          </InfoBox>
        </SubSection>
      </Section>

      {/* 3. ARCHITECTURE */}
      <Section id="architecture-en" title="3. Architecture">
        <SubSection title="3.1 Four ERC-4626 Vaults — glUSD-P / glUSD-B / glUSD-D / glUSD-RH">
          <p className="text-navy/70 leading-relaxed mb-3">
            The central contract <code className="bg-navy/10 px-1 rounded">DeFiLanternVault.sol</code> implements
            the ERC-4626 tokenized vault standard. Users interact exclusively with this contract.
          </p>
          <InfoBox>
            <strong>Share price (pricePerShare)</strong> increases monotonically as yield is harvested.
            A user who deposits 1,000 USDC into the Prudent vault and receives 1,000 glUSD-P at t=0
            will redeem those 1,000 glUSD-P for ~1,035 USDC at t=1 year (~3.5% net APY after fees).
            On the secondary market, any buyer of glUSD-P knows they are exposed exclusively to Prudent profile protocols.
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
          <p className="text-navy/70 text-sm font-semibold mb-2">🛡️ glUSD-P — Prudent vault (10 protocols):</p>
          <WpTable
            headers={['Protocol', 'Category', 'Weight', 'Key property']}
            rows={[
              ['Liquidity Buffer (USDC idle)', 'Instant Withdrawals', '10%', 'Mandatory — idle USDC in vault, never deployed, not a yield allocation'],
              ['Aave v3 USDC', 'Lending', '10%', 'Tier-1 lending reference'],
              ['Morpho Gauntlet USDC Prime', 'Lending', '10%', 'Blue-chip collateral only, $0 bad debt'],
              ['Morpho Steakhouse USDC', 'Lending', '10%', 'Ultra-conservative curator'],
              ['sUSDS (Sky)', 'Savings Rate', '10%', 'MakerDAO infrastructure since 2017'],
              ['sBOLD (Liquity v2)', 'Stability Pool', '10%', 'Immutable code, no admin keys'],
              ['scrvUSD (Curve)', 'Savings Rate', '10%', '7-day timelock (Curve DAO)'],
              ['sUSDe (Ethena)', 'Delta-Neutral', '10%', '7-day cooldown, buffer-managed'],
              ['cUSDO (OpenEden)', 'RWA T-bills', '10%', 'Chainlink oracle, ChainSecurity audit'],
              ['fxSAVE (f(x) Protocol)', 'Stability Pool', '5%', '⚠️ Exception: 16 audits, ERC-4626 native, TVL $53M'],
              ['thBill (Theo Network)', 'RWA T-bills', '5%', '⚠️ Exception: capped 5%, secondary market only'],
            ]}
          />
          <p className="text-navy/70 text-sm font-semibold mb-2 mt-4">⚡ glUSD-D — Dynamic vault (10 protocols):</p>
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
            <strong>⚖️ glUSD-B (Balanced)</strong>: 50% Prudent + 50% Dynamic — no exclusive protocols.
            <br/><strong>🪂 glUSD-RH (Rewards Hunter)</strong>: Sierra Money 25% + Cap stcUSD 25% + sUSDai 25% + thBill 25%.
          </p>
        </SubSection>

        <div id="risk-profiles-en">
        <SubSection title="3.4 Risk Profiles">
          <p className="text-navy/70 leading-relaxed mb-3">
            DeFi Lantern offers <strong>4 independent vaults</strong>, each with its own share token, target protocol set, and risk philosophy. Users can hold multiple profiles simultaneously — they are fully isolated from each other.
          </p>
          <WpTable
            headers={['', '🛡️ Prudent', '⚖️ Balanced', '⚡ Dynamic', '🪂 Rewards Hunter']}
            rows={[
              ['Token', 'glUSD-P', 'glUSD-B', 'glUSD-D', 'glUSD-RH'],
              ['APY target', '3–7%', '5–10%', '8–15%', 'Variable'],
              ['# protocols', '10', '20', '10', '4'],
              ['Composition', 'Conservative lending + RWA', 'Equal blend of Prudent & Dynamic', 'High-yield, higher risk', 'Early-stage, tokenomics upside'],
              ['Ideal user', 'Capital preservation, low volatility', 'Diversification, balanced exposure', 'Yield maximization', 'Early adopter with risk tolerance'],
            ]}
          />
          <hr className="my-6 border-lgrey" />

          <InfoBox>
            <strong>Liquidity buffer (applies to all vaults):</strong> Every vault keeps <strong>10% of TVL</strong> as idle USDC inside the vault — separate from yield allocations, never deployed to any protocol. On a 100 USDC deposit: 10 USDC go to the buffer, 90 USDC to yield strategies. This cushion covers the vast majority of individual withdrawal requests instantly, without touching other users' positions.
          </InfoBox>

          <h4 className="font-semibold text-navy mb-2 mt-4">🛡️ glUSD-P — Prudent</h4>
          <p className="text-navy/70 text-sm mb-4 leading-relaxed">
            Capital preservation first. The vault prioritizes protocols with Tier-1 audits, on-chain timelocks, and immutable code. No single yield-generating protocol may exceed 15% of TVL.
          </p>

          <h4 className="font-semibold text-navy mb-2">⚡ glUSD-D — Dynamic</h4>
          <p className="text-navy/70 text-sm mb-4 leading-relaxed">
            Yield maximization for users who accept higher underlying risk. Strategies include institutional credit (KYC-gated protocols), delta-neutral leverage, junior tranches, and AI/RWA collateral. No single protocol exceeds 15% of TVL. Protocol selection is discretionary and reviewed quarterly.
          </p>

          <h4 className="font-semibold text-navy mb-2">⚖️ glUSD-B — Balanced</h4>
          <p className="text-navy/70 text-sm mb-4 leading-relaxed">
            A pure mechanical blend: every USDC deposited is split 50/50 between Prudent and Dynamic allocations, giving simultaneous exposure to all 20 protocols. There are no protocols exclusive to Balanced.
          </p>

          <h4 className="font-semibold text-navy mb-2">🪂 glUSD-RH — Rewards Hunter</h4>
          <p className="text-navy/70 text-sm mb-4 leading-relaxed">
            Position on early-stage protocols that combine competitive yield with a credible tokenomics event (airdrop, points program, or upcoming TGE). The yield is real and primary — the airdrop potential is a documented bonus, never a promised return. Positions are reviewed quarterly; any protocol whose tokenomics event has passed and whose rationale has expired is replaced.
          </p>
        </SubSection>
        </div>

        <div id="non-native-en">
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
        </div>
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

          <p className="text-navy/70 text-sm font-semibold mb-2">🛡️ Prudent — 10 protocols — APY target 3–7%</p>
          <WpTable
            headers={['Protocol', 'Category', 'Weight', 'APY', 'Notes']}
            rows={[
              ['Liquidity Buffer (USDC idle)', 'Instant Withdrawals', '10%', '—', 'Mandatory reserve — idle USDC in vault, never deployed'],
              ['Aave v3 USDC', 'Lending', '10%', '3–5%', 'Tier-1 lending reference'],
              ['Morpho Gauntlet USDC Prime', 'Lending', '10%', '3–4%', 'Blue-chip collateral only. $0 bad debt in Nov 2025 stress test.'],
              ['Morpho Steakhouse USDC', 'Lending', '10%', '3–5%', 'Ultra-conservative curator'],
              ['sUSDS (Sky)', 'Savings Rate', '10%', '4–6%', 'USDC→USDS via PSM, 1:1'],
              ['sBOLD (Liquity v2)', 'Stability Pool', '10%', '6–10%', 'ERC-4626 native, immutable code (no admin keys), 3 Tier-1 audits. Team since 2021. No cooldown.'],
              ['scrvUSD (Curve)', 'Savings Rate', '10%', '~6–9%', 'ERC-4626 native. Yield from crvUSD borrower interest. Trail of Bits + MixBytes + Quantstamp. 7-day timelock.'],
              ['sUSDe (Ethena)', 'Delta-Neutral', '10%', '5–7%', '7-day cooldown, buffer managed'],
              ['cUSDO (OpenEden)', 'RWA T-bills', '10%', '4–5%', 'Chainlink oracle, ChainSecurity audit'],
              ['fxSAVE (f(x) Protocol)', 'Stability Pool', '5%', '~6–10%', '⚠️ TVL exception ($53M). Justified: 16 audits (100% code), ERC-4626 native, team since 2021.'],
              ['thBill (Theo Network)', 'RWA T-bills', '5%', '2.5–5%', '⚠️ Exception: capped at 5% of Prudent TVL. AAA US T-bills, Standard Chartered + Wellington Mgmt. Secondary market only (Uniswap V3, TWAP 30min).'],
            ]}
          />

          <p className="text-navy/70 text-sm font-semibold mb-2 mt-6">⚡ Dynamic — 10 protocols — APY target 8–15%</p>
          <WpTable
            headers={['Protocol', 'Category', 'Weight', 'APY target', 'Notes']}
            rows={[
              ['syrupUSDC (Maple)', 'Institutional Credit', '15%', '~15%', 'KYC manageable for this profile'],
              ['sNUSD (Neutrl)', 'Delta-Neutral', '15%', '~16%', 'Multi-exchange funding rate strategy'],
              ['jrUSDe (Strata)', 'Market Neutral', '13%', '~14%', 'Ethena junior tranche'],
              ['sUSD3 (3Jane)', 'Institutional Credit', '12%', '~13%', '—'],
              ['sUSDai (USD.AI)', 'RWA / AI Credit', '12%', '13–17%', 'GPU loans, CHIP token Q1 2026'],
              ['InfiniFI (siUSD)', 'Fractional Reserve', '10%', '~6–9%', 'Liquid tranche, Certora-audited, TGE early 2026'],
              ['Reservoir (srUSD)', 'CDP Savings Rate', '8%', '~7.75%', 'Halborn audited, $526M TVL, DAM token'],
              ['stkUSDC (Aave Umbrella)', 'Safety Module', '7%', '~8%', 'Aave risk coverage'],
              ['imUSD (mStable)', 'Fixed Rate', '5%', '~12%', 'Pendle PT strategy'],
              ['reUSDe (Re Protocol)', 'Reinsurance', '3%', '~11%', 'Junior tranche'],
            ]}
          />

          <p className="text-navy/70 text-sm font-semibold mb-2 mt-6">⚖️ Balanced — 20 protocols — APY target 5–10%</p>
          <p className="text-navy/70 text-sm mb-3">
            Balanced allocates 50% to Prudent strategies and 50% to Dynamic strategies. There are no protocols exclusive to Balanced. Blended weights = each parent profile's weight × 50%.
          </p>
          <WpTable
            headers={['Protocol', 'Origin', 'Weight']}
            rows={[
              ['Liquidity Buffer (USDC idle)', 'Prudent', '5.0%'],
              ['Aave v3 USDC', 'Prudent', '5.0%'],
              ['Morpho Gauntlet USDC Prime', 'Prudent', '5.0%'],
              ['Morpho Steakhouse USDC', 'Prudent', '5.0%'],
              ['sUSDS (Sky)', 'Prudent', '5.0%'],
              ['sBOLD (Liquity v2)', 'Prudent', '5.0%'],
              ['scrvUSD (Curve)', 'Prudent', '5.0%'],
              ['sUSDe (Ethena)', 'Prudent', '5.0%'],
              ['cUSDO (OpenEden)', 'Prudent', '5.0%'],
              ['fxSAVE (f(x) Protocol)', 'Prudent', '2.5%'],
              ['thBill (Theo Network)', 'Prudent', '2.5%'],
              ['syrupUSDC (Maple)', 'Dynamic', '5.0%'],
              ['sNUSD (Neutrl)', 'Dynamic', '5.0%'],
              ['jrUSDe (Strata)', 'Dynamic', '5.0%'],
              ['sUSD3 (3Jane)', 'Dynamic', '5.0%'],
              ['sUSDai (USD.AI)', 'Dynamic', '5.0%'],
              ['InfiniFI (siUSD)', 'Dynamic', '5.0%'],
              ['Reservoir (srUSD)', 'Dynamic', '5.0%'],
              ['stkUSDC (Aave Umbrella)', 'Dynamic', '5.0%'],
              ['imUSD (mStable)', 'Dynamic', '5.0%'],
              ['reUSDe (Re Protocol)', 'Dynamic', '5.0%'],
            ]}
          />

          <p className="text-navy/70 text-sm font-semibold mb-2 mt-6">🪂 Rewards Hunter — 4 protocols — APY variable</p>
          <WpTable
            headers={['Protocol', 'Category', 'Weight', 'APY', 'Tokenomics Event', 'Notes']}
            rows={[
              ['Sierra Money', 'LYT (RWA+DeFi)', '25%', '~4.78%', 'TGE probable', 'Avalanche native, ETH via LayerZero OFT'],
              ['stcUSD (Cap)', 'Institutional Credit', '25%', '~6–10%', 'No token yet → TGE probable', 'RedStone oracle, immutable contracts, $500M TVL'],
              ['sUSDai (USD.AI)', 'RWA / AI Credit', '25%', '~13–17%', 'CHIP ICO Q1 2026', 'Also in Dynamic; GPU-backed'],
              ['thBill (Theo Network)', 'RWA T-bills', '25%', '~2.5–5%', 'TGE probable', 'Also in Prudent (1% cap); institutional backing'],
            ]}
          />
          <WarningBox>
            Airdrops are a potential bonus — never a promised return. Positions are reviewed quarterly; exit if the tokenomics event has passed with no further incentive rationale.
          </WarningBox>
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
        <SubSection title="5.1 Harvest">
          <p className="text-navy/70 leading-relaxed">
            The <code className="bg-navy/10 px-1 rounded">harvest()</code> function reads the current value of all adapter positions, computes net gains since the previous harvest, applies the performance fee, and optionally triggers rebalancing.
          </p>
          <InfoBox>
            <strong>v1 — Manual execution:</strong> In v1, <code className="bg-navy/10 px-1 rounded">harvest()</code> is called manually by the Guardian multisig. No automated keeper. Frequency is dictated by gas cost economics: at low TVL, harvesting too frequently destroys yield. A harvest is triggered on significant deposit/withdrawal, or when accumulated gains justify the cost.<br /><br />
            <strong>No claim() needed:</strong> All Prudent protocols are ERC-4626 or natively auto-compounding. Their value increases automatically — no <code className="bg-navy/10 px-1 rounded">claim()</code> call required. This simplifies harvest and significantly reduces gas cost.<br /><br />
            <strong>Net gain formula:</strong> <code className="bg-navy/10 px-1 rounded">gain = Σ adapter[i].totalAssets() now − Σ adapter[i].totalAssets() at last harvest</code>
          </InfoBox>
        </SubSection>

        <SubSection title="5.2 Performance Fee">
          <p className="text-navy/70 leading-relaxed mb-3">
            DeFi Lantern charges a <strong>5% performance fee on net gains</strong>,
            applied at harvest time.
          </p>
          <InfoBox>
            <strong>Implementation:</strong> the fee is never transferred as USDC. At each harvest,
            the FeeManager mints new glUSD-P/B/D/RH shares to the treasury proportional to the gain,
            diluting existing shareholders by 5% of the yield produced.
            This mechanism aligns the treasury's interests with those of users —
            the treasury only earns when users earn.
          </InfoBox>
          <CodeBlock>{`gain        = totalAssets_after_yield - totalAssets_before_yield
fee_in_usd  = gain × 5%
new_shares  = fee_in_usd / pricePerShare_after_yield`}</CodeBlock>
          <p className="text-navy/70 text-sm">The treasury is a Gnosis Safe multisig controlled by the DeFi Lantern team.</p>
          <InfoBox>
            <strong>Fee Accrual — continuous separation (no harvest depeg):</strong><br /><br />
            Without a dedicated mechanism, minting shares to the treasury at harvest increases <code className="bg-navy/10 px-1 rounded">totalSupply</code> instantaneously without changing <code className="bg-navy/10 px-1 rounded">totalAssets</code>, causing a minor dip in <code className="bg-navy/10 px-1 rounded">pricePerShare</code> at the exact harvest moment.<br /><br />
            DeFi Lantern maintains an <code className="bg-navy/10 px-1 rounded">accruedFees</code> variable that tracks the treasury's share of accumulated gains <strong>continuously</strong> between harvests. <code className="bg-navy/10 px-1 rounded">totalAssets()</code> is defined net of fees: <code className="bg-navy/10 px-1 rounded">totalAssets_net = totalAssets_gross − accruedFees</code>.<br /><br />
            At harvest, the share mint converts <code className="bg-navy/10 px-1 rounded">accruedFees</code> into shares and resets it to zero — with zero impact on <code className="bg-navy/10 px-1 rounded">pricePerShare</code>, since the fees were already excluded. This guarantees <code className="bg-navy/10 px-1 rounded">pricePerShare</code> is strictly monotonically non-decreasing under normal yield conditions — a key ERC-4626 accounting property.
          </InfoBox>
        </SubSection>

        <SubSection title="5.3 Liquidity Buffer & Withdrawal Mechanism">
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

        <SubSection title="5.4 Proportional Withdrawal Mechanism">
          <p className="text-navy/70 leading-relaxed mb-3">
            Each glUSD represents a <strong>proportional claim</strong> across all underlying protocols, in line with the current allocation weights.
          </p>
          <p className="text-navy/70 text-sm mb-2"><strong className="text-navy">Withdrawal flow:</strong></p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-4">
            <li>User calls <code className="bg-navy/10 px-1 rounded">redeem(shares)</code></li>
            <li>Vault burns glUSD and computes the proportional amount owed</li>
            <li>Vault draws from the buffer first (idle USDC in vault); if the withdrawal exceeds the buffer, the shortfall is drawn proportionally from all adapters</li>
            <li>USDC is sent to the user</li>
          </ol>
          <InfoBox>
            <strong>The buffer is a shared vault reserve, not drawn from individual allocations.</strong> When the buffer covers a withdrawal in full, no other user's position in any protocol is touched. If the withdrawal exceeds the buffer, the shortfall is drawn proportionally from all adapters — each user bears only their own share.
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
            headers={['Parameter', 'Value', 'What it means']}
            rows={[
              ['Voting delay', '1 day', 'After a proposal is created, 24 hours pass before voting opens — time for GLOW holders to read the proposal and delegate their tokens if needed'],
              ['Voting period', '3 days', 'Window during which GLOW holders can cast their vote (For / Against / Abstain)'],
              ['Majority type', 'Simple majority', 'A proposal passes if For > Against among votes cast — abstentions count neither for nor against'],
              ['Quorum', '10% of total supply (10,000,000 GLOW)', 'Minimum participation threshold: at least 10M GLOW must have voted (For or Against) for the vote to be valid — prevents important decisions from passing with only a handful of votes'],
              ['Proposal threshold', '1% of total supply (1,000,000 GLOW)', 'Minimum required to submit a proposal — prevents spam'],
              ['Timelock delay', '48 hours', 'After a successful vote, 48 hours pass before execution — window for any user who disagrees with the outcome to withdraw their funds'],
            ]}
          />
        </SubSection>
        <SubSection title="6.3 Guardian">
          <p className="text-navy/70 text-sm mb-2">
            A 3-of-5 multisig controlled by the core team holds Guardian rights. The Guardian can:
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

        <SubSection title="7.4 Secondary Market Acquisition Policy">
          <p className="text-navy/70 text-sm mb-2 leading-relaxed">
            The secondary market policy covers two distinct situations where DeFi Lantern cannot use a protocol's primary market (official mint/redemption).
          </p>
          <p className="text-navy/70 text-sm mb-1"><strong className="text-navy">Case 1 — Entry: KYC-gated protocols (thBILL, stcUSD)</strong></p>
          <p className="text-navy/70 text-sm mb-3 leading-relaxed">
            These protocols operate a <strong>permissioned primary market</strong>: direct mint from the issuer requires KYC/AML whitelisting, which a smart contract cannot pass. DeFi Lantern accesses them through their <strong>secondary market</strong> (Uniswap V3), where their tokens trade freely between on-chain participants.
          </p>
          <p className="text-navy/70 text-sm mb-1"><strong className="text-navy">Case 2 — Urgent exit: sUSDe (Ethena) 7-day cooldown bypass</strong></p>
          <p className="text-navy/70 text-sm mb-3 leading-relaxed">
            sUSDe imposes a <strong>7-day cooldown</strong> for official redemption. If a user requests immediate withdrawal and the liquidity buffer is insufficient, the adapter sells sUSDe directly on Curve (sUSDe/USDC pool) to source USDC without delay. The same slippage (0.5%) and TWAP validation rules apply. If the discount exceeds <strong>1%</strong> below the official NAV, the sale is suspended and a governance alert is emitted.
          </p>
          <InfoBox>
            <strong>Example — urgent withdrawal with sUSDe:</strong><br />
            A user requests an 80,000 USDC withdrawal. The buffer (idle USDC in vault) holds only $50,000 — partial coverage. The vault holds $200,000 of sUSDe. Rather than triggering Ethena's cooldown (7-day wait), the adapter sells $30,150 of sUSDe on Curve. TWAP 30 min: 1 sUSDe = $0.9985. Official Ethena NAV: $1.0000. Discount = 0.15% &lt; 1% → sale authorized. The user receives their full $80,000 USDC in a single transaction.
          </InfoBox>

          <p className="text-navy/70 text-sm font-semibold mb-2">Entry Rules (Buying)</p>
          <p className="text-navy/70 text-sm mb-1"><strong className="text-navy">Slippage Protection</strong></p>
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>Default maximum slippage: <strong>0.5%</strong> (hardcoded in adapter)</li>
            <li>Configurable by governance vote up to a hard ceiling of 1%</li>
            <li>Transaction reverts automatically if actual slippage would exceed the limit</li>
          </ul>
          <p className="text-navy/70 text-sm mb-1"><strong className="text-navy">Price Impact &amp; Position Sizing</strong></p>
          <p className="text-navy/70 text-sm mb-2 leading-relaxed">
            Price impact is the permanent shift in pool price caused by the order itself — distinct from slippage. For low-liquidity RWA tokens, even modest orders can move the market. DeFi Lantern addresses this through three mechanisms:
          </p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li><strong>Order cap:</strong> maximum single swap is <strong>5% of the adapter's target allocation</strong> per harvest cycle</li>
            <li><strong>Partial fill:</strong> if the full order would produce price impact exceeding 0.3%, the order is automatically reduced to fit within that limit; the remainder is deferred to the next harvest cycle</li>
            <li><strong>Order splitting:</strong> large positions are distributed across consecutive harvest cycles to minimize cumulative market impact</li>
          </ol>
          <p className="text-navy/70 text-sm mb-3 leading-relaxed">
            <strong className="text-navy">Oracle Validation (anti-manipulation)</strong><br />
            Before any DEX swap, the adapter reads the <strong>30-minute TWAP</strong> from the target Uniswap V3 pool. If the TWAP deviates more than 0.5% from the protocol's reported NAV: swap is aborted. Protects against sandwich attacks, flash loan manipulation, and short-term price distortion.
          </p>
          <p className="text-navy/70 text-sm mb-3 leading-relaxed">
            <strong className="text-navy">MEV Protection</strong><br />
            Adapter swaps are routed through Flashbots MEV Protect (or equivalent private mempool) to prevent frontrunning and sandwich attacks.
          </p>
          <InfoBox>
            <strong>Worked example — thBILL harvest cycle:</strong><br />
            Prudent vault TVL: $10,000,000. Target thBILL allocation: 5% = $500,000.<br /><br />
            <strong>① TWAP check:</strong> Adapter reads the USDC/thBILL Uniswap V3 pool over 30 minutes.
            TWAP: 1 thBILL = $1.0012. NAV reported by Theo Network: $1.0015.
            Deviation = 0.03% &lt; 0.5% → swap authorized.<br /><br />
            <strong>② Order cap:</strong> 5% × $500,000 = <strong>$25,000 max</strong> per harvest cycle.<br /><br />
            <strong>③ Price impact:</strong> Pool depth = $2,000,000. Buying $25,000 of thBILL would shift the price
            by ~1.25% &gt; 0.3% → order automatically reduced to <strong>~$8,000</strong>
            (the amount that keeps impact below 0.3%).<br /><br />
            <strong>④ Outcome:</strong> $8,000 of thBILL acquired per cycle with minimal market impact.
            Full $500,000 position built over ~62 harvest cycles, each with &lt;0.3% price impact per cycle.
          </InfoBox>

          <p className="text-navy/70 text-sm font-semibold mb-2">No-Liquidity Scenario</p>
          <p className="text-navy/70 text-sm mb-2">If no viable swap route exists within slippage limits:</p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>The adapter does <strong>not</strong> revert the full rebalance — the failing allocation is isolated</li>
            <li>The USDC earmarked for that protocol remains in Aave v3 (generating ~3–5% baseline APY)</li>
            <li>The vault emits <code className="bg-navy/10 px-1 rounded">AdapterAllocationPending(address adapter, uint256 pendingAmount)</code></li>
            <li>At the next harvest, if conditions are met (TWAP within 0.5%, slippage within 0.5%, price impact within 0.3%), the swap executes. Otherwise, USDC stays in Aave v3 for another harvest cycle.</li>
            <li>After <strong>3 consecutive harvests where conditions are not met</strong>: <code className="bg-navy/10 px-1 rounded">AdapterLiquidityAlert</code> is emitted and governance is notified for manual review</li>
            <li>Governance may vote to: (a) extend the waiting period, (b) reduce the target allocation, or (c) remove the adapter entirely</li>
          </ol>
          <InfoBox>
            <strong>No-liquidity example:</strong><br />
            Suppose the thBILL/USDC pool temporarily dries up (only $50,000 in liquidity).
            The adapter attempts to deploy $25,000 → estimated slippage 8.5% &gt; 0.5% cap → swap aborted.<br /><br />
            The $25,000 earmarked for thBILL stays in Aave v3 at ~4% APY instead.
            <code className="bg-navy/10 px-1 rounded mx-1">AdapterAllocationPending</code> is emitted.
            The adapter retries on cycles 2 and 3 — still no liquidity.
            After cycle 3: <code className="bg-navy/10 px-1 rounded mx-1">AdapterLiquidityAlert</code> is emitted.
            Governance reviews and may vote to: reduce thBILL target from 5% to 2%,
            wait for liquidity to recover, or remove the thBILL adapter entirely.
          </InfoBox>

          <p className="text-navy/70 text-sm font-semibold mb-2">Exit Rules (Selling)</p>
          <p className="text-navy/70 text-sm mb-2">The same slippage and oracle validation rules apply symmetrically on exit:</p>
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1 mb-4">
            <li>If secondary market price falls below NAV by more than <strong>1%</strong>: redemption is halted and an on-chain event is emitted for governance review</li>
            <li>During a user withdrawal: the vault uses the liquidity buffer first (idle USDC) — the illiquid adapter allocation is flagged as pending exit</li>
            <li>Extreme illiquidity: Guardian may call <code className="bg-navy/10 px-1 rounded">emergencyHold(adapter)</code> to freeze that adapter's allocation until liquidity recovers — all other adapters remain fully operational</li>
          </ul>
          <WpTable
            headers={['Risk', 'Safeguard']}
            rows={[
              ['Slippage on large entry/exit', '0.5% hard cap + partial fill + order splitting'],
              ['Price impact on thin pools', 'Liquidity depth check + 5% per-cycle order cap'],
              ['TWAP price manipulation', '30-minute TWAP + ≥0.5% deviation abort threshold'],
              ['NAV premium or discount', 'Oracle comparison + redemption halt mechanism'],
              ['Pool illiquidity on entry', 'USDC held in Aave → retry logic → governance alert'],
              ['Pool illiquidity on exit', 'Buffer (idle USDC) absorbs withdrawal + emergencyHold'],
              ['MEV / sandwich attacks', 'Private mempool routing via Flashbots'],
              ['Single-protocol concentration', 'Hard cap at 5% of Prudent vault TVL for exception-tier protocols (thBill)'],
            ]}
          />
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
              ['Team — Genesis Governance (5 founders)', '10%', '2,000,000 each', 'Granted immediately — non-transferable for 24 months', 'Enables voting from day one to ensure governance operates from launch'],
              ['Team — Long-term vesting (5 founders)', '10%', '2,000,000 each', '12-month cliff + 24-month linear', 'Long-term alignment — founders cannot sell at launch'],
              ['Treasury / DAO', '40%', '40,000,000', 'DAO-governed', 'Funds audits, infrastructure, development'],
              ['Community / Liquidity Mining', '30%', '30,000,000', '48-month emission to depositors across all 4 vaults (glUSD-P/B/D/RH)', 'Bootstraps adoption, rewards early users'],
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
              ['Rewards Hunter 🪂', 'Architecture 0 (Sierra Money, already decided) → Architecture 1b for new protocols'],
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
            <li><strong className="text-navy">Decentralized cross-chain (Architecture 2):</strong> LayerZero OVault standard — satellite contracts on Arbitrum, Base, Avalanche governed on-chain by the ETH vault. No keeper required. Users can deposit USDC from any supported chain and receive glUSD shares on their chain via LayerZero OFT.</li>
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
          Users deposit once into their chosen vault and receive glUSD-P/B/D/RH shares
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

      {/* 11. REWARDS HUNTER EN */}
      <Section id="rewards-hunter-en" title="11. Rewards Hunter Vault — Mechanics (glUSD-RH)">
        <p className="text-navy/70 text-sm leading-relaxed mb-4">
          The Rewards Hunter vault is an aggregator of yield positions specifically targeting protocols that
          offer access to incentive campaigns — live token emissions or long-term point accumulation systems
          rewarded by future airdrops. It provides a <strong className="text-navy">single entry point</strong> to
          multiple campaigns, without requiring users to interact with each protocol individually.
        </p>

        <SubSection title="Two Reward Scenarios">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mb-4">
              <thead>
                <tr className="bg-navy/5">
                  <th className="text-left p-2 text-navy font-semibold border border-navy/10">Scenario</th>
                  <th className="text-left p-2 text-navy font-semibold border border-navy/10">Mechanism</th>
                  <th className="text-left p-2 text-navy font-semibold border border-navy/10">User experience</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-navy/10 text-navy font-medium">Live incentive campaigns</td>
                  <td className="p-2 border border-navy/10 text-navy/70">Tokens emitted in real time by partner protocols and routed directly to Merkl — they never transit through the vault.</td>
                  <td className="p-2 border border-navy/10 text-navy/70">Balance increases in real time on the Merkl portal. Instant claim available.</td>
                </tr>
                <tr className="bg-navy/5">
                  <td className="p-2 border border-navy/10 text-navy font-medium">Long-term point campaigns</td>
                  <td className="p-2 border border-navy/10 text-navy/70">When a protocol converts points into tokens (airdrop event), the vault receives the tokens and redistributes them via a Gnosis Safe (multisig) to Merkl, proportional to each depositor's allocation weight.</td>
                  <td className="p-2 border border-navy/10 text-navy/70">User monitors the Merkl portal and claims after the campaign concludes.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title="Merkl Partnership — Reward Distribution">
          <p className="text-navy/70 text-sm leading-relaxed mb-3">
            Reward redistribution is managed through a partnership with <strong className="text-navy">Merkl</strong> (by Angle Labs),
            selected for its reliability, institutional reputation, and unified claim interface.
            Merkl continuously indexes depositor balances to compute precise, proportional claim amounts.
          </p>
        </SubSection>

        <SubSection title="Security Model">
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-2 mb-3">
            <li><strong className="text-navy"><code>sweep()</code> function:</strong> only tokens that are not the reserve asset (USDC) can be transferred from the vault to the Gnosis Safe — user deposits cannot be moved through this path under any circumstance.</li>
            <li><strong className="text-navy">Safe whitelist:</strong> from the Gnosis Safe, only the Merkl contract address is authorized to receive tokens. No team member can redirect reward flows to any other destination.</li>
            <li><strong className="text-navy">No commercial partnership:</strong> DeFi Lantern has no commercial agreement with the protocols in this vault. Airdrop criteria and finality are determined solely by each third-party protocol.</li>
          </ul>
          <WarningBox>
            DeFi Lantern does not determine the criteria, timing, or final amount of third-party airdrops.
            The protocol only controls how tokens received at the vault level are routed to depositors.
            Airdrops are discretionary decisions by external protocols and must never be construed as guaranteed returns.
          </WarningBox>
        </SubSection>
      </Section>

      {/* 12. SECONDARY MARKET LIQUIDITY EN */}
      <Section id="liquidity-en" title="12. Secondary Market Liquidity — Curve/VoteMarket Flywheel">
        <p className="text-navy/70 text-sm leading-relaxed mb-4">
          As ERC-4626 yield-bearing tokens (YBT), glUSD shares are normally minted at deposit and burned at redemption.
          This creates two limitations: each redemption draws down the vault's USDC buffer, and in stress scenarios
          (protocol incident, liquidity crisis), redemptions may be delayed.
        </p>

        <SubSection title="Solution — Curve Finance Liquidity Pools">
          <p className="text-navy/70 text-sm leading-relaxed mb-3">
            DeFi Lantern will deploy <strong className="text-navy">glUSD/USDC liquidity pools on Curve Finance</strong> (Stableswap NG standard),
            creating a secondary market where users can exit their glUSD position by swapping directly with other participants —
            without triggering vault redemption. The pool acts as a <strong className="text-navy">complementary exit layer</strong>.
          </p>
          <ul className="list-disc list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li><strong className="text-navy">Why Curve:</strong> Curve is specifically optimized for stable asset and yield-bearing token pools — ideal for glUSD pairs.</li>
            <li><strong className="text-navy">VoteMarket:</strong> the Curve/VoteMarket ecosystem allows the protocol to direct CRV emissions to its pool via bribes, incentivizing third-party liquidity providers at low direct cost.</li>
            <li><strong className="text-navy">Emergency exit:</strong> in the event of a vault pause or incident, the secondary market remains operational as an alternative exit for users.</li>
          </ul>
        </SubSection>

        <SubSection title="The Liquidity Providing Flywheel">
          <p className="text-navy/70 text-sm leading-relaxed mb-3">
            A portion of DeFi Lantern's performance fees funds bribes on VoteMarket, creating a self-reinforcing cycle:
          </p>
          <ol className="list-decimal list-inside text-navy/70 text-sm space-y-1 mb-3">
            <li>Create a glUSD-P/USDC pool on Curve, funded by the treasury</li>
            <li>Request gauge creation on Curve to enable CRV vote emissions</li>
            <li>Fund bribes on VoteMarket (treasury + performance fees) → directs CRV emissions to the pool</li>
            <li>Higher pool APY attracts third-party liquidity providers</li>
            <li>Deeper liquidity generates more swap fee revenue</li>
            <li>A portion of CRV rewards swapped to USDC to fund new bribes</li>
            <li>Pool fees are dynamically allocated: reinvested in the pool, directed to bribes, or returned to treasury</li>
            <li>Long-term: if enough CRV accumulated, arbitrage between locking as veCRV (voting directly for the gauge) vs. selling to fund new bribes</li>
          </ol>
          <InfoBox>
            <strong>No yield cross-contamination:</strong> the performance fees used to fund bribes are treasury revenues — they are never drawn from depositor principal or yield allocations. The pool is operated separately from the vault's yield strategies.
          </InfoBox>
        </SubSection>

        <SubSection title="Benefits">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-navy/5">
                  <th className="text-left p-2 text-navy font-semibold border border-navy/10">Benefit</th>
                  <th className="text-left p-2 text-navy font-semibold border border-navy/10">Mechanism</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border border-navy/10 text-navy/70">Secondary exit route</td><td className="p-2 border border-navy/10 text-navy/70">glUSD swappable for USDC on Curve without vault redemption</td></tr>
                <tr className="bg-navy/5"><td className="p-2 border border-navy/10 text-navy/70">Emergency exit in stress scenarios</td><td className="p-2 border border-navy/10 text-navy/70">Pool remains operational even if vault redemptions are paused</td></tr>
                <tr><td className="p-2 border border-navy/10 text-navy/70">Capital-efficient liquidity bootstrapping</td><td className="p-2 border border-navy/10 text-navy/70">Bribes attract third-party liquidity without excessive capital commitment</td></tr>
                <tr className="bg-navy/5"><td className="p-2 border border-navy/10 text-navy/70">Reduced sell pressure</td><td className="p-2 border border-navy/10 text-navy/70">glUSD changes hands rather than being burned, preserving pool depth</td></tr>
              </tbody>
            </table>
          </div>
        </SubSection>
      </Section>

      {/* 13. LEGAL */}
      <Section id="legal-en" title="13. Legal Disclaimer">
        <WarningBox>
          DeFi Lantern is an experimental, open-source software project developed for academic purposes.
          It is not a registered financial product or investment vehicle. glUSD-P, glUSD-B, glUSD-D, and glUSD-RH shares are not securities.
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
          DeFi Lantern — Whitepaper v0.3 — April 2026<br />
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
  { id: 'risk-profiles', label: '3.4 Profils de risque' },
  { id: 'protocols', label: '4. Protocoles' },
  { id: 'yield', label: '5. Rendement & Frais' },
  { id: 'governance', label: '6. Gouvernance' },
  { id: 'security', label: '7. Sécurité' },
  { id: 'tokenomics', label: '8. Tokenomique' },
  { id: 'roadmap', label: '9. Feuille de route' },
  { id: 'conclusion', label: '10. Conclusion' },
  { id: 'rewards-hunter', label: '11. Rewards Hunter' },
  { id: 'liquidity', label: '12. Liquidité marchés secondaires' },
  { id: 'legal', label: '13. Avertissement légal' },
]

const TOC_EN = [
  { id: 'abstract-en', label: 'Abstract' },
  { id: 'intro-en', label: '1. Introduction' },
  { id: 'overview-en', label: '2. Protocol Overview' },
  { id: 'architecture-en', label: '3. Architecture' },
  { id: 'risk-profiles-en', label: '3.4 Risk Profiles' },
  { id: 'non-native-en', label: '3.5 Non-Native Protocols' },
  { id: 'protocols-en', label: '4. Underlying Protocols' },
  { id: 'yield-en', label: '5. Yield, Fees & Liquidity' },
  { id: 'governance-en', label: '6. Governance' },
  { id: 'security-en', label: '7. Security' },
  { id: 'tokenomics-en', label: '8. Tokenomics' },
  { id: 'roadmap-en', label: '9. Roadmap' },
  { id: 'conclusion-en', label: '10. Conclusion' },
  { id: 'rewards-hunter-en', label: '11. Rewards Hunter Vault' },
  { id: 'liquidity-en', label: '12. Secondary Market Liquidity' },
  { id: 'legal-en', label: '13. Legal Disclaimer' },
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
            className="flex items-center gap-2 text-white/60 hover:text-[#28B092] transition-colors text-sm mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            {isFR ? 'Retour au site' : 'Back to site'}
          </button>
          <div className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}lantern-logo.svg`} alt="DeFi Lantern" className="h-8 w-auto" />
            <div>
              <h1 className="text-2xl font-bold text-[#28B092]">DeFi Lantern</h1>
              <p className="text-white/50 text-sm">{isFR ? 'Livre Blanc v0.3 — Avril 2026' : 'Whitepaper v0.2 — March 2026'}</p>
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
                      className="w-full text-left text-xs text-navy/60 hover:text-[#28B092] transition-colors py-0.5 leading-relaxed"
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
