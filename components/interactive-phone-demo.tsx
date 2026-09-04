"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, CheckCircle2, Clock, Sparkles, Cake, UtensilsCrossed, Calendar, CreditCard, ArrowRight } from "lucide-react"

export function InteractivePhoneDemo() {
  const [activeNiche, setActiveNiche] = useState<"bakery" | "catering">("bakery")
  
  // Interactive Order Builder Form States
  const [selectedOption, setSelectedOption] = useState("Custom 3-Tier Pistachio Cake (£185)")
  const [selectedDate, setSelectedDate] = useState("This Saturday (11:30 AM)")
  const [isSimulating, setIsSimulating] = useState(false)

  const [notification, setNotification] = useState<{
    title: string
    body: string
    time: string
    amount: string
    webhook: string
  }>({
    title: "New Custom Order & Deposit Paid!",
    body: "Sophie T. configured a Custom 3-Tier Pistachio Cake (£185). Pickup confirmed for This Saturday (11:30 AM).",
    time: "Just now",
    amount: "£50.00 Deposit Paid (Apple Pay)",
    webhook: "Instant Kitchen Webhook Triggered"
  })

  const bakeryOptions = [
    { name: "Custom 3-Tier Pistachio Cake (£185)", deposit: "£50.00 Deposit Paid", price: "£185.00" },
    { name: "Weekend Artisan Sourdough & Pastry Bundle (£48)", deposit: "Paid in Full", price: "£48.00" },
    { name: "Corporate Dessert Platter (50 Portions) (£160)", deposit: "£50.00 Deposit Paid", price: "£160.00" },
  ]

  const cateringOptions = [
    { name: "Private Dining & Canapés (20 Guests) (£650)", deposit: "£150.00 Deposit Paid", price: "£650.00" },
    { name: "Gourmet Buffet & Grazing Table (£420)", deposit: "£100.00 Deposit Paid", price: "£420.00" },
    { name: "Weekend Luxury Brunch Delivery Box (£95)", deposit: "Paid in Full", price: "£95.00" },
  ]

  const triggerTestSubmit = () => {
    setIsSimulating(true)
    setTimeout(() => {
      const currentList = activeNiche === "bakery" ? bakeryOptions : cateringOptions
      const match = currentList.find(o => o.name === selectedOption) || currentList[0]

      setNotification({
        title: activeNiche === "bakery" ? "New Bakery Order & Deposit Paid!" : "New Catering Booking Confirmed!",
        body: `Customer submitted bespoke order for ${selectedOption}. Delivery/Pickup locked for ${selectedDate}.`,
        time: "Just now",
        amount: match.deposit,
        webhook: "Instant Kitchen Webhook Triggered"
      })
      setIsSimulating(false)
    }, 500)
  }

  return (
    <section suppressHydrationWarning className="relative py-24 bg-[#09090B] overflow-hidden border-t border-slate-800/80">
      {/* Background Radial Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#DCAE53]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#DCAE53]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111115] border border-[#DCAE53]/30 text-[#DCAE53] text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive 3-Tap Storefront Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Test The 3-Tap Order Engine Yourself
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Select an order package below, click <strong>&quot;Submit Order &amp; Pay Deposit&quot;</strong>, and watch the live smartphone mockup receive the instant WhatsApp dispatch in 0.4 seconds!
          </p>
        </div>

        {/* Niche Selector Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10 sm:mb-12 min-w-0 max-w-full">
          <button
            suppressHydrationWarning
            onClick={() => {
              setActiveNiche("bakery")
              setSelectedOption(bakeryOptions[0].name)
            }}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
              activeNiche === "bakery"
                ? "bg-[#DCAE53] text-[#09090B] shadow-lg scale-105"
                : "bg-[#111115] text-slate-300 hover:bg-[#18181F] border border-slate-800"
            }`}
          >
            <Cake size={16} className="shrink-0" />
            <span>Artisan Bakery &amp; Cake Studio Demo</span>
          </button>

          <button
            suppressHydrationWarning
            onClick={() => {
              setActiveNiche("catering")
              setSelectedOption(cateringOptions[0].name)
            }}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
              activeNiche === "catering"
                ? "bg-[#DCAE53] text-[#09090B] shadow-lg scale-105"
                : "bg-[#111115] text-slate-300 hover:bg-[#18181F] border border-slate-800"
            }`}
          >
            <UtensilsCrossed size={16} className="shrink-0" />
            <span>Bespoke Catering &amp; Events Demo</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Interactive 3-Tap Form Controls */}
          <div className="lg:col-span-6 p-4 sm:p-8 rounded-2xl bg-[#111115] border border-slate-800/80 backdrop-blur-xl shadow-2xl space-y-6 min-w-0 max-w-full">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Customer Mobile Order Builder</span>
              </h3>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#DCAE53] bg-[#DCAE53]/10 px-2.5 py-1 rounded-full border border-[#DCAE53]/20">
                Live Interactive Widget
              </span>
            </div>

            {/* Tap 1: Select Item */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-[#DCAE53]/20 text-[#DCAE53] font-mono text-[11px] flex items-center justify-center border border-[#DCAE53]/40">1</span>
                <span>STEP 1: SELECT PRODUCT / PACKAGE</span>
              </label>
              <div className="space-y-2">
                {(activeNiche === "bakery" ? bakeryOptions : cateringOptions).map((opt, idx) => (
                  <button
                    suppressHydrationWarning
                    key={opt.name}
                    type="button"
                    onClick={() => setSelectedOption(opt.name)}
                    className={`w-full min-h-[48px] p-3.5 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-all border cursor-pointer ${
                      selectedOption === opt.name
                        ? "bg-[#DCAE53]/15 border-[#DCAE53] text-white shadow-[0_0_15px_rgba(220,174,83,0.2)]"
                        : "bg-[#18181F] border-slate-800 text-slate-400 hover:bg-[#18181F]/80"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-slate-500 font-normal">0{idx + 1}.</span>
                      <span>{opt.name}</span>
                    </span>
                    <span className="text-[#DCAE53] font-mono text-[11px]">{opt.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tap 2: Custom Date Selector */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-[#DCAE53]/20 text-[#DCAE53] font-mono text-[11px] flex items-center justify-center border border-[#DCAE53]/40">2</span>
                <span>STEP 2: SELECT PICKUP OR EVENT DATE</span>
              </label>
              
              <div className="space-y-2">
                {/* Custom Date Input */}
                <div className="relative">
                  <input
                    suppressHydrationWarning
                    type="date"
                    value={selectedDate.startsWith("20") ? selectedDate : ""}
                    onChange={(e) => {
                      if (e.target.value) {
                        const d = new Date(e.target.value)
                        const formatted = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
                        setSelectedDate(`${formatted} (11:30 AM)`)
                      }
                    }}
                    className="w-full min-h-[44px] p-3 rounded-lg bg-[#18181F] border border-slate-800 text-xs font-bold text-white focus:outline-none focus:border-[#DCAE53] font-mono cursor-pointer"
                    aria-label="Select Date"
                  />
                </div>

                {/* Quick Presets */}
                <div className="grid grid-cols-3 gap-2">
                  {["Tomorrow (14:00)", "This Saturday (11:30 AM)", "Next Weekend (10:00 AM)"].map((preset) => (
                    <button
                      suppressHydrationWarning
                      key={preset}
                      type="button"
                      onClick={() => setSelectedDate(preset)}
                      className={`min-h-[44px] p-2 rounded-lg text-[10px] sm:text-[11px] font-semibold text-center transition-all border truncate cursor-pointer flex items-center justify-center ${
                        selectedDate === preset
                          ? "bg-[#DCAE53]/20 border-[#DCAE53] text-[#DCAE53] font-bold"
                          : "bg-[#18181F] border-slate-800 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      {preset.split(" ")[0]} {preset.includes("(") ? preset.substring(preset.indexOf("(")) : ""}
                    </button>
                  ))}
                </div>

                {selectedDate && (
                  <div className="text-[11px] font-mono text-[#DCAE53] flex items-center justify-between px-1">
                    <span>Selected Date &amp; Slot:</span>
                    <span className="font-bold underline">{selectedDate}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tap 3: Submit Order */}
            <div className="pt-2">
              <button
                suppressHydrationWarning
                type="button"
                onClick={triggerTestSubmit}
                disabled={isSimulating}
                className="w-full min-h-[52px] py-4 rounded-lg bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] font-extrabold text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span className="w-6 h-6 rounded-full bg-[#09090B]/20 text-[#09090B] font-mono text-xs flex items-center justify-center border border-[#09090B]/30">3</span>
                <span>STEP 3: SUBMIT ORDER &amp; DISPATCH TO PHONE</span>
                <ArrowRight size={16} />
              </button>
              <span className="text-[11px] text-slate-400 text-center block mt-2 font-mono">
                Clicking above immediately triggers the WhatsApp alert on your phone mockup →
              </span>
            </div>
          </div>

          {/* Right Column: Smartphone Mockup */}
          <div className="lg:col-span-6 flex justify-center min-w-0 max-w-full">
            <div className="relative w-full max-w-[320px] sm:max-w-[350px] min-h-[560px] h-[min(640px,80svh)] bg-[#09090B] rounded-[45px] p-4 border-[8px] border-slate-800 shadow-[0_0_50px_rgba(220,174,83,0.15)] flex flex-col justify-between overflow-hidden shrink-0">
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-slate-800 rounded-b-2xl z-30 flex items-center justify-center">
                <div className="w-12 h-1.5 bg-slate-900 rounded-full" />
              </div>

              {/* Lockscreen Header */}
              <div className="pt-8 px-4 text-center z-10">
                <div className="text-5xl font-extralight text-white font-mono tracking-tight mb-1">09:41</div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-widest">Saturday, October 24</div>
              </div>

              {/* Animated Notification Card */}
              <div className="relative px-2 my-auto z-20">
                <AnimatePresence mode="wait">
                  {notification && (
                    <motion.div
                      key={notification.body}
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.95 }}
                      transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                      className="p-4 rounded-xl bg-[#111115] border border-[#2E8B77]/40 shadow-[0_0_25px_rgba(46,139,119,0.18)] backdrop-blur-xl"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-[#2E8B77] flex items-center justify-center text-white font-bold text-xs shadow-md">
                            WA
                          </div>
                          <span className="text-xs font-bold text-slate-200">WhatsApp Alert</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{notification.time}</span>
                      </div>

                      <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#34A88E] shrink-0" />
                        <span>{notification.title}</span>
                      </h4>

                      <p className="text-xs text-slate-300 leading-relaxed mb-3 font-sans">
                        {notification.body}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
                        <span className="font-bold text-[#34A88E] bg-[#2E8B77]/15 px-2.5 py-0.5 rounded-full border border-[#2E8B77]/30">
                          {notification.amount}
                        </span>
                        <span className="text-[#DCAE53] font-mono text-[10px] uppercase font-bold">
                          [ 0.4s Latency ]
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {isSimulating && (
                  <div className="absolute inset-0 bg-[#09090B]/80 rounded-xl flex items-center justify-center backdrop-blur-xs">
                    <div className="flex items-center gap-2 text-[#DCAE53] text-xs font-mono font-bold animate-pulse">
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>Processing Instant Webhook...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Phone Footer Bar */}
              <div className="pb-2 text-center z-10">
                <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
