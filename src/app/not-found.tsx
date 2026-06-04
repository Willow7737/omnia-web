'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Layers, BookOpen } from 'lucide-react'

const fadeIn = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' },
}

const fadeInDelayed = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay: 0.3 },
}

const staggerItem = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
}

const links = [
  { icon: Home, label: 'Go Home', href: '/', delay: 0.5 },
  { icon: Layers, label: 'View Architecture', href: '/architecture', delay: 0.6 },
  { icon: BookOpen, label: 'Read the Docs', href: '/docs', delay: 0.7 },
]

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle geometric decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          width="600"
          height="600"
          viewBox="0 0 600 600"
          fill="none"
          className="opacity-[0.04]"
        >
          {/* Outer hexagon */}
          <path
            d="M300 50 L520 175 L520 425 L300 550 L80 425 L80 175 Z"
            stroke="#D4A574"
            strokeWidth="1"
          />
          {/* Inner hexagon */}
          <path
            d="M300 120 L460 210 L460 390 L300 480 L140 390 L140 210 Z"
            stroke="#D4A574"
            strokeWidth="0.5"
          />
          {/* Cross lines */}
          <line x1="300" y1="50" x2="300" y2="550" stroke="#D4A574" strokeWidth="0.5" />
          <line x1="80" y1="175" x2="520" y2="425" stroke="#D4A574" strokeWidth="0.5" />
          <line x1="520" y1="175" x2="80" y2="425" stroke="#D4A574" strokeWidth="0.5" />
          {/* Corner circles */}
          <circle cx="300" cy="50" r="4" fill="#D4A574" />
          <circle cx="520" cy="175" r="4" fill="#D4A574" />
          <circle cx="520" cy="425" r="4" fill="#D4A574" />
          <circle cx="300" cy="550" r="4" fill="#D4A574" />
          <circle cx="80" cy="425" r="4" fill="#D4A574" />
          <circle cx="80" cy="175" r="4" fill="#D4A574" />
        </svg>
      </div>

      {/* Accent glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#D4A574] opacity-[0.03] blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg">
        {/* 404 number */}
        <motion.div {...fadeIn}>
          <span
            className="text-[8rem] sm:text-[10rem] md:text-[12rem] font-bold leading-none tracking-tight text-[#D4A574] block"
            style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            404
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          {...fadeInDelayed}
          className="text-2xl sm:text-3xl font-bold text-[#F5F0EB] mt-4 mb-4 font-[family-name:var(--font-space-grotesk)]"
        >
          Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          {...fadeInDelayed}
          className="text-base sm:text-lg text-[#A39B92] leading-relaxed mb-10"
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          This isn&apos;t a consensus fork — just a wrong turn.
        </motion.p>

        {/* Suggestion links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {links.map((link, i) => {
            const Icon = link.icon
            return (
              <motion.div
                key={i}
                {...staggerItem}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: link.delay }}
              >
                <Link
                  href={link.href}
                  className="group flex items-center gap-2 px-5 py-3 rounded-lg border border-[rgba(212,165,116,0.15)] bg-[#1A1A1A] hover:border-[#D4A574]/40 hover:bg-[#1A1A1A]/80 transition-all text-[#F5F0EB] text-sm font-medium font-[family-name:var(--font-space-grotesk)]"
                >
                  <Icon className="w-4 h-4 text-[#D4A574] group-hover:text-[#D4A574] transition-colors" />
                  {link.label}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
