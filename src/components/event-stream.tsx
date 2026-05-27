'use client'

/**
 * Real-time event stream component
 *
 * Displays a live feed of consensus events from the Omnia Protocol testnet.
 * Uses Server-Sent Events (SSE) for efficient real-time streaming.
 */

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Clock, Hash } from 'lucide-react'

const isLiveMode = process.env.NEXT_PUBLIC_LIVE_MODE === 'true'

export interface ConsensusEvent {
  id: string
  creator: string
  sequence: number
  timestamp: number
  parents: string[]
  payload_hash: string
}

export function EventStream() {
  const [events, setEvents] = useState<ConsensusEvent[]>([])
  const [connected, setConnected] = useState(false)
  const [eventCount, setEventCount] = useState(0)

  const handleEvent = useCallback((event: ConsensusEvent) => {
    setEvents(prev => {
      const next = [event, ...prev].slice(0, 50) // Keep last 50 events
      return next
    })
    setEventCount(prev => prev + 1)
  }, [])

  useEffect(() => {
    if (!isLiveMode) return

    const apiBase = process.env.NEXT_PUBLIC_OMNIA_API_URL || 'http://localhost:9090'

    // Try SSE connection first
    let eventSource: EventSource | null = null
    let pollInterval: ReturnType<typeof setInterval> | null = null

    const connectSSE = () => {
      try {
        eventSource = new EventSource(`${apiBase}/v1/events/stream`)

        eventSource.onopen = () => setConnected(true)

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
          eventSource?.close()
          // Fall back to polling
          startPolling()
        }
      } catch {
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
            if (Array.isArray(data)) {
              data.forEach((e: ConsensusEvent) => handleEvent(e))
            }
          }
        } catch {
          setConnected(false)
        }
      }, 5000)
    }

    connectSSE()

    return () => {
      eventSource?.close()
      if (pollInterval) clearInterval(pollInterval)
    }
  }, [handleEvent])

  if (!isLiveMode) return null

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
              <span className={`flex items-center gap-1.5 text-xs ${connected ? 'text-[#8C9E8E]' : 'text-[#6B6560]'}`}>
                <span className={`h-2 w-2 rounded-full ${connected ? 'bg-[#8C9E8E]' : 'bg-[#6B6560]'}`} />
                {connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>

          <div
            className="border rounded-md overflow-hidden"
            style={{ borderColor: 'rgba(212, 165, 116, 0.15)' }}
          >
            {/* Header */}
            <div
              className="grid grid-cols-[1fr_80px_120px_100px] gap-2 px-4 py-2 text-xs text-[#A39B92] uppercase tracking-wider font-[family-name:var(--font-space-grotesk)] border-b"
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
                    Waiting for events...
                  </div>
                ) : (
                  events.map((event, i) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`grid grid-cols-[1fr_80px_120px_100px] gap-2 px-4 py-2.5 text-xs ${
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
                        #{event.sequence}
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
