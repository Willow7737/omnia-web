'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#architecture', label: 'Architecture' },
  { href: '#agents', label: 'Agents' },
  { href: '#performance', label: 'Performance' },
  { href: '#transparency', label: 'Transparency' },
  { href: '#events', label: 'Events' },
  { href: '#contribute', label: 'Contribute' },
]

export function OmniaNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const scrollToSection = useCallback((href: string) => {
    const target = document.querySelector(href)
    if (target) {
      const navHeight = 64 // h-16 = 4rem = 64px
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    // Delay scroll to let the mobile menu close animation finish
    setTimeout(() => scrollToSection(href), 250)
  }, [scrollToSection])

  const handleTouchNavClick = useCallback((e: React.TouchEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    e.stopPropagation()
    setMobileOpen(false)
    setTimeout(() => scrollToSection(href), 250)
  }, [scrollToSection])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0F0F0F]/80 border-b"
      style={{ borderColor: 'rgba(212, 165, 116, 0.15)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
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
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm text-[#A39B92] hover:text-[#D4A574] transition-colors font-[family-name:var(--font-space-grotesk)] tracking-tight"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#A39B92] hover:text-[#D4A574] transition-colors touch-manipulation"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 top-16 bg-black/40 z-40"
              onClick={() => setMobileOpen(false)}
            />
            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed top-16 left-0 right-0 z-50 overflow-hidden backdrop-blur-xl bg-[#0F0F0F]/98 border-b"
              style={{ borderColor: 'rgba(212, 165, 116, 0.15)' }}
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    onTouchEnd={(e) => handleTouchNavClick(e, link.href)}
                    className="text-base text-[#A39B92] hover:text-[#D4A574] active:text-[#D4A574] active:bg-[rgba(212,165,116,0.08)] transition-colors font-[family-name:var(--font-space-grotesk)] tracking-tight py-3.5 block rounded-md px-3 touch-manipulation"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
