'use client'

import { motion } from 'framer-motion'
import { AnimatedNumber } from './animated-number'
import { useOmniaMetrics } from '@/hooks/use-omnia-data'

interface MetricRow {
  metric: string
  value: number
  unit: string
  decimals?: number
  liveKey?: string
}

// Benchmark data from v0.1.67 single-node tests (originally measured v0.1.48)
const mainMetrics: MetricRow[] = [
  { metric: 'Sustained TPS (single-node)', value: 7190, unit: 'events/sec', decimals: 0, liveKey: 'tps' },
  { metric: 'Finality Latency p50', value: 93.47, unit: 'µs', decimals: 2, liveKey: 'p50Latency' },
  { metric: 'Finality Latency p95', value: 154.76, unit: 'µs', decimals: 2 },
  { metric: 'Finality Latency p99', value: 177.06, unit: 'µs', decimals: 2, liveKey: 'p99Latency' },
  { metric: 'DAG Insert p50', value: 18.09, unit: 'µs', decimals: 2, liveKey: 'dagInsertP50' },
  { metric: 'Gossip Propagation p50', value: 38.93, unit: 'µs', decimals: 2, liveKey: 'gossipPropagationP50' },
  { metric: 'VRF Compute', value: 18.73, unit: 'µs', decimals: 2 },
  { metric: 'VRF Verify', value: 38.61, unit: 'µs', decimals: 2 },
]

const zkMetrics: MetricRow[] = [
  { metric: 'Groth16 proof gen (basic, 1 tx)', value: 1.73, unit: 'ms', decimals: 2 },
  { metric: 'Groth16 proof gen (expanded, 4 events)', value: 317.01, unit: 'ms', decimals: 2 },
  { metric: 'Groth16 proof verify', value: 2.67, unit: 'ms', decimals: 2 },
  { metric: 'Merkle tree build (64 leaves)', value: 348.0, unit: 'µs', decimals: 2 },
  { metric: 'Merkle tree build (256 leaves)', value: 5.31, unit: 'ms', decimals: 2 },
]

function MetricTable({ metrics, title, liveMetrics }: { metrics: MetricRow[]; title?: string; liveMetrics: Record<string, string | number | undefined> | null }) {
  return (
    <div>
      {title && (
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-sm font-medium text-[#A39B92] mb-4 tracking-tight">
          {title}
        </h3>
      )}
      <div className="border rounded-md overflow-hidden" style={{ borderColor: 'rgba(212, 165, 116, 0.15)' }}>
        {metrics.map((row, i) => {
          let displayValue = row.value
          let displayUnit = row.unit
          let isLive = false

          if (liveMetrics && row.liveKey) {
            const liveVal = liveMetrics[row.liveKey]
            if (liveVal !== undefined && liveVal !== null) {
              if (typeof liveVal === 'string') {
                const numMatch = liveVal.match(/^([\d.]+)/)
                const unitMatch = liveVal.match(/([µm]?s)$/)
                if (numMatch) displayValue = parseFloat(numMatch[1])
                if (unitMatch) displayUnit = unitMatch[1]
                isLive = true
              } else if (typeof liveVal === 'number') {
                displayValue = liveVal
                isLive = true
              }
            }
          }

          return (
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
                <AnimatedNumber value={displayValue} decimals={row.decimals ?? 0} duration={isLive ? 1000 : 2500} />{' '}
                <span className="text-[#A39B92]">{displayUnit}</span>
                {isLive && <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-[#8C9E8E]" />}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function PerformanceSection() {
  const { data: liveMetrics } = useOmniaMetrics()

  const hasLiveData = !!liveMetrics

  const liveDataMap: Record<string, string | number | undefined> | null = liveMetrics
    ? {
        tps: liveMetrics.tps,
        p50Latency: liveMetrics.p50Latency,
        p99Latency: liveMetrics.p99Latency,
        gossipPropagationP50: liveMetrics.gossipPropagationP50,
        dagInsertP50: liveMetrics.dagInsertP50,
      }
    : null

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
            Consensus throughput benchmarks from v0.1.67 single-node tests (measured v0.1.48)
            {hasLiveData && <span className="text-[#8C9E8E]"> · live metrics shown with <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8C9E8E] align-middle" /> dot</span>}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="space-y-8"
        >
          <MetricTable metrics={mainMetrics} liveMetrics={liveDataMap} />
          <MetricTable metrics={zkMetrics} title="ZK Performance" liveMetrics={liveDataMap} />
        </motion.div>
      </div>
    </section>
  )
}
