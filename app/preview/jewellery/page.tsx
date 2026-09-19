'use client'

import React, { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
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
  MessageSquare,
  Gem,
  Check
} from 'lucide-react'

function JewelleryDemoContent() {
  const searchParams = useSearchParams()

  const businessName = searchParams.get('name') || searchParams.get('brand') || 'Veyra Atelier & Fine Jewellery'
  const city = searchParams.get('city') || 'London & UK Regional'
  const phone = searchParams.get('phone') || '+44 7851 055929'
  const rating = searchParams.get('rating') || '5.0'
  const reviews = searchParams.get('reviews') || '64'

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [inquiryData, setInquiryData] = useState({
    name: '',
    phone: '',
    service: 'Bespoke Engagement Ring Commission',
    metal: '18k Yellow Gold / Solid Cast',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  const cleanPhone = phone.replace(/[^0-9+]/g, '')

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-[#DAA640] selection:text-black">
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
              Zero Obligation · Prototype Demonstrating Digital Experience
            </span>
            <a
              href={`https://wa.me/447851055929?text=Hi%20Gurtej,%20I%20saw%20the%20jewellery%20prototype%20for%20${encodeURIComponent(businessName)}%20and%20would%20like%20to%20discuss%20taking%20it%20forward`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="bg-black text-amber-300 hover:text-white px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow transition-all text-[11px]"
            >
              <MessageSquare size={12} /> Claim This Concept →
            </a>
          </div>
        </div>
      </div>

      {/* ── NAVIGATION BAR ── */}
      <header className="border-b border-white/10 bg-[#09090B]/80 backdrop-blur-xl sticky top-9 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DAA640] to-amber-600 text-black font-extrabold flex items-center justify-center text-lg shadow-[0_0_20px_rgba(218,166,64,0.3)]">
              <Gem size={20} className="text-black" />
            </div>
            <div>
              <h1 className="font-serif font-black text-lg sm:text-xl text-white tracking-tight leading-tight">
                {businessName}
              </h1>
              <p className="text-xs text-[#DAA640] font-mono uppercase tracking-wider">
                Bespoke Jewellery &amp; Fine Atelier
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://veyra-premium-3-d-jewellery-e-comme.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all"
            >
              <Sparkles size={14} className="text-[#DAA640]" />
              <span>Launch 3D Model Sandbox</span>
              <ExternalLink size={12} className="text-slate-400" />
            </a>

            <a
              href="#commission-form"
              className="px-4 py-2 rounded-xl bg-[#DAA640] hover:bg-[#E5B85C] text-black font-extrabold text-xs shadow-[0_0_20px_rgba(218,166,64,0.3)] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Book Atelier Consultation</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#DAA640]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          {/* Trust Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#DAA640]/30 text-amber-200 text-xs font-bold shadow-[0_0_15px_rgba(218,166,64,0.15)]">
            <span className="flex items-center gap-1 text-[#DAA640]">
              <Star size={13} className="fill-[#DAA640]" />
              <Star size={13} className="fill-[#DAA640]" />
              <Star size={13} className="fill-[#DAA640]" />
              <Star size={13} className="fill-[#DAA640]" />
              <Star size={13} className="fill-[#DAA640]" />
            </span>
            <span>Rated {rating}/5 across {reviews} private commissions</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
            Elevating <span className="text-[#DAA640]">{businessName}</span> Online.
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            A dedicated digital experience presenting high-ticket jewellery with intentional weight, verified provenance, real-time 3D interaction, and frictionless appointment booking.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://veyra-premium-3-d-jewellery-e-comme.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#DAA640] to-amber-500 hover:from-[#E5B85C] hover:to-[#DAA640] text-black font-extrabold text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(218,166,64,0.35)] transition-all cursor-pointer"
            >
              <Sparkles size={16} />
              <span>Explore Interactive 3D Showcase</span>
              <ExternalLink size={14} />
            </a>

            <a
              href="#commission-form"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm flex items-center gap-2 transition-all"
            >
              <Calendar size={16} className="text-[#DAA640]" />
              <span>Request Private Consultation</span>
            </a>
          </div>

          {/* 3 Core Proof Signals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-[#0B0B0D] border border-white/10 flex items-center gap-3">
              <ShieldCheck className="text-[#DAA640] shrink-0" size={24} />
              <div>
                <p className="font-bold text-xs text-white">Hallmark Certified</p>
                <p className="text-[11px] text-slate-400">UK Assay Office verified solid cast</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0B0D] border border-white/10 flex items-center gap-3">
              <Sparkles className="text-emerald-400 shrink-0" size={24} />
              <div>
                <p className="font-bold text-xs text-white">Sub-Second 3D Atelier</p>
                <p className="text-[11px] text-slate-400">Interactive 360° ring &amp; stone inspection</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0B0D] border border-white/10 flex items-center gap-3">
              <Award className="text-[#DAA640] shrink-0" size={24} />
              <div>
                <p className="font-bold text-xs text-white">Speed-to-Lead WhatsApp</p>
                <p className="text-[11px] text-slate-400">Sub-60s VIP consultation handoff</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE INTERACTIVE 3D PREVIEW SHOWCASE ── */}
      <section className="py-12 px-4 sm:px-6 bg-[#09090B] border-y border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0B0D] border border-[#DAA640]/30 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DAA640]/10 border border-[#DAA640]/30 text-[#DAA640] font-mono text-[10px] uppercase font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DAA640] animate-ping" />
                  <span>Interactive 3D Engine · Production Sandbox</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                  VEYRA Solid Cast Permanent Jewellery
                </h3>
                <p className="text-sm text-slate-300 max-w-xl">
                  Demonstrating how high-value pieces should be experienced online: full 3D orbital controls, realistic material shaders, solid-cast permanence, and instant bespoke inquiries.
                </p>
                <div className="pt-2">
                  <a
                    href="https://veyra-premium-3-d-jewellery-e-comme.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <span>Launch Live VEYRA 3D Atelier</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div className="relative w-full md:w-[320px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#141417]">
                <Image
                  src="/veyra-jewellery-preview-real.jpg"
                  alt="VEYRA 3D Jewellery Prototype"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BESPOKE CONSULTATION & INQUIRY FORM ── */}
      <section id="commission-form" className="py-16 px-4 sm:px-6 bg-[#050505]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#DAA640] font-mono">
              Bespoke Booking Flow
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              Private Commission &amp; Consultation Request
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Clients book private appointments directly into your calendar with full design specifications.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0B0D] border border-white/10 shadow-2xl">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="font-serif text-2xl font-bold text-white">
                  Consultation Request Dispatched!
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Our system simulates the instant handoff: customer specifications are sent directly to the {businessName} WhatsApp line within 60 seconds.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-all cursor-pointer"
                >
                  Test Another Submission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5 font-mono">
                      Client Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lady Charlotte Sterling"
                      value={inquiryData.name}
                      onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-[#DAA640] text-white text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5 font-mono">
                      WhatsApp / Contact Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +44 7700 900123"
                      value={inquiryData.phone}
                      onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-[#DAA640] text-white text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5 font-mono">
                      Commission Category
                    </label>
                    <select
                      value={inquiryData.service}
                      onChange={(e) => setInquiryData({ ...inquiryData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0B0D] border border-white/10 focus:border-[#DAA640] text-white text-sm outline-none transition-all"
                    >
                      <option>Bespoke Engagement Ring</option>
                      <option>Solid Cast Signet / Band</option>
                      <option>Permanent Jewellery Welded Chain</option>
                      <option>Diamond &amp; Gemstone Remounting</option>
                      <option>Private Showroom Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5 font-mono">
                      Preferred Precious Metal
                    </label>
                    <select
                      value={inquiryData.metal}
                      onChange={(e) => setInquiryData({ ...inquiryData, metal: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0B0D] border border-white/10 focus:border-[#DAA640] text-white text-sm outline-none transition-all"
                    >
                      <option>18k Yellow Gold / Solid Cast</option>
                      <option>18k White Gold / Unplated</option>
                      <option>Platinum 950 High-Density</option>
                      <option>14k Rose Gold</option>
                      <option>Undecided / Open to Guidance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5 font-mono">
                    Piece Inspiration or Dimensions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe specific design references, ring sizes, or budget expectations..."
                    value={inquiryData.notes}
                    onChange={(e) => setInquiryData({ ...inquiryData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-[#DAA640] text-white text-sm outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#DAA640] hover:bg-[#E5B85C] text-black font-extrabold text-sm shadow-xl shadow-[#DAA640]/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send size={15} />
                  <span>Submit Private Brief &amp; Lock Consultation</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 border-t border-white/10 bg-[#09090B] text-center text-xs text-slate-400">
        <p>© 2026 {businessName} · Private Concept Prototype by Mercian Wealth</p>
      </footer>
    </div>
  )
}

export default function JewelleryPreviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505] text-white flex items-center justify-center font-mono text-xs">Loading Prototype...</div>}>
      <JewelleryDemoContent />
    </Suspense>
  )
}
