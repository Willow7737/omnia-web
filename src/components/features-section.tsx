"use client";

import { motion } from "framer-motion";
import { GitBranch, ShieldCheck, Fingerprint, Cpu, Vote, Bot } from "lucide-react";

const features = [
  { icon: GitBranch, title: "Causal Graph Consensus", description: "DAG + vector clocks + CRDTs for parallel transaction processing with 24.5 µs p50 single-node finality and deterministic convergence.", gradient: "from-[oklch(0.55_0.2_300)] to-[oklch(0.5_0.18_250)]" },
  { icon: ShieldCheck, title: "ZK-Rollup Settlement", description: "Settlement-agnostic rollups on any DA layer — Ethereum, Celestia, and more. Groth16 proofs on BN254.", gradient: "from-[oklch(0.5_0.18_250)] to-[oklch(0.55_0.16_200)]" },
  { icon: Fingerprint, title: "Post-Quantum Security", description: "CRYSTALS-Dilithium + Ed25519 hybrid signatures. Forward-compatible cryptographic agility at the protocol layer.", gradient: "from-[oklch(0.55_0.16_200)] to-[oklch(0.6_0.14_155)]" },
  { icon: Cpu, title: "Self-Sovereign Identity", description: "did:omnia: method with Shamir's Secret Sharing recovery and BLAKE3 biometric anchors. Identity you can lose and reclaim.", gradient: "from-[oklch(0.6_0.14_155)] to-[oklch(0.55_0.18_280)]" },
  { icon: Vote, title: "Universal Basic Compute", description: "Soulbound monthly quotas, quadratic voting with exponential reputation decay, and time-locked governance.", gradient: "from-[oklch(0.55_0.18_280)] to-[oklch(0.6_0.2_340)]" },
  { icon: Bot, title: "Agent Coordination", description: "AI agents with delegated did:omnia: identity, 5 capability types, and least privilege enforced by construction.", gradient: "from-[oklch(0.6_0.2_340)] to-[oklch(0.55_0.2_300)]" },
];

export function FeaturesSection() {
  return (
    <section className="section-void section-spacing aurora-glow aurora-glow-vivid aurora-animate relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="text-[oklch(0.97_0.005_260)]">Built </span><span className="gradient-text">different.</span>
          </h2>
          <p className="text-lg text-[oklch(0.55_0.02_260)] max-w-2xl leading-relaxed">Six pillars of infrastructure. Every layer built with mathematical guarantees.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}>
              <div className="glass-card rounded-2xl p-6 h-full group hover:border-[oklch(0.3_0.05_280/0.5)] transition-all duration-500">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:shadow-[0_0_24px_oklch(0.6_0.18_280/0.25)] transition-shadow duration-500`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[oklch(0.95_0.005_260)] mb-3 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>{feature.title}</h3>
                <p className="text-sm text-[oklch(0.55_0.02_260)] leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
