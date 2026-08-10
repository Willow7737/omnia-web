'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { Sun, Moon, MoonStar } from 'lucide-react'

/*
 * Three-theme cycle, matching the ALF palettes in globals.css (DESIGN.md §2):
 *   light → dim → dark → light
 *
 * `dim` is the default dark theme (background #151D28). `dark` is true black
 * for OLED, opt-in only. The icons are deliberately distinct so the user
 * can tell which dark mode they're in at a glance.
 *
 * Hydration safety: we read "is the client mounted?" via useSyncExternalStore
 * — server snapshot returns false, client snapshot returns true. No effect,
 * no setState, no cascading render (the pattern flagged by
 * `react-hooks/set-state-in-effect`).
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

// useSyncExternalStore plumbing — we don't actually subscribe to anything;
// we just need a stable way to distinguish server vs. client render.
const emptySubscribe = () => () => {}
const getMounted = () => true
const getServerSnapshot = () => false

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(emptySubscribe, getMounted, getServerSnapshot)

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
        <Sun size={14} className="opacity-0" aria-hidden />
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
      <Icon size={14} aria-hidden />
    </button>
  )
}
