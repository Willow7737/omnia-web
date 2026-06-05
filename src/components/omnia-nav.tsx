'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navSections = [
  {
    label: 'Protocol',
    items: [
      { href: '/about', label: 'About' },
      { href: '/architecture', label: 'Architecture' },
      { href: '/roadmap', label: 'Roadmap' },
      { href: '/use-cases', label: 'Use Cases' },
    ],
  },
  {
    label: 'Develop',
    items: [
      { href: '/docs', label: 'Documentation' },
      { href: '/security', label: 'Security' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    label: 'Community',
    items: [
      { href: '/community', label: 'Community' },
      { href: '/conduct', label: 'Code of Conduct' },
      { href: '/donate', label: 'Support' },
    ],
  },
]

const homeLinks = [
  { href: '#features', label: 'Features', isAnchor: true },
  { href: '#architecture', label: 'Architecture', isAnchor: true },
  { href: '#performance', label: 'Performance', isAnchor: true },
]

export function OmniaNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

  // Close dropdown on route change
  useEffect(() => {
    setDesktopDropdown(null)
    setMobileOpen(false)
  }, [pathname])

  const scrollToSection = useCallback((href: string) => {
    const target = document.querySelector(href)
    if (target) {
      const navHeight = 64
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string, isAnchor?: boolean) => {
    if (isAnchor) {
      e.preventDefault()
      setMobileOpen(false)
      setTimeout(() => scrollToSection(href), 250)
    } else {
      setMobileOpen(false)
    }
  }, [scrollToSection])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/70 border-b border-white/[0.08]">
      <div className="max-w-[980px] mx-auto px-6 h-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-[family-name:var(--font-space-grotesk)] text-[17px] font-semibold tracking-tight text-[#F5F5F7] hover:text-white transition-colors"
        >
          Omnia
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {isHome ? (
            <>
              {homeLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.isAnchor)}
                  className="text-[12px] text-[#86868B] hover:text-[#F5F5F7] transition-colors font-[family-name:var(--font-space-grotesk)] tracking-tight"
                >
                  {link.label}
                </a>
              ))}
            </>
          ) : null}

          {/* Dropdown sections */}
          {navSections.map((section) => (
            <div
              key={section.label}
              className="relative"
              onMouseEnter={() => setDesktopDropdown(section.label)}
              onMouseLeave={() => setDesktopDropdown(null)}
            >
              <button
                className="flex items-center gap-0.5 text-[12px] text-[#86868B] hover:text-[#F5F5F7] transition-colors font-[family-name:var(--font-space-grotesk)] tracking-tight"
              >
                {section.label}
                <ChevronDown size={10} className={`transition-transform duration-200 ${desktopDropdown === section.label ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {desktopDropdown === section.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 pt-2 min-w-[180px]"
                  >
                    <div className="bg-[#1D1D1F]/95 backdrop-blur-2xl rounded-xl border border-white/[0.08] overflow-hidden py-2 shadow-2xl">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-4 py-2 text-[13px] transition-colors ${
                            pathname === item.href
                              ? 'text-white bg-white/[0.06]'
                              : 'text-[#86868B] hover:text-white hover:bg-white/[0.04]'
                          } font-[family-name:var(--font-space-grotesk)]`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <a
            href="https://github.com/Willow7737/omnia-protocol"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-[#86868B] hover:text-[#F5F5F7] transition-colors font-[family-name:var(--font-space-grotesk)] tracking-tight"
          >
            GitHub
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#86868B] hover:text-[#F5F5F7] transition-colors touch-manipulation"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 top-12 bg-black/60 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed top-12 left-0 right-0 z-50 overflow-hidden backdrop-blur-2xl bg-black/95 border-b border-white/[0.08]"
            >
              <div className="px-6 py-4 flex flex-col">
                {isHome && (
                  <>
                    {homeLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href, link.isAnchor)}
                        className="text-[17px] text-[#F5F5F7] font-[family-name:var(--font-space-grotesk)] tracking-tight py-2.5 block"
                      >
                        {link.label}
                      </a>
                    ))}
                    <div className="h-px bg-white/[0.08] my-2" />
                  </>
                )}

                {navSections.map((section, i) => (
                  <div key={section.label}>
                    <div className="text-[11px] uppercase tracking-wider text-[#86868B] font-[family-name:var(--font-space-grotesk)] mt-3 mb-1 px-0">
                      {section.label}
                    </div>
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`text-[15px] font-[family-name:var(--font-space-grotesk)] tracking-tight py-2 block transition-colors ${
                          pathname === item.href ? 'text-white' : 'text-[#86868B]'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                    {i < navSections.length - 1 && <div className="h-px bg-white/[0.08] my-2" />}
                  </div>
                ))}

                <div className="h-px bg-white/[0.08] my-2" />
                <a
                  href="https://github.com/Willow7737/omnia-protocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] text-[#86868B] font-[family-name:var(--font-space-grotesk)] tracking-tight py-2 block"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
