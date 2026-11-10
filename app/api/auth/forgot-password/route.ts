import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { Resend } from 'resend'
import { checkRateLimit } from '@/lib/rate-limit'
import { generatePasswordResetEmail } from '@/lib/email-templates'

// Helper to get Resend client
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY
  return apiKey ? new Resend(apiKey) : null
}

export async function POST(request: Request) {
  try {
    // 1. Rate limiting: max 5 requests per 5 minutes per IP
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp || '127.0.0.1'

    const rateLimit = checkRateLimit(clientIp, { limit: 5, windowMs: 5 * 60 * 1000 })
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many reset requests. Please wait a few minutes before trying again.' },
        { status: 429 }
      )
    }

    const { email } = await request.json().catch(() => ({}))

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 })
    }

    const cleanEmail = email.trim().toLowerCase()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    // Determine base URL
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'https://mercianwealth.com'
    const redirectTarget = `${origin}/auth/callback?next=/reset-password`

    if (!supabaseAdmin) {
      console.warn('[API/ForgotPassword] Supabase admin not initialized. Cannot generate recovery link.')
      return NextResponse.json(
        { error: 'Authentication service temporarily unavailable. Please contact support.' },
        { status: 500 }
      )
    }

    // 2. Generate secure recovery link via Supabase Admin
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email: cleanEmail,
      options: {
        redirectTo: redirectTarget,
      },
    })

    if (linkError) {
      console.warn(`[API/ForgotPassword] Recovery link generation for ${cleanEmail}: ${linkError.message}`)
      // Security standard: do not leak whether an account exists or not
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email address, a password reset link has been dispatched.',
      })
    }

    const actionLink = linkData?.properties?.action_link
    if (!actionLink) {
      console.error('[API/ForgotPassword] No action_link returned by Supabase.')
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email address, a password reset link has been dispatched.',
      })
    }

    // Fetch user profile name if available for personalized greeting
    let userName: string | null = null
    try {
      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('name')
        .eq('id', linkData.user.id)
        .maybeSingle()
      if (profile?.name) {
        userName = profile.name
      }
    } catch {
      // Non-blocking
    }

    // 3. Dispatch branded transactional password reset email via Resend
    const resend = getResendClient()
    if (resend) {
      const rawFrom = process.env.RESEND_FROM_EMAIL || 'Mercian Wealth <hello@mercianwealth.com>'
      const fromEmail = rawFrom.replace(/^["']|["']$/g, '').trim()

      const resetEmailHtml = generatePasswordResetEmail({
        email: cleanEmail,
        resetUrl: actionLink,
        name: userName,
      })

      const { error: resendError } = await resend.emails.send({
        from: fromEmail,
        to: cleanEmail,
        subject: '🔒 Reset Your Mercian Wealth Portal Password',
        html: resetEmailHtml,
      })

      if (resendError) {
        console.error('[API/ForgotPassword] Resend error delivering reset email:', resendError)
      } else {
        console.log(`[API/ForgotPassword] Successfully dispatched password reset email to ${cleanEmail}`)
      }
    } else {
      console.warn('[API/ForgotPassword] RESEND_API_KEY missing. Reset email could not be dispatched via Resend.')
    }

    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email address, a password reset link has been dispatched.',
    })
  } catch (err: any) {
    console.error('[API/ForgotPassword] Unhandled exception:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}
