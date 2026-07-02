import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export async function GET() {
  // Return benchmark fallback data for the dashboard.
  // When testnet is live, this would proxy to actual node endpoints.
  // Figures from omnia-protocol's Honest Performance Numbers table
  // (README, v0.1.68+ baselines; AMD Ryzen 9 7950X reference machine).
  const benchmarkData = {
    eventsFinalized: 0,
    p50Latency: '24.5µs',
    activeValidators: 1,
    networkStatus: 'Benchmark',
    healthy: false,
    tps: 12000,
    dagInsertP50: '18µs',
    vrfCompute: '19µs',
    groth16Expanded: '88ms',
    groth16Verify: '2.7ms',
    timestamp: new Date().toISOString(),
  }

  return NextResponse.json(benchmarkData)
}
