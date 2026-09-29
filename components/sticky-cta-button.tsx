"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronUp, PhoneCall, Calendar, MessageSquare, ArrowRight } from "lucide-react"
import { useScrollDirection } from "@/hooks/use-scroll-direction"

export function StickyCTAButton() {
  const pathname = usePathname()
  const { scrollDirection } = useScrollDirection({ threshold: 12, topThreshold: 180 })
  const [scrolledPastHero, setScrolledPastHero] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isVisible = scrolledPastHero && !footerVisible && !isMobileMenuOpen

  useEffect(() => {
    const checkMenu = () => {
      setIsMobileMenuOpen(document.body.classList.contains("mobile-menu-open"))
    }
    checkMenu()
    const observer = new MutationObserver(checkMenu)
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  const excludedPrefixes = [
    '/admin',
    '/client',
    '/dashboard',
    '/forgot-password',
    '/login',
    '/reset-password',
    '/signup',
    '/book',
    '/success',
    '/unauthorized'
  ]
  const isExcluded = excludedPrefixes.some((prefix) => pathname?.startsWith(prefix))

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 200)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    let observer: IntersectionObserver | null = null

    const timer = setTimeout(() => {
      const footer = document.querySelector("footer")
      if (!footer) {
        setFooterVisible(false)
        return
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          setFooterVisible(entry.isIntersecting)
        },
        { rootMargin: "0px 0px 150px 0px" }
      )

      observer.observe(footer)
    }, 150)

    return () => {
      clearTimeout(timer)
      if (observer) observer.disconnect()
    }
  }, [pathname])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (isExcluded) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Mobile Unified Conversion Bar — Single persistent, non-overlapping bottom action sheet */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="sm:hidden fixed bottom-0 inset-x-0 z-[90] bg-[#0B0B0D]/95 backdrop-blur-xl border-t border-white/10 px-4 pt-2.5 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] flex items-center justify-between gap-3 card-depth pointer-events-auto"
          >
            <a
              href="https://wa.me/447851055929?text=Hi%20Gurtej,%20I'd%20like%20to%20discuss%20a%20working%20prototype%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex-1 min-h-[44px] py-2.5 px-3 rounded-xl bg-[#141417] border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-400 font-semibold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>WhatsApp</span>
            </a>
            <Link
              href="/book"
              className="flex-1 min-h-[44px] py-2.5 px-3 rounded-xl bg-[#DAA640] hover:bg-[#E5B85C] text-black font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-md shadow-[#DAA640]/20"
            >
              <span>Book Call</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </motion.div>

          {/* Desktop Minimal Scroll-to-Top Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex fixed bottom-6 right-24 z-30 items-center pointer-events-auto"
          >
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-[#141417]/90 backdrop-blur-md border border-white/10 hover:border-[#DAA640]/50 text-zinc-400 hover:text-[#DAA640] flex items-center justify-center transition-all hover:scale-105 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#DAA640]"
              aria-label="Scroll to top"
              title="Scroll to top"
            >
              <ChevronUp size={18} />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
