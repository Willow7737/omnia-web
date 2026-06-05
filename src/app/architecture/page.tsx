'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import {
  Shield,
  GitFork,
  BoxSelect,
  Link2,
  Fingerprint,
  Wallet,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  FileCode2,
  Lock,
  Radio,
  Network,
  Coins,
  Database,
  type LucideIcon,
} from 'lucide-react'

interface LayerComponent {
  name: string
  description?: string
}

interface Stub {
  name: string
  note: string
}

interface LayerData {
  number: number
  title: string
  icon: LucideIcon
  status: string
  statusColor: string
  description: string[]
  components: LayerComponent[]
  stubs: Stub[]
}

const layers: LayerData[] = [
  {
    number: 0,
    title: 'ZK-Rollup Settlement',
    icon: Shield,
    status: 'Implemented',
    statusColor: 'text-[#30D158] bg-[#30D158]/10 border-[#30D158]/20',
    description: [
      'The settlement layer is the anchor that ties Omnia\'s parallel execution back to a root of trust on an L1 blockchain. Omnia is settlement-agnostic — it doesn\'t prescribe a single chain. Instead, it defines a SettlementAdapter trait and SettlementLayer trait that any L1 can implement.',
      'The Ethereum adapter deploys a Solidity contract (OmniaRollup.sol) that verifies Groth16 proofs on BN254. In live mode (via the ethereum-live feature flag), it uses Alloy to submit real transactions to Ethereum mainnet or testnets.',
      'The ZK circuit is built on arkworks R1CS with Groth16 proofs on the BN254 curve. Off-circuit, BLAKE3 is used for the Sparse Merkle tree — a deliberate choice for performance, since BLAKE3 is not circuit-friendly but is extremely fast in native code.',
    ],
    components: [
      { name: 'SettlementAdapter + SettlementLayer traits', description: 'Generic settlement interface' },
      { name: 'Ethereum adapter (OmniaRollup.sol)', description: 'Solidity contract with live mode via ethereum-live feature' },
      { name: 'FFI settlement adapter', description: 'C-library integration for custom settlement' },
      { name: 'Celestia adapter', description: 'RPC integration for data availability' },
      { name: 'L2 operator with batch builder', description: 'Batch construction and submission' },
      { name: 'ZK circuit (arkworks R1CS + Groth16/BN254)', description: 'Zero-knowledge proof generation' },
      { name: 'Sparse Merkle tree proofs (BLAKE3 off-circuit)', description: 'Efficient state commitment' },
    ],
    stubs: [
      { name: 'Bitcoin settlement adapter', note: 'Not yet implemented' },
      { name: 'Solana settlement adapter', note: 'Not yet implemented' },
      { name: 'Cosmos settlement adapter', note: 'Not yet implemented' },
    ],
  },
  {
    number: 1,
    title: 'Causal Graph Substrate',
    icon: GitFork,
    status: 'Implemented',
    statusColor: 'text-[#30D158] bg-[#30D158]/10 border-[#30D158]/20',
    description: [
      'The causal graph substrate is the core of Omnia\'s consensus mechanism. Instead of a linear chain of blocks, it uses a directed acyclic graph (DAG) where events reference multiple parents via vector clocks, preserving causal ordering without requiring a single global sequence.',
      'The graph structure is inspired by Hashgraph\'s two-parent event model, with AlephBFT-inspired BFT finality providing fast confirmation. CRDTs (Conflict-free Replicated Data Types) — including GCounter, OrSet, and LWWRegister — ensure state convergence across all nodes without coordination.',
      'Communication happens over libp2p using QUIC transport with GossipSub for message propagation and mDNS for local peer discovery. All events are signed with Ed25519 and include replay protection. The SlashingEngine detects equivocation, liveness failures, and invalid attestations, with persistent state stored in redb.',
    ],
    components: [
      { name: 'Causal graph (DAG) with vector clock ordering', description: 'Parallel event processing' },
      { name: 'Hashgraph-like two-parent events', description: 'Rich causal structure' },
      { name: 'AlephBFT-inspired BFT finality', description: 'Fast confirmation' },
      { name: 'CRDT state convergence (GCounter, OrSet, LWWRegister)', description: 'Conflict-free state merge' },
      { name: 'libp2p gossip protocol (QUIC + GossipSub + mDNS)', description: 'P2P networking' },
      { name: 'Ed25519 signatures with replay protection', description: 'Cryptographic identity' },
      { name: 'SlashingEngine (equivocation/liveness/invalid attestation)', description: 'Byzantine fault detection' },
      { name: 'Persistent slashing state via redb', description: 'Durable slashing records' },
    ],
    stubs: [],
  },
  {
    number: 2,
    title: 'Domain Shards',
    icon: BoxSelect,
    status: 'Implemented',
    statusColor: 'text-[#30D158] bg-[#30D158]/10 border-[#30D158]/20',
    description: [
      'Domain shards partition the protocol\'s state into six specialized domains, each with its own transaction semantics, validation rules, and consistency guarantees. This separation allows each domain to optimize for its specific use case without compromising others.',
      'The ShardRouter implements the EventProcessor trait and automatically dispatches events to the correct shard. Cross-shard messaging is supported with causality proofs, ensuring that dependencies between shards are tracked and verified. Fee enforcement uses FeeSchedule and QuotaSystem to prevent spam.',
      'The FinancialShard is particularly notable — it uses strict causal ordering for balance consistency, ensuring that debits always precede credits in the causal history. This prevents the double-spend problem without requiring global locking.',
    ],
    components: [
      { name: '6 shards: Financial, Identity, Physical, Computational, Biological, Economics', description: 'Domain-specific state partitioning' },
      { name: 'ShardRouter with automatic dispatch (EventProcessor trait)', description: 'Event routing infrastructure' },
      { name: 'Cross-shard messaging with causality proofs', description: 'Inter-shard communication' },
      { name: 'Fee enforcement (FeeSchedule + QuotaSystem)', description: 'Spam prevention' },
      { name: 'Per-creator nonce replay protection', description: 'Transaction deduplication' },
      { name: 'FinancialShard with strict causal ordering', description: 'Balance consistency' },
    ],
    stubs: [],
  },
  {
    number: 3,
    title: 'Binding Layer',
    icon: Link2,
    status: 'Implemented',
    statusColor: 'text-[#30D158] bg-[#30D158]/10 border-[#30D158]/20',
    description: [
      'The binding layer creates a tamper-proof link between digital records and physical reality. It uses an append-only provenance log implemented as a CRDT with BLAKE3 hash-chain integrity — every entry chains to the previous one, making retroactive modification detectable.',
      'Physical anchoring combines RF fingerprinting, quantum-resistant signatures, and provenance tracking. The ProvenanceTracker manages the full lifecycle: create, transfer, verify, and destroy. Hybrid PQC signatures combine Ed25519 (for current speed) with CRYSTALS-Dilithium (for post-quantum security).',
      'The PqcKeyRotationManager handles post-quantum key rotation through a three-phase migration process, ensuring continuity of verification during the transition from classical to quantum-resistant signatures.',
    ],
    components: [
      { name: 'Append-only provenance log (CRDT)', description: 'BLAKE3 hash-chain integrity' },
      { name: 'Physical anchor (RF + quantum + provenance)', description: 'Digital-physical binding' },
      { name: 'ProvenanceTracker (create/transfer/verify/destroy)', description: 'Full lifecycle management' },
      { name: 'Hybrid PQC signatures (Ed25519 + CRYSTALS-Dilithium)', description: 'Current + post-quantum security' },
      { name: 'PqcKeyRotationManager (3-phase migration)', description: 'Post-quantum key rotation' },
    ],
    stubs: [
      { name: 'RF fingerprinting', note: 'Needs SDR hardware — not production-ready' },
    ],
  },
  {
    number: 4,
    title: 'Identity Hardening',
    icon: Fingerprint,
    status: 'Implemented',
    statusColor: 'text-[#30D158] bg-[#30D158]/10 border-[#30D158]/20',
    description: [
      'The identity layer provides self-sovereign identity with the did:omnia: method, enabling decentralized identifiers that don\'t rely on any central authority. Validation is built directly into the protocol.',
      'Key management uses Shamir\'s Secret Sharing over GF(256) to split keys into shares distributed across trusted parties. Privacy-preserving biometric anchors use BLAKE3(salt || template) — the salt ensures that even if the hash is compromised, the original biometric template cannot be reconstructed.',
      'AI agent identity is a first-class concept with five capability types, enabling machine actors to participate in the protocol with well-defined permission boundaries. Social recovery with guardian thresholds ensures that lost keys don\'t mean lost identity.',
    ],
    components: [
      { name: 'did:omnia: method with validation', description: 'Decentralized identifiers' },
      { name: 'Shamir\'s Secret Sharing over GF(256)', description: 'Distributed key management' },
      { name: 'Privacy-preserving biometric anchors (BLAKE3(salt || template))', description: 'Unrecoverable biometric hashing' },
      { name: 'AI agent identity (5 capability types)', description: 'Machine actor permissions' },
      { name: 'Social recovery with guardian threshold', description: 'Key recovery without central authority' },
    ],
    stubs: [],
  },
  {
    number: 5,
    title: 'Economics',
    icon: Wallet,
    status: 'Implemented',
    statusColor: 'text-[#30D158] bg-[#30D158]/10 border-[#30D158]/20',
    description: [
      'The economics layer introduces Universal Basic Compute (UBC) — a soulbound monthly quota that guarantees every participant a baseline of computational resources. Unlike tokens that can be traded or concentrated, UBC is non-transferable and resets each epoch.',
      'Quota management uses epoch advancement to distribute fresh allocations. Quadratic voting with exponential reputation decay ensures that influence diminishes over time unless continuously earned through participation — preventing permanent power accumulation.',
      'Fixed-point governance decay uses PPM (parts-per-million) arithmetic, deliberately avoiding f64 floating-point in consensus-critical code. This ensures deterministic results across all implementations. The proof-of-useful-work system defines three work types but remains a stub, not yet production-ready.',
    ],
    components: [
      { name: 'Universal Basic Compute (UBC)', description: 'Soulbound monthly compute quota' },
      { name: 'Quota system with epoch advancement', description: 'Periodic resource allocation' },
      { name: 'Quadratic voting with exponential reputation decay', description: 'Fair governance influence' },
      { name: 'Fixed-point governance decay (PPM arithmetic)', description: 'Deterministic consensus math' },
    ],
    stubs: [
      { name: 'Proof-of-useful-work', note: '3 work types defined, not production-ready' },
    ],
  },
]

const layerIconMap: Record<string, LucideIcon> = {
  0: Shield,
  1: GitFork,
  2: BoxSelect,
  3: Link2,
  4: Fingerprint,
  5: Wallet,
}

function LayerIndicator({ number }: { number: number }) {
  return (
    <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#2997FF]/10 border border-[#2997FF]/20">
      <span className="text-omnia-accent font-[family-name:var(--font-jetbrains-mono)] font-bold text-xl sm:text-2xl">
        L{number}
      </span>
    </div>
  )
}

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-omnia-base flex flex-col">
      <PageHeader
        title="Architecture"
        description="Six layers, from settlement to economics. Each layer is independently verifiable and contributes to the protocol's trustless operation."
        breadcrumbs={[{ label: 'Architecture' }]}
      />

      {/* Layer overview bar */}
      <div className="max-w-[980px] mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {layers.map((layer) => {
            const Icon = layerIconMap[layer.number]
            return (
              <a
                key={layer.number}
                href={`#layer-${layer.number}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-colors text-[14px] text-omnia-text-secondary hover:text-omnia-text font-[family-name:var(--font-geist-sans)]"
              >
                <Icon className="w-4 h-4 text-omnia-accent" />
                <span className="font-[family-name:var(--font-jetbrains-mono)]">L{layer.number}</span>
                <span className="hidden sm:inline">{layer.title}</span>
              </a>
            )
          })}
        </motion.div>
      </div>

      {/* Layer detail cards */}
      <div className="max-w-[980px] mx-auto px-6 pb-16 sm:pb-24 space-y-8">
        {layers.map((layer, idx) => {
          const Icon = layer.icon
          return (
            <motion.section
              key={layer.number}
              id={`layer-${layer.number}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
              className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden hover:border-white/[0.12] transition-colors"
            >
              {/* Layer header */}
              <div className="px-5 sm:px-8 py-6 sm:py-8 border-b border-white/[0.06]">
                <div className="flex items-start gap-4 sm:gap-6">
                  <LayerIndicator number={layer.number} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-[28px] sm:text-[32px] font-bold text-omnia-text tracking-tight font-[family-name:var(--font-space-grotesk)]">
                        {layer.title}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium border ${layer.statusColor}`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        {layer.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Layer body */}
              <div className="px-5 sm:px-8 py-6 sm:py-8 space-y-8">
                {/* Description paragraphs */}
                <div className="space-y-4">
                  {layer.description.map((paragraph, pi) => (
                    <p
                      key={pi}
                      className="text-omnia-text-secondary text-[14px] sm:text-[15px] leading-[1.6] font-[family-name:var(--font-geist-sans)]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Key components */}
                <div>
                  <h4 className="text-[12px] font-semibold text-omnia-accent uppercase tracking-wider mb-4 font-[family-name:var(--font-space-grotesk)]">
                    Key Components
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {layer.components.map((comp, ci) => (
                      <div
                        key={ci}
                        className="flex items-start gap-3 p-3 rounded-lg bg-black/50 border border-white/[0.04]"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded bg-[#2997FF]/10 flex items-center justify-center mt-0.5">
                          <Cpu className="w-3.5 h-3.5 text-omnia-accent" />
                        </div>
                        <div>
                          <p className="text-omnia-text text-[15px] font-medium font-[family-name:var(--font-geist-sans)]">{comp.name}</p>
                          {comp.description && (
                            <p className="text-omnia-text-secondary text-[12px] mt-0.5 font-[family-name:var(--font-geist-sans)]">
                              {comp.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stubs / Limitations */}
                {layer.stubs.length > 0 && (
                  <div>
                    <h4 className="text-[12px] font-semibold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2 font-[family-name:var(--font-space-grotesk)]">
                      <AlertTriangle className="w-4 h-4" />
                      Stubs &amp; Limitations
                    </h4>
                    <div className="space-y-3">
                      {layer.stubs.map((stub, si) => (
                        <div
                          key={si}
                          className="flex items-start gap-3 p-3 rounded-lg bg-amber-400/5 border border-amber-400/20"
                        >
                          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-omnia-text text-[15px] font-medium font-[family-name:var(--font-geist-sans)]">{stub.name}</p>
                            <p className="text-amber-400/80 text-[12px] mt-0.5">{stub.note}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.section>
          )
        })}
      </div>

      <Footer />
    </div>
  )
}
