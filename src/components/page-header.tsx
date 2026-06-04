'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface PageHeaderProps {
  title: string
  description: string
  breadcrumbs?: { label: string; href?: string }[]
}

export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="page-hero-gradient pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-[#A39B92] mb-6 font-[family-name:var(--font-space-grotesk)]">
            <Link href="/" className="hover:text-[#D4A574] transition-colors">Home</Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={10} />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-[#D4A574] transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#F5F0EB]">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold tracking-[-0.02em] text-[#F5F0EB] mb-4">
          {title}
        </h1>
        <p className="text-lg text-[#A39B92] leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  )
}
