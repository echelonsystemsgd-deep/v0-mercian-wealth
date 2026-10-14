#!/usr/bin/env node
/**
 * Evidence-Based Website Audit Runner
 * Headless 390px mobile audit, signal extraction, deterministic scoring,
 * and single-source outreach generation.
 *
 * Usage:
 *   node scripts/run_evidence_audit.mjs <url> [--business="Name"] [--lead-id="uuid"] [--screenshot] [--json]
 */

import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

import { auditSiteWithHeadlessBrowser } from '../lib/auditor/evidence-crawler.ts'
import { evaluateSignalsToAnalysis } from '../lib/auditor/rubric.ts'
import { generateOutreachFromAnalysis } from '../lib/auditor/evidence-outreach.ts'

const args = process.argv.slice(2)
const isHelp = args.includes('--help') || args.includes('-h') || args.length === 0

if (isHelp) {
  console.log(`
============================================================
      EVIDENCE-BASED WEBSITE AUDIT & OUTREACH ENGINE
============================================================
Usage:
  node scripts/run_evidence_audit.mjs <url> [options]

Options:
  --business="Name"     Business name (defaults to domain hostname)
  --lead-id="uuid"      Supabase lead ID to persist analysis to
  --screenshot          Capture 390px mobile viewport screenshot
  --json                Output clean JSON format
  --help, -h            Show this help guide
============================================================
`)
  process.exit(0)
}

let rawUrl = args.find(a => !a.startsWith('--'))
if (!rawUrl) {
  console.error('[-] Error: Target URL is required.')
  process.exit(1)
}

if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
  rawUrl = `https://${rawUrl}`
}

const isJson = args.includes('--json')
const captureScreenshot = args.includes('--screenshot')
const businessArg = args.find(a => a.startsWith('--business='))
const leadIdArg = args.find(a => a.startsWith('--lead-id='))

const leadId = leadIdArg ? leadIdArg.split('=')[1] : undefined
const domain = new URL(rawUrl).hostname.replace(/^www\./, '')
const businessName = businessArg ? businessArg.split('=')[1] : domain

async function run() {
  if (!isJson) {
    console.log(`\n🔍 Launching 390px Mobile Headless Probe for: ${rawUrl}`)
    console.log(`   Business: ${businessName}`)
    console.log(`   Lead ID: ${leadId || 'N/A'}`)
  }

  const screenshotDir = captureScreenshot ? path.resolve(__dirname, '../public/audit-screenshots') : undefined

  try {
    const { signals, fingerprint, screenshotPath, error } = await auditSiteWithHeadlessBrowser(rawUrl, {
      screenshotDir,
      timeoutMs: 25000
    })

    if (error && !isJson) {
      console.warn(`[!] Headless browser note: ${error}`)
    }

    const analysis = evaluateSignalsToAnalysis(
      domain,
      rawUrl,
      businessName,
      signals,
      fingerprint,
      new Date(),
      screenshotPath
    )

    const outreach = generateOutreachFromAnalysis(analysis)

    // Optional Supabase persistence if leadId provided
    if (leadId) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (supabaseUrl && supabaseKey) {
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(supabaseUrl, supabaseKey)

        const { error: updateError } = await supabase
          .from('leads')
          .update({
            friction_found: analysis.primaryAngle.title,
            evidence_link: analysis.primaryAngle.evidence.url,
            audit_status: 'complete',
            last_audited_at: new Date().toISOString(),
            scraped_metadata: {
              audit_analysis: analysis,
              generated_outreach: outreach,
              build_fingerprint: fingerprint,
              grade: analysis.grade,
              grade_reason: analysis.gradeReason
            }
          })
          .eq('id', leadId)

        if (updateError && !isJson) {
          console.error(`[-] Failed to sync audit to Supabase: ${updateError.message}`)
        } else if (!isJson) {
          console.log(`✅ Persisted audit & outreach to lead ${leadId}`)
        }
      }
    }

    if (isJson) {
      console.log(JSON.stringify({ analysis, outreach }, null, 2))
    } else {
      console.log('\n============================================================')
      console.log(`📊 AUDIT VERDICT: [Grade ${analysis.grade}]`)
      console.log(`   Reason: ${analysis.gradeReason}`)
      console.log(`   Build Platform: ${fingerprint.platform} (${fingerprint.confidence} confidence)`)
      console.log('------------------------------------------------------------')
      console.log(`🎯 PRIMARY ANGLE (${analysis.primaryAngle.layer.toUpperCase()} LAYER):`)
      console.log(`   Title: ${analysis.primaryAngle.title}`)
      console.log(`   Headline: ${analysis.primaryAngle.headline}`)
      console.log(`   Evidence: ${analysis.primaryAngle.evidence.measuredValue}`)
      console.log(`   Diagnosis: ${analysis.primaryAngle.diagnosis}`)
      console.log('------------------------------------------------------------')
      console.log('📌 SUPPORTING POINTS:')
      analysis.supportingPoints.forEach((sp, i) => {
        console.log(`   ${i + 1}. ${sp.title} (${sp.evidence.measuredValue})`)
      })
      console.log('------------------------------------------------------------')
      console.log('❓ CALL HYPOTHESES (Unknowns to Validate):')
      analysis.callHypotheses.forEach((hyp, i) => {
        console.log(`   [${hyp.status.toUpperCase()}] ${hyp.statement}`)
      })
      console.log('------------------------------------------------------------')
      console.log('💬 READY-TO-SEND WHATSAPP OPENER:')
      console.log(outreach.whatsappOpenerRecommended)
      console.log('------------------------------------------------------------')
      console.log('🛠️ BUILDER REPOSITION REPLY:')
      console.log(outreach.whatsappBuilderReply)
      console.log('============================================================\n')
    }
  } catch (err) {
    console.error(`[-] Audit execution failed:`, err.message)
    process.exit(1)
  }
}

run()
