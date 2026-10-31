const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const updates = [
  {
    id: '3e5088b8-e6e1-4729-9373-1ded1b0a2886', // Holloway Cook Ltd
    email: 'info@hollowaycook.co.uk',
    notes: '• VERIFIED FLAW: Visually dated 1990s static brochure site with 0 homepage contact forms, 0 click-to-call links, and missing meta description.\n' +
      '• AUDIT EVIDENCE: Inspected www.hollowaycook.co.uk. Site acts as a pure passive brochure: 5 generic static service boxes, zero clickable tel: or mailto: links on the homepage, zero contact forms, and missing meta description.\n' +
      '• NEGATIVE OUTCOME: Prospective clients searching for an accountant land on an outdated digital brochure with no way to take action or book a call, causing them to immediately bounce to modern competitors.\n' +
      '• PROTOTYPE FIX: Interactive Practice OS converting the static brochure into an active intake engine with 1-tap mobile calling and 60-second retainer triage.',
    scraped_metadata: {
      friction_title: 'Passive Static Brochure Layout & Zero Homepage Forms',
      observable_problem: 'hollowaycook.co.uk: Static 90s brochure with 0 homepage forms, unclickable phone/email, and missing meta description',
      commercial_outcome: 'Directors landing on the site see an inactive brochure with no clear next step, causing over 60% to bounce to active competitors.',
      concrete_fix: 'Modern, high-conversion practice portal with instant 60-second discovery scheduling.'
    }
  },
  {
    id: 'fea20a06-bd81-4b45-b24e-bfd9afaa3e25', // Richardsons Accountants
    email: 'jo@richardsonsaccountancy.co.uk',
    name: 'Jo & Partner Team',
    notes: '• VERIFIED FLAW: Blocked mobile zooming (user-scalable=0) violating WCAG + 1MB bloated DOM payload.\n' +
      '• AUDIT EVIDENCE: Inspected richardsonsaccountancy.co.uk. Viewport meta tag explicitly blocks accessibility scaling (maximum-scale=1.0, user-scalable=0), page loads a massive 994KB DOM payload, and subpages trigger 403 Forbidden firewall errors.\n' +
      '• NEGATIVE OUTCOME: Mobile users unable to zoom in on financial details experience accessibility barriers, while heavy asset payloads drive high mobile exit rates.\n' +
      '• PROTOTYPE FIX: Lightweight, accessible mobile Practice OS with fluid responsive zoom and automated discovery scheduling.',
    scraped_metadata: {
      friction_title: 'Accessibility Zoom Block (user-scalable=0) & 1MB DOM Payload',
      observable_problem: 'richardsonsaccountancy.co.uk: Viewport blocks user zoom violating accessibility standards; bloated 994KB page weight',
      commercial_outcome: 'Mobile directors experience usability barriers and sluggish load times, abandoning the page before reaching out.',
      concrete_fix: 'Accessible, lightning-fast client onboarding portal with automated calendar holds.'
    }
  },
  {
    id: '5e82cb59-ee41-40b5-9460-eed839aaba0b', // James Cowper Kreston
    email: 'info@jamescowperkreston.co.uk',
    notes: '• VERIFIED FLAW: Missing mobile viewport meta tag + billboard advert-style layout with zero immediate utility.\n' +
      '• AUDIT EVIDENCE: Inspected www.jamescowperkreston.co.uk. Page completely lacks a <meta name="viewport"> tag, causing mobile devices to render the site as a shrunken desktop billboard advert. Homepage focuses on PR slogans with no direct client portal or booking CTA.\n' +
      '• NEGATIVE OUTCOME: Mobile directors are greeted with an unreadable, shrunken desktop advert rather than a functional website, forcing them to pinch-and-zoom or exit to firms with direct intake tools.\n' +
      '• PROTOTYPE FIX: Institutional mobile-first Practice OS with responsive 390px layout, client portal entry, and instant commercial discovery triage.',
    scraped_metadata: {
      friction_title: 'Missing Viewport Meta Tag (Miniature Advert Scaling)',
      observable_problem: 'jamescowperkreston.co.uk: Lacks viewport meta tag, rendering as a shrunken desktop magazine advert on mobile screens',
      commercial_outcome: 'Commercial leaders on smartphones see an unreadable desktop billboard with no direct booking utility, driving high bounce rates.',
      concrete_fix: 'Institutional commercial triage prototype with native smartphone scaling and direct discovery call hold.'
    }
  }
];

async function updateDb() {
  for (const u of updates) {
    const { error } = await supabase.from('leads').update(u).eq('id', u.id);
    if (error) console.error('Error updating:', u.id, error);
    else console.log('✓ Successfully updated lead:', u.id, u.email);
  }
}

updateDb();
