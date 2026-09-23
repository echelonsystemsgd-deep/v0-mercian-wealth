import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { crawlWebsite } from '@/lib/auditor/crawler'
import { runGroqFrictionReasoning } from '@/lib/auditor/reasoning'
import type { AuditReport } from '@/lib/auditor/types'

export const maxDuration = 60 // Allow up to 60s for full crawl + LLM reasoning

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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

    // Update lead status to running if leadId provided
    if (leadId) {
      await supabase
        .from('leads')
        .update({ audit_status: 'running' })
        .eq('id', leadId)
    }

    const businessName = leadData?.business_name || leadData?.name || 'Local Business'
    const trade = leadData?.local_business_niche || leadData?.scraped_metadata?.trade || 'local trade'
    const contactName = leadData?.name && leadData.name !== businessName ? leadData.name.split(' ')[0] : undefined

    // 1. Crawl website
    const { pages, checks } = await crawlWebsite(targetUrl)

    // 2. Run Groq reasoning pipeline
    const { frictions, outreachAngles, confidenceScore } = await runGroqFrictionReasoning(
      targetUrl,
      businessName,
      trade,
      pages,
      checks,
      contactName
    )

    const contactEmail = checks.foundEmails[0] || undefined
    const contactPhone = checks.foundPhones[0] || undefined

    const report: AuditReport = {
      leadId,
      url: targetUrl,
      status: 'complete',
      confidenceScore,
      pagesCrawled: pages,
      deterministicChecks: checks,
      frictions,
      outreachAngles,
      contactEmail,
      contactPhone,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // 3. Persist audit to Supabase
    const { data: auditRecord, error: auditError } = await supabase
      .from('website_audits')
      .insert({
        lead_id: leadId || null,
        url: targetUrl,
        status: 'complete',
        confidence_score: confidenceScore,
        pages_crawled: pages,
        deterministic_checks: checks,
        frictions,
        outreach_angles: outreachAngles,
        contact_email: contactEmail,
        contact_phone: contactPhone,
      })
      .select('id')
      .single()

    // 4. Update leads table if leadId provided
    if (leadId) {
      const topFrictionText = frictions[0]
        ? `${frictions[0].location}: ${frictions[0].observableProblem}`
        : 'General mobile friction'

      const leadUpdate: Record<string, any> = {
        audit_status: 'complete',
        last_audited_at: new Date().toISOString(),
        top_friction: topFrictionText,
        friction_count: frictions.length,
      }

      if (auditRecord?.id) {
        leadUpdate.website_audit_id = auditRecord.id
      }

      // If lead had no email and we extracted an email from the site, auto-fill it!
      if ((!leadData?.email || leadData.email.trim() === '') && contactEmail) {
        leadUpdate.email = contactEmail
      }

      await supabase
        .from('leads')
        .update(leadUpdate)
        .eq('id', leadId)
    }

    return NextResponse.json({
      success: true,
      auditId: auditRecord?.id,
      report,
    })
  } catch (err: any) {
    console.error('Audit execution failed:', err)
    return NextResponse.json(
      { error: err.message || 'Audit execution failed' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)
    const leadId = searchParams.get('leadId')
    const url = searchParams.get('url')

    if (!leadId && !url) {
      return NextResponse.json({ error: 'leadId or url is required' }, { status: 400 })
    }

    let query = supabase
      .from('website_audits')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)

    if (leadId) {
      query = query.eq('lead_id', leadId)
    } else if (url) {
      query = query.eq('url', url)
    }

    const { data: audit, error } = await query.maybeSingle()

    if (error || !audit) {
      return NextResponse.json({ found: false, audit: null })
    }

    return NextResponse.json({
      found: true,
      audit: {
        id: audit.id,
        leadId: audit.lead_id,
        url: audit.url,
        status: audit.status,
        confidenceScore: audit.confidence_score,
        pagesCrawled: audit.pages_crawled,
        deterministicChecks: audit.deterministic_checks,
        frictions: audit.frictions,
        outreachAngles: audit.outreach_angles,
        contactEmail: audit.contact_email,
        contactPhone: audit.contact_phone,
        createdAt: audit.created_at,
        updatedAt: audit.updated_at,
      },
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
