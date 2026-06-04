'use client'

import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
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
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: '-50px' },
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

const rewardTiers = [
  {
    severity: 'Critical',
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    borderColor: 'border-red-400/20',
    icon: AlertTriangle,
    examples: 'Consensus break, key theft, fund loss, ZK proof forgery',
    reward: '$10,000 – $50,000',
  },
  {
    severity: 'High',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/20',
    icon: Shield,
    examples: 'State corruption (non-exploitable), signature bypass, DoS bypass',
    reward: '$5,000 – $10,000',
  },
  {
    severity: 'Medium',
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
    borderColor: 'border-amber-400/20',
    icon: Eye,
    examples: 'Information leak, degraded performance, nonce reuse',
    reward: '$1,000 – $5,000',
  },
  {
    severity: 'Low',
    color: 'text-omnia-sage',
    bgColor: 'bg-omnia-sage/10',
    borderColor: 'border-omnia-sage/20',
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
  { severity: 'Medium', time: '30 days', color: 'text-amber-400' },
  { severity: 'Low', time: 'Next release', color: 'text-omnia-sage' },
]

const securityPractices = [
  {
    icon: ShieldCheck,
    title: 'Supply Chain Hardening',
    description: 'cargo-vet, cargo-deny, and SBOM generation for all dependencies. Every crate is audited before inclusion.',
  },
  {
    icon: Search,
    title: 'RUSTSEC Advisory Review',
    description: 'Continuous monitoring of Rust Security Advisory Database with automated CI checks on every pull request.',
  },
  {
    icon: FileCode2,
    title: 'Clippy deny(unwrap_used)',
    description: 'Enforced across all crates — no unchecked unwraps in production code. All error paths must be explicit.',
  },
  {
    icon: AlertTriangle,
    title: 'Typed Error Migration',
    description: '34 thiserror enums providing structured, typed error handling instead of string-based errors.',
  },
  {
    icon: Fingerprint,
    title: 'Side-Channel Audit',
    description: 'Dedicated side-channel audit for ZK and binding crates. Timing and memory access patterns are analyzed.',
  },
  {
    icon: KeyRound,
    title: 'Constant-Time Operations',
    description: 'VRF and BLS operations are constant-time by design, preventing timing-based key recovery attacks.',
  },
  {
    icon: ClipboardList,
    title: 'Code Coverage Integration',
    description: 'Continuous code coverage tracking with enforcement thresholds on critical paths.',
  },
]

const auditStatus = [
  { label: 'High-priority findings remediated', value: '7', color: 'text-emerald-400', bgColor: 'bg-emerald-400/10', icon: CheckCircle2 },
  { label: 'Medium-priority finding remediated', value: '1', color: 'text-omnia-sage', bgColor: 'bg-omnia-sage/10', icon: CheckCircle2 },
  { label: 'Medium-priority findings tracked', value: '14', color: 'text-amber-400', bgColor: 'bg-amber-400/10', icon: Clock },
  { label: 'External security audit', value: 'In Prep', color: 'text-omnia-accent', bgColor: 'bg-omnia-accent/10', icon: Shield },
]

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-omnia-base">
      <PageHeader
        title="Security"
        description="Security is not a feature — it is the foundation. Every line of code, every cryptographic primitive, every consensus rule must be verifiable and auditable."
        breadcrumbs={[{ label: 'Security' }]}
      />

      {/* Bug Bounty Program */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
              <Bug className="w-5 h-5 text-omnia-accent" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-omnia-text">Bug Bounty Program</h2>
          </div>
          <p className="text-omnia-text-secondary leading-relaxed text-base sm:text-lg max-w-4xl mb-12">
            The Omnia Protocol bug bounty program rewards security researchers who discover and responsibly disclose vulnerabilities. 
            We believe that public scrutiny makes systems stronger, not weaker.
          </p>
        </motion.div>

        {/* Scope */}
        <motion.div {...fadeInUp} className="mb-16">
          <h3 className="text-xl font-semibold text-omnia-text mb-6">Scope</h3>
          <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {scopeItems.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={i}
                  {...staggerItem}
                  className="bg-omnia-surface border border-omnia-border rounded-xl p-5 hover:border-omnia-accent/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-omnia-accent" />
                    </div>
                    <div>
                      <p className="text-omnia-text text-sm font-medium">{item.label}</p>
                      <p className="text-omnia-text-secondary text-xs mt-1 font-mono">{item.detail}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          <h3 className="text-xl font-semibold text-omnia-text mb-4">Out of Scope</h3>
          <div className="bg-omnia-surface border border-omnia-border rounded-xl p-5 sm:p-6">
            <ul className="space-y-3">
              {outOfScopeItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-omnia-text-secondary/60 flex-shrink-0 mt-0.5" />
                  <span className="text-omnia-text-secondary text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Reward Tiers */}
        <motion.div {...fadeInUp} className="mb-16">
          <h3 className="text-xl font-semibold text-omnia-text mb-6">Reward Tiers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {rewardTiers.map((tier, i) => {
              const Icon = tier.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`bg-omnia-surface border ${tier.borderColor} rounded-xl p-5 sm:p-6 hover:border-omnia-accent/30 transition-colors`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${tier.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${tier.color}`} />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${tier.color} text-base`}>{tier.severity}</h4>
                      </div>
                    </div>
                    <span className={`font-mono font-bold text-lg ${tier.color}`}>
                      {tier.reward}
                    </span>
                  </div>
                  <p className="text-omnia-text-secondary text-sm leading-relaxed">
                    {tier.examples}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Reporting */}
        <motion.div {...fadeInUp} className="mb-16">
          <h3 className="text-xl font-semibold text-omnia-text mb-6">Reporting a Vulnerability</h3>
          <div className="bg-omnia-surface border border-omnia-border rounded-xl p-5 sm:p-6">
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-omnia-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-omnia-text text-sm font-medium">Email</p>
                  <p className="text-omnia-text-secondary text-sm font-mono">security@omnia-protocol.org</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-omnia-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-omnia-text text-sm font-medium">PGP Encryption</p>
                  <p className="text-omnia-text-secondary text-sm">Please encrypt your report using our PGP key</p>
                </div>
              </div>
              <div className="h-px bg-omnia-border" />
              <div>
                <p className="text-omnia-text text-sm font-medium mb-3">Your report should include:</p>
                <ul className="space-y-2">
                  {[
                    'Affected components and versions',
                    'Steps to reproduce the vulnerability',
                    'Impact assessment',
                    'Proof-of-concept (if available)',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-omnia-text-secondary text-sm">
                      <ArrowRight className="w-3.5 h-3.5 text-omnia-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Response Timeline */}
        <motion.div {...fadeInUp} className="mb-16">
          <h3 className="text-xl font-semibold text-omnia-text mb-6">Response Timeline</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {responseTimeline.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-omnia-surface border border-omnia-border rounded-xl p-5 text-center hover:border-omnia-accent/30 transition-colors"
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-omnia-accent" />
                    </div>
                  </div>
                  <p className="text-omnia-text font-medium text-sm mb-1">{item.phase}</p>
                  <p className="text-omnia-accent font-mono text-sm">{item.time}</p>
                </motion.div>
              )
            })}
          </div>

          <h4 className="text-base font-semibold text-omnia-text mb-4">Patch Release Timeline</h4>
          <div className="bg-omnia-surface border border-omnia-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 gap-px bg-omnia-border">
              {patchReleaseTimeline.map((item, i) => (
                <div key={i} className="bg-omnia-surface p-4 text-center">
                  <p className={`font-semibold text-sm ${item.color}`}>{item.severity}</p>
                  <p className="text-omnia-text text-lg font-bold font-mono mt-1">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Responsible Disclosure & Payment */}
        <motion.div {...fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-omnia-surface border border-omnia-border rounded-xl p-5 sm:p-6 hover:border-omnia-accent/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-omnia-accent" />
                </div>
                <h4 className="text-omnia-text font-semibold">Responsible Disclosure</h4>
              </div>
              <p className="text-omnia-text-secondary text-sm leading-relaxed">
                We follow a <span className="text-omnia-accent font-medium">90-day embargo policy</span>. 
                Vulnerabilities will not be publicly disclosed until a fix is available, or 90 days have 
                elapsed since the initial report — whichever comes first. Extensions may be granted upon request.
              </p>
            </div>

            <div className="bg-omnia-surface border border-omnia-border rounded-xl p-5 sm:p-6 hover:border-omnia-accent/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-omnia-accent" />
                </div>
                <h4 className="text-omnia-text font-semibold">Payment</h4>
              </div>
              <p className="text-omnia-text-secondary text-sm leading-relaxed">
                Bounties are paid in <span className="text-omnia-accent font-medium">USDC or USDT on Ethereum mainnet</span>. 
                Payment is processed after the fix has been verified and deployed. Researchers may choose 
                to donate their bounty back to the protocol.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Separator */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-omnia-border" />
      </div>

      {/* Security Practices */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-omnia-accent" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-omnia-text">Security Practices</h2>
          </div>
          <p className="text-omnia-text-secondary leading-relaxed text-base sm:text-lg max-w-4xl mb-12">
            Security is not an afterthought. It is embedded into every stage of development — from dependency 
            selection to deployment. Here is what we do, concretely.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {securityPractices.map((practice, i) => {
            const Icon = practice.icon
            return (
              <motion.div
                key={i}
                {...staggerItem}
                className="group bg-omnia-surface border border-omnia-border rounded-xl p-5 sm:p-6 hover:border-omnia-accent/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-omnia-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-omnia-accent" />
                </div>
                <h3 className="text-omnia-text font-semibold text-sm sm:text-base mb-2">{practice.title}</h3>
                <p className="text-omnia-text-secondary text-sm leading-relaxed">{practice.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* Separator */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-omnia-border" />
      </div>

      {/* Audit Status */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div {...fadeInUp}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-omnia-accent/10 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-omnia-accent" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-omnia-text">Audit Status</h2>
          </div>
          <p className="text-omnia-text-secondary leading-relaxed text-base sm:text-lg max-w-4xl mb-12">
            Transparency means showing the work. Here is the current state of our security audit findings — 
            remediated and tracked.
          </p>
        </motion.div>

        <motion.div
          {...staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {auditStatus.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                {...staggerItem}
                className="bg-omnia-surface border border-omnia-border rounded-xl p-5 sm:p-6 text-center hover:border-omnia-accent/30 transition-colors"
              >
                <div className="flex justify-center mb-4">
                  <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                </div>
                <div className={`text-3xl sm:text-4xl font-bold font-mono ${item.color} mb-2`}>
                  {item.value}
                </div>
                <p className="text-omnia-text-secondary text-sm">{item.label}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div {...fadeInUp} className="mt-8">
          <div className="bg-omnia-surface border border-omnia-border rounded-xl p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-omnia-accent flex-shrink-0 mt-0.5" />
              <p className="text-omnia-text-secondary text-sm leading-relaxed">
                An <span className="text-omnia-accent font-medium">external security audit</span> is currently in preparation. 
                Results and findings will be published in full upon completion. We do not hide audit results.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer spacer */}
      <div className="h-16" />
    </div>
  )
}
