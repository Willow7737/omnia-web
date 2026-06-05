import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export async function GET() {
  // Return benchmark fallback data for the dashboard
  // When testnet is live, this would proxy to actual node endpoints
  const benchmarkData = {
    eventsFinalized: 7190000,
    p50Latency: '93.47µs',
    p95Latency: '154.76µs',
    p99Latency: '177.06µs',
    activeValidators: 1,
    networkStatus: 'Benchmark',
    healthy: false,
    tps: 7190,
    dagInsertP50: '18.09µs',
    vrfCompute: '18.73µs',
    vrfVerify: '38.61µs',
    groth16Basic: '1.73ms',
    groth16Expanded: '317.01ms',
    groth16Verify: '2.67ms',
    timestamp: new Date().toISOString(),
  }

  return NextResponse.json(benchmarkData)
}
