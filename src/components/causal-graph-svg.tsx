'use client'

import { motion, useReducedMotion } from 'framer-motion'

/*
 * A causal DAG, drawn to spec rather than generated: events flow left to
 * right, every event references two parents (Hashgraph-style), and the
 * blue path traces one event's route to finality. Solid dots are
 * finalized events; outlined dots are tips still waiting on votes.
 */

interface GraphNode {
  id: string
  x: number
  y: number
  finalized: boolean
  onPath?: boolean
}

const nodes: GraphNode[] = [
  // genesis column
  { id: 'a1', x: 24, y: 60, finalized: true, onPath: true },
  { id: 'a2', x: 24, y: 130, finalized: true },
  // column 2
  { id: 'b1', x: 120, y: 36, finalized: true },
  { id: 'b2', x: 120, y: 95, finalized: true, onPath: true },
  { id: 'b3', x: 120, y: 154, finalized: true },
  // column 3
  { id: 'c1', x: 216, y: 60, finalized: true, onPath: true },
  { id: 'c2', x: 216, y: 130, finalized: true },
  // column 4
  { id: 'd1', x: 312, y: 36, finalized: true },
  { id: 'd2', x: 312, y: 95, finalized: true, onPath: true },
  { id: 'd3', x: 312, y: 154, finalized: true },
  // column 5
  { id: 'e1', x: 408, y: 60, finalized: true, onPath: true },
  { id: 'e2', x: 408, y: 130, finalized: false },
  // tips
  { id: 'f1', x: 504, y: 36, finalized: false },
  { id: 'f2', x: 504, y: 95, finalized: false, onPath: true },
  { id: 'f3', x: 504, y: 154, finalized: false },
]

// child -> [parent, parent]; two parents per event, like the protocol
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
      viewBox="0 0 528 190"
      fill="none"
      className={className}
      role="img"
      aria-label="A causal DAG: each event references two parent events, and finalized events form a committed history."
    >
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
            strokeWidth={onPath ? 1.5 : 1}
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
          {n.finalized ? (
            <circle
              cx={n.x}
              cy={n.y}
              r={7}
              fill={n.onPath ? 'var(--primary)' : 'var(--foreground)'}
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

      {/* finality frontier */}
      <motion.line
        x1={456}
        y1={12}
        x2={456}
        y2={178}
        stroke="var(--primary)"
        strokeWidth={1}
        strokeDasharray="4 4"
        opacity={0.5}
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.9 }}
      />
      <motion.text
        x={462}
        y={20}
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
