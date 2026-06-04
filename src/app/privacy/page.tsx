'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Shield, Eye, Cookie, ExternalLink, Lock, UserCheck, RefreshCw, Mail } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' } as const,
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

const sections = [
  {
    icon: Eye,
    number: '1',
    title: 'Information We Collect',
    content: (
      <div className="space-y-4">
        <p>
          Omnia Protocol is a decentralized protocol. As such, the protocol itself does not collect
          personal information. However, this website may collect:
        </p>
        <ul className="space-y-3 ml-1">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#D4A574] mt-2.5" />
            <div>
              <span className="text-[#F5F0EB] font-medium">Usage Data:</span>{' '}
              Anonymous analytics about page visits, browser type, and device information
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#D4A574] mt-2.5" />
            <div>
              <span className="text-[#F5F0EB] font-medium">Blockchain Data:</span>{' '}
              All transactions on the Omnia Protocol are public by design and recorded on the
              distributed ledger
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#D4A574] mt-2.5" />
            <div>
              <span className="text-[#F5F0EB] font-medium">Voluntary Information:</span>{' '}
              Information you provide when joining community channels (Discord, GitHub), reporting
              bugs, or making donations
            </div>
          </li>
        </ul>
      </div>
    ),
  },
  {
    icon: Shield,
    number: '2',
    title: 'How We Use Information',
    content: (
      <ul className="space-y-3 ml-1">
        <li className="flex items-start gap-3">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#8C9E8E] mt-2.5" />
          To improve the website and documentation
        </li>
        <li className="flex items-start gap-3">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#8C9E8E] mt-2.5" />
          To respond to bug reports and security disclosures
        </li>
        <li className="flex items-start gap-3">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#8C9E8E] mt-2.5" />
          To facilitate community interactions
        </li>
        <li className="flex items-start gap-3">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#8C9E8E] mt-2.5" />
          We do <span className="text-[#F5F0EB] font-medium">not</span> sell, rent, or share
          personal information with third parties for marketing purposes
        </li>
      </ul>
    ),
  },
  {
    icon: Lock,
    number: '3',
    title: 'Blockchain Transparency',
    content: (
      <p>
        The Omnia Protocol is designed for transparency. All consensus events, governance actions,
        and state changes are recorded on the public ledger. This is a{' '}
        <span className="text-[#D4A574] font-medium">fundamental property of the protocol</span>,
        not a privacy violation. Users should understand that on-chain actions are publicly visible.
      </p>
    ),
  },
  {
    icon: Cookie,
    number: '4',
    title: 'Cookies and Tracking',
    content: (
      <ul className="space-y-3 ml-1">
        <li className="flex items-start gap-3">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#D4A574] mt-2.5" />
          We use minimal, functional cookies for website operation
        </li>
        <li className="flex items-start gap-3">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#D4A574] mt-2.5" />
          We do <span className="text-[#F5F0EB] font-medium">not</span> use tracking cookies from
          third-party advertisers
        </li>
        <li className="flex items-start gap-3">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#D4A574] mt-2.5" />
          Analytics, if used, are anonymized and aggregated
        </li>
      </ul>
    ),
  },
  {
    icon: ExternalLink,
    number: '5',
    title: 'Third-Party Services',
    content: (
      <div className="space-y-3">
        <p>The website may link to:</p>
        <ul className="space-y-2 ml-1">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#8C9E8E] mt-2.5" />
            <div>
              <span className="text-[#F5F0EB] font-medium">GitHub</span> (repository hosting)
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#8C9E8E] mt-2.5" />
            <div>
              <span className="text-[#F5F0EB] font-medium">Discord</span> (community chat)
            </div>
          </li>
        </ul>
        <p>These services have their own privacy policies.</p>
      </div>
    ),
  },
  {
    icon: Shield,
    number: '6',
    title: 'Data Security',
    content: (
      <ul className="space-y-3 ml-1">
        <li className="flex items-start gap-3">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#D4A574] mt-2.5" />
          We follow industry-standard security practices
        </li>
        <li className="flex items-start gap-3">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#D4A574] mt-2.5" />
          Bug bounty program for vulnerability disclosure
        </li>
        <li className="flex items-start gap-3">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#D4A574] mt-2.5" />
          Security contact:{' '}
          <a
            href="mailto:security@omnia-protocol.org"
            className="text-[#D4A574] hover:underline"
          >
            security@omnia-protocol.org
          </a>
        </li>
      </ul>
    ),
  },
  {
    icon: UserCheck,
    number: '7',
    title: 'Your Rights',
    content: (
      <ul className="space-y-3 ml-1">
        <li className="flex items-start gap-3">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#8C9E8E] mt-2.5" />
          Right to access any personal data we hold
        </li>
        <li className="flex items-start gap-3">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#8C9E8E] mt-2.5" />
          Right to request deletion of personal data
        </li>
        <li className="flex items-start gap-3">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#8C9E8E] mt-2.5" />
          Right to opt out of non-essential data collection
        </li>
        <li className="flex items-start gap-3">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#8C9E8E] mt-2.5" />
          Contact:{' '}
          <a href="mailto:conduct@omnia.protocol" className="text-[#D4A574] hover:underline">
            conduct@omnia.protocol
          </a>
        </li>
      </ul>
    ),
  },
  {
    icon: RefreshCw,
    number: '8',
    title: 'Changes to This Policy',
    content: (
      <p>
        We may update this policy periodically. Changes will be posted on this page with an updated
        revision date.
      </p>
    ),
  },
  {
    icon: Mail,
    number: '9',
    title: 'Contact',
    content: (
      <p>
        For privacy-related inquiries:{' '}
        <a href="mailto:conduct@omnia.protocol" className="text-[#D4A574] hover:underline">
          conduct@omnia.protocol
        </a>
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <PageHeader
        title="Privacy Policy"
        description="How the Omnia Protocol handles data and privacy in a decentralized ecosystem."
        breadcrumbs={[
          { label: 'Legal' },
          { label: 'Privacy Policy' },
        ]}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Last updated */}
        <motion.div
          {...fadeInUp}
          className="mb-12 flex items-center gap-3 text-sm text-[#A39B92]"
        >
          <div className="w-2 h-2 rounded-full bg-[#8C9E8E] animate-pulse-sage" />
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
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#D4A574]/10 flex items-center justify-center mt-0.5">
                    <Icon className="w-5 h-5 text-[#D4A574]" />
                  </div>
                  <div>
                    <span
                      className="text-xs font-mono text-[#8C9E8E] tracking-wider uppercase mb-1 block"
                      style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                    >
                      Section {section.number}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#F5F0EB] font-[family-name:var(--font-space-grotesk)]">
                      {section.title}
                    </h2>
                  </div>
                </div>
                <div className="ml-14 text-[#A39B92] leading-relaxed text-base">
                  {section.content}
                </div>
              </motion.section>
            )
          })}
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-16" />
    </div>
  )
}
