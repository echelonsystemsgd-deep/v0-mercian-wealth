import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ladebhmyywkcqtyazxxk.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhZGViaG15eXdrY3F0eWF6eHhrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTY4NTAzNSwiZXhwIjoyMDk3MjYxMDM1fQ.m_FBVwQCgj9OWqz1dajV7pGpoA5yF1Hyir71gibCKEE'

export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const { count, error } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('source', 'google_maps_outreach')

    if (error) throw error

    return NextResponse.json({
      success: true,
      total_outreach_leads: count || 0,
      timestamp: new Date().toISOString()
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Mode 1: Import or Bulk Upsert leads from Google Sheets
    if (body.action === 'import_leads' || body.action === 'batch_sync') {
      const rawLeads: any[] = Array.isArray(body.leads) ? body.leads : []
      if (rawLeads.length === 0) {
        return NextResponse.json({ error: 'No leads provided in "leads" array' }, { status: 400 })
      }

      // Fetch existing leads to avoid duplicate inserts
      const { data: existingLeads } = await supabase
        .from('leads')
        .select('id, phone, business_name')
        .eq('source', 'google_maps_outreach')

      const existingPhoneMap = new Map<string, string>()
      const existingNameMap = new Map<string, string>()

      ;(existingLeads || []).forEach(lead => {
        if (lead.phone) existingPhoneMap.set(lead.phone.replace(/[^0-9]/g, ''), lead.id)
        if (lead.business_name) existingNameMap.set(lead.business_name.trim().toLowerCase(), lead.id)
      })

      const leadsToInsert: any[] = []
      let updatedCount = 0

      for (const lead of rawLeads) {
        const businessName = (lead.business_name || lead.name || 'Business').trim()
        const rawPhone = String(lead.phone || '').trim()
        const digits = rawPhone.replace(/[^0-9]/g, '')
        const cleanAddress = String(lead.address || '').replace(/·\s*\d+(\s*\(★[\d\.]+\))?/g, '').trim()
        const rawWeb = (lead.website || '').trim()
        const website = rawWeb && rawWeb !== 'None' && rawWeb !== 'NO WEBSITE' ? rawWeb : null

        const isMobile = digits.startsWith('447') || digits.startsWith('07')
        const waDigits = digits.startsWith('07') ? ('44' + digits.substring(1)) : digits
        const waUrl = isMobile ? `https://wa.me/${waDigits}` : null

        const leadPayload = {
          name: lead.contact_name || 'Owner / Director',
          business_name: businessName,
          phone: rawPhone || null,
          website: website,
          service_interested: 'Digital Storefront & Speed-to-Lead Automation',
          notes: cleanAddress ? `${cleanAddress} · ★${lead.rating || '5.0'} (${lead.reviews_count || 0} reviews)` : null,
          status: lead.status || 'New',
          source: 'google_maps_outreach',
          lead_type: 'local',
          local_business_niche: lead.trade || lead.category || 'Local Business',
          outreach_category: !website ? 'no_website' : 'has_website',
          outreach_stage: lead.status === 'Contacted' ? 'contacted' : 'uncontacted',
          whatsapp_direct_url: waUrl,
          scraped_metadata: {
            address: cleanAddress,
            rating: parseFloat(lead.rating) || 5.0,
            reviews_count: parseInt(lead.reviews_count) || 0,
            trade: lead.trade || lead.category || 'Local Business',
            stage_1_opener: lead.stage_1_opener || 'Hi 👋',
            stage_2_pitch: lead.stage_2_pitch || '',
            follow_up_1: lead.follow_up_1 || '',
            follow_up_final: lead.follow_up_final || ''
          }
        }

        const existingId = (digits && existingPhoneMap.get(digits)) || existingNameMap.get(businessName.toLowerCase())

        if (existingId) {
          // Update existing lead record non-destructively
          await supabase
            .from('leads')
            .update({
              website: leadPayload.website,
              notes: leadPayload.notes,
              local_business_niche: leadPayload.local_business_niche,
              outreach_category: leadPayload.outreach_category,
              scraped_metadata: leadPayload.scraped_metadata
            })
            .eq('id', existingId)
          updatedCount++
        } else {
          leadsToInsert.push(leadPayload)
        }
      }

      // Batch insert in chunks of 50
      let insertedCount = 0
      const CHUNK_SIZE = 50
      for (let i = 0; i < leadsToInsert.length; i += CHUNK_SIZE) {
        const chunk = leadsToInsert.slice(i, i + CHUNK_SIZE)
        const { error: insertErr } = await supabase.from('leads').insert(chunk)
        if (insertErr) throw insertErr
        insertedCount += chunk.length
      }

      return NextResponse.json({
        success: true,
        message: `Import complete: ${insertedCount} new leads inserted, ${updatedCount} existing leads updated.`,
        inserted_count: insertedCount,
        updated_count: updatedCount,
        total_processed: rawLeads.length
      })
    }

    // Mode 2: Fresh Sync (wipes old scraper leads and inserts fresh)
    if (body.action === 'fresh_sync') {
      const rawLeads: any[] = Array.isArray(body.leads) ? body.leads : []
      if (rawLeads.length === 0) {
        return NextResponse.json({ error: 'No leads provided for fresh sync' }, { status: 400 })
      }

      // Delete existing outreach leads
      const { error: delErr } = await supabase
        .from('leads')
        .delete()
        .eq('source', 'google_maps_outreach')

      if (delErr) throw delErr

      const preparedLeads = rawLeads.map(lead => {
        const businessName = (lead.business_name || lead.name || 'Business').trim()
        const rawPhone = String(lead.phone || '').trim()
        const digits = rawPhone.replace(/[^0-9]/g, '')
        const cleanAddress = String(lead.address || '').replace(/·\s*\d+(\s*\(★[\d\.]+\))?/g, '').trim()
        const rawWeb = (lead.website || '').trim()
        const website = rawWeb && rawWeb !== 'None' && rawWeb !== 'NO WEBSITE' ? rawWeb : null

        const isMobile = digits.startsWith('447') || digits.startsWith('07')
        const waDigits = digits.startsWith('07') ? ('44' + digits.substring(1)) : digits
        const waUrl = isMobile ? `https://wa.me/${waDigits}` : null

        return {
          name: lead.contact_name || 'Owner / Director',
          business_name: businessName,
          phone: rawPhone || null,
          website: website,
          service_interested: 'Digital Storefront & Speed-to-Lead Automation',
          notes: cleanAddress ? `${cleanAddress} · ★${lead.rating || '5.0'} (${lead.reviews_count || 0} reviews)` : null,
          status: 'New',
          source: 'google_maps_outreach',
          lead_type: 'local',
          local_business_niche: lead.trade || lead.category || 'Local Business',
          outreach_category: !website ? 'no_website' : 'has_website',
          outreach_stage: 'uncontacted',
          whatsapp_direct_url: waUrl,
          scraped_metadata: {
            address: cleanAddress,
            rating: parseFloat(lead.rating) || 5.0,
            reviews_count: parseInt(lead.reviews_count) || 0,
            trade: lead.trade || lead.category || 'Local Business',
            stage_1_opener: lead.stage_1_opener || 'Hi 👋',
            stage_2_pitch: lead.stage_2_pitch || '',
            follow_up_1: lead.follow_up_1 || '',
            follow_up_final: lead.follow_up_final || ''
          }
        }
      })

      let insertedCount = 0
      const CHUNK_SIZE = 50
      for (let i = 0; i < preparedLeads.length; i += CHUNK_SIZE) {
        const chunk = preparedLeads.slice(i, i + CHUNK_SIZE)
        const { error: insertErr } = await supabase.from('leads').insert(chunk)
        if (insertErr) throw insertErr
        insertedCount += chunk.length
      }

      return NextResponse.json({
        success: true,
        message: `Fresh sync complete: ${insertedCount} leads successfully imported. All set to 'New'.`,
        inserted_count: insertedCount
      })
    }

    // Mode 3: Delete a specific lead by phone or business name
    if (body.action === 'delete_lead' || body.action === 'delete') {
      const { phone, business_name } = body

      let query = supabase.from('leads').delete()

      if (phone) {
        query = query.eq('phone', phone)
      } else if (business_name) {
        query = query.eq('business_name', business_name)
      } else {
        return NextResponse.json({ error: 'phone or business_name required' }, { status: 400 })
      }

      const { data, error } = await query.select()
      if (error) throw error

      return NextResponse.json({
        success: true,
        deleted: data?.length || 0,
        message: `Deleted ${data?.length || 0} matching lead(s) from backend.`
      })
    }

    // Mode 4: Reconcile active leads from Google Sheets (deletes leads no longer present in sheet)
    if (body.action === 'reconcile' && Array.isArray(body.active_phones)) {
      const activePhones = body.active_phones.map((p: string) => String(p).trim()).filter(Boolean)

      const { data: outreachLeads, error: fetchErr } = await supabase
        .from('leads')
        .select('id, phone, business_name')
        .eq('source', 'google_maps_outreach')

      if (fetchErr) throw fetchErr

      const idsToDelete = (outreachLeads || [])
        .filter(lead => lead.phone && !activePhones.includes(lead.phone))
        .map(lead => lead.id)

      if (idsToDelete.length > 0) {
        const { error: delErr } = await supabase
          .from('leads')
          .delete()
          .in('id', idsToDelete)

        if (delErr) throw delErr
      }

      return NextResponse.json({
        success: true,
        deleted_count: idsToDelete.length,
        message: `Synced with Google Sheets: removed ${idsToDelete.length} deleted leads from backend.`
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (err: any) {
    console.error('Error syncing leads with Google Sheets:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
