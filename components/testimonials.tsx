"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SITE_COPY } from "@/lib/site-copy"
import { createClient } from "@/lib/supabase/client"

interface TestimonialRecord {
  id?: string
  client_name: string
  company: string | null
  testimonial: string
  badge?: string | null
  profile_image?: string | null
}

const STATIC_FALLBACK_TESTIMONIALS: TestimonialRecord[] = [
  {
    client_name: "Tariq K., Founder",
    company: "The Caker Street Bakery · London",
    testimonial: "Before working with Mercian Wealth, our team spent hours every evening chasing messages, manually taking orders, and verifying bank transfers. The 3-tap custom storefront and automated deposit flow reclaimed 499 hours of admin time in our first year and captured over £32,400 in direct orders.",
    badge: "+£32.4k Direct Revenue · 499 Hrs Saved",
  },
]

export function Testimonials() {
  const data = SITE_COPY.homepage.testimonials
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>(STATIC_FALLBACK_TESTIMONIALS)

  useEffect(() => {
    let isMounted = true
    const fetchLiveTestimonials = async () => {
      try {
        const supabase = createClient()
        const { data: liveData, error } = await supabase
          .from("testimonials")
          .select("id, client_name, company, testimonial, badge, profile_image")
          .eq("is_archived", false)
          .order("is_featured", { ascending: false })
          .order("created_at", { ascending: false })
          .limit(4)

        if (!error && liveData && liveData.length > 0 && isMounted) {
          setTestimonials(liveData)
        }
      } catch (err) {
        // Graceful fallback to static array
      }
    }

    fetchLiveTestimonials()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section id="telemetry" className="relative py-20 lg:py-28 overflow-hidden bg-[#09090B] border-t border-slate-800/80">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14 max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#DCAE53] font-mono">
            [ {data.eyebrow} ]
          </span>
          <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            {data.headline}
          </h2>
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111115] border border-[#DCAE53]/30 text-xs text-[#DCAE53] font-mono">
            <Star className="w-3.5 h-3.5 fill-[#DCAE53] stroke-none" />
            <span>{data.guarantee}</span>
          </div>
        </div>

        {/* Client Testimonial Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-14 text-left">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl border border-slate-800 bg-[#111115] space-y-4 shadow-xl relative flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#DCAE53]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#DCAE53] stroke-none" />
                    ))}
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-mono font-bold text-[#34A88E] bg-[#2E8B77]/10 px-2.5 py-0.5 rounded border border-[#2E8B77]/30">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  &ldquo;{item.testimonial}&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">{item.client_name}</p>
                  {item.company && (
                    <p className="text-[11px] text-slate-400 font-mono">{item.company}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-[#DCAE53]">
                  <ShieldCheck size={14} /> Verified Client
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partnership & Growth Cohort Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto p-6 sm:p-8 lg:p-10 rounded-2xl border border-slate-800 bg-[#111115] shadow-2xl space-y-7 text-left relative overflow-hidden min-w-0 max-w-full"
        >
          <div className="relative z-10 space-y-6">
            {/* Top Status Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E8B77]/10 border border-[#2E8B77]/30 text-[10px] font-mono text-[#34A88E] uppercase tracking-widest font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#34A88E] animate-pulse" />
                {data.cohortCard.badge}
              </div>
              <span className="text-[10px] font-mono text-[#DCAE53] uppercase tracking-widest font-semibold">
                STRICT 1 PARTNER PER POSTCODE CATEGORY
              </span>
            </div>

            {/* Headline & Paragraphs */}
            <div className="space-y-4">
              <h3 className="font-sans text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                {data.cohortCard.title}
              </h3>
              
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                {data.cohortCard.paragraph1}
              </p>

              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                {data.cohortCard.paragraph2}
              </p>

              <p className="font-sans text-xs sm:text-sm text-[#DCAE53] font-semibold leading-relaxed border-l-2 border-[#DCAE53] pl-4 py-1">
                {data.cohortCard.paragraph3}
              </p>
            </div>

            {/* Strategy Session Enquiry CTA Box */}
            <div className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-[#18181F] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {data.cohortCard.enquiryCtaText}
              </p>
              <Button asChild size="sm" className="shrink-0 px-6 py-2.5 text-xs font-bold bg-[#DCAE53] text-[#09090B] hover:bg-[#E5B85C] transition-all rounded-lg">
                <Link href="/book" className="flex items-center gap-2">
                  Request Alignment <ArrowRight size={14} />
                </Link>
              </Button>
            </div>

            {/* Trust Bullet Footer */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-start sm:justify-between gap-3 text-xs text-slate-400">
              {data.trustPoints.map((point, idx) => (
                <span key={idx} className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-slate-300">
                  <CheckCircle2 size={13} className="text-[#DCAE53]" /> {point}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
