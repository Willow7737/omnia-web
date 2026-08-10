'use client'

import { withBasePath } from '@/lib/base-path'
import Image from 'next/image'
import Link from 'next/link'

function GitHubIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

const footerLinks = [
  {
    title: 'Protocol',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Architecture', href: '/architecture' },
      { label: 'Roadmap', href: '/roadmap' },
      { label: 'Use Cases', href: '/use-cases' },
    ],
  },
  {
    title: 'Develop',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Security', href: '/security' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Community', href: '/community' },
      { label: 'Code of Conduct', href: '/conduct' },
      { label: 'Support', href: '/donate' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Wallet Privacy', href: '/wallet/privacy' },
      { label: 'Wallet Terms', href: '/wallet/terms' },
      { label: 'Delete Account', href: '/wallet/delete-account' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="section-white border-t border-border mt-auto">
      <div className="max-w-[980px] mx-auto px-6 py-12">
        {/* Brand row */}
        <div className="flex items-center gap-2.5 mb-10">
          <Image src={withBasePath("/omnia-mark.png")} alt="" width={24} height={24} />
          <span className="font-display text-[16.9px] font-bold text-foreground lowercase">
            omnia<span className="text-foreground/45"> protocol</span>
          </span>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-[11.3px] uppercase text-muted-foreground font-sans mb-3">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="link-underline text-[13.1px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11.3px] text-muted-foreground/70 lowercase">
            settlement-agnostic dag consensus — cc0 public domain
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/Willow7737/omnia-protocol"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 text-[13.1px]"
            >
              <GitHubIcon size={13} />
              <span>GitHub</span>
            </a>
            <a
              href="https://discord.gg/qYkpAeSYR"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors text-[13.1px]"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
