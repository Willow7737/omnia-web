'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import {
  Network,
  Vote,
  ShieldCheck,
  PackageSearch,
  BrainCircuit,
  Coins,
  FileCode2,
  ListChecks,
  Layers,
  CheckCircle2,
  Scale,
  Eye,
  Globe,
  ArrowRight,
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: '-50px' },
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

const problems = [
  {
    icon: Network,
    problem: 'Inefficient Blockchains',
    consequence: 'High fees and energy waste',
    solution: 'Parallel causal graph consensus',
  },
  {
    icon: Vote,
    problem: 'Broken Governance',
    consequence: 'Opaque decisions and ignored votes',
    solution: 'Quadratic voting + reputation decay',
  },
  {
    icon: ShieldCheck,
    problem: 'Data Exploitation',
    consequence: 'Corporate profit from personal info',
    solution: 'User-controlled data via ZK Proofs',
  },
  {
    icon: PackageSearch,
    problem: 'Opaque Supply Chains',
    consequence: 'Hidden child labor and fake medicine',
    solution: 'Cryptographic birth certificates',
  },
  {
    icon: BrainCircuit,
    problem: 'Centralized AI',
    consequence: 'Corporate control of models and data',
    solution: 'Distributed training with shared rewards',
  },
  {
    icon: Coins,
    problem: 'Speculative Crypto',
    consequence: 'Wealth concentration and volatility',
    solution: 'Universal Basic Compute',
  },
]

const philosophies = [
  {
    icon: Scale,
    title: 'Trust Through Mathematics',
    description:
      'Every claim is verifiable. No oracles, no authorities, no "trust us." The protocol replaces trust with cryptographic proofs, and verification is always a pure function of the data.',
  },
  {
    icon: Eye,
    title: 'Radical Transparency',
    description:
      'We publish our stubs, our partial implementations, and our honest benchmarks. No marketing metrics. Numbers come from reproducible Criterion benchmarks or are clearly marked as estimates.',
  },
  {
    icon: Globe,
    title: 'Public Domain Forever',
    description:
      'CC0 license. No entity owns this protocol. No VC lock-in. No token pre-mine. The protocol is a public good, like TCP/IP or HTTP.',
  },
]

const stats = [
  { icon: FileCode2, value: '224', label: 'Rust Files' },
  { icon: ListChecks, value: '81,082+', label: 'Lines of Code' },
  { icon: CheckCircle2, value: '1,382', label: 'Tests' },
  { icon: Layers, value: '6', label: 'Architecture Layers' },
  { icon: CheckCircle2, value: '5', label: 'Phases Complete' },
  { icon: Globe, value: 'CC0', label: 'License' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-omnia-base">
      <PageHeader
        title="About Omnia"
        description="A protocol — not a company, not a coin, not an app. A fundamental set of rules for a shared, unchangeable record of truth."
        backHref="/"
        backLabel="Home"
      />

      {/* What is Omnia? */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <h2 className="text-2xl sm:text-3xl font-bold text-omnia-text mb-6">
            What is Omnia?
          </h2>
          <div className="space-y-5 text-omnia-text-secondary leading-relaxed text-base sm:text-lg max-w-4xl">
            <p>
              Omnia is not a company, a coin, or an app. It is a <span className="text-omnia-accent font-medium">protocol</span> — a
              fundamental set of rules that any computer can follow to participate in a shared,
              unchangeable record of truth.
            </p>
            <p>
              It uses <span className="text-omnia-accent font-medium">causal graph consensus</span> (DAG + vector clocks + CRDTs) instead
              of sequential blockchains to achieve parallel transaction processing. This means
              transactions don&apos;t wait in a single line — they flow through a directed acyclic graph,
              preserving causal relationships while enabling massive throughput.
            </p>
            <p>
              The protocol is <span className="text-omnia-accent font-medium">settlement-agnostic</span> — it can settle on Ethereum, Bitcoin,
              Solana, or any L1 with data availability and proof verification. Omnia doesn&apos;t compete
              with existing chains; it extends them with a parallel execution layer that settles on
              whatever base layer makes sense for your use case.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Separator */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-omnia-border" />
      </div>

      {/* The Problem We Solve */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <h2 className="text-2xl sm:text-3xl font-bold text-omnia-text mb-4">
            The Problem We Solve
          </h2>
          <p className="text-omnia-text-secondary mb-10 text-base sm:text-lg max-w-3xl">
            The current infrastructure of the internet and financial systems is fundamentally broken.
            Here are the problems and how Omnia addresses each one.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {problems.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                {...staggerItem}
                className="group bg-omnia-surface border border-omnia-border rounded-xl p-5 sm:p-6 hover:border-omnia-accent/30 transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-omnia-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-omnia-text text-sm sm:text-base">
                      {item.problem}
                    </h3>
                    <p className="text-omnia-text-secondary text-sm mt-1">{item.consequence}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-omnia-sage text-sm font-medium pt-3 border-t border-omnia-border">
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{item.solution}</span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Separator */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-omnia-border" />
      </div>

      {/* Our Philosophy */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <h2 className="text-2xl sm:text-3xl font-bold text-omnia-text mb-4">
            Our Philosophy
          </h2>
          <p className="text-omnia-text-secondary mb-10 text-base sm:text-lg max-w-3xl">
            Three principles guide every decision in the Omnia Protocol.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {philosophies.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                {...staggerItem}
                className="bg-omnia-surface border border-omnia-border rounded-xl p-6 sm:p-8 hover:border-omnia-accent/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-omnia-accent/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-omnia-accent" />
                </div>
                <h3 className="text-lg font-semibold text-omnia-text mb-3">{item.title}</h3>
                <p className="text-omnia-text-secondary text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Separator */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-omnia-border" />
      </div>

      {/* By The Numbers */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <h2 className="text-2xl sm:text-3xl font-bold text-omnia-text mb-4">
            By The Numbers
          </h2>
          <p className="text-omnia-text-secondary mb-10 text-base sm:text-lg max-w-3xl">
            Real metrics from the codebase. No vanity numbers, no marketing spin.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                {...staggerItem}
                className="bg-omnia-surface border border-omnia-border rounded-xl p-5 sm:p-6 text-center hover:border-omnia-accent/30 transition-colors"
              >
                <div className="flex justify-center mb-3">
                  <Icon className="w-5 h-5 text-omnia-accent" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-omnia-text mb-1">
                  {stat.value}
                </div>
                <div className="text-omnia-text-secondary text-xs sm:text-sm">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Footer spacer */}
      <div className="h-16" />
    </div>
  )
}
