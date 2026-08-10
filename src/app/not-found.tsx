'use client'

import { withBasePath } from '@/lib/base-path'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Home } from 'lucide-react'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export default function NotFound() {
  return (
    <div className="section-paper min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Halftone texture bleeding in from the corners, like the mark */}
      <div className="dither absolute top-0 left-0 w-56 h-56 [mask-image:linear-gradient(135deg,black,transparent_70%)] pointer-events-none" aria-hidden />
      <div className="dither absolute bottom-0 right-0 w-56 h-56 [mask-image:linear-gradient(315deg,black,transparent_70%)] pointer-events-none" aria-hidden />

      <div className="relative z-10 text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Image
            src={withBasePath("/omnia-mark.png")}
            alt=""
            width={56}
            height={56}
            className="mx-auto mb-8 opacity-40"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="font-display text-[96px] sm:text-[120px] font-bold leading-none text-foreground block">
            404
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="text-[16.9px] sm:text-[18.8px] text-muted-foreground leading-[1.5] mt-5 mb-10"
        >
          This page drifted off the causal graph. It either never existed,
          was pruned, or moved somewhere we can no longer reach it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/"
            className="pressable active:pressable-active group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-[15px] font-medium hover:bg-primary/90 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Home size={15} />
            Back to safety
          </Link>
          <Link
            href="/docs"
            className="pressable active:pressable-active group inline-flex items-center gap-2 px-6 py-3 rounded-full text-[15px] font-medium border border-border bg-card text-foreground hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Read the Docs
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-mono text-[11.3px] text-muted-foreground/70 lowercase mt-12"
        >
          error: event not found in any finalized round
        </motion.p>
      </div>
    </div>
  )
}
