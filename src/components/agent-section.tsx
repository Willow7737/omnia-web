'use client'

import { motion } from 'framer-motion'
import { Shield, Key, Fingerprint, Vote, Cpu, Bot } from 'lucide-react'

const capabilities = [
  { name: 'FinancialTransfer', icon: Shield, desc: 'Move value' },
  { name: 'DataProcessing', icon: Cpu, desc: 'Read & compute' },
  { name: 'ContractExecution', icon: Key, desc: 'Run smart contracts' },
  { name: 'ComputeProof', icon: Fingerprint, desc: 'Generate ZK proofs' },
  { name: 'GovernanceVote', icon: Vote, desc: 'Cast votes' },
]

const principles = [
  {
    title: 'Capabilities are revocable and expirable',
    description: 'by the owner. An agent cannot outlive its mandate — delegation has a clock, and the clock is enforced by the protocol, not the application.',
  },
  {
    title: 'Capability covering',
    description: '— a broader capability subsumes narrower ones in the same domain. No partial overlap ambiguity, no privilege escalation through composition.',
  },
  {
    title: 'Deterministic capability attestation',
    description: '— no trust assumptions beyond math. Verification is a pure function of the capability DAG, so any node can audit any agent.',
  },
]

const D_NORMAL = 0.26
const EASE = [0.25, 0.46, 0.45, 0.94] as const

export function AgentSection() {
  return (
    <section id="agents" className="section-paper section-spacing px-6 relative overflow-hidden">
      <div className="max-w-[720px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: D_NORMAL, ease: EASE }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 font-mono text-[11.3px] text-muted-foreground lowercase mb-6">
            <Bot size={11} />
            agent coordination
          </span>
          <h2 className="font-display text-[37.5px] sm:text-[47.5px] md:text-[60px] font-bold leading-[1.05] text-foreground mb-6">
            Agent coordination.
          </h2>

          <div className="space-y-4 text-muted-foreground leading-[1.6] mb-12 text-[16.9px] sm:text-[18.8px]">
            <p>
              Every AI agent receives a{' '}
              <code className="font-mono text-[14px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-md border border-primary/20">did:omnia:</code>
              {' '}identifier linked to a human or organizational owner. Identity is delegated, auditable, and revocable.
            </p>
            <p>
              Agents operate under 5 narrowly-scoped capability types. Least privilege enforced by construction, not convention.
            </p>
          </div>
        </motion.div>

        {/* Capability cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: D_NORMAL, delay: 0.1, ease: EASE }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-16"
        >
          {capabilities.map((cap) => {
            const Icon = cap.icon
            return (
              <div
                key={cap.name}
                className="card-hover hover:card-hover-hover group rounded-xl p-4 bg-card/40 border border-border hover:bg-card/60 text-center"
              >
                <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/15 group-hover:border-primary/30 transition-colors">
                  <Icon size={16} className="text-primary" />
                </div>
                <div className="font-mono text-[11.3px] text-foreground font-medium mb-1 leading-tight">
                  {cap.name}
                </div>
                <div className="text-[11.3px] text-muted-foreground">
                  {cap.desc}
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Key principles — visual cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: D_NORMAL, delay: 0.2, ease: EASE }}
          className="space-y-3"
        >
          {principles.map((principle, i) => (
            <div
              key={i}
              className="card-hover hover:card-hover-hover border-gradient group flex items-start gap-4 p-5 rounded-xl bg-card/40 border border-border"
            >
              <div className="font-mono text-[24.3px] font-bold text-primary/30 leading-none shrink-0 w-8">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="flex-1">
                <h3 className="font-display text-[16.9px] font-semibold text-foreground mb-1.5">
                  {principle.title}
                </h3>
                <p className="text-[13.1px] sm:text-[14px] text-muted-foreground leading-[1.55]">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
