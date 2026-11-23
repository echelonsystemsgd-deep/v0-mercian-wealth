const fs = require('fs');

async function checkSubpages() {
  const pages = ['/contact', '/collections', '/showroom', '/repairs', '/about'];
  const base = 'https://www.niraj-jewellers.co.uk';
  const results = {};

  for (const p of pages) {
    try {
      const r = await fetch(base + p);
      const html = await r.text();
      const forms = html.match(/<form[\s\S]*?<\/form>/gi) || [];
      const buttons = (html.match(/<(?:button|a)[^>]+>[\s\S]*?<\/(?:button|a)>/gi) || [])
        .map(b => b.replace(/<[^>]+>/g, '').trim())
        .filter(b => b.length > 2 && b.length < 50);

      results[p] = {
        status: r.status,
        formsCount: forms.length,
        buttons: [...new Set(buttons)].slice(0, 10),
        hasWhatsApp: html.toLowerCase().includes('whatsapp') || html.includes('wa.me'),
        hasBooking: html.toLowerCase().includes('calendly') || html.toLowerCase().includes('book') || html.toLowerCase().includes('appointment')
      };
    } catch(e) {
      results[p] = { error: e.message };
    }
  }

  console.log(JSON.stringify(results, null, 2));
}

checkSubpages();
