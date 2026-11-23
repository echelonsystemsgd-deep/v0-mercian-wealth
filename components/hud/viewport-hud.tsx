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

      // 8 Sections Thresholds
      if (pct < 12) setCurrentSection("01")
      else if (pct < 25) setCurrentSection("02")
      else if (pct < 38) setCurrentSection("03")
      else if (pct < 51) setCurrentSection("04")
      else if (pct < 64) setCurrentSection("05")
      else if (pct < 77) setCurrentSection("06")
      else if (pct < 90) setCurrentSection("07")
      else setCurrentSection("08")
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const formattedPercent = scrollPercent.toString().padStart(3, "0")

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden" aria-hidden="true">
      {/* 4 Corner L-Brackets */}
      <div className="absolute top-20 left-4 text-[#E2B857]/40 font-mono text-[10px] hidden xl:block">
        ┌ <span className="opacity-60 text-[9px]">MW-01</span>
      </div>
      <div className="absolute top-20 right-4 text-[#E2B857]/40 font-mono text-[10px] hidden xl:block">
        <span className="opacity-60 text-[9px]">SYS-ARMED</span> ┐
      </div>
      <div className="absolute bottom-5 left-4 text-[#E2B857]/40 font-mono text-[10px] hidden xl:block">
        └
      </div>
      <div className="absolute bottom-5 right-4 text-[#E2B857]/40 font-mono text-[10px] hidden xl:block">
        ┘
      </div>

      {/* Crosshair Hairline Reticles */}
      <div className="absolute top-1/3 left-6 text-[#E2B857]/20 font-mono text-[11px] hidden lg:block">+</div>
      <div className="absolute top-2/3 left-6 text-[#E2B857]/20 font-mono text-[11px] hidden lg:block">+</div>
      <div className="absolute top-1/3 right-6 text-[#E2B857]/20 font-mono text-[11px] hidden lg:block">+</div>
      <div className="absolute top-2/3 right-6 text-[#E2B857]/20 font-mono text-[11px] hidden lg:block">+</div>

      {/* Bottom-Left Telemetry: ● SEC 01 / 08 · 000 % */}
      <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-10 flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[10px] text-zinc-400 tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E2B857] animate-pulse" />
        <span className="text-zinc-200 font-semibold">SEC {currentSection} / 08</span>
        <span className="text-zinc-500">·</span>
        <span className="text-zinc-400">{formattedPercent} %</span>
      </div>

      {/* Bottom-Right Telemetry: UK 15:30:00 · 60 FPS */}
      <div className="absolute bottom-3 sm:bottom-4 right-4 sm:right-10 flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[10px] text-zinc-400 tracking-wider">
        <span className="text-zinc-300">UK {ukTime || "12:00:00"}</span>
        <span className="text-zinc-500">·</span>
        <span className="text-[#E2B857]">{fps} FPS</span>
      </div>

      {/* Right Edge Thin Vertical Scroll Progress Rail */}
      <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/[0.04] hidden md:block">
        <div
          className="w-full bg-[#E2B857]/60 transition-all duration-100 origin-top"
          style={{ height: `${scrollPercent}%` }}
        />
      </div>
    </div>
  )
}
