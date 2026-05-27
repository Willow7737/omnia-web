'use client'

/**
 * Real-time event stream component
 *
 * Displays a live feed of consensus events from the Omnia Protocol testnet.
 * Uses Server-Sent Events (SSE) for efficient real-time streaming,
 * with polling fallback. Shows sample events when testnet is offline.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Clock, Hash } from 'lucide-react'

export interface ConsensusEvent {
  id: string
  creator: string
  sequence: number
  timestamp: number
  parents: string[]
  payload_hash: string
}

// Sample events shown when testnet is offline
const SAMPLE_EVENTS: ConsensusEvent[] = [
  {
    id: '0xa3f7c2e1b8d94f6a0c5e3d2b1a9f8e7c',
    creator: '0x4b2a1c9e8d7f6a5b4c3d2e1f0a9b8c7d',
    sequence: 7190001,
    timestamp: Date.now() - 5000,
    parents: ['0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d'],
    payload_hash: '0xd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9',
  },
  {
    id: '0xb4g8d3f2c9e0a5b1d6e4f3c2b0a9e8d7',
    creator: '0x5c3b2d0f9e8a7b6c5d4e3f2a1b0c9d8e',
    sequence: 7190002,
    timestamp: Date.now() - 4000,
    parents: ['0xa3f7c2e1b8d94f6a0c5e3d2b1a9f8e7c'],
    payload_hash: '0xe5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0',
  },
  {
    id: '0xc5h9e4a3d0f1b6c2e7f5a4d3c1b0f9e8',
    creator: '0x6d4c3e1a0f9b8c7d6e5f4a3b2c1d0e9f',
    sequence: 7190003,
    timestamp: Date.now() - 3000,
    parents: ['0xb4g8d3f2c9e0a5b1d6e4f3c2b0a9e8d7'],
    payload_hash: '0xf6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1',
  },
  {
    id: '0xd6i0f5b4e1a2c7d3f8a6b5e4d2c1a0f9',
    creator: '0x7e5d4f2b1a0c9d8e7f6a5b4c3d2e1f0a',
    sequence: 7190004,
    timestamp: Date.now() - 2000,
    parents: ['0xc5h9e4a3d0f1b6c2e7f5a4d3c1b0f9e8'],
    payload_hash: '0xa7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2',
  },
  {
    id: '0xe7j1a6c5f2b3d8e4a9c7d6f5e3d2b1a0',
    creator: '0x8f6e5a3c2b1d0e9f8a7b6c5d4e3f2a1b',
    sequence: 7190005,
    timestamp: Date.now() - 1000,
    parents: ['0xd6i0f5b4e1a2c7d3f8a6b5e4d2c1a0f9'],
    payload_hash: '0xb8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3',
  },
]

export function EventStream() {
  const [events, setEvents] = useState<ConsensusEvent[]>([])
  const [connected, setConnected] = useState(false)
  const [eventCount, setEventCount] = useState(0)
  const [triedConnect, setTriedConnect] = useState(false)
  const hasShownSample = useRef(false)

  const handleEvent = useCallback((event: ConsensusEvent) => {
    setEvents(prev => {
      const next = [event, ...prev].slice(0, 50)
      return next
    })
    setEventCount(prev => prev + 1)
  }, [])

  // Show sample events when offline
  useEffect(() => {
    if (triedConnect && !connected && events.length === 0 && !hasShownSample.current) {
      hasShownSample.current = true
      SAMPLE_EVENTS.forEach((e, i) => {
        setTimeout(() => handleEvent(e), i * 150)
      })
    }
  }, [triedConnect, connected, events.length, handleEvent])

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_OMNIA_API_URL || 'http://localhost:9090'

    let eventSource: EventSource | null = null
    let pollInterval: ReturnType<typeof setInterval> | null = null

    const connectSSE = () => {
      try {
        eventSource = new EventSource(`${apiBase}/v1/events/stream`)

        eventSource.onopen = () => {
          setConnected(true)
          setTriedConnect(true)
        }

        eventSource.onmessage = (e) => {
          try {
            const data = JSON.parse(e.data) as ConsensusEvent
            handleEvent(data)
          } catch {
            // Ignore malformed events
          }
        }

        eventSource.onerror = () => {
          setConnected(false)
          setTriedConnect(true)
          eventSource?.close()
          startPolling()
        }
      } catch {
        setTriedConnect(true)
        startPolling()
      }
    }

    const startPolling = () => {
      if (pollInterval) return
      pollInterval = setInterval(async () => {
        try {
          const res = await fetch(`${apiBase}/v1/events/recent?limit=5`)
          if (res.ok) {
            const data = await res.json()
            setConnected(true)
            setTriedConnect(true)
            if (Array.isArray(data)) {
              data.forEach((e: ConsensusEvent) => handleEvent(e))
            }
          }
        } catch {
          setConnected(false)
          setTriedConnect(true)
        }
      }, 5000)
    }

    connectSSE()

    return () => {
      eventSource?.close()
      if (pollInterval) clearInterval(pollInterval)
    }
  }, [handleEvent])

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
                Live Event Stream
              </h2>
              <p className="text-sm text-[#A39B92]">
                Real-time consensus events from the testnet
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-[#A39B92]">
                <Activity className="h-3.5 w-3.5" />
                {eventCount} events
              </span>
              <span className={`flex items-center gap-1.5 text-xs ${connected ? 'text-[#8C9E8E]' : 'text-[#A39B92]'}`}>
                <span className={`h-2 w-2 rounded-full ${connected ? 'bg-[#8C9E8E]' : 'bg-[#A39B92]'}`} />
                {connected ? 'Connected' : !triedConnect ? 'Connecting...' : 'Sample Data'}
              </span>
            </div>
          </div>

          <div
            className="border rounded-md overflow-hidden"
            style={{ borderColor: 'rgba(212, 165, 116, 0.15)' }}
          >
            {/* Header */}
            <div
              className="hidden sm:grid grid-cols-[1fr_80px_120px_100px] gap-2 px-4 py-2 text-xs text-[#A39B92] uppercase tracking-wider font-[family-name:var(--font-space-grotesk)] border-b"
              style={{ borderColor: 'rgba(212, 165, 116, 0.1)' }}
            >
              <span>Event ID</span>
              <span>Seq</span>
              <span>Creator</span>
              <span>Time</span>
            </div>

            {/* Events */}
            <div className="max-h-80 overflow-y-auto">
              <AnimatePresence>
                {events.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-[#6B6560]">
                    Loading events...
                  </div>
                ) : (
                  events.map((event, i) => (
                    <motion.div
                      key={`${event.id}-${i}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`grid grid-cols-1 sm:grid-cols-[1fr_80px_120px_100px] gap-1 sm:gap-2 px-4 py-2.5 text-xs ${
                        i < events.length - 1 ? 'border-b' : ''
                      }`}
                      style={{
                        borderColor: 'rgba(212, 165, 116, 0.08)',
                        background: i % 2 === 0 ? 'rgba(26, 26, 26, 0.3)' : 'transparent',
                      }}
                    >
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#F5F0EB] flex items-center gap-1.5 truncate">
                        <Hash className="h-3 w-3 text-[#A39B92] shrink-0" />
                        {event.id.slice(0, 16)}...
                      </span>
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#D4A574]">
                        #{event.sequence.toLocaleString()}
                      </span>
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#A39B92] truncate">
                        {event.creator.slice(0, 10)}...
                      </span>
                      <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#6B6560] flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(event.timestamp)}
                      </span>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Note */}
          {!connected && triedConnect && (
            <p className="text-xs text-[#A39B92] mt-3">
              Showing sample events from v0.1.60 benchmarks. Connect to a testnet for live data.
            </p>
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
