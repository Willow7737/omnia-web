/**
 * API Proxy Route
 *
 * Proxies requests from the browser to the Omnia Protocol nodes running
 * in Docker. This solves Docker networking and CORS issues.
 */

import { NextRequest, NextResponse } from 'next/server'

let _cachedNodeUrls: string[] | null = null

function getInternalNodeUrls(): string[] {
  if (_cachedNodeUrls && _cachedNodeUrls.length > 0) return _cachedNodeUrls

  const urls = (process.env.OMNIA_NODE_INTERNAL_URLS || '')
    .split(',')
    .map(u => u.trim())
    .filter(Boolean)

  if (urls.length === 0) {
    const single = process.env.OMNIA_API_URL || ''
    if (single) urls.push(single)
  }

  if (urls.length === 0) {
    urls.push('http://omnia-bootstrap:8080')
  }

  _cachedNodeUrls = urls
  return urls
}

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(
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
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const res = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        Accept: requestedPath === 'metrics' ? 'text/plain' : 'application/json',
      },
      cache: 'no-store',
    })

    clearTimeout(timeout)

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
    const message = err instanceof Error && err.name === 'AbortError'
      ? 'Request to node timed out'
      : err instanceof Error ? err.message : 'Proxy fetch failed'
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
    const timeout = setTimeout(() => controller.abort(), 8000)

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
      cache: 'no-store',
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
