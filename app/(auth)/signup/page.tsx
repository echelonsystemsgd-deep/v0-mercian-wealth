'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, Lock, Mail, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error: signUpError } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    setSuccess('Registration successful! Check your email to verify your account or proceed to login if auto-confirmed.')
    setLoading(false)
    setTimeout(() => {
      router.push('/dashboard')
      router.refresh()
    }, 2000)
  }

  return (
    <div className="bg-[#111115] rounded-2xl border border-slate-800 p-8 space-y-6 shadow-2xl">
      <div className="space-y-1 text-center">
        <h2 className="font-sans text-2xl font-bold text-white">Create Account</h2>
        <p className="text-sm text-slate-400">Register for access to your automation portal</p>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-4 py-3 text-sm text-emerald-400">
          {success}
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="firstName" className="text-sm font-medium text-slate-200 flex items-center gap-2">
              <User size={13} className="text-[#DCAE53]" /> First Name
            </label>
            <input
              id="firstName"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Sarah"
              className="w-full bg-[#18181F] border border-slate-800 hover:border-slate-700 focus:border-[#DCAE53] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-1 focus:ring-[#DCAE53] transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="lastName" className="text-sm font-medium text-slate-200 flex items-center gap-2">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Mitchell"
              className="w-full bg-[#18181F] border border-slate-800 hover:border-slate-700 focus:border-[#DCAE53] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-1 focus:ring-[#DCAE53] transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-slate-200 flex items-center gap-2">
            <Mail size={13} className="text-[#DCAE53]" /> Email Address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="david@apexservices.co.uk"
            className="w-full bg-[#18181F] border border-slate-800 hover:border-slate-700 focus:border-[#DCAE53] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-1 focus:ring-[#DCAE53] transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium text-slate-200 flex items-center gap-2">
            <Lock size={13} className="text-[#DCAE53]" /> Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#18181F] border border-slate-800 hover:border-slate-700 focus:border-[#DCAE53] rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-1 focus:ring-[#DCAE53] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#DCAE53] transition-colors p-1"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#DCAE53] hover:bg-[#E5B85C] text-[#09090B] font-bold text-sm py-3.5 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Registering…
            </>
          ) : (
            'Sign Up'
          )}
        </button>

        <div className="flex flex-col gap-4 text-center border-t border-slate-800 pt-4 mt-2">
          <p className="text-xs text-slate-400">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-[#DCAE53] hover:underline font-semibold"
            >
              Log in instead
            </Link>
          </p>

          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-[#DCAE53] transition-colors flex items-center justify-center gap-1.5"
          >
            ← Back to Homepage
          </Link>
        </div>
      </form>
    </div>
  )
}
