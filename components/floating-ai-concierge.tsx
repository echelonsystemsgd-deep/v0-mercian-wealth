"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Bot, 
  X, 
  Send, 
  Volume2, 
  VolumeX, 
  MessageSquareText
} from "lucide-react"

interface ChatMessage {
  id: string
  sender: "ai" | "user"
  text: string
  timestamp: string
}

const QUICK_PROMPTS = [
  "How fast does the response system answer?",
  "What is the zero-disruption guarantee?",
  "How does the working prototype work?",
  "What are the terms of the monthly retainer?"
]

const AI_KNOWLEDGE: Record<string, string> = {
  "How fast does the response system answer?": "Inbound calls and customer enquiries are answered in under 60 seconds. The system qualifies the customer's requirement, locks an appointment or deposit, and instantly alerts your phone via WhatsApp or SMS.",
  "What is the zero-disruption guarantee?": "The system runs parallel to your team. Your existing phone number and calendar remain unchanged, and your staff don't have to install any software. It only steps in when your team is busy, on-site, or closed.",
  "How does the working prototype work?": "We build a working demonstration specific to your business in 48 hours before you commit to anything. You test how it answers, collects details, and books clients on your own smartphone. You only proceed if the outcome makes clear commercial sense.",
  "What are the terms of the monthly retainer?": "All retainers are month-to-month with 30 days notice. There are no annual lock-in contracts. It includes continuous response monitoring, ongoing accuracy audits, and dedicated support."
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
      text: "Hello! I'm the Mercian Wealth assistant. Ask me anything about how our response systems work, the zero-disruption guarantee, or our retainer terms.",
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
  }, [messages])

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
    if (voiceMuted || typeof window === "undefined" || !("speechSynthesis" in window)) return

    try {
      window.speechSynthesis.cancel()
      if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current)

      const utterance = new SpeechSynthesisUtterance(text)
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

    setTimeout(() => {
      let replyText = ""
      const lower = text.toLowerCase()

      if (AI_KNOWLEDGE[text]) {
        replyText = AI_KNOWLEDGE[text]
      } else if (lower.includes("price") || lower.includes("cost") || lower.includes("retainer")) {
        replyText = "Our implementation setups range from £2,250 to £5,500 based on technical scope, with monthly managed retainers from £1,250 to £3,500/mo. All retainers are month-to-month with 30 days notice."
      } else if (lower.includes("prototype") || lower.includes("demo") || lower.includes("try")) {
        replyText = "We build a working prototype specific to your business in 48 hours with zero commitment. You test it directly on your smartphone before deciding if it makes sense to proceed."
      } else if (lower.includes("disrupt") || lower.includes("number") || lower.includes("phone")) {
        replyText = "The system runs parallel to your team with zero disruption. Your existing phone numbers and calendar remain identical. It only steps in when your team is busy or after hours."
      } else {
        replyText = "We build systems that answer faster, book more, and stop leads leaking. The best next step is to book a call so we can review your current response flow and demonstrate a working prototype."
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: replyText,
        timestamp: "Just now"
      }

      setMessages(prev => [...prev, aiMsg])
      speakText(replyText)
    }, 350)
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
              className="w-full sm:max-w-[420px] bg-[#111115] border border-[#DCAE53]/40 sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden flex flex-col h-[540px] sm:h-[600px] max-h-[90vh]"
            >
              
              {/* Drawer Header */}
              <div className="p-4 bg-[#18181F] border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#DCAE53]/15 text-[#DCAE53] border border-[#DCAE53]/30">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">
                      Mercian Response Assistant
                    </h3>
                    <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Instant Answers · Zero Jargon
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
                    className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
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
                        {isAi ? "Mercian Assistant" : "You"} · {msg.timestamp}
                      </div>
                      <div
                        className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[88%] ${
                          isAi
                            ? "bg-[#18181F] text-slate-200 border border-slate-800/80 rounded-tl-sm"
                            : "bg-[#DCAE53] text-[#09090B] font-medium rounded-tr-sm shadow-md"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Quick Suggestion Prompts */}
              <div className="p-2 bg-[#0c0c0e] border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-[#18181F] hover:bg-[#22222d] border border-slate-800 text-[10px] font-mono text-slate-300 transition-all shrink-0 cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Footer */}
              <div className="p-3 bg-[#18181F] border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask a question about response times or terms..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend(inputVal)
                  }}
                  className="flex-1 bg-[#09090B] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#DCAE53]"
                />
                <button
                  onClick={() => handleSend(inputVal)}
                  className="p-2.5 rounded-xl bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] font-bold transition-all shadow-md cursor-pointer"
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
