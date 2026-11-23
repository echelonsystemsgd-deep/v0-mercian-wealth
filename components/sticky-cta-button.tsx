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
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-14 sm:bottom-24 right-4 sm:right-8 z-30 items-center pointer-events-auto"
        >
          <button
            onClick={scrollToTop}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#121216]/90 backdrop-blur-md border border-white/10 hover:border-[#E2B857]/50 text-zinc-400 hover:text-[#E2B857] flex items-center justify-center transition-all hover:scale-105 cursor-pointer outline-none shadow-lg"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ChevronUp size={15} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
