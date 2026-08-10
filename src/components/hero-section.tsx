'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AnimatedNumber } from './animated-number'
import { CausalGraphSvg } from './causal-graph-svg'
import { ArrowRight, Wifi, WifiOff, Loader2, Activity, Zap, Shield } from 'lucide-react'
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
const D_FAST = 0.18
const D_NORMAL = 0.26
const D_SLOW = 0.42
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
      className="section-paper relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-20 overflow-hidden"
    >
      {/* Blue glow backdrop — the visual centerpiece */}
      <div
        className="glow-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        aria-hidden
      />
      {/* Subtle grid texture */}
      <div
        className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] pointer-events-none"
        aria-hidden
      />
      {/* Halftone corner texture */}
      <div className="dither absolute top-16 right-0 w-48 h-48 sm:w-72 sm:h-72 [mask-image:linear-gradient(225deg,black,transparent_70%)] pointer-events-none" aria-hidden />
      <div className="dither absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 [mask-image:linear-gradient(45deg,black,transparent_70%)] pointer-events-none" aria-hidden />

      <div className="text-center max-w-[860px] mx-auto relative z-10">
        {/* Overline — pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: D_NORMAL }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur-sm font-mono text-[11.3px] text-muted-foreground lowercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            settlement-agnostic dag consensus
          </span>
        </motion.div>

        {/* Headline — gradient wordmark, big and dramatic */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: D_SLOW, ease: EASE }}
          className="font-display text-[72px] sm:text-[100px] md:text-[128px] font-bold leading-[0.95] mb-6 text-gradient"
        >
          Omnia
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: D_SLOW, delay: 0.1, ease: EASE }}
          className="text-[18.8px] sm:text-[20.6px] md:text-[24.3px] text-muted-foreground leading-[1.4] max-w-[600px] mx-auto mb-10"
        >
          Causal graph consensus.{' '}
          <span className="text-foreground font-medium">BFT finality proven across three continents.</span>{' '}
          Public domain.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: D_SLOW, delay: 0.2, ease: EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <Link
            href="/docs"
            className="pressable active:pressable-active group inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-medium text-[15px] rounded-full hover:bg-primary/90 transition-colors ring-glow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Read the Docs
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/architecture"
            className="pressable active:pressable-active group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-[15px] border border-border bg-card/60 backdrop-blur-sm text-foreground hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            View Architecture
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Causal graph — bigger, more prominent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: D_SLOW, delay: 0.3 }}
          className="mb-16 hidden sm:block"
        >
          <CausalGraphSvg className="w-full max-w-[680px] mx-auto" />
        </motion.div>

        {/* Live status — three stat cards instead of one flat widget */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: D_SLOW, delay: 0.4, ease: EASE }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[680px] mx-auto"
        >
          {/* Throughput */}
          <div className="border-gradient rounded-xl p-5 text-left bg-card/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Activity size={13} className="text-primary" />
              <span className="text-[11.3px] text-muted-foreground uppercase">Throughput</span>
            </div>
            <div className="font-mono text-[24.3px] font-bold text-foreground leading-none">
              <AnimatedNumber value={throughput} />
              <span className="text-muted-foreground text-[13.1px] font-normal ml-1">ev/s</span>
            </div>
          </div>

          {/* Finality */}
          <div className="border-gradient rounded-xl p-5 text-left bg-card/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={13} className="text-primary" />
              <span className="text-[11.3px] text-muted-foreground uppercase">Finality p50</span>
            </div>
            <div className="font-mono text-[24.3px] font-bold text-foreground leading-none">
              {latency}
            </div>
          </div>

          {/* Status */}
          <div className="border-gradient rounded-xl p-5 text-left bg-card/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={13} className={hasLiveData ? 'text-success' : 'text-muted-foreground'} />
              <span className="text-[11.3px] text-muted-foreground uppercase">Status</span>
            </div>
            <div className="flex items-center gap-2">
              {isLoading && !data ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : hasLiveData ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                  </span>
                  <span className="font-mono text-[15px] text-success font-bold">
                    {networkStatus}
                  </span>
                </>
              ) : (
                <>
                  <WifiOff className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-mono text-[15px] text-muted-foreground">
                    {networkStatus}
                  </span>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: D_SLOW, delay: 0.5 }}
          className="mt-6 flex items-center justify-center gap-2 text-[11.3px] text-muted-foreground"
        >
          {hasLiveData ? (
            <>
              <Wifi className="h-3 w-3 text-success" />
              <span>{nodeCount} node{nodeCount !== 1 ? 's' : ''} connected</span>
            </>
          ) : (
            <span className="font-mono lowercase">v0.1.76 · single-node sync baseline</span>
          )}
        </motion.div>
      </div>
    </section>
  )
}
