/**
 * API Proxy Route
 *
 * Proxies requests from the browser to the Omnia Protocol nodes running
 * in Docker. This solves two critical problems:
 *
 * 1. **Docker networking**: The browser can't reach container DNS names
 *    like `omnia-bootstrap:8080`. The server can.
 * 2. **CORS**: The browser makes same-origin requests to this proxy,
 *    avoiding cross-origin issues entirely.
 *
 * Environment variables (read at RUNTIME, not build time):
 * - `OMNIA_NODE_INTERNAL_URLS` — comma-separated internal Docker URLs
 *   e.g. `http://omnia-bootstrap:8080,http://omnia-node-1:8080,...`
 * - `OMNIA_API_URL` — primary node internal URL (default: first in list)
 *
 * Query parameters:
 * - `node` — index into the node list (0=bootstrap, 1=node-1, etc.)
 */

import { NextRequest, NextResponse } from 'next/server'

function getInternalNodeUrls(): string[] {
  const urls = (process.env.OMNIA_NODE_INTERNAL_URLS || '')
    .split(',')
    .map(u => u.trim())
    .filter(Boolean)

  // Fallback: try a single API URL
  if (urls.length === 0) {
    const single = process.env.OMNIA_API_URL || ''
    if (single) urls.push(single)
  }

  // Last resort: default Docker DNS name for bootstrap
  if (urls.length === 0) {
    urls.push('http://omnia-bootstrap:8080')
  }

  return urls
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params
  const requestedPath = path.join('/')

  // Determine which node to query
  const nodeIndex = parseInt(request.nextUrl.searchParams.get('node') || '0', 10)
  const nodeUrls = getInternalNodeUrls()
  const baseUrl = nodeUrls[Math.min(nodeIndex, nodeUrls.length - 1)]

  // Build the target URL
  const targetUrl = `${baseUrl}/${requestedPath}`

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    const res = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        // Forward any auth header if provided
        ...(request.headers.get('Authorization')
          ? { Authorization: request.headers.get('Authorization')! }
          : {}),
      },
    })

    clearTimeout(timeout)

    // For /metrics endpoint, return as text; for everything else, JSON
    const isText = requestedPath === 'metrics'

    const body = await res.text()

    return new NextResponse(body, {
      status: res.status,
      headers: {
        'Content-Type': isText ? 'text/plain; version=0.0.4; charset=utf-8' : 'application/json',
        'Cache-Control': 'no-store, max-age=0',
        'X-Omnia-Proxy': 'true',
        'X-Omnia-Node-Url': baseUrl,
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Proxy fetch failed'
    return NextResponse.json(
      { error: message, proxy: true, target: targetUrl },
      { status: 502 },
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params
  const requestedPath = path.join('/')

  const nodeIndex = parseInt(request.nextUrl.searchParams.get('node') || '0', 10)
  const nodeUrls = getInternalNodeUrls()
  const baseUrl = nodeUrls[Math.min(nodeIndex, nodeUrls.length - 1)]

  const targetUrl = `${baseUrl}/${requestedPath}`

  try {
    const body = await request.text()
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    const res = await fetch(targetUrl, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': request.headers.get('Content-Type') || 'application/json',
        ...(request.headers.get('Authorization')
          ? { Authorization: request.headers.get('Authorization')! }
          : {}),
      },
      body,
    })

    clearTimeout(timeout)

    const responseBody = await res.text()

    return new NextResponse(responseBody, {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
        'X-Omnia-Proxy': 'true',
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Proxy fetch failed'
    return NextResponse.json(
      { error: message, proxy: true, target: targetUrl },
      { status: 502 },
    )
  }
}
