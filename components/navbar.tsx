"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard, 
  ChevronRight,
  Sparkles,
  Layers,
  Cpu,
  CreditCard,
  Mail,
  Info
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BrandLogo } from "@/components/brand-logo"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useScrollDirection } from "@/hooks/use-scroll-direction"

export function Navbar() {
  const { scrollDirection, isAtTop } = useScrollDirection({ threshold: 12, topThreshold: 60 })
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
    const updateClock = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      )
    }
    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mobile menu scroll lock
  useEffect(() => {
    if (!isMobileMenuOpen) return
    document.body.style.overflow = "hidden"
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isMobileMenuOpen])

  // Auth state
  useEffect(() => {
    async function loadUser() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser(session.user)
          const { data } = await supabase
            .from("profiles")
            .select("role, full_name")
            .eq("id", session.user.id)
            .single()
          setProfile(data)
        }
      } catch (err) {
        console.error("Auth load error:", err)
      }
    }
    loadUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          const { data } = await supabase
            .from("profiles")
            .select("role, full_name")
            .eq("id", session.user.id)
            .single()
          setProfile(data)
        } else {
          setUser(null)
          setProfile(null)
        }
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      router.push("/")
      router.refresh()
    } catch (err) {
      console.error("Sign out error:", err)
    }
  }

  const navLinks = [
    { label: "Solutions", href: "/services" },
    { label: "Work", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrollDirection === "down" && !isAtTop
            ? "-translate-y-full"
            : "translate-y-0"
        } ${
          isScrolled
            ? "bg-[#08080A]/90 backdrop-blur-md border-b border-white/[0.08] shadow-2xl py-2.5"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Authentic Crest */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 group shrink-0 whitespace-nowrap cursor-pointer"
          >
            <div className="relative h-7 w-7 rounded overflow-hidden shrink-0 border border-[#d4af37]/40 shadow-sm bg-[#0a0614]">
              <Image src="/NewLogo.png" alt="Mercian Wealth" fill className="object-cover" priority />
            </div>
            <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-white flex items-center gap-1.5 uppercase whitespace-nowrap">
              <span>MERCIAN</span>
              <span className="text-[#d4af37]">WEALTH</span>
            </span>
          </Link>

          {/* Clean Desktop Navigation: Single-Row, Zero Mega-Dropdowns */}
          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 flex-nowrap shrink-0 font-mono text-[11px] uppercase tracking-wider">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  prefetch={true}
                  className={`py-1 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? "text-[#d4af37] font-bold border-b border-[#d4af37]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right-Side Controls & Action Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Region Indicator */}
            <span className="hidden md:inline-block font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
              UK
            </span>

            {/* User Account / Login */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#d4af37]/40 bg-[#0a1122] text-[#d4af37] hover:text-white transition-all cursor-pointer outline-none"
                    aria-label="User Portal Menu"
                  >
                    <User size={13} className="text-[#d4af37]" />
                    <span className="font-mono text-xs uppercase tracking-wider">Account</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-[#060a14] border border-white/10 text-zinc-200">
                  <DropdownMenuLabel className="text-xs font-mono text-[#d4af37] uppercase">Portal Access</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5">
                    <Link href={(profile?.role === 'admin' || user?.email === 'deepgurtej28@gmail.com') ? '/admin' : '/client'} className="flex items-center gap-2 text-xs">
                      <LayoutDashboard size={14} className="text-[#d4af37]" />
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/15 hover:border-[#b794f6]/60 text-zinc-300 hover:text-white font-mono text-[11px] uppercase tracking-wider transition-all backdrop-blur-sm"
                title="Client & Operator Login"
              >
                <User size={12} className="text-[#b794f6]" />
                <span>Login</span>
              </Link>
            )}

            {/* Benchmark LET'S TALK ◆ Outline Button */}
            <Link
              href="/book"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded border border-[#d4af37]/60 hover:bg-[#d4af37] text-[#d4af37] hover:text-black font-mono font-medium text-[10px] xl:text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#d4af37]/10 whitespace-nowrap"
            >
              <span>LET&apos;S TALK ◆</span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden min-h-[40px] flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141418] text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold transition-all cursor-pointer shadow-md"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 text-[#d4af37]" /> : <Menu className="w-4 h-4 text-[#d4af37]" />}
              <span className="text-[11px] font-mono uppercase tracking-wider">{isMobileMenuOpen ? "Close" : "Menu"}</span>
            </button>

          </div>
        </div>
      </header>

      {/* Clean Mobile Slide-Over Drawer */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <div 
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
              className="fixed inset-0 z-[99999] flex justify-end pointer-events-auto"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
                aria-hidden="true"
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 320 }}
                className="relative w-[86vw] max-w-[340px] h-[100dvh] bg-[#0A0A0D] border-l border-white/10 shadow-2xl flex flex-col justify-between z-10 font-sans select-none overflow-hidden"
              >
                {/* Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#0A0A0D]">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2.5"
                  >
                    <div className="relative h-7 w-7 rounded-lg overflow-hidden border border-[#d4af37]/40 shadow-md shrink-0">
                      <BrandLogo variant="watermark" alt="Mercian Wealth" fill className="object-cover" priority />
                    </div>
                    <span className="font-serif text-xs font-bold tracking-widest text-white uppercase">
                      <span>MERCIAN</span> <span className="text-[#d4af37]">WEALTH</span>
                    </span>
                  </Link>

                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-[#141418] text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                    aria-label="Close Navigation Menu"
                  >
                    <X className="w-4 h-4 text-zinc-300" />
                  </button>
                </div>

                {/* Nav Links */}
                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
                  {[
                    { name: "Solutions", href: "/services", icon: Cpu },
                    { name: "Work", href: "/portfolio", icon: Layers },
                    { name: "About", href: "/about", icon: Info },
                    { name: "Contact", href: "/contact", icon: Mail },
                    { name: "Client Login", href: "/login", icon: User },
                  ].map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                          isActive
                            ? "bg-[#d4af37]/15 text-[#d4af37] font-bold border border-[#d4af37]/30"
                            : "text-zinc-300 hover:bg-white/5 hover:text-white border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-[#d4af37]" />
                          <span className="text-sm font-semibold tracking-wide font-mono uppercase text-xs">{item.name}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-500" />
                      </Link>
                    )
                  })}
                </div>

                {/* Bottom CTA */}
                <div className="p-4 border-t border-white/10 shrink-0 bg-[#0A0A0D]">
                  <Link
                    href="/book"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3 px-4 bg-[#d4af37] hover:bg-[#fff5d8] text-black font-mono font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all chamfered-sm shadow-lg shadow-[#d4af37]/20"
                  >
                    <span>REQUEST BLUEPRINT ◆</span>
                  </Link>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
