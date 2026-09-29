"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  X,
  Loader2,
  Lock,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { SITE_COPY } from "@/lib/site-copy"

export type PortfolioItem = {
  title: string
  category: string
  gradient: string
  href?: string | null
  image: string
  underConstruction: boolean
  metric?: string | null
  domain?: string
  isFeatured?: boolean
}

export const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  {
    title: "VEYRA — Solid Cast Permanent Jewellery",
    category: "Luxury 3D E-Commerce & Permanent Jewellery · Live Sandbox",
    gradient: "from-stone-900/40 to-amber-950/40",
    href: "https://veyra-premium-3-d-jewellery-e-comme.vercel.app/",
    image: "/veyra-jewellery-preview-real.jpg",
    underConstruction: false,
    metric: "Real-Time 3D Atelier & Interactive Model",
    domain: "veyra-premium-3-d-jewellery-e-comme.vercel.app",
    isFeatured: true,
  },
  {
    title: "Vanguard Construction — House Extensions & Loft Conversions",
    category: "Architectural Extensions & Turnkey Renovations · Live Sandbox",
    gradient: "from-amber-950/40 to-yellow-950/40",
    href: "https://premium-local-construction-business-plum.vercel.app/",
    image: "/vanguard-construction-preview-real.jpg",
    underConstruction: false,
    metric: "Instant Sub-Second Project Quote Engine",
    domain: "premium-local-construction-business-plum.vercel.app",
    isFeatured: true,
  },
  {
    title: "AURĒLIA — Cellular Longevity & Precision Nootropics",
    category: "Luxury Healthspan & Nootropic Commerce · Live Sandbox",
    gradient: "from-emerald-950/40 to-teal-950/40",
    href: "https://premium-supplement-commerce.vercel.app/",
    image: "/aurelia-supplement-preview-real.jpg",
    underConstruction: false,
    metric: "Duodenal Delivery & Automated Subscriptions",
    domain: "premium-supplement-commerce.vercel.app",
    isFeatured: true,
  },
]

function RequestSystemSchemaModal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) return
    setIsSubmitting(true)
    setErrorMsg(null)

    let utmParams: Record<string, string> = {}
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search)
      const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
      utmKeys.forEach((key) => {
        const val = searchParams.get(key)
        if (val) utmParams[key] = val
      })
    }

    try {
      const res = await fetch("/api/portfolio/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          project_name: item.title,
          referrer: typeof document !== "undefined" ? document.referrer : "none",
          user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "none",
          ...utmParams,
        }),
      })

      const result = await res.json()
      if (!res.ok) {
        throw new Error(result.error || "Failed to submit request. Please try again.")
      }

      setSubmitted(true)
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        key="schema-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

        <motion.div
          key="schema-window"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md bg-bg-tertiary border border-primary/20 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white hover:bg-white/10 transition-colors rounded-full p-1.5 cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="relative mx-auto w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-accent-gold mb-6">
            <Lock size={28} />
          </div>

          <h3 className="font-serif text-2xl font-bold text-text-primary mb-3">
            Book A Live Demonstration
          </h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Every system is built to suit the exact workflow of a local business. Rather than browsing generic templates, book a 15-minute call to see a live demonstration tailored to your exact industry.
          </p>

          {errorMsg && (
            <div className="mb-4 text-xs text-red-400 bg-red-500/10 border border-red-500/20 py-2 px-3 rounded-lg text-left">
              {errorMsg}
            </div>
          )}

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 px-4 bg-primary/10 border border-primary/20 rounded-xl text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-accent-gold/20 border border-accent-gold/40 flex items-center justify-center mx-auto text-accent-gold">
                <svg className="w-6 h-6 animate-bounce text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-serif text-lg font-bold text-accent-gold">Request Received</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your request for the blueprints of <strong>{item.title}</strong> has been secured. We will transmit the walkthrough details directly to <strong>{email}</strong> shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3 text-left">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 block">
                    {SITE_COPY.portfolioPage.nameLabel} *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 hover:border-primary/45 focus:border-primary/60 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 block">
                    {SITE_COPY.portfolioPage.emailLabel} *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="name@business.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 hover:border-primary/45 focus:border-primary/60 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none transition-all font-sans"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent-gold text-bg-primary font-bold hover:bg-accent-gold/90 disabled:opacity-50 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 size={16} className="animate-spin text-bg-primary" />
                ) : (
                  <>
                    <span>{SITE_COPY.portfolioPage.submitBtnText}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </Button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-white/5">
            <button
              onClick={onClose}
              className="text-xs text-muted-foreground hover:text-accent-gold transition-colors underline underline-offset-4 cursor-pointer"
            >
              Go Back to Portfolio
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function PrototypePreviewModal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  const [loading, setLoading] = useState(true)

  // Prevent background body scrolling while modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        key="preview-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

        <motion.div
          key="preview-window"
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative z-10 w-full h-full md:h-[88vh] md:max-w-6xl bg-[#0d0d12] md:border md:border-white/10 rounded-none md:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#13131a] border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div
                  className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 cursor-pointer transition-colors"
                  onClick={onClose}
                  title="Close Preview"
                />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="text-left">
                <h4 className="font-sans text-sm font-bold text-white leading-tight">
                  {item.title}
                </h4>
                <p className="text-[10px] uppercase tracking-wider text-[#DCAE53] font-semibold leading-none mt-0.5 font-mono">
                  {item.domain || item.category}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck size={13} className="text-emerald-400" />
                <span>Sandbox Mode · Backend Guarded</span>
              </div>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white hover:bg-white/10 transition-colors rounded-full p-1.5 cursor-pointer ml-1"
                aria-label="Close Preview"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Prototype Security & Interactive Notice Banner */}
          <div className="bg-emerald-950/90 border-b border-emerald-500/30 text-emerald-300 py-2.5 px-4 text-center text-[10px] sm:text-xs font-semibold font-sans flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 tracking-wide shrink-0">
            <div className="flex items-center gap-1.5 uppercase font-mono font-bold text-emerald-400 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Interactive Sandbox</span>
            </div>
            <span className="hidden sm:inline text-emerald-500/60">•</span>
            <span className="text-emerald-200/90 text-[10px] sm:text-xs">
              Interactive calculators, variant pickers, quizzes, and UI workflows are live for testing. External dispatches (WhatsApp chats, calendar bookings, and transactions) are sandboxed and simulated for demonstration safety.
            </span>
          </div>

          {/* Interactive Frame Viewport */}
          <div className="flex-1 relative bg-black/50 overflow-hidden">
            {item.href ? (
              <>
                {loading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#09090B] z-20 transition-opacity duration-300">
                    <Loader2 className="w-8 h-8 text-[#DCAE53] animate-spin" />
                    <p className="text-xs text-muted-foreground font-mono">
                      Initializing secure interactive sandbox viewport...
                    </p>
                  </div>
                )}
                <iframe
                  src={item.href}
                  className="w-full h-full border-none bg-white"
                  onLoad={() => setLoading(false)}
                  sandbox="allow-same-origin allow-scripts allow-forms"
                />
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
                <h3 className="text-xl font-serif font-bold text-white">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.category}</p>
                <Button onClick={onClose} className="bg-[#DCAE53] text-[#09090B] font-bold">
                  Return to Portfolio
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function Portfolio({ limit }: { limit?: number }) {
  const supabase = createClient()
  const [requestSchemaModal, setRequestSchemaModal] = useState<PortfolioItem | null>(null)
  const [previewPrototype, setPreviewPrototype] = useState<PortfolioItem | null>(null)
  const [items, setItems] = useState<PortfolioItem[]>(DEFAULT_PORTFOLIO)
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const { data, error } = await supabase
          .from("portfolio_items")
          .select("*")
          .eq("is_archived", false)
          .order("is_featured", { ascending: false })
          .order("created_at", { ascending: false })

        if (error) throw error

        if (data && data.length > 0) {
          const mapped = data.map((d: any) => ({
            title: d.project_name,
            category:
              d.badge_type ||
              d.industry ||
              (d.under_construction ? "Architecture Case Study" : "Interactive Sandbox"),
            gradient: d.gradient || "from-blue-500/20 to-indigo-500/20",
            href: d.website_link || d.live_demo_url || null,
            image: d.cover_image,
            underConstruction: Boolean(d.under_construction),
            metric: d.metric || d.case_study_metrics || null,
            domain: d.website_link ? new URL(d.website_link).hostname : undefined,
            isFeatured: Boolean(d.is_featured),
          }))
          setItems(mapped)
        }
      } catch (err: any) {
        console.warn("Live portfolio items unavailable, using built-in showcase assets:", err?.message || err)
      }
    }
    loadPortfolio()

    // Real-time synchronization when admin toggles featured or updates items
    const channel = supabase
      .channel("public:portfolio_items")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "portfolio_items" },
        () => {
          loadPortfolio()
        }
      )
      .subscribe()

    // Sync on tab focus
    const onFocus = () => loadPortfolio()
    if (typeof window !== "undefined") {
      window.addEventListener("focus", onFocus)
      document.addEventListener("visibilitychange", onFocus)
    }

    return () => {
      supabase.removeChannel(channel)
      if (typeof window !== "undefined") {
        window.removeEventListener("focus", onFocus)
        document.removeEventListener("visibilitychange", onFocus)
      }
    }
  }, [supabase])

  const displayItems = limit ? items.slice(0, limit) : items

  // Moving carousel continuous auto-scroll animation with seamless infinite loop
  const scrollPosRef = useRef(0)
  const isInteractingRef = useRef(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animationId: number
    const speed = 0.75 // smooth luxury crawl speed

    const scroll = () => {
      if (el && !isPaused && !isInteractingRef.current) {
        scrollPosRef.current += speed
        // Single set width based on 3 duplicates
        const singleSetWidth = el.scrollWidth / 3
        if (singleSetWidth > 0 && scrollPosRef.current >= singleSetWidth) {
          scrollPosRef.current -= singleSetWidth
          el.scrollLeft = scrollPosRef.current
        } else {
          el.scrollLeft = scrollPosRef.current
        }
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationId)
  }, [isPaused])

  // Sync scroll position if user manually scrolls while paused
  const handleScrollEvent = () => {
    const el = scrollRef.current
    if (el && (isPaused || isInteractingRef.current)) {
      scrollPosRef.current = el.scrollLeft
    }
  }

  // Manual scroll controls for Left / Right arrows
  const handleScroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    setIsPaused(true)
    isInteractingRef.current = true

    // Clear any previous resume timer
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)

    const cardWidth = el.querySelector(".portfolio-card")?.clientWidth || 500
    const scrollDelta = cardWidth + 32 // card width + gap

    el.scrollBy({
      left: direction === "left" ? -scrollDelta : scrollDelta,
      behavior: "smooth",
    })

    // Resync position after smooth scroll completes
    setTimeout(() => {
      if (el) scrollPosRef.current = el.scrollLeft
      isInteractingRef.current = false
    }, 500)

    // Automatically resume gentle auto-scroll after 4 seconds of inactivity
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 4000)
  }

  // Handle mobile touch interaction
  const handleTouchStart = () => {
    setIsPaused(true)
    isInteractingRef.current = true
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
  }

  const handleTouchEnd = () => {
    const el = scrollRef.current
    if (el) scrollPosRef.current = el.scrollLeft
    isInteractingRef.current = false
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 3500)
  }

  // Triplicate items for the seamless infinite looping track on all viewports
  const carouselItems = [...displayItems, ...displayItems, ...displayItems]

  return (
    <>
      <section id="portfolio" className="relative py-20 lg:py-28 overflow-hidden bg-[#050505] border-t border-white/10">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#DAA640]/5 rounded-full blur-[140px] pointer-events-none z-0" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141417] border border-[#DAA640]/30 text-[#DAA640] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles size={13} className="text-[#DAA640]" />
              <span>INTERACTIVE CLIENT PROTOTYPES</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Websites Engineered to Convert Visitors
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Every prototype is live, responsive, and ready for you to test. Hover over any card to stop the animation and launch the interactive sandbox.
            </p>

            {/* Interactive Status & Manual Carousel Controls */}
            <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141417] border border-white/10 hover:border-[#DAA640]/50 text-zinc-300 hover:text-white transition-all text-xs font-mono cursor-pointer min-h-[36px]"
                title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
              >
                {isPaused ? (
                  <>
                    <Play size={12} className="text-emerald-400 fill-emerald-400" />
                    <span className="text-[11px] text-emerald-400 font-semibold">Paused (Click to Play)</span>
                  </>
                ) : (
                  <>
                    <Pause size={12} className="text-[#DAA640]" />
                    <span className="text-[11px] text-zinc-400">Moving Carousel · Hover to Stop</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleScroll("left")}
                  aria-label="Previous Build"
                  className="w-9 h-9 rounded-full bg-[#141417] border border-white/10 hover:border-[#DAA640] text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll("right")}
                  aria-label="Next Build"
                  className="w-9 h-9 rounded-full bg-[#141417] border border-white/10 hover:border-[#DAA640] text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Continuous Moving Carousel Track with Card-Level Hover Pause */}
        <div className="relative w-full overflow-hidden py-4 z-10">
          {/* Edge fade gradients for luxury seamless transition */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

          <div
            ref={scrollRef}
            onScroll={handleScrollEvent}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex gap-6 sm:gap-8 overflow-x-auto no-scrollbar px-4 sm:px-8"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {carouselItems.map((item, index) => {
              const domain =
                item.domain || (item.href ? new URL(item.href).hostname : "mercianwealth.com")

              return (
                <div
                  key={`${item.title}-${index}`}
                  className={`portfolio-card group relative flex-shrink-0 w-[85vw] sm:w-[500px] md:w-[560px] lg:w-[600px] aspect-[16/10] rounded-2xl border transition-all duration-300 bg-[#0B0B0D] overflow-hidden shadow-2xl cursor-pointer ${
                    item.isFeatured
                      ? "border-[#DAA640]/40 hover:border-[#DAA640] shadow-[0_0_24px_rgba(218,166,64,0.12)]"
                      : "border-white/10 hover:border-white/30"
                  }`}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onClick={() => {
                    if (item.href) {
                      window.open(item.href, "_blank", "noopener,noreferrer")
                    } else {
                      setRequestSchemaModal(item)
                    }
                  }}
                >
                  {/* Browser Chrome Shell & Real Landing Page Preview Image */}
                  <div className="w-full h-full relative z-10 flex flex-col bg-[#111115]">
                    {/* Browser Chrome Header */}
                    <div className="flex items-center justify-between px-2.5 py-2 sm:px-4 sm:py-2.5 bg-[#14141a] border-b border-slate-800 shrink-0">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/80" />
                      </div>

                      {/* Mockup Address Bar */}
                      <div className="h-5 bg-[#09090B] border border-slate-800/90 rounded-full px-2.5 sm:px-3 text-[9px] sm:text-[10px] text-slate-400 flex items-center justify-center font-mono truncate max-w-[130px] sm:max-w-[280px]">
                        {domain}
                      </div>

                      {/* Badges: Featured & Live */}
                      <div className="flex items-center gap-1.5">
                        {item.isFeatured && (
                          <span className="text-[7.5px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-[#DAA640] bg-[#DAA640]/10 border border-[#DAA640]/30 px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Star size={9} className="fill-[#DAA640] text-[#DAA640]" />
                            <span>Featured</span>
                          </span>
                        )}
                        <span className="text-[7.5px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="hidden xs:inline">Live</span> Sandbox
                        </span>
                      </div>
                    </div>

                    {/* Screenshot Body */}
                    <div className="relative flex-1 w-full bg-[#0d0d12] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                        sizes="(max-width: 768px) 85vw, 600px"
                        priority={index < 4}
                      />
                    </div>
                  </div>

                  {/* Desktop Hover Reveal Slide-Up Overlay — Interactive on Hover */}
                  <div className="absolute inset-0 bg-[#09090B]/92 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hidden md:flex flex-col justify-center items-center p-8 text-center space-y-4">
                    <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-300 space-y-3 max-w-lg">
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        {item.isFeatured && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#DAA640] bg-[#DAA640]/15 border border-[#DAA640]/40 px-2.5 py-0.5 rounded-full font-mono flex items-center gap-1">
                            <Star size={9} className="fill-[#DAA640] text-[#DAA640]" />
                            Featured Showcase
                          </span>
                        )}
                        <p className="text-xs uppercase tracking-widest text-[#DCAE53] font-semibold font-mono">
                          {item.category}
                        </p>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono">
                          Live Interactive Sandbox
                        </span>
                      </div>

                      <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-white leading-tight">
                        {item.title}
                      </h3>

                      {item.metric && (
                        <p className="text-xs font-mono font-bold text-[#DCAE53] uppercase tracking-wider bg-[#DCAE53]/10 border border-[#DCAE53]/25 px-3 py-1 rounded-lg inline-block">
                          Feature: {item.metric}
                        </p>
                      )}

                      <div className="pt-2">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (item.href) {
                              window.open(item.href, "_blank", "noopener,noreferrer")
                            }
                          }}
                          className="bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] font-bold px-5 py-2 rounded-xl transition-all cursor-pointer shadow-lg shadow-[#DCAE53]/20"
                        >
                          <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                            Launch Live Sandbox
                            <ArrowRight size={14} />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Bottom Bar — Always visible on small touch screens */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 flex md:hidden items-center justify-between px-3.5 py-2.5 bg-[#09090B]/95 border-t border-slate-800 backdrop-blur-md">
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="text-[9px] uppercase tracking-widest text-[#DCAE53] font-semibold leading-none truncate font-mono mb-0.5">
                        {item.category}
                      </p>
                      <h3 className="font-sans text-xs font-bold text-white truncate">
                        {item.title}
                      </h3>
                    </div>

                    <button
                      type="button"
                      className="shrink-0 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#09090B] bg-[#DCAE53] hover:bg-[#E5B85C] px-3 py-1.5 rounded-lg active:scale-95 transition-transform cursor-pointer font-sans"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (item.href) {
                          window.open(item.href, "_blank", "noopener,noreferrer")
                        }
                      }}
                    >
                      <span>Test Sandbox</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Callout / Full Portfolio Link */}
        {limit && (
          <div className="text-center mt-12 z-10 relative">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="px-8 py-6 text-xs sm:text-sm font-bold tracking-wider uppercase bg-[#111115] border-slate-800 text-white hover:border-[#DCAE53] hover:text-[#DCAE53] transition-all rounded-xl"
            >
              <Link href="/portfolio" className="flex items-center gap-2">
                View Full Interactive Showcase
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        )}
      </section>

      {/* Request System Schema Modal */}
      {requestSchemaModal && (
        <RequestSystemSchemaModal
          item={requestSchemaModal}
          onClose={() => setRequestSchemaModal(null)}
        />
      )}

      {/* Prototype Preview Modal with Hardened Sandbox Security */}
      {previewPrototype && (
        <PrototypePreviewModal
          item={previewPrototype}
          onClose={() => setPreviewPrototype(null)}
        />
      )}
    </>
  )
}
