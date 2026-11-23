const fs = require('fs');

console.log('=== 1. ARMSTRONG WATSON ===');
if (fs.existsSync('batch3_armstrong.html')) {
  const aw = fs.readFileSync('batch3_armstrong.html', 'utf8');
  const emails = aw.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  console.log('Emails found:', [...new Set(emails)]);
  const phones = aw.match(/(?:0800|0808|01228|01[0-9]{3}|\+44)[0-9\s-]{6,15}/g) || [];
  console.log('Phones found:', [...new Set(phones)].slice(0, 5));
  const linkedin = aw.match(/https?:\/\/(?:www\.)?linkedin\.com\/[^\s\"\'<>]+/g) || [];
  console.log('LinkedIn:', [...new Set(linkedin)]);
  const instagram = aw.match(/https?:\/\/(?:www\.)?instagram\.com\/[^\s\"\'<>]+/g) || [];
  console.log('Instagram:', [...new Set(instagram)]);
  const twitter = aw.match(/https?:\/\/(?:www\.)?(?:twitter|x)\.com\/[^\s\"\'<>]+/g) || [];
  console.log('Twitter/X:', [...new Set(twitter)]);
  const title = aw.match(/<title>([^<]+)<\/title>/i);
  console.log('Title:', title ? title[1] : 'none');
}

console.log('\n=== 2. PDA AMRITSAR ===');
if (fs.existsSync('batch3_pda.html')) {
  const pda = fs.readFileSync('batch3_pda.html', 'utf8');
  const pdaEmails = pda.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  console.log('PDA Emails:', [...new Set(pdaEmails)]);
  const pdaTitle = pda.match(/<title>([^<]+)<\/title>/i);
  console.log('PDA Title:', pdaTitle ? pdaTitle[1] : 'none');
  const pdaAddress = pda.match(/(?:amritsar|punjab|india|bethesda|maryland|0183)[^\n<]{0,100}/gi) || [];
  console.log('PDA Address signals:', [...new Set(pdaAddress)].slice(0, 5));
}

console.log('\n=== 3. INFINCIBLE ===');
if (fs.existsSync('batch3_infincible.html')) {
  const inf = fs.readFileSync('batch3_infincible.html', 'utf8');
  console.log('Infincible content snippet:', inf.slice(0, 300));
}

console.log('\n=== 4. ARORA AGGARWAL ===');
if (fs.existsSync('batch3_arora.html')) {
  const arora = fs.readFileSync('batch3_arora.html', 'utf8');
  const aroraEmails = arora.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  console.log('Arora Emails:', [...new Set(aroraEmails)]);
  const aroraTitle = arora.match(/<title>([^<]+)<\/title>/i);
  console.log('Arora Title:', aroraTitle ? aroraTitle[1] : 'none');
  const aroraAddress = arora.match(/(?:amritsar|punjab|india|ranjit avenue|\+91)[^\n<]{0,100}/gi) || [];
  console.log('Arora Address signals:', [...new Set(aroraAddress)].slice(0, 5));
}
