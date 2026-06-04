'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
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
  GitBranch,
  ShieldCheck,
  HeartHandshake,
} from 'lucide-react'
import { useState, useCallback } from 'react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

/* ── Copy button ────────────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
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
      className="absolute top-3 right-3 p-1.5 rounded-md bg-omnia-base/80 border border-omnia-border hover:border-omnia-accent/40 transition-colors"
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-400" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-omnia-text-secondary" />
      )}
    </button>
  )
}

/* ── Code block component ──────────────────────────────── */
function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  return (
    <div className="relative group">
      <div className="absolute top-2.5 left-4 text-[10px] uppercase tracking-wider text-omnia-text-secondary/50 font-mono">
        {lang || 'bash'}
      </div>
      <CopyButton text={code} />
      <pre className="bg-omnia-base border border-omnia-border rounded-xl p-4 pt-8 overflow-x-auto text-sm sm:text-base">
        <code className="font-mono text-omnia-text-secondary leading-relaxed whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  )
}

/* ── Inline code ──────────────────────────────────────── */
function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-sm text-omnia-accent bg-omnia-accent/10 px-1.5 py-0.5 rounded">
      {children}
    </code>
  )
}

/* ── Table row helper ─────────────────────────────────── */
interface TableRow {
  col1: string
  col2: string
  col3?: string
}

function DocTable({
  headers,
  rows,
  col3Label,
}: {
  headers: [string, string]
  rows: TableRow[]
  col3Label?: string
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-omnia-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-omnia-base/80 border-b border-omnia-border">
            <th className="text-left px-4 py-3 text-omnia-text font-medium">{headers[0]}</th>
            <th className="text-left px-4 py-3 text-omnia-text font-medium">{headers[1]}</th>
            {col3Label && (
              <th className="text-left px-4 py-3 text-omnia-text font-medium hidden sm:table-cell">
                {col3Label}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-omnia-border/50 last:border-0 hover:bg-omnia-accent/5 transition-colors"
            >
              <td className="px-4 py-3 text-omnia-accent font-mono text-xs sm:text-sm align-top">
                {row.col1}
              </td>
              <td className="px-4 py-3 text-omnia-text-secondary align-top">{row.col2}</td>
              {col3Label && row.col3 && (
                <td className="px-4 py-3 text-omnia-text-secondary text-xs sm:text-sm align-top hidden sm:table-cell">
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

/* ── Data ─────────────────────────────────────────────── */

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
  { col1: 'cargo test --workspace', col2: 'Run all 1,382 tests' },
  { col1: 'cargo clippy -- -D warnings', col2: 'Lint' },
  { col1: 'cargo fmt --check', col2: 'Check formatting' },
  { col1: 'cargo bench', col2: 'Run benchmarks' },
  { col1: 'cargo bench --bench zk_benchmarks --features full', col2: 'ZK benchmarks' },
]

const docLinks = [
  {
    icon: BookOpen,
    title: 'Architecture Docs',
    description: 'Deep-dive into the six-layer architecture',
    href: 'https://github.com/Willow7737/omnia-protocol',
    color: 'text-omnia-accent',
  },
  {
    icon: Plug,
    title: 'API Reference',
    description: 'Complete API endpoint documentation',
    href: 'https://github.com/Willow7737/omnia-protocol',
    color: 'text-omnia-sage',
  },
  {
    icon: HeartHandshake,
    title: 'Contributing Guide',
    description: 'How to contribute to the protocol',
    href: 'https://github.com/Willow7737/omnia-protocol',
    color: 'text-amber-400',
  },
  {
    icon: ShieldCheck,
    title: 'Security Audit',
    description: 'Audit reports and security model',
    href: 'https://github.com/Willow7737/omnia-protocol',
    color: 'text-emerald-400',
  },
]

/* ── Page ─────────────────────────────────────────────── */

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-omnia-base">
      <PageHeader
        title="Documentation"
        description="Everything you need to get started with the Omnia Protocol — from cloning the repo to running a full node."
        backHref="/"
        backLabel="Home"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
        {/* Quick Start */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-omnia-accent" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-omnia-text">Quick Start</h2>
          </div>
          <CodeBlock
            lang="bash"
            code={`git clone https://github.com/Willow7737/omnia-protocol.git
cd omnia-protocol
cargo test --workspace
cargo bench --no-run`}
          />
        </motion.section>

        {/* Running a Node */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
              <Server className="w-5 h-5 text-omnia-accent" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-omnia-text">Running a Node</h2>
          </div>
          <div className="space-y-4">
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
          </div>
        </motion.section>

        {/* Docker Deployment */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
              <Container className="w-5 h-5 text-omnia-accent" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-omnia-text">Docker Deployment</h2>
          </div>
          <CodeBlock
            lang="bash"
            code={`# Start 5-node testnet with monitoring
docker compose -f docker/docker-compose.yml up -d

# Start testnet variant
docker compose -f docker/docker-compose.testnet.yml up -d`}
          />
        </motion.section>

        {/* Separator */}
        <div className="h-px bg-omnia-border" />

        {/* API Endpoints Reference */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
              <Plug className="w-5 h-5 text-omnia-accent" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-omnia-text">
              API Endpoints Reference
            </h2>
          </div>
          <DocTable headers={['Endpoint', 'Description']} rows={apiEndpoints} />
        </motion.section>

        {/* Feature Flags */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
              <Flag className="w-5 h-5 text-omnia-accent" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-omnia-text">Feature Flags</h2>
          </div>
          <DocTable headers={['Flag', 'Description']} rows={featureFlags} />
          <p className="mt-3 text-omnia-text-secondary text-sm">
            Enable features with <InlineCode>--features &lt;flag&gt;</InlineCode> when building with
            Cargo.
          </p>
        </motion.section>

        {/* Environment Variables */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
              <Settings2 className="w-5 h-5 text-omnia-accent" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-omnia-text">Environment Variables</h2>
          </div>
          <DocTable
            headers={['Variable', 'Description']}
            rows={envVars}
            col3Label="Default"
          />
        </motion.section>

        {/* Development Commands */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-omnia-accent" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-omnia-text">Development Commands</h2>
          </div>
          <DocTable headers={['Command', 'Description']} rows={devCommands} />
        </motion.section>

        {/* Separator */}
        <div className="h-px bg-omnia-border" />

        {/* Documentation Links */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-omnia-accent" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-omnia-text">Documentation Links</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {docLinks.map((link, i) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group flex items-start gap-4 p-5 sm:p-6 rounded-xl bg-omnia-surface border border-omnia-border hover:border-omnia-accent/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${link.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-omnia-text text-sm sm:text-base">
                        {link.title}
                      </h3>
                      <ExternalLink className="w-3.5 h-3.5 text-omnia-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-omnia-text-secondary text-sm mt-1">{link.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-omnia-text-secondary group-hover:text-omnia-accent transition-colors flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100" />
                </motion.a>
              )
            })}
          </div>
        </motion.section>
      </div>

      {/* Footer spacer */}
      <div className="h-16" />
    </div>
  )
}
