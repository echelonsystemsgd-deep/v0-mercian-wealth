"use client"

import { useState, useEffect, useRef } from "react"

export interface ScrollDirectionOptions {
  threshold?: number
  topThreshold?: number
}

export function useScrollDirection({
  threshold = 10,
  topThreshold = 60,
}: ScrollDirectionOptions = {}) {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up")
  const [isAtTop, setIsAtTop] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    lastScrollY.current = window.scrollY
    setIsAtTop(window.scrollY <= topThreshold)
    setScrollY(window.scrollY)

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY

      // Prevent iOS elastic overscroll rubber-banding from firing false events
      if (currentScrollY < 0) {
        setIsAtTop(true)
        setScrollDirection("up")
        ticking.current = false
        return
      }

      setScrollY(currentScrollY)
      setIsAtTop(currentScrollY <= topThreshold)

      const diff = currentScrollY - lastScrollY.current

      if (Math.abs(diff) >= threshold) {
        if (currentScrollY <= topThreshold) {
          setScrollDirection("up")
        } else if (diff > 0) {
          setScrollDirection("down")
        } else {
          setScrollDirection("up")
        }
        lastScrollY.current = currentScrollY
      }

      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDir)
        ticking.current = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold, topThreshold])

  return {
    scrollDirection,
    isAtTop,
    scrollY,
    isVisible: isAtTop || scrollDirection === "up",
  }
}
