'use client'

import { motion } from 'framer-motion'
import { Shield, Key, Fingerprint, Vote, Cpu } from 'lucide-react'
import { AgentSVG1, AgentSVG2, AgentSVG3, AgentSVG4 } from './agent-svgs'

const capabilities = [
  { name: 'FinancialTransfer', icon: Shield },
  { name: 'DataProcessing', icon: Cpu },
  { name: 'ContractExecution', icon: Key },
  { name: 'ComputeProof', icon: Fingerprint },
  { name: 'GovernanceVote', icon: Vote },
]

export function AgentSection() {
  return (
    <section id="agents" className="section-padding px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#F5F0EB] mb-6">
            Autonomous Agent Coordination
          </h2>

          <div className="space-y-4 text-[#A39B92] leading-relaxed mb-10">
            <p>
              Every AI agent receives a <code className="font-[family-name:var(--font-jetbrains-mono)] text-[13px] text-[#D4A574] bg-[rgba(212,165,116,0.1)] px-1.5 py-0.5 rounded">did:omnia:</code> identifier linked to a human or organizational owner. Identity is not self-sovereign for agents — it is delegated, auditable, and revocable.
            </p>
            <p>
              Agents operate under 5 narrowly-scoped capability types. The principle of least privilege is enforced at the protocol layer — not by convention, by construction.
            </p>
          </div>
        </motion.div>

        {/* Capability badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {capabilities.map((cap) => (
            <div
              key={cap.name}
              className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm font-[family-name:var(--font-jetbrains-mono)] text-[#A39B92] hover:text-[#D4A574] hover:border-[rgba(212,165,116,0.3)] transition-colors"
              style={{ borderColor: 'rgba(212, 165, 116, 0.15)' }}
            >
              <cap.icon size={14} />
              {cap.name}
            </div>
          ))}
        </motion.div>

        {/* Key principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="space-y-3 mb-12"
        >
          <div className="flex items-start gap-3">
            <div className="mt-1.5 w-1 h-1 rounded-full bg-[#D4A574] shrink-0" />
            <p className="text-sm text-[#A39B92] leading-relaxed">
              <span className="text-[#F5F0EB] font-medium">Capabilities are revocable and expirable</span> by the owner. An agent cannot outlive its mandate.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1.5 w-1 h-1 rounded-full bg-[#D4A574] shrink-0" />
            <p className="text-sm text-[#A39B92] leading-relaxed">
              <span className="text-[#F5F0EB] font-medium">Capability covering</span> — a broader capability subsumes narrower ones in the same domain. No partial overlap ambiguity.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1.5 w-1 h-1 rounded-full bg-[#D4A574] shrink-0" />
            <p className="text-sm text-[#A39B92] leading-relaxed">
              <span className="text-[#F5F0EB] font-medium">Deterministic capability attestation</span> — no trust assumptions beyond math. Verification is a pure function of the capability DAG.
            </p>
          </div>
        </motion.div>

        {/* Geometric agent SVGs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="flex items-end justify-center gap-8 sm:gap-12"
        >
          {[AgentSVG1, AgentSVG2, AgentSVG3, AgentSVG4].map((SvgComponent, i) => (
            <div key={i} className="group w-12 sm:w-16 h-auto opacity-60 hover:opacity-100 transition-opacity duration-300">
              <SvgComponent />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
