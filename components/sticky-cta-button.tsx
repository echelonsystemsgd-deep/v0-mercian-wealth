"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronUp, PhoneCall, Calendar } from "lucide-react"

export function StickyCTAButton() {
  const pathname = usePathname()
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
          {/* Mobile Unified Conversion Bar */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="sm:hidden fixed bottom-0 inset-x-0 z-[90] bg-[#09090B]/95 backdrop-blur-xl border-t border-[#DCAE53]/30 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] flex items-center justify-between gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] pointer-events-auto"
          >
            <a
              href="tel:+447851055929"
              className="flex-1 py-3 px-3 rounded-xl bg-[#18181F] border border-[#DCAE53]/40 text-[#DCAE53] font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Direct</span>
            </a>
            <Link
              href="/book"
              className="flex-1 py-3 px-3 rounded-xl bg-[#DCAE53] text-[#09090B] font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1 shadow-md active:scale-95 transition-transform"
            >
              <span>Book Voice Audit →</span>
            </Link>
          </motion.div>

          {/* Desktop Minimal Scroll-to-Top Button (Positioned left of the AI concierge) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex fixed bottom-6 right-24 z-40 items-center pointer-events-auto"
          >
            <button
              onClick={scrollToTop}
              className="w-11 h-11 rounded-full bg-[#111115]/90 backdrop-blur-md border border-slate-800 hover:border-[#DCAE53]/50 text-slate-400 hover:text-[#DCAE53] flex items-center justify-center transition-all shadow-xl hover:scale-105 cursor-pointer"
              aria-label="Scroll to top"
              title="Scroll to top"
            >
              <ChevronUp size={20} />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
