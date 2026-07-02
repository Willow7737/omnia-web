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
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' } as const,
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
}

const sections = [
  {
    icon: CheckCircle,
    number: '1',
    title: 'Acceptance of Terms',
    isDark: true,
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
    isDark: false,
    content: (
      <p>
        Omnia Protocol is open-source software released under the{' '}
        <span className="text-primary font-medium">CC0 Public Domain</span> dedication. No entity
        owns the protocol. It is provided &quot;as is&quot; without warranty of any kind, express or
        implied.
      </p>
    ),
  },
  {
    icon: AlertTriangle,
    number: '3',
    title: 'No Financial Advice',
    isDark: true,
    content: (
      <p>
        Nothing on this website constitutes financial, investment, legal, or tax advice. The Omnia
        Protocol is a{' '}
        <span className="text-primary font-medium">technology infrastructure project</span>. Any
        references to economic mechanisms (UBC, governance, etc.) describe protocol functionality,
        not investment opportunities.
      </p>
    ),
  },
  {
    icon: Ban,
    number: '4',
    title: 'No Guarantee of Returns',
    isDark: false,
    content: (
      <p>
        There is <span className="text-foreground font-medium">no token sale, no ICO, and no promise of returns</span>.
        The Universal Basic Compute allocation is a protocol mechanism, not a financial instrument.
        Do not participate in the protocol expecting financial returns.
      </p>
    ),
  },
  {
    icon: Bug,
    number: '5',
    title: 'Software Risks',
    isDark: true,
    content: (
      <p>
        The Omnia Protocol software is under active development. Despite extensive testing (1,500+
        tests), software may contain bugs, vulnerabilities, or unintended behaviors. You use the
        software <span className="text-primary font-medium">at your own risk</span>.
      </p>
    ),
  },
  {
    icon: ShieldAlert,
    number: '6',
    title: 'Security',
    isDark: false,
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
            className="text-primary hover:underline"
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
    isDark: true,
    content: (
      <div className="space-y-3">
        <p>
          All Omnia Protocol source code is released under{' '}
          <span className="text-primary font-medium">CC0 Public Domain</span>. Website content is
          provided for informational purposes.
        </p>
        <p>
          The Omnia name and branding may have trademark considerations — contact{' '}
          <a href="https://github.com/Willow7737/omnia-protocol/security/advisories/new" className="text-primary hover:underline">
            GitHub Security Advisory
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
    isDark: false,
    content: (
      <p>
        All community participants must adhere to our{' '}
        <a href="/conduct" className="text-primary hover:underline">
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
    isDark: true,
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
    isDark: false,
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
    isDark: true,
    content: (
      <p>
        For questions about these terms:{' '}
        <a href="https://github.com/Willow7737/omnia-protocol/security/advisories/new" className="text-primary hover:underline">
          GitHub Security Advisory
        </a>
      </p>
    ),
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title="Terms of Use"
        description="The rules and disclaimers governing your use of the Omnia Protocol website and software."
        breadcrumbs={[
          { label: 'Legal' },
          { label: 'Terms of Use' },
        ]}
      />

      {/* Last updated */}
      <div className="section-paper py-6">
        <div className="max-w-[980px] mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="flex items-center gap-3 text-[14px] text-muted-foreground"
          >
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="font-sans">
              Last Updated: June 2026
            </span>
          </motion.div>
        </div>
      </div>

      {/* Sections with alternating backgrounds */}
      <div className="flex flex-col">
        {sections.map((section, i) => {
          const Icon = section.icon
          const isDark = section.isDark
          return (
            <motion.section
              key={i}
              {...fadeInUp}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.03 }}
              className={`${isDark ? 'section-paper' : 'section-white'} section-spacing scroll-mt-20`}
            >
              <div className="max-w-[980px] mx-auto px-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-[12px] text-success tracking-wider uppercase mb-1 block font-mono">
                      Section {section.number}
                    </span>
                    <h2 className={`font-sans text-[32px] sm:text-[40px] md:text-[48px] font-bold tracking-[-0.03em] leading-[1.1] ${isDark ? 'text-foreground' : 'text-foreground'}`}>
                      {section.title}
                    </h2>
                  </div>
                </div>
                <div className={`ml-14 leading-[1.6] text-[15px] sm:text-[17px] font-sans ${isDark ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                  {section.content}
                </div>
              </div>
            </motion.section>
          )
        })}
      </div>

      <Footer />
    </div>
  )
}
