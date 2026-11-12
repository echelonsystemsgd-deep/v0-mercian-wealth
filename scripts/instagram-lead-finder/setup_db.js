const fs = require('fs');
const path = require('path');

// Read environment variables from .env.local
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    throw new Error('.env.local file not found at ' + envPath);
  }
  return Object.fromEntries(
    fs.readFileSync(envPath, 'utf-8')
      .split('\n')
      .filter(l => l.includes('='))
      .map(l => {
        const idx = l.indexOf('=');
        return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
      })
  );
}

async function runSQL(sql) {
  const env = loadEnv();
  const url = `https://api.supabase.com/v1/projects/${env.SUPABASE_PROJECT_REF}/database/query`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.SUPABASE_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: sql })
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Supabase SQL API error (${res.status}): ${txt}`);
  }
  return await res.json();
}

async function main() {
  console.log('--- Initializing Supabase `instagram_leads` table ---');
  
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS instagram_leads (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      business_name TEXT NOT NULL,
      instagram_handle TEXT UNIQUE NOT NULL,
      instagram_url TEXT NOT NULL,
      website_url TEXT,
      has_website BOOLEAN DEFAULT FALSE,
      phone TEXT,
      email TEXT,
      location TEXT DEFAULT 'London, UK',
      lead_category TEXT DEFAULT 'no_website',
      qualification_reason TEXT NOT NULL,
      specific_car_hook TEXT NOT NULL,
      owner_name TEXT,
      
      -- Outreach state
      status TEXT DEFAULT 'qualified',
      warmup_day INT DEFAULT 1,
      
      -- Rendered messages
      message_d1 TEXT,
      message_d4 TEXT,
      message_d7 TEXT,
      
      -- Timestamps & Scheduling
      d1_sent_at TIMESTAMPTZ,
      d4_sent_at TIMESTAMPTZ,
      d7_sent_at TIMESTAMPTZ,
      next_action_due TIMESTAMPTZ DEFAULT NOW(),
      last_reply_at TIMESTAMPTZ,
      
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_ig_leads_status ON instagram_leads (status);
    CREATE INDEX IF NOT EXISTS idx_ig_leads_next_action ON instagram_leads (next_action_due);
    CREATE INDEX IF NOT EXISTS idx_ig_leads_handle ON instagram_leads (instagram_handle);
  `;

  const result = await runSQL(createTableSQL);
  console.log('Result:', result);
  console.log('`instagram_leads` table created and verified successfully!');
}

main().catch(err => {
  console.error('Fatal error during setup:', err);
  process.exit(1);
});
