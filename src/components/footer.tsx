'use client'

import { MessageCircle, FileText } from 'lucide-react'

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer
      className="border-t mt-auto"
      style={{ borderColor: 'rgba(212, 165, 116, 0.15)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#A39B92] font-[family-name:var(--font-space-grotesk)]">
          Omnia Protocol — CC0 Public Domain · Built with care, not hype
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Willow7737/omnia-protocol"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A39B92] hover:text-[#D4A574] transition-colors flex items-center gap-1.5 text-sm"
          >
            <GitHubIcon size={14} />
            <span className="font-[family-name:var(--font-space-grotesk)]">GitHub</span>
          </a>
          <a
            href="https://discord.gg/qYkpAeSYR"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A39B92] hover:text-[#D4A574] transition-colors flex items-center gap-1.5 text-sm"
          >
            <MessageCircle size={14} />
            <span className="font-[family-name:var(--font-space-grotesk)]">Discord</span>
          </a>
          <a
            href="/docs"
            className="text-[#A39B92] hover:text-[#D4A574] transition-colors flex items-center gap-1.5 text-sm"
          >
            <FileText size={14} />
            <span className="font-[family-name:var(--font-space-grotesk)]">Docs</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
