'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import {
 Smartphone,
 KeyRound,
 Server,
 UserCog,
 Camera,
 Lock,
 ShieldCheck,
 Trash2,
 Baby,
 RefreshCw,
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
 icon: Smartphone,
 number: '1',
 title: 'The Short Version',
 isDark: true,
 content: (
 <ul className="space-y-3 ml-1">
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 <div>
 <span className="text-foreground font-medium">Your keys stay on your device.</span>{' '}
 The app generates an Ed25519 keypair and recovery phrase on your
 phone and stores them in the operating system&apos;s hardware-backed
 secure store (Android Keystore / iOS Keychain). They are{' '}
 <span className="text-foreground font-medium">never transmitted</span> to
 Omnia or anyone else.
 </div>
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 <div>
 We do <span className="text-foreground font-medium">not</span> sell your
 data, and the app uses no advertising or third-party tracking SDKs.
 </div>
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 Some features are optional and involve a server; those are described
 below.
 </li>
 </ul>
 ),
 },
 {
 icon: KeyRound,
 number: '2',
 title: 'What Stays Only on Your Device',
 isDark: false,
 content: (
 <ul className="space-y-3 ml-1">
 <li className="flex items-start gap-3">
 {bullet('bg-success')}
 Your wallet private key, seed, and recovery phrase (secure storage).
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-success')}
 Your app settings, including the node URL and the app-lock preference.
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-success')}
 Locally blocked accounts — a moderation list kept on-device that is
 never sent to any server.
 </li>
 </ul>
 ),
 },
 {
 icon: Server,
 number: '3',
 title: 'Data Sent to an Omnia Node',
 isDark: true,
 content: (
 <div className="space-y-4">
 <p>
 To show your balance and submit transactions, the app talks to an
 Omnia Protocol node (the default node, or one you configure in
 Settings) over HTTPS. The node processes:
 </p>
 <ul className="space-y-3 ml-1">
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 Your <span className="text-foreground font-medium">DID</span> — a public
 identifier derived from your public key.
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 Balance and transaction-history queries.
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 <span className="text-foreground font-medium">Signed spend authorizations</span>{' '}
 you create when sending UBC.
 </li>
 </ul>
 <p>
 This is pseudonymous protocol data.{' '}
 <span className="text-foreground font-medium">
 UBC is a soulbound utility credit, not money
 </span>
 , and the app does not collect payment-card or bank information.
 </p>
 </div>
 ),
 },
 {
 icon: UserCog,
 number: '4',
 title: 'Optional Account Sign-In & Social Features',
 isDark: false,
 content: (
 <div className="space-y-4">
 <p>
 The app offers an <span className="text-foreground font-medium">optional</span>{' '}
 sign-in (via Google, GitHub, or email through our authentication
 provider, Supabase) and optional social/news features. If you choose
 to use them, we process:
 </p>
 <ul className="space-y-3 ml-1">
 <li className="flex items-start gap-3">
 {bullet('bg-success')}
 An <span className="text-foreground font-medium">account identifier</span>{' '}
 such as your email address (for authentication).
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-success')}
 A <span className="text-foreground font-medium">username</span> and an
 optional <span className="text-foreground font-medium">profile photo</span>.
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-success')}
 Any <span className="text-foreground font-medium">posts, replies, or images</span>{' '}
 you choose to publish, and any moderation reports you file.
 </li>
 </ul>
 <p>
 If you only use the self-custodial wallet and do not sign in or post,
 none of this is collected.
 </p>
 </div>
 ),
 },
 {
 icon: Camera,
 number: '5',
 title: 'Device Permissions',
 isDark: true,
 content: (
 <ul className="space-y-3 ml-1">
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 <div>
 <span className="text-foreground font-medium">Internet</span> — to reach
 the Omnia node and (if used) the sign-in/social backend.
 </div>
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 <div>
 <span className="text-foreground font-medium">Camera</span> — only when you
 scan a recipient DID QR code. No images are stored or uploaded by
 the scanner.
 </div>
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 <div>
 <span className="text-foreground font-medium">Biometrics</span> — to unlock
 the app and confirm signing locally. Biometric data never leaves
 your device and is handled entirely by the OS.
 </div>
 </li>
 </ul>
 ),
 },
 {
 icon: Lock,
 number: '6',
 title: 'Security',
 isDark: false,
 content: (
 <ul className="space-y-3 ml-1">
 <li className="flex items-start gap-3">
 {bullet('bg-success')}
 Traffic to servers is encrypted in transit (HTTPS/TLS).
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-success')}
 Private keys are held in the platform secure store and never leave the
 device.
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-success')}
 Optional app lock gates access to the wallet behind device biometrics.
 </li>
 </ul>
 ),
 },
 {
 icon: ShieldCheck,
 number: '7',
 title: 'Content Moderation',
 isDark: true,
 content: (
 <p>
 The optional social features include reporting and blocking so users can
 flag or hide objectionable content. Reports are reviewed by the
 moderation team, and content that breaks the{' '}
 <span className="text-foreground font-medium">community guidelines</span> is
 removed. Blocking is handled entirely on your device and is never sent
 to a server.
 </p>
 ),
 },
 {
 icon: Trash2,
 number: '8',
 title: 'Your Choices & Deletion',
 isDark: false,
 content: (
 <ul className="space-y-3 ml-1">
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 Wipe the on-device wallet any time from{' '}
 <span className="text-foreground font-medium">Settings</span> (irreversible
 without your recovery phrase — back it up).
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 To delete an optional account and any content you posted, contact us
 at the address below.
 </li>
 </ul>
 ),
 },
 {
 icon: Baby,
 number: '9',
 title: 'Children',
 isDark: true,
 content: (
 <p>
 The app is not directed to children and is intended for users 18 and
 over.
 </p>
 ),
 },
 {
 icon: RefreshCw,
 number: '10',
 title: 'Changes to This Policy',
 isDark: false,
 content: (
 <p>
 We may update this policy periodically. The &ldquo;Last Updated&rdquo;
 date reflects the current version, and material changes will be surfaced
 in the app or its store listing.
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
 For privacy-related inquiries, email{' '}
 <a href="mailto:privacy@omnia-protocol.org" className="text-primary hover:underline">
 privacy@omnia-protocol.org
 </a>{' '}
 or open a{' '}
 <a
 href="https://github.com/Willow7737/omnia-protocol/security/advisories/new"
 className="text-primary hover:underline"
 >
 GitHub Security Advisory
 </a>
 .
 </p>
 ),
 },
]

export default function WalletPrivacyPage() {
 return (
 <div className="min-h-screen flex flex-col">
 <PageHeader
 title="Omnia Wallet Privacy Policy"
 description="How the Omnia Wallet mobile app handles your data. This policy covers the app specifically — the website has its own policy."
 breadcrumbs={[
 { label: 'Legal' },
 { label: 'Omnia Wallet' },
 { label: 'Privacy Policy' },
 ]}
 />

 {/* Last updated */}
 <div className="section-paper py-6">
 <div className="max-w-[980px] mx-auto px-6">
 <motion.div
 {...fadeInUp}
 className="flex items-center gap-3 text-[15px] text-muted-foreground"
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
 <span className="text-[13.1px] uppercase mb-1 block font-mono text-success">
 Section {section.number}
 </span>
 <h2 className="font-display text-[30px] sm:text-[37.5px] md:text-[47.5px] font-bold leading-[1.1] text-foreground">
 {section.title}
 </h2>
 </div>
 </div>
 <div className="ml-14 leading-[1.6] text-[15px] sm:text-[16.9px] font-sans text-muted-foreground">
 {section.content}
 </div>
 </div>
 </motion.section>
 )
 })}
 </div>

 <Footer />

 <ScrollToTop />
 </div>
 )
}
