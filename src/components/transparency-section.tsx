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
    Stub: { bg: 'bg-white/[0.06]', text: 'text-[#86868B]' },
    Partial: { bg: 'bg-[#FF9F0A]/10', text: 'text-[#FF9F0A]' },
    'Not Started': { bg: 'bg-white/[0.03]', text: 'text-[#48484A]' },
  }
  const s = styles[status]
  return (
    <span
      className={`text-[11px] font-[family-name:var(--font-space-grotesk)] px-2.5 py-0.5 rounded-full whitespace-nowrap ${s.bg} ${s.text}`}
    >
      {status}
    </span>
  )
}

export function TransparencySection() {
  return (
    <section id="transparency" className="section-padding px-6">
      <div className="max-w-[680px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-[40px] sm:text-[48px] font-bold tracking-[-0.03em] text-[#F5F5F7] mb-3">
            Radical transparency.
          </h2>
          <p className="text-[15px] text-[#86868B] leading-relaxed mb-10 font-[family-name:var(--font-geist-sans)]">
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
          <div className="hidden sm:grid grid-cols-[1fr_60px_100px_80px] gap-4 px-5 py-2 text-[11px] text-[#86868B] uppercase tracking-wider font-[family-name:var(--font-space-grotesk)]">
            <span>Feature</span>
            <span>Layer</span>
            <span>Status</span>
            <span>Phase</span>
          </div>

          {/* Data rows */}
          <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
            {stubData.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-1 sm:grid-cols-[1fr_60px_100px_80px] gap-1 sm:gap-4 px-5 py-3.5 ${
                  i < stubData.length - 1 ? 'border-b border-white/[0.04]' : ''
                }`}
              >
                <span className="text-[14px] text-[#F5F5F7] font-[family-name:var(--font-geist-sans)]">{row.feature}</span>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[12px] text-[#86868B]">
                  {row.layer}
                </span>
                <span>{statusBadge(row.status)}</span>
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[12px] text-[#86868B]">
                  {row.phase}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[12px] text-[#86868B] mt-4 leading-relaxed font-[family-name:var(--font-geist-sans)]">
            Celestia Settlement (L0) is fully implemented. Ethereum adapter is live. All other settlement targets are stubbed.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
