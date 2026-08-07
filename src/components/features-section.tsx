'use client'

import { motion } from 'framer-motion'

const features = [
  {
    title: 'Causal Graph Consensus',
    description: 'DAG + vector clocks + CRDTs for parallel transaction processing with 24.5 µs p50 single-node finality and deterministic convergence.',
  },
  {
    title: 'ZK-Rollup Settlement',
    description: 'Settlement-agnostic rollups on any DA layer — Ethereum, Celestia, and more. Groth16 proofs on BN254.',
  },
  {
    title: 'Post-Quantum Security',
    description: 'CRYSTALS-Dilithium + Ed25519 hybrid signatures. Forward-compatible cryptographic agility at the protocol layer.',
  },
  {
    title: 'Self-Sovereign Identity',
    description: 'did:omnia: method with Shamir\'s Secret Sharing recovery and BLAKE3 biometric anchors. Identity you can lose and reclaim.',
  },
  {
    title: 'Universal Basic Compute',
    description: 'Soulbound monthly quotas, quadratic voting with exponential reputation decay, and time-locked governance.',
  },
  {
    title: 'Agent Coordination',
    description: 'AI agents with delegated did:omnia: identity, 5 capability types, and least privilege enforced by construction.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="section-white section-spacing px-6">
      <div className="max-w-[980px] mx-auto">
        {/* Section header — big, bold, editorial */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 sm:mb-20"
        >
          <h2 className="font-sans text-[40px] sm:text-[56px] md:text-[64px] font-bold tracking-[-0.03em] leading-[1.1] text-foreground mb-4">
            Built different.
          </h2>
          <p className="text-[17px] sm:text-[19px] text-muted-foreground leading-[1.5] max-w-[520px] font-sans">
            Six pillars of infrastructure. Every layer built with mathematical guarantees.
          </p>
        </motion.div>

        {/* Feature list — editorial, no cards */}
        <div className="space-y-0">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`group flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-12 py-8 ${
                i < features.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="sm:w-[320px] md:w-[380px] shrink-0">
                <h3 className="font-sans text-[17px] sm:text-[19px] font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
              </div>
              <p className="text-[15px] sm:text-[17px] text-muted-foreground leading-[1.6] font-sans">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
