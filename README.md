# Omnia Protocol — Website

The official website for the [Omnia Protocol](https://github.com/Willow7737/omnia-protocol). A single-page site built with Next.js 16, Tailwind CSS, and Framer Motion.

## Design

"Warm Infrastructure Minimalism" — a protocol-grade single-page site that uses warm, human colors. No marketing buzzwords. No exclamation points. Every claim is traceable to a repo file, benchmark, or API response.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Space Grotesk, JetBrains Mono, Inter

## Local Development

```bash
bun install
bun run dev
```

Open [Omnia](https://willow7737.github.io/omnia-web/#api).

## Updating the API Endpoint

When the devnet moves, update the status endpoint URL in these files:

1. **`src/components/hero-section.tsx`** — The live status widget currently uses simulated data. Replace the `useEffect` polling simulation with a real `fetch()` call to the devnet endpoint:

```typescript
// Replace the simulated polling with:
useEffect(() => {
  const poll = async () => {
    try {
      const res = await fetch('https://devnet.omnia.protocol/healthz')
      const data = await res.json()
      setEventsFinalized(data.finalized_height)
      // Update other metrics from the response
    } catch {
      // Show "Devnet Offline" — already handled in the UI
    }
  }
  poll()
  const interval = setInterval(poll, 5000)
  return () => clearInterval(interval)
}, [])
```

2. **`src/components/curl-section.tsx`** — Update the `curl` command URL if the endpoint changes.

### API Endpoints Reference

| Endpoint | Description |
|----------|-------------|
| `GET /healthz` | Liveness probe: `{ status, node_id, uptime_seconds }` |
| `GET /readyz` | Readiness probe: `{ status, peers, finalized_height }` |
| `GET /api/v1/node/info` | Full node info (JWT required) |
| `GET /metrics` | Prometheus metrics |

### CORS

If the API isn't CORS-enabled yet, proxy requests through a Next.js API route in `src/app/api/` or a serverless function. The current implementation uses simulated data to avoid this issue.

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Omnia color palette, custom animations
│   ├── layout.tsx           # Root layout with fonts
│   └── page.tsx             # Main page composing all sections
├── components/
│   ├── omnia-nav.tsx        # Fixed navigation with mobile menu
│   ├── hero-section.tsx     # Hero with live status widget
│   ├── curl-section.tsx     # curl proof with copy button
│   ├── architecture-section.tsx  # 6-layer stack diagram
│   ├── agent-section.tsx    # AI agent identity section
│   ├── performance-section.tsx   # Performance dashboard
│   ├── transparency-section.tsx  # Stub inventory table
│   ├── contribute-section.tsx    # Contribute/support section
│   ├── footer.tsx           # Site footer
│   ├── animated-number.tsx  # Count-up animation component
│   └── agent-svgs.tsx       # Geometric robot SVG illustrations
```

## License

CC0 — same as the Omnia Protocol itself.
