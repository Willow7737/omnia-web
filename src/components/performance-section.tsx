'use client'

import { motion } from 'framer-motion'
import { AnimatedNumber } from './animated-number'
import { useOmniaMetrics } from '@/hooks/use-omnia-data'

/*
 * Every figure below is copied from the protocol repository's "Honest
 * Performance Numbers" table (README, v0.1.68+ baselines) and the ZK
 * scaling analysis (docs/benchmarks/zk-scaling-analysis.md). Reference
 * machine: AMD Ryzen 9 7950X, 64 GB DDR5-6000, Linux 6.8, rustc 1.91.
 * Update them when the protocol updates its baselines — never invent.
 */

interface MetricRow {
  metric: string
  value: number
  unit: string
  decimals?: number
  approx?: boolean
  note?: string
  liveKey?: string
}

const mainMetrics: MetricRow[] = [
  { metric: 'Sustained throughput', value: 12000, unit: 'events/s', approx: true, note: 'sync pipeline', liveKey: 'tps' },
  { metric: 'Finality latency p50', value: 24.5, unit: 'µs', decimals: 1, liveKey: 'p50Latency' },
  { metric: 'Graph insert p50', value: 18, unit: 'µs', liveKey: 'dagInsertP50' },
  { metric: 'VRF compute', value: 19, unit: 'µs', approx: true, note: 'Ed25519 + BLAKE3' },
  { metric: 'Ed25519 verify', value: 27000, unit: 'sig/s', approx: true, note: 'est.' },
  { metric: 'CRDT batch merge', value: 100000, unit: 'ops/s', approx: true, note: 'est., 1K ops/batch' },
]

const zkMetrics: MetricRow[] = [
  { metric: 'Groth16 prove, expanded circuit', value: 88, unit: 'ms/event', approx: true },
  { metric: 'Groth16 prove, 100-event batch', value: 79, unit: 'ms/event', approx: true, note: 'sub-linear scaling' },
  { metric: 'Groth16 verify', value: 2.7, unit: 'ms', decimals: 1, approx: true },
]

function MetricTable({ metrics, title, liveMetrics }: { metrics: MetricRow[]; title?: string; liveMetrics: Record<string, string | number | undefined> | null }) {
  return (
    <div>
      {title && (
        <h3 className="text-[12px] font-medium text-muted-foreground mb-4 uppercase">
          {title}
        </h3>
      )}
      <div className="overflow-hidden">
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
              className={`group flex items-center justify-between gap-4 py-3.5 transition-colors hover:bg-accent/40 -mx-2 px-2 rounded-lg ${
                i < metrics.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <span className="text-[15px] sm:text-[17px] text-muted-foreground leading-relaxed">
                {row.metric}
                {row.note && (
                  <span className="hidden sm:inline text-[12px] text-muted-foreground/70"> · {row.note}</span>
                )}
              </span>
              <span className="font-mono text-[15px] sm:text-[17px] text-foreground shrink-0">
                {!isLive && row.approx && <span className="text-muted-foreground">~</span>}
                <AnimatedNumber value={displayValue} decimals={row.decimals ?? 0} duration={isLive ? 1000 : 2500} />{' '}
                <span className="text-muted-foreground text-[13px]">{displayUnit}</span>
                {isLive && <span className="pulse-dot ml-2 inline-block w-1.5 h-1.5 rounded-full bg-success" />}
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
    <section id="performance" className="section-white section-spacing px-6 border-y border-border">
      <div className="max-w-[680px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.26, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-sans text-[40px] sm:text-[56px] md:text-[64px] font-bold leading-[1.1] text-foreground mb-4">
            The numbers.
          </h2>
          <p className="text-[17px] sm:text-[19px] text-muted-foreground mb-12">
            From the protocol&apos;s Honest Performance table, v0.1.68+ baselines. Single-node,
            synchronous, reproducible with <code className="font-mono text-[14px] text-foreground bg-muted px-1.5 py-0.5 rounded-md">cargo bench</code>.
            {hasLiveData && <span className="text-success"> Live metrics shown with <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full bg-success align-middle" /> dot.</span>}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.26, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-10"
        >
          <MetricTable metrics={mainMetrics} liveMetrics={liveDataMap} />
          <MetricTable metrics={zkMetrics} title="ZK Settlement — Groth16 on BN254" liveMetrics={liveDataMap} />

          <div className="border border-border rounded-xl p-5 bg-background">
            <p className="text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed">
              <span className="text-foreground font-medium">Read the fine print.</span>{' '}
              Measured on AMD Ryzen 9 7950X, 64&thinsp;GB DDR5-6000, Linux 6.8, rustc 1.91.
              These are single-node synthetic baselines for regression tracking — real multi-node
              deployments pay network round-trips, BFT supermajority waits, and proof generation.
              Consensus outruns ZK settlement by roughly 560×; rollups batch events and prove
              asynchronously so slow proving never blocks finality.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
