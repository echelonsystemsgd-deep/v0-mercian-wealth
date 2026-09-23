'use client'

import React, { useState, useEffect } from 'react'
import {
  X,
  Copy,
  Check,
  Sparkles,
  Laptop,
  Code2,
  ExternalLink,
  Bot,
  FileCode,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react'
import { OutreachLead } from './outreach-modal'

interface AntigravityPromptModalProps {
  isOpen: boolean
  onClose: () => void
  lead: OutreachLead | null
}

export function AntigravityPromptModal({
  isOpen,
  onClose,
  lead
}: AntigravityPromptModalProps) {
  const [activeTab, setActiveTab] = useState<'tailored' | 'universal' | 'liveDemo'>('tailored')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !lead) return null

  const businessName = lead.business_name || lead.name || 'Local Business'
  const rawTrade = lead.local_business_niche || lead.scraped_metadata?.trade || 'Jeweller'
  const trade = (!rawTrade || rawTrade.length > 30 || rawTrade.startsWith('Hi ') || rawTrade.toLowerCase().includes('came across')) ? 'Jeweller' : rawTrade
  const rawWebsite = (lead.website || '').trim()
  const hasWebsite = rawWebsite !== '' && rawWebsite !== 'None' && rawWebsite !== 'NO WEBSITE' && !rawWebsite.toLowerCase().includes('facebook.com') && !rawWebsite.toLowerCase().includes('instagram.com')
  
  // Clean rating & reviews
  let rating = Number(lead.scraped_metadata?.rating || 5.0)
  let reviewsCount = Number(lead.scraped_metadata?.reviews_count ?? (lead.scraped_metadata as any)?.reviews ?? 0)
  const composite = (lead.scraped_metadata as any)?.rating_reviews || lead.notes || ''
  if ((!reviewsCount || reviewsCount === 0) && composite) {
    const match = composite.match(/(\d+)\s*\([★*]?\s*([\d.]+)\)/)
    if (match) {
      reviewsCount = parseInt(match[1], 10)
      rating = parseFloat(match[2])
    }
  }

  // Clean address
  const rawAddr = (lead.scraped_metadata?.address || '').trim()
  const rawNotes = (lead.notes || '').trim()
  let address = rawAddr
  if (!address && rawNotes && !rawNotes.startsWith('·') && !rawNotes.includes('★')) {
    address = rawNotes
  }
  if (!address || address.startsWith('·') || address.includes('★')) {
    address = 'UK Regional'
  }
  const cleanDigits = (lead.phone || '').replace(/[^0-9]/g, '')
  const ownerName = lead.name && lead.name !== lead.business_name && !lead.name.includes('Owner') ? lead.name.split(' ')[0] : 'Owner / Director'

  // Dynamic Live Demo URL
  const demoUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/preview/demo?name=${encodeURIComponent(businessName)}&trade=${encodeURIComponent(trade)}&phone=${encodeURIComponent(lead.phone || '')}&city=${encodeURIComponent(address)}&rating=${rating}&reviews=${reviewsCount}`
    : `https://mercianwealth.co.uk/preview/demo?name=${encodeURIComponent(businessName)}`

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. UNIVERSAL PROTOTYPE PROMPT
  // ─────────────────────────────────────────────────────────────────────────────
  const universalPrompt = `# 1. UNIVERSAL PROTOTYPE PROMPT (Antigravity — build once, reuse for every cold lead)

You are acting as the combined Creative Director, Senior Brand Strategist, Senior UX/UI Designer, Principal Frontend Engineer, Conversion Rate Optimisation Specialist, Local SEO Specialist, Mobile UX Specialist, Performance Engineer, Accessibility Engineer, and Technical QA Lead.

## STEP ONE: BRAINSTORM BEFORE BUILDING

Before writing any code, think through and document in \`/docs/IMPLEMENTATION_PLAN.md\`:
- Who this generic prototype needs to convince (a range of different roofing/trade business owners, each seeing it cold, none of whom have agreed to anything yet)
- What makes a *generic* trade prototype still feel credible rather than templated, given it can't reference any real business's actual details
- Your proposed design direction (colour, type, layout) and why it avoids common AI-generated design defaults — review your own plan against those defaults before proceeding, and revise anything that reads as a default choice rather than one made deliberately for this brief
- Any risks specific to a prototype that will be shown to 100+ different businesses (e.g. anything that could look like a claim about a specific business by accident)

## BUSINESS CONTEXT

This is a **generic outreach prototype** for a local trade business (roofing and adjacent trades — guttering, cladding, fascias). It is not built for any specific business and must never claim to be. It exists to be shown to many different cold leads as "here's what's possible," before any of them have agreed to anything.

## NON-NEGOTIABLE RULES

- Every business-identifying field (name, phone, area, reviews, certifications) must be a clearly bracketed placeholder — \`[Business Name]\`, \`[service area]\`, \`[Phone / WhatsApp]\` — never a real or invented-sounding specific value.
- Display a visible, permanent banner stating this is a prototype preview, not a live business site.
- The "Our Work" / portfolio section must be explicitly labelled as sample layout, not real completed jobs — no fabricated project photos presented as real.
- No fabricated stats, review counts, years-trading figures, or certifications anywhere.
- **Branding must contain nothing but this prototype's own placeholder identity** — no leftover framework/template branding (default Next.js starter metadata, a UI library's demo name, any name from a previous project), no third-party "built with" credits left in the code or footer, no default favicon/icon from scaffolding. Every trace of anything that isn't this prototype's own placeholder branding must be found and removed.
- WhatsApp is the only conversion mechanism — no contact form, no email capture. Every CTA (header, hero, mid-page banner, sticky mobile bar) is a WhatsApp button, consistently styled: brand green \`#25D366\`, white text, real WhatsApp icon.

## STRUCTURE

Header (logo mark + nav + WhatsApp CTA) → Hero (trade + area + one-line value prop + WhatsApp CTA) → Trust strip (qualitative only) → Services (staggered list, not a generic card grid) → Work/portfolio (clearly labelled sample layout) → Process (numbered, genuine sequence) → Mid-page WhatsApp CTA band → FAQ (generic, honestly answerable) → Footer → Sticky mobile WhatsApp/call bar.

## DESIGN REQUIREMENTS

- Avoid generic AI-design defaults: no warm-cream-plus-serif combo, no near-black-plus-neon-accent combo, no identical rounded SaaS cards, no ALL-CAPS eyebrow labels, no em-dash-joined labels.
- Ground the visual language in the actual trade — roofline/pitch shapes, tile-course-style staggered layout, materials-appropriate palette (slate, fired-brick, stone tones) rather than generic tech-startup styling.
- Mobile-first: 320px, 375px, 390px, 430px, 768px, 1024px+ — zero horizontal overflow. Tap targets ≥44×44px. Mobile body text ≥16px. Sticky WhatsApp bar never overlaps other content.
- One deliberate bold visual move, restrained everywhere else.

## METADATA (generic prototype version)

- Title/description referencing the trade generically (e.g. "Roofing & Guttering — Prototype Preview"), never a specific business name.
- Open Graph image: a generic, sample-labelled image — never presented as a real business's photo.
- No structured data (\`LocalBusiness\`/\`GeneralContractor\` schema) at all in this generic version — that only gets added in the tailored build, since schema markup implies a real, specific business.
- \`robots: noindex\` — this prototype should never be indexed by search engines, since it isn't a real business.

## TECHNICAL BASELINE

Next.js (App Router), TypeScript, Tailwind CSS, semantic HTML, no unnecessary dependencies. \`npm run build\` and \`npm run dev\` must complete with zero errors.

## VERIFICATION

- [ ] No leftover branding from any framework default, template, or prior project exists anywhere in the code, metadata, or visible UI
- [ ] Every placeholder is clearly a placeholder, not a plausible-looking fake specific value
- [ ] \`robots: noindex\` is set
- [ ] No structured data/schema markup is present
- [ ] Mobile tested at all six breakpoints, zero overflow, zero console errors
- [ ] Document in the implementation plan: what design defaults you considered and rejected, and why your final choice is specific to a trade-business prototype rather than generic`

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. TAILORED BUILD PROMPT (PRE-FILLED WITH LEAD CONTEXT BLOCK)
  // ─────────────────────────────────────────────────────────────────────────────
  const tailoredPrompt = `============================================================
LEAD CONTEXT
============================================================
BUSINESS NAME:
${businessName}

CONTACT NAME:
${ownerName}

TRADE TYPE:
${trade}

SERVICE AREA(S):
${address}

WEBSITE STATUS:
${hasWebsite ? 'Outdated but functional — needs modern mobile conversion overhaul' : 'No website'}

CURRENT WEBSITE (if any):
${rawWebsite || 'None'}

PHONE / WHATSAPP:
${cleanDigits || 'Not confirmed'}

EMAIL:
${lead.email || 'Not confirmed'}

SOCIAL LINKS:
Instagram: None
Facebook: None

REVIEWS / RATING:
${reviewsCount > 0 ? `${reviewsCount} reviews, ${rating} on Google` : '5.0 on Google — unconfirmed review count'}

YEARS TRADING:
Not confirmed — do not display

CERTIFICATIONS / ACCREDITATIONS:
None confirmed

INSURANCE / GUARANTEES:
None confirmed — do not display

PROJECT PHOTOS AVAILABLE:
No — none supplied yet

BRAND ASSETS AVAILABLE:
None supplied

KNOWN STRENGTHS (from conversation with the lead):
5-star Google presence, strong local reputation in ${address.split(',')[0]}

KNOWN PAIN POINTS (from conversation with the lead):
${hasWebsite ? 'Current website loses mobile leads to faster local competitors' : 'No digital storefront — completely invisible when local clients search online'}

IMPORTANT — DO NOT DELETE THIS SECTION:
Do not invent anything not supplied above — especially certifications, years trading,
insurance, guarantees, or review counts. Any field left as "Not confirmed" or "None
confirmed" must be omitted from the finished site or clearly flagged for the client to
confirm — never filled in with a plausible-sounding guess.
============================================================

## MASTER TAILORED BUILD PROMPT

You are acting as the combined Creative Director, Senior Brand Strategist, Senior UX/UI Designer, Principal Frontend Engineer, Conversion Rate Optimisation Specialist, Local SEO Specialist, Mobile UX Specialist, Performance Engineer, Accessibility Engineer, and Technical QA Lead.

### STEP ONE: BRAINSTORM BEFORE BUILDING

Before writing any code, review the completed Lead Context Block above and document in \`/docs/IMPLEMENTATION_PLAN.md\`:
- What this specific business's genuinely strongest confirmed asset is (real reviews, real photos, a specific specialism, years trading) and why the homepage should be built around it
- At least three concrete ways this build will be visually and structurally distinct from the generic prototype and from any other tailored build already delivered — be specific (palette choice, layout choice, section order, copy tone), not vague ("it'll feel unique")
- Any gap in the Lead Context Block that limits what can honestly be built right now, and what should be asked of the business owner before launch
- Your best suggestions for making this the strongest possible site for this specific business, given only what's confirmed — propose options, explain trade-offs, and flag anything that needs the founder's decision rather than deciding unilaterally

Only proceed to building once this brainstorm is documented.

### SCENARIO DETERMINATION

Read WEBSITE STATUS from the Lead Context Block:
- **No website** → build the complete digital presence from scratch using only the confirmed details.
- **Broken / parked / outdated** → first audit the existing live site in full (every page, every asset) before rebuilding; preserve genuinely real, reusable assets (real photos, accurate copy, real reviews), replace everything else.

### NEVER INVENT BUSINESS FACTS

Every field marked "Not confirmed" or "None confirmed" in the Lead Context Block must be **omitted from the finished site**, never filled in with a plausible guess. List every omission under "Client Information Required" in \`/docs/IMPLEMENTATION_PLAN.md\`.

### BRANDING — THIS BUSINESS ONLY, NOTHING ELSE

The finished site must contain **only** this business's real branding — name, logo, colours, and confirmed identity — and nothing else, anywhere:
- No trace of the generic prototype's placeholder branding, bracket text, or "prototype preview" banner may remain.
- No leftover framework/template default branding (starter metadata, demo names, boilerplate \`og:site_name\`).
- No branding from any other tailored build previously delivered for a different lead.
- No third-party "built with"/"powered by" credit unless the business itself explicitly wants one shown.
- Favicon, \`apple-touch-icon\`, and all metadata must reflect this business's own real logo/name — generate a simple placeholder monogram only if no real logo is supplied, and flag "needs real logo" under Client Information Required.

### DIFFERENTIATION

This build must be genuinely distinct from the generic prototype and from every other tailored build already delivered. Derive the palette from this business's real brand assets if supplied; otherwise choose a palette suited specifically to this business's trade/character. Reorder the homepage around this business's actual strongest confirmed asset, not a fixed template order. Vary section styling, copy phrasing, and layout choices deliberately — document every choice and its reasoning under "Differentiation Notes."

### WHATSAPP-FIRST CONVERSION

Every CTA (header, hero, service cards, footer, sticky mobile bar) links to \`https://wa.me/${cleanDigits}\`, styled consistently in WhatsApp brand green (\`#25D366\`) throughout. No contact form as the primary conversion path.

### REAL PHOTOS ONLY

Use only photos confirmed available. If none are supplied, use clearly-labelled "Sample project — photo to be replaced" placeholders — never a generic stock photo presented as real work. Flag under Client Information Required.

### MOBILE-FIRST, NON-NEGOTIABLE

320px, 375px, 390px, 430px, 768px, 1024px+ — zero horizontal overflow, tap targets ≥44×44px, mobile body text ≥16px, sticky WhatsApp bar never overlapping content, Lighthouse mobile performance target 90+.

### TECHNICAL BASELINE

Next.js (App Router), TypeScript, Tailwind CSS. Typed data structures for Business, Service, Area, Review, Project, FAQ — no hardcoded content. \`npm run build\` and \`npm run dev\` clean with zero errors.

### METADATA & STRUCTURED DATA (tailored version — unlike the generic prototype, this one is real)

- Unique title/meta description per page using this business's real name, real trade, real area.
- Self-referencing canonical URL on every page.
- Open Graph and Twitter card tags using real project photos (or clearly-marked placeholders), \`og:site_name\` set to this business's real name only.
- \`robots: index, follow\` (unlike the generic prototype) — this is a real site meant to be found.
- Structured data: \`GeneralContractor\` or \`HomeAndConstructionBusiness\` schema, populated only with confirmed fields from the Lead Context Block (\`name\`, \`telephone\`, \`areaServed\`, \`sameAs\` for confirmed real socials only). Omit \`address\`, \`aggregateRating\`, \`priceRange\`, and \`openingHours\` unless explicitly confirmed. Never fabricate a field to complete the schema.
- Sitemap and \`robots.txt\` reflecting only this business's real, final routes.
- If rebuilding an outdated/broken site with an existing indexed URL structure, map old URLs to new ones with 301 redirects so no existing search visibility is lost.

### VERIFICATION

- [ ] Brainstorm section completed and documented before any code was written
- [ ] Every Lead Context Block field correctly used or correctly omitted — nothing guessed
- [ ] No trace of the generic prototype's placeholder branding, banner, or bracket text remains
- [ ] No branding from any other business or prior build appears anywhere
- [ ] Every WhatsApp CTA wired to the confirmed real number, consistent styling throughout
- [ ] At least three genuine differentiation choices documented, distinguishing this build from the generic prototype and prior tailored builds
- [ ] Mobile tested at all six breakpoints, zero overflow, zero console errors
- [ ] Structured data validates with only confirmed fields present
- [ ] \`/docs/IMPLEMENTATION_PLAN.md\` lists every unconfirmed field under Client Information Required`

  const activeText = activeTab === 'tailored' ? tailoredPrompt : universalPrompt

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#090D14] border border-gold/30 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.2)] overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-gold/15 bg-gradient-to-r from-gold/15 via-white/[0.02] to-transparent flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-gold/20 text-gold border border-gold/35 flex items-center gap-1">
                <Bot size={12} /> Antigravity Vibecoding Engine
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground font-semibold">{trade}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-white">
              {businessName} Storefront Builder
            </h2>
            <p className="text-xs text-muted-foreground">
              Generate an instant live prototype demo or copy pre-filled prompts to build with Antigravity.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-muted-foreground hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="p-4 border-b border-white/5 bg-black/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10 text-xs font-bold">
            <button
              onClick={() => setActiveTab('tailored')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'tailored'
                  ? 'bg-gold/25 text-gold border border-gold/40 shadow-sm font-extrabold'
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              <Sparkles size={13} /> 1. Tailored Build Prompt (Lead Pre-filled)
            </button>

            <button
              onClick={() => setActiveTab('universal')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'universal'
                  ? 'bg-gold/25 text-gold border border-gold/40 shadow-sm font-extrabold'
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              <FileCode size={13} /> 2. Universal Prototype Prompt
            </button>

            <button
              onClick={() => setActiveTab('liveDemo')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'liveDemo'
                  ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-sm font-extrabold'
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              <Laptop size={13} /> 3. Live Demo URL
            </button>
          </div>

          {activeTab !== 'liveDemo' ? (
            <button
              onClick={() => handleCopy(activeText)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold to-gold-light text-black font-extrabold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.35)] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all cursor-pointer ml-auto"
            >
              {copied ? <Check size={14} className="text-black" /> : <Copy size={14} />}
              <span>{copied ? 'Copied Prompt!' : 'Copy Antigravity Prompt'}</span>
            </button>
          ) : (
            <a
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all cursor-pointer ml-auto"
            >
              <ExternalLink size={14} />
              <span>Launch Live Prototype ↗</span>
            </a>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 discord-scroll space-y-4">
          {activeTab === 'liveDemo' ? (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#06080D] border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Laptop size={14} /> Instant Outreach Storefront URL
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">Dynamic Trojan Horse</span>
                </div>
                <p className="text-xs text-slate-300">
                  This live URL dynamically adapts to <strong>{businessName}</strong>, showing their real phone ({lead.phone || 'N/A'}), local city ({address}), and Google star reviews. Send this link in Stage 2 to prove what is possible before asking for a penny.
                </p>

                <div className="p-3 bg-black/80 rounded-xl border border-white/10 flex items-center justify-between gap-3 text-xs font-mono text-gold break-all">
                  <span className="truncate">{demoUrl}</span>
                  <button
                    onClick={() => handleCopy(demoUrl)}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-sans text-xs font-bold shrink-0 transition-all cursor-pointer"
                  >
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold text-xs flex items-center gap-2 shadow transition-all"
                  >
                    <ExternalLink size={13} /> Open Live Storefront in New Tab
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-semibold text-foreground/90">
                  {activeTab === 'tailored'
                    ? 'Pre-filled with actual business telemetry from Google Maps & Apify:'
                    : 'Generic prototype prompt for building the master cold demo:'}
                </span>
                <span className="text-[11px] text-gold/90 font-mono">Ready for Antigravity</span>
              </div>

              {/* Code Box */}
              <div className="relative rounded-2xl bg-[#06080D] border border-gold/15 p-4 shadow-inner">
                <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed select-all max-h-[420px] overflow-y-auto discord-scroll">
                  {activeText}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 bg-black/60 flex items-center justify-between text-xs">
          <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
            <Bot size={13} className="text-gold" />
            Paste this prompt directly into Antigravity or Cursor to code the site in 5 minutes.
          </p>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-foreground font-semibold transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
