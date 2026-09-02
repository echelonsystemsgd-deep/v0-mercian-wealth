"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut, LayoutDashboard, Globe, ChevronRight, ArrowRight, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"
import { usePathname, useRouter } from "next/navigation"
import { SocialMediaLinks } from "@/components/social-media-links"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "What We Build" },
  { href: "/portfolio", label: "Prototypes" },
  { href: "/process", label: "Process" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href.startsWith("/#")) return false
    return pathname.startsWith(href)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
      document.body.classList.add("mobile-menu-open")
    } else {
      document.body.style.overflow = ""
      document.body.classList.remove("mobile-menu-open")
    }
    return () => {
      document.body.style.overflow = ""
      document.body.classList.remove("mobile-menu-open")
    }
  }, [isMobileMenuOpen])

  // Universal Hash-Scroll Handler (Accounts for dynamic client component hydration)
  const scrollToHashElement = useCallback((hashId: string) => {
    const cleanId = hashId.replace(/^#/, "")
    if (!cleanId) return

    let attempts = 0
    const tryScroll = () => {
      const el = document.getElementById(cleanId)
      if (el) {
        const headerOffset = 90
        const elementPosition = el.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: "smooth"
        })
      } else if (attempts < 12) {
        attempts++
        setTimeout(tryScroll, 80)
      }
    }

    // Small delay to allow react rendering/routing cycle to settle
    setTimeout(tryScroll, 50)
  }, [])

  // Listen for hash changes and initial page loads with hash
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      scrollToHashElement(window.location.hash)
    }
  }, [pathname, scrollToHashElement])

  // Universal Click Handler for Desktop & Mobile Nav Links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false)

    // Case 1: Clicking Home when already on Home
    if (href === "/" && pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    // Case 2: In-Page or Cross-Page Anchor Link (e.g. /#demo)
    if (href.startsWith("/#") || href.startsWith("#")) {
      const hash = href.replace(/^\/?#/, "")
      if (pathname === "/") {
        e.preventDefault()
        scrollToHashElement(hash)
      } else {
        router.push(href)
      }
      return
    }

    // Case 3: Standard Page Navigation
    if (href === pathname) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser(session.user)
          const { data: profileData } = await supabase
            .from("profiles")
            .select("first_name, last_name, avatar_url, role")
            .eq("id", session.user.id)
            .single()
          if (profileData) {
            setProfile(profileData)
          }
        }
      } catch (err) {
        console.error("Error fetching user data", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        try {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("first_name, last_name, avatar_url, role")
            .eq("id", session.user.id)
            .single()
          if (profileData) {
            setProfile(profileData)
          }
        } catch (err) {
          console.error("Error fetching profile", err)
        }
      } else {
        setUser(null)
        setProfile(null)
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
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

  // Logo click: smooth scroll to top on /, navigate home from other pages
  const handleLogoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMobileMenuOpen(false)
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname])

  const getInitials = () => {
    if (profile?.first_name || profile?.last_name) {
      return `${profile.first_name?.[0] || ""}${profile.last_name?.[0] || ""}`.toUpperCase()
    }
    return user?.email?.[0]?.toUpperCase() || "MW"
  }

  const getFullName = () => {
    if (profile?.first_name || profile?.last_name) {
      return `${profile.first_name || ""} ${profile.last_name || ""}`.trim()
    }
    if (user?.email) {
      return user.email.split("@")[0]
    }
    return "Mercian Wealth Member"
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col font-sans">
      <LiveTelemetryTicker />
      <header
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#09090B]/95 backdrop-blur-md border-b border-[#DCAE53]/20 shadow-2xl py-2.5 sm:py-3"
            : "bg-[#09090B]/80 backdrop-blur-sm border-b border-[#DCAE53]/10 py-3 sm:py-3.5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Lockup */}
            <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-lg overflow-hidden border border-[#DCAE53]/30 shadow-md">
                <BrandLogo variant="watermark" alt="Mercian Wealth" fill className="object-cover transition-transform group-hover:scale-105 duration-300" priority />
              </div>
              <span className="font-sans text-base sm:text-lg lg:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5 uppercase">
                <span>Mercian</span>
                <span className="text-[#DCAE53]">Wealth</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3">
              {navLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`whitespace-nowrap px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-all duration-200 ${
                      active
                        ? "text-[#DCAE53] bg-[#DCAE53]/10 font-bold"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex lg:items-center lg:gap-2.5 xl:gap-3">
              {/* User Account / Login Button */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-1.5 rounded-lg border border-[#DCAE53]/30 bg-[#111115] text-slate-200 hover:text-white hover:border-[#DCAE53] transition-all cursor-pointer">
                      <Avatar className="h-7 w-7 border border-[#DCAE53]/40">
                        <AvatarFallback className="bg-[#18181F] text-[#DCAE53] text-[10px] font-bold">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-semibold pr-1 hidden xl:inline max-w-[100px] truncate">{getFullName()}</span>
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-[#111115] text-slate-300 hover:text-white hover:border-[#DCAE53]/40 text-xs font-semibold transition-all whitespace-nowrap"
                >
                  <User size={13} className="text-[#DCAE53]" />
                  <span>Login</span>
                </Link>
              )}

              {/* WhatsApp Link */}
              <a
                href={SITE_COPY.navbar.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCAE53]/30 bg-[#111115] text-[#DCAE53] hover:bg-[#DCAE53]/10 hover:border-[#DCAE53]/60 text-xs font-bold transition-all whitespace-nowrap"
              >
                <span>WhatsApp</span>
              </a>

              {/* Primary Call / Audit CTA */}
              <Button
                asChild
                size="sm"
                className="bg-[#DCAE53] text-[#09090B] hover:bg-[#E5B85C] font-bold text-xs rounded-lg px-3.5 xl:px-4 py-2 transition-all duration-200 shadow-md whitespace-nowrap"
              >
                <Link href="/book">
                  <span>{SITE_COPY.navbar.ctaText}</span>
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/login"
                className="text-xs font-semibold text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-[#111115] border border-slate-800 flex items-center gap-1"
                aria-label="Login"
              >
                <User size={13} className="text-[#DCAE53]" />
                <span>Login</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-[#DCAE53] p-2 rounded-lg bg-white/5 border border-[#DCAE53]/25 transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={22} className="text-[#DCAE53]" /> : <Menu size={22} className="text-[#DCAE53]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 h-[100dvh] bg-[#09090B]/98 backdrop-blur-3xl z-[120] lg:hidden overflow-y-auto overflow-x-hidden flex flex-col justify-between min-w-0 max-w-full"
          >
            {/* Background Ambient Glow */}
            <div 
              className="absolute inset-0 pointer-events-none z-0 opacity-40 max-w-full"
              style={{
                background: "radial-gradient(circle at 50% 20%, rgba(220, 174, 83, 0.12) 0%, rgba(9, 9, 11, 0) 75%)"
              }}
            />

            {/* Mobile Drawer Top Header Bar */}
            <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#DCAE53]/20 bg-[#09090B]/95 backdrop-blur-md shrink-0 min-w-0 max-w-full">
              <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2.5">
                <div className="relative h-8 w-8 shrink-0 rounded-lg overflow-hidden border border-[#DCAE53]/30">
                  <BrandLogo
                    variant="watermark"
                    alt="Mercian Wealth"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-sans text-base font-extrabold text-white flex items-center gap-1 uppercase">
                  <span>Mercian</span>
                  <span className="text-[#DCAE53]">Wealth</span>
                </span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-[#DCAE53] p-2 rounded-lg bg-white/5 border border-[#DCAE53]/30 transition-all cursor-pointer shrink-0"
                aria-label="Close menu"
              >
                <X size={20} className="text-[#DCAE53]" />
              </button>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex-1 px-4 sm:px-6 pt-6 pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))] space-y-6 flex flex-col justify-between min-w-0 max-w-full">
              
              {/* Telemetry Status Pill */}
              <div className="flex items-center justify-between px-3.5 py-2 rounded-lg bg-[#111115] border border-[#DCAE53]/25 font-mono text-[10px] sm:text-xs">
                <span className="flex items-center gap-2 text-[#DCAE53] font-bold uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  STOREFRONTS · AUTOMATION
                </span>
                <span className="text-slate-400 uppercase tracking-widest font-medium">7-DAY LAUNCH</span>
              </div>

              {/* Styled Navigation Links */}
              <div className="space-y-1.5 flex-1">
                {navLinks.map((link, idx) => {
                  const active = isActive(link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center justify-between p-3.5 rounded-lg border transition-all duration-200 group ${
                        active
                          ? "bg-[#DCAE53]/15 border-[#DCAE53]/40 text-[#DCAE53] font-bold shadow-[0_0_15px_rgba(220,174,83,0.15)]"
                          : "bg-[#111115]/80 border-slate-800/80 text-slate-200 hover:text-white hover:bg-[#111115] hover:border-[#DCAE53]/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-xs ${active ? "text-[#DCAE53]" : "text-slate-500"}`}>
                          0{idx + 1}.
                        </span>
                        <span className="font-sans text-base font-bold tracking-tight">{link.label}</span>
                      </div>
                      <ChevronRight size={16} className={`transition-transform duration-200 ${active ? "text-[#DCAE53] translate-x-1" : "text-slate-500 group-hover:text-white group-hover:translate-x-1"}`} />
                    </Link>
                  )
                })}
              </div>

              {/* Dual Mobile Action CTAs */}
              <div className="space-y-2.5 pt-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-slate-800 bg-[#111115] text-slate-200 hover:text-white hover:border-[#DCAE53]/40 font-bold text-xs transition-all"
                >
                  <User size={14} className="text-[#DCAE53]" />
                  <span>{user ? "Access Client Portal" : "Client & Staff Login"}</span>
                </Link>

                <a
                  href={SITE_COPY.navbar.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg border border-[#DCAE53]/40 bg-[#111115] text-[#DCAE53] hover:bg-[#DCAE53]/10 font-bold text-sm transition-all"
                >
                  <span>Message on WhatsApp</span>
                </a>

                <Button
                  asChild
                  className="w-full py-6 text-sm font-bold bg-[#DCAE53] text-[#09090B] hover:bg-[#E5B85C] rounded-lg transition-all"
                >
                  <Link href="/book" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2">
                    <span>{SITE_COPY.navbar.ctaText}</span>
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>

              {/* Footer Row */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between shrink-0">
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                  © 2026 Mercian Wealth
                </span>
                <SocialMediaLinks />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
