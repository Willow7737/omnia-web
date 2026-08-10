'use client'

import { motion } from 'framer-motion'
import { AnimatedNumber } from './animated-number'
import { useOmniaMetrics } from '@/hooks/use-omnia-data'
import { Zap, Activity, Cpu, GitBranch, Shield, Boxes } from 'lucide-react'

interface MetricRow {
  metric: string
  value: number
  unit: string
  decimals?: number
  approx?: boolean
  note?: string
  liveKey?: string
  icon: typeof Zap
}

const mainMetrics: MetricRow[] = [
  { metric: 'Sustained throughput', value: 12000, unit: 'events/s', approx: true, note: 'sync pipeline', liveKey: 'tps', icon: Activity },
  { metric: 'Finality latency p50', value: 24.5, unit: 'µs', decimals: 1, liveKey: 'p50Latency', icon: Zap },
  { metric: 'Graph insert p50', value: 18, unit: 'µs', liveKey: 'dagInsertP50', icon: GitBranch },
  { metric: 'VRF compute', value: 19, unit: 'µs', approx: true, note: 'Ed25519 + BLAKE3', icon: Cpu },
  { metric: 'Ed25519 verify', value: 27000, unit: 'sig/s', approx: true, note: 'est.', icon: Shield },
  { metric: 'CRDT batch merge', value: 100000, unit: 'ops/s', approx: true, note: 'est., 1K ops/batch', icon: Boxes },
]

const D_NORMAL = 0.26
const EASE = [0.25, 0.46, 0.45, 0.94] as const

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
    <section id="performance" className="section-white section-spacing px-6 border-y border-border relative overflow-hidden">
      {/* Grid texture */}
      <div
        className="grid-bg absolute inset-0 [mask-image:linear-gradient(180deg,transparent,black_20%,black_80%,transparent)] pointer-events-none"
        aria-hidden
      />
      <div className="max-w-[980px] mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: D_NORMAL, ease: EASE }}
          className="mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 font-mono text-[11.3px] text-muted-foreground lowercase mb-6">
            {hasLiveData ? (
              <>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
                </span>
                live
              </>
            ) : (
              'benchmarks'
            )}
          </span>
          <h2 className="font-display text-[37.5px] sm:text-[47.5px] md:text-[60px] font-bold leading-[1.05] text-foreground mb-4">
            The numbers.
          </h2>
          <p className="text-[16.9px] sm:text-[18.8px] text-muted-foreground leading-[1.5] max-w-[600px]">
            From the protocol&apos;s Honest Performance table, v0.1.68+ baselines. Single-node,
            synchronous, reproducible with{' '}
            <code className="font-mono text-[13.1px] text-foreground bg-muted px-1.5 py-0.5 rounded-md">cargo bench</code>.
          </p>
        </motion.div>

        {/* Metric card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {mainMetrics.map((row, i) => {
            const Icon = row.icon
            let displayValue = row.value
            let displayUnit = row.unit
            let isLive = false

            if (liveDataMap && row.liveKey) {
              const liveVal = liveDataMap[row.liveKey]
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
              <motion.div
                key={row.metric}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: D_NORMAL, delay: i * 0.06, ease: EASE }}
                className="card-hover hover:card-hover-hover border-gradient group relative rounded-xl p-5 bg-card/50 border border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="size-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon size={14} className="text-primary" />
                  </div>
                  {isLive && (
                    <span className="pulse-dot inline-block size-1.5 rounded-full bg-success" />
                  )}
                </div>
                <div className="text-[11.3px] text-muted-foreground uppercase mb-2 leading-tight">
                  {row.metric}
                </div>
                <div className="font-mono text-[24.3px] sm:text-[30px] font-bold text-foreground leading-none">
                  {!isLive && row.approx && <span className="text-muted-foreground">~</span>}
                  <AnimatedNumber value={displayValue} decimals={row.decimals ?? 0} duration={isLive ? 1000 : 2500} />
                  <span className="text-muted-foreground text-[13.1px] font-normal ml-1.5">{displayUnit}</span>
                </div>
                {row.note && (
                  <div className="text-[11.3px] text-muted-foreground/70 mt-2">
                    {row.note}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Fine print */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: D_NORMAL, delay: 0.2, ease: EASE }}
          className="border-gradient rounded-xl p-5 bg-card/40 border border-border"
        >
          <p className="text-[13.1px] sm:text-[14px] text-muted-foreground leading-[1.6]">
            <span className="text-foreground font-medium">Read the fine print.</span>{' '}
            Measured on AMD Ryzen 9 7950X, 64&thinsp;GB DDR5-6000, Linux 6.8, rustc 1.91.
            These are single-node synthetic baselines for regression tracking — real multi-node
            deployments pay network round-trips, BFT supermajority waits, and proof generation.
            Consensus outruns ZK settlement by roughly 560×; rollups batch events and prove
            asynchronously so slow proving never blocks finality.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
