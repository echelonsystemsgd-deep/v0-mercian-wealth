"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PhoneIncoming, Bot, CalendarCheck, MessageSquare, CheckCircle, ArrowRight, Zap, Smartphone, Database, BellRing } from "lucide-react"

const FLOW_STEPS = [
  {
    id: "step-1",
    stepNumber: "01",
    label: "Inbound Lead Enters",
    shortTitle: "Web Chat & WhatsApp",
    icon: MessageSquare,
    tag: "INSTANT TRIGGER",
    headline: "Customer Enquires After Hours (e.g. 8:30 PM)",
    description: "An enquiry arrives via your website AI chat widget or WhatsApp while your team is on-site, driving, or closed for the evening.",
    payloadTitle: "Inbound Event Telemetry",
    payloadData: {
      channel: "Website AI Chat & WhatsApp Channel",
      timestamp: "Sunday, 20:34:12 GMT",
      enquiryType: "Urgent Out-of-Hours Commercial Scope",
      status: "Engaged Instantly (< 500ms)",
    },
  },
  {
    id: "step-2",
    stepNumber: "02",
    label: "AI Natural Triage",
    shortTitle: "Natural AI Scoping",
    icon: Bot,
    tag: "CONVERSATIONAL LOGIC",
    headline: "AI Qualifies Requirements in Fluent British English",
    description: "The AI greets the customer, asks your exact scoping questions, handles pricing guidance, and screens out low-quality enquiries automatically.",
    payloadTitle: "Extracted Lead Specifications",
    payloadData: {
      serviceType: "Commercial HVAC Inspection",
      urgency: "High (Within 48 Hours)",
      postcode: "SL4 1PD (Berkshire)",
      estimatedValue: "£1,450.00",
    },
  },
  {
    id: "step-3",
    stepNumber: "03",
    label: "Live Calendar & Deposit",
    shortTitle: "Direct Booking",
    icon: CalendarCheck,
    tag: "REAL-TIME SYNC",
    headline: "Live Slot Reserved & Confirmed into Your Diary",
    description: "The AI checks your real-time calendar availability, proposes open slots, locks the booking, and can capture an upfront deposit via Stripe.",
    payloadTitle: "Calendar Booking Record",
    payloadData: {
      calendarSync: "Google Calendar & Outlook Verified",
      appointmentTime: "Tuesday, 09:00 AM - 10:30 AM",
      customerEmail: "enquiries@commercialservices.co.uk",
      depositStatus: "Deposit Secured via Stripe (£150.00)",
    },
  },
  {
    id: "step-4",
    stepNumber: "04",
    label: "Instant Smartphone Ping",
    shortTitle: "WhatsApp & CRM",
    icon: Smartphone,
    tag: "SUB-2S NOTIFICATION",
    headline: "Full Specs Sent Straight to Your WhatsApp in Seconds",
    description: "You receive a complete WhatsApp alert on your phone with customer contact details, job specifications, and calendar link. Zero manual data entry.",
    payloadTitle: "Smartphone WhatsApp Notification",
    payloadData: {
      whatsAppAlert: "Delivered to Director Mobile in 1.4s",
      crmSync: "Added to Airtable & CRM Pipeline",
      automatedSms: "Customer Confirmation SMS Dispatched",
      manualWorkRequired: "0 Minutes (Completely Hands-Off)",
    },
  },
]

export function InteractiveAutomationFlow() {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const currentStep = FLOW_STEPS[activeStepIndex]
  const IconComponent = currentStep.icon

  return (
    <section id="automation-flow" className="relative py-16 sm:py-24 bg-[#050505] overflow-hidden">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141417] border border-[#DAA640]/30 text-[#DAA640] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4">
            <Zap size={13} className="text-[#DAA640]" />
            <span>Interactive Workflow Architecture</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            How The Autonomous Revenue Chain Operates.
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Tap through the 4 steps below to see how a lead travels from initial enquiry to a booked, qualified customer on your smartphone without anyone lifting a finger.
          </p>
        </div>

        {/* 4 Steps Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
          {FLOW_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex
            const StepIcon = step.icon
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`relative p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all duration-200 cursor-pointer min-h-[48px] ${
                  isActive
                    ? "bg-[#141417] border-[#DAA640] shadow-lg text-white"
                    : "bg-[#0B0B0D] border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="flowStepActive"
                    className="absolute inset-0 rounded-xl sm:rounded-2xl border border-[#DAA640] pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold ${isActive ? "text-[#DAA640]" : "text-zinc-500"}`}>
                    STEP {step.stepNumber}
                  </span>
                  <StepIcon size={14} className={isActive ? "text-[#DAA640]" : "text-zinc-500"} />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white truncate">
                  {step.shortTitle}
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className="bg-[#0B0B0D] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center"
            >
              {/* Left Column: Description & Explanation (7 cols) */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#141417] border border-white/10 text-[10px] font-mono font-semibold text-[#DAA640] uppercase">
                  <span>● {currentStep.tag}</span>
                </div>

                <h3 className="text-lg sm:text-2xl font-bold text-white leading-snug">
                  {currentStep.headline}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                  {currentStep.description}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                    <CheckCircle size={14} />
                    <span>Autonomous &amp; Real-Time</span>
                  </div>
                  <span className="text-zinc-700">·</span>
                  <div className="text-xs font-mono text-zinc-400">
                    Zero Staff Hours Needed
                  </div>
                </div>
              </div>

              {/* Right Column: Live Data Payload Mockup (5 cols) */}
              <div className="lg:col-span-5 bg-[#050505] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 font-mono text-left">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                  <span className="text-[10px] uppercase text-[#DAA640] font-bold">
                    {currentStep.payloadTitle}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>

                <div className="space-y-2.5 text-[11px]">
                  {Object.entries(currentStep.payloadData).map(([key, val]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 border-b border-white/5 pb-1.5">
                      <span className="text-zinc-400 text-[10px] uppercase tracking-wider">{key}:</span>
                      <span className="text-zinc-200 font-semibold truncate">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : FLOW_STEPS.length - 1))}
              className="text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer min-h-[38px] flex items-center"
            >
              ← Previous Step
            </button>

            <div className="flex gap-1.5">
              {FLOW_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === activeStepIndex ? "bg-[#DAA640]" : "bg-zinc-800"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveStepIndex((prev) => (prev < FLOW_STEPS.length - 1 ? prev + 1 : 0))}
              className="text-xs font-mono text-[#DAA640] hover:text-[#E5B85C] font-semibold transition-colors cursor-pointer flex items-center gap-1 min-h-[38px]"
            >
              <span>Next Step</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
