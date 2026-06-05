'use client'

import { motion } from 'framer-motion'
import { AnimatedNumber } from './animated-number'
import { ArrowRight, Wifi, WifiOff, Loader2 } from 'lucide-react'
import { useOmniaDashboard } from '@/hooks/use-omnia-data'

const BENCHMARK_DATA = {
  eventsFinalized: 7190000,
  p50Latency: '93.47µs',
  validators: 1,
  networkStatus: 'Benchmark',
  nodeCount: 1,
} as const

export function HeroSection() {
  const { data, isLoading, error } = useOmniaDashboard()

  const isOnline = data?.healthy ?? false
  const hasLiveData = isOnline && !!data

  const eventsFinalized = hasLiveData ? data.eventsFinalized : BENCHMARK_DATA.eventsFinalized
  const latency = hasLiveData ? data.p50Latency : BENCHMARK_DATA.p50Latency
  const validators = hasLiveData ? data.activeValidators : BENCHMARK_DATA.validators
  const networkStatus = hasLiveData
    ? data.networkStatus
    : (error ? 'Offline' : 'Benchmark')
  const nodeCount = hasLiveData ? data.nodeCount : BENCHMARK_DATA.nodeCount

  return (
    <section
      id="hero"
      className="section-dark relative min-h-screen flex flex-col items-center justify-center px-6"
    >
      <div className="text-center max-w-[780px] mx-auto relative z-10">
        {/* Overline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="text-[#86868B] text-[14px] sm:text-[15px] font-[family-name:var(--font-space-grotesk)] tracking-tight">
            Settlement-agnostic consensus infrastructure
          </span>
        </motion.div>

        {/* Headline — massive, bold, Apple-like */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-[family-name:var(--font-space-grotesk)] text-[56px] sm:text-[80px] md:text-[96px] font-bold tracking-[-0.04em] leading-[1.02] text-[#F5F5F7] mb-6"
        >
          Omnia
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[19px] sm:text-[21px] md:text-[24px] text-[#86868B] leading-[1.35] max-w-[560px] mx-auto mb-10 font-[family-name:var(--font-geist-sans)]"
        >
          Causal graph consensus.{' '}
          <span className="text-[#F5F5F7]">Sub-100µs finality.</span>{' '}
          Public domain.
        </motion.p>

        {/* CTAs — Apple-style pill buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <a
            href="/docs"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#2997FF] text-white font-[family-name:var(--font-space-grotesk)] font-medium text-[14px] tracking-tight rounded-full hover:bg-[#2384d6] transition-colors"
          >
            Read the Docs
            <ArrowRight size={14} />
          </a>
          <a
            href="/architecture"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-[family-name:var(--font-space-grotesk)] font-medium text-[14px] tracking-tight text-[#2997FF] hover:text-[#5eb8ff] transition-colors"
          >
            View Architecture
            <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* Live Status Widget — minimal, clean */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block w-full max-w-[480px]"
        >
          <div className="border border-white/[0.08] rounded-2xl p-5 text-left bg-white/[0.02]">
            {isLoading && !data ? (
              <div className="flex items-center justify-center py-8 gap-3">
                <Loader2 className="h-4 w-4 animate-spin text-[#86868B]" />
                <span className="text-sm text-[#86868B]">Connecting to testnet...</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {/* Events Finalized */}
                <div>
                  <div className="text-[11px] text-[#86868B] uppercase tracking-wider mb-1.5 font-[family-name:var(--font-space-grotesk)]">
                    Events Finalized
                  </div>
                  <div className="font-[family-name:var(--font-jetbrains-mono)] text-[15px] text-[#F5F5F7]">
                    <AnimatedNumber value={eventsFinalized} />
                  </div>
                </div>

                {/* p50 Latency */}
                <div>
                  <div className="text-[11px] text-[#86868B] uppercase tracking-wider mb-1.5 font-[family-name:var(--font-space-grotesk)]">
                    p50 Latency
                  </div>
                  <div className="font-[family-name:var(--font-jetbrains-mono)] text-[15px] text-[#F5F5F7]">
                    {latency}
                  </div>
                </div>

                {/* Active Validators */}
                <div>
                  <div className="text-[11px] text-[#86868B] uppercase tracking-wider mb-1.5 font-[family-name:var(--font-space-grotesk)]">
                    Active Validators
                  </div>
                  <div className="font-[family-name:var(--font-jetbrains-mono)] text-[15px] text-[#F5F5F7]">
                    <AnimatedNumber value={validators} />
                  </div>
                </div>

                {/* Network Status */}
                <div>
                  <div className="text-[11px] text-[#86868B] uppercase tracking-wider mb-1.5 font-[family-name:var(--font-space-grotesk)]">
                    Network Status
                  </div>
                  <div className="flex items-center gap-2">
                    {hasLiveData ? (
                      <>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-[#30D158] opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#30D158]" />
                        </span>
                        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[13px] text-[#30D158]">
                          {networkStatus}
                        </span>
                      </>
                    ) : (
                      <>
                        <WifiOff className="h-3 w-3 text-[#86868B]" />
                        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[13px] text-[#86868B]">
                          {networkStatus}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Footer note */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-[#86868B] flex items-center justify-between">
              <span>
                {hasLiveData
                  ? `${nodeCount} node${nodeCount !== 1 ? 's' : ''} connected`
                  : 'v0.1.67 benchmarks'}
              </span>
              {hasLiveData ? (
                <span className="flex items-center gap-1 text-[#30D158]">
                  <Wifi className="h-3 w-3" />
                  Live
                </span>
              ) : (
                <span>Benchmark</span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
