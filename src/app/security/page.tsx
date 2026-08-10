'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import {
 Shield,
 Bug,
 AlertTriangle,
 CheckCircle2,
 Clock,
 Mail,
 Lock,
 FileCode2,
 Search,
 ShieldCheck,
 Fingerprint,
 Eye,
 DollarSign,
 ArrowRight,
 XCircle,
 ClipboardList,
 Server,
 Cpu,
 KeyRound,
} from 'lucide-react'

const fadeInUp = {
 initial: { opacity: 0, y: 24 },
 whileInView: { opacity: 1, y: 0 },
 viewport: { once: true, margin: '-50px' },
 transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
}

const rewardTiers = [
 {
 severity: 'Critical',
 color: 'text-red-400',
 bgColor: 'bg-red-400/10',
 icon: AlertTriangle,
 examples: 'Consensus break, key theft, fund loss, ZK proof forgery',
 reward: '$10,000 – $50,000',
 },
 {
 severity: 'High',
 color: 'text-orange-400',
 bgColor: 'bg-orange-400/10',
 icon: Shield,
 examples: 'State corruption (non-exploitable), signature bypass, DoS bypass',
 reward: '$5,000 – $10,000',
 },
 {
 severity: 'Medium',
 color: 'text-warning',
 bgColor: 'bg-warning/10',
 icon: Eye,
 examples: 'Information leak, degraded performance, nonce reuse',
 reward: '$1,000 – $5,000',
 },
 {
 severity: 'Low',
 color: 'text-success',
 bgColor: 'bg-success/10',
 icon: Bug,
 examples: 'Minor bugs, UX issues, doc errors with security implications',
 reward: '$100 – $1,000',
 },
]

const scopeItems = [
 { icon: FileCode2, label: 'All Rust code in omnia-protocol repository', detail: 'substrate/, zk/, binding/, shards/, economics/, node/, chaos-tests/' },
 { icon: FileCode2, label: 'Solidity contracts', detail: 'Smart contract code and deployment scripts' },
 { icon: Cpu, label: 'Cryptographic implementations', detail: 'VRF, Poseidon, Groth16, Dilithium, ML-KEM, BLS12-381' },
 { icon: Server, label: 'Consensus mechanism', detail: 'Causal graph, BFT finality, CRDT state convergence' },
 { icon: Lock, label: 'Network protocol', detail: 'libp2p transport, GossipSub, peer authentication' },
]

const outOfScopeItems = [
 'Third-party dependencies with known vulnerabilities',
 'Social engineering attacks',
 'Denial of service (unless bypass is demonstrated)',
 'Test-only code',
 'Physical access attacks',
]

const responseTimeline = [
 { phase: 'Acknowledgment', time: 'Within 24 hours', icon: Mail },
 { phase: 'Initial Assessment', time: 'Within 72 hours', icon: Search },
 { phase: 'Fix Development (Critical/High)', time: 'Within 5 business days', icon: FileCode2 },
]

const patchReleaseTimeline = [
 { severity: 'Critical', time: '7 days', color: 'text-red-400' },
 { severity: 'High', time: '14 days', color: 'text-orange-400' },
 { severity: 'Medium', time: '30 days', color: 'text-warning' },
 { severity: 'Low', time: 'Next release', color: 'text-success' },
]

const securityPractices = [
 { icon: ShieldCheck, title: 'Supply Chain Hardening', description: 'cargo-vet, cargo-deny, and SBOM generation for all dependencies. Every crate is audited before inclusion.' },
 { icon: Search, title: 'RUSTSEC Advisory Review', description: 'Continuous monitoring of Rust Security Advisory Database with automated CI checks on every pull request.' },
 { icon: FileCode2, title: 'Clippy deny(unwrap_used)', description: 'Enforced across all crates — no unchecked unwraps in production code. All error paths must be explicit.' },
 { icon: AlertTriangle, title: 'Typed Error Migration', description: '34 thiserror enums providing structured, typed error handling instead of string-based errors.' },
 { icon: Fingerprint, title: 'Side-Channel Audit', description: 'Dedicated side-channel audit for ZK and binding crates. Timing and memory access patterns are analyzed.' },
 { icon: KeyRound, title: 'Constant-Time Operations', description: 'VRF and BLS operations are constant-time by design, preventing timing-based key recovery attacks.' },
 { icon: ClipboardList, title: 'Code Coverage Integration', description: 'Continuous code coverage tracking with enforcement thresholds on critical paths.' },
]

const auditStatus = [
 { label: 'High-priority findings remediated', value: '7', color: 'text-success', bgColor: 'bg-success/10', icon: CheckCircle2 },
 { label: 'Medium-priority finding remediated', value: '1', color: 'text-success', bgColor: 'bg-success/10', icon: CheckCircle2 },
 { label: 'Medium-priority findings tracked', value: '14', color: 'text-warning', bgColor: 'bg-warning/10', icon: Clock },
 { label: 'External security audit', value: 'In Prep', color: 'text-primary', bgColor: 'bg-primary/10', icon: Shield },
]

export default function SecurityPage() {
 return (
 <div className="min-h-screen flex flex-col">
 <PageHeader
 title="Security"
 description="Security is not a feature — it is the foundation. Every line of code, every cryptographic primitive, every consensus rule must be verifiable and auditable."
 breadcrumbs={[{ label: 'Security' }]}
 />

 {/* Bug Bounty Program — Dark section */}
 <section className="section-paper section-spacing">
 <div className="max-w-[980px] mx-auto px-6">
 <motion.div {...fadeInUp}>
 <h2 className="font-display text-[37.5px] sm:text-[47.5px] md:text-[53px] font-bold leading-[1.1] text-foreground mb-4">Bug Bounty Program</h2>
 <p className="text-muted-foreground leading-[1.6] text-[16.9px] sm:text-[18.8px] max-w-4xl mb-12 font-sans">
 The Omnia Protocol bug bounty program rewards security researchers who discover and responsibly disclose vulnerabilities. 
 We believe that public scrutiny makes systems stronger, not weaker.
 </p>
 </motion.div>

 {/* Scope */}
 <motion.div {...fadeInUp} className="mb-16">
 <h3 className="font-display text-[30px] sm:text-[30px] font-semibold text-foreground mb-8">Scope</h3>
 <div className="space-y-0 mb-8">
 {scopeItems.map((item, i) => {
 const Icon = item.icon
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-30px' }}
 transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as const }}
 className={`flex items-center gap-4 sm:gap-6 py-5 ${i < scopeItems.length - 1 ? 'border-b border-border' : ''}`}
 >
 <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
 <Icon className="w-4.5 h-4.5 text-primary" />
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-foreground text-[15px] sm:text-[16.9px] font-medium font-sans">{item.label}</p>
 <p className="text-muted-foreground text-[13.1px] sm:text-[13.1px] mt-0.5 font-mono">{item.detail}</p>
 </div>
 </motion.div>
 )
 })}
 </div>

 <h3 className="font-display text-[30px] sm:text-[30px] font-semibold text-foreground mb-5">Out of Scope</h3>
 <div className="space-y-3">
 {outOfScopeItems.map((item, i) => (
 <div key={i} className="flex items-start gap-3">
 <XCircle className="w-4 h-4 text-muted-foreground/60 flex-shrink-0 mt-0.5" />
 <span className="text-muted-foreground text-[15px] sm:text-[15px] font-sans">{item}</span>
 </div>
 ))}
 </div>
 </motion.div>
 </div>
 </section>

 {/* Reward Tiers — Light section */}
 <section className="section-white section-spacing">
 <div className="max-w-[980px] mx-auto px-6">
 <motion.div {...fadeInUp}>
 <h3 className="font-sans text-[37.5px] sm:text-[47.5px] font-bold leading-[1.1] text-foreground mb-8">Reward Tiers</h3>
 </motion.div>

 <div className="space-y-0">
 {rewardTiers.map((tier, i) => {
 const Icon = tier.icon
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-30px' }}
 transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const }}
 className={`group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-6 ${i < rewardTiers.length - 1 ? 'border-b border-border' : ''}`}
 >
 <div className="flex items-center gap-3 sm:w-[200px] shrink-0">
 <div className={`w-9 h-9 rounded-lg ${tier.bgColor} flex items-center justify-center`}>
 <Icon className={`w-4.5 h-4.5 ${tier.color}`} />
 </div>
 <h4 className={`font-semibold text-[16.9px] font-sans ${tier.color}`}>{tier.severity}</h4>
 </div>
 <p className="text-muted-foreground text-[15px] sm:text-[15px] leading-[1.6] font-sans flex-1">
 {tier.examples}
 </p>
 <span className={`font-mono font-bold text-[16.9px] ${tier.color} shrink-0`}>
 {tier.reward}
 </span>
 </motion.div>
 )
 })}
 </div>
 </div>
 </section>

 {/* Reporting — Dark section */}
 <section className="section-paper section-spacing">
 <div className="max-w-[980px] mx-auto px-6">
 <motion.div {...fadeInUp}>
 <h3 className="font-sans text-[37.5px] sm:text-[47.5px] font-bold leading-[1.1] text-foreground mb-8">Reporting a Vulnerability</h3>
 </motion.div>

 <div className="max-w-[680px] space-y-5">
 <div className="flex items-start gap-3">
 <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
 <div>
 <p className="text-foreground text-[15px] font-medium font-sans">Email</p>
 <p className="text-muted-foreground text-[15px] font-mono">security@omnia-protocol.org</p>
 </div>
 </div>
 <div className="flex items-start gap-3">
 <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
 <div>
 <p className="text-foreground text-[15px] font-sans">PGP Encryption</p>
 <p className="text-muted-foreground text-[15px] font-sans">Please encrypt your report using our PGP key</p>
 </div>
 </div>
 <div className="h-px bg-accent" />
 <div>
 <p className="text-foreground text-[15px] font-medium mb-3 font-sans">Your report should include:</p>
 <ul className="space-y-2">
 {[
 'Affected components and versions',
 'Steps to reproduce the vulnerability',
 'Impact assessment',
 'Proof-of-concept (if available)',
 ].map((item, i) => (
 <li key={i} className="flex items-center gap-2 text-muted-foreground text-[15px] font-sans">
 <ArrowRight className="w-3.5 h-3.5 text-primary flex-shrink-0" />
 {item}
 </li>
 ))}
 </ul>
 </div>
 </div>
 </div>
 </section>

 {/* Response Timeline — Light section */}
 <section className="section-white section-spacing">
 <div className="max-w-[980px] mx-auto px-6">
 <motion.div {...fadeInUp}>
 <h3 className="font-sans text-[37.5px] sm:text-[47.5px] font-bold leading-[1.1] text-foreground mb-8">Response Timeline</h3>
 </motion.div>

 <div className="space-y-0 mb-12">
 {responseTimeline.map((item, i) => {
 const Icon = item.icon
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-30px' }}
 transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const }}
 className={`flex items-center gap-4 sm:gap-6 py-5 ${i < responseTimeline.length - 1 ? 'border-b border-border' : ''}`}
 >
 <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
 <Icon className="w-4.5 h-4.5 text-primary" />
 </div>
 <p className="text-foreground font-medium text-[15px] sm:text-[16.9px] font-sans">{item.phase}</p>
 <p className="text-primary font-mono text-[15px] sm:ml-auto">{item.time}</p>
 </motion.div>
 )
 })}
 </div>

 <h4 className="font-display text-[24.3px] sm:text-[30px] font-semibold text-foreground mb-6">Patch Release Timeline</h4>
 <div className="space-y-0">
 {patchReleaseTimeline.map((item, i) => (
 <div
 key={i}
 className={`flex items-center justify-between py-4 ${i < patchReleaseTimeline.length - 1 ? 'border-b border-border' : ''}`}
 >
 <p className={`font-semibold text-[15px] sm:text-[16.9px] ${item.color} font-sans`}>{item.severity}</p>
 <p className="text-foreground text-[16.9px] sm:text-[18.8px] font-bold font-mono">{item.time}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Responsible Disclosure & Payment — Dark section */}
 <section className="section-paper section-spacing">
 <div className="max-w-[980px] mx-auto px-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
 <motion.div {...fadeInUp}>
 <h4 className="font-display text-[24.3px] sm:text-[30px] font-bold text-foreground mb-4">Responsible Disclosure</h4>
 <p className="text-muted-foreground text-[15px] sm:text-[16.9px] leading-[1.6] font-sans">
 We follow a <span className="text-primary font-medium">90-day embargo policy</span>. 
 Vulnerabilities will not be publicly disclosed until a fix is available, or 90 days have 
 elapsed since the initial report — whichever comes first. Extensions may be granted upon request.
 </p>
 </motion.div>

 <motion.div {...fadeInUp}>
 <h4 className="font-display text-[24.3px] sm:text-[30px] font-bold text-foreground mb-4">Payment</h4>
 <p className="text-muted-foreground text-[15px] sm:text-[16.9px] leading-[1.6] font-sans">
 Bounties are paid in <span className="text-primary font-medium">USDC or USDT on Ethereum mainnet</span>. 
 Payment is processed after the fix has been verified and deployed. Researchers may choose 
 to donate their bounty back to the protocol.
 </p>
 </motion.div>
 </div>
 </div>
 </section>

 {/* Security Practices — Light section */}
 <section className="section-white section-spacing">
 <div className="max-w-[980px] mx-auto px-6">
 <motion.div {...fadeInUp}>
 <h2 className="font-display text-[37.5px] sm:text-[47.5px] md:text-[53px] font-bold leading-[1.1] text-foreground mb-4">Security Practices</h2>
 <p className="text-muted-foreground leading-[1.6] text-[16.9px] sm:text-[18.8px] max-w-4xl mb-12 font-sans">
 Security is not an afterthought. It is embedded into every stage of development — from dependency 
 selection to deployment. Here is what we do, concretely.
 </p>
 </motion.div>

 <div className="space-y-0">
 {securityPractices.map((practice, i) => {
 const Icon = practice.icon
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-30px' }}
 transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as const }}
 className={`group flex flex-col sm:flex-row gap-4 sm:gap-8 py-6 ${i < securityPractices.length - 1 ? 'border-b border-border' : ''}`}
 >
 <div className="flex items-center gap-3 sm:w-[300px] md:w-[340px] shrink-0">
 <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
 <Icon className="w-4.5 h-4.5 text-primary" />
 </div>
 <h3 className="text-foreground font-semibold text-[15px] sm:text-[16.9px] font-sans">{practice.title}</h3>
 </div>
 <p className="text-muted-foreground text-[15px] sm:text-[15px] leading-[1.6] font-sans">{practice.description}</p>
 </motion.div>
 )
 })}
 </div>
 </div>
 </section>

 {/* Audit Status — Dark section */}
 <section className="section-paper section-spacing">
 <div className="max-w-[980px] mx-auto px-6">
 <motion.div {...fadeInUp}>
 <h2 className="font-display text-[37.5px] sm:text-[47.5px] md:text-[53px] font-bold leading-[1.1] text-foreground mb-4">Audit Status</h2>
 <p className="text-muted-foreground leading-[1.6] text-[16.9px] sm:text-[18.8px] max-w-4xl mb-12 font-sans">
 Transparency means showing the work. Here is the current state of our security audit findings — 
 remediated and tracked.
 </p>
 </motion.div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-accent rounded-xl overflow-hidden mb-10">
 {auditStatus.map((item, i) => {
 const Icon = item.icon
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-30px' }}
 transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as const }}
 className="bg-card p-6 sm:p-8 text-center"
 >
 <div className="flex justify-center mb-4">
 <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center`}>
 <Icon className={`w-6 h-6 ${item.color}`} />
 </div>
 </div>
 <div className={`text-[30px] sm:text-[30px] font-bold font-mono ${item.color} mb-2`}>
 {item.value}
 </div>
 <p className="text-muted-foreground text-[15px] font-sans">{item.label}</p>
 </motion.div>
 )
 })}
 </div>

 <motion.div {...fadeInUp}>
 <div className="flex items-start gap-3">
 <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
 <p className="text-muted-foreground text-[15px] sm:text-[15px] leading-[1.6] font-sans">
 An <span className="text-primary font-medium">external security audit</span> is currently in preparation. 
 Results and findings will be published in full upon completion. We do not hide audit results.
 </p>
 </div>
 </motion.div>
 </div>
 </section>

 <Footer />

 <ScrollToTop />
 </div>
 )
}
