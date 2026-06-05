'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { OmniaNav } from './omnia-nav'

interface PageHeaderProps {
  title: string
  description: string
  breadcrumbs?: { label: string; href?: string }[]
}

export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <>
      <OmniaNav />
      <div className="pt-20 pb-16 px-6">
        <div className="max-w-[980px] mx-auto">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1.5 text-[12px] text-[#86868B] mb-6 font-[family-name:var(--font-geist-sans)]">
              <Link href="/" className="hover:text-[#F5F5F7] transition-colors">Home</Link>
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <ChevronRight size={10} />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-[#F5F5F7] transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[#F5F5F7]">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-[48px] sm:text-[56px] font-bold tracking-[-0.03em] text-[#F5F5F7] mb-4 leading-[1.1]">
            {title}
          </h1>
          <p className="text-[17px] text-[#86868B] leading-[1.5] max-w-[600px] font-[family-name:var(--font-geist-sans)]">
            {description}
          </p>
        </div>
      </div>
    </>
  )
}
