/**
 * Omnia Protocol API Client
 *
 * Centralized client for communicating with Omnia Protocol testnet nodes.
 * Always attempts to fetch live data. Returns null on failure so
 * components can show graceful fallbacks.
 *
 * Endpoint mapping to the actual omnia-node API:
 * - GET /health              → liveness probe
 * - GET /readyz              → readiness probe
 * - GET /api/v1/node/info    → full node status
 * - GET /api/v1/node/peers   → peer list
 * - GET /metrics             → Prometheus metrics
 */

// ── Types ──────────────────────────────────────────────────────────────────

export interface HealthResponse {
  node_id: number
  status: string
  uptime_seconds: number
}

export interface ReadyzResponse {
  node_id: number
  status: string
  peers: number
  is_syncing: boolean
  reason?: string
  finalized_height?: number
}

export interface NodeStatusResponse {
  node_id: string
  node_id_num: number
  version: string
  protocol_version: string
  finalized_height: number
  peers: number
  shard_count: number
  listen_addr: string
  data_dir: string
  uptime_seconds: number
}

export interface PeerInfo {
  id: string
  addr: string
  connected_at?: number
}

export interface PeersResponse {
  count: number
  peers: PeerInfo[]
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
    const res = await fetchWithTimeout(`${base}/api/v1/node/info`)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function fetchPeers(baseUrl?: string): Promise<PeersResponse | null> {
  const base = baseUrl || getApiBase()
  try {
    const res = await fetchWithTimeout(`${base}/api/v1/node/peers`)
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
  dagEventsTotal: number
  eventsSubmittedTotal: number
  consensusRound: number
  httpRequestsTotal: number
  memoryRssBytes: number
  shardOperationsTotal: number
  gossipPropagationP50: string
  dagInsertP50: string
}

export function parsePrometheusMetrics(text: string): Partial<ParsedMetrics> {
  const metrics: Partial<ParsedMetrics> = {}

  // Collect histogram bucket counts for percentile computation
  const histogramBuckets: Record<string, Record<string, number>> = {}
  const histogramSums: Record<string, number> = {}
  const histogramCounts: Record<string, number> = {}

  const lines = text.split('\n')
  for (const line of lines) {
    if (line.startsWith('#') || !line.trim()) continue

    const match = line.match(/^(\w+)(?:\{([^}]*)\})?\s+([\d.e+-]+|nan|inf)/)
    if (!match) continue

    const [, name, labels, value] = match
    const num = parseFloat(value)

    // Collect histogram buckets for percentile computation
    if (name.endsWith('_bucket')) {
      const baseName = name.replace(/_bucket$/, '')
      if (!histogramBuckets[baseName]) histogramBuckets[baseName] = {}
      const leMatch = labels?.match(/le="([^"]+)"/)
      if (leMatch) {
        histogramBuckets[baseName][leMatch[1]] = num
      }
    } else if (name.endsWith('_sum')) {
      const baseName = name.replace(/_sum$/, '')
      histogramSums[baseName] = num
    } else if (name.endsWith('_count')) {
      const baseName = name.replace(/_count$/, '')
      histogramCounts[baseName] = num
    }

    switch (name) {
      case 'omnia_node_events_finalized_total':
        metrics.eventsFinalized = num
        break
      case 'omnia_consensus_tps':
        metrics.tps = num
        break
      case 'omnia_dag_events_total':
        metrics.dagEventsTotal = num
        break
      case 'omnia_node_events_submitted_total':
        metrics.eventsSubmittedTotal = num
        break
      case 'omnia_node_peers_connected':
        metrics.peerCount = num
        break
      case 'omnia_node_consensus_round':
        metrics.consensusRound = num
        break
      case 'omnia_node_http_requests_total':
        metrics.httpRequestsTotal = num
        break
      case 'omnia_node_memory_rss_bytes':
        metrics.memoryRssBytes = num
        break
      case 'omnia_node_shard_operations_total':
        metrics.shardOperationsTotal = num
        break
    }
  }

  // Compute percentiles from histogram buckets
  // For finality latency
  const finalityBuckets = histogramBuckets['omnia_consensus_finality_latency_seconds']
  if (finalityBuckets && histogramCounts['omnia_consensus_finality_latency_seconds']) {
    const totalCount = histogramCounts['omnia_consensus_finality_latency_seconds']
    if (totalCount > 0) {
      const p50 = computePercentile(finalityBuckets, totalCount, 0.50)
      const p99 = computePercentile(finalityBuckets, totalCount, 0.99)
      if (p50 !== null) metrics.p50Latency = `${(p50 * 1_000_000).toFixed(2)}µs`
      if (p99 !== null) metrics.p99Latency = `${(p99 * 1_000_000).toFixed(2)}µs`
    }
  }

  // For gossip propagation latency
  const gossipBuckets = histogramBuckets['omnia_gossip_propagation_latency_seconds']
  if (gossipBuckets && histogramCounts['omnia_gossip_propagation_latency_seconds']) {
    const totalCount = histogramCounts['omnia_gossip_propagation_latency_seconds']
    if (totalCount > 0) {
      const p50 = computePercentile(gossipBuckets, totalCount, 0.50)
      if (p50 !== null) metrics.gossipPropagationP50 = `${(p50 * 1_000_000).toFixed(2)}µs`
    }
  }

  // For DAG insertion latency
  const dagBuckets = histogramBuckets['omnia_dag_insertion_latency_seconds']
  if (dagBuckets && histogramCounts['omnia_dag_insertion_latency_seconds']) {
    const totalCount = histogramCounts['omnia_dag_insertion_latency_seconds']
    if (totalCount > 0) {
      const p50 = computePercentile(dagBuckets, totalCount, 0.50)
      if (p50 !== null) metrics.dagInsertP50 = `${(p50 * 1_000_000).toFixed(2)}µs`
    }
  }

  return metrics
}

/**
 * Compute a percentile value from Prometheus histogram buckets using linear interpolation.
 *
 * Prometheus histograms expose cumulative bucket counts with `le` (less-than-or-equal) labels.
 * This function finds the two buckets that bracket the requested percentile and
 * linearly interpolates between them.
 */
function computePercentile(
  buckets: Record<string, number>,
  totalCount: number,
  percentile: number,
): number | null {
  // Sort bucket boundaries numerically
  const sortedLe = Object.keys(buckets)
    .filter(le => le !== '+Inf')
    .map(le => parseFloat(le))
    .sort((a, b) => a - b)

  if (sortedLe.length === 0) return null

  const targetCount = totalCount * percentile

  let prevCount = 0
  let prevLe = 0

  for (const le of sortedLe) {
    const count = buckets[le.toString()] ?? 0
    if (count >= targetCount) {
      // Linear interpolation between the previous bucket and this one
      if (count === prevCount) return le
      const fraction = (targetCount - prevCount) / (count - prevCount)
      return prevLe + fraction * (le - prevLe)
    }
    prevCount = count
    prevLe = le
  }

  // Percentile is above all bucket boundaries — return the largest boundary
  return sortedLe[sortedLe.length - 1]
}
