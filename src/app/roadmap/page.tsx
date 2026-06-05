'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import {
  CheckCircle2,
  Circle,
  Loader2,
  ChevronDown,
  Sprout,
  Shield,
  KeyRound,
  Network,
  Rocket,
  FlaskConical,
  Search,
  Globe,
  Cpu,
  Atom,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'

interface PhaseItem {
  text: string
}

interface Phase {
  number: string
  title: string
  status: 'completed' | 'in-progress' | 'future'
  icon: LucideIcon
  items: PhaseItem[]
}

const phases: Phase[] = [
  {
    number: '0',
    title: 'The Seed',
    status: 'completed',
    icon: Sprout,
    items: [
      { text: 'Causal graph consensus (68 primitives tests + 294 consensus tests)' },
      { text: 'Self-sovereign identity system (DIDs, Shamir, biometrics)' },
      { text: 'Universal Basic Compute (UBC)' },
      { text: '6 domain shards with cross-shard messaging' },
      { text: 'Settlement-agnostic ZK-rollup architecture' },
      { text: 'Full ZK circuit (arkworks R1CS + Groth16 + Poseidon)' },
      { text: 'Real PQC signatures (ML-KEM-768 / FIPS-203)' },
      { text: 'REST API with JWT auth, rate limiting, CORS' },
      { text: 'Docker 5-node testnet + monitoring stack' },
    ],
  },
  {
    number: '1',
    title: 'Hardening',
    status: 'completed',
    icon: Shield,
    items: [
      { text: 'Typed error migration — 34 thiserror enums' },
      { text: 'unwrap() replacement — #![deny(clippy::unwrap_used)]' },
      { text: 'E2E REST API Integration Tests — 19 test functions' },
      { text: 'Code coverage integration' },
      { text: 'RUSTSEC advisory review' },
      { text: 'Documentation sprint — 50+ discrepancy fixes' },
      { text: 'Solidity Groth16 Verifier with BN254 precompiles' },
      { text: 'Rustdoc coverage — 35 documentation items' },
    ],
  },
  {
    number: '2',
    title: 'Cryptographic Key Management & ZK Hardening',
    status: 'completed',
    icon: KeyRound,
    items: [
      { text: 'SSS recovery flow with encrypted shares' },
      { text: 'Trusted setup ceremony with real EC scalar multiplication' },
      { text: 'ZK circuit dummy fields populated' },
      { text: 'Groth16 batch verification' },
      { text: 'PQC key rotation with encrypted keystore' },
      { text: 'BIP-39 mnemonic support' },
      { text: 'DKG for threshold signatures (Feldman VSS)' },
      { text: 'ADRs 010–014' },
    ],
  },
  {
    number: '3',
    title: 'Network Optimization & Security Closure',
    status: 'completed',
    icon: Network,
    items: [
      { text: 'SSS/DKG share encryption — XOR to AES-256-GCM' },
      { text: 'Kademlia DHT + NAT Traversal' },
      { text: 'GossipSub peer scoring' },
      { text: 'Real Ethereum settlement adapter (Alloy)' },
      { text: 'ML-KEM-768 key encapsulation (FIPS-203)' },
      { text: 'Fast-sync protocol with BLAKE3 checkpoints' },
      { text: 'Message compression (Snappy)' },
      { text: 'Load testing infrastructure' },
    ],
  },
  {
    number: '4',
    title: 'Mainnet Readiness',
    status: 'completed',
    icon: Rocket,
    items: [
      { text: 'Gradual slashing implementation — ADR-011' },
      { text: 'Fast-sync P2P automation' },
      { text: 'Multi-party trusted setup ceremony automation' },
      { text: 'Supply chain hardening (cargo-vet, cargo-deny, SBOM)' },
      { text: 'Documentation sprint — ADRs 015–021' },
    ],
  },
  {
    number: '5',
    title: 'Testnet Launch & Validation',
    status: 'completed',
    icon: FlaskConical,
    items: [
      { text: 'Real performance benchmarking (~7,190 events/sec sync; ~527 async)' },
      { text: 'Multi-node BFT testnet validation (3-node E2E)' },
      { text: 'VRF migration to ECVRF per RFC 9381' },
      { text: 'Genesis tooling — network bootstrap' },
      { text: 'Poseidon dual-hash transition foundation' },
      { text: 'Bug bounty program ($100–$50,000)' },
    ],
  },
  {
    number: '∞',
    title: 'Audit & Hardening',
    status: 'in-progress',
    icon: Search,
    items: [
      { text: '7 high-priority audit findings remediated' },
      { text: '1 medium-priority finding remediated' },
      { text: '14 medium-priority findings tracked' },
      { text: 'External security audit pending' },
    ],
  },
  {
    number: '6',
    title: 'Public Testnet',
    status: 'future',
    icon: Globe,
    items: [
      { text: 'Multi-node testnet, external audit' },
    ],
  },
  {
    number: '7',
    title: 'Mainnet',
    status: 'future',
    icon: Sparkles,
    items: [
      { text: 'Sybil resistance, GC, formal verification' },
    ],
  },
  {
    number: '8',
    title: 'Decentralization',
    status: 'future',
    icon: Cpu,
    items: [
      { text: 'Hardware mesh, production PoUW' },
    ],
  },
  {
    number: '9',
    title: 'Universality',
    status: 'future',
    icon: Atom,
    items: [
      { text: 'Relativistic consensus, physical-digital fusion' },
    ],
  },
]

const statusConfig = {
  completed: {
    circleColor: 'bg-omnia-sage',
    borderColor: 'border-omnia-sage/40',
    textColor: 'text-omnia-sage',
    badgeBg: 'bg-omnia-sage/10',
    badgeBorder: 'border-omnia-sage/30',
    badgeText: 'text-omnia-sage',
    lineColor: 'bg-omnia-sage/30',
    label: 'Complete',
  },
  'in-progress': {
    circleColor: 'bg-omnia-accent',
    borderColor: 'border-omnia-accent/40',
    textColor: 'text-omnia-accent',
    badgeBg: 'bg-[#2997FF]/10',
    badgeBorder: 'border-omnia-accent/30',
    badgeText: 'text-omnia-accent',
    lineColor: 'bg-omnia-accent/30',
    label: 'In Progress',
  },
  future: {
    circleColor: 'bg-omnia-text-secondary/30',
    borderColor: 'border-omnia-text-secondary/20',
    textColor: 'text-omnia-text-secondary/50',
    badgeBg: 'bg-omnia-text-secondary/5',
    badgeBorder: 'border-omnia-text-secondary/10',
    badgeText: 'text-omnia-text-secondary/50',
    lineColor: 'bg-omnia-text-secondary/10',
    label: 'Upcoming',
  },
}

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const [isOpen, setIsOpen] = useState(phase.status !== 'future')
  const config = statusConfig[phase.status]
  const Icon = phase.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
      className="relative flex gap-4 sm:gap-6"
    >
      {/* Timeline line + circle */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Circle */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 + 0.2, type: 'spring', stiffness: 200 }}
          className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full ${config.circleColor} flex items-center justify-center z-10 shadow-lg`}
        >
          {phase.status === 'completed' ? (
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-omnia-base" />
          ) : phase.status === 'in-progress' ? (
            <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-omnia-base animate-spin" style={{ animationDuration: '3s' }} />
          ) : (
            <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-omnia-text-secondary/40" />
          )}
          {/* Pulse ring for in-progress */}
          {phase.status === 'in-progress' && (
            <span className="absolute inset-0 rounded-full bg-omnia-accent/30 animate-ping" style={{ animationDuration: '2s' }} />
          )}
        </motion.div>

        {/* Line */}
        {index < phases.length - 1 && (
          <div className={`w-0.5 flex-1 min-h-[24px] ${config.lineColor}`} />
        )}
      </div>

      {/* Card */}
      <div className={`flex-1 pb-8 ${phase.status === 'future' ? 'opacity-50' : ''}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left group"
        >
          <div className={`rounded-2xl bg-white/[0.02] border ${config.borderColor} p-4 sm:p-5 hover:border-white/[0.12] transition-all duration-300 group-hover:shadow-lg group-hover:shadow-omnia-accent/5`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className={`flex-shrink-0 w-9 h-9 rounded-lg ${config.badgeBg} flex items-center justify-center`}>
                  <Icon className={`w-4.5 h-4.5 ${config.badgeText}`} />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`font-[family-name:var(--font-jetbrains-mono)] text-[12px] ${config.badgeText} font-medium`}>
                      {phase.number === '∞' ? 'Post-Phase 5' : `Phase ${phase.number}`}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${config.badgeBg} ${config.badgeBorder} ${config.badgeText}`}>
                      {config.label}
                    </span>
                  </div>
                  <h3 className={`text-[17px] sm:text-[19px] font-semibold tracking-tight font-[family-name:var(--font-space-grotesk)] ${phase.status === 'future' ? 'text-omnia-text-secondary' : 'text-omnia-text'}`}>
                    {phase.title}
                  </h3>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 mt-1"
              >
                <ChevronDown className="w-4 h-4 text-omnia-text-secondary" />
              </motion.div>
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <ul className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
                    {phase.items.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                        className="flex items-start gap-2.5 text-[14px] font-[family-name:var(--font-geist-sans)]"
                      >
                        <div className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 ${config.circleColor}`} />
                        <span className={`${phase.status === 'future' ? 'text-omnia-text-secondary/60' : 'text-omnia-text-secondary'}`}>
                          {item.text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>
      </div>
    </motion.div>
  )
}

export default function RoadmapPage() {
  const completedCount = phases.filter(p => p.status === 'completed').length
  const inProgressCount = phases.filter(p => p.status === 'in-progress').length

  return (
    <div className="min-h-screen bg-omnia-base flex flex-col">
      <PageHeader
        title="Roadmap"
        description="From seed to universality. Every phase completed, every milestone verified. Radical transparency means showing the work, not just the highlights."
        breadcrumbs={[{ label: 'Roadmap' }]}
      />

      {/* Summary stats */}
      <div className="max-w-[980px] mx-auto px-6 -mt-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-omnia-sage/20">
            <CheckCircle2 className="w-4 h-4 text-omnia-sage" />
            <span className="text-[14px] text-omnia-text-secondary font-[family-name:var(--font-geist-sans)]">{completedCount} phases complete</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-omnia-accent/20">
            <Loader2 className="w-4 h-4 text-omnia-accent" />
            <span className="text-[14px] text-omnia-text-secondary font-[family-name:var(--font-geist-sans)]">{inProgressCount} in progress</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-omnia-text-secondary/10">
            <Circle className="w-4 h-4 text-omnia-text-secondary/40" />
            <span className="text-[14px] text-omnia-text-secondary font-[family-name:var(--font-geist-sans)]">4 phases ahead</span>
          </div>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="max-w-[980px] mx-auto px-6 pb-24">
        <div className="relative">
          {phases.map((phase, index) => (
            <PhaseCard key={`${phase.number}-${phase.title}`} phase={phase} index={index} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
