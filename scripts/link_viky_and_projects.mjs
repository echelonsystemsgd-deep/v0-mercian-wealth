import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const envFile = fs.readFileSync(path.resolve(__dirname, '../.env.local'), 'utf8')
const env = {}
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/^['"](.*)['"]$/, '$1')
  }
})

const sbUrl = env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL
const sbKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const sb = createClient(sbUrl, sbKey)

async function run() {
  console.log('--- 1. UPDATING ALI NAWAZ PROFILE & PROJECT ---')
  // Update Ali Nawaz profile full_name if needed
  const aliProfileId = '91597809-ca54-423b-8a5f-958ba0bed256'
  const { error: aProfErr } = await sb.from('profiles').update({
    full_name: 'Ali Nawaz (Sell Your Stamps UK)',
    address_line2: 'Sell Your Stamps UK',
  }).eq('id', aliProfileId)
  console.log('Ali profile updated:', aProfErr || 'SUCCESS')

  // Update Ali Nawaz project
  const aliProjectId = 'e85eeaf1-3ac3-482a-8743-3952e8b65e02'
  const { error: aProjErr } = await sb.from('projects').update({
    client_name: 'Ali Nawaz',
    project_name: 'Stamp Valuation Website - Sell Your Stamps UK',
    live_url: 'https://v0-stamp-valuation-app-eight.vercel.app/',
    preview_url: 'https://v0-stamp-valuation-app-eight.vercel.app/',
    client_id: aliProfileId,
  }).eq('id', aliProjectId)
  console.log('Ali project updated:', aProjErr || 'SUCCESS')

  console.log('\n--- 2. CREATING / LINKING VIKY FRIEND (NIRAJ JEWELLERS & CHITHRAM TV) ---')
  // Check if an auth user exists for Viky
  const { data: { users } } = await sb.auth.admin.listUsers()
  let vikyUser = users?.find(u => u.email === 'viky.friend@chitramtv.co.uk' || u.phone === '+447955565137')

  if (!vikyUser) {
    console.log('Creating auth user for Viky Friend...')
    const { data: newUser, error: createAuthErr } = await sb.auth.admin.createUser({
      email: 'viky.friend@chitramtv.co.uk',
      phone: '+447955565137',
      email_confirm: true,
      phone_confirm: true,
      user_metadata: {
        full_name: 'Viky Friend (Niraj Jewellers & Chithram TV)',
        business: 'Niraj Jewellers UK / CHITHRAM TV',
      }
    })
    if (createAuthErr) {
      console.error('Error creating auth user:', createAuthErr)
      return
    }
    vikyUser = newUser.user
    console.log('Created auth user:', vikyUser.id)
  } else {
    console.log('Existing auth user found:', vikyUser.id)
  }

  // Ensure profile row exists
  const { data: existingProfile } = await sb.from('profiles').select('*').eq('id', vikyUser.id).maybeSingle()
  if (!existingProfile) {
    console.log('Inserting profile for Viky...')
    const { error: profInsertErr } = await sb.from('profiles').insert({
      id: vikyUser.id,
      full_name: 'Viky Friend (Niraj Jewellers & Chithram TV)',
      email: 'viky.friend@chitramtv.co.uk',
      phone_number: '+44 7955 565137',
      address_line1: '136 Uxbridge road',
      address_line2: 'Hayes Middlesex',
      post_code: 'UB4 0JH',
      role: 'client',
      is_suspended: false,
    })
    console.log('Profile insert result:', profInsertErr || 'SUCCESS')
  } else {
    console.log('Updating profile for Viky...')
    const { error: profUpdateErr } = await sb.from('profiles').update({
      full_name: 'Viky Friend (Niraj Jewellers & Chithram TV)',
      email: 'viky.friend@chitramtv.co.uk',
      phone_number: '+44 7955 565137',
      address_line1: '136 Uxbridge road',
      address_line2: 'Hayes Middlesex',
      post_code: 'UB4 0JH',
      role: 'client',
    }).eq('id', vikyUser.id)
    console.log('Profile update result:', profUpdateErr || 'SUCCESS')
  }

  // Customer Notes formatted cleanly
  const vikyCustomerNotes = `[CUSTOMER DOSSIER: VIKY & ASSOCIATED BUSINESSES]

1. PRIMARY CLIENT CONTACT:
Name: Viky
Business: Niraj Jewellers Uk
Address: 136 Uxbridge road Hayes Middlesex UB4 0JH
Phone: +44 7955 565137
Business Pitch & Services:
"Any jewellery made with u in mind give us a call. Visit us dreams come reality with us. No matter what the jewellery design is we are always ready to make ur dreams come true. Jewellery & Watch repair… How may I help"

2. ASSOCIATED CLIENT BUSINESS:
Entity: CHITHRAM TV
Website: Chitramtv.co.uk
Direct Contact: +44 7979 637777
Services: UK IPTV / South Asian Streaming Media Provider

3. DIGITAL ASSET & PROTOTYPE:
Live Prototype: https://uk-streaming-client-prototype.vercel.app/
Status: Active Staging Review`

  const vikyProjectId = '418f57f9-dc1d-4247-a093-df797bd5d1db'
  const { error: vProjErr } = await sb.from('projects').update({
    client_name: 'Viky Friend',
    project_name: 'Chitram TV & Streaming Platform',
    client_id: vikyUser.id,
    live_url: 'https://uk-streaming-client-prototype.vercel.app/',
    preview_url: 'https://uk-streaming-client-prototype.vercel.app/',
    service_type: 'High-Performance Web Streaming Portal',
    description: 'Bespoke web application and streaming subscription portal for Chithram TV, connected via Viky (Niraj Jewellers UK).',
    notes: vikyCustomerNotes,
  }).eq('id', vikyProjectId)
  console.log('Viky project updated:', vProjErr || 'SUCCESS')

  console.log('\n--- VERIFYING FINAL PROJECTS TABLE ---')
  const { data: updatedProjects } = await sb.from('projects').select('id, client_name, project_name, client_id, preview_url, live_url, notes')
  console.log(JSON.stringify(updatedProjects, null, 2))
}

run().catch(console.error)
