'use client'

import { motion } from 'framer-motion'
import {
  Network,
  Layers,
  ShieldCheck,
  Fingerprint,
  Vote,
  Bot,
} from 'lucide-react'

const features = [
  {
    icon: Network,
    title: 'Causal Graph Consensus',
    description: 'DAG + vector clocks + CRDTs for parallel transaction processing with 24.5 µs p50 single-node finality and deterministic convergence.',
    tag: 'L1',
  },
  {
    icon: Layers,
    title: 'ZK-Rollup Settlement',
    description: 'Settlement-agnostic rollups on any DA layer — Ethereum, Celestia, and more. Groth16 proofs on BN254.',
    tag: 'L0',
  },
  {
    icon: ShieldCheck,
    title: 'Post-Quantum Security',
    description: 'CRYSTALS-Dilithium + Ed25519 hybrid signatures. Forward-compatible cryptographic agility at the protocol layer.',
    tag: 'L3',
  },
  {
    icon: Fingerprint,
    title: 'Self-Sovereign Identity',
    description: 'did:omnia: method with Shamir\'s Secret Sharing recovery and BLAKE3 biometric anchors. Identity you can lose and reclaim.',
    tag: 'L4',
  },
  {
    icon: Vote,
    title: 'Universal Basic Compute',
    description: 'Soulbound monthly quotas, quadratic voting with exponential reputation decay, and time-locked governance.',
    tag: 'L5',
  },
  {
    icon: Bot,
    title: 'Agent Coordination',
    description: 'AI agents with delegated did:omnia: identity, 5 capability types, and least privilege enforced by construction.',
    tag: 'L5',
  },
]

const D_NORMAL = 0.26
const EASE = [0.25, 0.46, 0.45, 0.94] as const

export function FeaturesSection() {
  return (
    <section id="features" className="section-white section-spacing px-6 relative overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="grid-bg absolute inset-0 [mask-image:linear-gradient(180deg,transparent,black_20%,black_80%,transparent)] pointer-events-none"
        aria-hidden
      />
      <div className="max-w-[980px] mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: D_NORMAL, ease: EASE }}
          className="mb-16 sm:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 font-mono text-[11.3px] text-muted-foreground lowercase mb-6">
            six pillars
          </span>
          <h2 className="font-display text-[37.5px] sm:text-[47.5px] md:text-[60px] font-bold leading-[1.05] text-foreground mb-4">
            Built different.
          </h2>
          <p className="text-[16.9px] sm:text-[18.8px] text-muted-foreground leading-[1.5] max-w-[520px]">
            Six layers of infrastructure. Every layer built with mathematical guarantees — not trust, not marketing.
          </p>
        </motion.div>

        {/* Feature card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: D_NORMAL, delay: i * 0.06, ease: EASE }}
                className="card-hover hover:card-hover-hover border-gradient group relative rounded-xl p-6 bg-card/50 border border-border"
              >
                {/* Icon + layer badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 group-hover:border-primary/30 transition-colors">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <span className="font-mono text-[11.3px] text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                    {feature.tag}
                  </span>
                </div>
                {/* Title + description */}
                <h3 className="font-display text-[18.8px] font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-[13.1px] sm:text-[14px] text-muted-foreground leading-[1.55]">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
