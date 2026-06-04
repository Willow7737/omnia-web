/**
 * Runtime Configuration Endpoint
 */

import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export async function GET() {
  const internalUrls = (process.env.OMNIA_NODE_INTERNAL_URLS || '')
    .split(',')
    .map(u => u.trim())
    .filter(Boolean)

  const publicApiUrl = process.env.NEXT_PUBLIC_OMNIA_API_URL || 'http://localhost:9090'

  const pollIntervalMs = parseInt(
    process.env.POLL_INTERVAL_MS || process.env.NEXT_PUBLIC_POLL_INTERVAL_MS || '5000',
    10,
  )

  return NextResponse.json({
    nodeCount: internalUrls.length || 1,
    pollIntervalMs,
    publicApiUrl,
  })
}
