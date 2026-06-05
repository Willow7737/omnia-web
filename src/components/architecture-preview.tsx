'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface LayerData {
  id: string
  name: string
  label: string
  badge: string
  description: string
}

const layers: LayerData[] = [
  {
    id: 'l5',
    name: 'Economics',
    label: 'L5',
    badge: 'Implemented',
    description: 'UBC, quadratic voting, exponential reputation decay, and time-locked governance.',
  },
  {
    id: 'l4',
    name: 'Identity',
    label: 'L4',
    badge: 'Implemented',
    description: 'did:omnia: method, Shamir\'s Secret Sharing, BLAKE3 biometric anchors.',
  },
  {
    id: 'l3',
    name: 'Binding',
    label: 'L3',
    badge: 'Implemented',
    description: 'Append-only CRDT provenance, hybrid PQC signatures, RF fingerprinting stubs.',
  },
  {
    id: 'l2',
    name: 'Domain Shards',
    label: 'L2',
    badge: 'Implemented',
    description: '6 specialized state machines — Financial, Identity, Physical, Computational, Biological, Economics.',
  },
  {
    id: 'l1',
    name: 'Causal Graph Substrate',
    label: 'L1',
    badge: 'Implemented',
    description: 'Causal DAG + vector clocks + Hashgraph two-parent events + AlephBFT BFT finality.',
  },
  {
    id: 'l0',
    name: 'ZK-Rollup Settlement',
    label: 'L0',
    badge: 'Implemented',
    description: 'arkworks R1CS + Groth16 on BN254. Ethereum and Celestia adapters live.',
  },
]

export function ArchitecturePreview() {
  return (
    <section id="architecture" className="section-padding px-6">
      <div className="max-w-[680px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-[40px] sm:text-[48px] font-bold tracking-[-0.03em] text-[#F5F5F7] mb-3">
            Six layers.
          </h2>
          <p className="text-[15px] text-[#86868B] mb-10 font-[family-name:var(--font-geist-sans)]">
            Every layer implemented. Every layer tested.
          </p>
        </motion.div>

        <div className="flex flex-col gap-1 mb-10">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group"
            >
              <div className="flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-200 bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]">
                <div className="flex items-center gap-4">
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[12px] text-[#86868B] w-8">
                    {layer.label}
                  </span>
                  <span className="font-[family-name:var(--font-space-grotesk)] text-[14px] font-medium text-[#F5F5F7] tracking-tight">
                    {layer.name}
                  </span>
                </div>
                <span className="text-[11px] font-[family-name:var(--font-space-grotesk)] px-2.5 py-1 rounded-full bg-[#30D158]/10 text-[#30D158]">
                  {layer.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <a
            href="/architecture"
            className="inline-flex items-center gap-2 text-[14px] font-[family-name:var(--font-space-grotesk)] text-[#2997FF] hover:text-[#5eb8ff] transition-colors group"
          >
            Explore Full Architecture
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
