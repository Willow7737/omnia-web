'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
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
    <section id="architecture" className="section-paper section-spacing px-6">
      <div className="max-w-[680px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-sans text-[40px] sm:text-[56px] md:text-[64px] font-bold tracking-[-0.03em] leading-[1.1] text-foreground mb-4">
            Six layers.
          </h2>
          <p className="text-[17px] sm:text-[19px] text-muted-foreground mb-14 font-sans">
            Every layer implemented. Every layer tested.
          </p>
        </motion.div>

        {/* Vertical stack of layers with connecting lines */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden sm:block" />

          <div className="flex flex-col gap-0 mb-14">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group relative"
              >
                <div className="flex items-start gap-5 py-5 border-b border-border last:border-b-0">
                  {/* Layer indicator with dot on connecting line */}
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <span className="font-mono text-[13px] font-bold text-primary">
                        {layer.label}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="font-sans text-[17px] font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {layer.name}
                      </span>
                      <span className="text-[11px] font-sans px-2.5 py-0.5 rounded-full bg-success/10 text-success">
                        {layer.badge}
                      </span>
                    </div>
                    <p className="text-[14px] text-muted-foreground leading-[1.5] font-sans">
                      {layer.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Link
            href="/architecture"
            className="inline-flex items-center gap-2 text-[14px] font-sans text-primary hover:text-primary/80 transition-colors group"
          >
            Explore Full Architecture
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
