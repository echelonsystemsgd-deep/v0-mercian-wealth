"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Smartphone, CheckCircle, Send, HardHat, Cake, Calendar, CreditCard, Sparkles, MessageCircle, AlertCircle } from "lucide-react"

const demoServices = [
  { id: "custom-bakery", category: "Artisan Bakery", name: "Custom 3-Tier Celebration Cake", price: 240, deposit: 120.0, subtitle: "Windsor & Ascot · Handcrafted Atelier" },
  { id: "sourdough-box", category: "Artisan Bakery", name: "Weekly Sourdough & Pastry Subscription", price: 65, deposit: 65.0, subtitle: "Doorstep Chilled Drop · Batch Baked" },
  { id: "artisan-catering", category: "Bespoke Catering", name: "Private Dining & Canapé Service (30 Pax)", price: 850, deposit: 250.0, subtitle: "Chef-Prepared Seasonal Menu" },
  { id: "buffet-event", category: "Bespoke Catering", name: "Gourmet Event Grazing Table & Delivery", price: 480, deposit: 150.0, subtitle: "Local Berkshire & Thames Valley" },
  { id: "local-service", category: "Local Services", name: "Bespoke Service Booking Package", price: 350, deposit: 100.0, subtitle: "Instant Slot Reservation Lock" },
]

export function FieldSalesDemo() {
  const [selectedService, setSelectedService] = useState(demoServices[0])
  const [pickupDate, setPickupDate] = useState("Saturday, 10:00 AM")
  const [customerName, setCustomerName] = useState("Sarah Mitchell")
  const [isSimulating, setIsSimulating] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  const handleSimulateOrder = () => {
    setIsSimulating(true)
    setShowNotification(false)

    setTimeout(() => {
      setIsSimulating(false)
      setShowNotification(true)
    }, 1000)
  }

  return (
    <section id="field-demo" className="py-16 sm:py-24 bg-[#09090B] border-y border-slate-800 relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111115] border border-slate-800 text-[#DCAE53] text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Smartphone size={14} className="animate-bounce" />
            <span>Interactive Mobile Demo — Try It On Your Phone</span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            See How Customer Orders Reach Your WhatsApp in 2 Seconds
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Tap through this demo below to see what your customer experiences and how the instant WhatsApp alert dings on your smartphone without DM chaos.
          </p>
        </div>

        {/* Demo Frame Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Step 1 & 2: Customer Ordering App Mockup (7 cols) */}
          <div className="lg:col-span-7 bg-[#111115] p-5 sm:p-7 rounded-3xl border border-slate-800 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Cake className="text-[#DCAE53]" size={20} />
                <span className="font-sans font-bold text-white text-base">Artisan Bakery &amp; Local Storefront</span>
              </div>
              <span className="text-[10px] font-mono text-[#34A88E] bg-[#2E8B77]/10 px-2 py-0.5 rounded-full border border-[#2E8B77]/20 font-semibold">
                LIVE DEMO STOREFRONT
              </span>
            </div>

            {/* Service Selection */}
            <div className="space-y-4 mb-6">
              <label className="text-xs font-mono font-bold text-[#DCAE53] uppercase tracking-wider flex items-center gap-1.5">
                <span>1. Select Project / Service Package:</span>
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {demoServices.map((svc) => {
                  const active = selectedService.id === svc.id
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => setSelectedService(svc)}
                      className={`flex items-center justify-between min-h-[48px] p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        active
                          ? "bg-[#DCAE53]/15 border-[#DCAE53] text-white font-semibold shadow-md"
                          : "bg-white/[0.02] border-white/10 text-white/70 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${active ? "border-[#DCAE53] bg-[#DCAE53] text-black" : "border-white/30"}`}>
                          {active && <CheckCircle size={12} />}
                        </div>
                        <div>
                          <span className="text-sm font-sans block">{svc.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{svc.subtitle}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-mono font-bold text-[#DCAE53]">£{svc.price.toLocaleString()}</span>
                        <span className="text-[10px] block text-[#34A88E] font-mono font-semibold">£{svc.deposit} deposit</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Date & Customer Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs font-mono font-bold text-[#DCAE53] uppercase tracking-wider block mb-2">
                  2. Requested Date / Slot:
                </label>
                <select
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full min-h-[44px] bg-white/[0.04] border border-white/15 rounded-xl p-3 text-xs text-white outline-none focus:border-[#DCAE53] cursor-pointer"
                  aria-label="Select Date Slot"
                >
                  <option value="Thursday, 2:00 PM" className="bg-[#111115] text-white">Thursday, 2:00 PM</option>
                  <option value="Saturday, 10:00 AM" className="bg-[#111115] text-white">Saturday, 10:00 AM</option>
                  <option value="Next Tuesday, 9:00 AM" className="bg-[#111115] text-white">Next Tuesday, 9:00 AM</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-[#DCAE53] uppercase tracking-wider block mb-2">
                  3. Customer / Client Name:
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full min-h-[44px] bg-white/[0.04] border border-white/15 rounded-xl p-3 text-xs text-white outline-none focus:border-[#DCAE53] font-sans"
                  placeholder="Enter name"
                  aria-label="Customer Name"
                />
              </div>
            </div>

            {/* Deposit Summary & Simulate Action Button */}
            <div className="p-4 rounded-2xl bg-[#DCAE53]/5 border border-[#DCAE53]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Upfront Survey Fee / Deposit:</span>
                <span className="text-2xl font-mono font-bold text-[#DCAE53]">£{selectedService.deposit.toFixed(2)}</span>
                <span className="text-[10px] text-white/50 block">Project Total: £{selectedService.price.toLocaleString()}</span>
              </div>

              <button
                type="button"
                onClick={handleSimulateOrder}
                disabled={isSimulating}
                className="w-full sm:w-auto min-h-[44px] px-6 py-3.5 font-bold text-xs sm:text-sm bg-[#DCAE53] text-[#09090B] hover:bg-[#E5B85C] rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSimulating ? (
                  <span>Routing Lead...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Simulate Lead Submit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Step 3: Simulated WhatsApp Phone Notification Screen (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[340px] bg-black border-4 border-white/20 rounded-[40px] p-4 shadow-2xl relative overflow-hidden min-h-[440px] flex flex-col justify-between">
              
              {/* Phone Speaker Notch */}
              <div className="w-28 h-4 bg-white/10 rounded-full mx-auto mb-4" />

              {/* Status Header */}
              <div className="flex items-center justify-between text-[11px] font-mono text-white/60 px-2 mb-4">
                <span>WhatsApp Alert</span>
                <span className="text-[#34A88E] font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#34A88E] animate-pulse" />
                  Live Sync
                </span>
              </div>

              {/* Phone Content / Simulated WhatsApp Notification */}
              <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {showNotification ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="p-4 rounded-2xl bg-[#111115] border border-[#2E8B77]/40 text-white shadow-[0_0_25px_rgba(46,139,119,0.2)] space-y-2 text-left"
                    >
                      <div className="flex items-center justify-between border-b border-white/20 pb-2">
                        <div className="flex items-center gap-2">
                          <MessageCircle size={18} className="text-[#34A88E]" />
                          <span className="font-bold text-xs text-[#34A88E]">NEW HIGH-TICKET LEAD</span>
                        </div>
                        <span className="text-[10px] text-white/60">Just now</span>
                      </div>

                      <div className="text-xs space-y-1 pt-1 font-sans">
                        <p><strong className="text-[#DCAE53]">Client:</strong> {customerName}</p>
                        <p><strong className="text-[#DCAE53]">Project:</strong> {selectedService.name}</p>
                        <p><strong className="text-[#DCAE53]">Survey Slot:</strong> {pickupDate}</p>
                        <p><strong className="text-[#34A88E]">Deposit Paid:</strong> £{selectedService.deposit.toFixed(2)} (via Stripe)</p>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/70">
                        <span>Status: Auto-Confirmed</span>
                        <span className="text-[#DCAE53] font-bold font-mono">Ref: #MW-{Math.floor(1000 + Math.random() * 9000)}</span>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center p-6 border border-dashed border-white/20 rounded-2xl">
                      <Smartphone size={32} className="mx-auto text-white/30 mb-2" />
                      <p className="text-xs text-white/60 font-sans">
                        Tap <span className="text-accent-gold font-bold">"Simulate Lead Submit"</span> to watch the WhatsApp alert arrive here in 2 seconds.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Phone Indicator Bar */}
              <div className="w-32 h-1 bg-white/30 rounded-full mx-auto mt-4" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
