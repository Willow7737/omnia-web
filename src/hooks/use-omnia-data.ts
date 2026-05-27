/**
 * React Query hooks for Omnia Protocol live data
 *
 * Provides real-time data fetching from the testnet with automatic
 * polling, caching, and error handling. Always attempts live fetch;
 * components handle fallback when data is unavailable.
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import {
  fetchHealth,
  fetchReadyz,
  fetchNodeStatus,
  fetchPeers,
  fetchMetrics,
  fetchAllNodes,
  parsePrometheusMetrics,
  getPollInterval,
  type HealthResponse,
  type ReadyzResponse,
  type NodeStatusResponse,
  type NodeInfo,
} from '@/lib/omnia-client'

const POLL_INTERVAL = getPollInterval()

// ── Dashboard Data ─────────────────────────────────────────────────────────

export interface DashboardData {
  eventsFinalized: number
  p50Latency: string
  activeValidators: number
  networkStatus: string
  healthy: boolean
  nodeCount: number
  nodes: NodeInfo[]
  status: NodeStatusResponse | null
  health: HealthResponse | null
  metrics: {
    p50Latency: string
    p99Latency: string
    tps: number
  } | null
}

export function useOmniaDashboard(): {
  data: DashboardData | undefined
  isLoading: boolean
  error: Error | null
  refetch: () => void
} {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['omnia-dashboard'],
    queryFn: async (): Promise<DashboardData> => {
      const [health, readyz, status, nodes, rawMetrics] = await Promise.all([
        fetchHealth(),
        fetchReadyz(),
        fetchNodeStatus(),
        fetchAllNodes(),
        fetchMetrics(),
      ])

      const healthyNodes = nodes.filter(n => n.healthy).length
      const parsedMetrics = rawMetrics ? parsePrometheusMetrics(rawMetrics) : null

      const eventsFinalized = readyz?.finalized_height
        ?? status?.finalized_height
        ?? parsedMetrics?.eventsFinalized
        ?? 0

      const peerCount = readyz?.peers
        ?? status?.peers
        ?? parsedMetrics?.peerCount
        ?? 0

      return {
        eventsFinalized,
        p50Latency: parsedMetrics?.p50Latency ?? '—',
        activeValidators: peerCount > 0 ? peerCount : (healthyNodes || 1),
        networkStatus: health?.status === 'alive'
          ? (peerCount >= 3 ? 'Testnet Live' : peerCount > 0 ? 'Degraded' : 'Single Node')
          : 'Offline',
        healthy: health?.status === 'alive',
        nodeCount: nodes.length,
        nodes,
        status,
        health,
        metrics: parsedMetrics
          ? {
              p50Latency: parsedMetrics.p50Latency ?? '—',
              p99Latency: parsedMetrics.p99Latency ?? '—',
              tps: parsedMetrics.tps ?? 0,
            }
          : null,
      }
    },
    refetchInterval: POLL_INTERVAL,
    retry: 1,
    staleTime: POLL_INTERVAL / 2,
  })

  return { data, isLoading, error, refetch }
}

// ── Individual Data Hooks ──────────────────────────────────────────────────

export function useOmniaHealth() {
  return useQuery({
    queryKey: ['omnia-health'],
    queryFn: () => fetchHealth(),
    refetchInterval: POLL_INTERVAL,
    retry: 1,
  })
}

export function useOmniaReadyz() {
  return useQuery({
    queryKey: ['omnia-readyz'],
    queryFn: () => fetchReadyz(),
    refetchInterval: POLL_INTERVAL,
    retry: 1,
  })
}

export function useOmniaStatus() {
  return useQuery({
    queryKey: ['omnia-status'],
    queryFn: () => fetchNodeStatus(),
    refetchInterval: POLL_INTERVAL,
    retry: 1,
  })
}

export function useOmniaPeers() {
  return useQuery({
    queryKey: ['omnia-peers'],
    queryFn: () => fetchPeers(),
    refetchInterval: POLL_INTERVAL,
    retry: 1,
  })
}

export function useOmniaMetrics() {
  return useQuery({
    queryKey: ['omnia-metrics'],
    queryFn: async () => {
      const raw = await fetchMetrics()
      if (!raw) return null
      return parsePrometheusMetrics(raw)
    },
    refetchInterval: POLL_INTERVAL,
    retry: 1,
  })
}

export function useOmniaNodes() {
  return useQuery({
    queryKey: ['omnia-nodes'],
    queryFn: () => fetchAllNodes(),
    refetchInterval: POLL_INTERVAL,
    retry: 1,
  })
}
