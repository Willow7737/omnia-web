'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AnimatedNumber } from './animated-number'
import { CausalGraphSvg } from './causal-graph-svg'
import { ArrowRight, Wifi, WifiOff, Loader2 } from 'lucide-react'
import { useOmniaDashboard } from '@/hooks/use-omnia-data'

/*
 * Fallback figures when no live testnet is reachable. Sourced from the
 * protocol's "Honest Performance Numbers" table (README, v0.1.68+
 * baselines): single-node synchronous pipeline on the reference
 * benchmark machine.
 */
const BENCHMARK_DATA = {
  throughput: 12000,
  p50Latency: '24.5µs',
  validators: 1,
  networkStatus: 'Benchmark',
  nodeCount: 1,
} as const

// Motion durations — Bluesky ALF (DESIGN.md §6).
const D_FAST = 0.18    // 180ms
const D_NORMAL = 0.26  // 260ms
const D_SLOW = 0.42    // 420ms — hero / count-up
const EASE = [0.25, 0.46, 0.45, 0.94] as const

export function HeroSection() {
  const { data, isLoading, error } = useOmniaDashboard()

  const isOnline = data?.healthy ?? false
  const hasLiveData = isOnline && !!data

  const throughput = hasLiveData && data.metrics?.tps ? data.metrics.tps : BENCHMARK_DATA.throughput
  const latency = hasLiveData ? data.p50Latency : BENCHMARK_DATA.p50Latency
  const validators = hasLiveData ? data.activeValidators : BENCHMARK_DATA.validators
  const networkStatus = hasLiveData
    ? data.networkStatus
    : (error ? 'Offline' : 'Benchmark')
  const nodeCount = hasLiveData ? data.nodeCount : BENCHMARK_DATA.nodeCount

  return (
    <section
      id="hero"
      className="section-paper relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16"
    >
      {/* Halftone corner texture */}
      <div className="dither absolute top-12 right-0 w-40 h-40 sm:w-64 sm:h-64 [mask-image:linear-gradient(225deg,black,transparent_70%)] pointer-events-none" aria-hidden />
      <div className="dither absolute bottom-0 left-0 w-40 h-40 sm:w-64 sm:h-64 [mask-image:linear-gradient(45deg,black,transparent_70%)] pointer-events-none" aria-hidden />

      <div className="text-center max-w-[820px] mx-auto relative z-10">
        {/* Overline — pill badge, not bare text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: D_SLOW }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 font-mono text-[11.3px] text-muted-foreground lowercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            settlement-agnostic dag consensus
          </span>
        </motion.div>

        {/* Headline — Space Grotesk display, ALF fractional sizes */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: D_SLOW, ease: EASE }}
          className="font-display text-[60px] sm:text-[76px] md:text-[96px] font-bold leading-[1.02] text-foreground mb-6"
        >
          Omnia
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: D_SLOW, delay: 0.1, ease: EASE }}
          className="text-[18.8px] sm:text-[20.6px] md:text-[24.3px] text-muted-foreground leading-[1.35] max-w-[560px] mx-auto mb-10"
        >
          Causal graph consensus.{' '}
          <span className="text-foreground">BFT finality proven across three continents.</span>{' '}
          Public domain.
        </motion.p>

        {/* CTAs — pills + press interaction */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: D_SLOW, delay: 0.2, ease: EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
        >
          <Link
            href="/docs"
            className="pressable active:pressable-active group inline-flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground font-medium text-[15px] rounded-full hover:bg-primary/90 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Read the Docs
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/architecture"
            className="pressable active:pressable-active group inline-flex items-center gap-2 px-7 py-3 rounded-full font-medium text-[15px] border border-border bg-card text-foreground hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            View Architecture
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Causal graph illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: D_SLOW, delay: 0.3 }}
          className="mb-14 hidden sm:block"
        >
          <CausalGraphSvg className="w-full max-w-[560px] mx-auto" />
        </motion.div>

        {/* Live status widget — flat hairline card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: D_SLOW, delay: 0.35, ease: EASE }}
          className="inline-block w-full max-w-[480px]"
        >
          <div className="border border-border rounded-xl p-5 text-left bg-card">
            {isLoading && !data ? (
              <div className="flex items-center justify-center py-8 gap-3">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <span className="text-[13.1px] text-muted-foreground">Connecting to testnet...</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <div className="text-[11.3px] text-muted-foreground uppercase mb-1.5">
                    Throughput
                  </div>
                  <div className="font-mono text-[15px] text-foreground">
                    <AnimatedNumber value={throughput} />{' '}
                    <span className="text-muted-foreground text-[13.1px]">ev/s</span>
                  </div>
                </div>
                <div>
                  <div className="text-[11.3px] text-muted-foreground uppercase mb-1.5">
                    Finality p50
                  </div>
                  <div className="font-mono text-[15px] text-foreground">
                    {latency}
                  </div>
                </div>
                <div>
                  <div className="text-[11.3px] text-muted-foreground uppercase mb-1.5">
                    Active Validators
                  </div>
                  <div className="font-mono text-[15px] text-foreground">
                    <AnimatedNumber value={validators} />
                  </div>
                </div>
                <div>
                  <div className="text-[11.3px] text-muted-foreground uppercase mb-1.5">
                    Network Status
                  </div>
                  <div className="flex items-center gap-2">
                    {hasLiveData ? (
                      <>
                        <span className="relative flex h-2 w-2">
                          <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                        </span>
                        <span className="font-mono text-[13.1px] text-success">
                          {networkStatus}
                        </span>
                      </>
                    ) : (
                      <>
                        <WifiOff className="h-3 w-3 text-muted-foreground" />
                        <span className="font-mono text-[13.1px] text-muted-foreground">
                          {networkStatus}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-border text-[11.3px] text-muted-foreground flex items-center justify-between">
              <span>
                {hasLiveData
                  ? `${nodeCount} node${nodeCount !== 1 ? 's' : ''} connected`
                  : 'v0.1.76 · single-node sync baseline'}
              </span>
              {hasLiveData ? (
                <span className="flex items-center gap-1 text-success">
                  <Wifi className="h-3 w-3" />
                  Live
                </span>
              ) : (
                <span className="font-mono lowercase">benchmark</span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
