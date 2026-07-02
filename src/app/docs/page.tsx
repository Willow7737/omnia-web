'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import {
  Terminal,
  Server,
  Container,
  Plug,
  Flag,
  Settings2,
  Wrench,
  ExternalLink,
  Copy,
  Check,
  ArrowRight,
  BookOpen,
  ShieldCheck,
  HeartHandshake,
} from 'lucide-react'
import { useState, useCallback } from 'react'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
}

function CopyButton({ text, isLight }: { text: string; isLight?: boolean }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [text])

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 rounded-md border border-background/20 bg-background/10 hover:bg-background/20 active:translate-y-px transition-all"
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-success" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-background/70" />
      )}
    </button>
  )
}

function CodeBlock({ code, lang, isLight }: { code: string; lang?: string; isLight?: boolean }) {
  return (
    <div className="relative group">
      <div className="absolute top-2.5 left-4 text-[10px] uppercase tracking-wider font-mono text-background/40">
        {lang || 'bash'}
      </div>
      <CopyButton text={code} isLight={isLight} />
      <pre className="rounded-2xl p-4 pt-8 overflow-x-auto text-[14px] sm:text-[15px] bg-foreground shadow-sm">
        <code className="font-mono leading-[1.6] whitespace-pre text-background/90">
          {code}
        </code>
      </pre>
    </div>
  )
}

function InlineCode({ children, isLight }: { children: React.ReactNode; isLight?: boolean }) {
  return (
    <code className={`font-mono text-[14px] text-primary px-1.5 py-0.5 rounded ${isLight ? 'bg-primary/10' : 'bg-primary/10'}`}>
      {children}
    </code>
  )
}

interface TableRow {
  col1: string
  col2: string
  col3?: string
}

function DocTable({
  headers,
  rows,
  col3Label,
  isLight,
}: {
  headers: [string, string]
  rows: TableRow[]
  col3Label?: string
  isLight?: boolean
}) {
  return (
    <div className={`overflow-x-auto rounded-xl border ${isLight ? 'border-border' : 'border-border'}`}>
      <table className="w-full text-[14px]">
        <thead>
          <tr className={`border-b bg-muted border-border`}>
            <th className={`text-left px-4 py-3 font-medium font-sans ${isLight ? 'text-foreground' : 'text-foreground'}`}>{headers[0]}</th>
            <th className={`text-left px-4 py-3 font-medium font-sans ${isLight ? 'text-foreground' : 'text-foreground'}`}>{headers[1]}</th>
            {col3Label && (
              <th className={`text-left px-4 py-3 font-medium font-sans hidden sm:table-cell ${isLight ? 'text-foreground' : 'text-foreground'}`}>
                {col3Label}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-b last:border-0 transition-colors ${
                isLight
                  ? 'border-border hover:bg-muted/50'
                  : 'border-border hover:bg-muted'
              }`}
            >
              <td className="px-4 py-3 text-primary font-mono text-[12px] sm:text-[14px] align-top">
                {row.col1}
              </td>
              <td className={`px-4 py-3 align-top font-sans ${isLight ? 'text-muted-foreground' : 'text-muted-foreground'}`}>{row.col2}</td>
              {col3Label && row.col3 && (
                <td className={`px-4 py-3 text-[12px] sm:text-[14px] align-top hidden sm:table-cell font-sans ${isLight ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                  {row.col3}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const apiEndpoints: TableRow[] = [
  { col1: 'GET /health', col2: 'Liveness probe: { status, node_id, uptime_seconds }' },
  { col1: 'GET /readyz', col2: 'Readiness probe: { status, peers, finalized_height }' },
  { col1: 'GET /api/v1/node/info', col2: 'Full node status' },
  { col1: 'GET /api/v1/node/peers', col2: 'Peer list' },
  { col1: 'GET /metrics', col2: 'Prometheus metrics' },
  { col1: 'GET /v1/events/stream', col2: 'SSE event stream' },
  { col1: 'GET /v1/events/recent?limit=N', col2: 'Recent events' },
]

const featureFlags: TableRow[] = [
  { col1: 'ethereum-live', col2: 'Real Ethereum settlement with Alloy' },
  { col1: 'celestia', col2: 'Celestia DA integration' },
  { col1: 'settlement-ffi', col2: 'C-library FFI adapter' },
  { col1: 'real_verification', col2: 'Domain shard real verification' },
]

const envVars: TableRow[] = [
  { col1: 'NEXT_PUBLIC_OMNIA_API_URL', col2: 'Primary node API endpoint', col3: 'http://localhost:9090' },
  { col1: 'NEXT_PUBLIC_OMNIA_NODE_URLS', col2: 'Comma-separated node URLs', col3: '' },
  { col1: 'NEXT_PUBLIC_POLL_INTERVAL_MS', col2: 'Data polling interval', col3: '5000' },
  { col1: 'NEXT_PUBLIC_LIVE_MODE', col2: 'Set to true for SSR + live data', col3: '' },
]

const devCommands: TableRow[] = [
  { col1: 'cargo test --workspace', col2: 'Run all 1,536 tests' },
  { col1: 'cargo clippy -- -D warnings', col2: 'Lint' },
  { col1: 'cargo fmt --check', col2: 'Check formatting' },
  { col1: 'cargo bench', col2: 'Run benchmarks' },
  { col1: 'cargo bench --bench zk_benchmarks --features full', col2: 'ZK benchmarks' },
]

const docLinks = [
  { icon: BookOpen, title: 'Architecture Docs', description: 'Deep-dive into the six-layer architecture', href: 'https://github.com/Willow7737/omnia-protocol/tree/main/docs/architecture' },
  { icon: Plug, title: 'API Reference', description: 'Implementation spec and metrics glossary', href: 'https://github.com/Willow7737/omnia-protocol/tree/main/docs/reference' },
  { icon: HeartHandshake, title: 'Contributing Guide', description: 'How to contribute to the protocol', href: 'https://github.com/Willow7737/omnia-protocol/blob/main/CONTRIBUTING.md' },
  { icon: ShieldCheck, title: 'Security Audit', description: 'Threat model, audit scope and findings', href: 'https://github.com/Willow7737/omnia-protocol/tree/main/docs/audit' },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title="Documentation"
        description="Everything you need to get started with the Omnia Protocol — from cloning the repo to running a full node."
        breadcrumbs={[{ label: 'Documentation' }]}
      />

      {/* Quick Start, Running a Node, Docker */}
      <section className="section-paper section-spacing">
        <div className="max-w-[980px] mx-auto px-6 space-y-16">
          <motion.div {...fadeInUp}>
            <div className="flex items-center gap-2.5 mb-6">
              <h2 className="font-sans text-[40px] sm:text-[48px] md:text-[56px] font-bold tracking-[-0.03em] leading-[1.1] text-foreground">Live Testnet Endpoint</h2>
              <span className="relative flex h-2 w-2 mt-3">
                <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
            </div>
            <p className="text-[15px] sm:text-[17px] text-muted-foreground leading-[1.6] mb-6 max-w-[680px] font-sans">
              A public five-node testnet (v0.1.76) is live and queryable over HTTPS with open CORS —
              the first events finalized on 2026-07-02. All five validators currently run on one host,
              and an idle mesh sheds peers between bursts of traffic, so you may catch{' '}
              <code className="font-mono text-[13px] text-foreground bg-muted px-1.5 py-0.5 rounded-md">readyz</code>{' '}
              reporting not_ready. That is the protocol being honest, not the site being broken. Poke it yourself:
            </p>
            <CodeBlock
              lang="bash"
              code={`# Node health
curl https://78.47.43.136.sslip.io/healthz
# → {"node_id":1,"status":"alive","uptime_seconds":…}

# Readiness (503 while the node has no peers — by design)
curl https://78.47.43.136.sslip.io/readyz

# Node info: version, protocol, shards, finalized height
curl https://78.47.43.136.sslip.io/api/v1/node/info

# Prometheus metrics
curl https://78.47.43.136.sslip.io/metrics`}
            />
          </motion.div>

          <motion.div {...fadeInUp}>
            <h2 className="font-sans text-[40px] sm:text-[48px] md:text-[56px] font-bold tracking-[-0.03em] leading-[1.1] text-foreground mb-6">Quick Start</h2>
            <CodeBlock
              lang="bash"
              code={`git clone https://github.com/Willow7737/omnia-protocol.git
cd omnia-protocol
cargo test --workspace
cargo bench --no-run`}
            />
          </motion.div>

          <motion.div {...fadeInUp}>
            <h2 className="font-sans text-[40px] sm:text-[48px] font-bold tracking-[-0.03em] leading-[1.1] text-foreground mb-6">Running a Node</h2>
            <CodeBlock
              lang="bash"
              code={`# Build the node binary
cargo build --release -p omnia-node

# Run with default configuration
./target/release/omnia-node

# Run with custom data directory
./target/release/omnia-node --data-dir /path/to/data

# Enable live Ethereum settlement
cargo build --release -p omnia-node --features ethereum-live`}
            />
          </motion.div>

          <motion.div {...fadeInUp}>
            <h2 className="font-sans text-[40px] sm:text-[48px] font-bold tracking-[-0.03em] leading-[1.1] text-foreground mb-6">Docker Deployment</h2>
            <CodeBlock
              lang="bash"
              code={`# Start 5-node testnet with monitoring
docker compose -f docker/docker-compose.yml up -d

# Start testnet variant
docker compose -f docker/docker-compose.testnet.yml up -d`}
            />
          </motion.div>
        </div>
      </section>

      {/* API, Feature Flags, Env Vars, Dev Commands — Light section */}
      <section className="section-white section-spacing">
        <div className="max-w-[980px] mx-auto px-6 space-y-16">
          <motion.div {...fadeInUp}>
            <h2 className="font-sans text-[40px] sm:text-[48px] font-bold tracking-[-0.03em] leading-[1.1] text-foreground mb-6">
              API Endpoints Reference
            </h2>
            <DocTable headers={['Endpoint', 'Description']} rows={apiEndpoints} isLight />
          </motion.div>

          <motion.div {...fadeInUp}>
            <h2 className="font-sans text-[40px] sm:text-[48px] font-bold tracking-[-0.03em] leading-[1.1] text-foreground mb-6">Feature Flags</h2>
            <DocTable headers={['Flag', 'Description']} rows={featureFlags} isLight />
            <p className="mt-3 text-muted-foreground text-[14px] font-sans">
              Enable features with <InlineCode isLight>--features &lt;flag&gt;</InlineCode> when building with
              Cargo.
            </p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <h2 className="font-sans text-[40px] sm:text-[48px] font-bold tracking-[-0.03em] leading-[1.1] text-foreground mb-6">Environment Variables</h2>
            <DocTable headers={['Variable', 'Description']} rows={envVars} col3Label="Default" isLight />
          </motion.div>

          <motion.div {...fadeInUp}>
            <h2 className="font-sans text-[40px] sm:text-[48px] font-bold tracking-[-0.03em] leading-[1.1] text-foreground mb-6">Development Commands</h2>
            <DocTable headers={['Command', 'Description']} rows={devCommands} isLight />
          </motion.div>
        </div>
      </section>

      {/* Documentation Links — Dark section */}
      <section className="section-paper section-spacing">
        <div className="max-w-[980px] mx-auto px-6">
          <motion.div {...fadeInUp}>
            <h2 className="font-sans text-[40px] sm:text-[48px] font-bold tracking-[-0.03em] leading-[1.1] text-foreground mb-10">Documentation Links</h2>
          </motion.div>
          <div className="space-y-0">
            {docLinks.map((link, i) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group flex items-center gap-4 sm:gap-8 py-6 border-b border-border last:border-b-0"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground text-[15px] sm:text-[17px] font-sans group-hover:text-primary transition-colors">
                        {link.title}
                      </h3>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-muted-foreground text-[14px] mt-0.5 font-sans">{link.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100" />
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
