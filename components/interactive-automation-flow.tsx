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
      customerEmail: "operations@apexlogistics.co.uk",
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
    <section id="automation-flow" className="relative py-16 sm:py-24 bg-[#09090B] overflow-hidden">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111115] border border-[#DCAE53]/30 text-[#DCAE53] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4">
            <Zap size={13} className="text-[#DCAE53]" />
            <span>Interactive Workflow Architecture</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            How The Autonomous Revenue Chain Operates.
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Tap through the 4 steps below to see how a lead travels from initial enquiry to a booked, qualified customer on your smartphone without anyone lifting a finger.
          </p>
        </div>

        {/* 4 Steps Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-8">
          {FLOW_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex
            const StepIcon = step.icon
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#18181F] border-[#DCAE53] shadow-lg shadow-[#DCAE53]/10"
                    : "bg-[#111115] border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold ${isActive ? "text-[#DCAE53]" : "text-slate-400"}`}>
                    STEP {step.stepNumber}
                  </span>
                  <StepIcon size={14} className={isActive ? "text-[#DCAE53]" : "text-slate-400"} />
                </div>
                <div className="text-xs sm:text-sm font-bold text-white truncate">
                  {step.shortTitle}
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className="bg-[#111115] border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl relative">
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
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#18181F] border border-slate-800 text-[10px] font-mono font-bold text-[#DCAE53] uppercase">
                  <span>● {currentStep.tag}</span>
                </div>

                <h3 className="text-lg sm:text-2xl font-bold text-white leading-snug">
                  {currentStep.headline}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {currentStep.description}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                    <CheckCircle size={14} />
                    <span>Autonomous &amp; Real-Time</span>
                  </div>
                  <span className="text-slate-600">·</span>
                  <div className="text-xs font-mono text-slate-400">
                    Zero Staff Hours Needed
                  </div>
                </div>
              </div>

              {/* Right Column: Live Data Payload Mockup (5 cols) */}
              <div className="lg:col-span-5 bg-[#09090B] border border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 font-mono text-left">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-3">
                  <span className="text-[10px] uppercase text-[#DCAE53] font-bold">
                    {currentStep.payloadTitle}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>

                <div className="space-y-2.5 text-[11px]">
                  {Object.entries(currentStep.payloadData).map(([key, val]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 border-b border-white/[0.03] pb-1.5">
                      <span className="text-slate-400 text-[10px] uppercase tracking-wider">{key}:</span>
                      <span className="text-slate-200 font-semibold truncate">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : FLOW_STEPS.length - 1))}
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              ← Previous Step
            </button>

            <div className="flex gap-1.5">
              {FLOW_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === activeStepIndex ? "bg-[#DCAE53]" : "bg-slate-800"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveStepIndex((prev) => (prev < FLOW_STEPS.length - 1 ? prev + 1 : 0))}
              className="text-xs font-mono text-[#DCAE53] hover:text-[#E5B85C] font-bold transition-colors cursor-pointer flex items-center gap-1"
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
