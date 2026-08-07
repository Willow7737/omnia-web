"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Zap } from "lucide-react";
import Link from "next/link";
import { withBasePath } from "@/lib/base-path";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden aurora-glow aurora-animate">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(oklch(0.97 0.005 260 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.97 0.005 260 / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[oklch(0.4_0.2_300/0.08)] blur-[100px] animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[oklch(0.4_0.18_250/0.06)] blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.6_0.18_280)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[oklch(0.65_0.18_280)]" />
              </span>
              <span className="text-sm font-mono text-[oklch(0.7_0.1_280)] tracking-wide">v0.1.76 live on testnet</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="block text-[oklch(0.97_0.005_260)]">Settlement</span>
            <span className="block"><span className="gradient-text">agnostic</span></span>
            <span className="block text-[oklch(0.97_0.005_260)]">DAG consensus</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-[oklch(0.6_0.02_260)] max-w-2xl mb-10 leading-relaxed"
          >
            Causal graph consensus with BFT finality proven across three continents. Public domain. No entity owns it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <Link href={withBasePath("/docs")} className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white tracking-wide">
              <Zap className="w-4 h-4" /> Read the Docs
            </Link>
            <Link href={withBasePath("/architecture")} className="btn-glow-outline inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-[oklch(0.85_0.01_260)] tracking-wide">
              View Architecture <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16"
          >
            <div className="glass-card-strong rounded-2xl p-6 max-w-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[oklch(0.6_0.18_280)]" />
                  <span className="text-sm font-mono text-[oklch(0.6_0.02_260)] uppercase tracking-wider">Network Status</span>
                </div>
                <span className="text-xs font-mono text-[oklch(0.5_0.02_260)]">3 nodes · 3 continents</span>
              </div>
              <div className="space-y-3">
                {[
                  { loc: "Nuremberg", status: "finalizing", color: "oklch(0.6 0.14 155)" },
                  { loc: "Ashburn", status: "finalizing", color: "oklch(0.6 0.14 155)" },
                  { loc: "Singapore", status: "finalizing", color: "oklch(0.6 0.14 155)" },
                ].map((node) => (
                  <div key={node.loc} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full pulse-dot" style={{ backgroundColor: node.color }} />
                      <span className="text-sm text-[oklch(0.75_0.01_260)]">{node.loc}</span>
                    </div>
                    <span className="text-xs font-mono text-[oklch(0.5_0.02_260)] capitalize">{node.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[oklch(0.055_0.008_260)] to-transparent pointer-events-none" />
    </section>
  );
}
