"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard, 
  ChevronDown, 
  ChevronRight,
  ArrowRight, 
  PhoneCall, 
  Navigation, 
  Box, 
  Zap, 
  Cpu, 
  Calculator, 
  Activity, 
  Sparkles,
  ShieldCheck,
  Calendar,
  CreditCard,
  Mail,
  MessageSquare,
  Globe,
  Smartphone,
  Layers
} from "lucide-react"
import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { LiveTelemetryTicker } from "@/components/live-telemetry-ticker"
import { SITE_COPY } from "@/lib/site-copy"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<"solutions" | "sandboxes" | null>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  // Fetch Supabase session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch {}
    setUser(null)
    setProfile(null)
    router.push("/")
    router.refresh()
  }

  // Manage scroll position: manual restoration ensures pages never land at stale bottom scroll
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }
  }, [])

  // Lock body and html scroll when mobile drawer is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
      document.body.style.touchAction = "none"
    } else {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
      document.body.style.touchAction = ""
    }
    return () => {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
      document.body.style.touchAction = ""
    }
  }, [isMobileMenuOpen])

  // When route changes from another page, ensure instant landing at top (no bottom-to-top animated scroll)
  const prevPathnameRef = useRef(pathname)
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
      }
      prevPathnameRef.current = pathname
    }
  }, [pathname])

  // Handle Logo and Home click:
  // If ALREADY on landing page ("/") -> smooth animated scroll up to top
  // If ELSEWHERE on site -> navigate to "/" and land immediately at top (0 animation)
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
      }
    }
  }

  const handleMouseEnter = (menu: "solutions" | "sandboxes") => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setActiveDropdown(menu)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex flex-col font-sans pointer-events-none">
      
      {/* Top Telemetry Ticker (Pointers enabled) */}
      <div className="pointer-events-auto">
        <LiveTelemetryTicker />
      </div>

      {/* Floating Pill Navbar Container (Carbon Zinc Surface) */}
      <div className="w-full flex justify-center px-3 sm:px-6 pt-2 sm:pt-3">
        <header
          className={`pointer-events-auto w-full max-w-7xl transition-all duration-200 rounded-full border bg-[#0B0B0D] shadow-2xl ${
            isScrolled
              ? "border-white/20 py-2 px-4 sm:px-6"
              : "border-white/10 py-2.5 px-4 sm:px-6"
          } flex items-center justify-between flex-nowrap`}
        >
          {/* Brand Logo & Name */}
          <Link 
            href="/" 
            onClick={handleHomeClick}
            prefetch={true}
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0 whitespace-nowrap cursor-pointer"
          >
            <div className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-lg overflow-hidden border border-[#DCAE53]/40 shadow-md shrink-0">
              <BrandLogo variant="watermark" alt="Mercian Wealth" fill className="object-cover transition-transform group-hover:scale-105 duration-300" priority />
            </div>
            <span className="font-sans text-xs sm:text-sm font-extrabold tracking-tight text-white flex items-center gap-1 uppercase whitespace-nowrap">
              <span>Mercian</span>
              <span className="text-[#DCAE53]">Wealth</span>
            </span>
          </Link>

          {/* Desktop Navigation Spaced Evenly on One Line (No Wrapping) */}
          <nav className="hidden lg:flex items-center justify-center gap-1.5 xl:gap-2.5 flex-nowrap shrink-0">
            
            <Link
              href="/"
              onClick={handleHomeClick}
              prefetch={true}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                pathname === "/" 
                  ? "text-[#DCAE53] bg-[#DCAE53]/10 font-bold" 
                  : "text-slate-300 hover:text-white hover:bg-[#18181F]"
              }`}
            >
              Home
            </Link>

            {/* Dropdown 1: Solutions */}
            <div 
              className="relative shrink-0"
              onMouseEnter={() => handleMouseEnter("solutions")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services"
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeDropdown === "solutions" || pathname === "/services"
                    ? "text-[#DCAE53] bg-[#DCAE53]/10 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-[#18181F]"
                }`}
              >
                <span className="whitespace-nowrap">Solutions</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${activeDropdown === "solutions" ? "rotate-180 text-[#DCAE53]" : "text-slate-400"}`} />
              </Link>

              <AnimatePresence>
                {activeDropdown === "solutions" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-[400px] bg-[#111115] border border-[#DCAE53]/35 rounded-2xl p-3 shadow-2xl space-y-1 z-50"
                  >
                    <div className="px-3 py-1.5 border-b border-slate-800 flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold text-[#DCAE53] uppercase tracking-wider">AI Solutions</span>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Outcome-Driven</span>
                    </div>

                    <Link
                      href="/services#storefronts"
                      onClick={() => setActiveDropdown(null)}
                      prefetch={true}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#18181F] transition-all group text-left"
                    >
                      <div className="p-2 rounded-lg bg-[#18181F] group-hover:bg-[#DCAE53] text-[#DCAE53] group-hover:text-[#09090B] transition-colors shrink-0 mt-0.5">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#DCAE53] transition-colors">Sub-Second Mobile Storefronts</div>
                        <p className="text-[11px] text-slate-400 leading-snug">Loads in &lt;400ms to eliminate mobile visitor bounce rates completely.</p>
                      </div>
                    </Link>

                    <Link
                      href="/services#builders"
                      onClick={() => setActiveDropdown(null)}
                      prefetch={true}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#18181F] transition-all group text-left"
                    >
                      <div className="p-2 rounded-lg bg-[#18181F] group-hover:bg-[#DCAE53] text-[#DCAE53] group-hover:text-[#09090B] transition-colors shrink-0 mt-0.5">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#DCAE53] transition-colors">3-Tap Order &amp; Booking Builders</div>
                        <p className="text-[11px] text-slate-400 leading-snug">Interactive intake flows that let clients configure and book in seconds.</p>
                      </div>
                    </Link>

                    <Link
                      href="/services#whatsapp"
                      onClick={() => setActiveDropdown(null)}
                      prefetch={true}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#18181F] transition-all group text-left"
                    >
                      <div className="p-2 rounded-lg bg-[#18181F] group-hover:bg-[#DCAE53] text-[#DCAE53] group-hover:text-[#09090B] transition-colors shrink-0 mt-0.5">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#DCAE53] transition-colors">Instant WhatsApp Lead Dispatch</div>
                        <p className="text-[11px] text-slate-400 leading-snug">Full customer intake specs pushed to your smartphone in under 5 seconds.</p>
                      </div>
                    </Link>

                    <Link
                      href="/services#deposits"
                      onClick={() => setActiveDropdown(null)}
                      prefetch={true}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#18181F] transition-all group text-left"
                    >
                      <div className="p-2 rounded-lg bg-[#18181F] group-hover:bg-[#DCAE53] text-[#DCAE53] group-hover:text-[#09090B] transition-colors shrink-0 mt-0.5">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#DCAE53] transition-colors">Upfront Stripe Deposit Checkout</div>
                        <p className="text-[11px] text-slate-400 leading-snug">Lock deposits with 1-click Apple &amp; Google Pay to eliminate no-shows.</p>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dropdown 2: Demos */}
            <div 
              className="relative shrink-0"
              onMouseEnter={() => handleMouseEnter("sandboxes")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/portfolio"
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeDropdown === "sandboxes" || pathname === "/portfolio"
                    ? "text-[#DCAE53] bg-[#DCAE53]/10 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-[#18181F]"
                }`}
              >
                <span className="whitespace-nowrap">Demos</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${activeDropdown === "sandboxes" ? "rotate-180 text-[#DCAE53]" : "text-slate-400"}`} />
              </Link>

              <AnimatePresence>
                {activeDropdown === "sandboxes" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-[360px] bg-[#111115] border border-[#DCAE53]/35 rounded-2xl p-3 shadow-2xl space-y-1 z-50"
                  >
                    <div className="px-3 py-1.5 border-b border-slate-800 flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold text-[#DCAE53] uppercase tracking-wider">Live Verification</span>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Live Routes</span>
                    </div>


                    <Link
                      href="/#automation-flow"
                      onClick={() => setActiveDropdown(null)}
                      prefetch={true}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#18181F] transition-all group text-left"
                    >
                      <div className="p-2 rounded-lg bg-[#18181F] text-[#DCAE53] group-hover:bg-[#DCAE53] group-hover:text-[#09090B] transition-colors shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#DCAE53]">4-Step Revenue Visualizer</div>
                        <p className="text-[11px] text-slate-400">See how enquiries become booked appointments hands-off.</p>
                      </div>
                    </Link>

                    <Link
                      href="/portfolio"
                      onClick={() => setActiveDropdown(null)}
                      prefetch={true}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#18181F] transition-all group text-left"
                    >
                      <div className="p-2 rounded-lg bg-[#18181F] text-[#DCAE53] group-hover:bg-[#DCAE53] group-hover:text-[#09090B] transition-colors shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#DCAE53]">AI Deployments &amp; Case Studies</div>
                        <p className="text-[11px] text-slate-400">Explore verified client outcomes &amp; operational metrics.</p>
                      </div>
                    </Link>

                    <Link
                      href="/book"
                      onClick={() => setActiveDropdown(null)}
                      prefetch={true}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#18181F] transition-all group text-left"
                    >
                      <div className="p-2 rounded-lg bg-[#18181F] text-[#DCAE53] group-hover:bg-[#DCAE53] group-hover:text-[#09090B] transition-colors shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#DCAE53]">Request Free Working Prototype</div>
                        <p className="text-[11px] text-slate-400">See a working demo built for your business in 48h.</p>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/pricing"
              className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap shrink-0 ${
                pathname === "/pricing" 
                  ? "text-[#DCAE53] bg-[#DCAE53]/10 font-bold" 
                  : "text-slate-300 hover:text-white hover:bg-[#18181F]"
              }`}
            >
              Pricing
            </Link>

            <Link
              href="/process"
              className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap shrink-0 ${
                pathname === "/process" 
                  ? "text-[#DCAE53] bg-[#DCAE53]/10 font-bold" 
                  : "text-slate-300 hover:text-white hover:bg-[#18181F]"
              }`}
            >
              Protocol
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap shrink-0 ${
                pathname === "/contact" 
                  ? "text-[#DCAE53] bg-[#DCAE53]/10 font-bold" 
                  : "text-slate-300 hover:text-white hover:bg-[#18181F]"
              }`}
            >
              Contact
            </Link>

          </nav>

          {/* Right-Side Action Pills */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* User Account / Login */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1.5 p-1 rounded-full border border-[#DCAE53]/40 bg-[#18181F] text-slate-200 hover:text-white transition-all cursor-pointer">
                    <Avatar className="h-6 w-6 border border-[#DCAE53]/40">
                      <AvatarFallback className="bg-[#111115] text-[#DCAE53] text-[9px] font-bold">
                        MW
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-[#111115] border border-slate-800 text-slate-200">
                  <DropdownMenuLabel className="text-xs font-mono text-[#DCAE53] uppercase">Portal Access</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-800" />
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5">
                    <Link href={profile?.role === 'admin' ? '/admin' : '/client'} className="flex items-center gap-2 text-xs">
                      <LayoutDashboard size={14} className="text-[#DCAE53]" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-400 hover:bg-red-500/10 flex items-center gap-2 text-xs">
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                rel="nofollow"
                className="hidden xl:inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-800 bg-[#18181F] text-slate-300 hover:text-white hover:border-[#DCAE53]/40 text-xs font-semibold transition-all whitespace-nowrap"
              >
                <User size={12} className="text-[#DCAE53]" />
                <span>Login</span>
              </Link>
            )}

            {/* Primary Gold Pill CTA — hide on xs screens to give header breathing room */}
            <Link
              href="/book"
              className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] font-bold text-xs sm:text-sm transition-all shadow-lg shadow-[#DCAE53]/20 whitespace-nowrap group"
            >
              <span>Book a call</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Mobile Menu Hamburger Pill */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden min-h-[44px] flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#141417] text-zinc-200 hover:text-white border border-white/10 text-xs font-semibold transition-all cursor-pointer shadow-md"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 text-[#DAA640]" /> : <Menu className="w-4 h-4 text-[#DAA640]" />}
              <span className="text-[11px] font-mono uppercase tracking-wider">{isMobileMenuOpen ? "Close" : "Menu"}</span>
            </button>

          </div>
        </header>
      </div>

      {/* Luxury Slide-Over Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[99999] flex justify-end pointer-events-auto touch-none">
            {/* Soft Darkened Blur Backdrop (Tap outside to close) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              onTouchMove={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer touch-none"
            />

            {/* Slide-in Sheet (Right-anchored, never stretched into an empty void) */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative w-full max-w-[320px] sm:max-w-[360px] h-full bg-[#0B0B0D] border-l border-white/10 shadow-2xl flex flex-col justify-between p-4 sm:p-6 z-10 overflow-y-auto overscroll-contain touch-pan-y font-sans"
            >
              {/* Top Header */}
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <Link
                    href="/"
                    onClick={(e) => {
                      setIsMobileMenuOpen(false)
                      handleHomeClick(e)
                    }}
                    className="flex items-center gap-2.5"
                  >
                    <div className="relative h-8 w-8 rounded-lg overflow-hidden border border-[#DAA640]/40 shadow-md">
                      <BrandLogo variant="watermark" alt="Mercian Wealth" fill className="object-cover" priority />
                    </div>
                    <span className="font-sans text-sm font-extrabold tracking-tight text-white flex items-center gap-1 uppercase">
                      <span>Mercian</span>
                      <span className="text-[#DAA640]">Wealth</span>
                    </span>
                  </Link>

                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-[#141417] text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Close Navigation Menu"
                  >
                    <X className="w-5 h-5 text-zinc-300" />
                  </button>
                </div>

                {/* Mission Badge */}
                <div className="mb-5 p-3 rounded-xl bg-[#141417] border border-white/10 flex items-center gap-2.5 text-xs">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-[11px] font-mono text-zinc-400">
                    Mobile Storefronts · Order Builders · WhatsApp Dispatch
                  </span>
                </div>

                {/* Clean, Fast, Direct Navigation Links (No paragraphs, easy to navigate) */}
                <nav className="space-y-1.5">
                  {[
                    { name: "Home", href: "/", icon: Sparkles, badge: null },
                    { name: "AI Solutions", href: "/services", icon: Cpu, badge: "5 Systems" },
                    { name: "Workflow Visualizer", href: "/#automation-flow", icon: Zap, badge: "Interactive" },
                    { name: "Case Studies", href: "/portfolio", icon: Layers, badge: "Metrics" },
                    { name: "Pricing & Retainers", href: "/pricing", icon: CreditCard, badge: "Plans" },
                    { name: "Deployment Protocol", href: "/process", icon: Activity, badge: null },
                    { name: "Contact", href: "/contact", icon: Mail, badge: "UK HQ" },
                  ].map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all group cursor-pointer min-h-[44px] ${
                          isActive
                            ? "bg-[#DAA640]/15 text-[#DAA640] font-bold border border-[#DAA640]/30"
                            : "text-zinc-300 hover:bg-white/5 hover:text-white border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg border transition-colors ${
                            isActive 
                              ? "bg-[#DAA640] text-black border-[#DAA640]" 
                              : "bg-[#141417] text-[#DAA640] border-white/10 group-hover:border-[#DAA640]/40"
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-semibold tracking-tight">{item.name}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#141417] border border-white/10 text-zinc-400 group-hover:text-[#DAA640] transition-colors">
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </Link>
                    )
                  })}
                </nav>
              </div>

              {/* Bottom Action Deck */}
              <div className="pt-5 border-t border-white/10 shrink-0 space-y-2.5">
                <Link
                  href="/book"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#DAA640] hover:bg-[#E5B85C] text-black font-bold text-xs uppercase tracking-wider text-center shadow-lg shadow-[#DAA640]/20 flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+447851055929"
                    className="py-2.5 px-3 rounded-xl bg-[#141417] hover:bg-[#1c1c22] text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[44px]"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#DAA640]" />
                    <span>Call Direct</span>
                  </a>

                  <a
                    href={SITE_COPY.navbar.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="py-2.5 px-3 rounded-xl bg-[#141417] hover:bg-[#1c1c22] text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[44px]"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#DAA640]" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2 px-1">
                  <span>West Midlands &amp; Across UK</span>
                  <Link
                    href="/login"
                    rel="nofollow"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-zinc-400 hover:text-[#DAA640] transition-colors"
                  >
                    Client Login →
                  </Link>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
