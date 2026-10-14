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
  const { data: projects, error: pErr } = await sb.from('projects').select('*')
  console.log('PROJECTS:', JSON.stringify(projects, null, 2), 'pErr:', pErr)

  const { data: { users }, error: uErr } = await sb.auth.admin.listUsers()
  console.log('AUTH USERS:', (users || []).map(u => ({ id: u.id, email: u.email })), 'uErr:', uErr)
  const { data: profiles, error: prErr } = await sb.from('profiles').select('*')
  console.log('PROFILES:', JSON.stringify(profiles, null, 2), 'prErr:', prErr)

  const { data: leads, error: lErr } = await sb.from('leads').select('id, name, business_name, phone, website, prototype_url')
  const matchedLeads = (leads || []).filter(l => {
    const s = `${l.name} ${l.business_name} ${l.phone} ${l.website}`.toLowerCase()
    return s.includes('ali') || s.includes('viky') || s.includes('chitram') || s.includes('niraj') || s.includes('chithram') || s.includes('7979637777') || s.includes('7955565137')
  })
  console.log('RELEVANT LEADS:', JSON.stringify(matchedLeads, null, 2))
}

run()
