'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#architecture', label: 'Architecture' },
  { href: '#agents', label: 'Agents' },
  { href: '#performance', label: 'Performance' },
  { href: '#transparency', label: 'Transparency' },
  { href: '#contribute', label: 'Contribute' },
]

export function OmniaNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0F0F0F]/80 border-b"
      style={{ borderColor: 'rgba(212, 165, 116, 0.15)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold tracking-tight text-[#F5F0EB] hover:text-[#D4A574] transition-colors"
        >
          Omnia
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#A39B92] hover:text-[#D4A574] transition-colors font-[family-name:var(--font-space-grotesk)] tracking-tight"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#A39B92] hover:text-[#D4A574] transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden backdrop-blur-xl bg-[#0F0F0F]/95 border-b"
            style={{ borderColor: 'rgba(212, 165, 116, 0.15)' }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-[#A39B92] hover:text-[#D4A574] transition-colors font-[family-name:var(--font-space-grotesk)] tracking-tight py-2"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
