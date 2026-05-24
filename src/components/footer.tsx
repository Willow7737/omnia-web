'use client'

import { Github, MessageCircle, FileText } from 'lucide-react'

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
            <Github size={14} />
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
            href="https://github.com/Willow7737/omnia-protocol"
            target="_blank"
            rel="noopener noreferrer"
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
