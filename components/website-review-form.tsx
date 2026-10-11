"use client"

import { useState } from "react"
import { Send, CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from "lucide-react"

export function WebsiteReviewForm() {
  const [practiceName, setPracticeName] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [phone, setPhone] = useState("")
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!consent) {
      setErrorMessage("Please confirm consent to receive your review message.")
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch("/api/website-review/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          practice_name: practiceName,
          website_url: websiteUrl,
          phone,
          consent: true,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Unable to submit review request. Please try again.")
      }

      setSubmitted(true)
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit request.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="website-review" className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
      <div className="rounded-3xl border border-[#DAA640]/30 bg-[#0B0B0E] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
        {/* Ambient glow */}
        <div 
          className="absolute top-0 right-0 w-80 h-80 pointer-events-none opacity-10 blur-[100px] rounded-full"
          style={{ background: "radial-gradient(circle, #DAA640 0%, transparent 70%)" }}
        />

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Review Request Received</h3>
            <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
              We&apos;ve queued <span className="text-[#DAA640] font-semibold">{practiceName || "your practice"}</span> for inspection. Our team will review your site on mobile and message your diagnosis directly to <span className="text-white font-mono">{phone}</span>.
            </p>
            <div className="pt-2 text-xs text-slate-500 font-mono">
              No sales pitch · Reply STOP at any time to opt out
            </div>
          </div>
        ) : (
          <div>
            <div className="max-w-2xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DAA640]/10 border border-[#DAA640]/30 text-[#DAA640] text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Obligation Diagnostic</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Free 5-minute website review
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Send us your practice website and we&apos;ll message you what a new client sees on their phone: speed, layout, next step and trust signals. No obligation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="practice_name" className="block text-xs font-mono text-slate-400 mb-1.5">
                    Practice Name *
                  </label>
                  <input
                    id="practice_name"
                    type="text"
                    required
                    value={practiceName}
                    onChange={(e) => setPracticeName(e.target.value)}
                    placeholder="e.g. Apex Chartered Accountants"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-600 text-sm focus:border-[#DAA640] focus:outline-none transition-colors min-h-[48px]"
                  />
                </div>

                <div>
                  <label htmlFor="website_url" className="block text-xs font-mono text-slate-400 mb-1.5">
                    Website URL *
                  </label>
                  <input
                    id="website_url"
                    type="text"
                    required
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="e.g. apexaccountants.co.uk"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-600 text-sm focus:border-[#DAA640] focus:outline-none transition-colors min-h-[48px]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-mono text-slate-400 mb-1.5">
                  WhatsApp Number * (for the review report)
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 07851 055929 or +44 7851 055929"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-600 text-sm focus:border-[#DAA640] focus:outline-none transition-colors min-h-[48px]"
                />
              </div>

              {/* Explicit Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-black/60 text-[#DAA640] focus:ring-[#DAA640] shrink-0"
                  />
                  <span className="text-xs text-slate-300 leading-relaxed">
                    We&apos;ll message you about your website review only. Reply STOP any time.
                  </span>
                </label>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  {errorMessage}
                </div>
              )}

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#DAA640] hover:bg-[#c99535] text-black font-bold text-sm sm:text-base transition-all shadow-lg shadow-[#DAA640]/20 min-h-[48px] disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Free 5-Minute Review</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
