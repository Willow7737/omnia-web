'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
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
  ArrowRight,
  CheckCircle2,
  Globe,
  Lock,
  Users,
  Landmark,
  MessageSquare,
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.12 } },
  viewport: { once: true, margin: '-50px' },
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

const fundingAreas = [
  { icon: Hammer, label: 'Core protocol development', detail: 'Rust, cryptography, consensus' },
  { icon: ShieldCheck, label: 'Security audits and formal verification', detail: 'External audits, proof correctness' },
  { icon: Globe, label: 'Testnet infrastructure and monitoring', detail: 'Nodes, dashboards, observability' },
  { icon: MessageSquare, label: 'Documentation and developer experience', detail: 'Guides, API docs, SDKs' },
  { icon: Vote, label: 'Community operations and governance tooling', detail: 'Voting systems, coordination' },
]

const tiers = [
  {
    icon: Compass,
    title: 'Explorer',
    amount: '$10+',
    description: 'Helps fund testnet infrastructure and monitoring',
    color: 'text-omnia-sage',
    bgColor: 'bg-omnia-sage/10',
    borderColor: 'border-omnia-sage/20',
    accentBar: 'bg-omnia-sage',
  },
  {
    icon: Hammer,
    title: 'Builder',
    amount: '$50+',
    description: 'Supports core protocol development and code review',
    color: 'text-omnia-accent',
    bgColor: 'bg-omnia-accent/10',
    borderColor: 'border-omnia-accent/20',
    accentBar: 'bg-omnia-accent',
  },
  {
    icon: Building2,
    title: 'Architect',
    amount: '$200+',
    description: 'Contributes to security audits and formal verification',
    color: 'text-omnia-accent',
    bgColor: 'bg-omnia-accent/10',
    borderColor: 'border-omnia-accent/30',
    accentBar: 'bg-omnia-accent',
  },
  {
    icon: ShieldCheck,
    title: 'Guardian',
    amount: '$1,000+',
    description: 'Enables major protocol milestones and external audits',
    color: 'text-omnia-accent',
    bgColor: 'bg-omnia-accent/15',
    borderColor: 'border-omnia-accent/40',
    accentBar: 'bg-omnia-accent',
  },
]

const donationMethods = [
  {
    icon: GitBranch,
    title: 'GitHub Sponsors',
    description: 'Support ongoing development through GitHub',
    link: 'github.com/Willow7737',
    linkLabel: 'Sponsor on GitHub',
  },
  {
    icon: Wallet,
    title: 'Ethereum',
    description: 'Direct on-chain donation',
    link: '0x0000...0000',
    linkLabel: 'Copy Address',
    isAddress: true,
  },
  {
    icon: Landmark,
    title: 'Gitcoin Grants',
    description: 'Community-driven quadratic funding',
    link: 'When available',
    linkLabel: 'Coming Soon',
    disabled: true,
  },
  {
    icon: Mail,
    title: 'Direct Sponsorship',
    description: 'For custom arrangements',
    link: 'conduct@omnia.protocol',
    linkLabel: 'Send Email',
  },
]

const transparencyPoints = [
  { icon: Eye, text: 'All funds are tracked publicly' },
  { icon: Lock, text: 'No hidden allocations' },
  { icon: Globe, text: 'CC0 means no entity can capture value' },
  { icon: Users, text: 'Community governance over fund allocation' },
]

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-omnia-base">
      <PageHeader
        title="Support Omnia"
        description="Public infrastructure deserves public funding. No token sale, no VC round, no pre-mine — just people who believe that trustless systems should be a public good."
        breadcrumbs={[{ label: 'Donate' }]}
      />

      {/* Why Support Omnia? */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-omnia-accent" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-omnia-text">Why Support Omnia?</h2>
          </div>
          <div className="space-y-5 text-omnia-text-secondary leading-relaxed text-base sm:text-lg max-w-4xl mb-10">
            <p>
              Omnia is a public-interest protocol released under <span className="text-omnia-accent font-medium">CC0</span> — 
              no entity owns it. There is no token sale, no VC round, no pre-mine. Development is funded by 
              protocol grants, community contributions, and individual donations.
            </p>
            <p>
              Your support directly funds the work that makes trustless infrastructure possible:
            </p>
          </div>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {fundingAreas.map((area, i) => {
            const Icon = area.icon
            return (
              <motion.div
                key={i}
                {...staggerItem}
                className="group bg-omnia-surface border border-omnia-border rounded-xl p-5 hover:border-omnia-accent/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-omnia-accent" />
                  </div>
                  <div>
                    <p className="text-omnia-text text-sm font-medium">{area.label}</p>
                    <p className="text-omnia-text-secondary text-xs mt-1">{area.detail}</p>
                  </div>
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

      {/* How Your Contribution Helps - Tier Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <h2 className="text-2xl sm:text-3xl font-bold text-omnia-text mb-4">How Your Contribution Helps</h2>
          <p className="text-omnia-text-secondary leading-relaxed text-base sm:text-lg max-w-3xl mb-12">
            Every contribution matters. Here is what your support enables at each level.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {tiers.map((tier, i) => {
            const Icon = tier.icon
            return (
              <motion.div
                key={i}
                {...staggerItem}
                className={`bg-omnia-surface border ${tier.borderColor} rounded-xl overflow-hidden hover:border-omnia-accent/30 transition-all hover:shadow-lg hover:shadow-omnia-accent/5`}
              >
                <div className={`h-1 ${tier.accentBar}`} />
                <div className="p-5 sm:p-6">
                  <div className={`w-12 h-12 rounded-xl ${tier.bgColor} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${tier.color}`} />
                  </div>
                  <h3 className="text-omnia-text font-bold text-lg mb-1">{tier.title}</h3>
                  <p className={`font-mono font-bold text-xl ${tier.color} mb-3`}>{tier.amount}</p>
                  <p className="text-omnia-text-secondary text-sm leading-relaxed">{tier.description}</p>
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

      {/* Ways to Donate */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <h2 className="text-2xl sm:text-3xl font-bold text-omnia-text mb-4">Ways to Donate</h2>
          <p className="text-omnia-text-secondary leading-relaxed text-base sm:text-lg max-w-3xl mb-12">
            Choose the method that works best for you. Every contribution goes directly to protocol development.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {donationMethods.map((method, i) => {
            const Icon = method.icon
            return (
              <motion.div
                key={i}
                {...staggerItem}
                className={`bg-omnia-surface border border-omnia-border rounded-xl p-5 sm:p-6 hover:border-omnia-accent/30 transition-colors ${method.disabled ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-omnia-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-omnia-text font-semibold text-base mb-1">{method.title}</h3>
                    <p className="text-omnia-text-secondary text-sm mb-3">{method.description}</p>
                    {method.isAddress ? (
                      <div className="flex items-center gap-2">
                        <code className="text-omnia-accent text-xs font-mono bg-omnia-accent/5 px-3 py-1.5 rounded-md border border-omnia-accent/10">
                          {method.link}
                        </code>
                      </div>
                    ) : (
                      <span className={`text-sm ${method.disabled ? 'text-omnia-text-secondary/60' : 'text-omnia-accent'} font-medium`}>
                        {method.linkLabel}
                      </span>
                    )}
                  </div>
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

      {/* Transparency */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <h2 className="text-2xl sm:text-3xl font-bold text-omnia-text mb-4">Transparency</h2>
          <p className="text-omnia-text-secondary leading-relaxed text-base sm:text-lg max-w-3xl mb-10">
            We hold ourselves to the same standard we hold the protocol. Every donation, every allocation, 
            every decision — visible by default.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {transparencyPoints.map((point, i) => {
            const Icon = point.icon
            return (
              <motion.div
                key={i}
                {...staggerItem}
                className="flex items-start gap-4 bg-omnia-surface border border-omnia-border rounded-xl p-5 sm:p-6 hover:border-omnia-accent/30 transition-colors"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-omnia-accent" />
                </div>
                <p className="text-omnia-text text-sm sm:text-base font-medium leading-relaxed">
                  {point.text}
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

      {/* Corporate Sponsorship */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-omnia-accent" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-omnia-text">Corporate Sponsorship</h2>
          </div>
          <p className="text-omnia-text-secondary leading-relaxed text-base sm:text-lg max-w-3xl mb-10">
            For organizations that want to support public infrastructure. This is not a sponsorship deal — 
            it is an investment in the commons.
          </p>
        </motion.div>

        <motion.div {...fadeInUp}>
          <div className="bg-omnia-surface border border-omnia-border rounded-xl p-5 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-omnia-text font-semibold text-base mb-4">Benefits</h3>
                <ul className="space-y-3">
                  {[
                    'Logo placement on the Omnia website',
                    'Early access to new features and releases',
                    'Dedicated support channel',
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-omnia-accent flex-shrink-0" />
                      <span className="text-omnia-text-secondary text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-omnia-text font-semibold text-base mb-4">Get in Touch</h3>
                <p className="text-omnia-text-secondary text-sm leading-relaxed mb-4">
                  If your organization believes in public infrastructure, we would like to hear from you. 
                  No strings attached, no governance capture, no special access to protocol decisions.
                </p>
                <div className="flex items-center gap-2 text-omnia-accent">
                  <Mail className="w-4 h-4" />
                  <span className="font-mono text-sm">conduct@omnia.protocol</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer spacer */}
      <div className="h-16" />
    </div>
  )
}
