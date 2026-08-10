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

const D_NORMAL = 0.26
const EASE = [0.25, 0.46, 0.45, 0.94] as const

export function ArchitecturePreview() {
  return (
    <section id="architecture" className="section-paper section-spacing px-6 relative overflow-hidden">
      {/* Blue glow at the base (settlement layer) */}
      <div
        className="glow-primary absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none opacity-60"
        aria-hidden
      />
      <div className="max-w-[720px] mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: D_NORMAL, ease: EASE }}
          className="mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 font-mono text-[11.3px] text-muted-foreground lowercase mb-6">
            the stack
          </span>
          <h2 className="font-display text-[37.5px] sm:text-[47.5px] md:text-[60px] font-bold leading-[1.05] text-foreground mb-4">
            Six layers.
          </h2>
          <p className="text-[16.9px] sm:text-[18.8px] text-muted-foreground leading-[1.5]">
            Every layer implemented. Every layer tested. From the ZK settlement base to the governance top.
          </p>
        </motion.div>

        {/* Layered stack — visual diagram with depth */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40 hidden sm:block" aria-hidden />

          <div className="flex flex-col gap-2 mb-14">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: D_NORMAL, delay: i * 0.08, ease: EASE }}
                className="card-hover hover:card-hover-hover group relative flex items-start gap-4 p-4 rounded-xl border border-border bg-card/40 hover:bg-card/60"
              >
                {/* Layer indicator */}
                <div className="relative shrink-0">
                  <div className="size-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 group-hover:border-primary/40 transition-colors">
                    <span className="font-mono text-[15px] font-bold text-primary">
                      {layer.label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-1.5">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-display text-[16.9px] sm:text-[18.8px] font-semibold text-foreground group-hover:text-primary transition-colors">
                      {layer.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[11.3px] font-mono px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/20">
                      <span className="size-1 rounded-full bg-success" />
                      {layer.badge}
                    </span>
                  </div>
                  <p className="text-[13.1px] sm:text-[14px] text-muted-foreground leading-[1.5]">
                    {layer.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: D_NORMAL, delay: 0.3 }}
        >
          <Link
            href="/architecture"
            className="pressable active:pressable-active inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-medium text-primary border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors group"
          >
            Explore Full Architecture
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
