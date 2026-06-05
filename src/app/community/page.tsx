'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import {
  Users,
  GitBranch,
  MessageCircle,
  MessageSquare,
  Bug,
  GitPullRequest,
  BookOpen,
  Vote,
  Server,
  Megaphone,
  Scale,
  Clock,
  ShieldCheck,
  FileCode2,
  ListChecks,
  Globe,
  Hash,
  Mail,
  Heart,
  Calculator,
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, margin: '-50px' },
}

const staggerItem = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
}

const channels = [
  {
    icon: GitBranch,
    title: 'GitHub',
    link: 'github.com/Willow7737/omnia-protocol',
    description: 'Source code, issues, discussions',
  },
  {
    icon: MessageCircle,
    title: 'Discord',
    link: 'discord.gg/qYkpAeSYR',
    description: 'Real-time chat, support, community',
  },
  {
    icon: MessageSquare,
    title: 'GitHub Discussions',
    link: 'Questions, ideas, and proposals',
    description: 'Long-form conversation and proposals',
  },
]

const contributeWays = [
  { icon: Bug, title: 'Report bugs', description: 'Via GitHub Issues' },
  { icon: GitPullRequest, title: 'Submit pull requests', description: 'Rust codebase' },
  { icon: BookOpen, title: 'Write documentation', description: 'Guides, API docs, tutorials' },
  { icon: Vote, title: 'Participate in governance', description: 'Discussions and proposals' },
  { icon: Server, title: 'Run a validator node', description: 'Coming soon' },
  { icon: Megaphone, title: 'Spread the word', description: 'Tell others about Omnia' },
]

const governanceFeatures = [
  {
    icon: Vote,
    title: 'Quadratic Voting',
    description: 'Exponential reputation decay ensures influence must be continuously earned — no permanent power accumulation.',
  },
  {
    icon: Calculator,
    title: 'Fixed-Point Governance Decay',
    description: 'PPM (parts-per-million) arithmetic for deterministic results. No floating-point in consensus-critical code.',
  },
  {
    icon: Clock,
    title: 'Time-Locked Proposals',
    description: 'Proposals are time-locked before execution, giving the community time to review, discuss, and veto if needed.',
  },
  {
    icon: Hash,
    title: 'Community-Driven Roadmap',
    description: 'The protocol roadmap is shaped by community input. No single entity decides what gets built next.',
  },
]

const communityStats = [
  { icon: FileCode2, value: '224', label: 'Rust Source Files' },
  { icon: ListChecks, value: '1,382', label: 'Passing Tests' },
  { icon: FileCode2, value: '81,000+', label: 'Lines of Code' },
  { icon: Globe, value: 'CC0', label: 'Public Domain' },
]

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title="Community"
        description="Omnia is a public-interest protocol. It thrives through open collaboration, radical transparency, and community governance."
        breadcrumbs={[{ label: 'Community' }]}
      />

      {/* Join the Conversation */}
      <section className="max-w-[980px] mx-auto px-6 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#2997FF]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#2997FF]" />
            </div>
            <h2 className="text-[28px] sm:text-[32px] font-bold text-[#F5F5F7] font-[family-name:var(--font-space-grotesk)] tracking-tight">Join the Conversation</h2>
          </div>
          <p className="text-[#86868B] leading-[1.6] text-[15px] sm:text-[17px] max-w-[680px] mb-12 font-[family-name:var(--font-geist-sans)]">
            Omnia is built in the open. Every discussion, every decision, every line of code happens where everyone can see it and participate.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          {channels.map((channel, i) => {
            const Icon = channel.icon
            return (
              <motion.div
                key={i}
                {...staggerItem}
                className="group rounded-2xl p-5 sm:p-6 transition-all duration-300 bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2997FF]/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#2997FF]" />
                </div>
                <h3 className="text-[#F5F5F7] font-semibold text-[17px] mb-2 font-[family-name:var(--font-space-grotesk)]">{channel.title}</h3>
                <p className="text-[#86868B] text-[14px] mb-4 font-[family-name:var(--font-geist-sans)]">{channel.description}</p>
                <p className="text-[#2997FF] text-[13px] font-mono">{channel.link}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      <div className="max-w-[980px] mx-auto px-6">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* How to Contribute */}
      <section className="max-w-[980px] mx-auto px-6 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <h2 className="text-[28px] sm:text-[32px] font-bold text-[#F5F5F7] mb-4 font-[family-name:var(--font-space-grotesk)] tracking-tight">How to Contribute</h2>
          <p className="text-[#86868B] leading-[1.6] text-[15px] sm:text-[17px] max-w-[600px] mb-12 font-[family-name:var(--font-geist-sans)]">
            Every contribution matters. Whether you write code, report bugs, or simply share what you have learned — you make the protocol stronger.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {contributeWays.map((way, i) => {
            const Icon = way.icon
            return (
              <motion.div
                key={i}
                {...staggerItem}
                className="group rounded-2xl p-5 sm:p-6 transition-all duration-300 bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#2997FF]/10 flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-[#2997FF]" />
                  </div>
                  <div>
                    <h3 className="text-[#F5F5F7] font-medium text-[14px] font-[family-name:var(--font-space-grotesk)]">{way.title}</h3>
                    <p className="text-[#86868B] text-[12px] mt-1 font-[family-name:var(--font-geist-sans)]">{way.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      <div className="max-w-[980px] mx-auto px-6">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* Governance */}
      <section className="max-w-[980px] mx-auto px-6 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#2997FF]/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-[#2997FF]" />
            </div>
            <h2 className="text-[28px] sm:text-[32px] font-bold text-[#F5F5F7] font-[family-name:var(--font-space-grotesk)] tracking-tight">Governance</h2>
          </div>
          <p className="text-[#86868B] leading-[1.6] text-[15px] sm:text-[17px] max-w-[680px] mb-12 font-[family-name:var(--font-geist-sans)]">
            Omnia&apos;s governance is designed to prevent power concentration while enabling efficient decision-making. No whales, no cabals, no permanent majorities.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {governanceFeatures.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                {...staggerItem}
                className="rounded-2xl p-5 sm:p-6 transition-all duration-300 bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2997FF]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#2997FF]" />
                  </div>
                  <div>
                    <h3 className="text-[#F5F5F7] font-semibold text-[15px] mb-2 font-[family-name:var(--font-space-grotesk)]">{feature.title}</h3>
                    <p className="text-[#86868B] text-[14px] leading-[1.5] font-[family-name:var(--font-geist-sans)]">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      <div className="max-w-[980px] mx-auto px-6">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* Code of Conduct */}
      <section className="max-w-[980px] mx-auto px-6 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#2997FF]/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#2997FF]" />
            </div>
            <h2 className="text-[28px] sm:text-[32px] font-bold text-[#F5F5F7] font-[family-name:var(--font-space-grotesk)] tracking-tight">Code of Conduct</h2>
          </div>
        </motion.div>

        <motion.div {...fadeInUp}>
          <div className="rounded-2xl p-5 sm:p-8 transition-all duration-300 bg-white/[0.02] border border-white/[0.06]">
            <div className="max-w-[680px]">
              <div className="space-y-5">
                <p className="text-[#86868B] text-[15px] sm:text-[17px] leading-[1.6] font-[family-name:var(--font-geist-sans)]">
                  We pledge to make participation in our community a harassment-free experience for everyone, 
                  regardless of age, body size, disability, ethnicity, gender identity and expression, level 
                  of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.
                </p>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-[#2997FF] flex-shrink-0 mt-0.5" />
                  <p className="text-[#F5F5F7] text-[14px] font-medium font-[family-name:var(--font-geist-sans)]">
                    Read the full Code of Conduct on the{' '}
                    <Link href="/conduct" className="text-[#2997FF] hover:underline">
                      conduct page
                    </Link>.
                  </p>
                </div>
                <div className="h-px bg-white/[0.06]" />
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#2997FF]" />
                  <div>
                    <p className="text-[#F5F5F7] text-[14px] font-medium font-[family-name:var(--font-space-grotesk)]">Enforcement</p>
                    <p className="text-[#2997FF] text-[13px] font-mono">conduct@omnia.protocol</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="max-w-[980px] mx-auto px-6">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* Community Stats */}
      <section className="max-w-[980px] mx-auto px-6 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <h2 className="text-[28px] sm:text-[32px] font-bold text-[#F5F5F7] mb-4 font-[family-name:var(--font-space-grotesk)] tracking-tight">Community Stats</h2>
          <p className="text-[#86868B] leading-[1.6] text-[15px] sm:text-[17px] max-w-[600px] mb-10 font-[family-name:var(--font-geist-sans)]">
            Real numbers from the codebase. No vanity metrics, no inflation.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {communityStats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                {...staggerItem}
                className="rounded-2xl p-5 sm:p-6 text-center transition-all duration-300 bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]"
              >
                <div className="flex justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#2997FF]" />
                </div>
                <div className="text-[24px] sm:text-[28px] font-bold font-mono text-[#F5F5F7] mb-1">
                  {stat.value}
                </div>
                <div className="text-[#86868B] text-[12px] font-[family-name:var(--font-geist-sans)]">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
