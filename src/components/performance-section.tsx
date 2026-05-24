'use client'

import { motion } from 'framer-motion'
import { AnimatedNumber } from './animated-number'

interface MetricRow {
  metric: string
  value: number
  unit: string
  decimals?: number
}

const mainMetrics: MetricRow[] = [
  { metric: 'Sustained TPS (single-node)', value: 7190, unit: 'events/sec', decimals: 0 },
  { metric: 'Finality Latency p50', value: 93.47, unit: 'µs', decimals: 2 },
  { metric: 'Finality Latency p99', value: 177.06, unit: 'µs', decimals: 2 },
  { metric: 'ZK Proof Verify', value: 2.67, unit: 'ms', decimals: 2 },
  { metric: 'DAG Insert p50', value: 18.09, unit: 'µs', decimals: 2 },
  { metric: 'Gossip Propagation p50', value: 38.93, unit: 'µs', decimals: 2 },
  { metric: 'VRF Compute', value: 18.73, unit: 'µs', decimals: 2 },
]

const zkMetrics: MetricRow[] = [
  { metric: 'Groth16 proof gen (basic)', value: 1.73, unit: 'ms', decimals: 2 },
  { metric: 'Groth16 proof gen (expanded, 4 events)', value: 317.01, unit: 'ms', decimals: 2 },
  { metric: 'Merkle tree build (64 leaves)', value: 348.0, unit: 'µs', decimals: 2 },
]

function MetricTable({ metrics, title }: { metrics: MetricRow[]; title?: string }) {
  return (
    <div>
      {title && (
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-sm font-medium text-[#A39B92] mb-4 tracking-tight">
          {title}
        </h3>
      )}
      <div className="border rounded-md overflow-hidden" style={{ borderColor: 'rgba(212, 165, 116, 0.15)' }}>
        {metrics.map((row, i) => (
          <div
            key={row.metric}
            className={`flex items-center justify-between px-5 py-3 ${
              i < metrics.length - 1 ? 'border-b' : ''
            }`}
            style={{
              borderColor: 'rgba(212, 165, 116, 0.1)',
              background: i % 2 === 0 ? 'rgba(26, 26, 26, 0.3)' : 'transparent',
            }}
          >
            <span className="text-sm text-[#A39B92] leading-relaxed">{row.metric}</span>
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#F5F0EB] shrink-0 ml-6">
              <AnimatedNumber value={row.value} decimals={row.decimals ?? 0} duration={2500} />{' '}
              <span className="text-[#A39B92]">{row.unit}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PerformanceSection() {
  return (
    <section id="performance" className="section-padding px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#F5F0EB] mb-2">
            Performance Baseline
          </h2>
          <p className="text-sm text-[#A39B92] mb-10">
            Consensus throughput benchmarks from v0.1.48 single-node tests
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="space-y-8"
        >
          <MetricTable metrics={mainMetrics} />
          <MetricTable metrics={zkMetrics} title="ZK Performance" />
        </motion.div>
      </div>
    </section>
  )
}
