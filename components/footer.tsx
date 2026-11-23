"use client"

import { BrandLogo } from "@/components/brand-logo"
import Link from "next/link"
import { Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer id="site-footer" className="relative bg-[#070709] border-t border-white/[0.08] text-zinc-400 py-12 px-6 sm:px-12 lg:px-20 z-10">
      <div className="max-w-7xl mx-auto flex flex-col space-y-8">
        
        {/* Top Row: Logo, Minimal Links, Direct Contact */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative h-7 w-7 rounded-lg overflow-hidden border border-[#E2B857]/40 shadow-md shrink-0">
              <BrandLogo variant="watermark" alt="Mercian Wealth" fill className="object-cover" priority />
            </div>
            <span className="font-serif text-xs font-bold tracking-widest text-white uppercase">
              <span>MERCIAN</span> <span className="text-[#E2B857]">WEALTH</span>
            </span>
          </Link>

          {/* Minimal 4 Page Links */}
          <nav className="flex items-center gap-6 sm:gap-8 font-mono text-[11px] uppercase tracking-wider">
            <Link href="/services" className="hover:text-white transition-colors">Solutions</Link>
            <Link href="/portfolio" className="hover:text-white transition-colors">Work</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>

          {/* Direct Email */}
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-300">
            <Mail size={13} className="text-[#E2B857]" />
            <a href="mailto:info@mercianwealth.com" className="hover:text-[#E2B857] transition-colors">
              info@mercianwealth.com
            </a>
          </div>

        </div>

        {/* Bottom Row: Legal & Sovereignty */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-zinc-500">
          <span>&copy; {new Date().getFullYear()} Mercian Wealth. All rights reserved. United Kingdom.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms</Link>
            <Link href="/login" rel="nofollow" className="hover:text-zinc-300 transition-colors">Client Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
