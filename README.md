# Omnia Protocol — Website

The official website for the [Omnia Protocol](https://github.com/Willow7737/omnia-protocol). A multi-page site built with Next.js 16, Tailwind CSS, and Framer Motion.

## Design

The site shares one design system with [omnia-protocol-interface](https://github.com/Willow7737/omnia-protocol-interface): paper-white surfaces, near-black ink, one restrained blue. The brand voice comes from the logo itself — a monospaced, lowercase wordmark and a halftone-dot texture, both used sparingly. No marketing buzzwords. No exclamation points. Every claim is traceable to a repo file, benchmark, or API response.

All performance figures are copied from the protocol repository's **Honest Performance Numbers** table (README, v0.1.68+ baselines) and `benches/baselines.json`. When the protocol updates its baselines, update `hero-section.tsx`, `performance-section.tsx`, and `cta-section.tsx` — never invent numbers.

## Tech Stack

- **Framework**: Next.js 16 (App Router, static export)
- **Styling**: Tailwind CSS 4 (design tokens in `globals.css`, OKLCH palette)
- **Animation**: Framer Motion (with `prefers-reduced-motion` support)
- **Data**: TanStack React Query (live testnet data)
- **Icons**: Lucide React
- **Fonts**: Geist Sans, Geist Mono

## Live Mode

By default, the site runs in **static mode** — it shows benchmark data from the protocol's v0.1.68+ single-node baselines. The **public multi-node testnet is live** at `https://78.47.43.136.sslip.io` (Lane 0 validator mesh; BFT finality measured at 10k-event bursts and across a 3-region WAN — see the protocol repo's `docs/reference/benchmark-gates.md`). To connect the site to it (or any node):

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
│   ├── globals.css          # Design tokens (shared with the interface), animations
│   ├── layout.tsx           # Root layout, fonts, metadata
│   ├── page.tsx             # Home page composing all sections
│   ├── not-found.tsx        # 404 page
│   └── */page.tsx           # About, Architecture, Docs, FAQ, Roadmap, …
├── components/
│   ├── omnia-nav.tsx        # Fixed navigation with mobile menu
│   ├── page-header.tsx      # Shared subpage hero
│   ├── hero-section.tsx     # Hero with live status widget
│   ├── causal-graph-svg.tsx # Hand-drawn causal DAG illustration
│   ├── features-section.tsx # Six pillars, editorial list
│   ├── architecture-preview.tsx  # 6-layer stack
│   ├── performance-section.tsx   # Verified benchmark tables
│   ├── agent-section.tsx    # AI agent identity section
│   ├── transparency-section.tsx  # Stub inventory table
│   ├── cta-section.tsx      # Contribute/support section
│   ├── footer.tsx           # Site footer
│   ├── animated-number.tsx  # Count-up animation component
│   └── providers.tsx        # TanStack Query provider
├── hooks/
│   └── use-omnia-data.ts    # React Query hooks for live data
└── lib/
    ├── omnia-client.ts      # API client + Prometheus parser
    └── utils.ts             # Utility functions
```

## Internal links and GitHub Pages

The production build is a static export served under the `/omnia-web` base path. Always use `next/link` (`<Link href="…">`) for internal navigation — plain `<a href="/docs">` anchors bypass Next's basePath handling and 404 on GitHub Pages.

## Deployment

The site deploys to GitHub Pages via the `deploy.yml` workflow. On push to `main`, it builds a static export and deploys automatically.

Live URL: [https://willow7737.github.io/omnia-web/](https://willow7737.github.io/omnia-web/)

## License

CC0 — same as the Omnia Protocol itself.
