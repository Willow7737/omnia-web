/**
 * React Query hooks for Omnia Protocol live data
 *
 * Provides real-time data fetching from the testnet with automatic
 * polling, caching, and error handling. Only active in LIVE_MODE.
 */

'use client'

import { useQuery } from '@tanstack/react-query'
import {
  isLiveMode,
  fetchHealth,
  fetchReadyz,
  fetchNodeStatus,
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
      const [health, readyz, status, nodes] = await Promise.all([
        fetchHealth(),
        fetchReadyz(),
        fetchNodeStatus(),
        fetchAllNodes(),
      ])

      const healthyNodes = nodes.filter(n => n.healthy).length

      return {
        eventsFinalized: readyz?.finalized_height ?? status?.finalized_height ?? 0,
        p50Latency: '—',
        activeValidators: healthyNodes,
        networkStatus: healthyNodes > 0
          ? (healthyNodes >= 3 ? 'Testnet Live' : 'Degraded')
          : 'Offline',
        healthy: health?.status === 'alive',
        nodeCount: nodes.length,
        nodes,
        status,
        health,
      }
    },
    enabled: isLiveMode,
    refetchInterval: POLL_INTERVAL,
    retry: 2,
    staleTime: POLL_INTERVAL / 2,
  })

  return { data, isLoading, error, refetch }
}

// ── Individual Node Data ───────────────────────────────────────────────────

export function useOmniaHealth() {
  return useQuery({
    queryKey: ['omnia-health'],
    queryFn: () => fetchHealth(),
    enabled: isLiveMode,
    refetchInterval: POLL_INTERVAL,
    retry: 2,
  })
}

export function useOmniaReadyz() {
  return useQuery({
    queryKey: ['omnia-readyz'],
    queryFn: () => fetchReadyz(),
    enabled: isLiveMode,
    refetchInterval: POLL_INTERVAL,
    retry: 2,
  })
}

export function useOmniaStatus() {
  return useQuery({
    queryKey: ['omnia-status'],
    queryFn: () => fetchNodeStatus(),
    enabled: isLiveMode,
    refetchInterval: POLL_INTERVAL,
    retry: 2,
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
    enabled: isLiveMode,
    refetchInterval: POLL_INTERVAL,
    retry: 2,
  })
}

export function useOmniaNodes() {
  return useQuery({
    queryKey: ['omnia-nodes'],
    queryFn: () => fetchAllNodes(),
    enabled: isLiveMode,
    refetchInterval: POLL_INTERVAL,
    retry: 2,
  })
}
