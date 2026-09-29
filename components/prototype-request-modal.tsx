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
  const [email, setEmail] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [phone, setPhone] = useState("")
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

  // Global event listener to trigger modal from any component via window dispatch or URL hash #prototype-modal
  useEffect(() => {
    const handleOpenEvent = () => setInternalIsOpen(true)
    const checkHash = () => {
      if (typeof window !== "undefined" && window.location.hash === "#prototype-modal") {
        setInternalIsOpen(true)
      }
    }
    checkHash()
    window.addEventListener("hashchange", checkHash)
    window.addEventListener("open-prototype-modal", handleOpenEvent)
    return () => {
      window.removeEventListener("hashchange", checkHash)
      window.removeEventListener("open-prototype-modal", handleOpenEvent)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !businessName.trim() || !websiteOrSocial.trim()) {
      setErrorMessage("Please complete all required fields so we can construct and deliver your prototype.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setErrorMessage("Please enter a valid business email address.")
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
          email: email.trim().toLowerCase(),
          phone: phone.trim() || null,
          business_name: businessName.trim(),
          website: websiteOrSocial.trim(),
          notes: "Requested a free working prototype via outcomes-first modal.",
        }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => null)
        throw new Error(errorData?.error || "Unable to send request. Please try again or message via WhatsApp.")
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
            className="relative w-full max-w-lg rounded-2xl bg-[#111115] border border-slate-800 p-6 sm:p-8 shadow-2xl z-10 text-left overflow-hidden my-auto max-h-[90vh] overflow-y-auto"
          >
            {/* Ambient Gold Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#DCAE53]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
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
                  Thank you, <strong className="text-white">{name}</strong>. I will review <strong className="text-[#DCAE53]">{businessName}</strong> and prepare a working prototype. Your preview link will be sent to <strong className="text-white">{email}</strong>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 rounded-xl bg-[#18181F] text-slate-200 border border-slate-700 hover:bg-[#20202a] text-xs font-bold transition-all min-h-[44px]"
                  >
                    Back to Site
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Modal Header */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181F] border border-[#DCAE53]/30 text-[#DCAE53] text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3 text-[#DCAE53]" />
                    <span>Prototype-First · Zero Commitment</span>
                  </div>
                  <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-white leading-tight">
                    See What a Faster System Looks Like For Your Business
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed font-sans">
                    I don&apos;t pitch slide decks. Give us your details and current links — I&apos;ll build a live interactive prototype so you see the outcome before deciding anything.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label htmlFor="proto-name" className="block text-xs font-mono text-slate-300 uppercase font-semibold mb-1">
                      1. Your Name <span className="text-[#DCAE53]">*</span>
                    </label>
                    <input
                      id="proto-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. David Miller"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#18181F] border border-slate-800 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#DCAE53] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="proto-email" className="block text-xs font-mono text-slate-300 uppercase font-semibold mb-1">
                      2. Business Email <span className="text-[#DCAE53]">*</span>
                      <span className="text-[10px] text-slate-400 font-normal lowercase tracking-normal ml-1">(where we send your demo)</span>
                    </label>
                    <input
                      id="proto-email"
                      type="email"
                      required
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. david@millerroofing.co.uk"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#18181F] border border-slate-800 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#DCAE53] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="proto-biz" className="block text-xs font-mono text-slate-300 uppercase font-semibold mb-1">
                        3. Business Name <span className="text-[#DCAE53]">*</span>
                      </label>
                      <input
                        id="proto-biz"
                        type="text"
                        required
                        autoComplete="organization"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Miller Roofing Ltd"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#18181F] border border-slate-800 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#DCAE53] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="proto-phone" className="block text-xs font-mono text-slate-300 uppercase font-semibold mb-1">
                        4. Phone / WhatsApp <span className="text-slate-400 font-normal lowercase tracking-normal">(optional)</span>
                      </label>
                      <input
                        id="proto-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 07123 456789"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#18181F] border border-slate-800 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#DCAE53] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="proto-web" className="block text-xs font-mono text-slate-300 uppercase font-semibold mb-1">
                      5. Website or Social Handle <span className="text-[#DCAE53]">*</span>
                    </label>
                    <input
                      id="proto-web"
                      type="text"
                      required
                      value={websiteOrSocial}
                      onChange={(e) => setWebsiteOrSocial(e.target.value)}
                      placeholder="e.g. millerroofing.co.uk or @miller_roofing"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#18181F] border border-slate-800 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#DCAE53] transition-colors"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-sans">
                      {errorMessage}
                    </div>
                  )}

                  <div className="pt-1.5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#DCAE53] text-[#09090B] font-bold text-sm hover:bg-[#E5B85C] transition-all shadow-lg shadow-[#DCAE53]/20 disabled:opacity-50 cursor-pointer min-h-[48px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Preparing Prototype Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Build My Free Working Prototype</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-400 pt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Zero spam · Custom live demo delivered directly to you</span>
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
