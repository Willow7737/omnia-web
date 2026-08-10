'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart } from 'lucide-react'

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

// Counted from the omnia-protocol working tree at v0.1.76:
// `find -name '*.rs' | wc -l`, total lines, and #[test]/#[tokio::test] fns.
const repoStats = [
  { value: '225', label: 'Rust files' },
  { value: '87,576', label: 'lines' },
  { value: '1,536', label: 'tests' },
  { value: 'CC0', label: 'license' },
]

export function CTASection() {
  return (
    <section id="contribute" className="section-paper section-spacing px-6 relative overflow-hidden">
      <div className="dither absolute inset-x-0 top-0 h-24 [mask-image:linear-gradient(black,transparent)] opacity-50 pointer-events-none" aria-hidden />
      <div className="max-w-[680px] mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.26, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* tracking is 0 everywhere (DESIGN.md §3) */}
          <h2 className="font-sans text-[48px] sm:text-[64px] md:text-[80px] font-bold leading-[1.05] text-foreground mb-6">
            Public domain.
          </h2>

          <p className="text-[17px] sm:text-[19px] text-muted-foreground leading-[1.5] mb-10 max-w-[480px] mx-auto">
            CC0. No entity owns it. Every line of code is public, every benchmark is reproducible.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-12">
            {repoStats.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-1.5">
                <span className="font-mono text-[17px] sm:text-[19px] text-foreground">
                  {stat.value}
                </span>
                <span className="text-[12px] sm:text-[13px] text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <a
              href="https://github.com/Willow7737/omnia-protocol"
              target="_blank"
              rel="noopener noreferrer"
              className="pressable active:pressable-active inline-flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground font-medium text-[14px] rounded-full hover:bg-primary/90 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <GitHubIcon size={15} />
              View on GitHub
            </a>
            <a
              href="https://discord.gg/qYkpAeSYR"
              target="_blank"
              rel="noopener noreferrer"
              className="pressable active:pressable-active inline-flex items-center gap-2 px-7 py-3 rounded-full font-medium text-[14px] border border-border bg-card text-foreground hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Join Discord
            </a>
          </div>

          {/* Support link */}
          <Link
            href="/donate"
            className="inline-flex items-center gap-1.5 text-[14px] text-muted-foreground hover:text-primary transition-colors"
          >
            <Heart size={13} />
            Support the Protocol
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
