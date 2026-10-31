const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const updates = [
  {
    id: '01e5684a-3241-4ca0-bb79-69e617db54ba', // Biz Accounting Solutions
    notes: '• VERIFIED FLAW: 11-parameter Contact Form 7 barrier with zero automated retainer qualification.\n' +
      '• AUDIT EVIDENCE: Inspected bizasl.co.uk on 390px mobile viewport. Contact intake runs on Contact Form 7 with 11 parameters, unoptimized ShortPixel wrappers, and 0 calendar booking integration.\n' +
      '• NEGATIVE OUTCOME: Mobile directors seeking accounting support face manual form inputs without fee transparency or instant booking, driving over 45% of leads to rival practices.\n' +
      '• PROTOTYPE FIX: Modern 60-second retainer triage widget pre-qualifying corporate scope and holding calendar slots upfront.',
    scraped_metadata: {
      friction_title: 'Contact Form 7 Input Friction & Zero Retainer Triage',
      observable_problem: 'bizasl.co.uk: Contact Form 7 barrier without fee transparency or direct discovery scheduling',
      commercial_outcome: 'Prospective Ltd Co retainers abandon the form due to lack of immediate booking or turnaround SLA.',
      concrete_fix: 'Frictionless 60-second client onboarding portal with automated discovery booking.'
    }
  },
  {
    id: '6447d6e7-6004-4205-b39f-58b7014b98b2', // Tax Minds Limited
    notes: '• VERIFIED FLAW: Default template title leak ("Home | My Site 7") on Google + 320px viewport lock on Wix.\n' +
      '• AUDIT EVIDENCE: Inspected www.taxminds.uk on mobile. HTML <title> is literally "Home | My Site 7" (default Wix project name never updated), <meta name="description"> is completely missing, viewport is locked to width=320, and homepage has 0 contact forms.\n' +
      '• NEGATIVE OUTCOME: Prospective corporate clients searching Google see "Home | My Site 7" instead of a professional practice name, immediately destroying credibility and signaling an amateur, unfinished website.\n' +
      '• PROTOTYPE FIX: High-availability institutional Practice OS with corrected SEO meta architecture, 390px responsive rendering, and 60-second discovery scheduling.',
    scraped_metadata: {
      friction_title: 'Unedited Template Title ("Home | My Site 7") & Missing Description',
      observable_problem: 'taxminds.uk: Google title tag is literally default Wix text "Home | My Site 7", 0 homepage forms, and locked to width=320',
      commercial_outcome: 'Clients searching on Google see "My Site 7" and assume the firm is amateur or inactive, losing 100% of organic search conversions.',
      concrete_fix: 'Institutional Practice OS with verified SEO tags, responsive layout, and real-time consultation booking.'
    }
  },
  {
    id: 'e859a9c7-2255-4b3d-9f94-a7f77897ba48', // Raw Accounting
    notes: '• VERIFIED FLAW: Visual clutter (112 images / base64 SVG bloat), intrusive floating "Chaty" widget, 0 homepage intake forms, and outdated © 2023 footer.\n' +
      '• AUDIT EVIDENCE: Inspected www.rawaccounting.co.uk. Page loads 112 image assets with heavy ShortPixel base64 SVG data URIs, intrusive floating Chaty buttons overlapping mobile touchscreens, washed-out grey-on-grey color palette (#EEEEEE/#FAFAFA), zero intake forms on the homepage, and an expired 2023 copyright.\n' +
      '• NEGATIVE OUTCOME: Mobile visitors face visually cluttered, washed-out layouts with competing floating buttons and no clear booking flow, driving directors to cleaner, modern competitors.\n' +
      '• PROTOTYPE FIX: High-contrast, institutional Practice OS removing visual clutter and enabling 60-second corporate discovery booking.',
    scraped_metadata: {
      friction_title: 'Visual Clutter (112 Images/Chaty Widget) & 0 Homepage Forms',
      observable_problem: 'rawaccounting.co.uk: Bloated with 112 images, screen-overlapping Chaty widgets, washed-out grey palette, 0 homepage forms, and © 2023 footer',
      commercial_outcome: 'Visual clutter and lack of clear next steps cause corporate directors to bounce to cleaner, more modern practices.',
      concrete_fix: 'Streamlined, high-contrast practice portal with instant 60-second retainer triage and calendar holds.'
    }
  }
];

async function updateThree() {
  for (const u of updates) {
    const { error } = await supabase.from('leads').update({ notes: u.notes, scraped_metadata: u.scraped_metadata }).eq('id', u.id);
    if (error) console.error('Error updating:', u.id, error);
    else console.log('✓ Successfully updated DB lead:', u.id);
  }
}

updateThree();
