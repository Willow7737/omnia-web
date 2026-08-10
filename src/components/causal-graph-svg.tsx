'use client'

import { motion, useReducedMotion } from 'framer-motion'

/*
 * A causal DAG, drawn to spec rather than generated: events flow left to
 * right, every event references two parents (Hashgraph-style), and the
 * blue path traces one event's route to finality. Solid dots are
 * finalized events; outlined dots are tips still waiting on votes.
 *
 * Visual treatment: the finalized path glows blue, nodes have a subtle
 * ring, and the finality frontier is a dashed vertical line. The graph
 * is wider than before (680px max-width in the hero) so it reads as a
 * real diagram, not a decoration.
 */

interface GraphNode {
  id: string
  x: number
  y: number
  finalized: boolean
  onPath?: boolean
}

const nodes: GraphNode[] = [
  { id: 'a1', x: 24, y: 80, finalized: true, onPath: true },
  { id: 'a2', x: 24, y: 160, finalized: true },
  { id: 'b1', x: 120, y: 48, finalized: true },
  { id: 'b2', x: 120, y: 120, finalized: true, onPath: true },
  { id: 'b3', x: 120, y: 192, finalized: true },
  { id: 'c1', x: 216, y: 80, finalized: true, onPath: true },
  { id: 'c2', x: 216, y: 160, finalized: true },
  { id: 'd1', x: 312, y: 48, finalized: true },
  { id: 'd2', x: 312, y: 120, finalized: true, onPath: true },
  { id: 'd3', x: 312, y: 192, finalized: true },
  { id: 'e1', x: 408, y: 80, finalized: true, onPath: true },
  { id: 'e2', x: 408, y: 160, finalized: false },
  { id: 'f1', x: 504, y: 48, finalized: false },
  { id: 'f2', x: 504, y: 120, finalized: false, onPath: true },
  { id: 'f3', x: 504, y: 192, finalized: false },
]

const edges: Array<[string, string]> = [
  ['b1', 'a1'], ['b1', 'a2'],
  ['b2', 'a1'], ['b2', 'a2'],
  ['b3', 'a2'], ['b3', 'a1'],
  ['c1', 'b1'], ['c1', 'b2'],
  ['c2', 'b2'], ['c2', 'b3'],
  ['d1', 'c1'], ['d1', 'b1'],
  ['d2', 'c1'], ['d2', 'c2'],
  ['d3', 'c2'], ['d3', 'b3'],
  ['e1', 'd1'], ['e1', 'd2'],
  ['e2', 'd2'], ['e2', 'd3'],
  ['f1', 'e1'], ['f1', 'd1'],
  ['f2', 'e1'], ['f2', 'e2'],
  ['f3', 'e2'], ['f3', 'd3'],
]

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))
const pathEdges = new Set(['b2|a1', 'c1|b2', 'd2|c1', 'e1|d2', 'f2|e1'])

export function CausalGraphSvg({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      viewBox="0 0 528 240"
      fill="none"
      className={className}
      role="img"
      aria-label="A causal DAG: each event references two parent events, and finalized events form a committed history."
    >
      {/* Glow filter for the path */}
      <defs>
        <filter id="path-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {edges.map(([child, parent], i) => {
        const c = byId[child]
        const p = byId[parent]
        const onPath = pathEdges.has(`${child}|${parent}`)
        const midX = (p.x + c.x) / 2
        const d = `M ${p.x} ${p.y} C ${midX} ${p.y}, ${midX} ${c.y}, ${c.x} ${c.y}`
        return (
          <motion.path
            key={`${child}-${parent}`}
            d={d}
            stroke={onPath ? 'var(--primary)' : 'var(--border)'}
            strokeWidth={onPath ? 2 : 1}
            filter={onPath ? 'url(#path-glow)' : undefined}
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.03 * i, ease: 'easeOut' }}
          />
        )
      })}

      {nodes.map((n, i) => (
        <motion.g
          key={n.id}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.35, delay: 0.05 * i, ease: 'easeOut' }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          {n.onPath && (
            <circle
              cx={n.x}
              cy={n.y}
              r={12}
              fill="var(--primary)"
              opacity={0.15}
            />
          )}
          {n.finalized ? (
            <circle
              cx={n.x}
              cy={n.y}
              r={n.onPath ? 7 : 6}
              fill={n.onPath ? 'var(--primary)' : 'var(--foreground)'}
              stroke={n.onPath ? 'var(--primary)' : 'transparent'}
              strokeWidth={n.onPath ? 1.5 : 0}
            />
          ) : (
            <circle
              cx={n.x}
              cy={n.y}
              r={6.5}
              fill="var(--card)"
              stroke={n.onPath ? 'var(--primary)' : 'var(--muted-foreground)'}
              strokeWidth={1.5}
              strokeDasharray={n.onPath ? undefined : '2.5 2.5'}
            />
          )}
        </motion.g>
      ))}

      {/* Finality frontier */}
      <motion.line
        x1={456}
        y1={20}
        x2={456}
        y2={220}
        stroke="var(--primary)"
        strokeWidth={1}
        strokeDasharray="4 4"
        opacity={0.4}
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.9 }}
      />
      <motion.text
        x={462}
        y={32}
        fill="var(--muted-foreground)"
        fontSize={9}
        fontFamily="var(--font-mono)"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        finality
      </motion.text>
    </svg>
  )
}
