# Omnia Protocol — Website

The official website for the [Omnia Protocol](https://github.com/Willow7737/omnia-protocol). A single-page site built with Next.js 16, Tailwind CSS, and Framer Motion.

## Design

"Warm Infrastructure Minimalism" — a protocol-grade single-page site that uses warm, human colors. No marketing buzzwords. No exclamation points. Every claim is traceable to a repo file, benchmark, or API response.

## Tech Stack

- **Framework**: Next.js 16 (App Router, static export)
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Data**: TanStack React Query (live testnet data)
- **Icons**: Lucide React
- **Fonts**: Space Grotesk, JetBrains Mono, Inter

## Local Development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Live Mode

By default, the site runs in **static mode** — it shows benchmark data from v0.1.60 single-node tests. To connect to a live testnet:

```bash
NEXT_PUBLIC_LIVE_MODE=true \
NEXT_PUBLIC_OMNIA_API_URL=http://localhost:9090 \
bun run dev
```

When `NEXT_PUBLIC_LIVE_MODE=true`, the site switches from static export to SSR mode, enabling:
- Real-time data from the testnet API
- Server-Sent Events for the event stream
- Prometheus metrics parsing

## Updating the API Endpoint

When the devnet moves, update the status endpoint URL via environment variables:

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_OMNIA_API_URL` | `http://localhost:9090` | Primary node API endpoint |
| `NEXT_PUBLIC_OMNIA_NODE_URLS` | `http://localhost:9090` | Comma-separated node URLs |
| `NEXT_PUBLIC_POLL_INTERVAL_MS` | `5000` | Data polling interval |
| `NEXT_PUBLIC_LIVE_MODE` | — | Set to `true` for SSR + live data |

### API Endpoints Reference

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Liveness probe: `{ status, node_id, uptime_seconds }` |
| `GET /readyz` | Readiness probe: `{ status, peers, finalized_height }` |
| `GET /v1/status` | Full node status |
| `GET /metrics` | Prometheus metrics |
| `GET /v1/events/stream` | SSE event stream |
| `GET /v1/events/recent?limit=N` | Recent events (polling fallback) |

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
│   ├── event-stream.tsx     # Real-time SSE event stream
│   ├── contribute-section.tsx    # Contribute/support section
│   ├── footer.tsx           # Site footer
│   ├── animated-number.tsx  # Count-up animation component
│   ├── agent-svgs.tsx       # Geometric robot SVG illustrations
│   └── providers.tsx        # TanStack Query provider
├── hooks/
│   └── use-omnia-data.ts    # React Query hooks for live data
└── lib/
    ├── omnia-client.ts      # API client + Prometheus parser
    └── utils.ts             # Utility functions
```

## Deployment

The site deploys to GitHub Pages via the `deploy.yml` workflow. On push to `main`, it builds a static export and deploys automatically.

Live URL: [https://willow7737.github.io/omnia-web/](https://willow7737.github.io/omnia-web/)

## License

CC0 — same as the Omnia Protocol itself.
