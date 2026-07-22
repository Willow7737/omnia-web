'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import {
  CheckCircle,
  Wallet,
  KeyRound,
  Coins,
  MessageSquareWarning,
  Ban,
  AlertTriangle,
  ShieldX,
  Scale,
  PenLine,
  Mail,
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' } as const,
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
}

const bullet = (color: string) => (
  <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${color} mt-2.5`} />
)

const sections = [
  {
    icon: CheckCircle,
    number: '1',
    title: 'Acceptance of Terms',
    isDark: true,
    content: (
      <p>
        By downloading, installing, or using the Omnia Wallet mobile app
        (&ldquo;the app&rdquo;), you agree to be bound by these Terms of Use. If
        you do not agree, do not use the app. The app is intended for users 18
        and over.
      </p>
    ),
  },
  {
    icon: Wallet,
    number: '2',
    title: 'What the App Is',
    isDark: false,
    content: (
      <p>
        Omnia Wallet is a{' '}
        <span className="text-foreground font-medium">self-custodial</span> client for
        the Omnia Protocol. It lets you create an on-device identity, view your
        balance, send Universal Basic Credit (UBC), and use optional social
        features. The app is provided as free, open-source software.
      </p>
    ),
  },
  {
    icon: KeyRound,
    number: '3',
    title: 'Self-Custody & Your Responsibility',
    isDark: true,
    content: (
      <ul className="space-y-3 ml-1">
        <li className="flex items-start gap-3">
          {bullet('bg-primary')}
          <div>
            <span className="text-foreground font-medium">You alone hold your keys.</span>{' '}
            Your private key and recovery phrase are generated and stored on your
            device. We never receive, hold, or have any ability to recover them.
          </div>
        </li>
        <li className="flex items-start gap-3">
          {bullet('bg-primary')}
          <div>
            <span className="text-foreground font-medium">
              Back up your recovery phrase.
            </span>{' '}
            If you lose your device and your recovery phrase, your identity
            cannot be restored by anyone, including us.
          </div>
        </li>
        <li className="flex items-start gap-3">
          {bullet('bg-primary')}
          You are responsible for keeping your device, recovery phrase, and
          credentials secure.
        </li>
      </ul>
    ),
  },
  {
    icon: Coins,
    number: '4',
    title: 'UBC Is Not Money',
    isDark: false,
    content: (
      <p>
        Universal Basic Credit (UBC) is a{' '}
        <span className="text-foreground font-medium">soulbound utility credit</span>{' '}
        within the Omnia Protocol. It is not a currency, security, investment, or
        payment instrument, it is not purchasable with money, and it carries no
        monetary value. Sending UBC follows the protocol&apos;s soulbound
        semantics, which the app surfaces before you confirm a transaction.
      </p>
    ),
  },
  {
    icon: MessageSquareWarning,
    number: '5',
    title: 'User-Generated Content & Conduct',
    isDark: true,
    content: (
      <div className="space-y-4">
        <p>
          If you use the optional social features, you are responsible for the
          content you post. You agree not to post content that is unlawful,
          harassing, hateful, sexually explicit, violent, deceptive, or that
          infringes others&apos; rights, and not to spam, scam, or impersonate
          others.
        </p>
        <ul className="space-y-3 ml-1">
          <li className="flex items-start gap-3">
            {bullet('bg-success')}
            You can report or block other users from the content menu on any
            reply.
          </li>
          <li className="flex items-start gap-3">
            {bullet('bg-success')}
            We may remove content and suspend access for violations of the{' '}
            <span className="text-foreground font-medium">community guidelines</span>.
          </li>
          <li className="flex items-start gap-3">
            {bullet('bg-success')}
            You retain ownership of what you post but grant us a license to
            display and moderate it within the app.
          </li>
        </ul>
      </div>
    ),
  },
  {
    icon: Ban,
    number: '6',
    title: 'Prohibited Use',
    isDark: false,
    content: (
      <ul className="space-y-3 ml-1">
        <li className="flex items-start gap-3">
          {bullet('bg-primary')}
          Using the app for any unlawful purpose or in violation of any
          applicable law.
        </li>
        <li className="flex items-start gap-3">
          {bullet('bg-primary')}
          Attempting to attack, disrupt, or gain unauthorized access to the
          protocol, nodes, or other users.
        </li>
        <li className="flex items-start gap-3">
          {bullet('bg-primary')}
          Circumventing moderation, security, or rate-limiting controls.
        </li>
      </ul>
    ),
  },
  {
    icon: AlertTriangle,
    number: '7',
    title: 'No Warranty',
    isDark: true,
    content: (
      <p>
        The app is provided <span className="text-foreground font-medium">&ldquo;as
        is&rdquo;</span> and <span className="text-foreground font-medium">&ldquo;as
        available&rdquo;</span>, without warranties of any kind, express or
        implied. We do not warrant that the app will be uninterrupted,
        error-free, or secure, or that any node it connects to will remain
        available.
      </p>
    ),
  },
  {
    icon: ShieldX,
    number: '8',
    title: 'Limitation of Liability',
    isDark: false,
    content: (
      <p>
        To the fullest extent permitted by law, the Omnia Protocol project, its
        contributors, and maintainers shall not be liable for any indirect,
        incidental, or consequential damages, or for any loss of keys, data,
        access, or credits, arising from your use of the app.
      </p>
    ),
  },
  {
    icon: Scale,
    number: '9',
    title: 'Open Source',
    isDark: true,
    content: (
      <p>
        The app is open-source software distributed under its published license.
        Your use of the source code is governed by that license in addition to
        these Terms.
      </p>
    ),
  },
  {
    icon: PenLine,
    number: '10',
    title: 'Changes to These Terms',
    isDark: false,
    content: (
      <p>
        We may update these Terms periodically. The &ldquo;Last Updated&rdquo;
        date reflects the current version, and continued use of the app after a
        change constitutes acceptance of the updated Terms.
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
        Questions about these Terms? Email{' '}
        <a href="mailto:support@omnia-protocol.org" className="text-primary hover:underline">
          support@omnia-protocol.org
        </a>{' '}
        or open an issue on{' '}
        <a
          href="https://github.com/Willow7737/omnia-protocol"
          className="text-primary hover:underline"
        >
          GitHub
        </a>
        .
      </p>
    ),
  },
]

export default function WalletTermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title="Omnia Wallet Terms of Use"
        description="The terms that govern use of the Omnia Wallet mobile app, including self-custody, UBC, and user-generated content."
        breadcrumbs={[
          { label: 'Legal' },
          { label: 'Omnia Wallet' },
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
            <span className="font-sans">Last Updated: July 2026</span>
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
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-0.5 bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-[12px] tracking-wider uppercase mb-1 block font-mono text-success">
                      Section {section.number}
                    </span>
                    <h2 className="font-sans text-[32px] sm:text-[40px] md:text-[48px] font-bold tracking-[-0.03em] leading-[1.1] text-foreground">
                      {section.title}
                    </h2>
                  </div>
                </div>
                <div className="ml-14 leading-[1.6] text-[15px] sm:text-[17px] font-sans text-muted-foreground">
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
