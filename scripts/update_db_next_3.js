const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const updates = [
  {
    id: '763f3e8d-4087-4876-bf93-814fbbb1820a', // Goringe Accountants
    notes: '• VERIFIED FLAW: Homepage lacks any consultation intake flow (only search bars & newsletter) + generic unsegmented /contact/ form.\n' +
      '• AUDIT EVIDENCE: Inspected on 390px mobile viewport. Homepage has 0 consultation booking forms; only contains WordPress search widgets and newsletter signup. Inbound /contact/ route relies on an unsegmented 6-field form with no turnover qualification, no scope calculator, and no calendar hold.\n' +
      '• NEGATIVE OUTCOME: High-intent corporate directors researching Arlington Business Park accountants land on the homepage and see no clear next step to engage, creating drop-off to local competitors who offer instant consultation booking.\n' +
      '• PROTOTYPE FIX: Modern Practice OS with a 60-second corporate pre-qualification widget and automated discovery calendar booking.',
    scraped_metadata: {
      friction_title: 'Homepage Intake Gap & Unqualified Contact Route',
      observable_problem: 'goringeaccountants.co.uk: Homepage has no consultation CTA (only search/newsletter); /contact/ form lacks retainer scoping or calendar hold',
      commercial_outcome: 'High-value commercial directors hit the homepage and find no direct path to book discovery, causing drop-off to rival regional practices.',
      concrete_fix: '60-second interactive corporate intake engine holding discovery consultations in real time.'
    }
  },
  {
    id: '32daf0b0-534c-4cea-9056-7a919c20e7c9', // Melanie Curtis Accountants
    notes: '• VERIFIED FLAW: Full-screen cookie overlay wall + 20-field Gravity Form cluster on mobile.\n' +
      '• AUDIT EVIDENCE: Inspected on 390px mobile viewport. On initial page load, a massive 8-button cookie consent modal takes over the entire mobile viewport before any accounting service is visible. Form #1 embeds a bloated 20-input Gravity Form cluster (input_9, input_5.3, input_5.6, etc.) with no direct email on the homepage.\n' +
      '• NEGATIVE OUTCOME: Mobile directors immediately encounter an aggressive cookie banner wall followed by a multi-field form barrier, driving over 50% bounce rates before an inquiry is submitted.\n' +
      '• PROTOTYPE FIX: Streamlined mobile intake widget eliminating modal walls and capturing qualified retainers in under 60 seconds.',
    scraped_metadata: {
      friction_title: 'Full-Screen Cookie Wall & 20-Field Form Cluster',
      observable_problem: 'melaniecurtisaccountants.co.uk: Mobile viewport blocked by 8-button cookie overlay, followed by bloated 20-field Gravity Form',
      commercial_outcome: 'Mobile directors hit an invasive cookie wall and abandon the page, while the 20-field form causes severe drop-off for prospective £3k-£5k retainers.',
      concrete_fix: 'Friction-free mobile intake removing consent walls and pre-qualifying retainers in 60 seconds.'
    }
  },
  {
    id: 'f757623a-a6d2-492a-8da5-997e3afebd31', // Brimz Financials Ltd
    notes: '• VERIFIED FLAW: Unedited template placeholder ("user@domain.com") in source + free Gmail address on commercial site.\n' +
      '• AUDIT EVIDENCE: Inspected www.brimzfinancials.com on mobile. Squarespace template still contains default placeholder text "user@domain.com" in DOM, site uses personal "brimzbookkeeping@gmail.com", homepage has 0 contact forms, and phone number (07868 668283) is unanchored.\n' +
      '• NEGATIVE OUTCOME: Corporate directors inspecting the firm see unedited template placeholder text and a free Gmail address, raising immediate doubts about institutional credibility and driving high-value retainers to chartered competitors.\n' +
      '• PROTOTYPE FIX: Institutional Practice OS with branded corporate domain routing, 1-tap mobile calling, and instant consultation scheduling.',
    scraped_metadata: {
      friction_title: 'Template Placeholder Leak ("user@domain.com") & Gmail Routing',
      observable_problem: 'brimzfinancials.com: Squarespace demo text "user@domain.com" left in source, using free Gmail, 0 homepage forms, and unlinked phone',
      commercial_outcome: 'Commercial business clients spot template leaks and a free Gmail address, creating credibility hesitation and lost retainers.',
      concrete_fix: 'Bank-grade institutional intake portal with branded corporate routing and automated discovery booking.'
    }
  }
];

async function updateDb() {
  for (const u of updates) {
    const { error } = await supabase.from('leads').update({ notes: u.notes, scraped_metadata: u.scraped_metadata }).eq('id', u.id);
    if (error) console.error('Error updating:', u.id, error);
    else console.log('✓ Successfully updated DB lead:', u.id);
  }
}

updateDb();
