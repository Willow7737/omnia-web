'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="section-dark min-h-screen flex flex-col items-center justify-center px-6 relative">
      <div className="relative z-10 text-center max-w-lg">
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span
            className="text-[120px] sm:text-[160px] font-bold leading-none tracking-[-0.04em] text-[#F5F5F7] block font-[family-name:var(--font-space-grotesk)]"
          >
            404
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[24px] sm:text-[28px] font-bold text-[#F5F5F7] mt-2 mb-3 font-[family-name:var(--font-space-grotesk)] tracking-tight"
        >
          Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[17px] text-[#86868B] leading-[1.5] mb-10 font-[family-name:var(--font-geist-sans)]"
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>

        {/* Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {[
            { label: 'Go Home', href: '/' },
            { label: 'Architecture', href: '/architecture' },
            { label: 'Docs', href: '/docs' },
          ].map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link
                href={link.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-medium font-[family-name:var(--font-space-grotesk)] tracking-tight transition-colors border border-white/[0.1] text-[#F5F5F7] hover:bg-white/[0.04]"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
