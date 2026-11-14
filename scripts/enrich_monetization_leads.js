const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function getMonetizationStrategy(lead) {
  const meta = lead.scraped_metadata || {};
  const businessName = lead.business_name || lead.name || 'Accountancy Practice';
  const flaw = meta.observable_problem || meta.friction_title || 'Mobile contact intake lacks turnover triage';
  const stack = meta.tech_stack || 'Standard Web Stack';
  const trade = meta.trade || 'Chartered Accountants';

  // Determine pricing tier based on reviews or complexity
  const reviews = meta.reviews_count || 10;
  let setupPrice = '£1,995';
  let retainerPrice = '£695/mo';

  if (reviews > 50 || stack.toLowerCase().includes('enterprise') || businessName.toLowerCase().includes('partners') || businessName.toLowerCase().includes('llp')) {
    setupPrice = '£2,995';
    retainerPrice = '£995/mo';
  } else if (reviews < 15) {
    setupPrice = '£1,495';
    retainerPrice = '£495/mo';
  }

  // 1. Trojan Horse Door-Opener (Visual Storefront)
  const trojanHorse = `Sub-second luxury mobile practice storefront resolving ${flaw.slice(0, 100).toLowerCase()} with bespoke typography and instant tap-to-call mobile ergonomics.`;

  // 2. Automator Engine Upsell (Back-End Revenue Architecture)
  const automatorEngine = `60-second Ltd Co vs Sole Trader turnover qualification scoper + Speed-to-lead automated WhatsApp confirmation in <60s + direct partner calendar hold sync.`;

  return {
    trojan_horse_storefront: trojanHorse,
    automator_upsell_engine: automatorEngine,
    deal_tier_setup: setupPrice,
    deal_tier_retainer: retainerPrice,
    deal_total_y1_value: `£${parseInt(setupPrice.replace(/[^0-9]/g, '')) + parseInt(retainerPrice.replace(/[^0-9]/g, '')) * 12}`
  };
}

async function runEnrichment() {
  console.log('Fetching active leads...');
  const { data: leads, error } = await supabase
    .from('leads')
    .select('id, business_name, name, status, website, phone, notes, scraped_metadata')
    .neq('status', 'Lost');

  if (error) {
    console.error('Error fetching leads:', error);
    return;
  }

  console.log(`Enriching ${leads.length} active leads with 2-Tier Monetization Architecture...`);

  let updatedCount = 0;
  for (const lead of leads) {
    const strat = getMonetizationStrategy(lead);
    const existingMeta = lead.scraped_metadata || {};

    const updatedMeta = {
      ...existingMeta,
      ...strat,
      monetization_analyzed_at: new Date().toISOString()
    };

    // Prepend or update notes with 2-Tier Monetization Blueprint if not already there
    let existingNotes = lead.notes || '';
    if (!existingNotes.includes('• 🎯 2-TIER MONETIZATION BLUEPRINT:')) {
      const blueprintNote = `• 🎯 2-TIER MONETIZATION BLUEPRINT:
  - Tier 1 (Trojan Horse Door-Opener): ${strat.trojan_horse_storefront} (${strat.deal_tier_setup} setup)
  - Tier 2 (Automator Engine Upsell): ${strat.automator_upsell_engine} (${strat.deal_tier_retainer} retainer)
  - Projected Year 1 Value: ${strat.deal_total_y1_value}

${existingNotes}`.trim();
      existingNotes = blueprintNote;
    }

    const { error: updateErr } = await supabase
      .from('leads')
      .update({
        scraped_metadata: updatedMeta,
        notes: existingNotes,
        updated_at: new Date().toISOString()
      })
      .eq('id', lead.id);

    if (updateErr) {
      console.error(`Failed to update ${lead.business_name || lead.name}:`, updateErr);
    } else {
      updatedCount++;
    }
  }

  console.log(`Successfully enriched ${updatedCount}/${leads.length} leads in Supabase.`);
}

runEnrichment();
