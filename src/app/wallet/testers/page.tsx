'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import {
 Sparkles,
 KeyRound,
 Gauge,
 AlertTriangle,
 Zap,
 ClipboardCheck,
 Eye,
 MessageSquare,
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
 icon: Sparkles,
 number: '1',
 title: 'What Omnia Is, in 30 Seconds',
 isDark: true,
 content: (
 <div className="space-y-4">
 <p>
 Omnia is an open network — a shared, tamper-proof record that no
 company owns. This app is your way into it. It does two things.
 </p>
 <p>
 <span className="text-foreground font-medium">
 It gives you an identity that&apos;s genuinely yours
 </span>{' '}
 — held on your phone, not on anyone&apos;s server — and{' '}
 <span className="text-foreground font-medium">
 a monthly compute allowance called UBC
 </span>{' '}
 for actually using the network.
 </p>
 <p>
 There&apos;s no signup form, no password, and nothing for us to lose
 in a data breach — because we never have it.
 </p>
 </div>
 ),
 },
 {
 icon: KeyRound,
 number: '2',
 title: 'Your Identity Lives on Your Phone',
 isDark: false,
 content: (
 <div className="space-y-4">
 <p>
 The first time you open the app, your phone generates a private key
 and stores it in its secure hardware (the same vault that holds your
 fingerprint data). From that key you get a public ID — a{' '}
 <span className="font-mono text-[14px] text-foreground">
 did:omnia:04f5…
 </span>{' '}
 — which is yours to share.
 </p>
 <ul className="space-y-3 ml-1">
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 We never see your key. We can&apos;t freeze, reset, or hand over
 your identity, because we don&apos;t hold it.
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 The flip side is real:{' '}
 <span className="text-foreground font-medium">
 write down your recovery phrase.
 </span>{' '}
 If you lose your phone without it, nobody — including us — can get
 your identity back.
 </li>
 </ul>
 </div>
 ),
 },
 {
 icon: Gauge,
 number: '3',
 title: 'UBC: Your Compute Allowance',
 isDark: true,
 content: (
 <div className="space-y-4">
 <p>
 Every identity gets{' '}
 <span className="text-foreground font-medium">
 1,000 UBC (Universal Basic Compute)
 </span>{' '}
 per month, automatically. It&apos;s your budget for doing things on
 the network. Everyone gets the same amount — you don&apos;t earn it,
 mine it, or buy it.
 </p>
 </div>
 ),
 },
 {
 icon: AlertTriangle,
 number: '4',
 title: 'Important: UBC Is Not Money',
 isDark: false,
 content: (
 <div className="space-y-4">
 <p>
 This is the thing most worth understanding, so it&apos;s worth being
 blunt:
 </p>
 <ul className="space-y-3 ml-1">
 <li className="flex items-start gap-3">
 {bullet('bg-success')}
 You <span className="text-foreground font-medium">cannot buy</span>{' '}
 UBC. There is no price and no way to purchase it.
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-success')}
 You{' '}
 <span className="text-foreground font-medium">
 cannot sell or trade
 </span>{' '}
 it. There&apos;s no exchange, no market, no cashing out.
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-success')}
 It has{' '}
 <span className="text-foreground font-medium">no monetary value</span>.
 It is not an investment and never will be.
 </li>
 </ul>
 <p>
 Think of it like the monthly data allowance on a phone plan: useful
 for doing things, not something you&apos;d try to sell.
 </p>
 </div>
 ),
 },
 {
 icon: Zap,
 number: '5',
 title: 'Two Things That Look Like Bugs (But Aren\u2019t)',
 isDark: true,
 content: (
 <div className="space-y-5">
 <div>
 <p className="text-foreground font-medium mb-2">
 &ldquo;I sent UBC and the other person didn&apos;t receive it.&rdquo;
 </p>
 <p>
 Correct — that&apos;s the design. Sending UBC{' '}
 <span className="text-foreground font-medium">spends it</span> from
 your allowance, and the recipient&apos;s ID is recorded as a
 permanent, public note that you sent it to them. Their balance
 doesn&apos;t go up. It&apos;s a receipt, not a payment. (This is why
 UBC can never be hoarded or turned into wealth.)
 </p>
 </div>
 <div>
 <p className="text-foreground font-medium mb-2">
 &ldquo;What does &lsquo;Final &middot; Lane 0&rsquo; mean?&rdquo;
 </p>
 <p>
 It&apos;s telling you how settled your transaction is.{' '}
 <span className="text-foreground font-medium">Lane 0</span> is the
 fast confirmation — a group of network validators has cryptographically
 signed off within moments.{' '}
 <span className="text-foreground font-medium">Lane 1</span> is the
 slower, permanent settlement. Most apps hide this and just spin a
 loader; we show it, so you always know exactly where you stand.
 </p>
 </div>
 </div>
 ),
 },
 {
 icon: ClipboardCheck,
 number: '6',
 title: 'What We\u2019d Love You to Try',
 isDark: false,
 content: (
 <ul className="space-y-3 ml-1">
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 <div>
 <span className="text-foreground font-medium">Set up your wallet.</span>{' '}
 Was the recovery-phrase step clear — or did you tap past it? (Be
 honest, that&apos;s the useful answer.)
 </div>
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 <div>
 <span className="text-foreground font-medium">Send UBC to another tester.</span>{' '}
 Open <em>Receive</em> to show your QR, or scan theirs. You are the
 only people on this network right now, so use each other.
 </div>
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 <div>
 <span className="text-foreground font-medium">Open a transaction.</span>{' '}
 Tap any item in your history and read the detail screen. Did the
 burn explanation make sense, or did it feel alarming?
 </div>
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 <div>
 <span className="text-foreground font-medium">Post in News</span> and
 reply to someone. Then try the &ldquo;···&rdquo; menu on a reply →{' '}
 <em>Report</em> or <em>Block</em>.
 </div>
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 <div>
 <span className="text-foreground font-medium">Visit Settings → Safety</span>{' '}
 to read the community guidelines and manage blocked accounts.
 </div>
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 <div>
 <span className="text-foreground font-medium">Turn on the app lock</span>{' '}
 (Settings → App lock) and reopen the app.
 </div>
 </li>
 </ul>
 ),
 },
 {
 icon: Eye,
 number: '7',
 title: 'The Feedback That Helps Most',
 isDark: true,
 content: (
 <div className="space-y-4">
 <p>Bug reports are welcome, but these are more valuable:</p>
 <ul className="space-y-3 ml-1">
 <li className="flex items-start gap-3">
 {bullet('bg-success')}
 <span>
 <span className="text-foreground font-medium">
 Anything that made you nervous.
 </span>{' '}
 A screen that felt risky, a word you didn&apos;t trust, a moment
 you worried you&apos;d broken something. This is the single most
 useful thing you can tell us.
 </span>
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-success')}
 <span className="text-foreground font-medium">
 Anywhere you had to guess what a word meant.
 </span>
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-success')}
 <span>
 The moment you thought{' '}
 <em>&ldquo;wait, what just happened?&rdquo;</em>
 </span>
 </li>
 </ul>
 <p className="text-[14px]">
 You will not hurt our feelings. An early tester saying &ldquo;this
 screen confused me&rdquo; is worth more than a hundred downloads.
 </p>
 </div>
 ),
 },
 {
 icon: MessageSquare,
 number: '8',
 title: 'Heads-Up: This Is Early Access',
 isDark: false,
 content: (
 <div className="space-y-4">
 <ul className="space-y-3 ml-1">
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 The app runs against a{' '}
 <span className="text-foreground font-medium">test network</span>.
 Balances and history here are for testing and may be reset.
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 Nothing here has monetary value, so there is nothing to lose
 financially — but please still back up your recovery phrase, since
 it&apos;s good practice and the habit matters.
 </li>
 <li className="flex items-start gap-3">
 {bullet('bg-primary')}
 Expect rough edges. That&apos;s what you&apos;re here for, and we&apos;re
 grateful.
 </li>
 </ul>
 <p>
 Thank you for being one of the first twelve. Genuinely — early testers
 shape what this becomes.
 </p>
 </div>
 ),
 },
]

export default function WalletTestersPage() {
 return (
 <div className="min-h-screen flex flex-col">
 <PageHeader
 title="Welcome, Omnia Testers"
 description="Everything you need to know about the Omnia app — what it does, what to try, and what feedback helps most. No prior knowledge needed."
 breadcrumbs={[
 { label: 'Omnia Wallet' },
 { label: 'Testers' },
 ]}
 />

 <div className="section-paper py-6">
 <div className="max-w-[980px] mx-auto px-6">
 <motion.div
 {...fadeInUp}
 className="flex items-center gap-3 text-[14px] text-muted-foreground"
 >
 <div className="w-2 h-2 rounded-full bg-success" />
 <span className="font-sans">Early access &middot; July 2026</span>
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
 <span className="text-[12px] tracking-normal uppercase mb-1 block font-mono text-success">
 {section.number}
 </span>
 <h2 className="font-sans text-[28px] sm:text-[36px] md:text-[42px] font-bold tracking-normal leading-[1.1] text-foreground">
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

 <ScrollToTop />
 </div>
 )
}
