'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { ChevronDown, HelpCircle } from 'lucide-react'
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
      'Not yet. All 6 architecture layers are implemented and tested (1,382 tests passing), but the protocol is currently in the post-Phase 5 audit stage. A public testnet and external security audit are pending before mainnet launch.',
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

function FAQAccordionItem({ item, index, isOpen, onToggle }: { item: FAQItem; index: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <div
        className={`rounded-2xl overflow-hidden transition-all duration-300 border ${
          isOpen
            ? 'border-white/[0.12] bg-white/[0.03]'
            : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1] hover:bg-white/[0.03]'
        }`}
      >
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-4 p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2997FF]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-2xl"
          aria-expanded={isOpen}
        >
          <div
            className={`flex-shrink-0 w-[3px] self-stretch rounded-full transition-colors duration-300 ${
              isOpen ? 'bg-[#2997FF]' : 'bg-white/[0.08]'
            }`}
          />

          <div className="flex-1 min-w-0">
            <span
              className={`text-[15px] sm:text-[17px] font-medium transition-colors duration-300 font-[family-name:var(--font-space-grotesk)] ${
                isOpen ? 'text-[#F5F5F7]' : 'text-[#86868B]'
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
                isOpen ? 'text-[#2997FF]' : 'text-[#48484A]'
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
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-10 sm:pl-12">
                <div className="border-t border-white/[0.06] pt-4">
                  <p className="text-[#86868B] text-[14px] sm:text-[15px] leading-[1.6] font-[family-name:var(--font-geist-sans)]">
                    {item.answer}
                  </p>
                </div>
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

  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title="FAQ"
        description="Straight answers about the protocol, its architecture, and how to get involved. No marketing speak — just honest, technical responses."
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      <section className="max-w-[680px] mx-auto px-6 pb-24">
        <div className="space-y-2">
          {faqs.map((item, index) => (
            <FAQAccordionItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </section>

      {/* Still have questions */}
      <div className="max-w-[680px] mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-6 sm:p-8 text-center border border-white/[0.06] bg-white/[0.02]"
        >
          <h3 className="text-[20px] sm:text-[24px] font-bold text-[#F5F5F7] mb-3 font-[family-name:var(--font-space-grotesk)] tracking-tight">
            Still have questions?
          </h3>
          <p className="text-[#86868B] text-[14px] sm:text-[15px] max-w-[420px] mx-auto mb-6 font-[family-name:var(--font-geist-sans)]">
            Join the community on Discord or explore the codebase directly.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://discord.gg/qYkpAeSYR"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2997FF] text-white font-medium text-[14px] hover:bg-[#2384d6] transition-colors font-[family-name:var(--font-space-grotesk)]"
            >
              Join Discord
            </a>
            <a
              href="https://github.com/Willow7737/omnia-protocol"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/[0.1] text-[#F5F5F7] text-[14px] hover:bg-white/[0.04] transition-colors font-[family-name:var(--font-space-grotesk)]"
            >
              Read the Code
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
