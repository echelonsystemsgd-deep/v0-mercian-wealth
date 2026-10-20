import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { auditSiteWithHeadlessBrowser } from '@/lib/auditor/evidence-crawler'
import { evaluateSignalsToAnalysis } from '@/lib/auditor/rubric'
import { generateOutreachFromAnalysis } from '@/lib/auditor/evidence-outreach'

export const maxDuration = 60 // Allow up to 60s for full headless crawl + analysis

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    const apiKeyHeader = req.headers.get('x-api-key')
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    let supabase: any = null
    const isServiceAuth = Boolean(
      serviceRoleKey &&
      ((authHeader && authHeader === `Bearer ${serviceRoleKey}`) ||
       (apiKeyHeader && apiKeyHeader === serviceRoleKey))
    )

    if (isServiceAuth && supabaseAdmin) {
      supabase = supabaseAdmin
    } else {
      const serverSupabase = await createClient()
      const { data: { user } } = await serverSupabase.auth.getUser()
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      supabase = serverSupabase
    }

    const body = await req.json()
    const { leadId, url: inputUrl } = body

    let targetUrl = inputUrl
    let leadData: Record<string, any> | null = null

    if (leadId) {
      const { data: lead } = await supabase
        .from('leads')
        .select('*')
        .eq('id', leadId)
        .single()

      if (lead) {
        leadData = lead
        if (!targetUrl && lead.website) {
          targetUrl = lead.website
        }
      }
    }

    if (!targetUrl || targetUrl.trim() === '' || targetUrl === 'None') {
      return NextResponse.json({ error: 'Valid website URL is required to run audit' }, { status: 400 })
    }

    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = `https://${targetUrl}`
    }

    if (leadId) {
      await supabase
        .from('leads')
        .update({ audit_status: 'running' })
        .eq('id', leadId)
    }

    const businessName = leadData?.business_name || leadData?.name || new URL(targetUrl).hostname.replace(/^www\./, '')
    const domain = new URL(targetUrl).hostname.replace(/^www\./, '')

    // 1. Run headless browser audit at 390px mobile viewport
    const screenshotDir = path.resolve(process.cwd(), 'public/audit-screenshots')
    const { signals, fingerprint, screenshotPath, error: crawlError } = await auditSiteWithHeadlessBrowser(targetUrl, {
      screenshotDir,
      timeoutMs: 25000
    })

    // 2. Deterministic analysis & single angle selection
    const analysis = evaluateSignalsToAnalysis(
      domain,
      targetUrl,
      businessName,
      signals,
      fingerprint,
      new Date(),
      screenshotPath
    )

    // 3. Single-source outreach generation
    const outreach = generateOutreachFromAnalysis(analysis)

    // 4. Update leads table if leadId provided
    if (leadId) {
      const existingMetadata = (leadData?.scraped_metadata || {}) as Record<string, any>
      await supabase
        .from('leads')
        .update({
          audit_status: 'complete',
          last_audited_at: new Date().toISOString(),
          friction_found: analysis.primaryAngle.title,
          evidence_link: analysis.primaryAngle.evidence.url,
          top_friction: `${analysis.primaryAngle.title}: ${analysis.primaryAngle.headline}`,
          friction_count: analysis.findings.length,
          scraped_metadata: {
            ...existingMetadata,
            audit_analysis: analysis,
            generated_outreach: outreach,
            build_fingerprint: fingerprint,
            grade: analysis.grade,
            grade_reason: analysis.gradeReason
          }
        })
        .eq('id', leadId)
    }

    return NextResponse.json({
      success: true,
      analysis,
      outreach,
      crawlNote: crawlError || undefined
    })
  } catch (error: any) {
    console.error('Audit API failed:', error)
    return NextResponse.json({ error: error.message || 'Internal audit error' }, { status: 500 })
  }
}
