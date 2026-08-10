'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Shield, Eye, Cookie, ExternalLink, Lock, UserCheck, RefreshCw, Mail } from 'lucide-react'

const fadeInUp = {
 initial: { opacity: 0, y: 24 },
 whileInView: { opacity: 1, y: 0 },
 viewport: { once: true, margin: '-50px' } as const,
 transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
}

const sections = [
 {
 icon: Eye,
 number: '1',
 title: 'Information We Collect',
 isDark: true,
 content: (
 <div className="space-y-4">
 <p>
 Omnia Protocol is a decentralized protocol. As such, the protocol itself does not collect
 personal information. However, this website may collect:
 </p>
 <ul className="space-y-3 ml-1">
 <li className="flex items-start gap-3">
 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
 <div>
 <span className="text-foreground font-medium">Usage Data:</span>{' '}
 Anonymous analytics about page visits, browser type, and device information
 </div>
 </li>
 <li className="flex items-start gap-3">
 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
 <div>
 <span className="text-foreground font-medium">Blockchain Data:</span>{' '}
 All transactions on the Omnia Protocol are public by design and recorded on the
 distributed ledger
 </div>
 </li>
 <li className="flex items-start gap-3">
 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
 <div>
 <span className="text-foreground font-medium">Voluntary Information:</span>{' '}
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
 isDark: false,
 content: (
 <ul className="space-y-3 ml-1">
 <li className="flex items-start gap-3">
 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-success mt-2.5" />
 To improve the website and documentation
 </li>
 <li className="flex items-start gap-3">
 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-success mt-2.5" />
 To respond to bug reports and security disclosures
 </li>
 <li className="flex items-start gap-3">
 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-success mt-2.5" />
 To facilitate community interactions
 </li>
 <li className="flex items-start gap-3">
 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-success mt-2.5" />
 We do <span className="text-foreground font-medium">not</span> sell, rent, or share
 personal information with third parties for marketing purposes
 </li>
 </ul>
 ),
 },
 {
 icon: Lock,
 number: '3',
 title: 'Blockchain Transparency',
 isDark: true,
 content: (
 <p>
 The Omnia Protocol is designed for transparency. All consensus events, governance actions,
 and state changes are recorded on the public ledger. This is a{' '}
 <span className="text-primary font-medium">fundamental property of the protocol</span>,
 not a privacy violation. Users should understand that on-chain actions are publicly visible.
 </p>
 ),
 },
 {
 icon: Cookie,
 number: '4',
 title: 'Cookies and Tracking',
 isDark: false,
 content: (
 <ul className="space-y-3 ml-1">
 <li className="flex items-start gap-3">
 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
 We use minimal, functional cookies for website operation
 </li>
 <li className="flex items-start gap-3">
 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
 We do <span className="text-foreground font-medium">not</span> use tracking cookies from
 third-party advertisers
 </li>
 <li className="flex items-start gap-3">
 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
 Analytics, if used, are anonymized and aggregated
 </li>
 </ul>
 ),
 },
 {
 icon: ExternalLink,
 number: '5',
 title: 'Third-Party Services',
 isDark: true,
 content: (
 <div className="space-y-3">
 <p>The website may link to:</p>
 <ul className="space-y-2 ml-1">
 <li className="flex items-start gap-3">
 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-success mt-2.5" />
 <div>
 <span className="text-foreground font-medium">GitHub</span> (repository hosting)
 </div>
 </li>
 <li className="flex items-start gap-3">
 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-success mt-2.5" />
 <div>
 <span className="text-foreground font-medium">Discord</span> (community chat)
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
 isDark: false,
 content: (
 <ul className="space-y-3 ml-1">
 <li className="flex items-start gap-3">
 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
 We follow industry-standard security practices
 </li>
 <li className="flex items-start gap-3">
 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
 Bug bounty program for vulnerability disclosure
 </li>
 <li className="flex items-start gap-3">
 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
 Security contact:{' '}
 <a
 href="mailto:security@omnia-protocol.org"
 className="text-primary hover:underline"
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
 isDark: true,
 content: (
 <ul className="space-y-3 ml-1">
 <li className="flex items-start gap-3">
 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-success mt-2.5" />
 Right to access any personal data we hold
 </li>
 <li className="flex items-start gap-3">
 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-success mt-2.5" />
 Right to request deletion of personal data
 </li>
 <li className="flex items-start gap-3">
 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-success mt-2.5" />
 Right to opt out of non-essential data collection
 </li>
 <li className="flex items-start gap-3">
 <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-success mt-2.5" />
 Contact:{' '}
 <a href="https://github.com/Willow7737/omnia-protocol/security/advisories/new" className="text-primary hover:underline">
 GitHub Security Advisory
 </a>
 </li>
 </ul>
 ),
 },
 {
 icon: RefreshCw,
 number: '8',
 title: 'Changes to This Policy',
 isDark: false,
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
 isDark: true,
 content: (
 <p>
 For privacy-related inquiries:{' '}
 <a href="https://github.com/Willow7737/omnia-protocol/security/advisories/new" className="text-primary hover:underline">
 GitHub Security Advisory
 </a>
 </p>
 ),
 },
]

export default function PrivacyPage() {
 return (
 <div className="min-h-screen flex flex-col">
 <PageHeader
 title="Privacy Policy"
 description="How the Omnia Protocol handles data and privacy in a decentralized ecosystem."
 breadcrumbs={[
 { label: 'Legal' },
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
 <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-0.5 ${isDark ? 'bg-primary/10' : 'bg-primary/10'}`}>
 <Icon className={`w-5 h-5 text-primary`} />
 </div>
 <div>
 <span className={`text-[13.1px] uppercase mb-1 block font-mono ${isDark ? 'text-success' : 'text-success'}`}>
 Section {section.number}
 </span>
 <h2 className={`font-display text-[30px] sm:text-[37.5px] md:text-[47.5px] font-bold leading-[1.1] ${isDark ? 'text-foreground' : 'text-foreground'}`}>
 {section.title}
 </h2>
 </div>
 </div>
 <div className={`ml-14 leading-[1.6] text-[15px] sm:text-[16.9px] font-sans ${isDark ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
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
