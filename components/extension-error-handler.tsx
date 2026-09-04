"use client"

import { useEffect } from "react"

/**
 * Suppresses unhandled promise rejections originating from third-party browser extensions
 * (such as MetaMask, Coinbase Wallet, Grammarly, etc.) that inject scripts (`chrome-extension://`)
 * into the webpage and cause Next.js development overlay noise.
 */
export function ExtensionErrorHandler() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event?.reason
      const reasonStr = typeof reason === "string" ? reason : reason?.message || reason?.stack || ""

      // Check if error is from a browser extension (like MetaMask inpage.js)
      if (
        reasonStr.includes("MetaMask") ||
        reasonStr.includes("chrome-extension://") ||
        reasonStr.includes("moz-extension://") ||
        reasonStr.includes("inpage.js") ||
        reason?.stack?.includes("chrome-extension://")
      ) {
        event.preventDefault()
        event.stopImmediatePropagation?.()
      }
    }

    const handleError = (event: ErrorEvent) => {
      const filename = event?.filename || ""
      const message = event?.message || ""

      if (
        filename.includes("chrome-extension://") ||
        filename.includes("moz-extension://") ||
        filename.includes("inpage.js") ||
        message.includes("MetaMask")
      ) {
        event.preventDefault()
        event.stopImmediatePropagation?.()
      }
    }

    window.addEventListener("unhandledrejection", handleUnhandledRejection, true)
    window.addEventListener("error", handleError, true)

    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection, true)
      window.removeEventListener("error", handleError, true)
    }
  }, [])

  return null
}
