"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Bot, 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  PhoneCall, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  ArrowRight,
  Zap,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"

interface ChatMessage {
  id: string
  sender: "ai" | "user"
  text: string
  timestamp: string
}

const QUICK_PROMPTS = [
  "How does 24/7 AI Voice Answering work?",
  "What's included in the monthly retainer?",
  "Can you build 3D E-Commerce & Meshy assets?",
  "Check postcode availability for my firm"
]

const AI_KNOWLEDGE: Record<string, string> = {
  "How does 24/7 AI Voice Answering work?": "Our neural voice agents connect directly to your carrier SIP trunk. They pick up inbound calls in <420ms, speak with natural human intonation, qualify customer needs, collect deposits via Stripe/Apple Pay, and dispatch full notes to your smartphone in <0.4s.",
  "What's included in the monthly retainer?": "Every monthly retainer includes dedicated voice server hosting, 99.98% telephony uptime SLA, sub-500ms latency monitoring, weekly conversation audits to fix edge cases, continuous prompt optimization, and up to 3,500 minutes of voice throughput.",
  "Can you build 3D E-Commerce & Meshy assets?": "Yes! We build WebGL 3D interactive storefronts and integrate generative neural mesh pipelines like Meshy.ai. Customers can rotate products 360°, inspect PBR materials, and customize options in 3D, lifting checkout conversions by 42%.",
  "Check postcode availability for my firm": "We operate on strict category exclusivity (1 premier operator per sector per territory). Schedule a free 15-minute diagnostic audit or message us on WhatsApp to verify if your territory is still open."
}

export function FloatingAiConcierge() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [inputVal, setInputVal] = useState<string>("")
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const [voiceMuted, setVoiceMuted] = useState<boolean>(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! I'm the Mercian Wealth AI Concierge. Ask me anything about our 24/7 AI Voice Callers, 3D Spatial E-Commerce, or Managed Retainers.",
      timestamp: "Just now"
    }
  ])

  const chatContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isOpen])

  // Optional Web Speech Synthesis
  const speakText = (text: string) => {
    if (voiceMuted || typeof window === "undefined" || !("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.05
    utterance.pitch = 1.0
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  const handleSend = (userText: string) => {
    if (!userText.trim()) return

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
      timestamp: "Just now"
    }

    setMessages(prev => [...prev, userMsg])
    setInputVal("")

    // Generate intelligent AI reply
    setTimeout(() => {
      let replyText = "Our autonomous AI infrastructure is engineered specifically for high-ticket service operators. We deploy 24/7 AI voice receptionists, spatial fleet dispatch, and 3D e-commerce via rapid agile sprints tailored to your requirements. Would you like to schedule a 15-minute diagnostic audit?"

      for (const [key, ans] of Object.entries(AI_KNOWLEDGE)) {
        if (userText.toLowerCase().includes(key.toLowerCase().slice(0, 15))) {
          replyText = ans
          break
        }
      }

      if (userText.toLowerCase().includes("pricing") || userText.toLowerCase().includes("cost") || userText.toLowerCase().includes("retainer")) {
        replyText = "Our core packages range from £2,250 setup + £1,250/mo retainer up to £3,850 setup + £2,250/mo retainer. Retainers cover dedicated telephony infrastructure, weekly prompt tuning, voice minutes, and 99.98% SLA."
      } else if (userText.toLowerCase().includes("3d") || userText.toLowerCase().includes("meshy")) {
        replyText = "We build interactive WebGL 3D product viewers and AI generative mesh pipelines via Meshy.ai. Check out the 3D Spatial Storefront tab in our homepage command center to test it live!"
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: replyText,
        timestamp: "Just now"
      }

      setMessages(prev => [...prev, aiMsg])
      speakText(replyText)
    }, 400)
  }

  return (
    <>
      {/* Floating Trigger Button at Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="relative group p-3.5 sm:p-4 rounded-full bg-[#111115] border-2 border-[#DCAE53] text-[#DCAE53] shadow-2xl shadow-black/80 flex items-center gap-3 cursor-pointer"
          aria-label="Open AI Concierge"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-[#DCAE53]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="hidden sm:inline-block font-mono text-xs font-bold text-white tracking-wider pr-1">
            TEST AI CONCIERGE
          </span>
        </motion.button>
      </div>

      {/* Interactive AI Concierge Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="w-full sm:max-w-[420px] bg-[#111115] border-2 border-[#DCAE53]/40 sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden flex flex-col h-[560px] sm:h-[620px] max-h-[92vh]"
            >
              
              {/* Drawer Header */}
              <div className="p-4 bg-[#18181F] border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#DCAE53]/15 text-[#DCAE53] border border-[#DCAE53]/30">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span>Mercian Autonomous Concierge</span>
                    </h3>
                    <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Neural Speech Model · &lt; 300ms
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      if (isSpeaking) window.speechSynthesis?.cancel()
                      setVoiceMuted(!voiceMuted)
                    }}
                    className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
                    title={voiceMuted ? "Unmute Speech" : "Mute Speech"}
                  >
                    {voiceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#DCAE53]" />}
                  </button>
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") window.speechSynthesis?.cancel()
                      setIsOpen(false)
                    }}
                    className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Message Stream */}
              <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-3 font-sans scrollbar-thin scrollbar-thumb-slate-800">
                {messages.map((msg) => {
                  const isAi = msg.sender === "ai"
                  return (
                    <div key={msg.id} className={`flex flex-col ${isAi ? "items-start" : "items-end"}`}>
                      <div className="text-[9px] font-mono text-slate-500 mb-1 px-1">
                        {isAi ? "Mercian AI" : "You"} · {msg.timestamp}
                      </div>
                      <div
                        className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[88%] ${
                          isAi 
                            ? "bg-[#18181F] text-slate-200 border border-slate-800 rounded-tl-sm" 
                            : "bg-[#DCAE53] text-[#09090B] font-medium rounded-tr-sm shadow-md"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="px-4 py-2 bg-[#09090B] border-t border-slate-800/80 overflow-x-auto scrollbar-none flex gap-2">
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-[#18181F] hover:bg-[#22222d] border border-slate-800 text-[10px] font-mono text-slate-300 transition-all shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Footer */}
              <div className="p-3 bg-[#18181F] border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask a question about AI voice or retainers..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend(inputVal)
                  }}
                  className="flex-1 bg-[#09090B] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#DCAE53]"
                />
                <button
                  onClick={() => handleSend(inputVal)}
                  className="p-2.5 rounded-xl bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] font-bold transition-all shadow-md"
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
