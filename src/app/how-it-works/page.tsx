'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Archive,
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Boxes,
  CheckCircle2,
  CircleDashed,
  Clock3,
  Database,
  GitBranch,
  Globe2,
  KeyRound,
  Layers3,
  Network,
  Radio,
  RefreshCw,
  Route,
  Scale,
  ShieldCheck,
  Sparkles,
  Split,
  TriangleAlert,
  XCircle,
  Zap,
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'

type FocusId = 'event' | 'gossip' | 'graph' | 'lane0' | 'lane1' | 'shards' | 'root' | 'settlement' | 'diverged'
type FocusItem = {
  id: FocusId
  eyebrow: string
  title: string
  icon: LucideIcon
  summary: string
  details: string[]
  color: string
}

const focusItems: FocusItem[] = [
  {
    id: 'event', eyebrow: '01 · immutable object', title: 'The event is the unit of work', icon: Radio, color: '#6ea8ff',
    summary: 'Omnia does not begin with a block. It begins with a signed event carrying its own causal context.',
    details: ['EventId = domain-separated BLAKE3 hash of creator key, sequence, vector clock, payload, and parent links.', 'Each event carries a self-parent, an optional other-parent, a creator sequence, payload, public key, signature, and status.', 'Wall-clock time is reference metadata only. Ordering comes from vector clocks and graph relationships.'],
  },
  {
    id: 'gossip', eyebrow: '02 · network ingress', title: 'Gossip is a delivery fabric, not consensus', icon: Globe2, color: '#52c7f5',
    summary: 'Local submissions and peer messages enter through different doors, then share the same validation and graph boundary.',
    details: ['Gossip decodes compact or full wire events, rejects oversized payloads, rate-limits unsolicited bursts, and defers out-of-window sequences instead of losing them.', 'Bloom-assisted deduplication, bounded pending queues, heartbeats, anti-entropy digests, repair batches, and mesh redial keep the graph advancing.', 'Lane 0 acknowledgments travel on an auxiliary topic and are folded separately from event gossip.'],
  },
  {
    id: 'graph', eyebrow: '03 · Layer 1 substrate', title: 'The causal graph admits parallel history', icon: GitBranch, color: '#9d8cff',
    summary: 'Events become DAG vertices. Parent edges preserve causality; unrelated branches stay concurrent and can advance together.',
    details: ['Insertion checks hash integrity, creator sequence monotonicity, parent existence, cycle safety, depth, and bounded gap buffers.', 'Out-of-order events wait per creator until their predecessor arrives. Missing parents are not silently accepted.', 'The frontier, tips, per-creator index, depths, and finalized metadata make the graph queryable without forcing a single global block order.'],
  },
  {
    id: 'lane0', eyebrow: '04 · ADR-025 · fast path', title: 'Lane 0 preconfirms the safe fast path', icon: Zap, color: '#f4c15d',
    summary: 'A stake-weighted quorum can acknowledge suitable single-writer work before the canonical lane finishes.',
    details: ['A validator signs a domain-separated digest over event_id + state_root after validation and graph insertion.', 'Acknowledgments form a per-event grow-only CRDT. When strictly more than two-thirds of configured stake is present, the event is Preconfirmed.', 'Preconfirmed is deliberately reversible. It is not canonical finality; if Lane 1 rejects it, the lifecycle becomes Diverged and consumers must roll back.'],
  },
  {
    id: 'lane1', eyebrow: '05 · canonical consensus', title: 'Lane 1 decides the shared causal order', icon: Sparkles, color: '#75a7ff',
    summary: 'The canonical path processes only new graph events, then uses witnesses, rounds, strong seeing, fame, and commitments to converge.',
    details: ['The unprocessed_events queue makes each iteration proportional to new arrivals, not the entire graph.', 'Consensus verifies signatures again, rejects slashed creators, detects equivocation, assigns rounds, identifies witnesses, and determines famous witnesses.', 'Committed events become canonical under the BFT threat model. VRF/beacon leader scheduling and backup failover keep proposals live.'],
  },
  {
    id: 'shards', eyebrow: '06 · Layer 2 execution', title: 'Committed events fan into domain shards', icon: Boxes, color: '#72d6b0',
    summary: 'Only Lane 1-committed events reach the shard processor. Execution is a typed, fee-aware, replay-protected projection of unified state.',
    details: ['Financial, Identity, Physical, Computational, Biological, and Economics shards implement the EventProcessor boundary.', 'ShardRouter checks payload shape, creator nonce and gap limits, deducts UBC fees before dispatch, and burns the fee even if the operation fails.', 'Cross-shard messages need source-shard attestation, a non-empty causal proof, matching source type, and a registered target shard.'],
  },
  {
    id: 'root', eyebrow: '07 · commitments', title: 'Finalized history becomes cryptographic state', icon: Database, color: '#62d5dd',
    summary: 'Finality is not just a label. It folds history into commitments that survive pruning and support proofs.',
    details: ['Each newly finalized event folds its content hash into a pruning-invariant rolling finalized_state_root.', 'The live event set also exposes a Merkle state_root and event inclusion proofs for proof systems and settlement.', 'Payloads can be cleared and old finalized events pruned into minimal metadata without erasing the commitment history.'],
  },
  {
    id: 'settlement', eyebrow: '08 · settlement boundary', title: 'Settlement is pluggable and downstream', icon: Route, color: '#6fe19b',
    summary: 'The core protocol does not depend on a specific L1. A settlement adapter anchors canonical state when configured.',
    details: ['SettlementAdapter can submit a state root or proof-carrying batch, fetch finality, and verify inclusion without importing a specific chain into core.', 'Mock, Ethereum, Bitcoin, Solana, Celestia, Cosmos, FFI, and Noop adapters sit behind the boundary.', 'Canonical + anchored becomes Final. Settlement does not reorder the DAG; it strengthens the guarantee after canonical consensus.'],
  },
  {
    id: 'diverged', eyebrow: 'terminal exception', title: 'Divergence is observable, not hidden', icon: TriangleAlert, color: '#f27d84',
    summary: 'If the fast lane and canonical lane disagree, Omnia exposes the contradiction explicitly instead of calling it final.',
    details: ['Lane 0 preconfirmed + Lane 1 rejected produces Diverged.', 'The node records the event, logs loudly, and tells consumers that any action based on the reversible preconfirmation must be rolled back.', 'A normal invalid event can be rejected without divergence when Lane 0 never preconfirmed it.'],
  },
]

const paths = {
  local: 'M 74 88 C 170 88 190 160 280 160',
  peers: 'M 74 250 C 170 250 190 160 280 160',
  repair: 'M 74 412 C 150 412 190 340 280 340',
  gate: 'M 280 160 C 370 160 390 100 470 100',
  graph: 'M 280 340 C 390 340 405 260 470 260',
  lane0: 'M 470 100 C 570 72 630 72 720 120',
  lane1: 'M 470 260 C 570 260 620 220 720 240',
  shard: 'M 720 240 C 780 240 785 340 860 340',
  root: 'M 860 340 C 910 340 910 430 940 430',
  settle: 'M 940 430 C 970 430 970 340 980 340',
  reject: 'M 280 160 C 380 160 390 470 520 470',
  diverge: 'M 720 120 C 780 120 790 470 860 470',
}

function Packet({ path, dur, begin = '0s', color = '#8bb8ff', r = 5 }: { path: string; dur: string; begin?: string; color?: string; r?: number }) {
  return <circle r={r} fill={color}><animateMotion path={path} dur={dur} begin={begin} repeatCount="indefinite" /></circle>
}

function FlowNode({ x, y, id, label, icon: Icon, color, active, onFocus }: { x: number; y: number; id: FocusId; label: string; icon: LucideIcon; color: string; active: boolean; onFocus: (id: FocusId) => void }) {
  return <g tabIndex={0} role="button" aria-label={label} onMouseEnter={() => onFocus(id)} onFocus={() => onFocus(id)}>
    {active && <circle cx={x} cy={y} r={34} fill="none" stroke={color} strokeOpacity=".35" strokeWidth="2"><animate attributeName="r" values="34;42;34" dur="1.7s" repeatCount="indefinite" /></circle>}
    <circle cx={x} cy={y} r="25" fill="var(--card)" stroke={color} strokeWidth={active ? 2.5 : 1.5} />
    <foreignObject x={x - 12} y={y - 12} width="24" height="24"><Icon size={24} color={color} /></foreignObject>
    <text x={x} y={y + 44} textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="ui-monospace,monospace">{label}</text>
  </g>
}

export default function HowItWorksPage() {
  const [activeId, setActiveId] = useState<FocusId>('lane1')
  const active = focusItems.find(item => item.id === activeId) ?? focusItems[4]
  const ActiveIcon = active.icon
  return <>
    <PageHeader title="The protocol, in motion." description="A first-principles map of how an Omnia event travels from signed intent through a settlement-agnostic parallel graph, dual-lane consensus, domain execution, and final commitment." />
    <main className="section-paper section-spacing">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="eyebrow">parallel graph · dual-lane consensus</p><h2 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">This is not a block moving through a pipeline.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">It is an event entering a living graph, branching across network and causal paths, meeting different quorum rules, and leaving behind proofs, state roots, and optional settlement receipts.</p></div>
          <div className="rounded-2xl border border-primary/25 bg-primary/5 px-5 py-4 text-sm text-muted-foreground"><span className="font-mono text-xs uppercase text-primary">live model</span><p className="mt-2 max-w-xs">Every glowing packet below is an event or proof moving between real protocol boundaries.</p></div>
        </div>

        <div className="mt-10 overflow-x-auto rounded-3xl border border-border bg-card/75 p-3 shadow-sm md:p-6">
          <div className="min-w-[1040px]">
            <svg viewBox="0 0 1040 560" className="w-full text-muted-foreground" role="img" aria-labelledby="protocol-map-title protocol-map-desc">
              <title id="protocol-map-title">Omnia protocol event lifecycle map</title>
              <desc id="protocol-map-desc">An event enters locally or from peers, passes validation and causal graph admission, branches into a fast preconfirmation lane and canonical BFT consensus, fans into shards, accumulates commitments, optionally reaches settlement, or terminates as rejected or diverged.</desc>
              <defs>
                <linearGradient id="flowBlue" x1="0" x2="1"><stop stopColor="#6ea8ff" /><stop offset="1" stopColor="#52c7f5" /></linearGradient>
                <linearGradient id="flowGreen" x1="0" x2="1"><stop stopColor="#72d6b0" /><stop offset="1" stopColor="#6fe19b" /></linearGradient>
                <linearGradient id="flowGold" x1="0" x2="1"><stop stopColor="#f4c15d" /><stop offset="1" stopColor="#ffdd8a" /></linearGradient>
                <filter id="softGlow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              </defs>
              <g fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="1"><path d={paths.local} /><path d={paths.peers} /><path d={paths.repair} /><path d={paths.gate} /><path d={paths.graph} /><path d={paths.lane0} /><path d={paths.lane1} /><path d={paths.shard} /><path d={paths.root} /><path d={paths.settle} /><path d={paths.reject} /><path d={paths.diverge} /></g>
              <g fill="none" stroke="url(#flowBlue)" strokeWidth="2" strokeDasharray="6 11" strokeLinecap="round"><path d={paths.local}><animate attributeName="stroke-dashoffset" values="0;-51" dur="2.4s" repeatCount="indefinite" /></path><path d={paths.peers}><animate attributeName="stroke-dashoffset" values="0;-51" dur="2.8s" repeatCount="indefinite" /></path><path d={paths.repair}><animate attributeName="stroke-dashoffset" values="0;-51" dur="3.4s" repeatCount="indefinite" /></path><path d={paths.gate}><animate attributeName="stroke-dashoffset" values="0;-51" dur="2.2s" repeatCount="indefinite" /></path><path d={paths.graph}><animate attributeName="stroke-dashoffset" values="0;-51" dur="2.5s" repeatCount="indefinite" /></path></g>
              <g fill="none" stroke="url(#flowGold)" strokeWidth="2.5" strokeDasharray="5 9"><path d={paths.lane0}><animate attributeName="stroke-dashoffset" values="0;-42" dur="1.8s" repeatCount="indefinite" /></path></g>
              <g fill="none" stroke="url(#flowBlue)" strokeWidth="2.5" strokeDasharray="5 9"><path d={paths.lane1}><animate attributeName="stroke-dashoffset" values="0;-42" dur="1.6s" repeatCount="indefinite" /></path></g>
              <g fill="none" stroke="url(#flowGreen)" strokeWidth="2.5" strokeDasharray="5 9"><path d={paths.shard}><animate attributeName="stroke-dashoffset" values="0;-42" dur="1.7s" repeatCount="indefinite" /></path><path d={paths.root}><animate attributeName="stroke-dashoffset" values="0;-42" dur="1.9s" repeatCount="indefinite" /></path><path d={paths.settle}><animate attributeName="stroke-dashoffset" values="0;-42" dur="1.8s" repeatCount="indefinite" /></path></g>
              <g fill="none" stroke="#f27d84" strokeWidth="2" strokeDasharray="4 9"><path d={paths.reject}><animate attributeName="stroke-dashoffset" values="0;-39" dur="2.6s" repeatCount="indefinite" /></path><path d={paths.diverge}><animate attributeName="stroke-dashoffset" values="0;-39" dur="2.2s" repeatCount="indefinite" /></path></g>
              <g filter="url(#softGlow)"><Packet path={paths.local} dur="3.2s" begin="-.8s" /><Packet path={paths.local} dur="3.8s" begin="-2.2s" color="#52c7f5" r={4} /><Packet path={paths.peers} dur="3.7s" begin="-1.4s" /><Packet path={paths.repair} dur="4.3s" begin="-2.7s" color="#b39cff" r={4} /><Packet path={paths.gate} dur="2.6s" begin="-1.1s" color="#fff0b2" /><Packet path={paths.graph} dur="3.1s" begin="-.5s" color="#9d8cff" /><Packet path={paths.lane0} dur="2.7s" begin="-1.8s" color="#ffdd8a" /><Packet path={paths.lane1} dur="2.9s" begin="-1.2s" color="#8bb8ff" /><Packet path={paths.shard} dur="2.6s" begin="-1.6s" color="#72d6b0" /><Packet path={paths.root} dur="2.3s" begin="-.6s" color="#62d5dd" /><Packet path={paths.settle} dur="2.1s" begin="-1.4s" color="#6fe19b" /><Packet path={paths.reject} dur="3.6s" begin="-2s" color="#f27d84" r={4} /><Packet path={paths.diverge} dur="3.4s" begin="-2.6s" color="#f27d84" r={4} /></g>
              <g fontFamily="ui-monospace,monospace" fontSize="10" fill="currentColor" opacity=".65"><text x="30" y="35">LOCAL / PEER INGRESS</text><text x="230" y="126">VALIDATE + ADMIT</text><text x="212" y="325">CAUSAL GRAPH</text><text x="528" y="55" fill="#f4c15d">LANE 0 · FAST / REVERSIBLE</text><text x="526" y="225" fill="#75a7ff">LANE 1 · CANONICAL / BFT</text><text x="785" y="315" fill="#72d6b0">SHARD EXECUTION</text><text x="875" y="410" fill="#62d5dd">COMMITMENT</text><text x="944" y="315" fill="#6fe19b">L1 / SETTLEMENT</text><text x="448" y="512" fill="#f27d84">REJECTED</text><text x="805" y="512" fill="#f27d84">DIVERGED · ROLLBACK RISK</text></g>
              <FlowNode x={74} y={88} id="event" label="event" icon={Radio} color="#6ea8ff" active={activeId === 'event'} onFocus={setActiveId} /><FlowNode x={74} y={250} id="gossip" label="gossip" icon={Network} color="#52c7f5" active={activeId === 'gossip'} onFocus={setActiveId} /><FlowNode x={74} y={412} id="gossip" label="repair" icon={RefreshCw} color="#b39cff" active={activeId === 'gossip'} onFocus={setActiveId} /><FlowNode x={280} y={160} id="event" label="admission" icon={ShieldCheck} color="#f4c15d" active={activeId === 'event'} onFocus={setActiveId} /><FlowNode x={280} y={340} id="graph" label="DAG" icon={GitBranch} color="#9d8cff" active={activeId === 'graph'} onFocus={setActiveId} /><FlowNode x={470} y={100} id="lane0" label="preconfirm" icon={Zap} color="#f4c15d" active={activeId === 'lane0'} onFocus={setActiveId} /><FlowNode x={470} y={260} id="lane1" label="consensus" icon={Sparkles} color="#75a7ff" active={activeId === 'lane1'} onFocus={setActiveId} /><FlowNode x={720} y={120} id="lane0" label="> 2/3 stake" icon={BadgeCheck} color="#f4c15d" active={activeId === 'lane0'} onFocus={setActiveId} /><FlowNode x={720} y={240} id="lane1" label="committed" icon={Scale} color="#75a7ff" active={activeId === 'lane1'} onFocus={setActiveId} /><FlowNode x={860} y={340} id="shards" label="shards" icon={Boxes} color="#72d6b0" active={activeId === 'shards'} onFocus={setActiveId} /><FlowNode x={940} y={430} id="root" label="state root" icon={Database} color="#62d5dd" active={activeId === 'root'} onFocus={setActiveId} /><FlowNode x={980} y={340} id="settlement" label="final" icon={CheckCircle2} color="#6fe19b" active={activeId === 'settlement'} onFocus={setActiveId} /><FlowNode x={520} y={470} id="event" label="reject" icon={XCircle} color="#f27d84" active={activeId === 'event'} onFocus={setActiveId} /><FlowNode x={860} y={470} id="diverged" label="diverge" icon={TriangleAlert} color="#f27d84" active={activeId === 'diverged'} onFocus={setActiveId} />
            </svg>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><div className="rounded-xl border border-border bg-card p-4"><span className="font-mono text-xs uppercase text-primary">blue packets</span><p className="mt-2 text-sm leading-6 text-muted-foreground">Events and causal context moving through graph admission and Lane 1.</p></div><div className="rounded-xl border border-border bg-card p-4"><span className="font-mono text-xs uppercase text-warning">gold lane</span><p className="mt-2 text-sm leading-6 text-muted-foreground">Stake-weighted Lane 0 preconfirmation: fast, monotone, reversible.</p></div><div className="rounded-xl border border-border bg-card p-4"><span className="font-mono text-xs uppercase text-success">green proof</span><p className="mt-2 text-sm leading-6 text-muted-foreground">Committed execution, rolling roots, inclusion proofs, and settlement.</p></div><div className="rounded-xl border border-border bg-card p-4"><span className="font-mono text-xs uppercase text-destructive">red stop</span><p className="mt-2 text-sm leading-6 text-muted-foreground">Invalid, rejected, or contradicted fast-path work never gets mislabeled final.</p></div></div>

        <div className="mt-10 grid gap-7 lg:grid-cols-[1fr_390px]">
          <article className="rounded-3xl border border-primary/30 bg-primary/5 p-7 md:p-9"><div className="flex items-start gap-4"><div className="rounded-2xl border border-primary/25 bg-background/70 p-3"><ActiveIcon className="size-7" style={{ color: active.color }} /></div><div><p className="font-mono text-xs uppercase tracking-[.18em]" style={{ color: active.color }}>{active.eyebrow}</p><h3 className="mt-2 text-3xl font-semibold text-foreground">{active.title}</h3></div></div><p className="mt-7 max-w-3xl text-xl leading-9 text-foreground">{active.summary}</p><ul className="mt-7 grid gap-4 md:grid-cols-3">{active.details.map(detail => <li key={detail} className="rounded-2xl border border-border/80 bg-background/55 p-4 text-sm leading-7 text-muted-foreground">{detail}</li>)}</ul></article>
          <aside className="rounded-3xl border border-border bg-card p-6"><p className="eyebrow">pointer guide</p><h3 className="mt-3 text-2xl font-semibold text-foreground">Inspect every boundary.</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Hover or focus a node. The panel explains what the packet means, what the node verifies, and where the data can stop.</p><div className="mt-6 grid gap-2">{focusItems.map(item => <button key={item.id} type="button" onClick={() => setActiveId(item.id)} className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${activeId === item.id ? 'border-primary/40 bg-primary/10' : 'border-transparent hover:border-border hover:bg-muted/50'}`}><item.icon className="size-4 shrink-0" style={{ color: item.color }} /><span className="min-w-0 flex-1 text-sm text-foreground">{item.title}</span><ArrowRight className="size-3 text-muted-foreground" /></button>)}</div></aside>
        </div>

        <section className="mt-20"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">first principles · no hand-waving</p><h2 className="mt-3 text-3xl font-semibold text-foreground md:text-4xl">What actually makes Omnia different?</h2></div><a className="link-underline font-mono text-xs uppercase text-primary" href="https://github.com/Willow7737/omnia-protocol/blob/main/docs/architecture/full-spec.md" target="_blank" rel="noreferrer">read the full specification <ArrowRight className="ml-1 inline size-3" /></a></div><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><div className="rounded-2xl border border-border bg-card p-5"><GitBranch className="size-6 text-primary" /><h3 className="mt-4 font-semibold text-foreground">Parallel graph</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Unrelated events do not wait behind artificial block order. Parent links preserve causality while concurrent branches advance together.</p></div><div className="rounded-2xl border border-border bg-card p-5"><Split className="size-6 text-warning" /><h3 className="mt-4 font-semibold text-foreground">Two lanes</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Lane 0 gives safe work a fast reversible signal. Lane 1 establishes canonical BFT order. The API exposes the difference.</p></div><div className="rounded-2xl border border-border bg-card p-5"><Layers3 className="size-6 text-success" /><h3 className="mt-4 font-semibold text-foreground">Settlement agnostic</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Core consensus depends on a trait, not a chain. Ethereum, Bitcoin, Solana, Celestia, Cosmos, FFI, mock, and noop adapters remain outside the core.</p></div><div className="rounded-2xl border border-border bg-card p-5"><Archive className="size-6 text-info" /><h3 className="mt-4 font-semibold text-foreground">Pruning-safe roots</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Finalized history folds into a rolling commitment, while live Merkle proofs and snapshots support recovery and external verification.</p></div></div></section>

        <section className="mt-16 rounded-3xl border border-border bg-muted/30 p-7 md:p-9"><div className="flex items-start gap-4"><div className="rounded-2xl bg-background p-3"><KeyRound className="size-6 text-primary" /></div><div><p className="eyebrow">state vocabulary</p><h2 className="mt-2 text-2xl font-semibold text-foreground">Do not collapse these outcomes.</h2></div></div><div className="mt-7 grid gap-3 md:grid-cols-5">{[['Pending','not decided','#94a3b8'],['Preconfirmed','Lane 0 · reversible','#f4c15d'],['Canonical','Lane 1 · committed','#75a7ff'],['Final','canonical + settlement','#6fe19b'],['Diverged','rollback risk','#f27d84']].map(([name, desc, color]) => <div key={name} className="rounded-2xl border border-border bg-card p-4"><span className="font-mono text-sm" style={{ color }}>{name}</span><p className="mt-2 text-xs leading-5 text-muted-foreground">{desc}</p></div>)}</div></section>

        <div className="mt-10 flex flex-wrap items-center gap-3 text-xs text-muted-foreground"><Activity className="size-4 text-primary" /> <span>Animated SVG is the map.</span><ArrowDown className="size-3" /><span>Hover/focus is the pointer.</span><ArrowDown className="size-3" /><span>Cards are the exact boundary explanations.</span><CircleDashed className="ml-2 size-4 text-muted-foreground" /><span>Reduced-motion users still get the complete linear guide.</span></div>
      </div>
    </main><Footer /><ScrollToTop />
  </>
}
