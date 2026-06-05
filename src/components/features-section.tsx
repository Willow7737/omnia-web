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
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function FeaturesSection() {
  return (
    <section id="features" className="section-padding px-6">
      <div className="max-w-[980px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-[40px] sm:text-[48px] font-bold tracking-[-0.03em] text-[#F5F5F7] mb-3">
            Built different.
          </h2>
          <p className="text-[17px] text-[#86868B] leading-relaxed max-w-[480px] mx-auto font-[family-name:var(--font-geist-sans)]">
            Six pillars of infrastructure. Every layer built with mathematical guarantees.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group rounded-2xl p-6 transition-all duration-300 bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]"
            >
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#2997FF]/10 text-[#2997FF] group-hover:bg-[#2997FF]/15 transition-colors">
                <feature.icon size={20} />
              </div>
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-[15px] font-semibold text-[#F5F5F7] mb-2 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-[13px] text-[#86868B] leading-[1.5] font-[family-name:var(--font-geist-sans)]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
