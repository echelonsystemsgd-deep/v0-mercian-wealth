"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

import {
  ArrowRight,
  User,
  Mail,
  Building2,
  Phone,
  MessageSquare,
  CheckCircle2,
  Loader2,
  X,
  ShieldCheck,
} from "lucide-react"

interface ContactFormData {
  fullName: string
  email: string
  companyName: string
  phone: string
  message: string
}

function cleanUkPhoneDigits(input: string): string {
  let digits = input.replace(/\D/g, '')
  if (digits.startsWith('44') && digits.length >= 12) {
    digits = digits.slice(2)
  }
  if (digits.startsWith('0')) {
    digits = digits.slice(1)
  }
  return digits
}

function formatUkPhonePayload(input: string): string | null {
  const digits = cleanUkPhoneDigits(input)
  return digits ? `+44${digits}` : null
}

function validateContactForm(data: ContactFormData): Partial<Record<keyof ContactFormData, string>> {
  const errors: Partial<Record<keyof ContactFormData, string>> = {}
  if (!data.fullName.trim()) errors.fullName = "Full name is required."
  if (!data.email.trim()) {
    errors.email = "Email is required."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address."
  }
  if (data.phone.trim()) {
    const digits = cleanUkPhoneDigits(data.phone)
    if (digits.length < 10 || digits.length > 11) {
      errors.phone = "Please enter a valid 10 to 11-digit UK phone number."
    }
  }
  if (!data.message.trim()) errors.message = "Message details are required."
  return errors
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    companyName: "",
    phone: "",
    message: "",
  })

  const updateField = <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    const validationErrors = validateContactForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    // Capture UTM tracking parameters from current page URL
    let utmParams: Record<string, string> = {}
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search)
      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      utmKeys.forEach((key) => {
        const val = searchParams.get(key)
        if (val) utmParams[key] = val
      })
    }

    try {
      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'contact_form',
          name: formData.fullName,
          email: formData.email,
          business_name: formData.companyName || "N/A (Contact Form)",
          phone: formatUkPhonePayload(formData.phone),
          notes: formData.message,
          referrer: typeof document !== 'undefined' ? document.referrer : 'none',
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'none',
          ...utmParams,
        }),
      })

      const result = await res.json()
      if (!res.ok) {
        throw new Error(result.error || "Failed to submit. Please try again.")
      }

      setSubmitted(true)
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit. Please try again or email us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto relative">
      {/* Contact Form Container (Always Visible) */}
      <div className="rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 bg-[#0a0614] shadow-2xl space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Full Name */}
          <div className="space-y-1.5">
            <label htmlFor="fullName" className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
              <User size={14} className="text-[#d4af37]" /> Full Name *
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              placeholder="e.g. Sarah Mitchell"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              className={`w-full bg-[#130a24] border rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all ${
                errors.fullName ? "border-red-500/60" : "border-white/10 hover:border-white/20"
              }`}
            />
            {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
              <Mail size={14} className="text-[#d4af37]" /> Email Address *
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="e.g. director@yourbusiness.co.uk"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={`w-full bg-[#130a24] border rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all ${
                errors.email ? "border-red-500/60" : "border-white/10 hover:border-white/20"
              }`}
            />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
          </div>

          {/* Company & Phone Grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="companyName" className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
                <Building2 size={14} className="text-[#d4af37]" /> Company / Brand
              </label>
              <input
                id="companyName"
                type="text"
                autoComplete="organization"
                placeholder="e.g. Your Business Name"
                value={formData.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                className="w-full bg-[#130a24] border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
                <Phone size={14} className="text-[#d4af37]" /> Phone Number
              </label>
              <div className={`flex items-center bg-[#130a24] border rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-[#d4af37] focus-within:border-[#d4af37] transition-all ${
                errors.phone ? "border-red-500/60" : "border-white/10 hover:border-white/20"
              }`}>
                <div className="bg-[#0a0614] text-[#d4af37] font-mono font-semibold text-xs px-3.5 py-3 border-r border-white/10 select-none shrink-0 flex items-center gap-1">
                  <span className="text-xs">🇬🇧</span>
                  <span>+44</span>
                </div>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="7123 456789"
                  value={formData.phone}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^\d\s-]/g, '')
                    if (val.startsWith('0')) val = val.slice(1)
                    updateField("phone", val)
                  }}
                  className="w-full bg-transparent px-4 py-3 text-base sm:text-sm text-white placeholder:text-zinc-500 outline-none"
                />
              </div>
              {errors.phone ? (
                <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
              ) : (
                <p className="text-[10px] text-zinc-400 leading-snug mt-1 font-mono">
                  Mercian Wealth operates exclusively with United Kingdom based businesses.
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label htmlFor="message" className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
              <MessageSquare size={14} className="text-[#d4af37]" /> How can we help? *
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Tell us about your business, current website or infrastructure, and what you would like to achieve."
              value={formData.message}
              onChange={(e) => updateField("message", e.target.value)}
              className={`w-full bg-[#130a24] border rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all resize-none ${
                errors.message ? "border-red-500/60" : "border-white/10 hover:border-white/20"
              }`}
            />
            {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
          </div>

          {submitError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl">
              {submitError}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full py-6 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider bg-[#d4af37] hover:bg-[#fff5d8] text-black rounded-xl border-0 shadow-lg shadow-[#d4af37]/20 transition-all cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Sending Message...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Initiate Conversation ◆
                <ArrowRight size={16} />
              </span>
            )}
          </Button>
        </form>
      </div>

      {/* Floating Success Modal Popup */}
      <AnimatePresence>
        {submitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSubmitted(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0614] border border-[#d4af37]/30 rounded-2xl p-8 sm:p-10 shadow-2xl text-center space-y-6 z-10 text-white"
            >
              {/* Top gold line decoration */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

              {/* Close Icon Button */}
              <button
                onClick={() => setSubmitted(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="mx-auto h-16 w-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/25 flex items-center justify-center text-[#d4af37]">
                <ShieldCheck size={28} />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-mono font-extrabold">
                  Transmission Secure
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase">
                  Message Securely Logged
                </h3>
              </div>

              <div className="text-xs text-zinc-300 leading-relaxed border-t border-white/10 pt-5 space-y-4 font-sans">
                <p>
                  Your enquiry details have been encrypted and routed directly to our engineering team.
                </p>
                <p>
                  We assess every business enquiry and reply via WhatsApp or direct email within <strong>a few business hours</strong>.
                </p>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false)
                  setFormData({
                    fullName: "",
                    email: "",
                    companyName: "",
                    phone: "",
                    message: "",
                  })
                }}
                className="w-full py-3.5 bg-[#d4af37] hover:bg-[#fff5d8] text-black font-mono font-bold rounded-lg text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg shadow-[#d4af37]/20"
              >
                Return to Site
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
