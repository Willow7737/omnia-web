'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

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
    description:
      'Universal Basic Compute with soulbound quotas, quadratic voting with exponential reputation decay, and time-locked governance.',
  },
  {
    id: 'l4',
    name: 'Identity',
    label: 'L4',
    badge: 'Implemented',
    description:
      'did:omnia: identity method, Shamir\'s Secret Sharing recovery, BLAKE3 biometric anchors, and AI agent capability attestation.',
  },
  {
    id: 'l3',
    name: 'Binding',
    label: 'L3',
    badge: 'Implemented',
    description:
      'Append-only CRDT provenance log, hybrid PQC signatures (Ed25519 + CRYSTALS-Dilithium), and RF fingerprinting stubs.',
  },
  {
    id: 'l2',
    name: 'Domain Shards',
    label: 'L2',
    badge: 'Implemented',
    description:
      'Six specialized state machines — Financial, Identity, Physical, Computational, Biological, Economics — with cross-shard causality proofs.',
  },
  {
    id: 'l1',
    name: 'Causal Graph Substrate',
    label: 'L1',
    badge: 'Implemented',
    description:
      'Causal DAG with vector clock ordering, Hashgraph-like two-parent events, AlephBFT-inspired BFT finality, and CRDT state convergence.',
  },
  {
    id: 'l0',
    name: 'ZK-Rollup Settlement',
    label: 'L0',
    badge: 'Implemented',
    description:
      'Settlement-agnostic rollup using arkworks R1CS + Groth16 on BN254, with Ethereum and Celestia adapters live.',
  },
]

function LayerCard({ layer, index }: { layer: LayerData; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-default"
    >
      <div
        className="flex items-center justify-between px-5 py-4 border rounded-md transition-colors duration-200 hover:border-[rgba(212,165,116,0.3)]"
        style={{
          background: hovered ? 'rgba(26, 26, 26, 0.8)' : 'rgba(26, 26, 26, 0.4)',
          borderColor: 'rgba(212, 165, 116, 0.15)',
        }}
      >
        <div className="flex items-center gap-4">
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#A39B92] w-8">
            {layer.label}
          </span>
          <span className="font-[family-name:var(--font-space-grotesk)] text-sm font-medium text-[#F5F0EB] tracking-tight">
            {layer.name}
          </span>
        </div>
        <span
          className="text-xs font-[family-name:var(--font-space-grotesk)] px-2.5 py-0.5 rounded-full"
          style={{
            background: 'rgba(140, 158, 142, 0.2)',
            color: '#8C9E8E',
          }}
        >
          {layer.badge}
        </span>
      </div>
      {hovered && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="text-sm text-[#A39B92] leading-relaxed pl-[3.5rem] pr-5 pt-2 pb-1"
        >
          {layer.description}
        </motion.p>
      )}
    </motion.div>
  )
}

export function ArchitectureSection() {
  return (
    <section id="architecture" className="section-padding px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#F5F0EB] mb-3">
            Architecture Stack
          </h2>
          <p className="text-sm text-[#A39B92] mb-10">
            Hover each layer for details. All six layers are implemented in the v0.1.60 codebase.
          </p>
        </motion.div>

        <div className="flex flex-col gap-2">
          {layers.map((layer, i) => (
            <LayerCard key={layer.id} layer={layer} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
