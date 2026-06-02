'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import { useOmniaStatus } from '@/hooks/use-omnia-data'
import type { NodeStatusResponse } from '@/lib/omnia-client'

const API_BASE = process.env.NEXT_PUBLIC_OMNIA_API_URL || 'http://localhost:9090'

const curlCommand = `curl -s ${API_BASE}/api/v1/node/info | jq .`

// Benchmark response shown when testnet is offline
const BENCHMARK_STATUS: NodeStatusResponse = {
  node_id: '01000000',
  node_id_num: 1,
  version: '0.1.67',
  protocol_version: '4.0.0',
  finalized_height: 7190000,
  peers: 0,
  shard_count: 6,
  listen_addr: '/ip4/0.0.0.0/udp/4001/quic-v1',
  data_dir: '/app/data',
  uptime_seconds: 86400,
}

function JsonResponse({ data }: { data: NodeStatusResponse | null | undefined }) {
  const response = data ?? BENCHMARK_STATUS
  const isBenchmark = !data

  return (
    <>
      {'{\n'}
      {'  '}
      <span className="text-[#D4A574]">&quot;node_id&quot;</span>
      {': '}
      <span className="text-[#8C9E8E]">&quot;{response.node_id}&quot;</span>
      {',\n'}
      {'  '}
      <span className="text-[#D4A574]">&quot;version&quot;</span>
      {': '}
      <span className="text-[#8C9E8E]">&quot;{response.version}&quot;</span>
      {',\n'}
      {'  '}
      <span className="text-[#D4A574]">&quot;finalized_height&quot;</span>
      {': '}
      <span className="text-[#F5F0EB]">{response.finalized_height.toLocaleString()}</span>
      {',\n'}
      {'  '}
      <span className="text-[#D4A574]">&quot;peers&quot;</span>
      {': '}
      <span className="text-[#F5F0EB]">{response.peers}</span>
      {',\n'}
      {'  '}
      <span className="text-[#D4A574]">&quot;shard_count&quot;</span>
      {': '}
      <span className="text-[#F5F0EB]">{response.shard_count}</span>
      {',\n'}
      {'  '}
      <span className="text-[#D4A574]">&quot;uptime_seconds&quot;</span>
      {': '}
      <span className="text-[#F5F0EB]">{response.uptime_seconds.toLocaleString()}</span>
      {',\n'}
      {'  '}
      <span className="text-[#D4A574]">&quot;protocol_version&quot;</span>
      {': '}
      <span className="text-[#8C9E8E]">&quot;{response.protocol_version}&quot;</span>
      {isBenchmark && (
        <>
          {',\n  '}
          <span className="text-[#D4A574]">&quot;_note&quot;</span>
          {': '}
          <span className="text-[#A39B92]">&quot;benchmark data&quot;</span>
        </>
      )}
      {'\n'}
      {'}'}
    </>
  )
}

export function CurlSection() {
  const [copied, setCopied] = useState(false)
  const [flashActive, setFlashActive] = useState(false)

  const { data: liveStatus } = useOmniaStatus()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(curlCommand)
      setCopied(true)
      setFlashActive(true)
      setTimeout(() => {
        setCopied(false)
        setFlashActive(false)
      }, 600)
    } catch {
      // Fallback: do nothing
    }
  }

  return (
    <section id="api" className="section-padding px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-3xl mx-auto"
      >
        <p className="text-lg text-[#A39B92] leading-relaxed mb-10 text-center max-w-2xl mx-auto">
          Omnia replaces sequential blockchains with parallel causal graph consensus using DAG + vector clocks + CRDTs. Settlement happens via ZK-rollup on any data-availability layer.
        </p>

        <div
          className="rounded-lg border overflow-hidden"
          style={{
            background: '#141414',
            borderColor: 'rgba(212, 165, 116, 0.2)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-2 border-b"
            style={{ borderColor: 'rgba(212, 165, 116, 0.15)' }}
          >
            <span className="text-xs text-[#A39B92] font-[family-name:var(--font-space-grotesk)]">
              bash
            </span>
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors ${
                flashActive
                  ? 'bg-[#D4A574] text-[#0F0F0F]'
                  : 'text-[#A39B92] hover:text-[#D4A574]'
              }`}
              aria-label="Copy command"
            >
              {copied ? (
                <>
                  <Check size={12} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={12} />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* curl command */}
          <div className="px-5 py-4">
            <pre className="font-[family-name:var(--font-jetbrains-mono)] text-sm leading-relaxed overflow-x-auto">
              <code>
                <span className="text-[#8C9E8E]">$</span>{' '}
                <span className="text-[#D4A574]">curl</span>{' '}
                <span className="text-[#A39B92]">-s</span>{' '}
                <span className="text-[#8C9E8E]">{API_BASE}/api/v1/node/info</span>{' '}
                <span className="text-[#A39B92]">|</span>{' '}
                <span className="text-[#D4A574]">jq</span>{' '}
                <span className="text-[#A39B92]">.</span>
              </code>
            </pre>
          </div>

          {/* Divider */}
          <div style={{ borderColor: 'rgba(212, 165, 116, 0.1)' }} className="border-t" />

          {/* JSON response */}
          <div className="px-5 py-4">
            <pre className="font-[family-name:var(--font-jetbrains-mono)] text-[13px] leading-relaxed overflow-x-auto text-[#A39B92]">
              <code>
                <JsonResponse data={liveStatus} />
              </code>
            </pre>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
