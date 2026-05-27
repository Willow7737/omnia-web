'use client'

/**
 * Event stream component
 *
 * Displays a live feed of consensus events from the Omnia Protocol testnet.
 * Since the current node API doesn't expose an SSE endpoint, this component
 * polls the /metrics and /api/v1/node/info endpoints to show real-time
 * consensus state changes (event counts, rounds, peer changes).
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Clock, Hash, Cpu, Users, Zap } from 'lucide-react'
import { useOmniaMetrics, useOmniaStatus, useOmniaHealth } from '@/hooks/use-omnia-data'

interface FeedEntry {
  id: string
  type: 'metric' | 'status' | 'health'
  label: string
  value: string
  timestamp: number
}

export function EventStream() {
  const { data: liveMetrics } = useOmniaMetrics()
  const { data: liveStatus } = useOmniaStatus()
  const { data: liveHealth } = useOmniaHealth()

  const [entries, setEntries] = useState<FeedEntry[]>([])
  const [connected, setConnected] = useState(false)
  const prevMetricsRef = useRef<Record<string, number>>({})
  const prevStatusRef = useRef<string>('')

  // Track metric changes and generate feed entries
  useEffect(() => {
    if (!liveMetrics) return
    setConnected(true)

    const current: Record<string, number> = {
      eventsFinalized: liveMetrics.eventsFinalized ?? 0,
      dagEventsTotal: liveMetrics.dagEventsTotal ?? 0,
      consensusRound: liveMetrics.consensusRound ?? 0,
      tps: liveMetrics.tps ?? 0,
      eventsSubmittedTotal: liveMetrics.eventsSubmittedTotal ?? 0,
      httpRequestsTotal: liveMetrics.httpRequestsTotal ?? 0,
      shardOperationsTotal: liveMetrics.shardOperationsTotal ?? 0,
    }

    const prev = prevMetricsRef.current
    const newEntries: FeedEntry[] = []

    // Generate entries for changed metrics
    if (current.consensusRound > (prev.consensusRound ?? 0)) {
      newEntries.push({
        id: `round-${current.consensusRound}`,
        type: 'metric',
        label: 'Consensus Round',
        value: `#${current.consensusRound.toLocaleString()}`,
        timestamp: Date.now(),
      })
    }

    if (current.eventsFinalized > (prev.eventsFinalized ?? 0)) {
      const delta = current.eventsFinalized - (prev.eventsFinalized ?? 0)
      newEntries.push({
        id: `finalized-${current.eventsFinalized}`,
        type: 'metric',
        label: 'Events Finalized',
        value: `+${delta} (total: ${current.eventsFinalized.toLocaleString()})`,
        timestamp: Date.now(),
      })
    }

    if (current.dagEventsTotal > (prev.dagEventsTotal ?? 0)) {
      newEntries.push({
        id: `dag-${current.dagEventsTotal}`,
        type: 'metric',
        label: 'DAG Insert',
        value: `${current.dagEventsTotal.toLocaleString()} events`,
        timestamp: Date.now(),
      })
    }

    if (current.shardOperationsTotal > (prev.shardOperationsTotal ?? 0)) {
      newEntries.push({
        id: `shard-${current.shardOperationsTotal}`,
        type: 'metric',
        label: 'Shard Operation',
        value: `${current.shardOperationsTotal.toLocaleString()} total`,
        timestamp: Date.now(),
      })
    }

    if (newEntries.length > 0) {
      setEntries(prev => [...newEntries.reverse(), ...prev].slice(0, 50))
    }

    prevMetricsRef.current = current
  }, [liveMetrics])

  // Track status changes
  useEffect(() => {
    if (!liveStatus) return
    setConnected(true)

    const statusKey = `${liveStatus.peers}-${liveStatus.finalized_height}`
    if (prevStatusRef.current && prevStatusRef.current !== statusKey) {
      const prev = prevStatusRef.current
      const [prevPeers] = prev.split('-').map(Number)

      if (liveStatus.peers !== prevPeers) {
        setEntries(prev => [{
          id: `peers-${Date.now()}`,
          type: 'status',
          label: 'Peer Change',
          value: `${liveStatus.peers} peer${liveStatus.peers !== 1 ? 's' : ''} connected`,
          timestamp: Date.now(),
        }, ...prev].slice(0, 50))
      }
    }

    prevStatusRef.current = statusKey
  }, [liveStatus])

  // Detect connection
  useEffect(() => {
    if (liveHealth?.status === 'alive') {
      setConnected(true)
    } else if (liveHealth === null) {
      // Keep connected state as-is during polling gaps
    }
  }, [liveHealth])

  const entryIcon = (type: string) => {
    switch (type) {
      case 'metric': return <Zap className="h-3 w-3 text-[#D4A574]" />
      case 'status': return <Users className="h-3 w-3 text-[#8C9E8E]" />
      case 'health': return <Activity className="h-3 w-3 text-[#8C9E8E]" />
      default: return <Hash className="h-3 w-3 text-[#A39B92]" />
    }
  }

  // Compute total events from metrics
  const totalEvents = liveMetrics?.eventsFinalized ?? liveMetrics?.dagEventsTotal ?? entries.length

  return (
    <section id="events" className="section-padding px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#F5F0EB] mb-2">
                Live Activity Feed
              </h2>
              <p className="text-sm text-[#A39B92]">
                Real-time consensus state from the testnet
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-[#A39B92]">
                <Activity className="h-3.5 w-3.5" />
                {totalEvents.toLocaleString()} events
              </span>
              <span className={`flex items-center gap-1.5 text-xs ${connected ? 'text-[#8C9E8E]' : 'text-[#A39B92]'}`}>
                <span className={`h-2 w-2 rounded-full ${connected ? 'bg-[#8C9E8E]' : 'bg-[#A39B92]'}`} />
                {connected ? 'Connected' : 'Polling...'}
              </span>
            </div>
          </div>

          <div
            className="border rounded-md overflow-hidden"
            style={{ borderColor: 'rgba(212, 165, 116, 0.15)' }}
          >
            {/* Header */}
            <div
              className="hidden sm:grid grid-cols-[1fr_100px_120px_80px] gap-2 px-4 py-2 text-xs text-[#A39B92] uppercase tracking-wider font-[family-name:var(--font-space-grotesk)] border-b"
              style={{ borderColor: 'rgba(212, 165, 116, 0.1)' }}
            >
              <span>Event</span>
              <span>Type</span>
              <span>Value</span>
              <span>Time</span>
            </div>

            {/* Feed entries */}
            <div className="max-h-80 overflow-y-auto">
              <AnimatePresence>
                {entries.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-[#6B6560]">
                    {connected
                      ? 'Waiting for consensus activity...'
                      : 'Connecting to testnet...'}
                  </div>
                ) : (
                  entries.map((entry, i) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`grid grid-cols-1 sm:grid-cols-[1fr_100px_120px_80px] gap-1 sm:gap-2 px-4 py-2.5 text-xs ${
                        i < entries.length - 1 ? 'border-b' : ''
                      }`}
                      style={{
                        borderColor: 'rgba(212, 165, 116, 0.08)',
                        background: i % 2 === 0 ? 'rgba(26, 26, 26, 0.3)' : 'transparent',
                      }}
                    >
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#F5F0EB] flex items-center gap-1.5 truncate">
                        {entryIcon(entry.type)}
                        {entry.label}
                      </span>
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#D4A574] capitalize">
                        {entry.type}
                      </span>
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#A39B92] truncate">
                        {entry.value}
                      </span>
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#6B6560] flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(entry.timestamp)}
                      </span>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Live metrics summary */}
          {connected && liveMetrics && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Consensus Rounds', value: liveMetrics.consensusRound?.toLocaleString() ?? '0', icon: Cpu },
                { label: 'DAG Events', value: liveMetrics.dagEventsTotal?.toLocaleString() ?? '0', icon: Hash },
                { label: 'TPS', value: liveMetrics.tps?.toLocaleString() ?? '0', icon: Zap },
                { label: 'Shard Ops', value: liveMetrics.shardOperationsTotal?.toLocaleString() ?? '0', icon: Activity },
              ].map(m => (
                <div
                  key={m.label}
                  className="border rounded-md px-3 py-2"
                  style={{ borderColor: 'rgba(212, 165, 116, 0.1)', background: 'rgba(26, 26, 26, 0.4)' }}
                >
                  <div className="flex items-center gap-1.5 text-xs text-[#A39B92] mb-1">
                    <m.icon className="h-3 w-3" />
                    {m.label}
                  </div>
                  <div className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-[#F5F0EB]">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
