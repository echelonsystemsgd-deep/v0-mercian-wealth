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

    // FPS measurement
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

  // 2. Scroll percentage & active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll <= 0) return
      const currentScroll = window.scrollY
      const pct = Math.min(Math.max(Math.round((currentScroll / totalScroll) * 100), 0), 100)
      setScrollPercent(pct)

      // Section calculation based on scroll threshold
      if (pct < 15) setCurrentSection("01")
      else if (pct < 32) setCurrentSection("02")
      else if (pct < 50) setCurrentSection("03")
      else if (pct < 70) setCurrentSection("04")
      else if (pct < 88) setCurrentSection("05")
      else setCurrentSection("06")
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden" aria-hidden="true">
      {/* Corner L-Brackets (Shown on wide desktop viewports >= 1280px to avoid narrow content card collisions) */}
      <div className="absolute top-20 left-4 text-[#E2B857]/40 font-mono text-[10px] hidden xl:block">
        ┌ <span className="opacity-60 text-[9px]">MW-01</span>
      </div>
      <div className="absolute top-20 right-4 text-[#E2B857]/40 font-mono text-[10px] hidden xl:block">
        <span className="opacity-60 text-[9px]">SYS-ARMED</span> ┐
      </div>
      <div className="absolute bottom-4 left-4 text-[#E2B857]/40 font-mono text-[10px] hidden xl:block">
        └ <span className="opacity-60 text-[9px]">LATENCY &lt;45MS</span>
      </div>
      <div className="absolute bottom-4 right-4 text-[#E2B857]/40 font-mono text-[10px] hidden xl:block">
        <span className="opacity-60 text-[9px]">ENCRYPTED</span> ┘
      </div>

      {/* Crosshair Hairline Reticles */}
      <div className="absolute top-1/3 left-4 text-[#E2B857]/20 font-mono text-[11px] hidden 2xl:block">+</div>
      <div className="absolute top-2/3 left-4 text-[#E2B857]/20 font-mono text-[11px] hidden 2xl:block">+</div>
      <div className="absolute top-1/3 right-4 text-[#E2B857]/20 font-mono text-[11px] hidden 2xl:block">+</div>
      <div className="absolute top-2/3 right-4 text-[#E2B857]/20 font-mono text-[11px] hidden 2xl:block">+</div>

      {/* Centered Cockpit Telemetry Bar (Zero conflict with bottom corner action buttons) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3 px-3 py-1 rounded-none bg-[#0B0B0E]/90 border border-[#E2B857]/30 font-mono text-[10px] text-zinc-400 backdrop-blur-md chamfered-sm shadow-xl pointer-events-auto">
        <div className="flex items-center gap-1.5 text-[#E2B857]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E2B857] animate-pulse" />
          <span className="font-semibold uppercase tracking-wider">SEC {currentSection} / 06</span>
        </div>
        <span className="text-zinc-700">|</span>
        <span className="text-zinc-300 font-mono">{scrollPercent.toString().padStart(3, "0")} %</span>
        <span className="text-zinc-700">|</span>
        <span className="text-zinc-400">UK // GMT: <strong className="text-white font-normal">{ukTime || "12:00:00"}</strong></span>
        <span className="text-zinc-700">|</span>
        <span className="text-emerald-400 font-semibold">{fps} FPS</span>
      </div>

      {/* Right-Edge Scroll Progress Rail (Guaranteed zero card collision) */}
      <div className="absolute top-24 bottom-24 right-1.5 w-[2px] bg-white/5 rounded-full overflow-hidden hidden xl:block">
        <div
          className="w-full bg-gradient-to-b from-[#E2B857] via-[#F59E0B] to-[#D4AF37] shadow-[0_0_8px_rgba(226,184,87,0.6)] transition-all duration-75 origin-top rounded-full"
          style={{ height: `${scrollPercent}%` }}
        />
      </div>
    </div>
  )
}
