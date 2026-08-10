'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import {
 Banknote,
 PackageSearch,
 Fingerprint,
 BrainCircuit,
 Vote,
 Radio,
 type LucideIcon,
} from 'lucide-react'

interface UseCase {
 icon: LucideIcon
 title: string
 description: string
 items: string[]
}

const useCases: UseCase[] = [
 {
 icon: Banknote,
 title: 'Financial Services',
 description: 'Reimagining value transfer without intermediaries',
 items: [
 'Cross-border payments without intermediaries',
 'Decentralized lending with verifiable collateral',
 'Tokenized asset management with on-chain provenance',
 ],
 },
 {
 icon: PackageSearch,
 title: 'Supply Chain Integrity',
 description: 'Cryptographic proof from origin to destination',
 items: [
 'Pharmaceutical traceability (fighting counterfeit medicine)',
 'Conflict mineral verification',
 'Food safety tracking from farm to table',
 'Cryptographic birth certificates for physical items',
 ],
 },
 {
 icon: Fingerprint,
 title: 'Identity & Privacy',
 description: 'Self-sovereign identity without centralized authorities',
 items: [
 'Self-sovereign identity without centralized authorities',
 'Privacy-preserving credential verification',
 'Social recovery for digital identity',
 'Biometric anchors with zero-knowledge proofs',
 ],
 },
 {
 icon: BrainCircuit,
 title: 'AI & Compute',
 description: 'Distributed intelligence with verifiable execution',
 items: [
 'Distributed AI training with shared rewards',
 'Verifiable compute proofs for outsourced computation',
 'AI agent coordination with delegated authority',
 'Universal Basic Compute for equitable access',
 ],
 },
 {
 icon: Vote,
 title: 'Governance',
 description: 'Transparent, reputation-weighted collective decisions',
 items: [
 'Transparent on-chain voting with quadratic weighting',
 'Reputation-weighted decision making with decay',
 'Time-locked proposals for considered governance',
 'Community-driven protocol evolution',
 ],
 },
 {
 icon: Radio,
 title: 'Physical-Digital Fusion',
 description: 'Bridging the real world with tamper-proof digital records',
 items: [
 'IoT device authentication and coordination',
 'Smart city infrastructure management',
 'Environmental monitoring with tamper-proof data',
 'Real-world asset tokenization with physical anchors',
 ],
 },
]

export default function UseCasesPage() {
 return (
 <div className="min-h-screen flex flex-col">
 <PageHeader
 title="Use Cases"
 description="Real-world problems that Omnia's architecture is built to solve. From financial infrastructure to physical-digital fusion — every use case is grounded in the protocol's actual capabilities."
 breadcrumbs={[{ label: 'Use Cases' }]}
 />

 {/* Use cases — alternating sections */}
 <div className="flex flex-col">
 {useCases.map((useCase, index) => {
 const Icon = useCase.icon
 const isDark = index % 2 === 0
 return (
 <motion.section
 key={useCase.title}
 initial={{ opacity: 0, y: 24 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-80px' }}
 transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.05 }}
 className={`${isDark ? 'section-paper' : 'section-white'} section-spacing`}
 >
 <div className="max-w-[980px] mx-auto px-6">
 <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
 {/* Left — Title */}
 <div className="sm:w-[340px] md:w-[400px] shrink-0">
 <div className="flex items-center gap-3 mb-3">
 <div className={`w-9 h-9 rounded-lg ${isDark ? 'bg-primary/10' : 'bg-primary/10'} flex items-center justify-center`}>
 <Icon className="w-4.5 h-4.5 text-primary" />
 </div>
 <h3 className={`font-display text-[30px] sm:text-[37.5px] font-bold leading-[1.1] ${isDark ? 'text-foreground' : 'text-foreground'}`}>
 {useCase.title}
 </h3>
 </div>
 <p className={`text-[15px] sm:text-[16.9px] ${isDark ? 'text-muted-foreground' : 'text-muted-foreground'} font-sans`}>
 {useCase.description}
 </p>
 </div>

 {/* Right — Items */}
 <div className="flex-1 space-y-3">
 {useCase.items.map((item, i) => (
 <motion.div
 key={i}
 initial={{ opacity: 0, x: -10 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true, margin: '-20px' }}
 transition={{ duration: 0.3, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
 className="flex items-start gap-3"
 >
 <div className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 ${isDark ? 'bg-primary/60' : 'bg-primary/60'}`} />
 <span className={`text-[15px] sm:text-[16.9px] leading-[1.6] font-sans ${isDark ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
 {item}
 </span>
 </motion.div>
 ))}
 </div>
 </div>
 </div>
 </motion.section>
 )
 })}
 </div>

 {/* Bottom CTA — Dark section */}
 <section className="section-paper py-20 sm:py-24">
 <div className="max-w-[980px] mx-auto px-6 text-center">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5 }}
 >
 <h3 className="font-display text-[30px] sm:text-[37.5px] md:text-[47.5px] font-bold text-foreground mb-4 leading-[1.1]">
 Building something that fits?
 </h3>
 <p className="text-muted-foreground text-[15px] sm:text-[15px] max-w-2xl mx-auto mb-8 leading-[1.6] font-sans">
 Omnia is CC0 public domain — no permissions needed. The protocol is designed to be a 
 fundamental infrastructure layer that any application can build on, without gatekeepers 
 or license fees.
 </p>
 <div className="flex flex-wrap gap-3 justify-center">
 <a
 href="https://github.com/Willow7737/omnia-protocol"
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-[15px] hover:bg-primary/90 transition-colors font-sans"
 >
 View on GitHub
 </a>
 <Link
 href="/architecture"
 className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card text-foreground text-[15px] hover:bg-muted active:translate-y-px transition-all font-sans"
 >
 Explore Architecture
 </Link>
 </div>
 </motion.div>
 </div>
 </section>

 <Footer />

 <ScrollToTop />
 </div>
 )
}
