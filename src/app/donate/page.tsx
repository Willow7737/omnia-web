'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import {
 Heart,
 Compass,
 Hammer,
 Building2,
 ShieldCheck,
 GitBranch,
 Wallet,
 Vote,
 Mail,
 Eye,
 CheckCircle2,
 Globe,
 Lock,
 Users,
 Landmark,
 MessageSquare,
} from 'lucide-react'

const fadeInUp = {
 initial: { opacity: 0, y: 24 },
 whileInView: { opacity: 1, y: 0 },
 viewport: { once: true, margin: '-50px' },
 transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
}

const fundingAreas = [
 { icon: Hammer, label: 'Core protocol development', detail: 'Rust, cryptography, consensus' },
 { icon: ShieldCheck, label: 'Security audits and formal verification', detail: 'External audits, proof correctness' },
 { icon: Globe, label: 'Testnet infrastructure and monitoring', detail: 'Nodes, dashboards, observability' },
 { icon: MessageSquare, label: 'Documentation and developer experience', detail: 'Guides, API docs, SDKs' },
 { icon: Vote, label: 'Community operations and governance tooling', detail: 'Voting systems, coordination' },
]

const tiers = [
 { icon: Compass, title: 'Explorer', amount: '$10+', description: 'Helps fund testnet infrastructure and monitoring' },
 { icon: Hammer, title: 'Builder', amount: '$50+', description: 'Supports core protocol development and code review' },
 { icon: Building2, title: 'Architect', amount: '$200+', description: 'Contributes to security audits and formal verification' },
 { icon: ShieldCheck, title: 'Guardian', amount: '$1,000+', description: 'Enables major protocol milestones and external audits' },
]

const donationMethods = [
 { icon: GitBranch, title: 'GitHub Sponsors', description: 'Support ongoing development through GitHub', link: 'github.com/Willow7737', linkLabel: 'Sponsor on GitHub' },
 { icon: Wallet, title: 'Ethereum', description: 'Direct on-chain donation', link: '0x0000...0000', linkLabel: 'Copy Address', isAddress: true },
 { icon: Landmark, title: 'Gitcoin Grants', description: 'Community-driven quadratic funding', link: 'When available', linkLabel: 'Coming Soon', disabled: true },
 { icon: Mail, title: 'Direct Sponsorship', description: 'For custom arrangements', link: 'https://github.com/Willow7737/omnia-protocol/issues', linkLabel: 'Open a GitHub Issue' },
]

const transparencyPoints = [
 { icon: Eye, text: 'All funds are tracked publicly' },
 { icon: Lock, text: 'No hidden allocations' },
 { icon: Globe, text: 'CC0 means no entity can capture value' },
 { icon: Users, text: 'Community governance over fund allocation' },
]

export default function DonatePage() {
 return (
 <div className="min-h-screen flex flex-col">
 <PageHeader
 title="Support Omnia"
 description="Public infrastructure deserves public funding. No token sale, no VC round, no pre-mine — just people who believe that trustless systems should be a public good."
 breadcrumbs={[{ label: 'Donate' }]}
 />

 {/* Why Support Omnia? — Dark section */}
 <section className="section-paper section-spacing">
 <div className="max-w-[980px] mx-auto px-6">
 <motion.div {...fadeInUp}>
 <h2 className="font-display text-[37.5px] sm:text-[47.5px] md:text-[53px] font-bold leading-[1.1] text-foreground mb-4">Why Support Omnia?</h2>
 <div className="space-y-5 text-muted-foreground leading-[1.6] text-[16.9px] sm:text-[18.8px] max-w-[680px] mb-10 font-sans">
 <p>
 Omnia is a public-interest protocol released under <span className="text-foreground font-medium">CC0</span> — 
 no entity owns it. There is no token sale, no VC round, no pre-mine. Development is funded by 
 protocol grants, community contributions, and individual donations.
 </p>
 <p>
 Your support directly funds the work that makes trustless infrastructure possible:
 </p>
 </div>
 </motion.div>

 <div className="space-y-0">
 {fundingAreas.map((area, i) => {
 const Icon = area.icon
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-30px' }}
 transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as const }}
 className={`flex items-center gap-4 sm:gap-6 py-5 ${i < fundingAreas.length - 1 ? 'border-b border-border' : ''}`}
 >
 <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
 <Icon className="w-4.5 h-4.5 text-primary" />
 </div>
 <div>
 <p className="text-foreground text-[15px] sm:text-[16.9px] font-medium font-sans">{area.label}</p>
 <p className="text-muted-foreground text-[13.1px] mt-0.5 font-sans">{area.detail}</p>
 </div>
 </motion.div>
 )
 })}
 </div>
 </div>
 </section>

 {/* Tier Cards — Light section */}
 <section className="section-white section-spacing">
 <div className="max-w-[980px] mx-auto px-6">
 <motion.div {...fadeInUp}>
 <h2 className="font-display text-[37.5px] sm:text-[47.5px] md:text-[53px] font-bold leading-[1.1] text-foreground mb-4">How Your Contribution Helps</h2>
 <p className="text-muted-foreground leading-[1.6] text-[16.9px] sm:text-[18.8px] max-w-[600px] mb-12 font-sans">
 Every contribution matters. Here is what your support enables at each level.
 </p>
 </motion.div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
 {tiers.map((tier, i) => {
 const Icon = tier.icon
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-30px' }}
 transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as const }}
 className="bg-card p-6 sm:p-8"
 >
 <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
 <Icon className="w-5 h-5 text-primary" />
 </div>
 <h3 className="text-foreground font-bold text-[16.9px] mb-1 font-sans">{tier.title}</h3>
 <p className="font-mono font-bold text-[20.6px] text-primary mb-3">{tier.amount}</p>
 <p className="text-muted-foreground text-[13.1px] leading-[1.5] font-sans">{tier.description}</p>
 </motion.div>
 )
 })}
 </div>
 </div>
 </section>

 {/* Ways to Donate — Dark section */}
 <section className="section-paper section-spacing">
 <div className="max-w-[980px] mx-auto px-6">
 <motion.div {...fadeInUp}>
 <h2 className="font-display text-[37.5px] sm:text-[47.5px] md:text-[53px] font-bold leading-[1.1] text-foreground mb-4">Ways to Donate</h2>
 <p className="text-muted-foreground leading-[1.6] text-[16.9px] sm:text-[18.8px] max-w-[600px] mb-12 font-sans">
 Choose the method that works best for you. Every contribution goes directly to protocol development.
 </p>
 </motion.div>

 <div className="space-y-0">
 {donationMethods.map((method, i) => {
 const Icon = method.icon
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-30px' }}
 transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as const }}
 className={`group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-6 ${i < donationMethods.length - 1 ? 'border-b border-border' : ''} ${method.disabled ? 'opacity-50' : ''}`}
 >
 <div className="flex items-center gap-3 sm:w-[240px] shrink-0">
 <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
 <Icon className="w-4.5 h-4.5 text-primary" />
 </div>
 <h3 className="text-foreground font-semibold text-[15px] sm:text-[16.9px] font-sans">{method.title}</h3>
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-muted-foreground text-[15px] font-sans">{method.description}</p>
 </div>
 <div className="shrink-0">
 {method.isAddress ? (
 <code className="text-primary text-[13.1px] font-mono bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">
 {method.link}
 </code>
 ) : (
 <span className={`text-[13.1px] font-medium font-sans ${method.disabled ? 'text-muted-foreground/70' : 'text-primary'}`}>
 {method.linkLabel}
 </span>
 )}
 </div>
 </motion.div>
 )
 })}
 </div>
 </div>
 </section>

 {/* Transparency + Corporate Sponsorship — Light section */}
 <section className="section-white section-spacing">
 <div className="max-w-[980px] mx-auto px-6 space-y-16">
 <div>
 <motion.div {...fadeInUp}>
 <h2 className="font-display text-[37.5px] sm:text-[47.5px] md:text-[53px] font-bold leading-[1.1] text-foreground mb-4">Transparency</h2>
 <p className="text-muted-foreground leading-[1.6] text-[16.9px] sm:text-[18.8px] max-w-[600px] mb-10 font-sans">
 We hold ourselves to the same standard we hold the protocol. Every donation, every allocation, every decision — visible by default.
 </p>
 </motion.div>

 <div className="space-y-0">
 {transparencyPoints.map((point, i) => {
 const Icon = point.icon
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-30px' }}
 transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as const }}
 className={`flex items-center gap-4 py-4 ${i < transparencyPoints.length - 1 ? 'border-b border-border' : ''}`}
 >
 <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
 <Icon className="w-4 h-4 text-primary" />
 </div>
 <p className="text-foreground text-[15px] sm:text-[16.9px] font-medium font-sans">
 {point.text}
 </p>
 </motion.div>
 )
 })}
 </div>
 </div>

 <div>
 <motion.div {...fadeInUp}>
 <h2 className="font-display text-[37.5px] sm:text-[47.5px] md:text-[53px] font-bold leading-[1.1] text-foreground mb-4">Corporate Sponsorship</h2>
 <p className="text-muted-foreground leading-[1.6] text-[16.9px] sm:text-[18.8px] max-w-[600px] mb-10 font-sans">
 For organizations that want to support public infrastructure. This is not a sponsorship deal — it is an investment in the commons.
 </p>
 </motion.div>

 <motion.div {...fadeInUp}>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
 <div>
 <h3 className="text-foreground font-semibold text-[15px] sm:text-[16.9px] mb-4 font-sans">Benefits</h3>
 <ul className="space-y-3">
 {[
 'Logo placement on the Omnia website',
 'Early access to new features and releases',
 'Dedicated support channel',
 ].map((benefit, i) => (
 <li key={i} className="flex items-center gap-3">
 <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
 <span className="text-muted-foreground text-[15px] sm:text-[15px] font-sans">{benefit}</span>
 </li>
 ))}
 </ul>
 </div>
 <div>
 <h3 className="text-foreground font-semibold text-[15px] sm:text-[16.9px] mb-4 font-sans">Get in Touch</h3>
 <p className="text-muted-foreground text-[15px] sm:text-[15px] leading-[1.6] mb-4 font-sans">
 If your organization believes in public infrastructure, we would like to hear from you. No strings attached, no governance capture, no special access to protocol decisions.
 </p>
 <a
 href="https://github.com/Willow7737/omnia-protocol/issues"
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
 >
 <Mail className="w-4 h-4" />
 <span className="font-mono text-[13.1px]">github.com/Willow7737/omnia-protocol/issues</span>
 </a>
 </div>
 </div>
 </motion.div>
 </div>
 </div>
 </section>

 <Footer />

 <ScrollToTop />
 </div>
 )
}
