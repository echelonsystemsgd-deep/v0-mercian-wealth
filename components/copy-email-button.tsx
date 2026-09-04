"use client"

import { useState } from "react"
import { Mail, Check, Copy } from "lucide-react"

interface CopyEmailButtonProps {
  email?: string
  variant?: "footer" | "card" | "inline"
  className?: string
}

export function CopyEmailButton({
  email = "mercianwealthgs@gmail.com",
  variant = "inline",
  className = "",
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch (err) {
      // Fallback if clipboard API is restricted
      window.location.href = `mailto:${email}`
    }
  }

  if (variant === "footer") {
    return (
      <button
        onClick={handleCopy}
        type="button"
        title="Click to copy email address"
        className={`flex items-center gap-2 hover:text-[#34A88E] transition-colors text-left group min-w-0 ${className}`}
      >
        <Mail size={16} className="text-[#DCAE53] shrink-0" />
        <span className="truncate">{email}</span>
        {copied ? (
          <span className="inline-flex items-center gap-1 text-[10px] bg-[#2E8B77]/20 text-[#34A88E] border border-[#2E8B77]/40 px-1.5 py-0.5 rounded font-mono ml-1 shrink-0 animate-in fade-in zoom-in-95 duration-150">
            <Check size={10} /> Copied!
          </span>
        ) : (
          <Copy size={12} className="opacity-0 group-hover:opacity-70 transition-opacity shrink-0 ml-1" />
        )}
      </button>
    )
  }

  if (variant === "card") {
    return (
      <div className={`p-5 bg-[#18181F]/40 border border-slate-800 hover:border-[#DCAE53]/30 rounded-xl transition-all duration-300 flex items-start gap-4 ${className}`}>
        <div className="p-3 rounded-lg bg-[#DCAE53]/10 border border-[#DCAE53]/20 text-[#DCAE53] shrink-0 mt-0.5">
          <Mail size={18} />
        </div>
        <div className="space-y-1.5 flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Us Directly</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-white font-mono select-all break-all">
              {email}
            </span>
            <button
              onClick={handleCopy}
              type="button"
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#2E8B77]/10 hover:bg-[#2E8B77]/20 text-[#34A88E] border border-[#2E8B77]/30 transition-all duration-200 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-[#34A88E]" />
                  <span className="text-[#34A88E]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#18181F] hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-200 transition-all cursor-pointer ${className}`}
    >
      {copied ? (
        <>
          <Check size={13} className="text-[#34A88E]" />
          <span className="text-[#34A88E] font-semibold">Copied to Clipboard!</span>
        </>
      ) : (
        <>
          <Copy size={13} className="text-[#DCAE53]" />
          <span>Copy Email</span>
        </>
      )}
    </button>
  )
}
