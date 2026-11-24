"use client"

import { useState, useEffect } from "react"

export function ViewportHUD() {
  const [scrollPercent, setScrollPercent] = useState<number>(0)
  const [currentSection, setCurrentSection] = useState<string>("01")
  const [ukTime, setUkTime] = useState<string>("")
  const [fps, setFps] = useState<number>(60)

  // 1. Live UK Time & FPS counter
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString("en-GB", {
        timeZone: "Europe/London",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      setUkTime(timeStr)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)

    let frameCount = 0
    let lastTime = performance.now()
    let animId: number

    const measureFps = () => {
      frameCount++
      const now = performance.now()
      if (now - lastTime >= 1000) {
        setFps(Math.min(Math.round((frameCount * 1000) / (now - lastTime)), 60))
        frameCount = 0
        lastTime = now
      }
      animId = requestAnimationFrame(measureFps)
    }
    animId = requestAnimationFrame(measureFps)

    return () => {
      clearInterval(timer)
      cancelAnimationFrame(animId)
    }
  }, [])

  // 2. Scroll percentage & 8-section tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll <= 0) return
      const currentScroll = window.scrollY
      const pct = Math.min(Math.max(Math.round((currentScroll / totalScroll) * 100), 0), 100)
      setScrollPercent(pct)

      // 8 Cerbo Sections Thresholds
      if (pct < 12) setCurrentSection("01")
      else if (pct < 24) setCurrentSection("02")
      else if (pct < 38) setCurrentSection("03")
      else if (pct < 52) setCurrentSection("04")
      else if (pct < 66) setCurrentSection("05")
      else if (pct < 78) setCurrentSection("06")
      else if (pct < 88) setCurrentSection("07")
      else setCurrentSection("08")
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const formattedPercent = scrollPercent.toString().padStart(3, "0")

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden" aria-hidden="true">
      {/* 4 Corner L-Brackets in Refined Gold */}
      <div className="absolute top-20 left-4 text-[#d4af37]/30 font-mono text-[10px] hidden xl:block">
        ┌
      </div>
      <div className="absolute top-20 right-4 text-[#d4af37]/30 font-mono text-[10px] hidden xl:block">
        ┐
      </div>
      <div className="absolute bottom-5 left-4 text-[#d4af37]/30 font-mono text-[10px] hidden xl:block">
        └
      </div>
      <div className="absolute bottom-5 right-4 text-[#d4af37]/30 font-mono text-[10px] hidden xl:block">
        ┘
      </div>

      {/* Crosshair Hairline Reticles */}
      <div className="absolute top-1/3 left-6 text-[#d4af37]/20 font-mono text-[11px] hidden lg:block">+</div>
      <div className="absolute top-2/3 left-6 text-[#d4af37]/20 font-mono text-[11px] hidden lg:block">+</div>
      <div className="absolute top-1/3 right-6 text-[#d4af37]/20 font-mono text-[11px] hidden lg:block">+</div>
      <div className="absolute top-2/3 right-6 text-[#d4af37]/20 font-mono text-[11px] hidden lg:block">+</div>

      {/* Mobile Sleek Floating HUD Pill (Respects iOS Safe Area, Single Line, No Overlap) */}
      <div className="md:hidden fixed bottom-[max(14px,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0614]/90 border border-white/15 backdrop-blur-md font-mono text-[9px] tracking-wider shadow-lg whitespace-nowrap shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse shrink-0" />
        <span className="text-zinc-200 font-semibold whitespace-nowrap">SEC {currentSection}/08</span>
        <span className="text-zinc-600">·</span>
        <span className="text-zinc-400 whitespace-nowrap">{formattedPercent}%</span>
        <span className="text-zinc-600">·</span>
        <span className="text-[#d4af37] whitespace-nowrap">{fps} FPS</span>
      </div>

      {/* Desktop Bottom-Left Telemetry: ● SEC 01 / 08 · 000 % */}
      <div className="hidden md:flex absolute bottom-4 left-6 lg:left-10 items-center gap-2 font-mono text-[10px] text-zinc-400 tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
        <span className="text-zinc-200 font-semibold">SEC {currentSection} / 08</span>
        <span className="text-zinc-500">·</span>
        <span className="text-zinc-400">{formattedPercent} %</span>
      </div>

      {/* Desktop Bottom-Right Telemetry: UK 15:30:00 · 60 FPS */}
      <div className="hidden md:flex absolute bottom-4 right-6 lg:right-10 items-center gap-2 font-mono text-[10px] text-zinc-400 tracking-wider">
        <span className="text-zinc-300">UK {ukTime || "12:00:00"}</span>
        <span className="text-zinc-500">·</span>
        <span className="text-[#d4af37]">{fps} FPS</span>
      </div>

      {/* Right Edge Thin Vertical Scroll Progress Rail */}
      <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/[0.04] hidden md:block">
        <div
          className="w-full bg-[#d4af37]/60 transition-all duration-100 origin-top"
          style={{ height: `${scrollPercent}%` }}
        />
      </div>
    </div>
  )
}
