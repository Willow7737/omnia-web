'use client'

import { motion } from 'framer-motion'
import { Shield, Key, Fingerprint, Vote, Cpu } from 'lucide-react'

const capabilities = [
  { name: 'FinancialTransfer', icon: Shield },
  { name: 'DataProcessing', icon: Cpu },
  { name: 'ContractExecution', icon: Key },
  { name: 'ComputeProof', icon: Fingerprint },
  { name: 'GovernanceVote', icon: Vote },
]

const principles = [
  {
    title: 'Capabilities are revocable and expirable',
    description: 'by the owner. An agent cannot outlive its mandate.',
  },
  {
    title: 'Capability covering',
    description: '— a broader capability subsumes narrower ones in the same domain. No partial overlap ambiguity.',
  },
  {
    title: 'Deterministic capability attestation',
    description: '— no trust assumptions beyond math. Verification is a pure function of the capability DAG.',
  },
]

export function AgentSection() {
  return (
    <section id="agents" className="section-padding px-6">
      <div className="max-w-[680px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-[40px] sm:text-[48px] font-bold tracking-[-0.03em] text-[#F5F5F7] mb-5">
            Agent coordination.
          </h2>

          <div className="space-y-4 text-[#86868B] leading-[1.6] mb-10 font-[family-name:var(--font-geist-sans)] text-[15px]">
            <p>
              Every AI agent receives a <code className="font-[family-name:var(--font-jetbrains-mono)] text-[13px] text-[#2997FF] bg-[#2997FF]/8 px-1.5 py-0.5 rounded-md">did:omnia:</code> identifier linked to a human or organizational owner. Identity is delegated, auditable, and revocable.
            </p>
            <p>
              Agents operate under 5 narrowly-scoped capability types. Least privilege enforced by construction, not convention.
            </p>
          </div>
        </motion.div>

        {/* Capability badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {capabilities.map((cap) => (
            <div
              key={cap.name}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-[family-name:var(--font-jetbrains-mono)] text-[#86868B] border border-white/[0.06] hover:border-white/[0.12] hover:text-[#F5F5F7] transition-colors"
            >
              <cap.icon size={13} />
              {cap.name}
            </div>
          ))}
        </motion.div>

        {/* Key principles */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-4"
        >
          {principles.map((principle, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#F5F5F7] shrink-0" />
              <p className="text-[14px] text-[#86868B] leading-[1.6] font-[family-name:var(--font-geist-sans)]">
                <span className="text-[#F5F5F7] font-medium">{principle.title}</span>{' '}
                {principle.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
