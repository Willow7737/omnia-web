/**
 * Debug endpoint — returns proxy configuration and connectivity test results.
 */

import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  const nodeUrls = (process.env.OMNIA_NODE_INTERNAL_URLS || '')
    .split(',')
    .map(u => u.trim())
    .filter(Boolean)

  const singleUrl = process.env.OMNIA_API_URL || ''
  const publicUrl = process.env.NEXT_PUBLIC_OMNIA_API_URL || ''
  const pollInterval = process.env.NEXT_PUBLIC_POLL_INTERVAL_MS || ''
  const liveMode = process.env.NEXT_PUBLIC_LIVE_MODE || ''

  const connectivityTests = await Promise.all(
    nodeUrls.map(async (url, i) => {
      try {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 3000)
        const res = await fetch(`${url}/healthz`, {
          signal: controller.signal,
          cache: 'no-store',
        })
        clearTimeout(timeout)
        const body = await res.text()
        return { url, index: i, status: res.status, ok: res.ok, body: body.substring(0, 200) }
      } catch (err) {
        return {
          url,
          index: i,
          status: 0,
          ok: false,
          body: err instanceof Error ? err.message : 'Unknown error',
        }
      }
    })
  )

  if (nodeUrls.length === 0 && singleUrl) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 3000)
      const res = await fetch(`${singleUrl}/healthz`, {
        signal: controller.signal,
        cache: 'no-store',
      })
      clearTimeout(timeout)
      const body = await res.text()
      connectivityTests.push({ url: singleUrl, index: 0, status: res.status, ok: res.ok, body: body.substring(0, 200) })
    } catch (err) {
      connectivityTests.push({
        url: singleUrl,
        index: 0,
        status: 0,
        ok: false,
        body: err instanceof Error ? err.message : 'Unknown error',
      })
    }
  }

  return NextResponse.json({
    env: {
      OMNIA_NODE_INTERNAL_URLS: process.env.OMNIA_NODE_INTERNAL_URLS || '(not set)',
      OMNIA_API_URL: singleUrl || '(not set)',
      NEXT_PUBLIC_OMNIA_API_URL: publicUrl || '(not set)',
      NEXT_PUBLIC_POLL_INTERVAL_MS: pollInterval || '(not set)',
      NEXT_PUBLIC_LIVE_MODE: liveMode || '(not set)',
      NODE_ENV: process.env.NODE_ENV || '(not set)',
    },
    nodeUrls,
    nodeCount: nodeUrls.length || (singleUrl ? 1 : 0),
    connectivity: connectivityTests,
  })
}
