'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, ArrowUpRight } from 'lucide-react'

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

const repoStats = [
  { value: '225', label: 'Rust files' },
  { value: '87,576', label: 'lines' },
  { value: '1,536', label: 'tests' },
  { value: 'CC0', label: 'license' },
]

const D_NORMAL = 0.26
const D_SLOW = 0.42
const EASE = [0.25, 0.46, 0.45, 0.94] as const

export function CTASection() {
  return (
    <section id="contribute" className="section-paper section-spacing px-6 relative overflow-hidden">
      {/* Dramatic blue glow backdrop */}
      <div
        className="glow-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none"
        aria-hidden
      />
      {/* Grid texture */}
      <div
        className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] pointer-events-none"
        aria-hidden
      />
      <div className="dither absolute inset-x-0 top-0 h-24 [mask-image:linear-gradient(black,transparent)] opacity-50 pointer-events-none" aria-hidden />

      <div className="max-w-[760px] mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: D_NORMAL, ease: EASE }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 font-mono text-[11.3px] text-muted-foreground lowercase mb-6">
            contribute
          </span>

          <h2 className="font-display text-[47.5px] sm:text-[60px] md:text-[76px] font-bold leading-[1.02] text-foreground mb-6">
            Public domain.
          </h2>

          <p className="text-[16.9px] sm:text-[18.8px] text-muted-foreground leading-[1.5] mb-12 max-w-[480px] mx-auto">
            CC0. No entity owns it. Every line of code is public, every benchmark is reproducible. No VC lock-in. No token pre-mine.
          </p>

          {/* Stats row — big mono numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12 max-w-[680px] mx-auto">
            {repoStats.map((stat) => (
              <div key={stat.label} className="border-gradient rounded-xl p-4 bg-card/40 border border-border">
                <div className="font-mono text-[24.3px] sm:text-[30px] font-bold text-foreground leading-none mb-1.5">
                  {stat.value}
                </div>
                <div className="text-[11.3px] text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <a
              href="https://github.com/Willow7737/omnia-protocol"
              target="_blank"
              rel="noopener noreferrer"
              className="pressable active:pressable-active inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-medium text-[15px] rounded-full hover:bg-primary/90 transition-colors ring-glow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <GitHubIcon size={15} />
              View on GitHub
              <ArrowUpRight size={15} />
            </a>
            <a
              href="https://discord.gg/qYkpAeSYR"
              target="_blank"
              rel="noopener noreferrer"
              className="pressable active:pressable-active inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-[15px] border border-border bg-card/60 backdrop-blur-sm text-foreground hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Join Discord
            </a>
          </div>

          {/* Support link */}
          <Link
            href="/donate"
            className="pressable active:pressable-active inline-flex items-center gap-1.5 text-[14px] text-muted-foreground hover:text-primary transition-colors group"
          >
            <Heart size={13} className="group-hover:fill-primary transition-all" />
            Support the Protocol
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
