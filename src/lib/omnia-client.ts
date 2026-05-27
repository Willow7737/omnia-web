/**
 * Omnia Protocol API Client
 *
 * Centralized client for communicating with Omnia Protocol testnet nodes.
 * Always attempts to fetch live data. Returns null on failure so
 * components can show graceful fallbacks.
 */

// ── Types ──────────────────────────────────────────────────────────────────

export interface HealthResponse {
  status: string
  node_id: string
  uptime_seconds: number
}

export interface ReadyzResponse {
  status: string
  peers: number
  finalized_height: number
}

export interface NodeStatusResponse {
  status: string
  node_id: string
  uptime_seconds: number
  finalized_height: number
  peers: number
  version: string
}

export interface NodeInfo {
  id: string
  name: string
  url: string
  health: HealthResponse | null
  status: NodeStatusResponse | null
  healthy: boolean
  lastChecked: number | null
}

// ── Configuration ──────────────────────────────────────────────────────────

function getApiBase(): string {
  return process.env.NEXT_PUBLIC_OMNIA_API_URL || 'http://localhost:9090'
}

function getNodeUrls(): string[] {
  return (process.env.NEXT_PUBLIC_OMNIA_NODE_URLS || 'http://localhost:9090')
    .split(',')
    .map((u: string) => u.trim())
    .filter(Boolean)
}

function getPollInterval(): number {
  return parseInt(process.env.NEXT_PUBLIC_POLL_INTERVAL_MS || '5000', 10)
}

export { getApiBase, getNodeUrls, getPollInterval }

// ── Fetch Helper ───────────────────────────────────────────────────────────

async function fetchWithTimeout(url: string, timeoutMs = 5000): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
    return res
  } finally {
    clearTimeout(timeout)
  }
}

// ── API Functions ──────────────────────────────────────────────────────────

export async function fetchHealth(baseUrl?: string): Promise<HealthResponse | null> {
  const base = baseUrl || getApiBase()
  try {
    const res = await fetchWithTimeout(`${base}/health`)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function fetchReadyz(baseUrl?: string): Promise<ReadyzResponse | null> {
  const base = baseUrl || getApiBase()
  try {
    const res = await fetchWithTimeout(`${base}/readyz`)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function fetchNodeStatus(baseUrl?: string): Promise<NodeStatusResponse | null> {
  const base = baseUrl || getApiBase()
  try {
    const res = await fetchWithTimeout(`${base}/v1/status`)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function fetchMetrics(baseUrl?: string): Promise<string | null> {
  const base = baseUrl || getApiBase()
  try {
    const res = await fetchWithTimeout(`${base}/metrics`)
    if (!res.ok) return null
    return await res.text()
  } catch {
    return null
  }
}

export async function fetchAllNodes(): Promise<NodeInfo[]> {
  const urls = getNodeUrls()
  const nodes = await Promise.all(
    urls.map(async (url, index) => {
      const [health, status] = await Promise.all([
        fetchHealth(url),
        fetchNodeStatus(url),
      ])
      return {
        id: `node-${index}`,
        name: index === 0 ? 'Bootstrap' : `Node ${index}`,
        url,
        health,
        status,
        healthy: health?.status === 'alive',
        lastChecked: Date.now(),
      }
    })
  )
  return nodes
}

// ── Prometheus Metrics Parser ──────────────────────────────────────────────

export interface ParsedMetrics {
  eventsFinalized: number
  p50Latency: string
  p99Latency: string
  activeValidators: number
  peerCount: number
  uptime: number
  tps: number
}

export function parsePrometheusMetrics(text: string): Partial<ParsedMetrics> {
  const metrics: Partial<ParsedMetrics> = {}

  const lines = text.split('\n')
  for (const line of lines) {
    if (line.startsWith('#') || !line.trim()) continue

    const match = line.match(/^(\w+)(?:\{[^}]*\})?\s+([\d.e+-]+|nan|inf)/)
    if (!match) continue

    const [, name, value] = match
    const num = parseFloat(value)

    switch (name) {
      case 'omnia_consensus_events_finalized_total':
        metrics.eventsFinalized = num
        break
      case 'omnia_consensus_finality_latency_p50':
        metrics.p50Latency = `${num.toFixed(2)}µs`
        break
      case 'omnia_consensus_finality_latency_p99':
        metrics.p99Latency = `${num.toFixed(2)}µs`
        break
      case 'omnia_network_active_peers':
        metrics.peerCount = num
        break
      case 'omnia_node_uptime_seconds':
        metrics.uptime = num
        break
      case 'omnia_consensus_active_validators':
        metrics.activeValidators = num
        break
      case 'omnia_consensus_tps':
        metrics.tps = num
        break
    }
  }

  return metrics
}
