'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { OmniaNav } from './omnia-nav'

interface PageHeaderProps {
  title: string
  description: string
  breadcrumbs?: { label: string; href?: string }[]
  /** Kept for call-site compatibility; both variants share the light system now. */
  variant?: 'dark' | 'light'
}

export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <>
      <OmniaNav />
      <div className="relative pt-24 pb-16 sm:pb-20 px-6 section-paper page-hero-gradient border-b border-border overflow-hidden">
        <div className="dither absolute top-0 right-0 w-48 h-48 [mask-image:linear-gradient(225deg,black,transparent_70%)] opacity-60 pointer-events-none" aria-hidden />
        <div className="max-w-[980px] mx-auto relative">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1.5 text-[12px] mb-6 text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <ChevronRight size={10} />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-foreground transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-foreground">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <h1 className="font-sans text-[48px] sm:text-[56px] md:text-[64px] font-bold mb-5 leading-[1.1] text-foreground">
            {title}
          </h1>
          <p className="text-[17px] sm:text-[19px] leading-[1.5] max-w-[600px] text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </>
  )
}
