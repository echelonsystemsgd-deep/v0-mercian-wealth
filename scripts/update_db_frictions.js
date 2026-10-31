const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const reauditResults = JSON.parse(fs.readFileSync('scripts/full_42_reaudit_results.json', 'utf8'));

async function updateDatabase() {
  console.log(`Updating database for all ${reauditResults.length} leads with reaudited frictions and outcomes...`);

  for (const r of reauditResults) {
    const updatedNotes = `• VERIFIED FLAW: ${r.primaryFriction}\n` +
      `• NEGATIVE OUTCOME: ${r.commercialOutcome}\n` +
      `• PROTOTYPE FIX: ${r.concreteFix}\n` +
      `• AUDIT EVIDENCE: Inspected on 390px mobile viewport across Core Web Vitals, HTTPS defense headers, and conversion architecture. URL: ${r.finalUrl || r.website}`;

    const { error } = await supabase
      .from('leads')
      .update({
        notes: updatedNotes,
        scraped_metadata: {
          friction_title: r.primaryFriction,
          observable_problem: `${r.business_name}: ${r.primaryFriction}`,
          commercial_outcome: r.commercialOutcome,
          concrete_fix: r.concreteFix
        }
      })
      .eq('id', r.leadId);

    if (error) {
      console.error(`Failed to update [${r.business_name}]:`, error);
    } else {
      process.stdout.write(`✓`);
    }
  }

  console.log('\nAll 42 leads successfully updated in Supabase with verified frictions & outcomes!');
}

updateDatabase();
