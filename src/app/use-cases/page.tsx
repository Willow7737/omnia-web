'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import {
  Banknote,
  PackageSearch,
  Fingerprint,
  BrainCircuit,
  Vote,
  Radio,
  type LucideIcon,
} from 'lucide-react'

interface UseCase {
  icon: LucideIcon
  title: string
  description: string
  items: string[]
}

const useCases: UseCase[] = [
  {
    icon: Banknote,
    title: 'Financial Services',
    description: 'Reimagining value transfer without intermediaries',
    items: [
      'Cross-border payments without intermediaries',
      'Decentralized lending with verifiable collateral',
      'Tokenized asset management with on-chain provenance',
    ],
  },
  {
    icon: PackageSearch,
    title: 'Supply Chain Integrity',
    description: 'Cryptographic proof from origin to destination',
    items: [
      'Pharmaceutical traceability (fighting counterfeit medicine)',
      'Conflict mineral verification',
      'Food safety tracking from farm to table',
      'Cryptographic birth certificates for physical items',
    ],
  },
  {
    icon: Fingerprint,
    title: 'Identity & Privacy',
    description: 'Self-sovereign identity without centralized authorities',
    items: [
      'Self-sovereign identity without centralized authorities',
      'Privacy-preserving credential verification',
      'Social recovery for digital identity',
      'Biometric anchors with zero-knowledge proofs',
    ],
  },
  {
    icon: BrainCircuit,
    title: 'AI & Compute',
    description: 'Distributed intelligence with verifiable execution',
    items: [
      'Distributed AI training with shared rewards',
      'Verifiable compute proofs for outsourced computation',
      'AI agent coordination with delegated authority',
      'Universal Basic Compute for equitable access',
    ],
  },
  {
    icon: Vote,
    title: 'Governance',
    description: 'Transparent, reputation-weighted collective decisions',
    items: [
      'Transparent on-chain voting with quadratic weighting',
      'Reputation-weighted decision making with decay',
      'Time-locked proposals for considered governance',
      'Community-driven protocol evolution',
    ],
  },
  {
    icon: Radio,
    title: 'Physical-Digital Fusion',
    description: 'Bridging the real world with tamper-proof digital records',
    items: [
      'IoT device authentication and coordination',
      'Smart city infrastructure management',
      'Environmental monitoring with tamper-proof data',
      'Real-world asset tokenization with physical anchors',
    ],
  },
]

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.12 } },
  viewport: { once: true, margin: '-50px' },
}

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

function UseCaseCard({ useCase, index }: { useCase: UseCase; index: number }) {
  const Icon = useCase.icon

  return (
    <motion.div
      {...staggerItem}
      transition={{ ...staggerItem.transition, delay: index * 0.08 }}
      className="group rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5 sm:p-6 hover:border-white/[0.12] transition-all duration-300 hover:shadow-lg hover:shadow-omnia-accent/5"
    >
      <div className="flex items-start gap-4 mb-5">
        <div className="flex-shrink-0 w-11 h-11 rounded-2xl bg-[#2997FF]/10 border border-[#2997FF]/20 flex items-center justify-center group-hover:bg-[#2997FF]/15 group-hover:border-[#2997FF]/30 transition-colors">
          <Icon className="w-5 h-5 text-omnia-accent" />
        </div>
        <div>
          <h3 className="text-[17px] font-semibold text-omnia-text group-hover:text-omnia-accent transition-colors tracking-tight font-[family-name:var(--font-space-grotesk)]">
            {useCase.title}
          </h3>
          <p className="text-omnia-text-secondary text-[14px] mt-1 font-[family-name:var(--font-geist-sans)]">{useCase.description}</p>
        </div>
      </div>

      <ul className="space-y-2.5">
        {useCase.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[14px] font-[family-name:var(--font-geist-sans)]">
            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-omnia-accent/60 mt-1.5 group-hover:bg-omnia-accent transition-colors" />
            <span className="text-omnia-text-secondary leading-[1.6]">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-omnia-base flex flex-col">
      <PageHeader
        title="Use Cases"
        description="Real-world problems that Omnia's architecture is built to solve. From financial infrastructure to physical-digital fusion — every use case is grounded in the protocol's actual capabilities."
        breadcrumbs={[{ label: 'Use Cases' }]}
      />

      {/* Use cases grid */}
      <section className="max-w-[980px] mx-auto px-6 pb-24">
        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-3"
        >
          {useCases.map((useCase, index) => (
            <UseCaseCard key={useCase.title} useCase={useCase} index={index} />
          ))}
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <div className="max-w-[980px] mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 sm:p-8 text-center"
        >
          <h3 className="text-[28px] sm:text-[32px] font-bold text-omnia-text mb-3 tracking-tight font-[family-name:var(--font-space-grotesk)]">
            Building something that fits?
          </h3>
          <p className="text-omnia-text-secondary text-[14px] sm:text-[15px] max-w-2xl mx-auto mb-6 leading-[1.6] font-[family-name:var(--font-geist-sans)]">
            Omnia is CC0 public domain — no permissions needed. The protocol is designed to be a 
            fundamental infrastructure layer that any application can build on, without gatekeepers 
            or license fees.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://github.com/Willow7737/omnia-protocol"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-omnia-accent text-omnia-base font-medium text-[14px] hover:bg-omnia-accent/90 transition-colors font-[family-name:var(--font-geist-sans)]"
            >
              View on GitHub
            </a>
            <a
              href="/architecture"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-omnia-text text-[14px] hover:border-white/[0.12] transition-colors font-[family-name:var(--font-geist-sans)]"
            >
              Explore Architecture
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
