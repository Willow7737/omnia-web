'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import {
  Heart,
  Star,
  XCircle,
  ShieldCheck,
  AlertOctagon,
  Globe,
  Mail,
  BookOpen,
  Scale,
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' } as const,
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

const positiveBehaviors = [
  'Demonstrating empathy and kindness toward other people',
  'Being respectful of differing opinions, viewpoints, and experiences',
  'Giving and gracefully accepting constructive feedback',
  'Accepting responsibility and apologizing to those affected by our mistakes',
  'Focusing on what is best not just for us as individuals, but for the overall community',
]

const unacceptableBehaviors = [
  'The use of sexualized language or imagery, and sexual attention or advances of any kind',
  'Trolling, insulting or derogatory comments, and personal or political attacks',
  'Public or private harassment',
  "Publishing others' private information, such as a physical or email address, without their explicit permission",
  'Other conduct which could reasonably be considered inappropriate in a professional setting',
]

const enforcementLevels = [
  {
    level: 'Correction',
    color: '#30D158',
    description:
      'Community leaders will provide a private, written warning to the person responsible for the behavior, making clear what was inappropriate and why.',
  },
  {
    level: 'Warning',
    color: '#FF9F0A',
    description:
      'A warning with consequences for continued behavior. The person is told that any further violations will result in a temporary or permanent ban.',
  },
  {
    level: 'Temporary Ban',
    color: '#FF6723',
    description:
      'A temporary ban from any sort of interaction or public communication with the community for a specified period of time.',
  },
  {
    level: 'Permanent Ban',
    color: '#FF453A',
    description:
      'A permanent ban from any sort of public interaction within the community.',
  },
]

export default function ConductPage() {
  return (
    <div className="min-h-screen bg-omnia-base flex flex-col">
      <PageHeader
        title="Code of Conduct"
        description="Our commitment to a harassment-free, inclusive community for all participants."
        breadcrumbs={[
          { label: 'Community' },
          { label: 'Code of Conduct' },
        ]}
      />

      <section className="max-w-[980px] mx-auto px-6 py-16 sm:py-24">
        {/* Our Pledge */}
        <motion.section {...fadeInUp} className="mb-16">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2997FF]/10 flex items-center justify-center mt-0.5">
              <Heart className="w-5 h-5 text-omnia-accent" />
            </div>
            <div>
              <h2 className="text-[28px] sm:text-[32px] font-bold text-omnia-text tracking-tight font-[family-name:var(--font-space-grotesk)]">
                Our Pledge
              </h2>
            </div>
          </div>
          <div className="ml-14 text-omnia-text-secondary leading-[1.6] text-[15px] font-[family-name:var(--font-geist-sans)]">
            <p>
              We as members, contributors, and leaders pledge to make participation in our community
              a <span className="text-omnia-accent font-medium">harassment-free experience for everyone</span>,
              regardless of age, body size, visible or invisible disability, ethnicity, sex
              characteristics, gender identity and expression, level of experience, education,
              socio-economic status, nationality, personal appearance, race, religion, or sexual
              identity and orientation.
            </p>
            <p className="mt-3">
              We pledge to act and interact in ways that contribute to an open, welcoming, diverse,
              inclusive, and healthy community.
            </p>
          </div>
        </motion.section>

        {/* Separator */}
        <div className="h-px bg-white/[0.06] mb-16" />

        {/* Our Standards */}
        <motion.section {...fadeInUp} className="mb-16">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-omnia-sage/10 flex items-center justify-center mt-0.5">
              <Scale className="w-5 h-5 text-omnia-sage" />
            </div>
            <div>
              <h2 className="text-[28px] sm:text-[32px] font-bold text-omnia-text tracking-tight font-[family-name:var(--font-space-grotesk)]">
                Our Standards
              </h2>
            </div>
          </div>

          <div className="ml-14 space-y-8">
            {/* Positive behaviors */}
            <div>
              <h3 className="text-[12px] font-semibold text-omnia-sage uppercase tracking-wider mb-4 flex items-center gap-2 font-[family-name:var(--font-space-grotesk)]">
                <Star className="w-4 h-4" />
                Examples of Positive Behavior
              </h3>
              <div className="space-y-3">
                {positiveBehaviors.map((behavior, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-omnia-sage mt-2.5" />
                    <span className="text-omnia-text-secondary leading-[1.6] text-[15px] font-[family-name:var(--font-geist-sans)]">{behavior}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Unacceptable behaviors */}
            <div>
              <h3 className="text-[12px] font-semibold text-[#FF453A]/80 uppercase tracking-wider mb-4 flex items-center gap-2 font-[family-name:var(--font-space-grotesk)]">
                <XCircle className="w-4 h-4" />
                Examples of Unacceptable Behavior
              </h3>
              <div className="space-y-3">
                {unacceptableBehaviors.map((behavior, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#FF453A]/60 mt-2.5" />
                    <span className="text-omnia-text-secondary leading-[1.6] text-[15px] font-[family-name:var(--font-geist-sans)]">{behavior}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Separator */}
        <div className="h-px bg-white/[0.06] mb-16" />

        {/* Enforcement Responsibilities */}
        <motion.section {...fadeInUp} className="mb-16">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2997FF]/10 flex items-center justify-center mt-0.5">
              <ShieldCheck className="w-5 h-5 text-omnia-accent" />
            </div>
            <div>
              <h2 className="text-[28px] sm:text-[32px] font-bold text-omnia-text tracking-tight font-[family-name:var(--font-space-grotesk)]">
                Enforcement Responsibilities
              </h2>
            </div>
          </div>
          <div className="ml-14 text-omnia-text-secondary leading-[1.6] text-[15px] font-[family-name:var(--font-geist-sans)]">
            <p>
              Community leaders are responsible for clarifying and enforcing our standards of
              acceptable behavior and will take appropriate and fair corrective action in response to
              any behavior that they deem inappropriate, threatening, offensive, or harmful.
            </p>
            <p className="mt-3">
              Community leaders have the right and responsibility to remove, edit, or reject
              comments, commits, code, wiki edits, issues, and other contributions that are not
              aligned to this Code of Conduct, and will communicate reasons for moderation decisions
              when appropriate.
            </p>
          </div>
        </motion.section>

        {/* Separator */}
        <div className="h-px bg-white/[0.06] mb-16" />

        {/* Enforcement Guidelines */}
        <motion.section {...fadeInUp} className="mb-16">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2997FF]/10 flex items-center justify-center mt-0.5">
              <AlertOctagon className="w-5 h-5 text-omnia-accent" />
            </div>
            <div>
              <h2 className="text-[28px] sm:text-[32px] font-bold text-omnia-text tracking-tight font-[family-name:var(--font-space-grotesk)]">
                Enforcement Guidelines
              </h2>
            </div>
          </div>

          <div className="ml-14 space-y-4">
            {enforcementLevels.map((level, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
                className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5 sm:p-6 hover:border-white/[0.12] transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-[12px] font-bold px-2.5 py-1 rounded-md"
                    style={{
                      backgroundColor: `${level.color}15`,
                      color: level.color,
                      fontFamily: 'var(--font-jetbrains-mono)',
                    }}
                  >
                    {i + 1}
                  </span>
                  <h3
                    className="font-semibold text-omnia-text font-[family-name:var(--font-space-grotesk)] tracking-tight"
                    style={{ color: level.color }}
                  >
                    {level.level}
                  </h3>
                </div>
                <p className="text-omnia-text-secondary text-[14px] leading-[1.6] ml-9 font-[family-name:var(--font-geist-sans)]">{level.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Separator */}
        <div className="h-px bg-white/[0.06] mb-16" />

        {/* Scope */}
        <motion.section {...fadeInUp} className="mb-16">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-omnia-sage/10 flex items-center justify-center mt-0.5">
              <Globe className="w-5 h-5 text-omnia-sage" />
            </div>
            <div>
              <h2 className="text-[28px] sm:text-[32px] font-bold text-omnia-text tracking-tight font-[family-name:var(--font-space-grotesk)]">
                Scope
              </h2>
            </div>
          </div>
          <div className="ml-14 text-omnia-text-secondary leading-[1.6] text-[15px] font-[family-name:var(--font-geist-sans)]">
            <p>
              This Code of Conduct applies within all community spaces, and also applies when an
              individual is officially representing the community in public spaces. Examples of
              representing our community include using an official e-mail address, posting via an
              official social media account, or acting as an appointed representative at an online or
              offline event.
            </p>
          </div>
        </motion.section>

        {/* Separator */}
        <div className="h-px bg-white/[0.06] mb-16" />

        {/* Enforcement & Contact */}
        <motion.section {...fadeInUp} className="mb-16">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2997FF]/10 flex items-center justify-center mt-0.5">
              <Mail className="w-5 h-5 text-omnia-accent" />
            </div>
            <div>
              <h2 className="text-[28px] sm:text-[32px] font-bold text-omnia-text tracking-tight font-[family-name:var(--font-space-grotesk)]">
                Enforcement
              </h2>
            </div>
          </div>
          <div className="ml-14 text-omnia-text-secondary leading-[1.6] text-[15px] font-[family-name:var(--font-geist-sans)]">
            <p>
              Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to
              the community leaders responsible for enforcement at:{' '}
              <a
                href="mailto:conduct@omnia.protocol"
                className="text-omnia-accent hover:underline font-medium"
              >
                conduct@omnia.protocol
              </a>
              . All complaints will be reviewed and investigated promptly and fairly.
            </p>
            <p className="mt-3">
              All community leaders are obligated to respect the privacy and security of the reporter
              of any incident.
            </p>
          </div>
        </motion.section>

        {/* Separator */}
        <div className="h-px bg-white/[0.06] mb-16" />

        {/* Attribution */}
        <motion.section {...fadeInUp}>
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-omnia-sage/10 flex items-center justify-center mt-0.5">
              <BookOpen className="w-5 h-5 text-omnia-sage" />
            </div>
            <div>
              <h2 className="text-[28px] sm:text-[32px] font-bold text-omnia-text tracking-tight font-[family-name:var(--font-space-grotesk)]">
                Attribution
              </h2>
            </div>
          </div>
          <div className="ml-14 text-omnia-text-secondary leading-[1.6] text-[15px] font-[family-name:var(--font-geist-sans)]">
            <p>
              This Code of Conduct is adapted from the{' '}
              <span className="text-omnia-accent font-medium">Contributor Covenant</span>, version 2.1,
              available at{' '}
              <a
                href="https://www.contributor-covenant.org/version/2/1/code_of_conduct.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-omnia-accent hover:underline"
              >
                contributor-covenant.org
              </a>
              .
            </p>
            <p className="mt-3">
              Community Impact Guidelines were inspired by{' '}
              <a
                href="https://github.com/mozilla/diversity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-omnia-accent hover:underline"
              >
                Mozilla&apos;s code of conduct enforcement ladder
              </a>
              .
            </p>
          </div>
        </motion.section>
      </section>

      <Footer />
    </div>
  )
}
