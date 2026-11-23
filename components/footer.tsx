"use client"

import { BrandLogo } from "@/components/brand-logo"
import Link from "next/link"
import { Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer id="site-footer" className="relative bg-[#0d0908] border-t border-white/[0.08] text-zinc-400 pt-12 pb-28 sm:pb-32 px-6 sm:px-12 lg:px-20 z-10">
      <div className="max-w-7xl mx-auto flex flex-col space-y-8">
        
        {/* Top Row: Logo, Minimal Links, Direct Contact */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative h-6 w-6 flex items-center justify-center shrink-0 text-[#E08A68]">
              <svg className="w-5 h-5" viewBox="0 0 45 45" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10c1.5-3 5-4.5 7-2 1.5 2-.5 4-.5 5.5s1 2.5 3 2.5c2 0 4.5-1 4.5 2 0 3-4 6-6 8s-3.5 4-3.5 7h-9c0-3 1-5 2.5-7.5s3-4.5 1.5-9.5c-.8-2.5-3-4-2-6 1-2 1.5-1.5 2-.5z" fill="currentColor" fillOpacity="0.9" />
                <path d="M12 36h21v3H12z" fill="currentColor" />
                <path d="M15 32h15v4H15z" fill="currentColor" />
              </svg>
            </div>
            <span className="font-mono text-xs font-bold tracking-widest text-white uppercase">
              <span>MERCIAN</span> <span className="text-[#E08A68]">WEALTH</span>
            </span>
          </Link>

          {/* Minimal 4 Page Links */}
          <nav className="flex items-center gap-6 sm:gap-8 font-mono text-[11px] uppercase tracking-wider">
            <Link href="/services" className="hover:text-white transition-colors">Software</Link>
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
