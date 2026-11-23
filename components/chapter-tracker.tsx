"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Chapter {
  id: string
  label: string
  title: string
  selectors: string[]
}

const chapters: Chapter[] = [
  { id: "what-changed", label: "I", title: "What Changed", selectors: ["#what-changed", "#chapter-divider-I"] },
  { id: "bottleneck", label: "II", title: "Leakage", selectors: ["#bottleneck", "#chapter-divider-II"] },
  { id: "roi-calculator", label: "III", title: "Simulator", selectors: ["#roi-calculator", "#conto"] },
  { id: "offer-mechanism", label: "IV", title: "The Offer", selectors: ["#offer-mechanism", "#chapter-divider-III"] },
  { id: "portfolio", label: "V", title: "Websites", selectors: ["#portfolio", "#chapter-divider-IV"] },
  { id: "proof-cases", label: "VI", title: "Verified Proof", selectors: ["#proof-cases", "#chapter-divider-V"] },
  { id: "pricing", label: "VII", title: "Retainers", selectors: ["#pricing", "#chapter-divider-VII"] },
  { id: "cta", label: "VIII", title: "Prototype", selectors: ["#cta", "#chapter-divider-VIII"] },
]

function getElement(selector: string): Element | null {
  if (typeof document === "undefined") return null
  if (selector.startsWith("#")) {
    return document.getElementById(selector.slice(1))
  }
  try {
    return document.querySelector(selector)
  } catch {
    return null
  }
}

export function ChapterTracker() {
  const [activeChapter, setActiveChapter] = useState<string>("what-changed")
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const isClickScrolling = useRef<boolean>(false)

  useEffect(() => {
    const checkActiveSection = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > 250)

      if (isClickScrolling.current) return

      for (const ch of chapters) {
        for (const selector of ch.selectors) {
          const el = getElement(selector)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
              setActiveChapter(ch.id)
              return
            }
          }
        }
      }
    }

    window.addEventListener("scroll", checkActiveSection, { passive: true })
    checkActiveSection()
    return () => window.removeEventListener("scroll", checkActiveSection)
  }, [])

  const scrollToSection = (chapterId: string) => {
    const chapter = chapters.find((c) => c.id === chapterId)
    if (!chapter) return

    isClickScrolling.current = true
    setActiveChapter(chapterId)

    for (const selector of chapter.selectors) {
      const el = getElement(selector)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
        setTimeout(() => {
          isClickScrolling.current = false
        }, 800)
        break
      }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.25 }}
          /* Positioned at the extreme right edge (right-2) with ultra-slim width to prevent ANY collision with 1440px cards */
          className="fixed right-2 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col items-center gap-1.5 p-1.5 rounded-full bg-[#0D0D12]/90 border border-white/10 backdrop-blur-xl shadow-2xl select-none"
          aria-label="Section Navigation Rail"
        >
          {/* Header Indicator */}
          <div className="pb-1 pt-1">
            <span className="text-[8px] font-mono text-[#E2B857] font-bold tracking-widest block text-center">
              SYS
            </span>
          </div>

          {/* Chapter Nodes */}
          <div className="flex flex-col gap-1 items-center">
            {chapters.map((ch) => {
              const isActive = activeChapter === ch.id
              return (
                <div key={ch.id} className="relative group">
                  <button
                    onClick={() => scrollToSection(ch.id)}
                    aria-label={`Jump to ${ch.title}`}
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[9px] transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#E2B857] text-black font-bold shadow-[0_0_10px_rgba(226,184,87,0.5)] scale-110"
                        : "text-zinc-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {ch.label}
                  </button>

                  {/* Left-floating Tooltip (safely away from cards) */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-0.5 rounded bg-[#181820] border border-white/10 text-[10px] font-mono text-zinc-200 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 shadow-lg">
                    {ch.title}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
