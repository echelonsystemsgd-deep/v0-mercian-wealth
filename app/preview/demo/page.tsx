'use client'

import React, { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Phone,
  Star,
  MapPin,
  ShieldCheck,
  Clock,
  Award,
  CheckCircle2,
  Calendar,
  Send,
  ArrowRight,
  Sparkles,
  ExternalLink,
  MessageSquare
} from 'lucide-react'

function DemoContent() {
  const searchParams = useSearchParams()

  const businessName = searchParams.get('name') || 'Premier Trade Specialists'
  const trade = searchParams.get('trade') || 'Roofing & Building'
  const phone = searchParams.get('phone') || '+44 7976 225517'
  const city = searchParams.get('city') || 'Worcestershire & West Midlands'
  const rating = searchParams.get('rating') || '5.0'
  const reviews = searchParams.get('reviews') || '57'

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [quoteData, setQuoteData] = useState({
    name: '',
    phone: '',
    postcode: '',
    service: 'Full Inspection & Quote',
    urgency: 'Standard (Next 48 Hours)'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  const cleanPhone = phone.replace(/[^0-9+]/g, '')

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* ── TOP STICKY PROTOTYPE STATUS BANNER ── */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-black px-4 py-2.5 shadow-lg border-b border-amber-400/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 font-extrabold tracking-wide">
            <span className="flex h-2 w-2 rounded-full bg-black animate-ping" />
            <span>
              ⚡ LIVE CONVERSION PROTOTYPE: Engineered specifically for{' '}
              <strong className="underline underline-offset-2">{businessName}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block text-[11px] font-semibold text-black/80">
              Ready to connect to your official domain within 24 hours
            </span>
            <a
              href="https://wa.me/447700185966?text=Hi%20Gurtej,%20I%20saw%20the%20live%20prototype%20for%20my%20business%20and%20want%20to%20discuss%20taking%20it%20live"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="bg-black text-amber-300 hover:text-white px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow transition-all text-[11px]"
            >
              <MessageSquare size={12} /> Claim This Storefront →
            </a>
          </div>
        </div>
      </div>

      {/* ── NAVIGATION BAR ── */}
      <header className="border-b border-white/10 bg-black/60 backdrop-blur-xl sticky top-9 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-black font-extrabold flex items-center justify-center text-lg shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              {businessName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="font-serif font-black text-lg sm:text-xl text-white tracking-tight leading-tight">
                {businessName}
              </h1>
              <p className="text-xs text-amber-400 font-semibold tracking-wider uppercase">
                {trade} • Certified Local Specialists
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${cleanPhone}`}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all"
            >
              <Phone size={14} className="text-amber-400" />
              <span>{phone}</span>
            </a>

            <a
              href="#quote-form"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Get Free Estimate</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          {/* Trust Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <span className="flex items-center gap-1 text-amber-400">
              <Star size={13} className="fill-amber-400" />
              <Star size={13} className="fill-amber-400" />
              <Star size={13} className="fill-amber-400" />
              <Star size={13} className="fill-amber-400" />
              <Star size={13} className="fill-amber-400" />
            </span>
            <span>Rated {rating}/5 across {reviews} verified local reviews</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
            {city.split(',')[0]}’s Trusted{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
              {trade}
            </span>{' '}
            Contractors
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            Delivering high-specification workmanship for residential and commercial properties across {city}. Fully insured, guaranteed timelines, and zero upfront deposit required.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`tel:${cleanPhone}`}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
            >
              <Phone size={16} />
              <span>Call Now: {phone}</span>
            </a>

            <a
              href="#quote-form"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm flex items-center gap-2 transition-all"
            >
              <Calendar size={16} className="text-amber-400" />
              <span>Book 24hr Site Survey</span>
            </a>
          </div>

          {/* 3 Core Proof Signals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3">
              <ShieldCheck className="text-emerald-400 shrink-0" size={24} />
              <div>
                <p className="font-bold text-xs text-white">10-Year Guarantee</p>
                <p className="text-[11px] text-slate-400">Written warranty on all jobs</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3">
              <Clock className="text-amber-400 shrink-0" size={24} />
              <div>
                <p className="font-bold text-xs text-white">Emergency Dispatch</p>
                <p className="text-[11px] text-slate-400">Rapid response across {city.split(',')[0]}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3">
              <Award className="text-blue-400 shrink-0" size={24} />
              <div>
                <p className="font-bold text-xs text-white">Fully Certified</p>
                <p className="text-[11px] text-slate-400">£5M Public Liability Insurance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE QUOTE CALCULATOR & INQUIRY FORM ── */}
      <section id="quote-form" className="py-16 px-4 sm:px-6 bg-black/40 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
              Speed-To-Lead Infrastructure
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              Instant Quote & Project Estimate
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Inquiries sent here instantly notify the team via WhatsApp and SMS within 60 seconds.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0E14] border border-amber-500/20 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="font-serif text-2xl font-bold text-white">
                  Estimate Request Received!
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Our system automatically dispatches this quote directly to the {businessName} WhatsApp emergency channel. A senior estimator will be in touch shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-all"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Harrison"
                      value={quoteData.name}
                      onChange={(e) => setQuoteData({ ...quoteData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-amber-400 text-white text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Phone Number (For WhatsApp Confirmation)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 07700 900123"
                      value={quoteData.phone}
                      onChange={(e) => setQuoteData({ ...quoteData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-amber-400 text-white text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Postcode / Location
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. WR11 4BG"
                      value={quoteData.postcode}
                      onChange={(e) => setQuoteData({ ...quoteData, postcode: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-amber-400 text-white text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Service Required
                    </label>
                    <select
                      value={quoteData.service}
                      onChange={(e) => setQuoteData({ ...quoteData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-amber-400 text-white text-sm outline-none transition-all cursor-pointer"
                    >
                      <option>Emergency Roof & Structural Repair</option>
                      <option>Complete Re-Roof / New Installation</option>
                      <option>Flat & Felt Roofing Solutions</option>
                      <option>Guttering, Fascias & Soffits</option>
                      <option>General Inspection & Drone Survey</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all cursor-pointer mt-2"
                >
                  <Send size={16} />
                  <span>Send Fast Quote Request (Free & Zero Obligation)</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER DISCLOSURE ── */}
      <footer className="py-12 px-4 border-t border-white/5 text-center text-xs text-slate-500 space-y-3">
        <p className="font-semibold text-slate-400">
          © {new Date().getFullYear()} {businessName}. All Rights Reserved.
        </p>
        <p className="max-w-xl mx-auto text-[11px] leading-relaxed text-slate-600">
          This digital conversion storefront was designed & staged as a functional demonstration by{' '}
          <span className="text-amber-400/80 font-semibold">Mercian Wealth High-Ticket Infrastructure</span>.
          Built to illustrate speed-to-lead automation, answer-engine optimization (AEO), and high-conversion client acquisition.
        </p>
      </footer>
    </div>
  )
}

export default function DemoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07090E] flex items-center justify-center text-amber-400 font-serif">
          Loading Live Prototype...
        </div>
      }
    >
      <DemoContent />
    </Suspense>
  )
}
