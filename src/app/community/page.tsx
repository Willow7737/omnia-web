'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
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
  CheckCircle2,
  Calculator,
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

const channels = [
  {
    icon: GitBranch,
    title: 'GitHub',
    link: 'github.com/Willow7737/omnia-protocol',
    description: 'Source code, issues, discussions',
    color: 'text-omnia-text',
    bgColor: 'bg-omnia-text/10',
  },
  {
    icon: MessageCircle,
    title: 'Discord',
    link: 'discord.gg/qYkpAeSYR',
    description: 'Real-time chat, support, community',
    color: 'text-omnia-accent',
    bgColor: 'bg-omnia-accent/10',
  },
  {
    icon: MessageSquare,
    title: 'GitHub Discussions',
    link: 'Questions, ideas, and general interaction',
    description: 'Long-form conversation and proposals',
    color: 'text-omnia-sage',
    bgColor: 'bg-omnia-sage/10',
  },
]

const contributeWays = [
  {
    icon: Bug,
    title: 'Report bugs',
    description: 'Via GitHub Issues',
  },
  {
    icon: GitPullRequest,
    title: 'Submit pull requests',
    description: 'Rust codebase',
  },
  {
    icon: BookOpen,
    title: 'Write documentation',
    description: 'Guides, API docs, tutorials',
  },
  {
    icon: Vote,
    title: 'Participate in governance',
    description: 'Discussions and proposals',
  },
  {
    icon: Server,
    title: 'Run a validator node',
    description: 'Coming soon',
  },
  {
    icon: Megaphone,
    title: 'Spread the word',
    description: 'Tell others about Omnia',
  },
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
  { icon: FileCode2, value: '224', label: 'Rust Source Files', color: 'text-omnia-accent' },
  { icon: ListChecks, value: '1,382', label: 'Passing Tests', color: 'text-emerald-400' },
  { icon: FileCode2, value: '81,000+', label: 'Lines of Code', color: 'text-omnia-sage' },
  { icon: Globe, value: 'CC0', label: 'Public Domain', color: 'text-omnia-accent' },
]

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-omnia-base">
      <PageHeader
        title="Community"
        description="Omnia is a public-interest protocol. It thrives through open collaboration, radical transparency, and community governance. Whether you are a developer, researcher, validator, or curious observer — there is a place for you."
        breadcrumbs={[{ label: 'Community' }]}
      />

      {/* Join the Conversation */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-omnia-accent" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-omnia-text">Join the Conversation</h2>
          </div>
          <p className="text-omnia-text-secondary leading-relaxed text-base sm:text-lg max-w-4xl mb-12">
            Omnia is built in the open. Every discussion, every decision, every line of code happens where 
            everyone can see it and participate. These are the places where the community gathers.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {channels.map((channel, i) => {
            const Icon = channel.icon
            return (
              <motion.div
                key={i}
                {...staggerItem}
                className="group bg-omnia-surface border border-omnia-border rounded-xl p-5 sm:p-6 hover:border-omnia-accent/30 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl ${channel.bgColor} flex items-center justify-center mb-5`}>
                  <Icon className={`w-6 h-6 ${channel.color}`} />
                </div>
                <h3 className="text-omnia-text font-semibold text-lg mb-2">{channel.title}</h3>
                <p className="text-omnia-text-secondary text-sm mb-4">{channel.description}</p>
                <p className="text-omnia-accent text-sm font-mono">{channel.link}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Separator */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-omnia-border" />
      </div>

      {/* How to Contribute */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <h2 className="text-2xl sm:text-3xl font-bold text-omnia-text mb-4">How to Contribute</h2>
          <p className="text-omnia-text-secondary leading-relaxed text-base sm:text-lg max-w-3xl mb-12">
            Every contribution matters. Whether you write code, report bugs, or simply share what you 
            have learned — you make the protocol stronger.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {contributeWays.map((way, i) => {
            const Icon = way.icon
            return (
              <motion.div
                key={i}
                {...staggerItem}
                className="group bg-omnia-surface border border-omnia-border rounded-xl p-5 sm:p-6 hover:border-omnia-accent/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-omnia-accent" />
                  </div>
                  <div>
                    <h3 className="text-omnia-text font-medium text-sm sm:text-base">{way.title}</h3>
                    <p className="text-omnia-text-secondary text-xs sm:text-sm mt-1">{way.description}</p>
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

      {/* Governance */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-omnia-accent" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-omnia-text">Governance</h2>
          </div>
          <p className="text-omnia-text-secondary leading-relaxed text-base sm:text-lg max-w-4xl mb-12">
            Omnia&apos;s governance is designed to prevent power concentration while enabling efficient 
            decision-making. No whales, no cabals, no permanent majorities.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {governanceFeatures.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                {...staggerItem}
                className="bg-omnia-surface border border-omnia-border rounded-xl p-5 sm:p-6 hover:border-omnia-accent/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-omnia-accent" />
                  </div>
                  <div>
                    <h3 className="text-omnia-text font-semibold text-base mb-2">{feature.title}</h3>
                    <p className="text-omnia-text-secondary text-sm leading-relaxed">{feature.description}</p>
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

      {/* Code of Conduct */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-omnia-accent" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-omnia-text">Code of Conduct</h2>
          </div>
        </motion.div>

        <motion.div {...fadeInUp}>
          <div className="bg-omnia-surface border border-omnia-border rounded-xl p-5 sm:p-8">
            <div className="max-w-3xl">
              <div className="space-y-5">
                <p className="text-omnia-text-secondary text-base sm:text-lg leading-relaxed">
                  We pledge to make participation in our community a harassment-free experience for everyone, 
                  regardless of age, body size, disability, ethnicity, gender identity and expression, level 
                  of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.
                </p>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-omnia-accent flex-shrink-0 mt-0.5" />
                  <p className="text-omnia-text text-sm font-medium">
                    Read the full Code of Conduct on the{' '}
                    <Link href="/conduct" className="text-omnia-accent hover:underline">
                      conduct page
                    </Link>.
                  </p>
                </div>
                <div className="h-px bg-omnia-border" />
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-omnia-accent" />
                  <div>
                    <p className="text-omnia-text text-sm font-medium">Enforcement</p>
                    <p className="text-omnia-accent text-sm font-mono">conduct@omnia.protocol</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Separator */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-omnia-border" />
      </div>

      {/* Community Stats */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <h2 className="text-2xl sm:text-3xl font-bold text-omnia-text mb-4">Community Stats</h2>
          <p className="text-omnia-text-secondary leading-relaxed text-base sm:text-lg max-w-3xl mb-10">
            Real numbers from the codebase. No vanity metrics, no inflation.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {communityStats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                {...staggerItem}
                className="bg-omnia-surface border border-omnia-border rounded-xl p-5 sm:p-6 text-center hover:border-omnia-accent/30 transition-colors"
              >
                <div className="flex justify-center mb-3">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className={`text-2xl sm:text-3xl font-bold font-mono ${stat.color} mb-1`}>
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
