'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, MoonStar } from 'lucide-react'

/*
 * Three-theme cycle, matching the ALF palettes in globals.css (DESIGN.md §2):
 *   light → dim → dark → light
 *
 * `dim` is the default dark theme (background #151D28). `dark` is true black
 * for OLED, opt-in only. The icons are deliberately distinct so the user
 * can tell which dark mode they're in at a glance.
 *
 * Suppresses hydration mismatch by rendering a placeholder until mounted.
 */
const ORDER = ['light', 'dim', 'dark'] as const
type ThemeName = (typeof ORDER)[number]

const ICONS: Record<ThemeName, typeof Sun> = {
  light: Sun,
  dim: MoonStar,
  dark: Moon,
}

const LABELS: Record<ThemeName, string> = {
  light: 'Switch to dim',
  dim: 'Switch to dark (OLED)',
  dark: 'Switch to light',
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Stable SSR markup — a Sun-sized placeholder. Replaced on mount.
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={`inline-flex items-center justify-center size-8 rounded-full text-muted-foreground ${className}`}
        // Block interaction until hydrated.
        disabled
      >
        <Sun size={15} className="opacity-0" aria-hidden />
      </button>
    )
  }

  const current = (theme as ThemeName | undefined) ?? 'light'
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length] as ThemeName
  const Icon = ICONS[current]

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={LABELS[current]}
      title={LABELS[current]}
      className={`pressable inline-flex items-center justify-center size-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted active:pressable-active transition-colors ${className}`}
    >
      <Icon size={15} aria-hidden />
    </button>
  )
}
