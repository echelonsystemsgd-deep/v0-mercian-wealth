"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Bot, 
  X, 
  Send, 
  Volume2, 
  VolumeX, 
  MessageSquareText,
  Sparkles,
  ArrowRight,
  RotateCcw
} from "lucide-react"
import Link from "next/link"

interface ChatMessage {
  id: string
  sender: "ai" | "user"
  text: string
  timestamp: string
  actionUrl?: string
  actionLabel?: string
}

interface KnowledgeTopic {
  id: string
  keywords: string[]
  question: string
  answer: string
  actionUrl?: string
  actionLabel?: string
}

const KNOWLEDGE_BASE: KnowledgeTopic[] = [
  {
    id: "pricing-setup",
    keywords: ["price", "pricing", "cost", "how much", "rate", "rates", "fee", "fees", "package", "packages", "tier", "tiers", "investment", "setup fee"],
    question: "What are your fixed setup packages and prices?",
    answer: "We offer three fixed-investment packages with zero hidden fees:\n\n• Starter (£495) — Sub-second mobile storefront, 3-tap booking flow, and instant WhatsApp lead dispatch.\n• Growth (£995) — Full multi-service order builder, Stripe upfront deposit collection, calendar synchronization, and automated Google review extraction.\n• Scale (£1,995) — Advanced multi-location infrastructure, custom CRM/ERP integration, and high-volume order flows.\n\nAll builds include our 48-hour working prototype guarantee before you commit.",
    actionUrl: "/pricing",
    actionLabel: "View Full Pricing Matrix"
  },
  {
    id: "pricing-retainers",
    keywords: ["retainer", "retainers", "monthly", "maintenance", "ongoing", "support cost", "care plan", "subscription", "cancel", "notice"],
    question: "How do the monthly retainers work?",
    answer: "All retainers are billed month-to-month with 30 days notice and zero long-term lock-in contracts:\n\n• Maintenance Retainer (£195/mo) — Covers cloud hosting, uptime monitoring, security updates, and monthly conversion tuning.\n• Growth Retainer (£495/mo) — Includes continuous intake flow optimization, catalog updates, and monthly performance reviews.\n• Scale Retainer (£995/mo) — Dedicated engineer hotline, guaranteed same-day SLA, and continuous multi-channel conversion engineering.",
    actionUrl: "/pricing",
    actionLabel: "Compare Retainer Plans"
  },
  {
    id: "prototype-policy",
    keywords: ["prototype", "demo", "try", "free", "sample", "test", "working model", "before commit", "48h", "48 hours"],
    question: "How does the 48-hour working prototype work?",
    answer: "We build a fully functioning prototype configured specifically for your business within 48 hours — at zero cost and with zero commitment.\n\nYou test the enquiry flow, booking mechanics, and mobile notifications directly on your own smartphone. You only decide to proceed if the system clearly demonstrates commercial ROI.",
    actionUrl: "/book",
    actionLabel: "Request 48h Prototype"
  },
  {
    id: "whatsapp-alerts",
    keywords: ["whatsapp", "alert", "alerts", "notification", "notifications", "phone ping", "mobile alert", "sms", "text message", "smartphone"],
    question: "How do instant WhatsApp smartphone alerts work?",
    answer: "When a customer submits an enquiry or books an appointment, our webhook engine formats their full specifications (name, phone, required service, urgency, postcode, and deposit status) and dispatches it straight to your WhatsApp in under 5 seconds.\n\nYour engineers or directors get all necessary context instantly on their phone with zero manual CRM data entry.",
  },
  {
    id: "builders-intake",
    keywords: ["builder", "builders", "order builder", "booking", "triage", "qualify", "qualification", "intake", "screen", "filter", "tire kickers", "questions"],
    question: "How do your 3-tap builders qualify leads?",
    answer: "Our 3-tap order and booking builders replace clunky contact forms with visual smartphone selection cards. They ask your exact scoping questions, provide instant pricing guidance, filter out time-wasters automatically, and route genuine buyers directly to your live booking diary.",
    actionUrl: "/services#builders",
    actionLabel: "Explore Order Builders"
  },
  {
    id: "calendar-booking",
    keywords: ["calendar", "booking", "diary", "schedule", "scheduling", "appointment", "appointments", "google calendar", "outlook", "slots"],
    question: "How does calendar booking and scheduling work?",
    answer: "Our system syncs bi-directionally with Google Calendar and Microsoft Outlook in real-time. It only offers genuine open slots, locks confirmed appointments immediately to prevent double-booking, and triggers automated SMS and WhatsApp confirmation reminders to slash no-show rates.",
    actionUrl: "/services#builders",
    actionLabel: "Inspect Workflow Sync"
  },
  {
    id: "deposits-stripe",
    keywords: ["deposit", "deposits", "stripe", "payment", "payments", "credit card", "apple pay", "google pay", "card", "pay upfront"],
    question: "Can we collect upfront card deposits?",
    answer: "Yes. Using Stripe UK, Apple Pay, and Google Pay, customers can secure their consultation or service booking by paying a fixed or custom deposit in 3 taps. Funds settle directly into your business bank account, filtering time-wasters and guaranteeing commitment.",
  },
  {
    id: "google-reviews",
    keywords: ["review", "reviews", "google review", "google reviews", "reputation", "5 star", "5-star", "trustpilot", "ratings", "feedback"],
    question: "How does the automated 5-star Google review engine work?",
    answer: "Once a job or appointment is completed in your calendar or CRM, the system automatically triggers a polite SMS or WhatsApp follow-up with a direct one-tap Google review link. This consistently captures verified 5-star feedback, compounding your local Google Maps ranking.",
  },
  {
    id: "zero-disruption",
    keywords: ["disrupt", "disruption", "guarantee", "downtime", "cutover", "domain", "email", "emails", "google ranking", "seo", "existing site"],
    question: "What is the Zero-Disruption Launch Guarantee?",
    answer: "We guarantee 100% operational continuity. We build and test your new automation infrastructure on a private staging link. When ready, domain cutover takes minutes with zero downtime.\n\nYour existing domain name, business email accounts (Google Workspace / Microsoft 365), and Google SEO rankings remain completely intact.",
  },
  {
    id: "timeline-protocol",
    keywords: ["timeline", "how long", "turnaround", "how fast", "speed", "when ready", "deployment", "protocol", "7 days", "days"],
    question: "What is your deployment timeline?",
    answer: "Our standard deployment timeline is 7 business days from project kickoff to full production cutover:\n\n• Days 1–2: Bespoke prototype delivered to your phone.\n• Days 3–4: Qualification logic, calendar sync & Stripe integration.\n• Days 5–6: End-to-end sandbox testing & staff preview.\n• Day 7: Zero-downtime domain cutover & live go-live.",
    actionUrl: "/process",
    actionLabel: "View 7-Day Protocol"
  },
  {
    id: "integrations-crm",
    keywords: ["integration", "integrations", "crm", "airtable", "hubspot", "salesforce", "servicetitan", "zapier", "make", "webhook", "webhooks", "sheets"],
    question: "Which CRMs, tools, and platforms do you integrate with?",
    answer: "We integrate directly with all major business tools:\n\n• CRMs: Airtable, HubSpot, Salesforce, ServiceTitan, Jobber.\n• Calendars: Google Calendar, Outlook, Office 365.\n• Payments: Stripe UK, Apple Pay, Google Pay.\n• Communications: WhatsApp Business Cloud API, Twilio, Resend.\n• Custom: Webhooks and REST APIs for bespoke in-house databases.",
  },
  {
    id: "industries",
    keywords: ["industry", "industries", "trades", "contractor", "contractors", "clinic", "clinics", "builder", "builders", "plumber", "electrician", "salon", "aesthetics", "commercial"],
    question: "Which industries do you specialise in?",
    answer: "We work primarily with high-ticket UK local operators where missed enquiries equal lost revenue:\n\n• Commercial Contractors & Trade Specialists (HVAC, Electrical, Roofing, Construction)\n• Private Medical & Aesthetics Clinics\n• High-Value Professional & Legal Consultancies\n• Luxury Services & Bespoke Artisans",
    actionUrl: "/portfolio",
    actionLabel: "Explore Case Studies"
  },
  {
    id: "company-location",
    keywords: ["who are you", "who is mercian", "where are you", "location", "uk", "berkshire", "team", "founder", "headquarters", "office"],
    question: "Who is Mercian Wealth and where are you based?",
    answer: "Mercian Wealth is an independent automation and digital infrastructure engineering firm based in Berkshire, United Kingdom.\n\nWe build custom high-converting systems for UK businesses. All engineering is conducted in-house with dedicated UK engineer support and full UK/EU GDPR compliance.",
    actionUrl: "/contact",
    actionLabel: "Contact Our UK Desk"
  },
  {
    id: "next-steps",
    keywords: ["start", "get started", "book", "call", "next step", "contact", "talk", "consultation", "discovery"],
    question: "How do we get started?",
    answer: "The easiest way is to book a 15-minute discovery slot on our live diary. We will dissect your current enquiry channels, identify leakage points, and assemble a free working prototype for your business within 48 hours.",
    actionUrl: "/book",
    actionLabel: "Book 15-Min Discovery Call"
  }
]

const QUICK_PROMPTS = [
  "What are your fixed setup prices?",
  "How do instant WhatsApp alerts work?",
  "How does the 48h free prototype work?",
  "Can we collect upfront card deposits?",
  "What is the Zero-Disruption guarantee?",
  "Which CRMs & calendars do you sync with?",
  "How does the 5-star Google review engine work?",
  "What are the terms of your monthly retainers?"
]

export function FloatingAiConcierge() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [inputVal, setInputVal] = useState<string>("")
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const [speechMuted, setSpeechMuted] = useState<boolean>(true)
  const [isThinking, setIsThinking] = useState<boolean>(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! I'm the Mercian Wealth assistant. Ask me anything about our sub-second mobile storefronts, 3-tap booking builders, upfront Stripe deposits, pricing packages, or our 48-hour working prototype guarantee.",
      timestamp: "Just now"
    }
  ])

  const chatContainerRef = useRef<HTMLDivElement | null>(null)
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const keepAliveIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isThinking])

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
      if (keepAliveIntervalRef.current) {
        clearInterval(keepAliveIntervalRef.current)
      }
    }
  }, [])

  const speakText = (text: string) => {
    if (speechMuted || typeof window === "undefined" || !("speechSynthesis" in window)) return

    try {
      window.speechSynthesis.cancel()
      if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current)

      const cleanText = text.replace(/[*•#]/g, "").replace(/\n\n/g, ". ")
      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.rate = 1.05
      utterance.pitch = 1.0
      utterance.lang = "en-GB"

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => {
        setIsSpeaking(false)
        if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current)
      }
      utterance.onerror = () => {
        setIsSpeaking(false)
        if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current)
      }

      activeUtteranceRef.current = utterance

      keepAliveIntervalRef.current = setInterval(() => {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.pause()
          window.speechSynthesis.resume()
        }
      }, 4000)

      window.speechSynthesis.speak(utterance)
    } catch {
      setIsSpeaking(false)
    }
  }

  const findBestResponse = (query: string): { text: string; actionUrl?: string; actionLabel?: string } => {
    const clean = query.toLowerCase().trim()

    // 1. Direct prompt question match
    const exactMatch = KNOWLEDGE_BASE.find(k => k.question.toLowerCase() === clean)
    if (exactMatch) {
      return {
        text: exactMatch.answer,
        actionUrl: exactMatch.actionUrl,
        actionLabel: exactMatch.actionLabel
      }
    }

    // 2. Multi-keyword weighted scoring
    let bestTopic: KnowledgeTopic | null = null
    let highestScore = 0

    for (const topic of KNOWLEDGE_BASE) {
      let score = 0
      for (const kw of topic.keywords) {
        if (clean.includes(kw)) {
          // Longer keyword matches earn higher weight
          score += kw.split(" ").length * 2 + kw.length
        }
      }

      if (score > highestScore) {
        highestScore = score
        bestTopic = topic
      }
    }

    if (bestTopic && highestScore >= 3) {
      return {
        text: bestTopic.answer,
        actionUrl: bestTopic.actionUrl,
        actionLabel: bestTopic.actionLabel
      }
    }

    // 3. Fallback with structured choices
    return {
      text: "I can assist you with our fixed-price setup packages (£495–£1,495), our 48-hour free working prototype, 24/7 WhatsApp smartphone alerts, automated calendar booking, or our zero-disruption launch guarantee. Which area would you like to explore?",
      actionUrl: "/pricing",
      actionLabel: "View Solutions & Pricing"
    }
  }

  const handleSend = (text: string) => {
    if (!text.trim()) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: "Just now"
    }

    setMessages(prev => [...prev, userMsg])
    setInputVal("")
    setIsThinking(true)

    setTimeout(() => {
      const match = findBestResponse(text)
      setIsThinking(false)

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: match.text,
        timestamp: "Just now",
        actionUrl: match.actionUrl,
        actionLabel: match.actionLabel
      }

      setMessages(prev => [...prev, aiMsg])
      speakText(match.text)
    }, 280)
  }

  const handleResetChat = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "ai",
        text: "Conversation reset. Ask me anything about our sub-second mobile storefronts, 3-tap booking builders, upfront Stripe deposits, or our 48-hour working prototype guarantee.",
        timestamp: "Just now"
      }
    ])
  }

  return (
    <>
      {/* Floating Trigger Button at Bottom Left (Hidden on mobile <640px to prevent clutter) */}
      <div className="fixed bottom-5 left-5 z-30 hidden sm:block font-sans">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(true)}
          className="relative group px-4 py-3 rounded-full bg-[#111115] border border-slate-700 hover:border-[#DCAE53]/60 text-slate-200 hover:text-white shadow-2xl flex items-center gap-2.5 cursor-pointer transition-colors"
          aria-label="Open Questions Assistant"
        >
          <div className="relative flex items-center justify-center">
            <MessageSquareText className="w-4 h-4 text-[#DCAE53]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span className="font-mono text-xs font-semibold tracking-wide">
            Questions? Ask Assistant
          </span>
        </motion.button>
      </div>

      {/* Interactive Chat Drawer (Opens at Bottom Left) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-start sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full sm:max-w-[440px] bg-[#111115] border border-[#DCAE53]/40 sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden flex flex-col h-[560px] sm:h-[620px] max-h-[92vh]"
            >
              
              {/* Drawer Header */}
              <div className="p-4 bg-[#18181F] border-b border-slate-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#DCAE53]/15 text-[#DCAE53] border border-[#DCAE53]/30">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      <span>Mercian Assistant</span>
                      <span className="text-[9px] font-mono text-[#DCAE53] bg-[#DCAE53]/10 px-1.5 py-0.5 rounded border border-[#DCAE53]/25 font-semibold">AI Concierge</span>
                    </h3>
                    <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Instant Knowledge · 14 Systems Scoped
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleResetChat}
                    className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Reset Conversation"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (isSpeaking) window.speechSynthesis?.cancel()
                      setSpeechMuted(!speechMuted)
                    }}
                    className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title={speechMuted ? "Unmute Voice Reading" : "Mute Voice Reading"}
                  >
                    {speechMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#DCAE53]" />}
                  </button>
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") window.speechSynthesis?.cancel()
                      setIsOpen(false)
                    }}
                    className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Message Stream */}
              <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-3.5 font-sans scrollbar-thin scrollbar-thumb-slate-800">
                {messages.map((msg) => {
                  const isAi = msg.sender === "ai"
                  return (
                    <div key={msg.id} className={`flex flex-col ${isAi ? "items-start" : "items-end"}`}>
                      <div className="text-[9px] font-mono text-slate-500 mb-1 px-1">
                        {isAi ? "Mercian Assistant" : "You"} · {msg.timestamp}
                      </div>
                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[90%] whitespace-pre-line ${
                          isAi
                            ? "bg-[#18181F] text-slate-200 border border-slate-800/80 rounded-tl-sm shadow-md"
                            : "bg-[#DCAE53] text-[#09090B] font-semibold rounded-tr-sm shadow-md"
                        }`}
                      >
                        {msg.text}

                        {isAi && msg.actionUrl && (
                          <div className="mt-3 pt-2.5 border-t border-slate-800/70 flex items-center justify-end">
                            <Link
                              href={msg.actionUrl}
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#DCAE53]/15 text-[#DCAE53] hover:bg-[#DCAE53] hover:text-[#09090B] font-mono text-[11px] font-bold transition-all"
                            >
                              <span>{msg.actionLabel || "View More"}</span>
                              <ArrowRight size={12} />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}

                {/* Thinking Indicator */}
                {isThinking && (
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#18181F] border border-slate-800/80 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DCAE53] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DCAE53] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DCAE53] animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
              </div>

              {/* Quick Suggestion Prompts Scroll */}
              <div className="p-2 bg-[#0c0c0e] border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
                <div className="flex items-center gap-1.5">
                  {QUICK_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(prompt)}
                      className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-[#18181F] hover:bg-[#22222d] border border-slate-800 hover:border-[#DCAE53]/40 text-[11px] font-mono text-slate-300 hover:text-white transition-all shrink-0 cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Footer */}
              <div className="p-3 bg-[#18181F] border-t border-slate-800 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  placeholder="Ask about WhatsApp alerts, pricing, prototype, or setup..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend(inputVal)
                  }}
                  className="flex-1 bg-[#09090B] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#DCAE53]"
                />
                <button
                  onClick={() => handleSend(inputVal)}
                  disabled={!inputVal.trim()}
                  className="p-2.5 rounded-xl bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] font-bold transition-all shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Send Question"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
