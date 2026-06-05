'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { OmniaNav } from './omnia-nav'

interface PageHeaderProps {
  title: string
  description: string
  breadcrumbs?: { label: string; href?: string }[]
  variant?: 'dark' | 'light'
}

export function PageHeader({ title, description, breadcrumbs, variant = 'dark' }: PageHeaderProps) {
  const isDark = variant === 'dark'

  return (
    <>
      <OmniaNav />
      <div className={`pt-20 pb-16 sm:pb-20 px-6 ${isDark ? 'section-dark' : 'section-light'} page-hero-gradient`}>
        <div className="max-w-[980px] mx-auto">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className={`flex items-center gap-1.5 text-[12px] mb-6 font-[family-name:var(--font-geist-sans)] ${isDark ? 'text-[#86868B]' : 'text-[#6E6E73]'}`}>
              <Link href="/" className={`hover:${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'} transition-colors`}>Home</Link>
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <ChevronRight size={10} />
                  {crumb.href ? (
                    <Link href={crumb.href} className={`hover:${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'} transition-colors`}>
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}>{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <h1 className={`font-[family-name:var(--font-space-grotesk)] text-[48px] sm:text-[56px] md:text-[64px] font-bold tracking-[-0.03em] mb-5 leading-[1.1] ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>
            {title}
          </h1>
          <p className={`text-[17px] sm:text-[19px] leading-[1.5] max-w-[600px] font-[family-name:var(--font-geist-sans)] ${isDark ? 'text-[#86868B]' : 'text-[#6E6E73]'}`}>
            {description}
          </p>
        </div>
      </div>
    </>
  )
}
