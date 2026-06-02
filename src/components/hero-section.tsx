'use client'

import { motion } from 'framer-motion'
import { AnimatedNumber } from './animated-number'
import { FileText, Terminal, ArrowRight, Wifi, WifiOff, Loader2 } from 'lucide-react'
import { useOmniaDashboard } from '@/hooks/use-omnia-data'

// Benchmark data shown when testnet is offline (from v0.1.67 single-node tests)
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

  // Show live data when available, fall back to benchmark data
  const eventsFinalized = hasLiveData ? data.eventsFinalized : BENCHMARK_DATA.eventsFinalized
  const latency = hasLiveData ? data.p50Latency : BENCHMARK_DATA.p50Latency
  const validators = hasLiveData ? data.activeValidators : BENCHMARK_DATA.validators
  const networkStatus = hasLiveData
    ? data.networkStatus
    : (error ? 'Offline' : 'Benchmark Data')
  const nodeCount = hasLiveData ? data.nodeCount : BENCHMARK_DATA.nodeCount

  return (
    <section
      id="hero"
      className="section-padding relative min-h-screen flex flex-col items-center justify-center px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center max-w-3xl mx-auto"
      >
        {/* Headline */}
        <h1
          className="font-[family-name:var(--font-space-grotesk)] text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.02em] text-[#F5F0EB] mb-6"
        >
          Omnia Protocol
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-[#A39B92] leading-relaxed max-w-2xl mx-auto mb-10">
          Settlement-agnostic causal graph consensus. Sub-100µs finality. Public domain.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="https://github.com/Willow7737/omnia-protocol"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4A574] text-[#0F0F0F] font-[family-name:var(--font-space-grotesk)] font-medium text-sm tracking-tight rounded-md hover:bg-[#c49564] transition-colors"
          >
            <FileText size={16} />
            Read the Docs
          </a>
          <a
            href="#api"
            className="inline-flex items-center gap-2 px-6 py-3 border rounded-md font-[family-name:var(--font-space-grotesk)] font-medium text-sm tracking-tight text-[#A39B92] hover:text-[#D4A574] hover:border-[#D4A574] transition-colors"
            style={{ borderColor: 'rgba(212, 165, 116, 0.3)' }}
          >
            <Terminal size={16} />
            Run the Devnet
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Live Status Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="inline-block w-full max-w-xl"
        >
          <div
            className="border rounded-lg p-5 text-left"
            style={{
              borderColor: hasLiveData
                ? 'rgba(140, 158, 142, 0.3)'
                : 'rgba(212, 165, 116, 0.2)',
              background: 'rgba(26, 26, 26, 0.6)',
            }}
          >
            {isLoading && !data ? (
              <div className="flex items-center justify-center py-6 gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-[#D4A574]" />
                <span className="text-sm text-[#A39B92]">Connecting to testnet...</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {/* Events Finalized */}
                <div>
                  <div className="text-xs text-[#A39B92] uppercase tracking-wider mb-1 font-[family-name:var(--font-space-grotesk)]">
                    Events Finalized
                  </div>
                  <div className="font-[family-name:var(--font-jetbrains-mono)] text-base text-[#F5F0EB]">
                    <AnimatedNumber value={eventsFinalized} />
                  </div>
                </div>

                {/* p50 Latency */}
                <div>
                  <div className="text-xs text-[#A39B92] uppercase tracking-wider mb-1 font-[family-name:var(--font-space-grotesk)]">
                    p50 Latency
                  </div>
                  <div className="font-[family-name:var(--font-jetbrains-mono)] text-base text-[#F5F0EB]">
                    {latency}
                  </div>
                </div>

                {/* Active Validators */}
                <div>
                  <div className="text-xs text-[#A39B92] uppercase tracking-wider mb-1 font-[family-name:var(--font-space-grotesk)]">
                    Active Validators
                  </div>
                  <div className="font-[family-name:var(--font-jetbrains-mono)] text-base text-[#F5F0EB]">
                    <AnimatedNumber value={validators} />
                  </div>
                </div>

                {/* Network Status */}
                <div>
                  <div className="text-xs text-[#A39B92] uppercase tracking-wider mb-1 font-[family-name:var(--font-space-grotesk)]">
                    Network Status
                  </div>
                  <div className="flex items-center gap-2">
                    {hasLiveData ? (
                      <>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-pulse-sage absolute inline-flex h-full w-full rounded-full bg-[#8C9E8E] opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8C9E8E]" />
                        </span>
                        <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#8C9E8E]">
                          {networkStatus}
                        </span>
                      </>
                    ) : (
                      <>
                        <WifiOff className="h-3 w-3 text-[#A39B92]" />
                        <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#A39B92]">
                          {networkStatus}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Note */}
            <div className="mt-4 pt-3 border-t text-xs text-[#A39B92] flex items-center justify-between" style={{ borderColor: 'rgba(212, 165, 116, 0.1)' }}>
              <span>
                {hasLiveData
                  ? `${nodeCount} node${nodeCount !== 1 ? 's' : ''} connected — live data`
                  : 'v0.1.67 benchmarks — connect testnet for live data'}
              </span>
              {hasLiveData ? (
                <span className="flex items-center gap-1 text-[#8C9E8E]">
                  <Wifi className="h-3 w-3" />
                  Live
                </span>
              ) : (
                <span className="text-[#A39B92]">
                  Benchmark
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
