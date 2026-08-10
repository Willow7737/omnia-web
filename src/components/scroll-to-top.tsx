'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/*
 * ScrollToTop — DESIGN.md §14.
 *
 * Two conditions, both required:
 *   1. The reader is more than ~1.5 screens down the page.
 *   2. The reader is moving upward.
 *
 * The direction condition matters: someone still reading downward has
 * not asked to leave, and covering their content with a button while
 * they read is the thing people complain about.
 *
 * Rides on scroll/scrollend notifications, so it needs no controller
 * plumbing at the call site — just drop it inside the page.
 */
const SCREENS_DOWN = 1.5
const VELOCITY_THRESHOLD = 1 // px upward between scroll events

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const lastY = useRef(0)
  const lastT = useRef(0)

  const onScroll = useCallback(() => {
    const y = window.scrollY
    const t = performance.now()
    const dy = y - lastY.current
    const dt = Math.max(1, t - lastT.current)
    const velocity = dy / dt // px per ms — negative means scrolling up

    const farEnough = y > window.innerHeight * SCREENS_DOWN
    const movingUp = velocity < -VELOCITY_THRESHOLD

    // Once visible, hide only when the reader has scrolled back near the top
    // OR is moving downward strongly — covering content while reading is the
    // failure mode we're avoiding.
    setVisible((prev) => {
      if (movingUp && farEnough) return true
      if (prev && !farEnough) return false
      if (prev && velocity > VELOCITY_THRESHOLD * 4) return false
      return prev
    })

    lastY.current = y
    lastT.current = t
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  // Don't render anything until we need to — one fewer node in the layout.
  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="scroll-top-in pressable active:pressable-active fixed bottom-6 right-6 z-40 inline-flex items-center justify-center size-10 rounded-full border border-border bg-card/95 backdrop-blur-xl text-foreground shadow-lg hover:bg-muted"
    >
      <ArrowUp size={16} aria-hidden />
    </button>
  )
}
