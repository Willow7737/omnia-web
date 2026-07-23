'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import {
  Smartphone,
  Mail,
  Trash2,
  Clock,
  ShieldCheck,
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
    icon: Smartphone,
    number: '1',
    title: 'Delete the On-Device Wallet',
    isDark: true,
    content: (
      <div className="space-y-4">
        <p>
          The Omnia Wallet is self-custodial — your keys, recovery phrase, and
          settings live only on your device, not on our servers. To erase them:
        </p>
        <ul className="space-y-3 ml-1">
          <li className="flex items-start gap-3">
            {bullet('bg-primary')}
            Open the app and go to{' '}
            <span className="text-foreground font-medium">
              Settings → Remove wallet from this device
            </span>{' '}
            (or uninstall the app).
          </li>
          <li className="flex items-start gap-3">
            {bullet('bg-primary')}
            This permanently deletes your private key, recovery phrase, contacts,
            and preferences from the device.
          </li>
        </ul>
        <p className="text-[14px]">
          This is irreversible without your recovery phrase — make sure it is
          backed up if you want to restore later.
        </p>
      </div>
    ),
  },
  {
    icon: Mail,
    number: '2',
    title: 'Delete an Optional Account & Your Content',
    isDark: false,
    content: (
      <div className="space-y-4">
        <p>
          If you used the <span className="text-foreground font-medium">optional</span>{' '}
          sign-in (Google, GitHub, or email) or posted in the social feed, you can
          request deletion of that account and its data. Email us from the address
          associated with your account:
        </p>
        <p>
          <a
            href="mailto:privacy@omnia-protocol.org?subject=Omnia%20Wallet%20account%20deletion"
            className="text-primary hover:underline font-medium"
          >
            privacy@omnia-protocol.org
          </a>
        </p>
        <p className="text-[14px]">
          Use the subject line &ldquo;Omnia Wallet account deletion&rdquo; so we
          can action it quickly. We may ask you to confirm ownership of the
          account before deleting.
        </p>
      </div>
    ),
  },
  {
    icon: Trash2,
    number: '3',
    title: 'What Gets Deleted',
    isDark: true,
    content: (
      <ul className="space-y-3 ml-1">
        <li className="flex items-start gap-3">
          {bullet('bg-success')}
          Your account identifier (email), username, and profile photo.
        </li>
        <li className="flex items-start gap-3">
          {bullet('bg-success')}
          Your posts, replies, and any images you uploaded.
        </li>
        <li className="flex items-start gap-3">
          {bullet('bg-success')}
          Moderation reports you filed that are tied to your account.
        </li>
      </ul>
    ),
  },
  {
    icon: ShieldCheck,
    number: '4',
    title: 'What Cannot Be Deleted',
    isDark: false,
    content: (
      <p>
        Your <span className="text-foreground font-medium">DID</span> and any UBC
        transfers are recorded on the Omnia network for provenance. Like any
        distributed ledger, on-chain records are public and cannot be edited or
        removed. Your DID is a pseudonymous identifier derived from a key on your
        device — it is not linked to your real-world identity unless you choose to
        share it.
      </p>
    ),
  },
  {
    icon: Clock,
    number: '5',
    title: 'Timeline',
    isDark: true,
    content: (
      <p>
        We action account-deletion requests within{' '}
        <span className="text-foreground font-medium">30 days</span>. On-device
        data is removed immediately when you wipe the wallet or uninstall the app.
      </p>
    ),
  },
]

export default function WalletDeleteAccountPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title="Delete Your Omnia Wallet Account"
        description="How to delete the on-device wallet and request deletion of any optional account data."
        breadcrumbs={[
          { label: 'Legal' },
          { label: 'Omnia Wallet' },
          { label: 'Delete Account' },
        ]}
      />

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
                      Step {section.number}
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
