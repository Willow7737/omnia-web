'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import {
  Heart,
  Compass,
  Hammer,
  Building2,
  ShieldCheck,
  GitBranch,
  Wallet,
  Vote,
  Mail,
  Eye,
  CheckCircle2,
  Globe,
  Lock,
  Users,
  Landmark,
  MessageSquare,
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
}

const fundingAreas = [
  { icon: Hammer, label: 'Core protocol development', detail: 'Rust, cryptography, consensus' },
  { icon: ShieldCheck, label: 'Security audits and formal verification', detail: 'External audits, proof correctness' },
  { icon: Globe, label: 'Testnet infrastructure and monitoring', detail: 'Nodes, dashboards, observability' },
  { icon: MessageSquare, label: 'Documentation and developer experience', detail: 'Guides, API docs, SDKs' },
  { icon: Vote, label: 'Community operations and governance tooling', detail: 'Voting systems, coordination' },
]

const tiers = [
  { icon: Compass, title: 'Explorer', amount: '$10+', description: 'Helps fund testnet infrastructure and monitoring' },
  { icon: Hammer, title: 'Builder', amount: '$50+', description: 'Supports core protocol development and code review' },
  { icon: Building2, title: 'Architect', amount: '$200+', description: 'Contributes to security audits and formal verification' },
  { icon: ShieldCheck, title: 'Guardian', amount: '$1,000+', description: 'Enables major protocol milestones and external audits' },
]

const donationMethods = [
  { icon: GitBranch, title: 'GitHub Sponsors', description: 'Support ongoing development through GitHub', link: 'github.com/Willow7737', linkLabel: 'Sponsor on GitHub' },
  { icon: Wallet, title: 'Ethereum', description: 'Direct on-chain donation', link: '0x0000...0000', linkLabel: 'Copy Address', isAddress: true },
  { icon: Landmark, title: 'Gitcoin Grants', description: 'Community-driven quadratic funding', link: 'When available', linkLabel: 'Coming Soon', disabled: true },
  { icon: Mail, title: 'Direct Sponsorship', description: 'For custom arrangements', link: 'conduct@omnia.protocol', linkLabel: 'Send Email' },
]

const transparencyPoints = [
  { icon: Eye, text: 'All funds are tracked publicly' },
  { icon: Lock, text: 'No hidden allocations' },
  { icon: Globe, text: 'CC0 means no entity can capture value' },
  { icon: Users, text: 'Community governance over fund allocation' },
]

export default function DonatePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title="Support Omnia"
        description="Public infrastructure deserves public funding. No token sale, no VC round, no pre-mine — just people who believe that trustless systems should be a public good."
        breadcrumbs={[{ label: 'Donate' }]}
      />

      {/* Why Support Omnia? — Dark section */}
      <section className="section-dark section-spacing">
        <div className="max-w-[980px] mx-auto px-6">
          <motion.div {...fadeInUp}>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[40px] sm:text-[48px] md:text-[56px] font-bold tracking-[-0.03em] leading-[1.1] text-[#F5F5F7] mb-4">Why Support Omnia?</h2>
            <div className="space-y-5 text-[#86868B] leading-[1.6] text-[17px] sm:text-[19px] max-w-[680px] mb-10 font-[family-name:var(--font-geist-sans)]">
              <p>
                Omnia is a public-interest protocol released under <span className="text-[#F5F5F7] font-medium">CC0</span> — 
                no entity owns it. There is no token sale, no VC round, no pre-mine. Development is funded by 
                protocol grants, community contributions, and individual donations.
              </p>
              <p>
                Your support directly funds the work that makes trustless infrastructure possible:
              </p>
            </div>
          </motion.div>

          <div className="space-y-0">
            {fundingAreas.map((area, i) => {
              const Icon = area.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                  className={`flex items-center gap-4 sm:gap-6 py-5 ${i < fundingAreas.length - 1 ? 'border-b border-white/[0.06]' : ''}`}
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#2997FF]/10 flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-[#2997FF]" />
                  </div>
                  <div>
                    <p className="text-[#F5F5F7] text-[15px] sm:text-[17px] font-medium font-[family-name:var(--font-space-grotesk)]">{area.label}</p>
                    <p className="text-[#86868B] text-[13px] mt-0.5 font-[family-name:var(--font-geist-sans)]">{area.detail}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tier Cards — Light section */}
      <section className="section-light section-spacing">
        <div className="max-w-[980px] mx-auto px-6">
          <motion.div {...fadeInUp}>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[40px] sm:text-[48px] md:text-[56px] font-bold tracking-[-0.03em] leading-[1.1] text-[#1D1D1F] mb-4">How Your Contribution Helps</h2>
            <p className="text-[#6E6E73] leading-[1.6] text-[17px] sm:text-[19px] max-w-[600px] mb-12 font-[family-name:var(--font-geist-sans)]">
              Every contribution matters. Here is what your support enables at each level.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(0,0,0,0.06)] rounded-xl overflow-hidden">
            {tiers.map((tier, i) => {
              const Icon = tier.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                  className="bg-[#FBFBFD] p-6 sm:p-8"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2997FF]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#2997FF]" />
                  </div>
                  <h3 className="text-[#1D1D1F] font-bold text-[17px] mb-1 font-[family-name:var(--font-space-grotesk)]">{tier.title}</h3>
                  <p className="font-[family-name:var(--font-jetbrains-mono)] font-bold text-[20px] text-[#2997FF] mb-3">{tier.amount}</p>
                  <p className="text-[#6E6E73] text-[13px] leading-[1.5] font-[family-name:var(--font-geist-sans)]">{tier.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Ways to Donate — Dark section */}
      <section className="section-dark section-spacing">
        <div className="max-w-[980px] mx-auto px-6">
          <motion.div {...fadeInUp}>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[40px] sm:text-[48px] md:text-[56px] font-bold tracking-[-0.03em] leading-[1.1] text-[#F5F5F7] mb-4">Ways to Donate</h2>
            <p className="text-[#86868B] leading-[1.6] text-[17px] sm:text-[19px] max-w-[600px] mb-12 font-[family-name:var(--font-geist-sans)]">
              Choose the method that works best for you. Every contribution goes directly to protocol development.
            </p>
          </motion.div>

          <div className="space-y-0">
            {donationMethods.map((method, i) => {
              const Icon = method.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                  className={`group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-6 ${i < donationMethods.length - 1 ? 'border-b border-white/[0.06]' : ''} ${method.disabled ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-center gap-3 sm:w-[240px] shrink-0">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#2997FF]/10 flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5 text-[#2997FF]" />
                    </div>
                    <h3 className="text-[#F5F5F7] font-semibold text-[15px] sm:text-[17px] font-[family-name:var(--font-space-grotesk)]">{method.title}</h3>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#86868B] text-[14px] font-[family-name:var(--font-geist-sans)]">{method.description}</p>
                  </div>
                  <div className="shrink-0">
                    {method.isAddress ? (
                      <code className="text-[#2997FF] text-[12px] font-[family-name:var(--font-jetbrains-mono)] bg-[#2997FF]/5 px-3 py-1.5 rounded-lg border border-[#2997FF]/10">
                        {method.link}
                      </code>
                    ) : (
                      <span className={`text-[13px] font-medium font-[family-name:var(--font-space-grotesk)] ${method.disabled ? 'text-[#48484A]' : 'text-[#2997FF]'}`}>
                        {method.linkLabel}
                      </span>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Transparency + Corporate Sponsorship — Light section */}
      <section className="section-light section-spacing">
        <div className="max-w-[980px] mx-auto px-6 space-y-16">
          <div>
            <motion.div {...fadeInUp}>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-[40px] sm:text-[48px] md:text-[56px] font-bold tracking-[-0.03em] leading-[1.1] text-[#1D1D1F] mb-4">Transparency</h2>
              <p className="text-[#6E6E73] leading-[1.6] text-[17px] sm:text-[19px] max-w-[600px] mb-10 font-[family-name:var(--font-geist-sans)]">
                We hold ourselves to the same standard we hold the protocol. Every donation, every allocation, every decision — visible by default.
              </p>
            </motion.div>

            <div className="space-y-0">
              {transparencyPoints.map((point, i) => {
                const Icon = point.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                    className={`flex items-center gap-4 py-4 ${i < transparencyPoints.length - 1 ? 'border-b border-[rgba(0,0,0,0.06)]' : ''}`}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#2997FF]/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#2997FF]" />
                    </div>
                    <p className="text-[#1D1D1F] text-[15px] sm:text-[17px] font-medium font-[family-name:var(--font-geist-sans)]">
                      {point.text}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div>
            <motion.div {...fadeInUp}>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-[40px] sm:text-[48px] md:text-[56px] font-bold tracking-[-0.03em] leading-[1.1] text-[#1D1D1F] mb-4">Corporate Sponsorship</h2>
              <p className="text-[#6E6E73] leading-[1.6] text-[17px] sm:text-[19px] max-w-[600px] mb-10 font-[family-name:var(--font-geist-sans)]">
                For organizations that want to support public infrastructure. This is not a sponsorship deal — it is an investment in the commons.
              </p>
            </motion.div>

            <motion.div {...fadeInUp}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-[#1D1D1F] font-semibold text-[15px] sm:text-[17px] mb-4 font-[family-name:var(--font-space-grotesk)]">Benefits</h3>
                  <ul className="space-y-3">
                    {[
                      'Logo placement on the Omnia website',
                      'Early access to new features and releases',
                      'Dedicated support channel',
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#2997FF] flex-shrink-0" />
                        <span className="text-[#6E6E73] text-[14px] sm:text-[15px] font-[family-name:var(--font-geist-sans)]">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-[#1D1D1F] font-semibold text-[15px] sm:text-[17px] mb-4 font-[family-name:var(--font-space-grotesk)]">Get in Touch</h3>
                  <p className="text-[#6E6E73] text-[14px] sm:text-[15px] leading-[1.6] mb-4 font-[family-name:var(--font-geist-sans)]">
                    If your organization believes in public infrastructure, we would like to hear from you. No strings attached, no governance capture, no special access to protocol decisions.
                  </p>
                  <div className="flex items-center gap-2 text-[#2997FF]">
                    <Mail className="w-4 h-4" />
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[13px]">conduct@omnia.protocol</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
