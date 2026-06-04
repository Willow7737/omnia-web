'use client'

import { motion } from 'framer-motion'
import { GitBranch, Layers, ShieldCheck, Fingerprint, Cpu, Bot } from 'lucide-react'

const features = [
  {
    icon: GitBranch,
    title: 'Causal Graph Consensus',
    description: 'DAG + vector clocks + CRDTs for parallel transaction processing with sub-100µs finality and deterministic convergence.',
  },
  {
    icon: Layers,
    title: 'ZK-Rollup Settlement',
    description: 'Settlement-agnostic rollups on any DA layer — Ethereum, Celestia, and more. Groth16 proofs on BN254.',
  },
  {
    icon: ShieldCheck,
    title: 'Post-Quantum Security',
    description: 'CRYSTALS-Dilithium + Ed25519 hybrid signatures. Forward-compatible cryptographic agility at the protocol layer.',
  },
  {
    icon: Fingerprint,
    title: 'Self-Sovereign Identity',
    description: 'did:omnia: method with Shamir\'s Secret Sharing recovery and BLAKE3 biometric anchors. Identity you can lose and reclaim.',
  },
  {
    icon: Cpu,
    title: 'Universal Basic Compute',
    description: 'Soulbound monthly quotas, quadratic voting with exponential reputation decay, and time-locked governance.',
  },
  {
    icon: Bot,
    title: 'Agent Coordination',
    description: 'AI agents with delegated did:omnia: identity, 5 capability types, and least privilege enforced by construction.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function FeaturesSection() {
  return (
    <section id="features" className="section-padding px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#F5F0EB] mb-3">
            Core Protocol Features
          </h2>
          <p className="text-[#A39B92] leading-relaxed max-w-xl mx-auto">
            Six pillars of infrastructure — from consensus to identity, every layer is built with mathematical guarantees.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group border rounded-lg p-6 transition-all duration-200 hover:border-[rgba(212,165,116,0.3)]"
              style={{
                borderColor: 'rgba(212, 165, 116, 0.15)',
                background: 'rgba(26, 26, 26, 0.4)',
              }}
            >
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-md bg-[rgba(212,165,116,0.1)] text-[#D4A574] group-hover:bg-[rgba(212,165,116,0.2)] transition-colors">
                <feature.icon size={20} />
              </div>
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-[#F5F0EB] mb-2 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-[#A39B92] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
