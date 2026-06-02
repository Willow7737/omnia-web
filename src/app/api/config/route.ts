/**
 * Runtime Configuration Endpoint
 *
 * Exposes server-side env vars to the client at runtime.
 * This is needed because NEXT_PUBLIC_* vars are baked in at build time,
 * but Docker Compose sets env vars at runtime.
 *
 * Returns:
 * - nodeCount: number of available nodes
 * - pollIntervalMs: polling interval in milliseconds
 * - publicApiUrl: external-facing API URL for curl examples (if set)
 */

import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export async function GET() {
  const internalUrls = (process.env.OMNIA_NODE_INTERNAL_URLS || '')
    .split(',')
    .map(u => u.trim())
    .filter(Boolean)

  // External URL is for curl examples shown in the UI
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
