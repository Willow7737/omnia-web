'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import {
  CheckCircle,
  FileCode2,
  AlertTriangle,
  Ban,
  Bug,
  ShieldAlert,
  Scale,
  Users,
  ShieldX,
  PenLine,
  Mail,
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' } as const,
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

const sections = [
  {
    icon: CheckCircle,
    number: '1',
    title: 'Acceptance of Terms',
    content: (
      <p>
        By accessing or using the Omnia Protocol website and associated resources, you agree to be
        bound by these Terms of Use. If you do not agree, please do not use the website.
      </p>
    ),
  },
  {
    icon: FileCode2,
    number: '2',
    title: 'Nature of the Protocol',
    content: (
      <p>
        Omnia Protocol is open-source software released under the{' '}
        <span className="text-omnia-accent font-medium">CC0 Public Domain</span> dedication. No entity
        owns the protocol. It is provided &quot;as is&quot; without warranty of any kind, express or
        implied.
      </p>
    ),
  },
  {
    icon: AlertTriangle,
    number: '3',
    title: 'No Financial Advice',
    content: (
      <p>
        Nothing on this website constitutes financial, investment, legal, or tax advice. The Omnia
        Protocol is a{' '}
        <span className="text-omnia-accent font-medium">technology infrastructure project</span>. Any
        references to economic mechanisms (UBC, governance, etc.) describe protocol functionality,
        not investment opportunities.
      </p>
    ),
  },
  {
    icon: Ban,
    number: '4',
    title: 'No Guarantee of Returns',
    content: (
      <p>
        There is <span className="text-omnia-text font-medium">no token sale, no ICO, and no promise of returns</span>.
        The Universal Basic Compute allocation is a protocol mechanism, not a financial instrument.
        Do not participate in the protocol expecting financial returns.
      </p>
    ),
  },
  {
    icon: Bug,
    number: '5',
    title: 'Software Risks',
    content: (
      <p>
        The Omnia Protocol software is under active development. Despite extensive testing (1,382+
        tests), software may contain bugs, vulnerabilities, or unintended behaviors. You use the
        software <span className="text-omnia-accent font-medium">at your own risk</span>.
      </p>
    ),
  },
  {
    icon: ShieldAlert,
    number: '6',
    title: 'Security',
    content: (
      <div className="space-y-3">
        <p>
          While we maintain a bug bounty program and follow security best practices, no system is
          perfectly secure. You are responsible for securing your own keys and credentials.
        </p>
        <p>
          Report vulnerabilities to:{' '}
          <a
            href="mailto:security@omnia-protocol.org"
            className="text-omnia-accent hover:underline"
          >
            security@omnia-protocol.org
          </a>
        </p>
      </div>
    ),
  },
  {
    icon: Scale,
    number: '7',
    title: 'Intellectual Property',
    content: (
      <div className="space-y-3">
        <p>
          All Omnia Protocol source code is released under{' '}
          <span className="text-omnia-accent font-medium">CC0 Public Domain</span>. Website content is
          provided for informational purposes.
        </p>
        <p>
          The Omnia name and branding may have trademark considerations — contact{' '}
          <a href="mailto:conduct@omnia.protocol" className="text-omnia-accent hover:underline">
            conduct@omnia.protocol
          </a>{' '}
          for clarification.
        </p>
      </div>
    ),
  },
  {
    icon: Users,
    number: '8',
    title: 'Community Standards',
    content: (
      <p>
        All community participants must adhere to our{' '}
        <a href="/conduct" className="text-omnia-accent hover:underline">
          Code of Conduct
        </a>
        . Violations may result in removal from community spaces.
      </p>
    ),
  },
  {
    icon: ShieldX,
    number: '9',
    title: 'Limitation of Liability',
    content: (
      <p>
        To the fullest extent permitted by law, the Omnia Protocol contributors shall not be liable
        for any direct, indirect, incidental, special, consequential, or punitive damages arising
        from your use of or inability to use the protocol or website.
      </p>
    ),
  },
  {
    icon: PenLine,
    number: '10',
    title: 'Modifications',
    content: (
      <p>
        We reserve the right to modify these terms. Continued use after modifications constitutes
        acceptance.
      </p>
    ),
  },
  {
    icon: Mail,
    number: '11',
    title: 'Contact',
    content: (
      <p>
        For questions about these terms:{' '}
        <a href="mailto:conduct@omnia.protocol" className="text-omnia-accent hover:underline">
          conduct@omnia.protocol
        </a>
      </p>
    ),
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-omnia-base flex flex-col">
      <PageHeader
        title="Terms of Use"
        description="The rules and disclaimers governing your use of the Omnia Protocol website and software."
        breadcrumbs={[
          { label: 'Legal' },
          { label: 'Terms of Use' },
        ]}
      />

      <section className="max-w-[980px] mx-auto px-6 py-16 sm:py-24">
        {/* Last updated */}
        <motion.div
          {...fadeInUp}
          className="mb-12 flex items-center gap-3 text-[14px] text-omnia-text-secondary"
        >
          <div className="w-2 h-2 rounded-full bg-omnia-sage animate-pulse-sage" />
          <span className="font-[family-name:var(--font-space-grotesk)]">
            Last Updated: June 2026
          </span>
        </motion.div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, i) => {
            const Icon = section.icon
            return (
              <motion.section
                key={i}
                {...fadeInUp}
                transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.05 }}
                className="scroll-mt-20"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#2997FF]/10 flex items-center justify-center mt-0.5">
                    <Icon className="w-5 h-5 text-omnia-accent" />
                  </div>
                  <div>
                    <span
                      className="text-[12px] text-omnia-sage tracking-wider uppercase mb-1 block font-[family-name:var(--font-jetbrains-mono)]"
                    >
                      Section {section.number}
                    </span>
                    <h2 className="text-[28px] sm:text-[32px] font-bold text-omnia-text tracking-tight font-[family-name:var(--font-space-grotesk)]">
                      {section.title}
                    </h2>
                  </div>
                </div>
                <div className="ml-14 text-omnia-text-secondary leading-[1.6] text-[15px] font-[family-name:var(--font-geist-sans)]">
                  {section.content}
                </div>
              </motion.section>
            )
          })}
        </div>
      </section>

      <Footer />
    </div>
  )
}
