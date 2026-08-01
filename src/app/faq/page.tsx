'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'What is Omnia?',
    answer:
      'Omnia is a protocol — a fundamental set of rules that any computer can follow to participate in a shared, unchangeable record of truth. It uses causal graph consensus (DAG + vector clocks + CRDTs) instead of sequential blockchains. It is not a company, coin, or app.',
  },
  {
    question: 'How is Omnia different from traditional blockchains?',
    answer:
      'Traditional blockchains process transactions sequentially, creating bottlenecks. Omnia uses a causal DAG where transactions can be processed in parallel, as long as their causal dependencies are respected. This enables significantly higher throughput without sacrificing consistency.',
  },
  {
    question: 'What does "settlement-agnostic" mean?',
    answer:
      'Omnia can settle on any Layer 1 blockchain that provides data availability and proof verification. Currently, Ethereum and Celestia adapters are implemented. Bitcoin, Solana, and Cosmos adapters are stubbed for future development.',
  },
  {
    question: 'Is Omnia ready for production?',
    answer:
      'Not mainnet, and not yet a running network. A single public testnet node is live and serves the API the wallet and dashboard use today — but it currently has zero peers and reports itself not ready for consensus. Multi-node Lane 0 BFT finality is real and measured (10,000/10,000 events finalized across 5 validators, and across a 3-region EU/US/Asia WAN), but those were stress runs on a mesh brought up for the occasion, not a standing network. Recruiting independent validator operators is the main gate — ahead of the external security audit.',
  },
  {
    question: 'What is Universal Basic Compute (UBC)?',
    answer:
      'UBC is a soulbound monthly compute quota allocated to every participant. It ensures equitable access to the protocol\'s computational resources, regardless of wealth or stake. Think of it as universal basic income, but for compute.',
  },
  {
    question: 'How does Omnia handle AI agents?',
    answer:
      'Every AI agent receives a did:omnia: identifier linked to a human or organizational owner. Agents operate under 5 narrowly-scoped capability types. The principle of least privilege is enforced at the protocol layer — by construction, not convention.',
  },
  {
    question: 'What is the bug bounty program?',
    answer:
      'We offer bounties from $100 to $50,000 for responsibly disclosed vulnerabilities. Critical findings (consensus breaks, key theft, ZK proof forgery) receive the highest rewards. See our Security page for full details.',
  },
  {
    question: 'How can I contribute?',
    answer:
      'The codebase is Rust-only and open source at github.com/Willow7737/omnia-protocol. You can report bugs, submit pull requests, write documentation, participate in governance discussions, or donate to support development.',
  },
  {
    question: 'Why CC0 Public Domain?',
    answer:
      'No entity should own fundamental infrastructure. CC0 ensures the protocol can never be captured, restricted, or monetized by any single party. It is a public good, like TCP/IP or HTTP.',
  },
  {
    question: 'What are "stubs" in the transparency table?',
    answer:
      'Stubs are features that have their trait/interface defined and return placeholder values. They represent planned but not-yet-implemented functionality. We list them openly because radical transparency is a core principle.',
  },
]

function FAQAccordionItem({ item, index, isOpen, onToggle, isDark }: { item: FAQItem; index: number; isOpen: boolean; onToggle: () => void; isDark: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <div className={`${isDark ? 'border-border' : 'border-border'} border-b`}>
        <button
          onClick={onToggle}
          className={`w-full flex items-center gap-4 py-5 sm:py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50`}
          aria-expanded={isOpen}
        >
          <div
            className={`flex-shrink-0 w-[3px] self-stretch rounded-full transition-colors duration-300 ${
              isOpen ? 'bg-primary' : isDark ? 'bg-border' : 'bg-border'
            }`}
          />

          <div className="flex-1 min-w-0">
            <span
              className={`text-[15px] sm:text-[17px] font-medium transition-colors duration-300 font-sans ${
                isOpen ? (isDark ? 'text-foreground' : 'text-foreground') : (isDark ? 'text-muted-foreground' : 'text-muted-foreground')
              }`}
            >
              {item.question}
            </span>
          </div>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex-shrink-0"
          >
            <ChevronDown
              className={`w-5 h-5 transition-colors duration-300 ${
                isOpen ? 'text-primary' : isDark ? 'text-muted-foreground/70' : 'text-muted-foreground/60'
              }`}
            />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="pb-5 sm:pb-6 pl-7 sm:pl-9">
                <p className={`${isDark ? 'text-muted-foreground' : 'text-muted-foreground'} text-[14px] sm:text-[15px] leading-[1.6] font-sans`}>
                  {item.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  // Split FAQs into two groups for alternating sections
  const halfPoint = Math.ceil(faqs.length / 2)
  const firstHalf = faqs.slice(0, halfPoint)
  const secondHalf = faqs.slice(halfPoint)

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title="FAQ"
        description="Straight answers about the protocol, its architecture, and how to get involved. No marketing speak — just honest, technical responses."
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      {/* First half — Dark section */}
      <section className="section-paper section-spacing">
        <div className="max-w-[680px] mx-auto px-6">
          {firstHalf.map((item, index) => (
            <FAQAccordionItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              isDark
            />
          ))}
        </div>
      </section>

      {/* Second half — Light section */}
      <section className="section-white section-spacing">
        <div className="max-w-[680px] mx-auto px-6">
          {secondHalf.map((item, relIndex) => {
            const absIndex = halfPoint + relIndex
            return (
              <FAQAccordionItem
                key={absIndex}
                item={item}
                index={absIndex}
                isOpen={openIndex === absIndex}
                onToggle={() => setOpenIndex(openIndex === absIndex ? null : absIndex)}
                isDark={false}
              />
            )
          })}
        </div>
      </section>

      {/* Still have questions — Dark section */}
      <section className="section-paper py-20 sm:py-24">
        <div className="max-w-[680px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3 className="font-sans text-[24px] sm:text-[32px] font-bold text-foreground mb-3 tracking-tight">
              Still have questions?
            </h3>
            <p className="text-muted-foreground text-[14px] sm:text-[15px] max-w-[420px] mx-auto mb-6 font-sans">
              Join the community on Discord or explore the codebase directly.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://discord.gg/qYkpAeSYR"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-[14px] hover:bg-primary/90 transition-colors font-sans"
              >
                Join Discord
              </a>
              <a
                href="https://github.com/Willow7737/omnia-protocol"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border text-foreground text-[14px] hover:bg-muted transition-colors font-sans"
              >
                Read the Code
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
