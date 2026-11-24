'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [loginType, setLoginType] = useState<'client' | 'admin'>('client')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const errorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (error) {
      errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [error])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError(signInError.message || 'Invalid credentials. Please check your email and password.')
      setLoading(false)
      return
    }

    const user = data?.user
    if (!user) {
      setError('Sign-in succeeded but no user session was returned. Please try again.')
      setLoading(false)
      return
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role, is_suspended')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      setError('Your account exists but has no profile record. Contact support to complete setup.')
      await supabase.auth.signOut()
      setLoading(false)
      return
    }

    if (profile.is_suspended) {
      setError('This account has been suspended. Contact support for assistance.')
      await supabase.auth.signOut()
      setLoading(false)
      return
    }

    const role = profile.role as string
    const isAdminEmail = user.email === 'deepgurtej28@gmail.com' || user.email?.endsWith('@mercianwealth.com')

    if (loginType === 'admin' && role !== 'admin' && !isAdminEmail) {
      setError(
        `This email is registered as a ${role} account, not admin. Use the Client Login tab, or sign in with your admin email.`
      )
      await supabase.auth.signOut()
      setLoading(false)
      return
    }

    const params = new URLSearchParams(window.location.search)
    const redirectParam = params.get('redirect')
    const defaultTarget = (role === 'admin' || isAdminEmail) ? '/admin' : role === 'client' ? '/client' : '/dashboard'
    const targetPath = (redirectParam && (role === 'admin' || isAdminEmail)) ? redirectParam : defaultTarget

    // Force hard browser navigation on mobile/desktop to ensure session cookies flush to middleware headers
    window.location.href = targetPath
  }

  return (
    <div className="bg-[#0a0614] rounded-2xl border border-white/10 p-8 space-y-6 shadow-2xl">
      {/* Portal Tab Switcher */}
      <div className="grid grid-cols-2 gap-1.5 bg-[#130a24] p-1 rounded-xl border border-white/10 font-mono text-xs uppercase tracking-wider">
        <button
          type="button"
          onClick={() => {
            setLoginType('client')
            setError(null)
          }}
          className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            loginType === 'client'
              ? 'bg-[#d4af37] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Client Login
        </button>
        <button
          type="button"
          onClick={() => {
            setLoginType('admin')
            setError(null)
          }}
          className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            loginType === 'admin'
              ? 'bg-[#d4af37] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Staff / Admin
        </button>
      </div>

      <div className="space-y-1.5 text-center">
        <h2 className="font-serif text-2xl font-bold text-white uppercase tracking-wide">
          {loginType === 'client' ? 'Welcome Back' : 'Executive Access'}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans">
          {loginType === 'client'
            ? 'Sign in to your client automation portal'
            : 'Sign in to your administrative dashboard'}
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs sm:text-sm font-medium text-zinc-200 flex items-center gap-2">
            <Mail size={13} className="text-[#d4af37]" /> Email Address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={loginType === 'client' ? 'you@example.com' : 'admin@mercianwealth.com'}
            className="w-full bg-[#130a24] border border-white/10 hover:border-white/20 focus:border-[#d4af37] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-1 focus:ring-[#d4af37] transition-all"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="text-xs sm:text-sm font-medium text-zinc-200 flex items-center gap-2">
            <Lock size={13} className="text-[#d4af37]" /> Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#130a24] border border-white/10 hover:border-white/20 focus:border-[#d4af37] rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-1 focus:ring-[#d4af37] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#d4af37] transition-colors p-1 cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div ref={errorRef} className="bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 text-xs sm:text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          id="login-submit"
          className="w-full bg-[#d4af37] hover:bg-[#fff5d8] text-black font-mono font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-lg shadow-[#d4af37]/20 transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Signing In…
            </>
          ) : (
            loginType === 'client' ? 'Sign In to Client Portal ◆' : 'Sign In to Admin Portal ◆'
          )}
        </button>

        {/* Links Section */}
        <div className="flex flex-col gap-4 text-center border-t border-white/10 pt-4 mt-2 font-mono">
          <div className="text-center">
            <Link
              href="/forgot-password"
              className="text-xs text-zinc-400 hover:text-[#d4af37] transition-colors underline underline-offset-2"
            >
              Forgot your password?
            </Link>
          </div>

          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-[#d4af37] transition-colors flex items-center justify-center gap-1.5"
          >
            ← Back to Homepage
          </Link>
        </div>
      </form>
    </div>
  )
}
