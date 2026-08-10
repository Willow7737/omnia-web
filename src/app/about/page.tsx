'use client'

import { withBasePath } from '@/lib/base-path'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import {
 Network,
 Vote,
 ShieldCheck,
 PackageSearch,
 BrainCircuit,
 Coins,
 ArrowRight,
 Scale,
 Eye,
 Globe,
 FileCode2,
 ListChecks,
 Layers,
 CheckCircle2,
} from 'lucide-react'

const fadeInUp = {
 initial: { opacity: 0, y: 24 },
 whileInView: { opacity: 1, y: 0 },
 viewport: { once: true, margin: '-50px' },
 transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
}

const problems = [
 {
 icon: Network,
 problem: 'Inefficient Blockchains',
 consequence: 'High fees and energy waste',
 solution: 'Parallel causal graph consensus',
 },
 {
 icon: Vote,
 problem: 'Broken Governance',
 consequence: 'Opaque decisions and ignored votes',
 solution: 'Quadratic voting + reputation decay',
 },
 {
 icon: ShieldCheck,
 problem: 'Data Exploitation',
 consequence: 'Corporate profit from personal info',
 solution: 'User-controlled data via ZK Proofs',
 },
 {
 icon: PackageSearch,
 problem: 'Opaque Supply Chains',
 consequence: 'Hidden child labor and fake medicine',
 solution: 'Cryptographic birth certificates',
 },
 {
 icon: BrainCircuit,
 problem: 'Centralized AI',
 consequence: 'Corporate control of models and data',
 solution: 'Distributed training with shared rewards',
 },
 {
 icon: Coins,
 problem: 'Speculative Crypto',
 consequence: 'Wealth concentration and volatility',
 solution: 'Universal Basic Compute',
 },
]

const philosophies = [
 {
 icon: Scale,
 title: 'Trust Through Mathematics',
 description:
 'Every claim is verifiable. No oracles, no authorities, no "trust us." The protocol replaces trust with cryptographic proofs, and verification is always a pure function of the data.',
 },
 {
 icon: Eye,
 title: 'Radical Transparency',
 description:
 'We publish our stubs, our partial implementations, and our honest benchmarks. No marketing metrics. Numbers come from reproducible Criterion benchmarks or are clearly marked as estimates.',
 },
 {
 icon: Globe,
 title: 'Public Domain Forever',
 description:
 'CC0 license. No entity owns this protocol. No VC lock-in. No token pre-mine. The protocol is a public good, like TCP/IP or HTTP.',
 },
]

const stats = [
 { icon: FileCode2, value: '225', label: 'Rust Files' },
 { icon: ListChecks, value: '87,576', label: 'Lines of Code' },
 { icon: CheckCircle2, value: '1,536', label: 'Tests' },
 { icon: Layers, value: '6', label: 'Architecture Layers' },
 { icon: CheckCircle2, value: '6', label: 'Phases — Public Testnet Live' },
 { icon: Globe, value: 'CC0', label: 'License' },
]

export default function AboutPage() {
 return (
 <div className="min-h-screen flex flex-col">
 <PageHeader
 title="About Omnia"
 description="A protocol — not a company, not a coin, not an app. A fundamental set of rules for a shared, unchangeable record of truth."
 breadcrumbs={[{ label: 'About' }]}
 />

 {/* What is Omnia? */}
 <section className="section-paper section-spacing">
 <div className="max-w-[980px] mx-auto px-6 relative">
 <motion.div
 initial={{ opacity: 0, y: 12 }}
 whileInView={{ opacity: 0.9, y: 0 }}
 viewport={{ once: true, margin: '-50px' }}
 transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
 className="hidden lg:block absolute right-6 top-2 w-[180px]"
 aria-hidden
 >
 <Image src={withBasePath("/omnia-lockup.png")} alt="" width={180} height={308} className="opacity-90" />
 </motion.div>
 <motion.div {...fadeInUp}>
 <h2 className="font-sans text-[40px] sm:text-[48px] md:text-[56px] font-bold tracking-normal leading-[1.1] text-foreground mb-8">
 What is Omnia?
 </h2>
 <div className="space-y-6 text-muted-foreground leading-[1.6] text-[17px] sm:text-[19px] max-w-[680px] font-sans">
 <p>
 Omnia is not a company, a coin, or an app. It is a <span className="text-foreground font-medium">protocol</span> — a
 fundamental set of rules that any computer can follow to participate in a shared,
 unchangeable record of truth.
 </p>
 <p>
 It uses <span className="text-foreground font-medium">causal graph consensus</span> (DAG + vector clocks + CRDTs) instead
 of sequential blockchains to achieve parallel transaction processing. This means
 transactions don&apos;t wait in a single line — they flow through a directed acyclic graph,
 preserving causal relationships while enabling massive throughput.
 </p>
 <p>
 The protocol is <span className="text-foreground font-medium">settlement-agnostic</span> — it can settle on Ethereum, Bitcoin,
 Solana, or any L1 with data availability and proof verification. Omnia doesn&apos;t compete
 with existing chains; it extends them with a parallel execution layer that settles on
 whatever base layer makes sense for your use case.
 </p>
 </div>
 </motion.div>
 </div>
 </section>

 {/* The Problem We Solve — Light section */}
 <section className="section-white section-spacing">
 <div className="max-w-[980px] mx-auto px-6">
 <motion.div {...fadeInUp}>
 <h2 className="font-sans text-[40px] sm:text-[48px] md:text-[56px] font-bold tracking-normal leading-[1.1] text-foreground mb-4">
 The Problem We Solve
 </h2>
 <p className="text-muted-foreground mb-14 text-[17px] sm:text-[19px] max-w-[600px] font-sans">
 The current infrastructure of the internet and financial systems is fundamentally broken.
 Here are the problems and how Omnia addresses each one.
 </p>
 </motion.div>

 <div className="space-y-0">
 {problems.map((item, i) => {
 const Icon = item.icon
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-30px' }}
 transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as const }}
 className={`group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-12 py-6 ${
 i < problems.length - 1 ? 'border-b border-border' : ''
 }`}
 >
 <div className="flex items-center gap-3 sm:w-[320px] md:w-[380px] shrink-0">
 <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
 <Icon className="w-4.5 h-4.5 text-primary" />
 </div>
 <div>
 <h3 className="font-semibold text-foreground text-[15px] sm:text-[17px] font-sans">
 {item.problem}
 </h3>
 <p className="text-muted-foreground text-[13px] mt-0.5 font-sans">{item.consequence}</p>
 </div>
 </div>
 <div className="flex items-center gap-2 text-primary text-[14px] sm:text-[15px] font-medium font-sans">
 <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
 <span>{item.solution}</span>
 </div>
 </motion.div>
 )
 })}
 </div>
 </div>
 </section>

 {/* Our Philosophy — Dark section */}
 <section className="section-paper section-spacing">
 <div className="max-w-[980px] mx-auto px-6">
 <motion.div {...fadeInUp}>
 <h2 className="font-sans text-[40px] sm:text-[48px] md:text-[56px] font-bold tracking-normal leading-[1.1] text-foreground mb-4">
 Our Philosophy
 </h2>
 <p className="text-muted-foreground mb-14 text-[17px] sm:text-[19px] max-w-[600px] font-sans">
 Three principles guide every decision in the Omnia Protocol.
 </p>
 </motion.div>

 <div className="space-y-12">
 {philosophies.map((item, i) => {
 const Icon = item.icon
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-30px' }}
 transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const }}
 className="flex flex-col sm:flex-row gap-4 sm:gap-8"
 >
 <div className="sm:w-[280px] md:w-[320px] shrink-0">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
 <Icon className="w-5 h-5 text-primary" />
 </div>
 <h3 className="text-[19px] sm:text-[21px] font-semibold text-foreground font-sans">{item.title}</h3>
 </div>
 </div>
 <p className="text-muted-foreground text-[15px] sm:text-[17px] leading-[1.6] font-sans">
 {item.description}
 </p>
 </motion.div>
 )
 })}
 </div>
 </div>
 </section>

 {/* By The Numbers — Light section */}
 <section className="section-white section-spacing">
 <div className="max-w-[980px] mx-auto px-6">
 <motion.div {...fadeInUp}>
 <h2 className="font-sans text-[40px] sm:text-[48px] md:text-[56px] font-bold tracking-normal leading-[1.1] text-foreground mb-4">
 By The Numbers
 </h2>
 <p className="text-muted-foreground mb-14 text-[17px] sm:text-[19px] max-w-[600px] font-sans">
 Real metrics from the codebase. No vanity numbers, no marketing spin.
 </p>
 </motion.div>

 <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden">
 {stats.map((stat, i) => {
 const Icon = stat.icon
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 16 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-30px' }}
 transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as const }}
 className="bg-card p-6 sm:p-8 text-center"
 >
 <div className="flex justify-center mb-3">
 <Icon className="w-5 h-5 text-primary" />
 </div>
 <div className="text-[28px] sm:text-[36px] font-bold text-foreground mb-1 font-sans">
 {stat.value}
 </div>
 <div className="text-muted-foreground text-[13px] sm:text-[14px] font-sans">{stat.label}</div>
 </motion.div>
 )
 })}
 </div>
 </div>
 </section>

 <Footer />

 <ScrollToTop />
 </div>
 )
}
