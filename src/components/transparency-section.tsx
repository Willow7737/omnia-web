'use client'

import { motion } from 'framer-motion'

interface StubRow {
  feature: string
  layer: string
  status: 'Stub' | 'Partial' | 'Not Started'
  phase: string
}

const stubData: StubRow[] = [
  { feature: 'RF Fingerprinting', layer: 'L3', status: 'Stub', phase: 'Phase 1' },
  { feature: 'Proof-of-Useful-Work', layer: 'L5', status: 'Partial', phase: 'Phase 2' },
  { feature: 'Bitcoin Settlement', layer: 'L0', status: 'Stub', phase: 'Phase 1' },
  { feature: 'Solana Settlement', layer: 'L0', status: 'Stub', phase: 'Phase 1' },
  { feature: 'Cosmos Settlement', layer: 'L0', status: 'Stub', phase: 'Phase 1' },
  { feature: 'Mobile Wallet', layer: '—', status: 'Not Started', phase: 'Phase 1' },
  { feature: 'Validator Network', layer: '—', status: 'Not Started', phase: 'Phase 1' },
  { feature: 'Conviction Voting', layer: 'L5', status: 'Not Started', phase: 'Phase 1' },
  { feature: 'Delegation', layer: 'L5', status: 'Not Started', phase: 'Phase 1' },
]

function statusBadge(status: StubRow['status']) {
  const styles: Record<StubRow['status'], { bg: string; text: string }> = {
    Stub: { bg: 'rgba(163, 155, 146, 0.2)', text: '#A39B92' },
    Partial: { bg: 'rgba(212, 165, 116, 0.2)', text: '#D4A574' },
    'Not Started': { bg: 'rgba(163, 155, 146, 0.1)', text: '#6B6560' },
  }
  const s = styles[status]
  return (
    <span
      className="text-xs font-[family-name:var(--font-space-grotesk)] px-2.5 py-0.5 rounded-full whitespace-nowrap"
      style={{ background: s.bg, color: s.text }}
    >
      {status}
    </span>
  )
}

export function TransparencySection() {
  return (
    <section id="transparency" className="section-padding px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#F5F0EB] mb-3">
            Radical Transparency
          </h2>
          <p className="text-[#A39B92] leading-relaxed mb-10">
            No protocol should claim completeness it hasn&apos;t earned. Here&apos;s what&apos;s stubbed, partial, or not yet started.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          {/* Header row */}
          <div
            className="hidden sm:grid grid-cols-[1fr_60px_100px_80px] gap-4 px-5 py-2 border-b text-xs text-[#A39B92] uppercase tracking-wider font-[family-name:var(--font-space-grotesk)]"
            style={{ borderColor: 'rgba(212, 165, 116, 0.15)' }}
          >
            <span>Feature</span>
            <span>Layer</span>
            <span>Status</span>
            <span>Phase</span>
          </div>

          {/* Data rows */}
          <div className="border rounded-md overflow-hidden" style={{ borderColor: 'rgba(212, 165, 116, 0.15)' }}>
            {stubData.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-1 sm:grid-cols-[1fr_60px_100px_80px] gap-1 sm:gap-4 px-5 py-3 ${
                  i < stubData.length - 1 ? 'border-b' : ''
                }`}
                style={{
                  borderColor: 'rgba(212, 165, 116, 0.1)',
                  background: i % 2 === 0 ? 'rgba(26, 26, 26, 0.3)' : 'transparent',
                }}
              >
                <span className="text-sm text-[#F5F0EB]">{row.feature}</span>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#A39B92]">
                  {row.layer}
                </span>
                <span>{statusBadge(row.status)}</span>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs text-[#A39B92]">
                  {row.phase}
                </span>
              </div>
            ))}
          </div>

          {/* Note */}
          <p className="text-xs text-[#A39B92] mt-4 leading-relaxed">
            Celestia Settlement (L0) is fully implemented. Ethereum adapter is live. All other settlement targets are stubbed.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
