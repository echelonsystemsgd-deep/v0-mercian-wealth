const fs = require('fs');

async function getSocials(url) {
  try {
    const r = await fetch(url);
    const html = await r.text();
    const regex = /href=["'](https?:\/\/[^"']+)["']/gi;
    const links = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      const l = match[1];
      if (
        l.includes('linkedin.com') ||
        l.includes('twitter.com') ||
        l.includes('x.com') ||
        l.includes('facebook.com') ||
        l.includes('instagram.com') ||
        l.includes('youtube.com')
      ) {
        links.push(l);
      }
    }
    return [...new Set(links)];
  } catch(e) {
    return [e.message];
  }
}

async function run() {
  console.log('--- Kilsby Williams ---');
  console.log(await getSocials('https://kilsbywilliams.com/'));
  console.log(await getSocials('https://kilsbywilliams.com/about/our-experts/'));

  console.log('\n--- Fitzpatrick & Kearney ---');
  console.log(await getSocials('https://fitzpatrickandkearney.com/'));
  console.log(await getSocials('https://fitzpatrickandkearney.com/meet-the-team/'));

  console.log('\n--- Salisburys ---');
  console.log(await getSocials('https://www.salisburys.com/'));
  console.log(await getSocials('https://www.salisburys.com/who-we-are/'));
}

run();
