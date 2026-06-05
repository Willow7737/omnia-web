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

function statusColor(status: StubRow['status']) {
  const styles: Record<StubRow['status'], { text: string; dot: string }> = {
    Stub: { text: 'text-[#6E6E73]', dot: 'bg-[#6E6E73]' },
    Partial: { text: 'text-[#FF9F0A]', dot: 'bg-[#FF9F0A]' },
    'Not Started': { text: 'text-[#AEAEB2]', dot: 'bg-[#AEAEB2]' },
  }
  return styles[status]
}

export function TransparencySection() {
  return (
    <section id="transparency" className="section-light section-spacing px-6">
      <div className="max-w-[680px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-[40px] sm:text-[56px] md:text-[64px] font-bold tracking-[-0.03em] leading-[1.1] text-[#1D1D1F] mb-4">
            Radical transparency.
          </h2>
          <p className="text-[17px] sm:text-[19px] text-[#6E6E73] leading-[1.5] mb-12 font-[family-name:var(--font-geist-sans)]">
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
          <div className="hidden sm:grid grid-cols-[1fr_60px_100px_80px] gap-4 px-0 py-2 text-[11px] text-[#6E6E73] uppercase tracking-wider font-[family-name:var(--font-space-grotesk)]">
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
                    i < stubData.length - 1 ? 'border-b border-[rgba(0,0,0,0.06)]' : ''
                  }`}
                >
                  <span className="text-[15px] sm:text-[17px] text-[#1D1D1F] font-[family-name:var(--font-geist-sans)]">{row.feature}</span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[13px] text-[#6E6E73]">
                    {row.layer}
                  </span>
                  <span className={`flex items-center gap-1.5 text-[13px] font-[family-name:var(--font-space-grotesk)] ${s.text}`}>
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {row.status}
                  </span>
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[13px] text-[#6E6E73]">
                    {row.phase}
                  </span>
                </div>
              )
            })}
          </div>

          <p className="text-[13px] sm:text-[14px] text-[#6E6E73] mt-6 leading-relaxed font-[family-name:var(--font-geist-sans)]">
            Celestia Settlement (L0) is fully implemented. Ethereum adapter is live. All other settlement targets are stubbed.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
