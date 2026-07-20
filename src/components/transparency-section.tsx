'use client'

import { motion } from 'framer-motion'

interface StubRow {
  feature: string
  layer: string
  status: 'Stub' | 'Partial' | 'Not Started'
  phase: string
}

// Shipped items graduate OUT of this table (mobile wallet, validator
// network, public testnet — all live as of July 2026); it lists only what
// is still stubbed, partial, or not started. Source of truth:
// omnia-protocol/docs/stub-inventory.md
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

function statusColor(status: StubRow['status']) {
  const styles: Record<StubRow['status'], { text: string; dot: string }> = {
    Stub: { text: 'text-muted-foreground', dot: 'bg-muted-foreground' },
    Partial: { text: 'text-warning', dot: 'bg-warning' },
    'Not Started': { text: 'text-muted-foreground/60', dot: 'bg-muted-foreground/60' },
  }
  return styles[status]
}

export function TransparencySection() {
  return (
    <section id="transparency" className="section-white section-spacing px-6">
      <div className="max-w-[680px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-sans text-[40px] sm:text-[56px] md:text-[64px] font-bold tracking-[-0.03em] leading-[1.1] text-foreground mb-4">
            Radical transparency.
          </h2>
          <p className="text-[17px] sm:text-[19px] text-muted-foreground leading-[1.5] mb-12 font-sans">
            No protocol should claim completeness it hasn&apos;t earned. Here&apos;s what&apos;s stubbed, partial, or not yet started.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Header row */}
          <div className="hidden sm:grid grid-cols-[1fr_60px_100px_80px] gap-4 px-0 py-2 text-[11px] text-muted-foreground uppercase tracking-wider font-sans">
            <span>Feature</span>
            <span>Layer</span>
            <span>Status</span>
            <span>Phase</span>
          </div>

          {/* Data rows — clean, Apple specs page style */}
          <div className="overflow-hidden">
            {stubData.map((row, i) => {
              const s = statusColor(row.status)
              return (
                <div
                  key={row.feature}
                  className={`grid grid-cols-1 sm:grid-cols-[1fr_60px_100px_80px] gap-1 sm:gap-4 py-3.5 ${
                    i < stubData.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <span className="text-[15px] sm:text-[17px] text-foreground font-sans">{row.feature}</span>
                  <span className="font-mono text-[13px] text-muted-foreground">
                    {row.layer}
                  </span>
                  <span className={`flex items-center gap-1.5 text-[13px] font-sans ${s.text}`}>
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {row.status}
                  </span>
                  <span className="font-mono text-[13px] text-muted-foreground">
                    {row.phase}
                  </span>
                </div>
              )
            })}
          </div>

          <p className="text-[13px] sm:text-[14px] text-muted-foreground mt-6 leading-relaxed font-sans">
            The Ethereum settlement adapter is live; Bitcoin, Solana, and Celestia targets are stubs. The multi-node validator testnet, mobile wallet, and web dashboard shipped in July 2026 and have graduated off this list.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
