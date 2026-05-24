'use client'

import { motion } from 'framer-motion'
import { Github, MessageCircle } from 'lucide-react'

export function ContributeSection() {
  return (
    <section id="contribute" className="section-padding px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#F5F0EB] mb-4">
            Public Domain Infrastructure
          </h2>

          <p className="text-[#A39B92] leading-relaxed mb-8 max-w-xl mx-auto">
            Omnia is CC0. No entity owns it. Funded by protocol grants and community support. 217 Rust source files. 71,407 lines. 1,173 tests — all passing.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10">
            {[
              { value: '217', label: 'files' },
              { value: '71,407', label: 'lines' },
              { value: '1,173', label: 'tests' },
              { value: 'CC0', label: 'License' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-1.5">
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-lg text-[#D4A574]">
                  {stat.value}
                </span>
                <span className="text-xs text-[#A39B92] font-[family-name:var(--font-space-grotesk)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/Willow7737/omnia-protocol"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4A574] text-[#0F0F0F] font-[family-name:var(--font-space-grotesk)] font-medium text-sm tracking-tight rounded-md hover:bg-[#c49564] transition-colors"
            >
              <Github size={16} />
              View on GitHub
            </a>
            <a
              href="https://discord.gg/qYkpAeSYR"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border rounded-md font-[family-name:var(--font-space-grotesk)] font-medium text-sm tracking-tight text-[#A39B92] hover:text-[#D4A574] hover:border-[#D4A574] transition-colors"
              style={{ borderColor: 'rgba(212, 165, 116, 0.3)' }}
            >
              <MessageCircle size={16} />
              Join Discord
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
