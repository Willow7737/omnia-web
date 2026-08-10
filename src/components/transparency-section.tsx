'use client'

import { motion } from 'framer-motion'

interface StubRow {
  feature: string
  layer: string
  status: 'Stub' | 'Partial' | 'Not Started'
  phase: string
}

const stubData: StubRow[] = [
  { feature: 'External security audit', layer: '—', status: 'Not Started', phase: 'Phase 6' },
  { feature: 'Permanent geo network (WAN campaign done)', layer: '—', status: 'Partial', phase: 'Phase 6' },
  { feature: 'Bitcoin Settlement', layer: 'L0', status: 'Stub', phase: 'Phase 7' },
  { feature: 'Solana Settlement', layer: 'L0', status: 'Stub', phase: 'Phase 7' },
  { feature: 'Celestia Settlement', layer: 'L0', status: 'Stub', phase: 'Phase 7' },
  { feature: 'RF Fingerprinting', layer: 'L3', status: 'Stub', phase: 'Phase 7' },
  { feature: 'Proof-of-Useful-Work', layer: 'L5', status: 'Stub', phase: 'Phase 8' },
  { feature: 'Conviction Voting', layer: 'L5', status: 'Not Started', phase: 'Phase 7' },
  { feature: 'Delegation', layer: 'L5', status: 'Not Started', phase: 'Phase 7' },
]

function statusStyle(status: StubRow['status']) {
  const styles: Record<StubRow['status'], { text: string; dot: string; bg: string; border: string }> = {
    Stub: {
      text: 'text-muted-foreground',
      dot: 'bg-muted-foreground',
      bg: 'bg-muted/10',
      border: 'border-muted/20',
    },
    Partial: {
      text: 'text-warning',
      dot: 'bg-warning',
      bg: 'bg-warning/10',
      border: 'border-warning/20',
    },
    'Not Started': {
      text: 'text-muted-foreground/60',
      dot: 'bg-muted-foreground/60',
      bg: 'bg-muted/5',
      border: 'border-muted/10',
    },
  }
  return styles[status]
}

const D_NORMAL = 0.26
const EASE = [0.25, 0.46, 0.45, 0.94] as const

export function TransparencySection() {
  return (
    <section id="transparency" className="section-white section-spacing px-6 relative overflow-hidden">
      <div className="max-w-[720px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: D_NORMAL, ease: EASE }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 font-mono text-[11.3px] text-muted-foreground lowercase mb-6">
            radical transparency
          </span>
          <h2 className="font-display text-[37.5px] sm:text-[47.5px] md:text-[60px] font-bold leading-[1.05] text-foreground mb-4">
            What&apos;s not done.
          </h2>
          <p className="text-[16.9px] sm:text-[18.8px] text-muted-foreground leading-[1.5]">
            No protocol should claim completeness it hasn&apos;t earned. Here&apos;s what&apos;s stubbed, partial, or not yet started.
          </p>
        </motion.div>

        {/* Table — card with rows */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: D_NORMAL, delay: 0.1, ease: EASE }}
          className="border-gradient rounded-xl bg-card/40 border border-border overflow-hidden"
        >
          {/* Header row */}
          <div className="hidden sm:grid grid-cols-[1fr_60px_120px_80px] gap-4 px-5 py-3 text-[11.3px] text-muted-foreground uppercase border-b border-border bg-muted/30">
            <span>Feature</span>
            <span>Layer</span>
            <span>Status</span>
            <span>Phase</span>
          </div>

          {/* Data rows */}
          <div>
            {stubData.map((row, i) => {
              const s = statusStyle(row.status)
              return (
                <div
                  key={row.feature}
                  className={`grid grid-cols-1 sm:grid-cols-[1fr_60px_120px_80px] gap-1 sm:gap-4 px-5 py-3.5 ${
                    i < stubData.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <span className="text-[15px] sm:text-[16.9px] text-foreground">{row.feature}</span>
                  <span className="font-mono text-[13.1px] text-muted-foreground">
                    {row.layer}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11.3px] font-mono ${s.bg} ${s.text} ${s.border} border`}>
                      <span className={`size-1.5 rounded-full ${s.dot}`} />
                      {row.status}
                    </span>
                  </span>
                  <span className="font-mono text-[13.1px] text-muted-foreground">
                    {row.phase}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: D_NORMAL, delay: 0.2 }}
          className="text-[13.1px] sm:text-[14px] text-muted-foreground mt-6 leading-[1.6]"
        >
          The Ethereum settlement adapter is live; Bitcoin, Solana, and Cosmos are stubs, and the Celestia adapter is unverified plumbing that has never run against a real Celestia node. The mobile wallet and web dashboard shipped in July 2026 and have graduated off this list. A standing 5-node geo-distributed validator mesh is now running — but all five nodes are operated by the same party, so the network is geo-distributed but not yet trust-distributed. Independent validators remain open.
        </motion.p>
      </div>
    </section>
  )
}
