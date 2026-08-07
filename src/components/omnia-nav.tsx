"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { withBasePath } from "@/lib/base-path";

const navLinks = [
  { label: "Protocol", href: "/" },
  { label: "Architecture", href: "/architecture" },
  { label: "Docs", href: "/docs" },
  { label: "FAQ", href: "/faq" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "About", href: "/about" },
];

export function OmniaNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollToSection = useCallback((href: string) => {
    const target = document.querySelector(href);
    if (target) {
      const navHeight = 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent, href: string, isAnchor?: boolean) => {
    if (isAnchor) {
      e.preventDefault();
      setMobileOpen(false);
      setTimeout(() => scrollToSection(href), 250);
    } else {
      setMobileOpen(false);
    }
  }, [scrollToSection]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[oklch(0.055_0.008_260/0.8)] backdrop-blur-xl border-b border-[oklch(0.2_0.015_260/0.3)]"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16">
            <Link href={withBasePath("/")} className="flex items-center gap-2.5 group" onClick={(e) => handleNavClick(e, "/")}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[oklch(0.6_0.18_280)] to-[oklch(0.55_0.16_250)] flex items-center justify-center shadow-[0_0_16px_oklch(0.6_0.18_280/0.3)]">
                <span className="text-white text-xs font-bold font-mono">O</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-[oklch(0.97_0.005_260)]" style={{ fontFamily: 'var(--font-heading)' }}>omnia</span>
              <span className="text-lg font-medium tracking-tight text-[oklch(0.5_0.02_260)]" style={{ fontFamily: 'var(--font-heading)' }}>protocol</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={withBasePath(link.href)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive
                        ? "text-[oklch(0.97_0.005_260)] bg-[oklch(0.15_0.02_280/0.3)]"
                        : "text-[oklch(0.55_0.02_260)] hover:text-[oklch(0.85_0.01_260)] hover:bg-[oklch(0.15_0.02_280/0.15)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://github.com/Willow7737/omnia"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow-outline px-4 py-2 rounded-lg text-sm font-medium text-[oklch(0.75_0.01_260)]"
              >
                GitHub
              </a>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[oklch(0.75_0.01_260)] hover:bg-[oklch(0.15_0.02_280/0.2)] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </header>

      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-[oklch(0_0_0/0.6)] backdrop-blur-sm z-40 md:hidden" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-x-4 top-20 z-50 md:hidden">
            <div className="glass-card-strong rounded-2xl p-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={withBasePath(link.href)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`block px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                      isActive
                        ? "text-[oklch(0.97_0.005_260)] bg-[oklch(0.15_0.02_280/0.4)]"
                        : "text-[oklch(0.6_0.02_260)] hover:text-[oklch(0.85_0.01_260)] hover:bg-[oklch(0.15_0.02_280/0.2)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="border-t border-[oklch(0.2_0.015_260/0.3)] mt-2 pt-2 px-4 pb-2">
                <a href="https://github.com/Willow7737/omnia" target="_blank" rel="noopener noreferrer" className="block py-2 text-sm text-[oklch(0.6_0.02_260)] hover:text-[oklch(0.85_0.01_260)] transition-colors">
                  GitHub →
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
