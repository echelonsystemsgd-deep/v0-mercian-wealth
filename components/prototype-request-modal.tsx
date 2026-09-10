"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, CheckCircle2, Sparkles, Loader2, ShieldCheck } from "lucide-react"

interface PrototypeRequestModalProps {
  isOpen?: boolean
  onClose?: () => void
}

export function PrototypeRequestModal({ isOpen: propIsOpen, onClose: propOnClose }: PrototypeRequestModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [websiteOrSocial, setWebsiteOrSocial] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const isControlled = propIsOpen !== undefined
  const isOpen = isControlled ? propIsOpen : internalIsOpen

  const handleClose = () => {
    if (propOnClose) {
      propOnClose()
    } else {
      setInternalIsOpen(false)
    }
    // Reset status after transition
    setTimeout(() => {
      setIsSubmitted(false)
      setErrorMessage(null)
    }, 300)
  }

  // Global event listener to trigger modal from any component via window dispatch
  useEffect(() => {
    const handleOpenEvent = () => setInternalIsOpen(true)
    window.addEventListener("open-prototype-modal", handleOpenEvent)
    return () => window.removeEventListener("open-prototype-modal", handleOpenEvent)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !businessName.trim() || !websiteOrSocial.trim()) {
      setErrorMessage("Please complete all 3 fields so we can construct your prototype.")
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const res = await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "prototype_request",
          name: name.trim(),
          business_name: businessName.trim(),
          website: websiteOrSocial.trim(),
          notes: "Requested a free working prototype via outcomes-first modal.",
        }),
      })

      if (!res.ok) {
        throw new Error("Unable to send request. Please try again or message via WhatsApp.")
      }

      setIsSubmitted(true)
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-2xl bg-[#111115] border border-slate-800 p-6 sm:p-8 shadow-2xl z-10 text-left overflow-hidden"
          >
            {/* Ambient Gold Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#DCAE53]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-sans text-xl font-bold text-white">
                  Prototype Request Received
                </h3>
                <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{name}</strong>. I will review <strong className="text-[#DCAE53]">{businessName}</strong> and prepare a working prototype demonstrating faster response times and captured bookings.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 rounded-xl bg-[#18181F] text-slate-200 border border-slate-700 hover:bg-[#20202a] text-xs font-bold transition-all"
                  >
                    Back to Site
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Modal Header */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181F] border border-[#DCAE53]/30 text-[#DCAE53] text-[10px] font-mono font-bold uppercase tracking-wider mb-2.5">
                    <Sparkles className="w-3 h-3 text-[#DCAE53]" />
                    <span>Prototype-First · Zero Commitment</span>
                  </div>
                  <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-white leading-tight">
                    See What a Faster System Looks Like For Your Business
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed font-sans">
                    I don&apos;t pitch slide decks. Tell me who you are and where customers find you — I&apos;ll build a working prototype so you see the outcome before deciding anything.
                  </p>
                </div>

                {/* 3 Fields Max Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase font-semibold mb-1.5">
                      1. Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. David Miller"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#18181F] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#DCAE53] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase font-semibold mb-1.5">
                      2. Business Name
                    </label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Your Business Name"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#18181F] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#DCAE53] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase font-semibold mb-1.5">
                      3. Website or Instagram Handle
                    </label>
                    <input
                      type="text"
                      required
                      value={websiteOrSocial}
                      onChange={(e) => setWebsiteOrSocial(e.target.value)}
                      placeholder="e.g. yourbusiness.co.uk or @instagram"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#18181F] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#DCAE53] transition-colors"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-sans">
                      {errorMessage}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#DCAE53] text-[#09090B] font-bold text-sm hover:bg-[#E5B85C] transition-all shadow-lg shadow-[#DCAE53]/20 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Preparing Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Build My Free Working Prototype</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>No commitment · Real working prototype delivered directly</span>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
