"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Star, ShieldCheck, ArrowRight, Sparkles, TrendingUp } from "lucide-react"

export const LOCAL_PRICING_TIERS = [
  {
    name: "Complete Asset Ownership",
    tagline: "One-Off Capital Asset (Zero Agency Lock-In)",
    setupPrice: "995",
    retainerPrice: "12",
    retainerPeriod: "/month optional hosting",
    termsNote: "50% deposit (£497.50) · 50% on live launch & 100% satisfaction",
    description: "100% asset ownership of your website code, domain, and customer database. Built for business owners wanting zero ongoing agency fees.",
    featured: false,
    badge: "CAPITAL ASSET OWNERSHIP",
    features: [
      "100% Code & Domain Asset Ownership",
      "Fast 3 to 5 Page Mobile Digital Storefront",
      "Google Business Profile & Local Maps Sync",
      "Direct Click-to-WhatsApp & Calling Setup",
      "Stripe or Bank Deposit Payout Integration",
      "Optional £12/mo Edge Hosting & SSL Renewal",
      "1-to-2 Client Orders Completely Pays Off Build",
    ],
    ctaText: "Select Asset Ownership",
  },
  {
    name: "Fully Managed Growth Retainer",
    tagline: "100% Hands-Off Managed Storefront",
    setupPrice: "495",
    retainerPrice: "195",
    retainerPeriod: "/month rolling retainer",
    termsNote: "Reduced upfront build · Rolling monthly, cancel anytime",
    description: "Best for busy owners who want zero tech headaches. Unlimited monthly stock & content updates handled via direct WhatsApp line within 24h.",
    featured: true,
    badge: "MOST POPULAR FOR LOCAL BUSINESSES",
    features: [
      "Complete Online Quote & Deposit Engine",
      "Reduced £495 Upfront Build Cost",
      "Unlimited WhatsApp Stock & Content Updates (24h SLA)",
      "High-Speed Edge Cloud Hosting & SSL Included",
      "Integrated Stripe Deposit & Card Payments",
      "Continuous Local Google Ranking & SEO Tuning",
      "Priority 24/7 Monitoring & Direct WhatsApp Channel",
    ],
    ctaText: "Get Fully Managed Retainer",
  },
  {
    name: "Full Local Domination",
    tagline: "Storefront + Multi-Branch & Marketing",
    setupPrice: "1,495",
    retainerPrice: "395",
    retainerPeriod: "/month managed retainer",
    termsNote: "Complete multi-channel infrastructure & advertising",
    description: "Multi-service architecture, custom CRM/Xero sync, and local Google Ads campaign setup for high-volume trade and healthcare firms.",
    featured: false,
    badge: "MULTI-LOCATION & EXPANSION",
    features: [
      "Everything in Fully Managed Retainer",
      "Multi-Service / Multi-Location Setup",
      "Xero / QuickBooks UK Auto-Sync",
      "Google Local Ads Campaign Architecture",
      "100% White-Labeled Infrastructure",
      "Dedicated Account Manager & VIP SLA",
    ],
    ctaText: "Select Full Domination",
  },
]

export function LocalPricing() {
  return (
    <section id="pricing-local" className="py-16 sm:py-24 bg-[#07050B] relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/30 text-accent-gold text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <ShieldCheck size={14} />
            <span>Dual Commercial Pathways · Zero Surprises</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Accessible Pricing. Uncompromising ROI.
          </h2>
          <p className="text-base sm:text-lg text-text-secondary">
            Choose complete asset ownership with zero agency lock-in, or a 100% hands-off managed growth retainer.
          </p>
        </div>

        {/* Commercial Math Unit Economics Callout */}
        <div className="mb-12 max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-accent-gold/15 via-[#161208] to-accent-gold/15 border border-accent-gold/40 text-center shadow-[0_0_25px_rgba(212,175,55,0.12)]">
          <div className="flex items-center justify-center gap-2 text-accent-gold font-mono font-bold text-xs uppercase tracking-wider mb-1.5">
            <Sparkles size={15} />
            <span>The Commercial Math Guarantee</span>
          </div>
          <p className="text-white font-medium text-sm sm:text-base leading-snug">
            &ldquo;Securing just 1 or 2 new client orders pays for the entire build. Everything after is pure profit.&rdquo;
          </p>
          <p className="text-xs text-text-secondary mt-1.5 font-mono">
            Anchored against zero ongoing loss · Built to capture missed evening &amp; weekend mobile searches
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {LOCAL_PRICING_TIERS.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                tier.featured
                  ? "bg-gradient-to-b from-accent-gold/15 via-bg-secondary to-bg-secondary border-2 border-accent-gold shadow-[0_0_30px_rgba(212,175,55,0.2)] lg:-translate-y-2"
                  : "bg-bg-secondary/60 border border-accent-gold/20 hover:border-accent-gold/40"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent-gold text-black text-[10px] font-mono font-bold uppercase tracking-wider shadow-md whitespace-nowrap">
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold text-white mb-1">{tier.name}</h3>
                  <p className="text-xs text-accent-gold font-mono uppercase tracking-wider">{tier.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-white">£{tier.setupPrice}</span>
                    <span className="text-xs text-text-secondary">one-time build</span>
                  </div>
                  <div className="mt-2 text-xs text-accent-gold font-mono font-semibold">
                    + £{tier.retainerPrice}{tier.retainerPeriod}
                  </div>
                  {tier.termsNote && (
                    <div className="mt-1 text-[11px] text-text-secondary font-sans italic">
                      {tier.termsNote}
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 font-sans">
                  {tier.description}
                </p>

                {/* Feature List */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-white/90">
                      <div className="p-0.5 rounded-full bg-accent-gold/20 text-accent-gold shrink-0 mt-0.5">
                        <Check size={12} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Link
                href={`/book?tier=${encodeURIComponent(tier.name)}`}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  tier.featured
                    ? "bg-accent-gold text-black hover:bg-amber-300 shadow-lg"
                    : "bg-white/5 border border-accent-gold/30 text-white hover:bg-accent-gold/10 hover:border-accent-gold"
                }`}
              >
                <span>{tier.ctaText}</span>
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <div className="mt-12 text-center text-xs text-text-secondary font-mono">
          All local packages include dedicated edge cloud hosting, SSL encryption, and direct phone/WhatsApp support.
        </div>
      </div>
    </section>
  )
}
