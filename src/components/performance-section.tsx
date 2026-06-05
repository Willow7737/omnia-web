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

const mainMetrics: MetricRow[] = [
  { metric: 'Sustained TPS', value: 7190, unit: 'events/sec', decimals: 0, liveKey: 'tps' },
  { metric: 'Finality Latency p50', value: 93.47, unit: 'µs', decimals: 2, liveKey: 'p50Latency' },
  { metric: 'Finality Latency p95', value: 154.76, unit: 'µs', decimals: 2 },
  { metric: 'Finality Latency p99', value: 177.06, unit: 'µs', decimals: 2, liveKey: 'p99Latency' },
  { metric: 'DAG Insert p50', value: 18.09, unit: 'µs', decimals: 2, liveKey: 'dagInsertP50' },
  { metric: 'VRF Compute', value: 18.73, unit: 'µs', decimals: 2 },
  { metric: 'VRF Verify', value: 38.61, unit: 'µs', decimals: 2 },
]

const zkMetrics: MetricRow[] = [
  { metric: 'Groth16 proof gen (basic)', value: 1.73, unit: 'ms', decimals: 2 },
  { metric: 'Groth16 proof gen (expanded)', value: 317.01, unit: 'ms', decimals: 2 },
  { metric: 'Groth16 proof verify', value: 2.67, unit: 'ms', decimals: 2 },
]

function MetricTable({ metrics, title, liveMetrics }: { metrics: MetricRow[]; title?: string; liveMetrics: Record<string, string | number | undefined> | null }) {
  return (
    <div>
      {title && (
        <h3 className="text-[13px] font-medium text-[#86868B] mb-3 tracking-tight font-[family-name:var(--font-space-grotesk)] uppercase">
          {title}
        </h3>
      )}
      <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
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
              className={`flex items-center justify-between px-5 py-3.5 ${
                i < metrics.length - 1 ? 'border-b border-white/[0.04]' : ''
              }`}
            >
              <span className="text-[14px] text-[#86868B] leading-relaxed font-[family-name:var(--font-geist-sans)]">{row.metric}</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[14px] text-[#F5F5F7] shrink-0 ml-6">
                <AnimatedNumber value={displayValue} decimals={row.decimals ?? 0} duration={isLive ? 1000 : 2500} />{' '}
                <span className="text-[#86868B] text-[12px]">{displayUnit}</span>
                {isLive && <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-[#30D158]" />}
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
      <div className="max-w-[680px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-[40px] sm:text-[48px] font-bold tracking-[-0.03em] text-[#F5F5F7] mb-3">
            The numbers.
          </h2>
          <p className="text-[15px] text-[#86868B] mb-10 font-[family-name:var(--font-geist-sans)]">
            Benchmarks from v0.1.67 single-node tests.
            {hasLiveData && <span className="text-[#30D158]"> Live metrics shown with <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#30D158] align-middle" /> dot</span>}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-6"
        >
          <MetricTable metrics={mainMetrics} liveMetrics={liveDataMap} />
          <MetricTable metrics={zkMetrics} title="ZK Performance" liveMetrics={liveDataMap} />
        </motion.div>
      </div>
    </section>
  )
}
