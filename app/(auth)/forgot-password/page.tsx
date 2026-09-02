'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Loader2, Mail, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    })

    if (error) {
      setError(error.message || 'Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="bg-[#111115] rounded-2xl border border-slate-800 p-8 text-center space-y-4 shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 size={26} />
        </div>
        <div>
          <h2 className="font-sans text-xl font-bold text-white">Check Your Inbox</h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            We&apos;ve sent a password reset link to <span className="text-white font-medium">{email}</span>.
            Check your email and click the link to set a new password.
          </p>
        </div>
        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-[#DCAE53] hover:underline transition-colors font-semibold">
          <ArrowLeft size={14} /> Back to Login
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#111115] rounded-2xl border border-slate-800 p-8 space-y-6 shadow-2xl">
      <div className="space-y-1 text-center">
        <h2 className="font-sans text-2xl font-bold text-white">Reset Password</h2>
        <p className="text-sm text-slate-400">
          Enter your registered email and we&apos;ll send a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-slate-200 flex items-center gap-2">
            <Mail size={13} className="text-[#DCAE53]" /> Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@mercianwealth.com"
            className="w-full bg-[#18181F] border border-slate-800 hover:border-slate-700 focus:border-[#DCAE53] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-1 focus:ring-[#DCAE53] transition-all"
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          id="forgot-password-submit"
          className="w-full bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] font-bold text-sm py-3.5 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : 'Send Reset Link'}
        </button>

        <div className="text-center pt-2 border-t border-slate-800">
          <Link href="/login" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-[#DCAE53] transition-colors">
            <ArrowLeft size={12} /> Back to Login
          </Link>
        </div>
      </form>
    </div>
  )
}
