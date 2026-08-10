'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
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
 statusColor: 'text-success',
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
 statusColor: 'text-success',
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
 statusColor: 'text-success',
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
 statusColor: 'text-success',
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
 statusColor: 'text-success',
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
 statusColor: 'text-success',
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

function LayerIndicator({ number }: { number: number }) {
 return (
 <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-primary/10 border border-primary/20">
 <span className="font-mono font-bold text-xl sm:text-2xl text-primary">
 L{number}
 </span>
 </div>
 )
}

export default function ArchitecturePage() {
 return (
 <div className="min-h-screen flex flex-col">
 <PageHeader
 title="Architecture"
 description="Six layers, from settlement to economics. Each layer is independently verifiable and contributes to the protocol's trustless operation."
 breadcrumbs={[{ label: 'Architecture' }]}
 />

 {/* Layer overview bar — Light section */}
 <section className="section-white py-10">
 <div className="max-w-[980px] mx-auto px-6">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 className="flex flex-wrap gap-3 justify-center"
 >
 {layers.map((layer) => {
 const Icon = layer.icon
 return (
 <a
 key={layer.number}
 href={`#layer-${layer.number}`}
 className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-foreground/25 hover:bg-muted transition-colors text-[14px] text-muted-foreground hover:text-foreground font-sans"
 >
 <Icon className="w-4 h-4 text-primary" />
 <span className="font-mono">L{layer.number}</span>
 <span className="hidden sm:inline">{layer.title}</span>
 </a>
 )
 })}
 </motion.div>
 </div>
 </section>

 {/* Layer details — alternating sections */}
 <div className="flex flex-col">
 {layers.map((layer, idx) => {
 const Icon = layer.icon
 const isDark = idx % 2 === 0
 return (
 <motion.section
 key={layer.number}
 id={`layer-${layer.number}`}
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-80px' }}
 transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
 className={`${isDark ? 'section-paper' : 'section-white'} section-spacing`}
 >
 <div className="max-w-[980px] mx-auto px-6">
 {/* Layer header */}
 <div className="flex items-start gap-4 sm:gap-6 mb-8">
 <LayerIndicator number={layer.number} />
 <div className="flex-1 min-w-0">
 <div className="flex flex-wrap items-center gap-3 mb-2">
 <h3 className={`text-[28px] sm:text-[40px] md:text-[48px] font-bold tracking-normal font-sans ${isDark ? 'text-foreground' : 'text-foreground'}`}>
 {layer.title}
 </h3>
 <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium border bg-success/10 border-success/20 text-success">
 <CheckCircle2 className="w-3 h-3" />
 {layer.status}
 </span>
 </div>
 </div>
 </div>

 {/* Description paragraphs */}
 <div className="space-y-4 mb-10 ml-0 sm:ml-20">
 {layer.description.map((paragraph, pi) => (
 <p
 key={pi}
 className={`text-[14px] sm:text-[17px] leading-[1.6] font-sans ${isDark ? 'text-muted-foreground' : 'text-muted-foreground'}`}
 >
 {paragraph}
 </p>
 ))}
 </div>

 {/* Key components */}
 <div className="ml-0 sm:ml-20">
 <h4 className="text-[12px] font-semibold text-primary uppercase tracking-normal mb-5 font-sans">
 Key Components
 </h4>
 <div className={`space-y-0 rounded-xl overflow-hidden border ${isDark ? 'border-border' : 'border-border'}`}>
 {layer.components.map((comp, ci) => (
 <div
 key={ci}
 className={`flex items-start gap-3 p-4 ${
 ci < layer.components.length - 1
 ? isDark ? 'border-b border-border' : 'border-b border-border'
 : ''
 } ${isDark ? 'bg-card' : 'bg-card'}`}
 >
 <div className="flex-shrink-0 w-6 h-6 rounded bg-primary/10 flex items-center justify-center mt-0.5">
 <Cpu className="w-3.5 h-3.5 text-primary" />
 </div>
 <div>
 <p className={`text-[15px] font-medium font-sans ${isDark ? 'text-foreground' : 'text-foreground'}`}>{comp.name}</p>
 {comp.description && (
 <p className={`text-[12px] mt-0.5 font-sans ${isDark ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
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
 <div className="ml-0 sm:ml-20 mt-8">
 <h4 className="text-[12px] font-semibold text-warning uppercase tracking-normal mb-4 flex items-center gap-2 font-sans">
 <AlertTriangle className="w-4 h-4" />
 Stubs &amp; Limitations
 </h4>
 <div className="space-y-3">
 {layer.stubs.map((stub, si) => (
 <div
 key={si}
 className={`flex items-start gap-3 p-4 rounded-xl border bg-warning/10 border-warning/25`}
 >
 <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
 <div>
 <p className={`text-[15px] font-medium font-sans ${isDark ? 'text-foreground' : 'text-foreground'}`}>{stub.name}</p>
 <p className="text-warning/80 text-[12px] mt-0.5">{stub.note}</p>
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

 <ScrollToTop />
 </div>
 )
}
