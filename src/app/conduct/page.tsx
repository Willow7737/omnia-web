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
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' } as const,
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
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
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title="Code of Conduct"
        description="Our commitment to a harassment-free, inclusive community for all participants."
        breadcrumbs={[
          { label: 'Community' },
          { label: 'Code of Conduct' },
        ]}
      />

      {/* Our Pledge — Dark section */}
      <section className="section-dark section-spacing">
        <div className="max-w-[980px] mx-auto px-6">
          <motion.section {...fadeInUp}>
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2997FF]/10 flex items-center justify-center mt-0.5">
                <Heart className="w-5 h-5 text-[#2997FF]" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-[40px] sm:text-[48px] font-bold tracking-[-0.03em] leading-[1.1] text-[#F5F5F7]">
                  Our Pledge
                </h2>
              </div>
            </div>
            <div className="ml-14 text-[#86868B] leading-[1.6] text-[17px] font-[family-name:var(--font-geist-sans)]">
              <p>
                We as members, contributors, and leaders pledge to make participation in our community
                a <span className="text-[#2997FF] font-medium">harassment-free experience for everyone</span>,
                regardless of age, body size, visible or invisible disability, ethnicity, sex
                characteristics, gender identity and expression, level of experience, education,
                socio-economic status, nationality, personal appearance, race, religion, or sexual
                identity and orientation.
              </p>
              <p className="mt-4">
                We pledge to act and interact in ways that contribute to an open, welcoming, diverse,
                inclusive, and healthy community.
              </p>
            </div>
          </motion.section>
        </div>
      </section>

      {/* Our Standards — Light section */}
      <section className="section-light section-spacing">
        <div className="max-w-[980px] mx-auto px-6">
          <motion.section {...fadeInUp}>
            <div className="flex items-start gap-4 mb-8">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#30D158]/10 flex items-center justify-center mt-0.5">
                <Scale className="w-5 h-5 text-[#30D158]" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-[40px] sm:text-[48px] font-bold tracking-[-0.03em] leading-[1.1] text-[#1D1D1F]">
                  Our Standards
                </h2>
              </div>
            </div>

            <div className="ml-14 space-y-10">
              {/* Positive behaviors */}
              <div>
                <h3 className="text-[12px] font-semibold text-[#30D158] uppercase tracking-wider mb-5 flex items-center gap-2 font-[family-name:var(--font-space-grotesk)]">
                  <Star className="w-4 h-4" />
                  Examples of Positive Behavior
                </h3>
                <div className="space-y-4">
                  {positiveBehaviors.map((behavior, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#30D158] mt-2.5" />
                      <span className="text-[#6E6E73] leading-[1.6] text-[15px] sm:text-[17px] font-[family-name:var(--font-geist-sans)]">{behavior}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unacceptable behaviors */}
              <div>
                <h3 className="text-[12px] font-semibold text-[#FF453A]/80 uppercase tracking-wider mb-5 flex items-center gap-2 font-[family-name:var(--font-space-grotesk)]">
                  <XCircle className="w-4 h-4" />
                  Examples of Unacceptable Behavior
                </h3>
                <div className="space-y-4">
                  {unacceptableBehaviors.map((behavior, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#FF453A]/60 mt-2.5" />
                      <span className="text-[#6E6E73] leading-[1.6] text-[15px] sm:text-[17px] font-[family-name:var(--font-geist-sans)]">{behavior}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </section>

      {/* Enforcement Responsibilities — Dark section */}
      <section className="section-dark section-spacing">
        <div className="max-w-[980px] mx-auto px-6">
          <motion.section {...fadeInUp}>
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2997FF]/10 flex items-center justify-center mt-0.5">
                <ShieldCheck className="w-5 h-5 text-[#2997FF]" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-[40px] sm:text-[48px] font-bold tracking-[-0.03em] leading-[1.1] text-[#F5F5F7]">
                  Enforcement Responsibilities
                </h2>
              </div>
            </div>
            <div className="ml-14 text-[#86868B] leading-[1.6] text-[17px] font-[family-name:var(--font-geist-sans)]">
              <p>
                Community leaders are responsible for clarifying and enforcing our standards of
                acceptable behavior and will take appropriate and fair corrective action in response to
                any behavior that they deem inappropriate, threatening, offensive, or harmful.
              </p>
              <p className="mt-4">
                Community leaders have the right and responsibility to remove, edit, or reject
                comments, commits, code, wiki edits, issues, and other contributions that are not
                aligned to this Code of Conduct, and will communicate reasons for moderation decisions
                when appropriate.
              </p>
            </div>
          </motion.section>
        </div>
      </section>

      {/* Enforcement Guidelines — Light section */}
      <section className="section-light section-spacing">
        <div className="max-w-[980px] mx-auto px-6">
          <motion.section {...fadeInUp}>
            <div className="flex items-start gap-4 mb-8">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2997FF]/10 flex items-center justify-center mt-0.5">
                <AlertOctagon className="w-5 h-5 text-[#2997FF]" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-[40px] sm:text-[48px] font-bold tracking-[-0.03em] leading-[1.1] text-[#1D1D1F]">
                  Enforcement Guidelines
                </h2>
              </div>
            </div>

            <div className="ml-14 space-y-5">
              {enforcementLevels.map((level, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.08 }}
                  className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 py-5 border-b border-[rgba(0,0,0,0.06)] last:border-b-0"
                >
                  <div className="flex items-center gap-3 sm:w-[200px] shrink-0">
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
                      className="font-semibold font-[family-name:var(--font-space-grotesk)] tracking-tight"
                      style={{ color: level.color }}
                    >
                      {level.level}
                    </h3>
                  </div>
                  <p className="text-[#6E6E73] text-[14px] sm:text-[15px] leading-[1.6] font-[family-name:var(--font-geist-sans)]">{level.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </section>

      {/* Scope — Dark section */}
      <section className="section-dark section-spacing">
        <div className="max-w-[980px] mx-auto px-6">
          <motion.section {...fadeInUp}>
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#30D158]/10 flex items-center justify-center mt-0.5">
                <Globe className="w-5 h-5 text-[#30D158]" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-[40px] sm:text-[48px] font-bold tracking-[-0.03em] leading-[1.1] text-[#F5F5F7]">
                  Scope
                </h2>
              </div>
            </div>
            <div className="ml-14 text-[#86868B] leading-[1.6] text-[17px] font-[family-name:var(--font-geist-sans)]">
              <p>
                This Code of Conduct applies within all community spaces, and also applies when an
                individual is officially representing the community in public spaces. Examples of
                representing our community include using an official e-mail address, posting via an
                official social media account, or acting as an appointed representative at an online or
                offline event.
              </p>
            </div>
          </motion.section>
        </div>
      </section>

      {/* Enforcement & Contact + Attribution — Light section */}
      <section className="section-light section-spacing">
        <div className="max-w-[980px] mx-auto px-6 space-y-16">
          <motion.section {...fadeInUp}>
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2997FF]/10 flex items-center justify-center mt-0.5">
                <Mail className="w-5 h-5 text-[#2997FF]" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-[40px] sm:text-[48px] font-bold tracking-[-0.03em] leading-[1.1] text-[#1D1D1F]">
                  Enforcement
                </h2>
              </div>
            </div>
            <div className="ml-14 text-[#6E6E73] leading-[1.6] text-[17px] font-[family-name:var(--font-geist-sans)]">
              <p>
                Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to
                the community leaders responsible for enforcement at:{' '}
                <a
                  href="mailto:conduct@omnia.protocol"
                  className="text-[#2997FF] hover:underline font-medium"
                >
                  conduct@omnia.protocol
                </a>
                . All complaints will be reviewed and investigated promptly and fairly.
              </p>
              <p className="mt-4">
                All community leaders are obligated to respect the privacy and security of the reporter
                of any incident.
              </p>
            </div>
          </motion.section>

          <motion.section {...fadeInUp}>
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#30D158]/10 flex items-center justify-center mt-0.5">
                <BookOpen className="w-5 h-5 text-[#30D158]" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-[40px] sm:text-[48px] font-bold tracking-[-0.03em] leading-[1.1] text-[#1D1D1F]">
                  Attribution
                </h2>
              </div>
            </div>
            <div className="ml-14 text-[#6E6E73] leading-[1.6] text-[17px] font-[family-name:var(--font-geist-sans)]">
              <p>
                This Code of Conduct is adapted from the{' '}
                <span className="text-[#2997FF] font-medium">Contributor Covenant</span>, version 2.1,
                available at{' '}
                <a
                  href="https://www.contributor-covenant.org/version/2/1/code_of_conduct.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2997FF] hover:underline"
                >
                  contributor-covenant.org
                </a>
                .
              </p>
              <p className="mt-4">
                Community Impact Guidelines were inspired by{' '}
                <a
                  href="https://github.com/mozilla/diversity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2997FF] hover:underline"
                >
                  Mozilla&apos;s code of conduct enforcement ladder
                </a>
                .
              </p>
            </div>
          </motion.section>
        </div>
      </section>

      <Footer />
    </div>
  )
}
